"use client";

import QuestionnaryService from "@/services/QuestionnaryService";
import {
  AnswerType,
  IAnswer,
  IQuestion,
  IQuestionnary,
} from "@/types/IQuestionnary";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaListAlt, FaRegArrowAltCircleLeft, FaRegUser } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import TopCards from "../components/TopCards";
import { MdOutlineQuestionMark, MdOutlineQuickreply } from "react-icons/md";

export default function QuestionnaryIndividualPage() {
  const { id } = useParams();
  const [questionnary, setQuestionnary] = useState<IQuestionnary>();
  const [question, setQuestion] = useState<IQuestion>();
  const [answers, setAnswers] = useState<IAnswer[]>();
  const navigator = useRouter();
  const [focusedQuestionIndex, setFocusedQuestionIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  async function handleFileDownload(url: string, filename: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch the file.");
      }
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the file:", error);
      alert("Failed to download the file.");
    }
  }

  const fetchData = async () => {
    try {
      const res = await QuestionnaryService.GetByIdWithAnswers(Number(id));
      setQuestionnary(res);
      setFocusedQuestionIndex(res.questions[0].id);
      setQuestion(res.questions[0]);
      setAnswers(res.questions[0].answer);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            <h2 className="font-bold md:text-3xl">
              Questionário {questionnary?.title}
            </h2>
          </div>
        </div>
      </section>
      <section className="flex md:hidden flex-col mb-5 w-full">
        <button
          className="flex items-center justify-start gap-4"
          onClick={() => navigator.push(`/questionnaire`)}
        >
          <FaRegArrowAltCircleLeft size={28} color="#C9001C" />
          <p className="font-semibold text-[#8C8B91]">
            Questionário / {questionnary?.title}
          </p>
        </button>
      </section>
      <section className=" flex justify-between items-center w-full mb-6">
        <div className=" w-full overflow-x-auto flex gap-4 p-2">
          <TopCards title="Respondido" value={"0%"} />
          <TopCards title="Resposta em conformidade" value={0} />
          <TopCards title="Resposta em não conformidade" value={0} />
        </div>
      </section>
      <section className="flex gap-4 w-full">
        <div
          className={`fixed bottom-0 left-0 w-full bg-white p-4 rounded-t-3xl shadow-lg transition-transform duration-300 ease-in-out ${
            isExpanded ? "translate-y-0" : "translate-y-[70%]"
          } md:hidden`}
          style={{ height: "60vh" }}
        >
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className="w-full flex justify-center text-center text-[#636267] font-bold mb-4"
          >
            <div className="bg-[#0D3C73] rounded-2xl h-[8px] w-20 my-4"></div>
          </button>
          <div className="overflow-y-auto h-full">
            {questionnary?.questions.map((question, index) => (
              <button
                onClick={() => {
                  setQuestion(question);
                  setAnswers(question.answer);
                  setFocusedQuestionIndex(question.id);
                }}
                key={index}
                className={`flex p-4 gap-3 justify-start items-center rounded-xl  w-full mb-4 ${
                  focusedQuestionIndex == question.id
                    ? "bg-[#D1EBFF]"
                    : "bg-[#F8F7F9]"
                }`}
              >
                <div
                  className={`${
                    focusedQuestionIndex == question.id
                      ? "bg-[#5CA7FF]"
                      : "bg-[#D7D7DA]"
                  } p-3 rounded-xl w-16 h-14 flex justify-center items-center gap-4`}
                >
                  <MdOutlineQuestionMark
                    size={26}
                    className={`${
                      focusedQuestionIndex == question.id
                        ? "text-[#5CA7FF]"
                        : "text-[#D7D7DA]"
                    } bg-white p-1 rounded-md`}
                  />
                </div>
                <div className="w-full flex flex-col justify-start items-start">
                  <h5 className="text-[#050506] font-bold mb-2">
                    Pergunta {index + 1}
                  </h5>
                  <p className="text-[#636267] text-sm">
                    {AnswerType[question.answerType]}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="hidden md:flex flex-col gap-3 p-4 bg-[#FFFFFF] rounded-lg h-fit">
          {questionnary?.questions.map((x, index) => {
            return (
              <button
                onClick={() => {
                  setQuestion(x);
                  setAnswers(x.answer);
                  setFocusedQuestionIndex(x.id);
                }}
                key={index}
                className={`flex p-4 gap-3 justify-start items-center rounded-xl md:w-[340px]  ${
                  focusedQuestionIndex == x.id ? "bg-[#D1EBFF]" : "bg-[#F8F7F9]"
                }`}
              >
                <div
                  className={`${
                    focusedQuestionIndex == x.id
                      ? "bg-[#5CA7FF]"
                      : "bg-[#D7D7DA]"
                  } p-3 rounded-xl w-16 h-14 flex justify-center items-center gap-4`}
                >
                  <MdOutlineQuestionMark
                    size={26}
                    className={`${
                      focusedQuestionIndex == x.id
                        ? "text-[#5CA7FF]"
                        : "text-[#D7D7DA]"
                    } bg-white p-1 rounded-md`}
                  />
                </div>
                <div className="w-full flex flex-col justify-start items-start">
                  <h5 className="text-[#050506] font-bold mb-2">
                    Pergunta {index + 1}
                  </h5>
                  <p className="text-[#636267] text-sm">
                    {AnswerType[x.answerType]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
        <div className="flex flex-col gap-3 p-4 w-full">
          <div
            className={`flex p-4 gap-3 justify-start items-start rounded-xl w-full bg-[#FFFFFF]`}
          >
            <div
              className={`bg-[#5CA7FF] p-3 rounded-xl w-16 h-14 flex justify-center items-center gap-4`}
            >
              <MdOutlineQuestionMark
                size={26}
                className={`text-[#5CA7FF] bg-white p-1 rounded-md`}
              />
            </div>
            <div className="w-full">
              <h5 className="text-[#050506] font-bold mb-1">
                Pergunta - {question?.title}
              </h5>
              <p className="text-[#636267] text-sm">
                {AnswerType[question?.answerType ?? 0]}
              </p>
              <div className="flex gap-2 items-center mt-4">
                <MdOutlineQuickreply
                  size={26}
                  className="bg-[#EEEEF0] text-[#3088EE] p-1"
                />
                <p className="text-[#093970] font-medium text-sm">
                  {answers?.length} respostas
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full rounded-lg bg-[#FFFFFF] p-3 mb-36 md:mb-3">
            <h4 className="text-[#050506] font-bold text-xl">
              Respostas {answers?.length}{" "}
            </h4>
            {answers?.map((x, index) => (
              <div key={index} className="bg-[#F8F7F9] p-3 flex flex-col gap-3">
                {(question?.answerType == 1 || question?.answerType == 4) && (
                  <p className="text-[#050506] font-semibold">{x.value}</p>
                )}
                {question?.answerType == 2 && (
                  <button
                    className="bg-[#3088EE] text-white p-2 rounded-md w-fit"
                    onClick={() => {
                      const filename = x.value.split("/").pop();
                      handleFileDownload(x.value, filename ?? "file");
                    }}
                  >
                    Baixar arquivo
                  </button>
                )}
                {question?.answerType == 3 && (
                  <p className="text-[#050506] font-semibold">
                    {x.value == "1" && "1 - Nada confiante"}
                    {x.value == "2" && "2 - Pouco confiante"}
                    {x.value == "3" && "3 - Neutro"}
                    {x.value == "4" && "4 - Confiante"}
                    {x.value == "5" && "5 - Muito confiante"}
                  </p>
                )}
                <div className="flex gap-2 items-center">
                  <FaRegUser className="bg-[#0D3C73] text-white p-1" />
                  <p className="text-[#636267] ">
                    {x.questionaryRespondentEmail}{" "}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
