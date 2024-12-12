// components/CompanyCard.tsx
"use client";

import { QuestionnaireTable } from "@/app/data/tablesData";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import StatusBagde from "./StatusBagde";
import { Button } from "@/components/ui/button";

const CardQuestionnaire: React.FC<QuestionnaireTable> = ({
  createDate,
  limitDate,
  status,
  type,
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
        <div className="flex flex-col gap-2">
          <span className="text-lg font-medium">Nome do Questionário</span>
          <span className="text-sm font-base">Ativo</span>
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
        <div className=" mt-2 space-y-2 bg-white rounded-lg shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-[#818086] text-sm">Tipo:</p>
              <p className="font-semibold text-sm">{type}</p>
            </div>
            <div>
              <p className="text-[#818086] text-sm">Status:</p>
              <StatusBagde status={status} />
            </div>
          </div>
          <div className="flex justify-between pt-2">
            <div>
              <p className="text-[#818086] text-sm">Criado:</p>
              <p className="font-semibold text-sm">{createDate}</p>
            </div>
            <div>
              <p className="text-[#818086] text-sm text-start">Limite:</p>
              <p className="font-semibold text-sm">{limitDate}</p>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button className="bg-transparent text-[#1A69C4] font-semibold text-lg">Visualizar</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardQuestionnaire;
