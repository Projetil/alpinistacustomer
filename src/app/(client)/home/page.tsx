/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
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
import ThirdPartiesTable from "./components/ThirdPartiesTable";
import ConformityTable from "./components/ConformityTable";
import DiffIRRChart from "./components/charts/DiffIRRChart";
import IRRChart from "./components/charts/IRRChart";
import {
  ICriticity,
  IHeader,
  ICount,
  IService,
  ITimeCorrection,
  IPizzaChartIRR,
  IIdentifiedAndFixedIRR,
  ITableSeverity,
  AttackSurfaceAssetsResponse,
  IAttackSurfaceRisks,
  ITotalDangers,
  IRiskCards,
  IIntelligenceTimeLine,
} from "@/types/ICharts";
import Tab1Service from "@/services/Tab1HomeService";
import Tab2Service from "@/services/Tab2HomeService";
import { useCustomerContext } from "@/contexts/CustomerContext";
import Tab3Service from "@/services/Tab3HomeService";
import {
  ICriticityHome,
  IIrrHome,
  IStatusHome,
  ITab4And5HomeTable,
} from "@/types/ITab4And5";
import Tab4And5HomeService from "@/services/Tab4And5HomeService";

const tabs = [
  { value: 1, name: "Todos" },
  { value: 2, name: "Superfície de ataques" },
  { value: 3, name: "Inteligência de ameaças" },
  { value: 4, name: "Gestão de vulnerabilidade" },
  { value: 5, name: "Teste de intrusão" },
  { value: 6, name: "Terceiros" },
  { value: 7, name: "Conformidade" },
];

