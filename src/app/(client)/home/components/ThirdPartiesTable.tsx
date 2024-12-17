import React from "react";
import { FaArrowsUpDown } from "react-icons/fa6";

interface TableRow {
  name: string;
  risks: number;
  info: number;
  low: number;
  medium: number;
  high: number;
  crit: number;
}

interface TableProps {
  data: TableRow[];
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
          {data.map((row, index) => {
            return (
              <tr key={index}>
                
                <td className="px-2 py-4 border-b text-center">{row.name}</td>
                <td className="px-2 py-4 border-b text-center">{row.risks}</td>
                <td className="px-2 py-4 border-b text-center">{row.info}</td>
                <td className="px-2 py-4 border-b text-center">{row.low}</td>
                <td className="px-2 py-4 border-b text-center">{row.medium}</td>
                <td className="px-2 py-4 border-b text-center">{row.high}</td>
                <td className="px-2 py-4 border-b text-center">{row.crit}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>

    </div>
  );
};

export default ThirdPartiesTable;
