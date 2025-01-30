"use client";
import { Pagination } from "@/components/default/Pagination";
import { FaArrowsAltV } from "react-icons/fa";
import CardMobile from "./CardMobileTable";
import { SeverityTypeEnum } from "@/enums/SeverityTypeEnum";
import { useEffect, useState } from "react";
import { useCustomerContext } from "@/contexts/CustomerContext";
import { ICompanyMobileAppAssets } from "@/types/IMobileAssets";
import Filter from "./Filter";
import { usePermissionContext } from "@/contexts/PermissionContext";
import CompanyService from "@/services/CompanyService";

const MobileTable = () => {
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [mobileAssets, setMobileAssets] = useState<ICompanyMobileAppAssets[]>(
    []
  );
  const { customers } = useCustomerContext();
  const [searchText, setSearchText] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<
    SeverityTypeEnum | undefined
  >();
  const { currentPage } = usePermissionContext();
  const [sortColumn, setSortColumn] = useState<"Id" | "AppName" | "Store">(
    "Id"
  );
  const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("DESC");

  const getInfraAssets = async () => {
    const response = await CompanyService.GetMobileCompany(
      Number(customers?.companyId)
    );
    setTotalItems(10);
    setMobileAssets(response);
  };

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

  useEffect(() => {
    getInfraAssets();
  }, [page, searchText, selectedSeverity, sortColumn, sortDirection]);

  return (
    <div className="w-full rounded-md">
      <Filter
        permissionPage={currentPage}
        onSearch={handleSearch}
        onSeverityChange={handleSeverityChange}
        onApplyFilters={handleApplyFilters}
      />
      <div className="w-full md:bg-white rounded-md">
        <h1 className="hidden lg:block m-4 font-semibold">Nome Empresa S.A</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full hidden md:table">
            <thead className="border-none">
              <tr className="text-[#636267] text-center">
                <th className="py-3 px-4  text-sm font-semibold  items-center">
                  <div className="flex items-center gap-2">
                    ATIVOS{" "}
                    <FaArrowsAltV
                      className="cursor-pointer"
                      onClick={() => {
                        setSortColumn("AppName");
                        setSortDirection(
                          sortDirection === "DESC" ? "ASC" : "DESC"
                        );
                      }}
                    />
                  </div>
                </th>
                <th className="py-3 px-4  text-sm font-semibold items-center">
                  <div className="flex items-center gap-2">
                    ISSUES/RISCOS <FaArrowsAltV />
                  </div>
                </th>
                <th className="py-3 px-4  text-sm font-semibold items-center">
                  <div className="flex items-center gap-2">
                    SEVERIDADE <FaArrowsAltV />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {mobileAssets.map((row, index) => (
                <tr
                  key={index}
                  className={`${
                    index == 0 ? "" : "border-t border-gray-200"
                  }  text-[#636267] text-center`}
                >
                  <td className="py-3 px-4 text-sm max-w-[200px]">
                    <div className="flex">{row.appName}</div>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {/* <SeverityBadge severity={row.severityType} /> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-4 md:hidden p-4">
          {mobileAssets.map((x, index) => {
            return <CardMobile key={index} active={x.appName} severity={"1"} />;
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

export default MobileTable;
