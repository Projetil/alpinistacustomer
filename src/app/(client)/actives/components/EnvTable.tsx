"use client";
import { Pagination } from "@/components/default/Pagination";
import { FaArrowsAltV } from "react-icons/fa";
import SeverityBadge from "../../components/SeverityBadge";
import CardEnv from "./CardEnvTableMobile";
import { SeverityTypeEnum } from "@/enums/SeverityTypeEnum";
import { useEffect, useState } from "react";
import { useCustomerContext } from "@/contexts/CustomerContext";
import { IEnvironmentAssets } from "@/types/IEnvironmentAssets";
import AssetsService from "@/services/AssetsService";
import Filter from "./Filter";
import { EnvironmentTypeEnum } from "@/enums/EnvironmentTypeEnum";
import { usePermissionContext } from "@/contexts/PermissionContext";

const EnvTable = ({
  environmentType,
}: {
  environmentType: EnvironmentTypeEnum;
}) => {
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [enviromentAssets, setEnvironmentAssets] = useState<
    IEnvironmentAssets[]
  >([]);
  const { customers } = useCustomerContext();
  const [searchText, setSearchText] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<
    SeverityTypeEnum | undefined
  >();
  const { currentPage } = usePermissionContext();

  const getInfraAssets = async () => {
    const response = await AssetsService.GetEnvironments(
      page,
      10,
      Number(customers?.userId),
      environmentType,
      searchText,
      selectedSeverity ?? undefined
    );
    setTotalItems(response.totalItems);
    setEnvironmentAssets(response.items);
  };

  useEffect(() => {
    getInfraAssets();
  }, [page, searchText, selectedSeverity]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const handleSeverityChange = (severity: SeverityTypeEnum | undefined) =>
    setSelectedSeverity(severity);

  const handleApplyFilters = (newFilters: {
    severity: SeverityTypeEnum | undefined;
  }) => {
    setSelectedSeverity(newFilters.severity);
  };

  return (
    <div className="w-full rounded-md">
      <Filter
        onSearch={handleSearch}
        onSeverityChange={handleSeverityChange}
        onApplyFilters={handleApplyFilters}
        permissionPage={currentPage}
      />
      <div className="w-full md:bg-white rounded-md">
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
                    SEVERIDADE <FaArrowsAltV />
                  </div>
                </th>
                <th className="py-3 px-4  text-sm font-semibold items-center">
                  <div className="flex items-center gap-2">
                    IP <FaArrowsAltV />
                  </div>
                </th>
                <th className="py-3 px-4  text-sm font-semibold items-center">
                  <div className="flex items-center gap-2">
                    PORTA <FaArrowsAltV />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {enviromentAssets.map((row, index) => (
                <tr
                  key={index}
                  className={`${
                    index == 0 ? "" : "border-t border-gray-200"
                  }  text-[#636267] text-center`}
                >
                  <td className="py-3 px-4 text-sm max-w-[200px]">
                    <div className="flex">{row.hostName}</div>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex justify-start">
                      {row.issuesOrRisks}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <SeverityBadge severity={row.severityType} />
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex justify-start">{row.ip}</div>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex justify-start">{row.port}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-4 md:hidden p-4">
          {enviromentAssets.map((x, index) => {
            return (
              <CardEnv
                key={index}
                active={x.hostName}
                severity={x.severityType.toString()}
                ip={x.ip}
                issues={x.issuesOrRisks}
                port={x.port}
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

export default EnvTable;
