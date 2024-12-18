import React from "react";
import { FaArrowsUpDown } from "react-icons/fa6";

interface TableRow {
  name: string;
  number: number;
}

interface TableProps {
  title: string;
  data: TableRow[];
}

const ActiveTableIntrusion: React.FC<TableProps> = ({ data, title }) => {
  const firstHalf = data.slice(0, 5); // Posições de 1 a 5
  const secondHalf = data.slice(5, 10); // Posições de 6 a 10

  return (
    <div className="bg-white w-full rounded-lg text-black p-4">
      <h1 className="font-bold text-center text-lg py-2 pb-6">{title}</h1>
      <div className="flex gap-4">
        {/* Primeira tabela */}
        <div className="w-1/2">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="p-2">
                  <span className="flex gap-2 justify-center items-center font-semibold">
                    # <FaArrowsUpDown />
                  </span>
                </th>
                <th className="p-2">
                  <span className="flex gap-2 justify-center items-center font-semibold">
                    NOME <FaArrowsUpDown />
                  </span>
                </th>
                <th className="p-2">
                  <span className="flex gap-2 justify-center items-center font-semibold">
                    N° <FaArrowsUpDown />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {firstHalf.map((row, index) => {
                const position = `${index + 1}º`;
                return (
                  <tr key={index}>
                    <td className="px-2 py-4 border-b text-center">{position}</td>
                    <td className="px-2 py-4 border-b text-center">{row.name}</td>
                    <td className="px-2 py-4 border-b text-center">{row.number}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Segunda tabela */}
        <div className="w-1/2">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="p-2">
                  <span className="flex gap-2 justify-center items-center font-semibold">
                    # <FaArrowsUpDown />
                  </span>
                </th>
                <th className="p-2">
                  <span className="flex gap-2 justify-center items-center font-semibold">
                    NOME <FaArrowsUpDown />
                  </span>
                </th>
                <th className="p-2">
                  <span className="flex gap-2 justify-center items-center font-semibold">
                    N° <FaArrowsUpDown />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {secondHalf.map((row, index) => {
                const position = `${index + 6}º`;
                return (
                  <tr key={index}>
                    <td className="px-2 py-4 border-b text-center">{position}</td>
                    <td className="px-2 py-4 border-b text-center">{row.name}</td>
                    <td className="px-2 py-4 border-b text-center">{row.number}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActiveTableIntrusion;
