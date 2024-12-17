"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaListAlt, FaRegTrashAlt } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import ModalSendQuest from "./components/ModalSendQuest";
import { IQuestionDtoForm } from "@/types/IQuestionnary";

export default function NewQuestionnairePage() {
  const [selectedOption, setSelectedOption] = useState("1");
  const [checkboxOptions, setCheckboxOptions] = useState(1);
  const [questionsLenght, setQuestionsLenght] = useState(1);
  const [fileSize, setFileSize] = useState(5);
  const [maxFiles, setMaxFiles] = useState(1);
  const [questionnaryTitle, setQuestionnaryTitle] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [optionValues, setOptionValues] = useState<string[]>([]);
  const [questions, setQuestions] = useState<IQuestionDtoForm[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleInputChange = (index: number, value: string) => {
    const updatedValues = [...optionValues];
    updatedValues[index] = value;
    setOptionValues(updatedValues);
  };

  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions((prev) => {
      return [
        ...prev,
        {
          id: questionsLenght,
          title: questionTitle,
          options: optionValues,
          type: selectedOption,
          fileSize: fileSize,
          maxFiles: maxFiles,
        },
      ];
    });
    setQuestionsLenght(questionsLenght + 1);
    setSelectedOption("1");
    setQuestionTitle("");
    setOptionValues([]);
    setCheckboxOptions(1);
    setFileSize(5);
    setMaxFiles(1);
  };

  const handleOpenModalSendInfos = () => {
    setModalOpen(true);
  };

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
              Criando um novo questionário
            </h2>
          </div>
          <Button
            onClick={() => {
              handleOpenModalSendInfos();
            }}
            type="button"
            className="text-white bg-[#3088EE] font-semibold"
          >
            Enviar questionário
          </Button>
        </div>
      </section>
      <section className="w-full">
        <form className="w-full flex flex-col gap-4">
          <Input
            value={questionnaryTitle}
            onChange={(e) => setQuestionnaryTitle(e.target.value)}
            placeholder="Questionário sem título"
            className="md:h-24 w-full text-xl md:text-3xl font-bold border-none"
          />
          <div className="border-2xl bg-white rounded-xl p-4 flex flex-col gap-4 mb-10">
            {questions.map((x, index) => (
              <div key={index} className="p-8 bg-[#F0F8FF] rounded-xl">
                <div className="flex justify-between w-full">
                  <h3 className="text-[#050506] font-semibold">
                    {index + 1} - {x.title}
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestion(index)}
                  >
                    <FaRegTrashAlt className="text-[#FF0000]" size={20} />
                  </button>
                </div>
                {x.type === "1" && (
                  <Textarea
                    placeholder="Resposta de texto"
                    className="w-full bg-transparent mt-4"
                  />
                )}
                {x.type === "2" && (
                  <Input type="file" className="mt-4 bg-transparent" />
                )}
                {x.type === "3" && (
                  <div className="mt-4 flex gap-5">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <label
                        key={num}
                        className="flex items-center gap-1 text-center text-lg"
                      >
                        <input type="radio" name="scale" value={num} />
                        {num}
                      </label>
                    ))}
                  </div>
                )}
                {x.type === "4" &&
                  x.options?.map((option, index) => (
                    <div
                      key={index}
                      className="flex justify-start items-start gap-2 mt-4"
                    >
                      <Input
                        placeholder={`Opção ${index + 1}`}
                        type="checkbox"
                        className="bg-transparent w-5 h-5 rounded-full"
                      />
                      <label className="items-center text-[#636267] font-semibold">
                        {option}
                      </label>
                    </div>
                  ))}
              </div>
            ))}

            <div className="bg-[#F8F7F9] border-2 border-[#5CA7FF] rounded-lg p-3">
              <div className="flex flex-col md:flex-row gap-3">
                <Input
                  className="bg-transparent"
                  value={questionTitle}
                  placeholder="Pergunta sem título"
                  onChange={(e) => setQuestionTitle(e.target.value)}
                />
                <select
                  className="w-full bg-transparent border border-[#D7D7DA] rounded-lg p-2"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  <option value="1">Texto</option>
                  <option value="2">Upload de arquivos</option>
                  <option value="3">Escala de 1 a 5</option>
                  <option value="4">Caixa de seleção</option>
                </select>
              </div>
              {selectedOption === "1" && (
                <div className="mt-4">
                  <Textarea
                    disabled
                    placeholder="Resposta de texto"
                    className="w-full bg-transparent"
                  />
                </div>
              )}
              {selectedOption === "2" && (
                <div className="mt-4 flex gap-6">
                  <div className="flex flex-col gap-3">
                    <Label className="font-semibold text-[#050506]">
                      Número máximo de arquivos
                    </Label>
                    <Input
                      placeholder="1"
                      type="number"
                      value={maxFiles}
                      onChange={(e) => setMaxFiles(Number(e.target.value))}
                      className="md:max-w-[179px] bg-transparent"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Label className="font-semibold text-[#050506]">
                      Tamanho máximo (MB)
                    </Label>
                    <Input
                      placeholder="10"
                      type="number"
                      value={fileSize}
                      onChange={(e) => setFileSize(Number(e.target.value))}
                      className="md:max-w-[179px] bg-transparent"
                    />
                  </div>
                </div>
              )}
              {selectedOption === "3" && (
                <div className="mt-4 flex gap-5">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <label
                      key={num}
                      className="flex items-center gap-1 text-center text-lg"
                    >
                      <input disabled type="radio" name="scale" value={num} />
                      {num}
                    </label>
                  ))}
                </div>
              )}
              {selectedOption === "4" && (
                <div className="mt-4 flex flex-col gap-6">
                  {[...Array(checkboxOptions)].map((option, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-start gap-2"
                    >
                      <label className="items-center text-[#050506] font-semibold">
                        Opção {index + 1}
                      </label>
                      <Input
                        placeholder={`Opção ${index + 1}`}
                        value={optionValues[index]}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                        className="bg-transparent"
                      />
                    </div>
                  ))}
                  <Button
                    onClick={() => {
                      setCheckboxOptions(checkboxOptions + 1);
                      setOptionValues((prev) => [...prev, ""]);
                    }}
                    variant={"outline"}
                    className="mt-2 text-[#1F4C85] bg-transparent border-none justify-start font-semibold"
                    type="button"
                  >
                    <Plus />
                    Adicionar mais opções
                  </Button>
                </div>
              )}
            </div>
            <Button
              variant={"outline"}
              disabled={!questionTitle}
              onClick={() => handleAddQuestion()}
              className="mt-4 text-[#1F4C85] bg-transparent border-none justify-start font-semibold"
              type="button"
            >
              <Plus />
              Adicionar outra pergunta
            </Button>
          </div>
        </form>
      </section>
      <ModalSendQuest
        questTitle={questionnaryTitle}
        questions={questions}
        open={modalOpen}
        setOpen={() => setModalOpen(!modalOpen)}
      />
    </main>
  );
}
