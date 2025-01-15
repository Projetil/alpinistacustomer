"use client";
import { Pagination } from "@/components/default/Pagination";
import { FaArrowsAltV } from "react-icons/fa";
import { activeTableData } from "@/app/data/tablesData";
import CardEnvironment from "./CardEnvironmentTableMobile";
import SeverityBadge from "../../components/SeverityBadge";
import PopoverEnvironment from "./PopoverEnvironment";
import { Dispatch, SetStateAction } from "react";
import { IPagedEnvironment } from "@/types/IEnvironment";
import EnvironmentService from "@/services/EnvironmentsService";
import { toast } from "react-toastify";
import { IPermissionPage } from "@/types/IPermission";

const EnvironmentTable = ({
  pageInter,
  setPageInter,
  updateTable,
  interns,
  pagePermission,
  setOrderBy,
  setAscending,
}: {
  pageInter: number;
  setPageInter: Dispatch<SetStateAction<number>>;
  updateTable: () => void;
  interns?: IPagedEnvironment;
  pagePermission?: IPermissionPage;
  setOrderBy: Dispatch<SetStateAction<string>>;
  setAscending: () => void;
}) => {
  const handleDeleteEnv = async (id: number) => {
    try {
      await EnvironmentService.Delete(id);
      toast.success("Ambiente deletado com sucesso");
      updateTable();
    } catch (error) {
      toast.error("Erro ao deletar ambiente");
      console.log(error);
    }
  };

  return (
    <div className="w-full overflow-x-auto md:bg-white rounded-md">
      <table className="min-w-full hidden md:table">
        <thead className="border-none">
          <tr className="text-[#636267] text-center">
            <th className="py-3 px-4  text-sm font-semibold  items-center">
              <div
                onClick={() => {
                  setAscending();
                  setOrderBy("name");
                }}
                className="flex items-center gap-2 cursor-pointer"
              >
                AMBIENTES <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4  text-sm font-semibold  items-center">
              <div
                onClick={() => {
                  setAscending();
                  setOrderBy("ativos");
                }}
                className="flex items-center gap-2 cursor-pointer"
              >
                ATIVOS <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold  items-center">
              <div
                onClick={() => {
                  setAscending();
                  setOrderBy("issues");
                }}
                className="flex items-center justify-start gap-2"
              >
                ISSUES/RISCOS <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4  text-sm font-semibold items-center">
              <div
                onClick={() => {
                  setAscending();
                  setOrderBy("severity");
                }}
                className="flex items-center gap-2 cursor-pointer"
              >
                SEVERIDADE <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4  text-sm font-semibold">AÇÃO</th>
          </tr>
        </thead>
        <tbody>
          {interns?.items.map((row, index) => {
            return (
              <tr
                key={index}
                className={`${
                  index == 0 ? "" : "border-t border-gray-200"
                }  text-[#636267] text-center`}
              >
                <td className="py-3 px-4 text-sm max-w-[200px]">
                  <div className="flex">{row.name}</div>
                </td>
                <td className="py-3 px-4 text-sm max-w-[200px]">
                  <div className="flex">
                    {row.status == 1 ? "Ativo" : "Inativo"}
                  </div>
                </td>
                <td className="py-3 px-4 text-sm">
                  <div className="flex justify-start">00</div>
                </td>
                <td className="py-3 px-4 text-sm">
                  <SeverityBadge severity={row.severity} />
                </td>
                <td className="py-3 px-4 flex items-center justify-center">
                  <PopoverEnvironment
                    pagePermission={pagePermission}
                    environmentId={Number(row.id)}
                    handleDelete={(id: number) => handleDeleteEnv(id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex flex-col gap-4 md:hidden p-4">
        {activeTableData.map((x, index) => {
          return (
            <CardEnvironment
              key={index}
              active={x.active}
              issuesRisks={x.issuesRisks}
              severity={x.severity}
            />
          );
        })}
      </div>
      <Pagination
        pageIndex={pageInter}
        perPage={10}
        handlePage={setPageInter}
        totalCount={interns?.totalItems || 0}
      />
    </div>
  );
};

export default EnvironmentTable;
