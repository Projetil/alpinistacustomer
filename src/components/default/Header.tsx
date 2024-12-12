"use client";
import { MenuIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { PiBuildingsBold, PiShieldStarFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { GoHomeFill } from "react-icons/go";
import { BsGlobe2 } from "react-icons/bs";
import { MdBugReport, MdOutlineBallot } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [title, setTitle] = useState("");

  useEffect(() => {
    switch (pathname) {
      case "/home":
        setTitle("Home");
        break;
      case "/actives":
        setTitle("Ativos");
        break;
      case "/pentest":
        setTitle("Pentest");
        break;
      case "/issues-risks":
        setTitle("Issues e riscos");
        break;
      case "/questionnaire":
        setTitle("Questionario");
        break;
      case "/environment":
        setTitle("Ambientes");
        break;
      case "/configuracoes":
        setTitle("Configurações");
        break;
    }
  }, [pathname]);

  return (
    <header className="flex md:hidden w-full p-4 items-center justify-start">
      <div className="md:hidden flex items-center justify-between p-4 ">
        <div className="flex items-center justify-start gap-4">
          <button onClick={() => setIsOpen(!isOpen)}>
            <MenuIcon className="w-6 h-6 text-[#003F5E]" />
          </button>
          <h1 className="text-xl font-semibold text-[#003F5E]">{title}</h1>
        </div>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button className="hidden"></button>
        </DialogTrigger>
        <DialogContent className="fixed z-50 bg-white w-64 shadow-lg md:hidden">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Menu</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <nav className="space-y-4 mt-8">
              <ul className="flex flex-col gap-2">
                <li
                  className={`md:hover:bg-[#F0F8FF] font-semibold ${
                    pathname === "/home"
                      ? "bg-[#F0F8FF] text-[#3088EE] p-2 rounded-lg"
                      : "text-[#8C8B91]"
                  }`}
                >
                  <a
                    href="/home"
                    className="flex items-center justify-start gap-2"
                  >
                    <GoHomeFill size={22} />
                    <span>Home</span>
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
                    <span>Ativos</span>
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
                    <span>Pentest</span>
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
                    <span>Issues e Riscos</span>
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
                    <span>Questionários</span>
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
                    <span>Ambientes</span>
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
                    <span>Configurações</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="p-4 hidden md:block">
            <button className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100">
              <span>Recolher</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
