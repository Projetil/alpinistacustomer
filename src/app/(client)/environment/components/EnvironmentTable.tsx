"use client";
import { Pagination } from "@/components/default/Pagination";
import { FaArrowsAltV } from "react-icons/fa";
import { activeTableData, environmentTableData } from "@/app/data/tablesData";
import CardEnvironment from "./CardEnvironmentTableMobile";
import SeverityBadge from "../../components/SeverityBadge";
import { SlOptionsVertical } from "react-icons/sl";

const EnvironmentTable = () => {

  return (
    <div className="w-full overflow-x-auto md:bg-white rounded-md">
      <h1 className="hidden lg:block m-4 font-semibold">Nome Empresa S.A</h1>
      <table className="min-w-full hidden md:table">
        <thead className="border-none">
          <tr className="text-[#636267] text-center">
          <th className="py-3 px-4  text-sm font-semibold  items-center">
              <div className="flex items-center gap-2">
                AMBIENTES <FaArrowsAltV />
              </div>
            </th>
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
            <th className="py-3 px-4  text-sm font-semibold">AÇÃO</th>
          </tr>
        </thead>
        <tbody>
          {environmentTableData.map((row, index) => (
            <tr
              key={index}
              className={`${
                index == 0 ? "" : "border-t border-gray-200"
              }  text-[#636267] text-center`}
            >
              <td className="py-3 px-4 text-sm max-w-[200px]">
                <div className="flex">{row.environment}</div>
              </td>
              <td className="py-3 px-4 text-sm max-w-[200px]">
                <div className="flex">{row.active}</div>
              </td>
              <td className="py-3 px-4 text-sm">
                <div className="flex justify-start">{row.issuesRisks}</div>
              </td>
              <td className="py-3 px-4 text-sm">
                <SeverityBadge severity={row.severity}/>
              </td>
              <td className="py-3 px-4 flex items-center justify-center">
                <SlOptionsVertical className="cursor-pointer text-[#1A69C4]"/>
              </td>
            </tr>
          ))}
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
        pageIndex={1}
        perPage={10}
        handlePage={() => {}}
        totalCount={10}
      />
    </div>
  );
};

export default EnvironmentTable;
