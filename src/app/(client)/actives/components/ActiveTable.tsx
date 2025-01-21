"use client";
import { Pagination } from "@/components/default/Pagination";
import { FaArrowsAltV } from "react-icons/fa";
import CardActive from "./CardActiveTableMobile";
import SeverityBadge from "../../components/SeverityBadge";
import { useEffect, useState } from "react";
import AssetsService from "@/services/AssetsService";
import { IAllAssets } from "@/types/IAllAssets";
import { useCustomerContext } from "@/contexts/CustomerContext";
import { SeverityTypeEnum } from "@/enums/SeverityTypeEnum";
import Filter from "./Filter";
import { usePermissionContext } from "@/contexts/PermissionContext";
import { LuPencil } from "react-icons/lu";
import CreteActiveDialog from "./CreateActiveDialog";
import { toast } from "react-toastify";

const ActiveTable = ({ assetsType }: { assetsType: number }) => {
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [assets, setAssets] = useState<IAllAssets[]>([]);
  const { customers } = useCustomerContext();
  const [searchDomain, setSearchDomain] = useState<string | undefined>();
  const [searchIp, setSearchIp] = useState<string | undefined>();
  const [searchIssues, setSearchIssues] = useState<string | undefined>();
  const [searchPort, setSearchPort] = useState<string | undefined>();
  const [selectedSeverity, setSelectedSeverity] = useState<
    SeverityTypeEnum | undefined
  >();
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const { currentPage } = usePermissionContext();
  const [newActiveOpen, setNewActiveOpen] = useState(false);
  const [editFocus, setEditFocus] = useState(0);

  const handleApplyFilters = (newFilters: {
    severity: SeverityTypeEnum | undefined;
    issues: string | undefined;
    ip: string | undefined;
    port: string | undefined;
  }) => {
    setSelectedSeverity(newFilters.severity);
    setSearchIssues(newFilters.issues);
    setSearchIp(newFilters.ip);
    setSearchPort(newFilters.port);
  };

  const handleRowClick = (id: number) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getAssets = async () => {
    if (!customers) return;
    const response = await AssetsService.GetAll(
      page,
      10,
      Number(customers?.companyId),
      searchIp,
      searchIssues,
      searchPort,
      assetsType == 1 ? undefined : assetsType,
      searchDomain,
      selectedSeverity
    );
    console.log(response);
    setTotalItems(response.totalItems);
    setAssets(response.items);
  };

  useEffect(() => {
    if (customers) getAssets();
  }, [
    page,
    searchDomain,
    selectedSeverity,
    searchIp,
    searchIssues,
    searchPort,
    customers,
    newActiveOpen,
  ]);

  return (
    <div className="w-full rounded-md">
      <Filter
        permissionPage={currentPage}
        onSearch={(text: string) => setSearchDomain(text)}
        onSeverityChange={(severity: SeverityTypeEnum | undefined) =>
          setSelectedSeverity(severity)
        }
        onApplyFilters={handleApplyFilters}
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
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <>
                  <tr
                    key={asset.asset?.id}
                    className={`${
                      asset.asset?.id == 0 ? "" : "border-t border-gray-200"
                    }  text-[#636267] text-center cursor-pointer`}
                    onClick={() => handleRowClick(asset.asset?.id)}
                  >
                    <td className="py-3 px-4 text-sm max-w-[200px]">
                      <div className="flex">{asset.asset?.hostname}</div>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <div className="flex justify-start">
                        {asset.asset?.issuesOrRisks}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <SeverityBadge severity={asset.asset?.severityType} />
                    </td>
                  </tr>
                  {expandedRows.has(asset.asset?.id) && (
                    <>
                      <tr className="border-t border-[#EEEEF0]">
                        <td className="py-3 px-4 text-sm">
                          <div className="flex flex-col gap-4">
                            <p className="font-semibold text-sm text-[#818086]">
                              CRIADO POR
                            </p>
                            <p className="text-sm text-[#050506]">
                              {asset.asset?.createdByName}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm ">
                          <div className="flex flex-col gap-4">
                            <p className="font-semibold text-sm text-[#818086]">
                              MODIFICADO POR
                            </p>
                            <p className="text-sm text-[#050506]">
                              {asset.asset?.modifiedByName == "N/A"
                                ? ""
                                : asset.asset?.modifiedByName}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <button
                            onClick={() => {
                              if (currentPage) {
                                if (
                                  currentPage.funcs.find(
                                    (x) => x.name === "Editar"
                                  )?.hasAcess == false
                                ) {
                                  toast.warning(
                                    "Você não tem permissão para acessar essa função"
                                  );
                                } else {
                                  setEditFocus(asset.asset?.id);
                                  setNewActiveOpen(true);
                                }
                              }
                            }}
                          >
                            <LuPencil size={24} color="#1A69C4" />
                          </button>
                        </td>
                      </tr>
                      <div className="flex flex-col gap-4 py-3 px-4 text-sm ">
                        <p className="font-semibold text-sm text-[#818086]">
                          DESCRIÇÃO
                        </p>
                        <p className="text-sm text-[#050506]">
                          {asset.asset?.description}
                        </p>
                      </div>
                    </>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-4 md:hidden p-4">
          {assets.map((x, index) => {
            return (
              <CardActive
                key={index}
                active={x.asset?.hostname}
                issuesRisks={x.asset?.issuesOrRisks}
                severity={
                  x.asset?.severityType ? x.asset?.severityType.toString() : ""
                }
              />
            );
          })}
        </div>
        <Pagination
          pageIndex={page}
          perPage={10}
          handlePage={(pageIndex: number) => setPage(pageIndex)}
          totalCount={totalItems}
        />
      </div>
      <CreteActiveDialog
        newActiveOpen={newActiveOpen}
        setNewActiveOpen={() => setNewActiveOpen(!newActiveOpen)}
        companyId={customers?.companyId ? customers?.companyId : 0}
        editFocus={editFocus}
      />
    </div>
  );
};

export default ActiveTable;
