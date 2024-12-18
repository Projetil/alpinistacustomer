"use client";
import { Pagination } from "@/components/default/Pagination";
import { FaArrowsAltV } from "react-icons/fa";
import CardWeb from "./CardWebTableMobile";
import { tableWebData } from "@/app/data/tableAtivos";

const WebTable = () => {

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
                  PORTA <FaArrowsAltV />
                </div>
              </th>
        
            </tr>
          </thead>
          <tbody>
            {tableWebData.map((row, index) => (
              <tr
                key={index}
                className={`${
                  index == 0 ? "" : "border-t border-gray-200"
                }  text-[#636267] text-center`}
              >
                <td className="py-3 px-4 text-sm max-w-[200px]">
                  <div className="flex">{row.actives}</div>
                </td>
                <td className="py-3 px-4 text-sm">
                  <div className="flex justify-start">{row.issues}</div>
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
        {tableWebData.map((x, index) => {
          return (
            <CardWeb
              key={index}
              actives={x.actives}
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

export default WebTable;
