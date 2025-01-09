"use client";
import { useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { ResponsiveContainer } from "recharts";
import BarChartHome from "./components/charts/BarChart";
import LineChartHome from "./components/charts/LineChart";
import Services from "./components/Services";
import HorizontalBarChart from "./components/charts/HorizontalBarChart";
import IRR from "./components/IRR";
import Risks from "./components/Risks";

const tabs = [
  "Todos",
  "Superfície de ataques",
  "Inteligência de ameaças",
  "Gestão de vulnerabilidade",
  "Teste de intrusão",
  "Terceiros",
  "Conformidade",
];

export default function HomePage() {
  const [currentTab, setCurrentTab] = useState("Todos");

  return (
    <main className="text-[#636267] w-full flex flex-col gap-1 items-start px-3">
      <section className="hidden md:flex flex-col p-6 md:gap-10 items-start md:mb-3">
        <div className="flex gap-4 items-center text-[#050506]">
          <GoHomeFill color="#3088EE" size={24} />
          <h2 className="font-semibold md:text-3xl">Home</h2>
        </div>
      </section>
      <section className="bg-white p-2 rounded-lg flex w-full">
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
      {currentTab == "Todos" && (
        <>
          <Risks />
          <section className="flex flex-col lg:flex-row gap-5 w-full mt-8 overflow-x-auto">
            <div className="h-full w-full lg:w-1/2">
              <ResponsiveContainer>
                <BarChartHome />
              </ResponsiveContainer>
            </div>
            <div className="h-full w-full lg:w-1/2">
              <ResponsiveContainer>
                <LineChartHome />
              </ResponsiveContainer>
            </div>
          </section>
          <section className="my-3 w-full">
            <Services />
          </section>
          <section className="my-3 w-full">
            <HorizontalBarChart />
          </section>
          <section className="my-3 w-full">
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
              <table className="min-w-full divide-y divide-gray-200">
                {/* Cabeçalho */}
                <thead className="bg-[#EEEEF0]">
                  <tr>
                    <th className="px-4 py-2 text-left text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Severidade
                    </th>
                    <th className="px-4 py-2 text-left text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      QTD
                    </th>
                  </tr>
                </thead>

                {/* Corpo da Tabela */}
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { severity: "Média", name: "Lorem Ipsum", qty: 57 },
                    { severity: "Alta", name: "Lorem Ipsum", qty: 57 },
                    { severity: "Crítica", name: "Lorem Ipsum", qty: 57 },
                    { severity: "Crítica", name: "Lorem Ipsum", qty: 57 },
                    { severity: "Crítica", name: "Lorem Ipsum", qty: 57 },
                  ].map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-5 text-sm text-center text-gray-800 whitespace-nowrap">
                        {item.severity}
                      </td>
                      <td className="px-4 py-5 text-sm text-center text-gray-800 whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="px-4 py-5 text-sm text-center text-gray-800 whitespace-nowrap">
                        {item.qty}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section className="my-3 w-full">
            <IRR />
          </section>
        </>
      )}
    </main>
  );
}
