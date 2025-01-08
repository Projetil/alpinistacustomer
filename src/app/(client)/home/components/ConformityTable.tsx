"use client";
import { Pagination } from "@/components/default/Pagination";
import { useCustomerContext } from "@/contexts/CustomerContext";
import { QuestionaryStatusEnum } from "@/enums/QuestionaryStatusEnum";
import QuestionnaryService from "@/services/QuestionnaryService";
import { IPagedQuestionnaryHome } from "@/types/IQuestionnary";
import { formatDateString } from "@/utils/formatString";
import { useEffect, useState } from "react";
import { FaArrowsUpDown } from "react-icons/fa6";

const ConformityTable = () => {
  const [questionary, setQuestionary] = useState<IPagedQuestionnaryHome>();
  const [page, setPage] = useState(1);
  const { customers } = useCustomerContext();

  const fetchData = async () => {
    try {
      const res = await QuestionnaryService.GetHomePage(
        page,
        10,
        undefined,
        customers ? customers.companyId : undefined
      );
      setQuestionary(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (customers) {
      fetchData();
    }
  }, [page, customers]);

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
            {questionary?.items.map((row, index) => {
              return (
                <tr key={index}>
                  <td className="px-2 py-4 border-b text-start">{row.name}</td>
                  <td className="px-2 py-4 border-b text-center">
                    {QuestionaryStatusEnum[row.status]}
                  </td>
                  <td className="px-2 py-4 border-b text-center">
                    {row.filled}
                  </td>
                  <td className="px-2 py-4 border-b text-center">
                    {formatDateString(row.sent)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          pageIndex={page}
          perPage={10}
          handlePage={setPage}
          totalCount={questionary?.totalItems || 0}
        />
      </div>
    </div>
  );
};

export default ConformityTable;
