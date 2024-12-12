"use client";
import { useState } from "react";
import { BsBuildings } from "react-icons/bs";
import EnvironmentTable from "./components/EnvironmentTable";
import { Button } from "@/components/ui/button";

const tabs = ["Internos", "Terceiros"];

export default function EnvironmentPage() {
  const [currentTab, setCurrentTab] = useState("Internos");

  return (
    <main className="text-[#636267] w-full flex flex-col gap-1 items-start px-3">
      <section className="hidden md:flex flex-col p-6 md:gap-10 items-start md:mb-3">
        <div className="flex gap-2 items-center text-[#050506]">
          <BsBuildings color="#3088EE" size={30} />
          <h2 className="font-semibold md:text-3xl">Ambientes</h2>
        </div>
      </section>
      <section className=" flex justify-between items-center w-full mb-6">
        <div className="bg-white p-2 rounded-lg flex">
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
        </div>
        <Button className="hidden lg:flex bg-[#3088EE]">
          <span className="font-light text-2xl">+</span>
          Novo Ambiente
        </Button>
      </section>
      <EnvironmentTable />
      <section className="flex lg:hidden w-full justify-end p-4">
        <Button className="bg-[#3088EE] p-4">
          <span className="font-light text-2xl">+</span>
        </Button>
      </section>
    </main>
  );
}
