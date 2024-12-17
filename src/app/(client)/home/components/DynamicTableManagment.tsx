import React from "react";
import { FaArrowsUpDown } from "react-icons/fa6";

interface TableRow {
  envName:string;
  name: string;
  number: number;
}

interface TableProps {
  title: string;
  data: TableRow[];
}

const DynamicTableManagment : React.FC<TableProps> = ({ data, title }) => {
  return (
    <div className="bg-white w-full rounded-lg text-black p-4">
      <h1 className="font-bold text-center text-lg  py-2 pb-6">{title}</h1>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="p-2">
              <span className="flex gap-2 justify-start items-center font-semibold">
                # <FaArrowsUpDown />
              </span>
            </th>

            <th className="p-2">
              <span className="flex gap-2 justify-start items-center font-semibold">
                NOME <FaArrowsUpDown />
              </span>
            </th>

            <th className="p-2"> 
              <span className="flex gap-2 justify-start items-center font-semibold">
                N° <FaArrowsUpDown />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            return (
              <tr key={index}>
                <td className="px-2 py-4 border-b text-start">{row.envName}</td>
                <td className="px-2 py-4 border-b text-start">{row.name}</td>
                <td className="px-2 py-4 border-b text-start">{row.number}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTableManagment;
