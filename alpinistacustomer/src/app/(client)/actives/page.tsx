"use client";
import { useState } from "react";
import { TbWorld } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import ActiveTable from "./components/ActiveTable";
import { FaFilter } from "react-icons/fa";

const tabs = [
  "Todos",
  "Infra",
  "WEB",
  "Mobile",
  "Domínio",
  "Nuvem",
  "Pessoas",
  "Ambientes",
];

export default function ActivesPage() {
  const [currentTab, setCurrentTab] = useState("Todos");

  return (
    <main className="text-[#636267] w-full flex flex-col gap-1 items-start px-3">
      <section className="hidden md:flex flex-col p-6 md:gap-10 items-start md:mb-3">
        <div className="flex gap-2 items-center text-[#050506]">
          <TbWorld color="#3088EE" size={30} />
          <h2 className="font-semibold md:text-3xl">Ativos</h2>
        </div>
      </section>
      <section className="bg-white p-2 rounded-lg flex w-full lg:w-2/3">
        <div className=" w-full overflow-x-auto flex">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setCurrentTab(tab)}
              className={`${
                currentTab == tab ? "bg-[#F0F8FF] text-sm text-[#1A69C4]" : ""
              } p-2 font-semibold whitespace-nowrap rounded-lg text-sm w-full`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>
      <section className="hidden lg:flex gap-3 w-full my-6 items-center">
        <div className="flex flex-col w-2/4 gap-2">
          <label htmlFor="search">Pesquisar</label>
          <div className="flex items-center  rounded-lg px-3 py-2 shadow-sm w-full border">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              id="search"
              placeholder={"Search"}
              className="bg-transparent w-full outline-none text-gray-70"
            />
          </div>
        </div>

        <div className="flex flex-col w-1/4">
          <label className="text-gray-700 mb-1">
            Severidade <span className="text-red-500">*</span>
          </label>
          <select
            className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 shadow-sm outline-none text-gray-700"
            defaultValue="1"
          >
            <option value="1" disabled>
              Selecione uma opção
            </option>
          </select>
        </div>
        <div className="flex w-1/4 mt-8">
          <Button className="w-36 bg-[#3088EE]">Filtrar</Button>
        </div>
      </section>
      <section className="w-full my-3 flex justify-end lg:hidden">
        <FaFilter size={20} color="#818086" />
      </section>
      <ActiveTable />
    </main>
  );
}
