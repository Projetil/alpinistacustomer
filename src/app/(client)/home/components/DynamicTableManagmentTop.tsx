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

const DynamicTableManagmentTop : React.FC<TableProps> = ({ data, title }) => {
  return (
    <div className="bg-white w-full rounded-lg text-black p-4">
      <h1 className="font-bold text-center text-lg  py-2 pb-6">{title}</h1>
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
          {data.map((row, index) => {
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
  );
};

export default DynamicTableManagmentTop;
