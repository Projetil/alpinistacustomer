import { ThirthTableItems } from "@/types/ICharts";
import React from "react";
import { FaArrowsUpDown } from "react-icons/fa6";

interface TableProps {
  data?: ThirthTableItems[];
}

const ThirdPartiesTable : React.FC<TableProps> = ({ data }) => {
  return (
    <div className="bg-white w-full rounded-lg text-black p-4 px-2">
        <div className="overflow-x-auto">

      <table className="min-w-full">
        <thead>
          <tr>
            <th className="p-2">
              <span className="flex gap-2 justify-start ml-10 items-center font-semibold">
                NOME <FaArrowsUpDown />
              </span>
            </th>

            <th className="p-2">
              <span className="flex gap-2 justify-center items-center font-semibold">
                RISCOS <FaArrowsUpDown />
              </span>
            </th>

            <th className="p-2"> 
              <span className="flex gap-2 justify-center items-center font-semibold">
                INFO <FaArrowsUpDown />
              </span>
            </th>
            <th className="p-2"> 
              <span className="flex gap-2 justify-center items-center font-semibold">
                BAIXA <FaArrowsUpDown />
              </span>
            </th>
            <th className="p-2"> 
              <span className="flex gap-2 justify-center items-center font-semibold">
                MÉDIA <FaArrowsUpDown />
              </span>
            </th>
            <th className="p-2"> 
              <span className="flex gap-2 justify-center items-center font-semibold">
                ALTA <FaArrowsUpDown />
              </span>
            </th>
            <th className="p-2"> 
              <span className="flex gap-2 justify-center items-center font-semibold">
                CRÍTICA <FaArrowsUpDown />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data ? data.map((row, index) => {
            return (
              <tr key={index}>
                
                <td className="px-2 py-4 border-b text-center">{row.name}</td>
                <td className="px-2 py-4 border-b text-center">{row.totalRisks}</td>
                <td className="px-2 py-4 border-b text-center">{row.totalInfos}</td>
                <td className="px-2 py-4 border-b text-center">{row.totalLow}</td>
                <td className="px-2 py-4 border-b text-center">{row.totalMedium}</td>
                <td className="px-2 py-4 border-b text-center">{row.totalHigh}</td>
                <td className="px-2 py-4 border-b text-center">{row.totalCritical}</td>
              </tr>
            );
          }) : (<></>)}
        </tbody>
      </table>
      </div>

    </div>
  );
};

export default ThirdPartiesTable;
