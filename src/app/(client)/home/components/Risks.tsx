"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { ResponsiveContainer } from "recharts";
import CardHome from "./CardHome";
import PieChartHome from "./charts/PieChart";

const CardRisks: React.FC = ({
  
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full px-2 py-4 space-y-2 bg-[#F8F7F9] rounded-xl text-[#636267]">
      <button
        onClick={toggleCard}
        className={`flex justify-between items-center bg-white py-2 rounded-lg w-full text-left ${isOpen == true ? "mb-8" : "mb-0"}`}
      >
        <div className="flex flex-col justify-center items-start px-2">
            <span className="text-lg font-bold">Riscos</span>
            <span>Últimos 30 dias</span>
        </div>
        <ChevronDownIcon
          size={20}
          color="#093970"
          className={`w-7 h-7 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <section className="flex flex-col md:flex-row gap-3 my-5 w-full">
        <div className="w-full lg:w-1/3">
          <ResponsiveContainer>
            <PieChartHome />
          </ResponsiveContainer>
        </div>
        <div className="grid grid-rows-2 grid-cols-2 md:grid-rows-3 gap-3 w-full lg:w-2/3">
          <CardHome title="Pendente" value={50} />
          <CardHome title="Vazamentos" value={50} />
          <CardHome title="Aceito" value={50} />
          <CardHome title="Corrigido" value={50} />
          <CardHome title="Retest" value={50} />
          <CardHome title="Rearbeto" value={50} />
        </div>
      </section>
      )}
    </div>
  );
};

export default CardRisks ;
