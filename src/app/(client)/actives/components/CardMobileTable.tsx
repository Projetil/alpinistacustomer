// components/CompanyCard.tsx
"use client";

import {  MobileTable } from "@/app/data/tablesData";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import SeverityBadge from "../../components/SeverityBadge";



const CardMobile: React.FC<MobileTable> = ({
  active,
  severity,
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
          <div className="flex justify-start">
            <div>
              <p className="text-[#818086] text-sm">Severidade:</p>
              <SeverityBadge severity={parseFloat(severity)}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardMobile;
