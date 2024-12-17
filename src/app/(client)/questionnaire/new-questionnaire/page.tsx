"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaListAlt } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

interface IQuestionCreate {
  id: number;
  title: string;
  type: string;
  fileSize: number;
  maxFiles: number;
}

export default function NewQuestionnairePage() {
  const [selectedOption, setSelectedOption] = useState("1");
  const [checkboxOptions, setCheckboxOptions] = useState(1);
  const [questionsLenght, setQuestionsLenght] = useState(1);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questions, setQuestions] = useState<IQuestionCreate[]>([]);

  const handleAddQuestion = () => {
    setQuestions((prev) => {
      return [
        ...prev,
        {
          id: questionsLenght,
          title: questionTitle,
          type: selectedOption,
          fileSize: 10,
          maxFiles: 1,
        },
      ];
    });
    setQuestionsLenght(questionsLenght + 1);
  };

  return (
    <main className="text-[#636267] w-full flex flex-col gap-1 items-start px-3">
      <section className="flex flex-col p-6 md:gap-10 items-start md:mb-3 w-full">
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
          <Button className="text-white bg-[#3088EE] font-semibold">
            Enviar questionário
          </Button>
        </div>
      </section>
      <section className="w-full">
        <form className="w-full flex flex-col gap-4">
          <Input
            placeholder="Questionário sem título"
            className="md:h-24 w-full text-3xl font-bold border-none"
          />
          <div className="border-2xl bg-white p-4 flex flex-col gap-4">
            {questions.map((x, index) => (
              <div key={index}></div>
            ))}

            <div className="bg-[#F8F7F9] border-2 border-[#5CA7FF] rounded-lg p-3">
              <div className="flex flex-col md:flex-row gap-3">
                <Input
                  className="bg-transparent"
                  placeholder="Pergunta sem título"
                  onChange={(e) => setQuestionTitle(e.target.value)}
                />
                <select
                  className="w-full bg-transparent border border-[#D7D7DA] rounded-lg p-2"
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
                      className="md:max-w-[179px] bg-transparent"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Label className="font-semibold text-[#050506]">
                      Tamanho máximo (MB)
                    </Label>
                    <Input
                      placeholder="10"
                      className="md:max-w-[179px] bg-transparent"
                    />
                  </div>
                </div>
              )}
              {selectedOption === "3" && (
                <div className="mt-4 flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <label
                      key={num}
                      className="flex items-center gap-3 text-center text-lg"
                    >
                      <input disabled type="radio" name="scale" value={num} />
                      {num}
                    </label>
                  ))}
                </div>
              )}
              {selectedOption === "4" && (
                <div className="mt-4 flex flex-col gap-3">
                  {[...Array(checkboxOptions)].map((option, index) => (
                    <label key={index} className="flex items-center gap-2">
                      <Input
                        disabled
                        placeholder={`Opção ${index + 1}`}
                        className="bg-transparent"
                      />
                    </label>
                  ))}
                  <Button
                    onClick={() => setCheckboxOptions(checkboxOptions + 1)}
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
    </main>
  );
}
