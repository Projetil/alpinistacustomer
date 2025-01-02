"use client";
import { Pagination } from "@/components/default/Pagination";
import { FaArrowsAltV } from "react-icons/fa";
import CardQuestionnaire from "./CardQuestionnaireTableMobile";
import StatusBagde from "./StatusBagde";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { IPagedQuestionnary } from "@/types/IQuestionnary";
import { formatDateToDDMMYYYY, truncateString } from "@/utils/formatString";
import { useRouter } from "next/navigation";

const QuestionnaireTable = ({
  pageTable,
  setPageTable,
  questionaryData,
}: {
  pageTable: number;
  setPageTable: Dispatch<SetStateAction<number>>;
  questionaryData?: IPagedQuestionnary;
}) => {
  const navigation = useRouter();

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
          {questionaryData?.items.map((row, index) => (
            <tr
              key={index}
              className={`${
                index == 0 ? "" : "border-t border-gray-200"
              }  text-[#636267] text-center`}
            >
              <td className="py-3 px-4 text-sm max-w-[200px]">
                <div className="flex">
                  {truncateString(row.title ?? "", 15)}
                </div>
              </td>
              <td className="py-3 px-4 text-sm max-w-[200px]">
                <div className="flex">Ativo</div>
              </td>
              <td className="py-3 px-4 text-sm">
                <div className="flex justify-start">
                  {row.type == 1 ? "Interno" : "Terceiros"}
                </div>
              </td>
              <td className="py-3 px-4 text-sm">
                <StatusBagde status={row.status} />
              </td>
              <td className="py-3 px-4 text-sm">
                <div className="flex justify-start">
                  {formatDateToDDMMYYYY(row.createdAt)}
                </div>
              </td>
              <td className="py-3 px-4 text-sm">
                <div className="flex justify-start">
                  {formatDateToDDMMYYYY(row.limitDate)}
                </div>
              </td>
              <td className="py-3 px-4 flex items-center justify-center">
                <Button
                  onClick={() => {
                    navigation.push(`/questionnaire/${row.id}`);
                  }}
                  className="bg-[#3088EE]"
                >
                  Visualizar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col gap-4 md:hidden p-4">
        {questionaryData?.items.map((x, index) => {
          return (
            <CardQuestionnaire
              name={truncateString(x.title ?? "", 15)}
              id={x.id}
              key={index}
              createDate={formatDateToDDMMYYYY(x.createdAt)}
              limitDate={formatDateToDDMMYYYY(x.limitDate)}
              status={<StatusBagde status={x.status} />}
              type={x.type == 1 ? "Interno" : "Terceiros"}
            />
          );
        })}
      </div>
      <Pagination
        pageIndex={pageTable}
        perPage={10}
        handlePage={setPageTable}
        totalCount={questionaryData?.totalItems || 0}
      />
    </div>
  );
};

export default QuestionnaireTable;
