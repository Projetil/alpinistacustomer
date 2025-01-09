"use client";
import { FaListAlt } from "react-icons/fa";

import QuestionnaireTable from "./components/QuestionnaireTable";
import TopCards from "./components/TopCards";
import { Button } from "@/components/ui/button";
import MiddleCard from "./components/MiddleCard";
import { AiOutlinePlus } from "react-icons/ai";
import { BsGrid1X2Fill } from "react-icons/bs";
import Link from "next/link";
import { IPagedQuestionnary } from "@/types/IQuestionnary";
import { useEffect, useState } from "react";
import QuestionnaryService from "@/services/QuestionnaryService";
import { useCustomerContext } from "@/contexts/CustomerContext";
import { useRouter } from "next/navigation";

export default function QuestionnairePage() {
  const [questionary, setQuestionary] = useState<IPagedQuestionnary>();
  const [page, setPage] = useState(1);
  const navigation = useRouter();
  const { customers } = useCustomerContext();

  const fetchData = async () => {
    try {
      const res = await QuestionnaryService.GetAll(
        page,
        10,
        undefined,
        customers?.companyId
      );
      setQuestionary(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (customers) {
      fetchData();
    }
  }, [page, customers]);

  return (
    <main className="text-[#636267] w-full flex flex-col gap-1 items-start px-3">
      <section className="flex flex-col p-6 md:gap-10 items-start md:mb-3">
        <div className="hidden md:flex gap-4 items-center text-[#050506]">
          <FaListAlt
            color="#3088EE"
            size={45}
            className="p-3 rounded-lg bg-[#FFFFFF]"
          />
          <h2 className="font-bold md:text-3xl">Questionários</h2>
        </div>
      </section>

      <section className=" flex justify-between items-center w-full mb-6">
        <div className=" w-full overflow-x-auto flex gap-4 p-2">
          <TopCards title="Em Andamento" value={50} />
          <TopCards title="Atrasados" value={50} />
          <TopCards title="Não Conforme" value={50} />
          <TopCards title="Em Conformidade" value={50} />
        </div>
      </section>
      <section className="==flex flex-col w-full gap-4 my-4">
        <h1 className="text-black text-xl font-bold">Crie um novo</h1>
        <div className="flex w-full gap-4 overflow-x-auto m-4 p-2">
          <div className="hidden md:block w-full">
            <Link href="/questionnaire/new-questionnaire">
              <MiddleCard
                icon={<AiOutlinePlus color="#3088EE" size={18} />}
                title="Novo Questionário"
                subtitle="Crie um questionário do zero"
              />
            </Link>
          </div>
          <Link href="/questionnaire/my-questionnaire" className="w-full">
            <MiddleCard
              icon={<FaListAlt color="#3088EE" size={18} />}
              title="Meus Questionários"
              subtitle="Questionários criados por você"
            />
          </Link>
          <Link href="/questionnaire/models-questionnaire" className="w-full">
            <MiddleCard
              icon={<BsGrid1X2Fill color="#3088EE" size={18} />}
              title="Modelos/templates"
              subtitle="Crie a partir de outros modelos"
            />
          </Link>
        </div>
      </section>
      <div className="flex flex-col w-full gap-4 my-4">
        <h1 className="text-black text-xl font-bold">Questionários recentes</h1>
        <QuestionnaireTable
          pageTable={page}
          setPageTable={setPage}
          questionaryData={questionary}
        />
      </div>
      <section className="fixed bottom-12 right-8 lg:hidden">
        <Button
          onClick={() => navigation.push("/questionnaire/new-questionnaire")}
          className="bg-[#3088EE] font-light text-xl text-white"
        >
          +
        </Button>
      </section>
    </main>
  );
}
