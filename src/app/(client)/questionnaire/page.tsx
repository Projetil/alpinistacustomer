"use client";
import { FaListAlt } from "react-icons/fa";

import QuestionnaireTable from "./components/QuestionnaireTable";
import TopCards from "./components/TopCards";
import { Button } from "@/components/ui/button";
import MiddleCard from "./components/MiddleCard";
import { AiOutlinePlus } from "react-icons/ai";
import { BsGrid1X2Fill } from "react-icons/bs";

export default function QuestionnairePage() {
  return (
    <main className="text-[#636267] w-full flex flex-col gap-1 items-start px-3">
      <section className="flex flex-col p-6 md:gap-10 items-start md:mb-3">
        <div className="hidden md:flex gap-2 items-center text-[#050506]">
          <FaListAlt color="#3088EE" size={30} />
          <h2 className="font-semibold md:text-3xl">Questionários</h2>
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
            <MiddleCard
              icon={<AiOutlinePlus color="#3088EE" size={18} />}
              title="Novo Questionário"
              subtitle="Crie um questionário do zero"
            />
          </div>
          <MiddleCard
            icon={<FaListAlt color="#3088EE" size={18} />}
            title="Meus Questionários"
            subtitle="Questionários criados por você"
          />
          <MiddleCard
            icon={<BsGrid1X2Fill color="#3088EE" size={18} />}
            title="Modelos/templates"
            subtitle="Crie a partir de outros modelos"
          />
        </div>
      </section>
      <div className="flex flex-col w-full gap-4 my-4">
        <h1 className="text-black text-xl font-bold">Questionários recentes</h1>
        <QuestionnaireTable />
      </div>
      <section className="fixed bottom-12 right-8 lg:hidden">
        <Button className="bg-[#3088EE] font-light text-xl text-white">
          +
        </Button>
      </section>
    </main>
  );
}
