import { ITab4And5HomeTable } from "@/types/ITab4And5";
import React, { useState } from "react";
import { FaArrowsUpDown } from "react-icons/fa6";

interface TableProps {
  title: string;
  data: ITab4And5HomeTable[];
}

const DynamicTableManagment: React.FC<TableProps> = ({ data, title }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);

  const sortedData = React.useMemo(() => {
    const sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        const key = sortConfig.key as keyof ITab4And5HomeTable;
        if (a[key] < b[key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="bg-white w-full rounded-lg text-black p-4">
      <h1 className="font-bold text-center text-lg  py-2 pb-6">{title}</h1>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="p-2">
              <span
                className="flex gap-2 justify-start items-center font-semibold cursor-pointer"
                onClick={() => requestSort("id")}
              >
                # <FaArrowsUpDown />
              </span>
            </th>

            <th className="p-2">
              <span
                className="flex gap-2 justify-start items-center font-semibold cursor-pointer"
                onClick={() => requestSort("name")}
              >
                NOME <FaArrowsUpDown />
              </span>
            </th>

            <th className="p-2">
              <span
                className="flex gap-2 justify-start items-center font-semibold cursor-pointer"
                onClick={() => requestSort("totalRisks")}
              >
                N° <FaArrowsUpDown />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => {
            return (
              <tr key={index}>
                <td className="px-2 py-4 border-b text-start">{row.id}</td>
                <td className="px-2 py-4 border-b text-start">{row.name}</td>
                <td className="px-2 py-4 border-b text-start">
                  {row.totalRisks}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTableManagment;
