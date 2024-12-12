"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

export interface ITableAccount {
  id: number;
  name: string;
  openModalDetails: () => void;
  active: string;
  state: string;
  severidade: string;
}

const CardAccountMobile = ({
  id,
  name,
  openModalDetails,
  active,
  state,
  severidade,
}: ITableAccount) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full px-2 py-4 space-y-2 bg-white rounded-xl text-[#636267]">
      <button
        onClick={toggleCard}
        className="flex justify-between items-center w-full text-left "
      >
        <div className="flex flex-col gap-3">
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-[#8C8B91]">ID: {id}</p>
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
        <div
          onClick={() => openModalDetails()}
          className="pt-4 space-y-2 bg-white rounded-lg shadow-sm text-sm"
        >
          <div>
            <p className="text-[#818086] ">Ativo:</p>
            <span className="font-semibold ">{active}</span>
          </div>
          <div className="flex justify-between ">
            <div>
              <p className="text-[#818086] ">Status:</p>
              <p className="font-semibold ">{state}</p>
            </div>
            <div>
              <p className="text-[#818086] ">Severidade:</p>
              <p className="font-semibold ">{severidade}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardAccountMobile;
