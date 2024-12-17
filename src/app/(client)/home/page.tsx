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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CardContainerAttackSurface from "./components/CardContainerAttackSurface";
import CardContainer from "./components/CardContainer";
import TotalDangers from "./components/charts/TotalDangers";
import LineChartTimeLine from "./components/charts/LineChartTimeLine";
import DonutCardCriticity from "./components/charts/DonutCardCriticity";
import DonutCardStatus from "./components/charts/DonutCardStatus";
import DynamicTableManagment from "./components/DynamicTableManagment";
import DynamicTableManagmentTop from "./components/DynamicTableManagmentTop";
import LineChartTimeLineManagment from "./components/charts/LineChartTimeLineManagment";
import ActiveTableIntrusion from "./components/charts/ActiveTableIntrusion";

const tabs = [
  { value: 1, name: "Todos" },
  { value: 2, name: "Superfície de ataques" },
  { value: 3, name: "Inteligência de ameaças" },
  { value: 4, name: "Gestão de vulnerabilidade" },
  { value: 5, name: "Teste de intrusão" },
  { value: 6, name: "Terceiros" },
  { value: 7, name: "Conformidade" },
];

const critData = {
  total: 100,
  crit: 3,
  high: 7,
  medium: 15,
  low: 25,
  info: 50,
};

const statusData = {
  total: 109,
  pendent: 50,
  reopen: 25,
  fixed: 15,
  accepted: 7,
  retest: 3,
  treatment: 3,
  notExist: 3,
  notExecuted: 3,
};

const environmentTableData = [
  {
    envName: "AMBIENTE NAME",
    name: "Lorem Ipsum",
    number: 77,
  },
  {
    envName: "AMBIENTE NAME",
    name: "Lorem Ipsum",
    number: 77,
  },
  {
    envName: "AMBIENTE NAME",
    name: "Lorem Ipsum",
    number: 77,
  },
  {
    envName: "AMBIENTE NAME",
    name: "Lorem Ipsum",
    number: 77,
  },
  {
    envName: "AMBIENTE NAME",
    name: "Lorem Ipsum",
    number: 77,
  },
];
const ageTableData = [
  {
    envName: "AMBIENTE NAME",
    name: "Lorem Ipsum",
    number: 77,
  },
  {
    envName: "AMBIENTE NAME",
    name: "Lorem Ipsum",
    number: 77,
  },
  {
    envName: "AMBIENTE NAME",
    name: "Lorem Ipsum",
    number: 77,
  },
  {
    envName: "AMBIENTE NAME",
    name: "Lorem Ipsum",
    number: 77,
  },
  {
    envName: "AMBIENTE NAME",
    name: "Lorem Ipsum",
    number: 77,
  },
];

const activeTable = [
  {
    name: "Lorem Ipsum",
    number: 77
  },
  {
    name: "Lorem Ipsum",
    number: 77
  },
  {
    name: "Lorem Ipsum",
    number: 77
  },
  {
    name: "Lorem Ipsum",
    number: 77
  },
  {
    name: "Lorem Ipsum",
    number: 77
  },
  {
    name: "Lorem Ipsum",
    number: 77
  },
  {
    name: "Lorem Ipsum",
    number: 77
  },
  {
    name: "Lorem Ipsum",
    number: 77
  },
  {
    name: "Lorem Ipsum",
    number: 77
  },
  {
    name: "Lorem Ipsum",
    number: 77
  },
]

const vulnerabilityTable = [
  {
    name: "Lorem Ipsum",
    number: 77
  },
  {
    name: "Lorem Ipsum",
    number: 77
  },
  {
    name: "Lorem Ipsum",
    number: 77
  },
  {
    name: "Lorem Ipsum",
    number: 77
  },
  {
    name: "Lorem Ipsum",
    number: 77
  },
  {
    name: "Lorem Ipsum",
    number: 77
  },
  {
    name: "Lorem Ipsum",
    number: 77
  },
  {
    name: "Lorem Ipsum",
    number: 77
  },
  {
    name: "Lorem Ipsum",
    number: 77
  },
  {
    name: "Lorem Ipsum",
    number: 77
  },
]

