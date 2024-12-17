"use client";
import { Pagination } from "@/components/default/Pagination";
import { useCustomerContext } from "@/contexts/CustomerContext";
import QuestionnaryService from "@/services/QuestionnaryService";
import { IPagedQuestionnary } from "@/types/IQuestionnary";
import { formatDateToDDMMYYYY, truncateString } from "@/utils/formatString";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaListAlt } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

export default function ModelsQuestionnairePage() {
  const [questionary, setQuestionary] = useState<IPagedQuestionnary>();
  const [page, setPage] = useState(1);
  const navigation = useRouter();
  const { customers } = useCustomerContext();

  const fetchData = async () => {
    try {
      const res = await QuestionnaryService.GetAll(
        page,
        10,
        undefined,
        customers?.companyId
      );
      setQuestionary(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <main className="text-[#636267] w-full flex flex-col gap-1 items-start px-3">
      <section className="flex flex-col p-6 md:gap-10 items-start md:mb-3 w-full ">
        <div className="hidden md:flex gap-4 justify-between  items-center text-[#050506] w-full">
          <div className="flex gap-4 items-center text-[#050506]">
            <Link href="/questionnaire">
              <IoIosArrowBack
                color="#3088EE"
                size={45}
                className="p-3 rounded-lg bg-[#FFFFFF]"
              />
            </Link>
            <FaListAlt
              color="#3088EE"
              size={45}
              className="p-3 rounded-lg bg-[#FFFFFF]"
            />
            <h2 className="font-bold md:text-3xl">Questionários</h2>
          </div>
        </div>
      </section>
      <section className="w-full flex flex-wrap gap-3 md:gap-10 justify-center md:justify-start items-center">
        {questionary?.items.map((x, index) => (
          <div
            key={index}
            onClick={() =>
              navigation.push(`/questionnaire/new-questionnaire?id=${x.id}`)
            }
            className="flex flex-col gap-2 max-w-[164px] text-[#1F1E24] cursor-pointer"
          >
            <Image
              className="h-40 w-40"
              width={500}
              height={500}
              alt="logo"
              src={"/iso.png"}
            />
            <h4 className=" font-bold mt-3">{truncateString(x.title, 15)}</h4>
            <p className="text-xs">
              Data de criação {formatDateToDDMMYYYY(x.createdAt)}
            </p>
          </div>
        ))}
      </section>
      <section className="w-full">
        <Pagination
          pageIndex={page}
          perPage={10}
          handlePage={setPage}
          totalCount={questionary?.totalItems || 0}
        />
      </section>
    </main>
  );
}
