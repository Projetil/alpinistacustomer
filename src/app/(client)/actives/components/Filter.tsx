"use client";
import { useEffect, useState } from "react";
import { SeverityTypeEnum } from "@/enums/SeverityTypeEnum";
import { FiSearch } from "react-icons/fi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LuChevronsUpDown } from "react-icons/lu";
import { Checkbox } from "@/components/ui/checkbox";
import { IoMdClose } from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IPermissionPage } from "@/types/IPermission";
import { toast } from "react-toastify";

interface FilterProps {
  onSearch: (searchText: string) => void;
  onSeverityChange: (severity: SeverityTypeEnum | null) => void;
  onApplyFilters: (filters: {
    issues: string;
    ip: string;
    port: string;
    severity: SeverityTypeEnum | null;
  }) => void;
  permissionPage: IPermissionPage | undefined;
}

const Filter: React.FC<FilterProps> = ({
  onSearch,
  onSeverityChange,
  onApplyFilters,
  permissionPage,
}) => {
  const [searchText, setSearchText] = useState("");
  const [selectedSeverity, setSelectedSeverity] =
    useState<SeverityTypeEnum | null>(null);
  const [ipValue, setIpValue] = useState("");
  const [portValue, setPortValue] = useState("");
  const [issuesAndRisks, setIssuesAndRisks] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);

  const handleApplyFilters = () => {
    onApplyFilters({
      issues: issuesAndRisks,
      ip: ipValue,
      port: portValue,
      severity: selectedSeverity,
    });
    setTimeout(() => {
      setIsDialogOpen(false);
    }, 300);
  };

  const handleSeverityChange = (severity: SeverityTypeEnum) => {
    const newValue = selectedSeverity === severity ? null : severity;
    setSelectedSeverity(newValue);
    onSeverityChange(newValue);
  };

  const clearFilters = () => {
    setIssuesAndRisks("");
    setIpValue("");
    setPortValue("");
    setSelectedSeverity(null);
    setSearchText("");
    onSeverityChange(null);
  };

  const severityLabels = {
    [SeverityTypeEnum.Critic]: "Crítico",
    [SeverityTypeEnum.High]: "Alto",
    [SeverityTypeEnum.Low]: "Baixo",
    [SeverityTypeEnum.Medium]: "Médio",
    [SeverityTypeEnum.Info]: "Info",
  };

  const severityList = Object.entries(SeverityTypeEnum)
    .filter(([, value]) => typeof value === "number") // Omit 'key' using a comma
    .map(([, value]) => ({
      label: severityLabels[value as SeverityTypeEnum],
      value: value as number,
    }));

  const handlePortInput = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const numericValue = value.replace(/\D/g, "");
    setter(numericValue);
  };

  const handleDialogSeverityChange = (value: string) => {
    const enumValue = SeverityTypeEnum[value as keyof typeof SeverityTypeEnum];
    setSelectedSeverity(enumValue);
  };

  const handleIpChange = (value: string) => {
    const formatted = value
      .replace(/[^0-9]/g, "")
      .match(/.{1,3}/g)
      ?.join(".")
      .slice(0, 15);
    setIpValue(formatted || "");
  };

  const handleIssueOrRiskChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIssuesAndRisks(event.target.value);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchText);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText, onSearch]);

  return (
    <div>
      <section className="hidden lg:flex gap-3 w-full my-6 items-center">
        {/* Input de pesquisa */}
        <div className="flex flex-col w-2/4 gap-2">
          <label
            className="font-inter text-[12px] font-semibold  text-left"
            htmlFor="search"
          >
            Pesquisar
          </label>
          <div className="flex items-center rounded-lg px-3 py-2 shadow-sm w-full border">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              id="search"
              disabled={
                permissionPage?.funcs.find((x) => x.name === "Filtrar")
                  ?.hasAcess == false
              }
              placeholder={"Search"}
              className="bg-transparent w-full outline-none text-gray-70"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        {/* Filtros de severidade */}
        <div className="flex flex-col w-1/4">
          <label className="text-gray-700 mb-1 font-inter text-[14px] font-semibold  text-left">
            Severidade <span className="text-red-500">*</span>
          </label>
          <Popover
            open={openPopover}
            onOpenChange={(open) => {
              if (permissionPage) {
                if (
                  permissionPage.funcs.find((x) => x.name === "Filtrar")
                    ?.hasAcess == false
                ) {
                  toast.warning(
                    "Você não tem permissão para acessar essa função"
                  );
                } else {
                  setOpenPopover(open);
                }
              }
            }}
          >
            <PopoverTrigger asChild>
              <button className="bg-transparent border border-gray-300 rounded-lg px-3 py-2 shadow-sm outline-none text-gray-700 flex items-center justify-between">
                Selecione uma opção <LuChevronsUpDown size={16} />
              </button>
            </PopoverTrigger>
            <PopoverContent side="bottom" className="rounded-lg">
              <div className="flex flex-col gap-6">
                {severityList.map((severity) => (
                  <div key={severity.value} className="flex items-center gap-3">
                    <Checkbox
                      className="flex items-center justify-center data-[state=checked]:bg-[#3088EE] data-[state=checked]:border-[#3088EE]"
                      checked={selectedSeverity === severity.value}
                      onCheckedChange={() =>
                        handleSeverityChange(severity.value)
                      } // Use onCheckedChange
                    />
                    <label>{severity.label}</label>
                  </div>
                ))}
                {/* Botão para limpar filtros */}
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-3 mt-3"
                >
                  <IoMdClose color="#D9232B" size={20} />
                  <span className="text-[#D9232B] font-semibold">
                    Limpar filtros
                  </span>
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Botão de diálogo */}
        <div className="flex w-1/4 mt-8">
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              if (permissionPage) {
                if (
                  permissionPage.funcs.find((x) => x.name === "Filtrar")
                    ?.hasAcess == false
                ) {
                  toast.warning(
                    "Você não tem permissão para acessar essa função"
                  );
                } else {
                  setIsDialogOpen(open);
                }
              }
            }}
          >
            <DialogTrigger asChild>
              <Button className="w-36 bg-[#3088EE]">Filtrar</Button>
            </DialogTrigger>
            <DialogContent className="rounded-lg">
              <DialogTitle className="hidden" />
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <h1 className="font-semibold text-lg">Por issues e riscos</h1>
                  <Input
                    placeholder="O que deseja encontrar"
                    className="border-[#D8D9E0] py-6 placeholder:text-[#80828D]"
                    value={issuesAndRisks}
                    onChange={handleIssueOrRiskChange}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <h1 className="font-semibold text-lg">Por IP</h1>
                  <Input
                    type="text"
                    value={ipValue}
                    onChange={(e) => handleIpChange(e.target.value)}
                    placeholder="Digite o IP"
                    className="border-[#D8D9E0] py-6 placeholder:text-[#80828D]"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <h1 className="font-semibold text-lg">Por porta</h1>
                  <Input
                    type="text"
                    value={portValue}
                    onChange={(e) =>
                      handlePortInput(e.target.value, setPortValue)
                    } // Permite apenas números
                    placeholder="Digite a porta"
                    className="border-[#D8D9E0] py-6 placeholder:text-[#80828D]"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <h1 className="font-semibold text-lg">Por classificação</h1>
                  <div>
                    <Select onValueChange={handleDialogSeverityChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent className="w-[240px]">
                        {severityList.map((severity) => (
                          <SelectItem
                            key={severity.value}
                            value={severity.value.toString()}
                          >
                            {severity.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-3 mt-3"
                >
                  <IoMdClose color="#D9232B" size={20} />
                  <span className="text-[#D9232B] font-semibold">
                    Limpar filtros
                  </span>
                </button>
                <Button
                  onClick={handleApplyFilters}
                  className="w-full py-7 bg-[#3088EE] mt-4"
                >
                  Aplicar filtros
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  );
};

export default Filter;