export default function HomePage() {
  const [currentTab, setCurrentTab] = useState(1);

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
              onClick={() => setCurrentTab(tab.value)}
              className={`${
                currentTab == tab.value
                  ? "bg-[#F0F8FF] text-sm text-[#1A69C4]"
                  : ""
              } p-2 font-semibold whitespace-nowrap rounded-lg text-sm w-full`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </section>
      {currentTab === 1 && (
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
      {currentTab === 2 && (
        <>
          <h1 className="my-3 text-xl font-bold text-black">Inventário</h1>
          <div className="w-full mb-4">
            <Accordion
              type="single"
              defaultValue="1"
              collapsible
              className="w-full"
            >
              <AccordionItem value="1" className="border-none">
                <AccordionTrigger className="text-lg font-bold text-black bg-white px-3 ">
                  Ativos
                </AccordionTrigger>
                <AccordionContent className="border-none bg-[#F8F7F9] ">
                  <div className="mt-6 grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 gap-3">
                    <CardContainerAttackSurface title="Endereços IP" />
                    <CardContainerAttackSurface title="Subdomínios" />
                    <CardContainerAttackSurface title="Aplicações WEB" />
                    <CardContainerAttackSurface title="Contas e-mail" />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="w-full mb-4">
            <Accordion
              type="single"
              defaultValue="2"
              collapsible
              className="w-full"
            >
              <AccordionItem value="2" className="border-none">
                <AccordionTrigger className="text-lg font-bold text-black bg-white px-3 ">
                  Riscos (Issues)
                </AccordionTrigger>
                <AccordionContent className="border-none bg-[#F8F7F9] ">
                  <div className="mt-6 grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 gap-3">
                    <CardContainerAttackSurface title="Aplicações WEB" />
                    <CardContainerAttackSurface title="Redes" />
                    <CardContainerAttackSurface title="Marca" />
                    <CardContainerAttackSurface title="Vazamentos de dados" />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </>
      )}

      {currentTab === 3 && (
        <>
          <div className="w-full mb-4 mt-6">
            <Accordion
              type="single"
              defaultValue="1"
              collapsible
              className="w-full"
            >
              <AccordionItem value="1" className="border-none">
                <AccordionTrigger className="text-lg font-bold text-black bg-white px-3 ">
                  <div className="flex flex-col items-start">
                    <p>Inteligência de ameaças</p>
                    <span className="text-xs font-light">Últimos 30 dias</span>
                  </div>
                </AccordionTrigger>
                <TotalDangers />
                <AccordionContent className="border-none bg-[#F8F7F9] ">
                  <div className="mt-6 grid grid-cols-1 grid-rows-4 md:grid-cols-6 md:grid-rows-2 gap-3">
                    <CardContainer
                      title="Credencias"
                      data={50}
                      className="md:col-span-2"
                    />
                     <CardContainer
                      title="Vazamentos"
                      data={50}
                      className="md:col-span-2"
                    />
                    <CardContainer
                      title="Domínios Similares"
                      data={50}
                      className="md:col-span-2"
                    />
                    <CardContainer
                      title="Redes Sociais"
                      data={50}
                      className="md:col-span-3"
                    />
                    <CardContainer
                      title="Mobile"
                      data={50}
                      className="md:col-span-3"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="w-full mb-4">
            <Accordion
              type="single"
              defaultValue="2"
              collapsible
              className="w-full"
            >
              <AccordionItem value="2" className="border-none">
                <AccordionTrigger className="text-lg font-bold text-black bg-white px-3 ">
                  <div className="flex flex-col items-start">
                    <p>Linha do tempo</p>
                    <span className="text-xs font-light">Últimos 30 dias</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="border-none bg-[#F8F7F9] ">
                  <LineChartTimeLine />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </>
      )}

      {currentTab === 4 && (
        <>
          <h1 className="my-3 text-xl font-bold text-black">Inventário</h1>
          <div className="w-full mb-4">
            <Accordion
              type="single"
              defaultValue="1"
              collapsible
              className="w-full"
            >
              <AccordionItem value="1" className="border-none">
                <AccordionTrigger className="text-lg font-bold text-black bg-white px-3 ">
                  <div className="flex flex-col items-start">
                    <p>Riscos</p>
                    <span className="text-xs font-light">Últimos 30 dias</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="border-none bg-[#F8F7F9] ">
                  <div className="mt-6 grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 gap-3">
                    <DonutCardCriticity conversionIndex={critData} />
                    <DonutCardStatus conversionIndex={statusData} />

                    <DynamicTableManagment title="Por ambiente" data={environmentTableData}/>
                    <DynamicTableManagment title="Por idade" data={ageTableData}/>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="w-full mb-4">
            <Accordion
              type="single"
              defaultValue="2"
              collapsible
              className="w-full"
            >
              <AccordionItem value="2" className="border-none">
              <AccordionTrigger className="text-lg font-bold text-black bg-white px-3 ">
                  <div className="flex flex-col items-start">
                    <p>Top 10</p>
                    <span className="text-xs font-light">Últimos 30 dias</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="border-none bg-[#F8F7F9] ">
                  <div className="mt-6 grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-3">
                  <DynamicTableManagmentTop title="Ativos" data={activeTable}/>
                  <DynamicTableManagmentTop title="Vulnerabilidade" data={vulnerabilityTable}/>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="w-full mb-4">
            <Accordion
              type="single"
              defaultValue="2"
              collapsible
              className="w-full"
            >
              <AccordionItem value="2" className="border-none">
              <AccordionTrigger className="text-lg font-bold text-black bg-white px-3 ">
                  <div className="flex flex-col items-start">
                    <p>Linha do tempo</p>
                    <span className="text-xs font-light">Últimos 30 dias</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="border-none bg-[#F8F7F9] ">
                  <LineChartTimeLineManagment/>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="w-full mb-4">
            <Accordion
              type="single"
              defaultValue="2"
              collapsible
              className="w-full"
            >
              <AccordionItem value="2" className="border-none">
              <AccordionTrigger className="text-lg font-bold text-black bg-white px-3 ">
                  <div className="flex flex-col items-start">
                    <p>IRR</p>
                    <span className="text-xs font-light">Últimos 30 dias</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="border-none bg-[#F8F7F9] ">
                  
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          
        </>
      )}

      {currentTab === 5 && (
              <>
                <h1 className="my-3 text-xl font-bold text-black">Inventário</h1>
                <div className="w-full mb-4">
                  <Accordion
                    type="single"
                    defaultValue="1"
                    collapsible
                    className="w-full"
                  >
                    <AccordionItem value="1" className="border-none">
                      <AccordionTrigger className="text-lg font-bold text-black bg-white px-3 ">
                        <div className="flex flex-col items-start">
                          <p>Riscos</p>
                          <span className="text-xs font-light">Últimos 30 dias</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="border-none bg-[#F8F7F9] ">
                        <div className="mt-6 grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 gap-3">
                          <DonutCardCriticity conversionIndex={critData} />
                          <DonutCardStatus conversionIndex={statusData} />

                          <DynamicTableManagment title="Por ambiente" data={environmentTableData}/>
                          <DynamicTableManagment title="Por idade" data={ageTableData}/>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="w-full mb-4">
                  <Accordion
                    type="single"
                    defaultValue="2"
                    collapsible
                    className="w-full"
                  >
                    <AccordionItem value="2" className="border-none">
                    <AccordionTrigger className="text-lg font-bold text-black bg-white px-3 ">
                        <div className="flex flex-col items-start">
                          <p>Top 10</p>
                          <span className="text-xs font-light">Últimos 30 dias</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="border-none bg-[#F8F7F9] ">
                        <div className="mt-6 grid grid-cols-1 gap-3">
                        <ActiveTableIntrusion title="Ativos" data={activeTable}/>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="w-full mb-4">
                  <Accordion
                    type="single"
                    defaultValue="2"
                    collapsible
                    className="w-full"
                  >
                    <AccordionItem value="2" className="border-none">
                    <AccordionTrigger className="text-lg font-bold text-black bg-white px-3 ">
                        <div className="flex flex-col items-start">
                          <p>Linha do tempo</p>
                          <span className="text-xs font-light">Últimos 30 dias</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="border-none bg-[#F8F7F9] ">
                        <LineChartTimeLineManagment/>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="w-full mb-4">
                  <Accordion
                    type="single"
                    defaultValue="2"
                    collapsible
                    className="w-full"
                  >
                    <AccordionItem value="2" className="border-none">
                    <AccordionTrigger className="text-lg font-bold text-black bg-white px-3 ">
                        <div className="flex flex-col items-start">
                          <p>IRR</p>
                          <span className="text-xs font-light">Últimos 30 dias</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="border-none bg-[#F8F7F9] ">
                        
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                
              </>
            )}

    </main>
  );
}
