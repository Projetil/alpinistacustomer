"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Plus } from "lucide-react";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { GoChecklist } from "react-icons/go";
import { MdBugReport } from "react-icons/md";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import PopoverClassify from "./components/PopoverClassify";
import AccountTable from "./components/AccountTable";
import AtivosTable from "./components/AtivosTable";
import ModalAccountDetail from "./components/ModalAccountDetail";
import { IPagedRisk } from "@/types/IRisk";
import { useCustomerContext } from "@/contexts/CustomerContext";
import CompanyService from "@/services/CompanyService";
import RisksService from "@/services/RisksService";

export default function IssuesRisksPage() {
  const navigate = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState("Padrão");
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [page, setPage] = useState(1);
  const [risks, setRisks] = useState<IPagedRisk>();
  const [companyName, setCompanyName] = useState<string>();
  const [openedRiskId, setOpenedRiskId] = useState<number>();
  const ativosRef = useRef<HTMLDivElement>(null);
  const { customers } = useCustomerContext();

  const fetchRisks = async () => {
    try {
      const res = await RisksService.Get(
        page,
        10,
        undefined,
        Number(customers?.companyId)
      );
      setRisks(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCompany = async () => {
    try {
      const { name } = await CompanyService.GetById(
        Number(customers?.companyId)
      );
      setCompanyName(name);
    } catch (error) {
      console.log(error);
    }
  };

  const exportToPDF = async () => {
    if (!ativosRef.current) return;
    const canvas = await html2canvas(ativosRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("ativos_table.pdf");
  };

  useMemo(() => {
    if (customers) fetchRisks();
  }, [page, openModal, customers]);

  useEffect(() => {
    if (customers) fetchCompany();
  }, [customers]);

  return (
    <main className="text-[#636267] w-full flex flex-col gap-1 items-start px-3">
      <section className="hidden md:flex flex-col md:flex-row justify-between w-full p-6 md:gap-10 items-start md:mb-3">
        <div className="flex gap-4 items-center text-[#050506]">
          <MdBugReport color="#3088EE" size={24} />
          <h2 className="font-semibold md:text-3xl">Issues e riscos</h2>
        </div>
        <div className="hidden md:flex gap-4 w-full md:w-auto">
          {selected == "Ativos" && (
            <Button
              onClick={exportToPDF}
              className="text-white bg-[#3088EE] border-none items-center"
            >
              <GoChecklist /> Exportar
            </Button>
          )}
          <PopoverClassify selected={selected} setSelected={setSelected} />
        </div>
      </section>
      <section className="flex flex-col mb-5 w-full">
        <button
          className="flex items-center justify-start gap-4"
          onClick={() => navigate.push(`/home`)}
        >
          <FaRegArrowAltCircleLeft size={28} color="#C9001C" />
          <p className="font-semibold text-[#8C8B91]">Home / {companyName}</p>
        </button>
        <div className="block md:hidden mt-6 w-full">
          <PopoverClassify selected={selected} setSelected={setSelected} />
        </div>
      </section>
      {selected == "Padrão" && (
        <AccountTable
          openModal={() => setOpenModalDetails(!openModalDetails)}
          risks={risks}
          currentPage={page}
          setCurrentPage={setPage}
          setRiskId={(x: number) => setOpenedRiskId(x)}
        />
      )}
      {selected == "Ativos" && (
        <div ref={ativosRef} className="w-full">
          <AtivosTable
            risks={risks}
            openModal={() => setOpenModalDetails(!openModalDetails)}
            currentPage={page}
            setCurrentPage={setPage}
            setRiskId={(x: number) => setOpenedRiskId(x)}
          />
        </div>
      )}
      {selected == "Padrão" && (
        <>
          <button
            onClick={() => setOpenModal(!open)}
            className="fixed bottom-10 right-10 md:hidden bg-[#3088EE] w-12 h-12 rounded-xl flex items-center justify-center"
          >
            <Plus color="#F8F8F8" size={30} />
          </button>
        </>
      )}
      <ModalAccountDetail
        open={openModalDetails}
        setOpen={() => setOpenModalDetails(!openModalDetails)}
        riskId={openedRiskId}
      />
    </main>
  );
}
