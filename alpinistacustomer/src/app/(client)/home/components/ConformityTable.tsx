"use client";
import { Pagination } from "@/components/default/Pagination";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  const [orderBy, setOrderBy] = useState("Name");
  const [order, setOrder] = useState(false);

  const fetchData = async () => {
    try {
      const res = await QuestionnaryService.GetHomePage(
        page,
        10,
        order,
        undefined,
        customers ? customers.companyId : undefined,
        orderBy
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
  }, [page, customers, order, orderBy]);

  return (
    <>
      <div className="hidden lg:table bg-white w-full rounded-lg text-black p-4 px-2">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="p-2">
                  <span
                    onClick={() => {
                      setOrderBy("Name");
                      setOrder(!order);
                    }}
                    className="flex gap-2 justify-start items-center font-semibold"
                  >
                    NOME <FaArrowsUpDown />
                  </span>
                </th>

                <th className="p-2">
                  <span
                    onClick={() => {
                      setOrderBy("Status");
                      setOrder(!order);
                    }}
                    className="flex gap-2 justify-center items-center font-semibold"
                  >
                    STATUS <FaArrowsUpDown />
                  </span>
                </th>

                <th className="p-2">
                  <span
                    onClick={() => {
                      setOrderBy("Filled");
                      setOrder(!order);
                    }}
                    className="flex gap-2 justify-center items-center font-semibold"
                  >
                    PREENCHIDO (%) <FaArrowsUpDown />
                  </span>
                </th>
                <th className="p-2">
                  <span
                    onClick={() => {
                      setOrderBy("Sent");
                      setOrder(!order);
                    }}
                    className="flex gap-2 justify-center items-center font-semibold"
                  >
                    ENVIO <FaArrowsUpDown />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {questionary?.items.map((row, index) => {
                return (
                  <tr key={index}>
                    <td className="px-2 py-4 border-b text-start">
                      {row.name}
                    </td>
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
      {questionary?.items.map((item, index) => (
        <>
          <Accordion
            key={index}
            type="single"
            collapsible
            className="w-full lg:hidden"
          >
            <AccordionItem value={index.toString()} className="border-none">
              <AccordionTrigger className="text-lg bg-white px-3 ">
                {item.name}
              </AccordionTrigger>
              <AccordionContent className="border-none bg-[#F8F7F9] ">
                <div className="mt-2 bg-white rounded-lg p-4">
                  <div className="flex flex-col mb-5">
                    <p>Status:</p>
                    <span className="font-semibold">{item.status}</span>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <p>Preenchido:</p>
                      <span className="font-semibold">{item.filled}%</span>
                    </div>
                    <div className="flex flex-col">
                      <p>Data de envio:</p>
                      <span className="font-semibold">{item.sent}</span>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      ))}
    </>
  );
};

export default ConformityTable;
