"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import BarChartIRR from "./charts/BarChartIRR";
import LineChartIRR from "./charts/LineChartIRR";
import PieChartIRR from "./charts/PieChartIRR";


const IRR: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full px-2 py-4 space-y-2 bg-white rounded-xl text-[#636267]">
      {/* Cabeçalho do Accordion */}
      <button
        onClick={toggleCard}
        className={`flex justify-between items-center w-full text-left ${
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
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <PieChartIRR />
          </div>

          {/* Gráfico de Barras */}
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <BarChartIRR />
          </div>

          {/* Gráfico de Linha */}
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <LineChartIRR />
          </div>
        </div>
      )}
    </div>
  );
};

export default IRR;
