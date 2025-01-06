"use client";
import { Pagination } from "@/components/default/Pagination";
import { FaArrowsAltV } from "react-icons/fa";
import SeverityBadge from "../../components/SeverityBadge";
import CardPeople from "./CardPeopleTableMobile";
import { useEffect, useState } from "react";
import { useCustomerContext } from "@/contexts/CustomerContext";
import { IPeopleAssets } from "@/types/IPeopleAssets";
import { SeverityTypeEnum } from "@/enums/SeverityTypeEnum";
import AssetsService from "@/services/AssetsService";
import Filter from "./Filter";

const PeopleTable = () => {

  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [peopleAssets, setPeopleAssets] = useState<IPeopleAssets[]>([]);
  const { customers } = useCustomerContext();
  const [searchText, setSearchText] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<SeverityTypeEnum | null>(null);

  const getInfraAssets = async () => {
    const response = await AssetsService.GetPeoples(
      page,
      10,
      Number(customers?.userId),
      searchText,
      selectedSeverity ?? undefined
    );
    setTotalItems(response.totalItems)
    setPeopleAssets(response.items)
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
                    E-MAIL <FaArrowsAltV />
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
              {peopleAssets.map((row, index) => (
                <tr
                  key={index}
                  className={`${index == 0 ? "" : "border-t border-gray-200"
                    }  text-[#636267] text-center`}
                >
                  <td className="py-3 px-4 text-sm max-w-[200px]">
                    <div className="flex">{row.hostName}</div>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex justify-start">{row.email}</div>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <SeverityBadge severity={row.severityType.toString()} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-4 md:hidden p-4">
          {peopleAssets.map((x, index) => {
            return (
              <CardPeople
                key={index}
                active={x.hostName}
                email={x.email}
                severity={x.severityType.toString()}
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

export default PeopleTable;
