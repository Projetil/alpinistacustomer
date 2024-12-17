"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { RxExit } from "react-icons/rx";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { GoHomeFill } from "react-icons/go";
import { BsGlobe2 } from "react-icons/bs";
import { PiBuildingsBold, PiShieldStarFill } from "react-icons/pi";
import { MdBugReport, MdOutlineBallot } from "react-icons/md";
import { IoMdSettings, IoMdArrowBack, IoMdArrowForward } from "react-icons/io";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`hidden md:flex h-[100vh]`}>
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          isOpen ? "w-[300px]" : "w-[80px]"
        } bg-white h-full md:flex flex-col justify-between items-start overflow-y-auto rounded-3xl px-3 py-6`}
      >
        <div className="flex items-center justify-between w-full mb-6">
          {isOpen && (
            <h1 className="text-xl font-bold text-[#FF8041] w-48 h-auto">
              <Image
                src="/logo.png"
                alt="Logo"
                className="w-full h-full"
                width={500}
                height={500}
              />
            </h1>
          )}
        </div>
        <ul className="space-y-4 h-full text-base">
          <li
            className={`md:hover:bg-[#F0F8FF] font-semibold ${
              pathname === "/home"
                ? "bg-[#F0F8FF] text-[#3088EE] p-2 rounded-lg"
                : "text-[#8C8B91]"
            }`}
          >
            <a href="/home" className="flex items-center justify-start gap-2">
              <GoHomeFill size={22} />
              {isOpen && <span>Home</span>}
            </a>
          </li>
          <li
            className={`md:hover:bg-[#F0F8FF] font-semibold ${
              pathname === "/actives"
                ? "bg-[#F0F8FF] text-[#3088EE] p-2 rounded-lg"
                : "text-[#8C8B91]"
            }`}
          >
            <a
              href="/actives"
              className="flex items-center justify-start gap-2"
            >
              <BsGlobe2 size={22} />
              {isOpen && <span>Ativos</span>}
            </a>
          </li>
          <li
            className={`md:hover:bg-[#F0F8FF] font-semibold ${
              pathname === "/pentest"
                ? "bg-[#F0F8FF] text-[#3088EE] p-2 rounded-lg"
                : "text-[#8C8B91]"
            }`}
          >
            <a
              href="/pentest"
              className="flex items-center justify-start gap-2"
            >
              <PiShieldStarFill size={22} />
              {isOpen && <span>Pentest</span>}
            </a>
          </li>
          <li
            className={`md:hover:bg-[#F0F8FF] font-semibold ${
              pathname === "/issues-risks"
                ? "bg-[#F0F8FF] text-[#3088EE] p-2 rounded-lg"
                : "text-[#8C8B91]"
            }`}
          >
            <a
              href="/issues-risks"
              className="flex items-center justify-start gap-2"
            >
              <MdBugReport size={22} />
              {isOpen && <span>Issues e Riscos</span>}
            </a>
          </li>
          <li
            className={`md:hover:bg-[#F0F8FF] font-semibold ${
              pathname === "/questionnaire"
                ? "bg-[#F0F8FF] text-[#3088EE] p-2 rounded-lg"
                : "text-[#8C8B91]"
            }`}
          >
            <a
              href="/questionnaire"
              className="flex items-center justify-start gap-2"
            >
              <MdOutlineBallot size={22} />
              {isOpen && <span>Questionários</span>}
            </a>
          </li>
          <li
            className={`md:hover:bg-[#F0F8FF] font-semibold ${
              pathname === "/environment"
                ? "bg-[#F0F8FF] text-[#3088EE] p-2 rounded-lg"
                : "text-[#8C8B91]"
            }`}
          >
            <a
              href="/environment"
              className="flex items-center justify-start gap-2"
            >
              <PiBuildingsBold size={22} />
              {isOpen && <span>Ambientes</span>}
            </a>
          </li>
          <li
            className={`md:hover:bg-[#F0F8FF] font-semibold ${
              pathname === "/configuracoes"
                ? "bg-[#F0F8FF] text-[#3088EE] p-2 rounded-lg"
                : "text-[#8C8B91]"
            }`}
          >
            <a
              href="/configuracoes"
              className="flex items-center justify-start gap-2"
            >
              <IoMdSettings size={22} />
              {isOpen && <span>Configurações</span>}
            </a>
          </li>
        </ul>
        <button
          onClick={toggleSidebar}
          className="p-2 text-[#3088EE] focus:outline-none mt-6"
        >
          {isOpen ? (
            <div className="flex gap-2 font-bold">
              <IoMdArrowBack size={24} />
              Recolher
            </div>
          ) : (
            <IoMdArrowForward size={24} />
          )}
        </button>
        <Button
          variant={"ghost"}
          className={`flex items-center w-full mt-20 p-4 text-[#63636E] ${
            isOpen ? "justify-start" : "justify-center"
          }`}
        >
          <a href="/signin" className="flex items-center gap-3">
            <RxExit />
            {isOpen && <p className="pt-1">Sair</p>}
          </a>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
