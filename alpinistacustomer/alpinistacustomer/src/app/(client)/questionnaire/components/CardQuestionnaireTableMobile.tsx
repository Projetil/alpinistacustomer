// components/CompanyCard.tsx
"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CardQuestionnaire = ({
  createDate,
  limitDate,
  name,
  id,
  status,
  type,
}: {
  createDate: string;
  limitDate: string;
  name: string;
  id: number;
  status: string | JSX.Element;
  type: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useRouter();

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
          <span className="text-lg font-medium">{name}</span>
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
              {status}
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
            <Button
              onClick={() => {
                navigation.push(`/questionnaire/${id}`);
              }}
              className="bg-[#3088EE]"
            >
              Visualizar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardQuestionnaire;
