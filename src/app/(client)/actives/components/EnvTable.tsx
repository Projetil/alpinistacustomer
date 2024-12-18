"use client";
import { Pagination } from "@/components/default/Pagination";
import { FaArrowsAltV } from "react-icons/fa";
import { envTableData } from "@/app/data/tablesData";
import SeverityBadge from "../../components/SeverityBadge";
import CardEnv from "./CardEnvTableMobile";

const EnvTable = () => {

  return (
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
            {envTableData.map((row, index) => (
              <tr
                key={index}
                className={`${
                  index == 0 ? "" : "border-t border-gray-200"
                }  text-[#636267] text-center`}
              >
                <td className="py-3 px-4 text-sm max-w-[200px]">
                  <div className="flex">{row.active}</div>
                </td>
                <td className="py-3 px-4 text-sm">
                  <div className="flex justify-start">{row.issues}</div>
                </td>
                <td className="py-3 px-4 text-sm">
                  <SeverityBadge severity={row.severity}/>
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
        {envTableData.map((x, index) => {
          return (
            <CardEnv
              key={index}
              active={x.active}
              severity={x.severity}
              ip={x.ip}
              issues={x.issues}
              port={x.port}
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

export default EnvTable;