export default function HomePage() {
  const [currentTab, setCurrentTab] = useState(1);
  const { customers } = useCustomerContext();
  //tab 1
  const [headers, setHeaders] = useState<IHeader>();
  const [criticity, setCriticity] = useState<ICriticity[]>();
  const [riskCount, setRiskCount] = useState<ICount[]>([]);
  const [services, setServices] = useState<IService[]>([]);
  const [timeCorrection, setTimeCorrection] = useState<ITimeCorrection[]>([]);
  const [pizzaGraphData, setPizzaGraphData] = useState<IPizzaChartIRR>();
  const [barGraphDataIRR, setBarGraphDataIRR] = useState<
    IIdentifiedAndFixedIRR[]
  >([]);
  const [timeLineIRR, setTimeLineIRR] = useState<IIdentifiedAndFixedIRR[]>([]);
  const [tableSeverity, setTableSeverity] = useState<ITableSeverity[]>([]);

  //tab 2
  const [tab2Assets, setTab2Assets] = useState<AttackSurfaceAssetsResponse>();
  const [tab2Risk, setTab2Risk] = useState<IAttackSurfaceRisks>();

  //tab 3
  const [tab3TotalRisks, setTab3TotalRisks] = useState<ITotalDangers>();
  const [tab3Cards, setTab3Cards] = useState<IRiskCards>();
  const [tab3TimeLine, setTab3TimeLine] = useState<IIntelligenceTimeLine[]>([]);

  //tab 6

  const [error, setError] = useState<string | null>(null);

  //tab 4
  const [vulnerabityCriticity, setVulnerabityCriticity] =
    useState<ICriticityHome>();
  const [vulnerabityStatus, setVulnerabityStatus] = useState<IStatusHome>();
  const [vulnerabityEnvironment, setVulnerabityEnvironment] = useState<
    ITab4And5HomeTable[]
  >([]);
  const [vulnerabityAge, setVulnerabityAge] = useState<ITab4And5HomeTable[]>(
    []
  );
  const [vulnerabityAssets, setVulnerabityAssets] = useState<
    ITab4And5HomeTable[]
  >([]);
  const [vulnerabitySeverity, setVulnerabitySeverity] = useState<
    ITab4And5HomeTable[]
  >([]);
  const [vulnerabityIrr, setVulnerabityIrr] = useState<IIrrHome>();

  //tab 5
  const [intrusionCriticity, setIntrusionCriticity] =
    useState<ICriticityHome>();
  const [intrusionStatus, setIntrusionStatus] = useState<IStatusHome>();
  const [intrusionEnvironment, setIntrusionEnvironment] = useState<
    ITab4And5HomeTable[]
  >([]);
  const [intrusionAge, setIntrusionAge] = useState<ITab4And5HomeTable[]>([]);
  const [intrusionAssets, setIntrusionAssets] = useState<ITab4And5HomeTable[]>(
    []
  );
  const [intrusionIrr, setIntrusionIrr] = useState<IIrrHome>();

  interface TabConfig {
    endpoints: {
      [key: string]: () => Promise<any>;
    };
    setters: {
      [key: string]: (data: any) => void;
    };
  }

  const tabsConfig: Record<number, TabConfig> = {
    1: {
      endpoints: {
        headers: () =>
          Tab1Service.GetHeader(customers ? customers.companyId : 0),
        criticity: () =>
          Tab1Service.GetCriticity(customers ? customers.companyId : 0),
        riskCount: () =>
          Tab1Service.GetRiskCount(customers ? customers.companyId : 0),
        services: () =>
          Tab1Service.GetService(customers ? customers.companyId : 0),
        timeCorrection: () =>
          Tab1Service.GetTimeCorrection(customers ? customers.companyId : 0),
        pizzaGraphData: () =>
          Tab1Service.GetPizzaChartIRR(customers ? customers.companyId : 0, 1),
        barGraphDataIRR: () =>
          Tab1Service.GetIdentifiedAndFixedIRR(
            customers ? customers.companyId : 0,
            2024
          ),
        timeLineIRR: () =>
          Tab1Service.GetIdentifiedAndFixedIRR(
            customers ? customers.companyId : 0,
            2024
          ),
        tableSeverity: () =>
          Tab1Service.GetTableSeverity(customers ? customers.companyId : 0),
      },
      setters: {
        headers: setHeaders,
        criticity: setCriticity,
        riskCount: setRiskCount,
        services: setServices,
        timeCorrection: setTimeCorrection,
        pizzaGraphData: setPizzaGraphData,
        barGraphDataIRR: setBarGraphDataIRR,
        timeLineIRR: setTimeLineIRR,
        tableSeverity: setTableSeverity,
      },
    },
    2: {
      endpoints: {
        tab2Assets: () =>
          Tab2Service.GetAssets(customers ? customers.companyId : 0),
        tab2Risk: () =>
          Tab2Service.GetRisks(customers ? customers.companyId : 0),
      },
      setters: {
        tab2Assets: setTab2Assets,
        tab2Risk: setTab2Risk,
      },
    },
    3: {
      endpoints: {
        tab3TotalRisks: () =>
          Tab3Service.GetTotalDangers(customers ? customers.companyId : 0),
        tab3TimeLine: () =>
          Tab3Service.GetTimeLine(customers ? customers.companyId : 0, 2024),
        tab3Cards: () =>
          Tab3Service.GetCards(customers ? customers.companyId : 0),
      },
      setters: {
        tab3TotalRisks: setTab3TotalRisks,
        tab3TimeLine: setTab3TimeLine,
        tab3Cards: setTab3Cards,
      },
    },
    4: {
      endpoints: {
        vulnerabityCriticity: () =>
          Tab4And5HomeService.GetCriticity(
            "Vulnerability",
            customers ? customers.companyId : 0
          ),
        vulnerabityStatus: () =>
          Tab4And5HomeService.GetStatus(
            "Vulnerability",
            customers ? customers.companyId : 0
          ),
        vulnerabityEnvironment: () =>
          Tab4And5HomeService.GetEnvironment(
            "Vulnerability",
            customers ? customers.companyId : 0
          ),
        vulnerabityAge: () =>
          Tab4And5HomeService.GetAge(
            "Vulnerability",
            customers ? customers.companyId : 0
          ),
        vulnerabityAssets: () =>
          Tab4And5HomeService.GetAssets(
            "Vulnerability",
            customers ? customers.companyId : 0
          ),
        vulnerabitySeverity: () =>
          Tab4And5HomeService.GetSeverity(
            "Vulnerability",
            customers ? customers.companyId : 0
          ),
        vulnerabityIrr: () =>
          Tab4And5HomeService.GetIrr(
            "Vulnerability",
            customers ? customers.companyId : 0
          ),
      },
      setters: {
        vulnerabityCriticity: setVulnerabityCriticity,
        vulnerabityStatus: setVulnerabityStatus,
        vulnerabityEnvironment: setVulnerabityEnvironment,
        vulnerabityAge: setVulnerabityAge,
        vulnerabityAssets: setVulnerabityAssets,
        vulnerabitySeverity: setVulnerabitySeverity,
        vulnerabityIrr: setVulnerabityIrr,
      },
    },
    5: {
      endpoints: {
        intrusionCriticity: () =>
          Tab4And5HomeService.GetCriticity(
            "Intrusion",
            customers ? customers.companyId : 0
          ),
        intrusionStatus: () =>
          Tab4And5HomeService.GetStatus(
            "Intrusion",
            customers ? customers.companyId : 0
          ),
        intrusionEnvironment: () =>
          Tab4And5HomeService.GetEnvironment(
            "Intrusion",
            customers ? customers.companyId : 0
          ),
        intrusionAge: () =>
          Tab4And5HomeService.GetAge(
            "Intrusion",
            customers ? customers.companyId : 0
          ),
        intrusionAssets: () =>
          Tab4And5HomeService.GetAssets(
            "Intrusion",
            customers ? customers.companyId : 0
          ),
        intrusionIrr: () =>
          Tab4And5HomeService.GetIrr(
            "Intrusion",
            customers ? customers.companyId : 0
          ),
      },
      setters: {
        intrusionCriticity: setIntrusionCriticity,
        intrusionStatus: setIntrusionStatus,
        intrusionEnvironment: setIntrusionEnvironment,
        intrusionAge: setIntrusionAge,
        intrusionAssets: setIntrusionAssets,
        intrusionIrr: setIntrusionIrr,
      },
    },
    6: {
      endpoints: {},
      setters: {},
    },
    7: {
      endpoints: {},
      setters: {},
    },
  };

  const fetchCharts = async (tabId: number) => {
    try {
      const config = tabsConfig[tabId];

      const { endpoints, setters } = config;
      const keys = Object.keys(endpoints) as (keyof typeof endpoints)[];

      const results = await Promise.all(keys.map((key) => endpoints[key]()));

      keys.forEach((key, index) => {
        const setter = setters[key];
        if (setter) setter(results[index]);
      });
    } catch (err: any) {
      setError(err.message || "Erro ao carregar os dados.");
      console.log(error);
    }
  };

  const severityNames: Record<number, string> = {
    1: "Info",
    2: "Baixo",
    3: "Médio",
    4: "Alto",
    5: "Crítico",
  };

  const firstTabTableTop5 = [...tableSeverity]
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  useEffect(() => {
    fetchCharts(currentTab);
  }, [currentTab]);

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
          <Risks headers={headers} />
          <section className="flex flex-col lg:flex-row gap-5 w-full mt-8 overflow-x-auto">
            <div className="h-full w-full lg:w-1/2">
              <ResponsiveContainer>
                <BarChartHome criticity={criticity} />
              </ResponsiveContainer>
            </div>
            <div className="h-full w-full lg:w-1/2">
              <ResponsiveContainer>
                <LineChartHome riskCount={riskCount || []} />
              </ResponsiveContainer>
            </div>
          </section>
          <section className="my-3 w-full">
            <Services service={services} />
          </section>
          <section className="my-3 w-full">
            <HorizontalBarChart timeCorrection={timeCorrection} />
          </section>
          <section className="my-3 w-full">
            <div className="overflow-x-auto bg-white rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                {/* Cabeçalho */}
                <thead className="bg-[#EEEEF0]">
                  <tr>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Severidade
                    </th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      QTD
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {firstTabTableTop5.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-5 text-sm text-center text-gray-800 whitespace-nowrap">
                        {severityNames[item.severity] || "Desconhecido"}
                      </td>
                      <td className="px-4 py-5 text-sm text-center text-gray-800 whitespace-nowrap">
                        {item.riskName}
                      </td>
                      <td className="px-4 py-5 text-sm text-center text-gray-800 whitespace-nowrap">
                        {item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section className="my-3 w-full">
            <IRR
              pizzaChartData={pizzaGraphData}
              barGraphDataIRR={barGraphDataIRR}
              timeLineIRR={timeLineIRR}
            />
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
                    <CardContainerAttackSurface
                      title="Endereços IP"
                      data={tab2Assets ? tab2Assets.ipAddress : 0}
                    />
                    <CardContainerAttackSurface
                      title="Subdomínios"
                      data={tab2Assets ? tab2Assets.subdomain : 0}
                    />
                    <CardContainerAttackSurface
                      title="Aplicações WEB"
                      data={tab2Assets ? tab2Assets.webApplication : 0}
                    />
                    <CardContainerAttackSurface
                      title="Contas e-mail"
                      data={tab2Assets ? tab2Assets.emailAccount : 0}
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
                  Riscos (Issues)
                </AccordionTrigger>
                <AccordionContent className="border-none bg-[#F8F7F9] ">
                  <div className="mt-6 grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 gap-3">
                    <CardContainerAttackSurface
                      title="Aplicações WEB"
                      data={tab2Risk ? tab2Risk.webApplication : 0}
                    />
                    <CardContainerAttackSurface
                      title="Redes"
                      data={tab2Risk ? tab2Risk.network : 0}
                    />
                    <CardContainerAttackSurface
                      title="Marca"
                      data={tab2Risk ? tab2Risk.brand : 0}
                    />
                    <CardContainerAttackSurface
                      title="Vazamentos de dados"
                      data={tab2Risk ? tab2Risk.dataLeak : 0}
                    />
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
                <AccordionContent className="border-none bg-[#F8F7F9] ">
                  <TotalDangers totalDangers={tab3TotalRisks} />
                  <div className="mt-6 grid grid-cols-1 grid-rows-4 md:grid-cols-6 md:grid-rows-2 gap-3">
                    <CardContainer
                      title="Credencias"
                      data={tab3Cards ? tab3Cards.credentials : 0}
                      className="md:col-span-2"
                    />
                    <CardContainer
                      title="Vazamentos"
                      data={tab3Cards ? tab3Cards.dataLeak : 0}
                      className="md:col-span-2"
                    />
                    <CardContainer
                      title="Domínios Similares"
                      data={tab3Cards ? tab3Cards.similarDomain : 0}
                      className="md:col-span-2"
                    />
                    <CardContainer
                      title="Redes Sociais"
                      data={tab3Cards ? tab3Cards.socialMedia : 0}
                      className="md:col-span-3"
                    />
                    <CardContainer
                      title="Mobile"
                      data={tab3Cards ? tab3Cards.mobile : 0}
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
                  <LineChartTimeLine timeline={tab3TimeLine} />
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
                    <DonutCardCriticity
                      conversionIndex={vulnerabityCriticity}
                    />
                    <DonutCardStatus conversionIndex={vulnerabityStatus} />

                    <DynamicTableManagment
                      title="Por ambiente"
                      data={vulnerabityEnvironment}
                    />
                    <DynamicTableManagment
                      title="Por idade"
                      data={vulnerabityAge}
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
                    <p>Top 10</p>
                    <span className="text-xs font-light">Últimos 30 dias</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="border-none bg-[#F8F7F9] ">
                  <div className="mt-6 grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-3">
                    <DynamicTableManagmentTop
                      title="Ativos"
                      data={vulnerabityAssets}
                    />
                    <DynamicTableManagmentTop
                      title="Vulnerabilidade"
                      data={vulnerabitySeverity}
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
                  <LineChartTimeLineManagment
                    isVulne={true}
                    companyId={customers ? customers.companyId : 0}
                  />
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
                  <div className="flex  flex-col items-center justify-center p-4 mt-4 bg-white rounded-lg">
                    <div className="bg-[#F0F8FF] flex flex-col items-center p-4 w-full">
                      <div className="flex gap-4 justify-center items-center w-full">
                        <span className="text-sm">Diferença no último mês</span>
                        <div className="w-16 py-2 text-[#028B53] bg-[#C3E7CF] flex justify-center items-center rounded-lg">
                          +{vulnerabityIrr?.percentageIRR}%
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-black">
                        {vulnerabityIrr?.totalIRR}
                      </div>
                    </div>
                    <DiffIRRChart irrData={vulnerabityIrr} />
                  </div>
                  <div className="p-6 w-full bg-white mt-4 rounded-lg">
                    <IRRChart irrData={vulnerabityIrr} />
                    <h1 className="mt-8 text-center">Month</h1>
                  </div>
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
                    <DonutCardCriticity conversionIndex={intrusionCriticity} />
                    <DonutCardStatus conversionIndex={intrusionStatus} />

                    <DynamicTableManagment
                      title="Por ambiente"
                      data={intrusionEnvironment}
                    />
                    <DynamicTableManagment
                      title="Por idade"
                      data={intrusionAge}
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
                    <p>Top 10</p>
                    <span className="text-xs font-light">Últimos 30 dias</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="border-none bg-[#F8F7F9] ">
                  <div className="mt-6 grid grid-cols-1 gap-3">
                    <ActiveTableIntrusion
                      title="Ativos"
                      data={intrusionAssets}
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
                  <LineChartTimeLineManagment
                    isVulne={false}
                    companyId={customers ? customers.companyId : 0}
                  />
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
                <AccordionContent className="border-none bg-[#F8F7F9] rounded-lg">
                  <div className="flex  flex-col items-center justify-center p-4 mt-4 bg-white rounded-lg">
                    <div className="bg-[#F0F8FF] flex flex-col items-center p-4 w-full">
                      <div className="flex gap-4 justify-center items-center w-full">
                        <span className="text-sm">Diferença no último mês</span>
                        <div className="w-16 py-2 text-[#028B53] bg-[#C3E7CF] flex justify-center items-center rounded-lg">
                          +{intrusionIrr?.percentageIRR}%
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-black">
                        {intrusionIrr?.totalIRR}
                      </div>
                    </div>
                    <DiffIRRChart irrData={intrusionIrr} />
                  </div>
                  <div className="p-6 w-full bg-white flex flex-col mt-4 rounded-lg">
                    <IRRChart irrData={intrusionIrr} />
                    <h1 className="mt-8 text-center">Month</h1>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </>
      )}
      {currentTab === 6 && <ThirdPartiesTable />}
      {currentTab === 7 && (
        <>
          <div className="w-full flex flex-col gap-3 mt-4">
            <ConformityTable />
          </div>
        </>
      )}
    </main>
  );
}
