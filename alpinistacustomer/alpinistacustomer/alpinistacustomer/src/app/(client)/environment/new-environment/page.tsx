"use client";
import { Label } from "@/components/ui/label";
import { Suspense, useEffect, useState } from "react";
import { BsBuildings } from "react-icons/bs";
import InternFormEnv from "./components/InternFormEnv";
import ExternalFormEnv from "./components/TerceiroFormEnv";
import { useSearchParams } from "next/navigation";
import EnvironmentService from "@/services/EnvironmentsService";
import { IEnvironment } from "@/types/IEnvironment";

export default function NewEnvironment() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewEnvironmentPage />
    </Suspense>
  );
}

function NewEnvironmentPage() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("id") ?? "";
  const [envType, setEnvType] = useState(1);
  const [environment, setEnvironment] = useState<IEnvironment>();

  const fetchData = async () => {
    try {
      const res = await EnvironmentService.GetById(Number(editId));
      setEnvironment(res);
      setEnvType(res.type);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (editId) {
      fetchData();
    }
  }, [editId]);

  return (
    <main className="text-[#636267] w-full flex flex-col gap-4 items-start px-3">
      <section className="hidden md:flex flex-col p-6 md:gap-10 items-start md:mb-3">
        <div className="flex gap-2 items-center text-[#050506]">
          <BsBuildings color="#3088EE" size={30} />
          <h2 className="font-semibold md:text-3xl">Ambientes</h2>
        </div>
      </section>
      <section className="flex flex-col gap-5 w-full max-w-[1200px]">
        <h3 className="font-bold md:text-2xl text-[#050506]">Cadastro</h3>
        <div className="p-4 bg-white w-full rounded-xl">
          <p className="hidden md:block text-[#050506] font-semibold text-sm mb-4">
            Selecione um tipo de ambiente
          </p>
          <div className="flex flex-col gap-2">
            <Label className="text-[#818086] font-semibold text-sm">
              Tipo de ambiente<span className="text-red-500">*</span>
            </Label>
            <select
              onChange={(env) => setEnvType(Number(env.target.value))}
              value={envType}
              className="p-2 bg-transparent border border-[#E6E6E8] md:w-1/3 rounded-lg"
            >
              <option value="1">Interno</option>
              <option value="2">Terceiro</option>
            </select>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-5 w-full max-w-[1200px] my-2">
        {envType === 1 && <InternFormEnv dataEnv={environment} />}
        {envType === 2 && <ExternalFormEnv dataEnv={environment} />}
      </section>
    </main>
  );
}
