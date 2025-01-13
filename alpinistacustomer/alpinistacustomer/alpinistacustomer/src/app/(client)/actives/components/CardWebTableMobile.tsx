// components/CompanyCard.tsx
"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

interface CardWebProps {
    actives: string,
    issues: number,
    port: number
}

const CardWeb: React.FC<CardWebProps> = ({
  actives,
  issues,
  port,
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
            <span className="font-semibold ">{actives}</span>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-[#818086] text-sm">Issues e riscos:</p>
              <p className="font-semibold ">{issues}</p>
            </div>
            <div>
              <p className="text-[#818086] text-sm">Porta:</p>
              <p className="font-semibold ">{port}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardWeb;
