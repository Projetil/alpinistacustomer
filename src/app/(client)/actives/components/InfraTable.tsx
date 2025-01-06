"use client";
import { Pagination } from "@/components/default/Pagination";
import { FaArrowsAltV } from "react-icons/fa";
import CardInfra from "./CardInfraTableMobile";
import { useEffect, useState } from "react";
import { useCustomerContext } from "@/contexts/CustomerContext";
import AssetsService from "@/services/AssetsService";
import { NmapTypeEnum } from "@/enums/NmapTypeEnum";
import { IInfraAssets } from "@/types/IInfraAssets";
import Filter from "./Filter";
import { SeverityTypeEnum } from "@/enums/SeverityTypeEnum";

const InfraTable = () => {
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [infraAssets, setInfraAssets] = useState<IInfraAssets[]>([]);
  const { customers } = useCustomerContext();
  const [searchText, setSearchText] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<SeverityTypeEnum | null>(null);

  const getInfraAssets = async () => {
    const response = await AssetsService.GetInfras(
      page,
      10,
      Number(customers?.userId),
      NmapTypeEnum.Infra,
      searchText,
      selectedSeverity ?? undefined 
    );
    setTotalItems(response.totalItems)
    setInfraAssets(response.items)
  }

  useEffect(() => {
    getInfraAssets();
  }, [page, searchText, selectedSeverity]);  

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

    const handleSearch = (text: string) => {
      setSearchText(text);
    };
  
    const handleSeverityChange = (severity: SeverityTypeEnum | null) => setSelectedSeverity(severity);
  
    const handleApplyFilters = (newFilters: { severity: SeverityTypeEnum | null }) => {
      setSelectedSeverity(newFilters.severity);
    };

  return (
    <div className="w-full rounded-md">
      <Filter onSearch={handleSearch} onSeverityChange={handleSeverityChange} onApplyFilters={handleApplyFilters} />

      <div className="w-full md:bg-white rounded-md">
        <h1 className="hidden lg:block m-4 font-semibold">Nome Empresa S.A</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full hidden md:table">
            <thead className="border-none">
              <tr className="text-[#636267] text-center">
                <th className="py-3 px-4  text-sm font-semibold  items-center">
                  <div className="flex items-center gap-2">
                    ATIVOS <FaArrowsAltV />
                  </div>
                </th>
                <th className="py-3 px-4 text-sm font-semibold  items-center">
                  <div className="flex items-center justify-start gap-2">
                    ISSUES/RISCOS <FaArrowsAltV />
                  </div>
                </th>
                <th className="py-3 px-4  text-sm font-semibold items-center">
                  <div className="flex items-center gap-2">
                    IP <FaArrowsAltV />
                  </div>
                </th>

              </tr>
            </thead>
            <tbody>
              {infraAssets.map((row, index) => (
                <tr
                  key={index}
                  className={`${index == 0 ? "" : "border-t border-gray-200"
                    }  text-[#636267] text-center`}
                >
                  <td className="py-3 px-4 text-sm max-w-[200px]">
                    <div className="flex">{row.hostName}</div>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex justify-start">{row.issuesOrRisks}</div>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex justify-start">{row.ip}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-4 md:hidden p-4">
          {infraAssets.map((x, index) => {
            return (
              <CardInfra
                key={index}
                actives={x.hostName}
                issues={x.issuesOrRisks}
                ip={x.ip}
              />
            );
          })}
        </div>
        <Pagination
          pageIndex={page}
          perPage={10}
          handlePage={handlePageChange}
          totalCount={totalItems}
        />
      </div>
    </div>

  );
};

export default InfraTable;
