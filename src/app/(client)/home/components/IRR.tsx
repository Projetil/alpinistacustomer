"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import BarChartIRR from "./charts/BarChartIRR";
import LineChartIRR from "./charts/LineChartIRR";
import PieChartIRR from "./charts/PieChartIRR";
import { IIdentifiedAndFixedIRR, IPizzaChartIRR } from "@/types/ICharts";

interface IRRProps {
  pizzaChartData?: IPizzaChartIRR,
  barGraphDataIRR?: IIdentifiedAndFixedIRR[],
  timeLineIRR?: IIdentifiedAndFixedIRR[],
}

const IRR: React.FC<IRRProps> = ({pizzaChartData, barGraphDataIRR, timeLineIRR}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full px-2 py-4 space-y-2 bg-[#F8F7F9] rounded-xl text-[#636267]">
      {/* Cabeçalho do Accordion */}
      <button
        onClick={toggleCard}
        className={`flex justify-between bg-white py-2 rounded-lg items-center w-full text-left ${
          isOpen ? "mb-8" : "mb-0"
        }`}
      >
        <div className="flex flex-col justify-center items-start px-2">
          <span className="text-lg font-bold">IRR (Índice de redução de risco)</span>
          <span>Riscos identificados vs Corrigidos</span>
        </div>
        <ChevronDownIcon
          size={20}
          color="#093970"
          className={`w-7 h-7 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {/* Conteúdo do Accordion */}
      {isOpen && (
        <div className="flex flex-col space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-4">
          {/* Gráfico de Pizza */}
          <div className="p-4 bg-white rounded-lg">
            <PieChartIRR pizzaChartData={pizzaChartData}/>
          </div>

          {/* Gráfico de Barras */}
          <div className="p-4 bg-white rounded-lg">
            <BarChartIRR barGraphDataIRR={barGraphDataIRR}/>
          </div>

          {/* Gráfico de Linha */}
          <div className="p-4 bg-white rounded-lg">
            <LineChartIRR timeLineIRR={timeLineIRR}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default IRR;
