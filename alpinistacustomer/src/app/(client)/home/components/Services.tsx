"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import CardServices from "./CardServices";
const Services: React.FC = ({
  
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full px-2 py-4 space-y-2 bg-white rounded-xl text-[#636267]">
      <button
        onClick={toggleCard}
        className={`flex justify-between items-center w-full text-left ${isOpen == true ? "mb-8" : "mb-0"}`}
      >
        <div className="flex flex-col justify-center items-start px-2">
            <span className="text-lg font-bold text-[#050506]">Por serviço</span>
            <span className="text-sm text-[#8C8B91]">Número de riscos e criticidade</span>
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
            <CardServices title="Superfície de ataque" value={6435}/>
            <CardServices title="Inteligência de ameaças" value={6435}/>
            <CardServices title="Gestão de vulnerabilidade" value={6435}/>
            <CardServices title="Teste de intrusão" value={6435}/>
            <CardServices title="Terceiros" value={6435}/>
            <CardServices title="Conformidade" value={6435}/>
        </div>
      )}
    </div>
  );
};

export default Services ;
