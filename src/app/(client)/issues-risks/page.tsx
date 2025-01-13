"use client";
import { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { GoChecklist } from "react-icons/go";
import html2canvas from "html2canvas";
import { useRouter } from "next/navigation";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IPagedRisk } from "@/types/IRisk";
import RisksService from "@/services/RisksService";
import CompanyService from "@/services/CompanyService";
import { MdBugReport } from "react-icons/md";
import { useCustomerContext } from "@/contexts/CustomerContext";
import PopoverClassify from "./components/PopoverClassify";
import AccountTable from "./components/AccountTable";
import AtivosTable from "./components/AtivosTable";
import ModalAccountDetail from "./components/ModalAccountDetail";
import { usePermissionContext } from "@/contexts/PermissionContext";
import { toast } from "react-toastify";

export default function CompanyIndPage() {
  const { customers } = useCustomerContext();
  const navigate = useRouter();
  const navigation = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [risks, setRisks] = useState<IPagedRisk>();
  const [companyName, setCompanyName] = useState<string>();
  const [selected, setSelected] = useState("Padrão");
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [openedRiskId, setOpenedRiskId] = useState<number>();
  const ativosRef = useRef<HTMLDivElement>(null);
  const [orderColumn, setOrderColumn] = useState("Id");
  const [orderDirection, setOrderDirection] = useState(true);
  const { permission, getPermissions, currentPage } = usePermissionContext();

  const fetchRisks = async () => {
    try {
      const res = await RisksService.Get(
        page,
        10,
        undefined,
        customers?.id,
        orderColumn,
        orderDirection ? "asc" : "desc"
      );
      setRisks(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCompany = async () => {
    try {
      const { name } = await CompanyService.GetById(
        customers ? customers.companyId : 0
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

  useEffect(() => {
    fetchRisks();
  }, [page, openModal, orderColumn, orderDirection]);

  useEffect(() => {
    fetchCompany();
  }, []);

  useEffect(() => {
    if (permission) {
      getPermissions("Issues");
    }
  }, [permission]);

  useEffect(() => {
    if (currentPage) {
      console.log(currentPage);
      if (currentPage.hasAcess === false) {
        toast.warning("Você não tem permissão para acessar essa página");
        navigation.push("/home");
      }
    }
  }, [currentPage]);

  return (
    <main className="text-[#FCFCFD] w-full p-2 md:p-6 flex flex-col gap-10 mt-6">
      <section className=" hidden md:flex md:gap-10 items-start md:mb-5 justify-between w-full">
        <div className="flex gap-2 items-center text-[#050506]">
          <MdBugReport color="#3088EE" size={33} />
          <h2 className="font-semibold md:text-3xl">Issues e Riscos</h2>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <Button
            onClick={() => {
              if (currentPage) {
                if (
                  currentPage.funcs.find((x) => x.name === "Exportar")
                    ?.hasAcess == false
                ) {
                  toast.warning(
                    "Você não tem permissão para acessar essa função"
                  );
                } else {
                  exportToPDF();
                }
              }
            }}
            className="text-white bg-[#3088EE] border-none items-center"
          >
            <GoChecklist /> Exportar
          </Button>

          <PopoverClassify
            pagePerms={currentPage}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      </section>
      <section>
        <button
          className="flex items-center justify-start gap-4"
          onClick={() => navigate.push(`/issues-risks`)}
        >
          <FaRegArrowAltCircleLeft size={28} color="#C9001C" />
          <p className="font-semibold text-[#8C8B91]">
            Issues e Riscos / {companyName}
          </p>
        </button>
        <div className="block md:hidden mt-6">
          <PopoverClassify
            pagePerms={currentPage}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      </section>
      <div ref={ativosRef}>
        {selected == "Padrão" && (
          <AccountTable
            openModal={() => setOpenModalDetails(!openModalDetails)}
            risks={risks}
            currentPage={page}
            setCurrentPage={setPage}
            setRiskId={(x: number) => setOpenedRiskId(x)}
            setNameColumn={(x: string) => setOrderColumn(x)}
            setDirectionColumn={() => setOrderDirection(!orderDirection)}
          />
        )}
        {selected == "Ativos" && (
          <AtivosTable
            risks={risks}
            openModal={() => setOpenModalDetails(!openModalDetails)}
            currentPage={page}
            setCurrentPage={setPage}
            setRiskId={(x: number) => setOpenedRiskId(x)}
            columnName={"NOME DO ATIVO"}
            columnType={"active"}
          />
        )}
        {selected == "Ambiente" && (
          <AtivosTable
            risks={risks}
            openModal={() => setOpenModalDetails(!openModalDetails)}
            currentPage={page}
            setCurrentPage={setPage}
            setRiskId={(x: number) => setOpenedRiskId(x)}
            columnName={"NOME DO AMBIENTE"}
            columnType={"environment"}
          />
        )}
        {selected == "Severidade" && (
          <AtivosTable
            risks={risks}
            openModal={() => setOpenModalDetails(!openModalDetails)}
            currentPage={page}
            setCurrentPage={setPage}
            setRiskId={(x: number) => setOpenedRiskId(x)}
            columnName={"SEVERIDADE"}
            columnType={"riskSeverity"}
          />
        )}
        {selected == "Responsável" && (
          <AtivosTable
            risks={risks}
            openModal={() => setOpenModalDetails(!openModalDetails)}
            currentPage={page}
            setCurrentPage={setPage}
            setRiskId={(x: number) => setOpenedRiskId(x)}
            columnName={"RESPONSAVEL"}
            columnType={"responsibleCustomerId"}
          />
        )}
        {selected == "Origem" && (
          <AtivosTable
            risks={risks}
            openModal={() => setOpenModalDetails(!openModalDetails)}
            currentPage={page}
            setCurrentPage={setPage}
            setRiskId={(x: number) => setOpenedRiskId(x)}
            columnName={"ORIGEM"}
            columnType={"origin"}
          />
        )}
        {selected == "Estado" && (
          <AtivosTable
            risks={risks}
            openModal={() => setOpenModalDetails(!openModalDetails)}
            currentPage={page}
            setCurrentPage={setPage}
            setRiskId={(x: number) => setOpenedRiskId(x)}
            columnName={"STATUS"}
            columnType={"status"}
          />
        )}
      </div>

      <>
        <button
          onClick={() => setOpenModal(!openModal)}
          className="fixed bottom-10 right-10 md:hidden bg-[#3088EE] w-12 h-12 rounded-xl flex items-center justify-center"
        >
          <Plus color="#F8F8F8" size={30} />
        </button>
      </>

      <ModalAccountDetail
        riskId={openedRiskId}
        open={openModalDetails}
        setOpen={() => setOpenModalDetails(!openModalDetails)}
      />
    </main>
  );
}
