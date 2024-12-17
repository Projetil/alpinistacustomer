import React from "react";
import { FaArrowsUpDown } from "react-icons/fa6";

interface TableRow {
  name: string;
  status: string;
  filled: number;
  shipping: string;
  
}

interface TableProps {
  data: TableRow[];
}

const ConformityTable : React.FC<TableProps> = ({ data }) => {
  return (
    <div className="hidden lg:table bg-white w-full rounded-lg text-black p-4 px-2">
        <div className="overflow-x-auto">

      <table className="min-w-full">
        <thead>
          <tr>
            <th className="p-2">
              <span className="flex gap-2 justify-start items-center font-semibold">
                NOME <FaArrowsUpDown />
              </span>
            </th>

            <th className="p-2">
              <span className="flex gap-2 justify-center items-center font-semibold">
                STATUS <FaArrowsUpDown />
              </span>
            </th>

            
            <th className="p-2"> 
              <span className="flex gap-2 justify-center items-center font-semibold">
                PREENCHIDO (%) <FaArrowsUpDown />
              </span>
            </th>
            <th className="p-2"> 
              <span className="flex gap-2 justify-center items-center font-semibold">
                ENVIO <FaArrowsUpDown />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            return (
              <tr key={index}>
                
                <td className="px-2 py-4 border-b text-start">{row.name}</td>
                <td className="px-2 py-4 border-b text-center">{row.status}</td>
                <td className="px-2 py-4 border-b text-center">{row.filled}</td>
                <td className="px-2 py-4 border-b text-center">{row.shipping}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>

    </div>
  );
};

export default ConformityTable;
