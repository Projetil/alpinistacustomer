"use client";
import { Pagination } from "@/components/default/Pagination";
import { FaArrowsAltV } from "react-icons/fa";
import { questionnaireTableData } from "@/app/data/tablesData";
import CardQuestionnaire from "./CardQuestionnaireTableMobile";
import StatusBagde from "./StatusBagde";
import { Button } from "@/components/ui/button";

const QuestionnaireTable = () => {
  return (
    <div className="w-full overflow-x-auto md:bg-white rounded-md">
      <table className="min-w-full hidden md:table">
        <thead className="border-none bg-[#FBFBFB]">
          <tr className="text-[#636267] text-center">
            <th className="py-3 px-4  text-sm font-semibold  items-center">
              <div className="flex items-center gap-2">
                QUESTIONÁRIO <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4  text-sm font-semibold  items-center">
              <div className="flex items-center gap-2">
                RESPONDENTE <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold  items-center">
              <div className="flex items-center justify-start gap-2">
                TIPO <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4  text-sm font-semibold items-center">
              <div className="flex items-center gap-2">
                STATUS <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4  text-sm font-semibold items-center">
              <div className="flex items-center gap-2">
                CRIADO <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4  text-sm font-semibold items-center">
              <div className="flex items-center gap-2">
                LIMITE <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4  text-sm font-semibold">AÇÃO</th>
          </tr>
        </thead>
        <tbody>
          {questionnaireTableData.map((row, index) => (
            <tr
              key={index}
              className={`${
                index == 0 ? "" : "border-t border-gray-200"
              }  text-[#636267] text-center`}
            >
              <td className="py-3 px-4 text-sm max-w-[200px]">
                <div className="flex">{row.questionnaire}</div>
              </td>
              <td className="py-3 px-4 text-sm max-w-[200px]">
                <div className="flex">{row.respondent}</div>
              </td>
              <td className="py-3 px-4 text-sm">
                <div className="flex justify-start">{row.type}</div>
              </td>
              <td className="py-3 px-4 text-sm">
                <StatusBagde status={row.status} />
              </td>
              <td className="py-3 px-4 text-sm">
                <div className="flex justify-start">{row.createDate}</div>
              </td>
              <td className="py-3 px-4 text-sm">
                <div className="flex justify-start">{row.limitDate}</div>
              </td>
              <td className="py-3 px-4 flex items-center justify-center">
                <Button className="bg-[#3088EE]">Visualizar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col gap-4 md:hidden p-4">
        {questionnaireTableData.map((x, index) => {
          return (
            <CardQuestionnaire
              key={index}
              createDate={x.createDate}
              limitDate={x.limitDate}
              status={x.status}
              type={x.type}
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

export default QuestionnaireTable;
