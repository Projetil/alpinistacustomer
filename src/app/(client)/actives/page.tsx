"use client";
import { useEffect, useState } from "react";
import { TbWorld } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import ActiveTable from "./components/ActiveTable";
import { FaFilter } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { LuChevronsUpDown } from "react-icons/lu";
import { IoArrowBack } from "react-icons/io5";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import MobileTable from "./components/MobileTable";

import EnvironmentTable from "../environment/components/EnvironmentTable";
import { IPagedEnvironment } from "@/types/IEnvironment";
import EnvironmentService from "@/services/EnvironmentsService";
import { usePermissionContext } from "@/contexts/PermissionContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useCustomerContext } from "@/contexts/CustomerContext";

const tabs = [
  { value: 1, name: "Todos" },
  { value: 2, name: "Infra" },
  { value: 3, name: "WEB" },
  { value: 4, name: "Mobile" },
  { value: 5, name: "Domínio" },
  { value: 6, name: "Pessoas" },
  { value: 7, name: "Ambientes" },
];

const envTabs = [
  { value: 1, name: "Interno" },
  { value: 2, name: "Terceiro" },
];

export default function ActivesPage() {
  const [currentTab, setCurrentTab] = useState(1);
  const [currentEnvTab, setCurrentEnvTab] = useState(1);
  const navigation = useRouter();
  const [pageInter, setPageInter] = useState(1);
  const [pageExternal, setPageExternal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [interEnv, setInterEnv] = useState<IPagedEnvironment>();
  const [externalEnv, setExternalEnv] = useState<IPagedEnvironment>();
  const { permission, getPermissions, currentPage } = usePermissionContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [orderBy, setOrderBy] = useState("name");
  const [ascending, setAscending] = useState(true);
  const { customers } = useCustomerContext();

  const fetchEnvsIntern = async () => {
    try {
      const res = await EnvironmentService.GetAll(
        pageInter,
        10,
        1,
        customers?.companyId,
        orderBy,
        ascending ? "asc" : "desc"
      );
      setInterEnv(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEnvsExternal = async () => {
    try {
      const res = await EnvironmentService.GetAll(
        pageInter,
        10,
        2,
        customers?.companyId,
        orderBy,
        ascending ? "asc" : "desc"
      );
      setExternalEnv(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEnvsIntern();
  }, [pageInter, loading, orderBy, ascending]);

  useEffect(() => {
    fetchEnvsExternal();
  }, [pageExternal, loading, orderBy, ascending]);

  useEffect(() => {
    if (permission) {
      getPermissions("Ativos");
    }
  }, [permission]);

  useEffect(() => {
    if (currentPage) {
      if (currentPage.hasAcess === false) {
        toast.warning("Você não tem permissão para acessar essa página");
        navigation.push("/home");
      }
    }
  }, [currentPage]);

  return (
    <main className="text-[#636267] w-full flex flex-col gap-1 items-start px-3">
      <section className="hidden md:flex flex-col p-6 md:gap-10 items-start md:mb-3">
        <div className="flex gap-2 items-center text-[#050506]">
          <TbWorld color="#3088EE" size={30} />
          <h2 className="font-semibold md:text-3xl">Ativos</h2>
        </div>
      </section>
      <section className="bg-white p-2 rounded-lg flex w-full lg:w-2/3">
        <div className=" w-full overflow-x-auto flex">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setCurrentTab(tab.value)}
              className={`${
                currentTab == tab.value
                  ? "bg-[#F0F8FF] text-sm text-[#1A69C4]"
                  : ""
              } p-2 font-semibold whitespace-nowrap rounded-lg text-sm w-full`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </section>

      <section className="w-full my-3 flex justify-end lg:hidden">
        <Dialog
          onOpenChange={(open) => {
            if (currentPage) {
              if (
                currentPage.funcs.find((x) => x.name === "Filtrar")?.hasAcess ==
                false
              ) {
                toast.warning(
                  "Você não tem permissão para acessar essa função"
                );
              } else {
                setOpenDialog(open);
              }
            }
          }}
          open={openDialog}
        >
          <DialogTrigger>
            <FaFilter className="cursor-pointer" size={20} color="#818086" />
          </DialogTrigger>
          <DialogContent className="min-w-full min-h-screen h-[550px]  overflow-y-auto">
            <DialogTitle className="hidden" />
            <div className="">
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex items-center gap-2 text-[#093970]">
                  <DialogClose asChild>
                    <IoArrowBack color="#093970" size={23} />
                  </DialogClose>
                  <span className="text-lg font-semibold">Filtros</span>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="">
                  <label className="text-gray-700 font-semibold mb-4">
                    Severidade <span className="text-red-500">*</span>
                  </label>
                  <Drawer>
                    <DrawerTrigger asChild>
                      <button className="bg-transparent w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm outline-none flex items-center text-[#636267] justify-between">
                        Selecione uma opção <LuChevronsUpDown size={16} />
                      </button>
                    </DrawerTrigger>
                    <DrawerContent className="pb-12 px-5">
                      <DrawerTitle className="hidden" />
                      <div className="flex flex-col gap-6">
                        <h1 className="mt-5">Filtrar por severidade</h1>
                        <div className="flex items-center gap-3">
                          <Checkbox
                            name="severity-info"
                            className="flex items-center justify-center data-[state=checked]:bg-[#3088EE] data-[state=checked]:border-[#3088EE]"
                          />
                          <label htmlFor="severity-info">Info</label>
                        </div>
                        <div className="flex items-center gap-3">
                          <Checkbox
                            name="severity-low"
                            className="flex items-center justify-center data-[state=checked]:bg-[#3088EE] data-[state=checked]:border-[#3088EE]"
                          />
                          <label htmlFor="severity-low">Baixo</label>
                        </div>
                        <div className="flex items-center gap-3">
                          <Checkbox
                            name="severity-high"
                            className="flex items-center justify-center data-[state=checked]:bg-[#3088EE] data-[state=checked]:border-[#3088EE]"
                          />
                          <span>Alto</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Checkbox
                            name="severity-medium"
                            className="flex items-center justify-center data-[state=checked]:bg-[#3088EE] data-[state=checked]:border-[#3088EE]"
                          />
                          <label htmlFor="severity-medium">Médio</label>
                        </div>
                        <div className="flex items-center gap-3">
                          <Checkbox
                            name="severity-crit"
                            className="flex items-center justify-center data-[state=checked]:bg-[#3088EE] data-[state=checked]:border-[#3088EE]"
                          />
                          <label htmlFor="severity-crit">Crítico</label>
                        </div>
                        <Button className="w-full py-7 bg-[#3088EE] mt-4">
                          Aplicar filtros
                        </Button>
                      </div>
                    </DrawerContent>
                  </Drawer>
                </div>
                <h1 className="font-semibold">Classificar</h1>
                <div className="flex flex-col gap-4">
                  <h1 className="font-semibold text-lg">Por issues e riscos</h1>
                  <Input
                    placeholder="O que deseja encontrar"
                    className="border-[#D8D9E0] py-6 placeholder:text-[#80828D]"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <h1 className="font-semibold text-lg">Por IP</h1>
                  <Input
                    placeholder="O que deseja encontrar"
                    className="border-[#D8D9E0] py-6 placeholder:text-[#80828D]"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <h1 className="font-semibold text-lg">Por porta</h1>
                  <Input
                    placeholder="O que deseja encontrar"
                    className="border-[#D8D9E0] py-6 placeholder:text-[#80828D]"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <h1 className="font-semibold text-lg">Por classificação</h1>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="bg-white py-3 border border-gray-300 rounded-lg px-3 shadow-sm outline-none text-gray-700 flex items-center justify-between">
                        Selecione uma opção <LuChevronsUpDown size={16} />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent side="bottom" className="rounded-lg">
                      <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            name="classification-low"
                            className="flex items-center justify-center data-[state=checked]:bg-[#3088EE] data-[state=checked]:border-[#3088EE]"
                          />
                          <label htmlFor="classification-low">Baixo</label>
                        </div>
                        <div className="flex items-center gap-3">
                          <Checkbox
                            name="classification-high"
                            className="flex items-center justify-center data-[state=checked]:bg-[#3088EE] data-[state=checked]:border-[#3088EE]"
                          />
                          <span>Alto</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Checkbox
                            name="classification-medium"
                            className="flex items-center justify-center data-[state=checked]:bg-[#3088EE] data-[state=checked]:border-[#3088EE]"
                          />
                          <label htmlFor="classification-medium">Médio</label>
                        </div>
                        <div className="flex items-center gap-3">
                          <Checkbox
                            name="classification-crit"
                            className="flex items-center justify-center data-[state=checked]:bg-[#3088EE] data-[state=checked]:border-[#3088EE]"
                          />
                          <label htmlFor="classification-crit">Crítico</label>
                        </div>
                        <button className="flex items-center gap-3 mt-3">
                          <IoMdClose color="#D9232B" size={20} />
                          <span className="text-[#D9232B] font-semibold">
                            Limpar filtros
                          </span>
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <Button className="w-full py-7 bg-[#3088EE] mt-4">
                  Aplicar filtros
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </section>
      {currentTab === 1 && (
        <>
          <ActiveTable assetsType={1} />
        </>
      )}
      {currentTab === 2 && (
        <>
          <ActiveTable assetsType={2} />
        </>
      )}
      {currentTab === 3 && (
        <>
          <ActiveTable assetsType={3} />
        </>
      )}
      {currentTab === 4 && (
        <>
          <MobileTable />
        </>
      )}
      {currentTab === 5 && (
        <>
          <ActiveTable assetsType={5} />
        </>
      )}
      {currentTab === 6 && (
        <>
          <ActiveTable assetsType={6} />
        </>
      )}
      {currentTab === 7 && (
        <>
          <section className="bg-white p-2 rounded-lg flex w-full lg:w-40">
            <div className=" w-full overflow-x-auto flex">
              {envTabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentEnvTab(tab.value)}
                  className={`${
                    currentEnvTab == tab.value
                      ? "bg-[#F0F8FF] text-sm text-[#1A69C4]"
                      : ""
                  } p-2 font-semibold whitespace-nowrap rounded-lg text-sm w-full`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </section>

          {currentEnvTab === 1 && (
            <div className="mt-4 w-full">
              <EnvironmentTable
                updateTable={() => setLoading(!loading)}
                pageInter={pageInter}
                setPageInter={setPageInter}
                interns={interEnv}
                setOrderBy={setOrderBy}
                setAscending={() => setAscending(!ascending)}
              />
            </div>
          )}
          {currentEnvTab === 2 && (
            <div className="mt-4 w-full">
              <EnvironmentTable
                updateTable={() => setLoading(!loading)}
                pageInter={pageExternal}
                setPageInter={setPageExternal}
                interns={externalEnv}
                setOrderBy={setOrderBy}
                setAscending={() => setAscending(!ascending)}
              />
            </div>
          )}
        </>
      )}
    </main>
  );
}
