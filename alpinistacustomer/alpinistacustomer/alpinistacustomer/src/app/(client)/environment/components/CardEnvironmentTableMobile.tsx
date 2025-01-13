// components/CompanyCard.tsx
"use client";

import { ActiveTable } from "@/app/data/tablesData";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import SeverityBadge from "../../components/SeverityBadge";



const CardEnvironment: React.FC<ActiveTable> = ({
  active,
  severity,
  issuesRisks,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full px-2 py-4 space-y-2 bg-white rounded-xl text-[#636267]">
      <button
        onClick={toggleCard}
        className="flex justify-between items-center w-full text-left"
      >
        <span className="text-lg font-medium">Nome Empresa S.A</span>
        <ChevronDownIcon
          size={20}
          color="#093970"
          className={`w-7 h-7 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className=" mt-2 space-y-2 bg-white rounded-lg shadow-sm">
          <div>
            <p className="text-[#818086] text-sm">Ativo:</p>
            <span className="font-semibold ">{active}</span>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-[#818086] text-sm">Issues e riscos:</p>
              <p className="font-semibold ">{issuesRisks}</p>
            </div>
            <div>
              <p className="text-[#818086] text-sm">Severidade:</p>
              <SeverityBadge severity={parseFloat(severity)}/>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-1/2">
              <p className="text-[#818086] text-sm">IP:</p>
              <p className="font-semibold ">291.789.634</p>
            </div>
            <div className="w-1/2 flex flex-col items-center">
              <p className="text-[#818086] text-sm text-start">Porta:</p>
              <p className="font-semibold">6300</p>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <div>
              <p className="font-semibold text-[#050506] cursor-pointer">Editar</p>
            </div>
            <div>
              <p className="font-semibold text-[#B3001E] cursor-pointer">Excluir</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardEnvironment;
