"use client";
import CompanyService from "@/services/CompanyService";
import { IPagedCompany } from "@/types/ICompany";
import { useEffect, useState } from "react";
import CompanyTable from "./components/CompanyTable";
import { MdBugReport } from "react-icons/md";

export default function HomePage() {
  const [companies, setCompanies] = useState<IPagedCompany>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [orderColumn, setOrderColumn] = useState("id");
  const [orderDirection, setOrderDirection] = useState(true);

  const fetchCompany = async () => {
    try {
      setLoading(true);
      const res = await CompanyService.GetAll(
        page,
        10,
        orderColumn,
        orderDirection ? "asc" : "desc"
      );
      setCompanies(res);
    } catch (error) {
      console.log(error);
      setLoading(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, [page, orderColumn, orderDirection]);

  return (
    <main className="text-[#FCFCFD] w-full p-2 md:p-6 flex flex-col gap-10 mt-6">
      <section className="flex flex-col md:gap-10 items-start md:mb-10">
        <div className="hidden md:flex gap-2 items-center text-[#050506]">
          <MdBugReport color="#3088EE" size={33} />
          <h2 className="font-semibold md:text-3xl">Issues e Riscos</h2>
        </div>
      </section>
      <CompanyTable
        companies={companies}
        pageNumber={page}
        setPageNumber={(x: number) => setPage(x)}
        setNameColumn={(x: string) => setOrderColumn(x)}
        setDirectionColumn={() => setOrderDirection(!orderDirection)}
      />
    </main>
  );
}
