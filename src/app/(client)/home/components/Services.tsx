"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import CardServices from "./CardServices";
import { IService } from "@/types/ICharts";

interface ServiceProps {
  service: IService[];
}

const Services: React.FC<ServiceProps> = ({ service }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full px-2 py-4 space-y-2 bg-[#F8F7F9] rounded-xl text-[#636267]">
      <button
        onClick={toggleCard}
        className={`flex justify-between items-center bg-white py-2 rounded-lg w-full text-left ${
          isOpen == true ? "mb-8" : "mb-0"
        }`}
      >
        <div className="flex flex-col justify-center items-start px-2">
          <span className="text-lg font-bold text-[#050506]">Por serviço</span>
          <span className="text-sm text-[#8C8B91]">
            Número de riscos e criticidade
          </span>
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
        <div className="grid grid-cols-2 grid-rows-3 lg:grid-rows-2 lg:grid-cols-3 gap-3">
          <CardServices
            title="Superfície de ataque"
            value={service?.find((s) => s.origin === 1)?.value || 0}
          />
          <CardServices
            title="Inteligência de ameaças"
            value={service?.find((s) => s.origin === 2)?.value || 0}
          />
          <CardServices
            title="Gestão de vulnerabilidade"
            value={service?.find((s) => s.origin === 3)?.value || 0}
          />
          <CardServices
            title="Teste de intrusão"
            value={service?.find((s) => s.origin === 4)?.value || 0}
          />
          <CardServices
            title="Terceiros"
            value={service?.find((s) => s.origin === 5)?.value || 0}
          />
          <CardServices
            title="Conformidade"
            value={service?.find((s) => s.origin === 6)?.value || 0}
          />
        </div>
      )}
    </div>
  );
};

export default Services;
