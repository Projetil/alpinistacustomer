"use client";

import Modal from "@/components/default/Modal";
import { LoadingSpinner } from "@/components/default/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCustomerContext } from "@/contexts/CustomerContext";
import EnvironmentService from "@/services/EnvironmentsService";
import QuestionnaryService from "@/services/QuestionnaryService";
import { IEnvironment } from "@/types/IEnvironment";
import {
  ICreateQuestion,
  ICreateQuestionaryRespondents,
  IQuestionDtoForm,
  IQuestionnary,
} from "@/types/IQuestionnary";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";
import { toast } from "react-toastify";
import { z } from "zod";

const schemaCompany = z.object({
  type: z.string().min(1, "Tipo de perfil é obrigatório"),
  limitDate: z.string().min(3, "Data Limite é obrigatório"),
  thirthPart: z.string().optional(),
  responds: z
    .array(
      z.object({
        name: z.string().optional(),
        email: z.string().optional(),
      })
    )
    .optional(),
});
export type DataCompany = z.infer<typeof schemaCompany>;

const ModalSendQuest = ({
  open,
  setOpen,
  questions,
  questTitle,
  modelData,
  thirthData,
}: {
  open: boolean;
  setOpen: () => void;
  questions: IQuestionDtoForm[];
  questTitle: string;
  thirthData?: IEnvironment[];
  modelData?: IQuestionnary;
}) => {
  const [respSize, setRespSize] = useState(1);
  const [loading, setLoading] = useState(false);
  const [thirthIds, setThirthIds] = useState<number[]>([]);
  const [openThirth, setOpenThirth] = useState(false);
  const [thirthNames, setThirthNames] = useState<string[]>([]);
  const navigate = useRouter();
  const { customers } = useCustomerContext();
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DataCompany>({
    resolver: zodResolver(schemaCompany),
  });
  const watchType = watch("type");

  const onSubmit = async (data: DataCompany) => {
    try {
      setLoading(true);
      const formatQuestion: ICreateQuestion[] = questions.map((question) => {
        return {
          title: question.title,
          answerType: Number(question.type),
          options: question.options,
          maxFiles:
            question.type == "2" ? question.maxFiles?.toString() : undefined,
          maxSize:
            question.type == "2" ? question.fileSize?.toString() : undefined,
        };
      });

      const formatRespondents = async (): Promise<
        ICreateQuestionaryRespondents[]
      > => {
        if (data.type === "1") {
          if (data.responds) {
            return data.responds.map((respond) => {
              return {
                name: respond.name ?? "",
                email: respond.email ?? "",
              };
            });
          }
        }
        if (data.type === "2") {
          const result = thirthIds.map(async (id) => {
            const res = await EnvironmentService.GetById(id);
            return {
              name: res.externalEnvironment?.tecnicalName ?? "",
              email: res.externalEnvironment?.tecnicalEmail ?? "",
            };
          });

          return Promise.all(result);
        }
        return [];
      };

      await QuestionnaryService.Post({
        title: questTitle,
        companyId: customers?.companyId ?? 0,
        customerId: customers?.id ?? 0,
        questions: formatQuestion,
        respondents: await formatRespondents(),
        type: data.type === "1" ? 1 : 2,
        limitDate: data.limitDate,
      });
      toast.success("Questionário enviado com sucesso");
      navigate.push("/questionnaire");
    } catch (err) {
      toast.error("Erro ao enviar questionario");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reset({
      type: "1",
    });
  }, []);

  useEffect(() => {
    if (modelData) {
      reset({
        type: modelData.type.toString(),
        limitDate: new Date(modelData.limitDate).toString(),
      });
    }
  }, [modelData]);

  useEffect(() => {}, [openThirth]);

  return (
    <Modal isOpen={open} onClose={setOpen}>
      <div className="bg-white py-6 px-6 rounded-xl flex flex-col gap-10 overflow-y-auto max-h-screen h-full md:h-auto md:w-auto w-full md:min-w-[700px]">
        <div onClick={setOpen} className="flex w-full justify-start">
          <h3 className="font-bold text-[#093970] text-3xl">
            Enviar questionário
          </h3>
        </div>
        <form
          className="mt-6 w-full flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="text-[#050506] flex flex-col w-full">
              <Label className="font-semibold text-lg">
                Tipo <span className="text-red-500 ">*</span>
              </Label>
              <select
                className="bg-transparent py-2 rounded-md px-2 border border-[#DFDFE2] mt-2"
                {...register("type")}
              >
                <option value="1">Interno</option>
                <option value="2">Terceiro</option>
              </select>
              {errors.type && (
                <span className="text-red-500">{errors.type.message}</span>
              )}
            </div>
            <div className="text-[#050506] w-full flex flex-col">
              <Label className="font-semibold text-lg">
                Data Limite <span className="text-red-500 ">*</span>
              </Label>
              <Input
                type="date"
                placeholder="12/12/2024"
                className="font-normal border-[#D7D7DA] bg-transparent mt-2"
                {...register("limitDate")}
              />
              {errors.limitDate && (
                <span className="text-red-500">{errors.limitDate.message}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            {watchType === "1" && (
              <>
                <h4 className="font-semibold text-[#40414A] mt-4">
                  Informações do(s) respondente(s)
                </h4>
                <div className="flex flex-col gap-6">
                  {[...Array(respSize)].map((_, index) => (
                    <div className="flex flex-col gap-4 w-full" key={index}>
                      <div className="text-[#050506] w-full flex flex-col">
                        <div className="flex justify-between items-center">
                          <Label className="font-semibold text-lg">
                            Nome da pessoa{" "}
                            <span className="text-red-500 ">*</span>
                          </Label>
                          <Button
                            variant={"outline"}
                            className="text-red-500 font-semibold border-none"
                            type="button"
                            onClick={() => {
                              setRespSize((prev) => prev - 1);
                              reset((prev) => ({
                                ...prev,
                                responds: prev.responds?.filter(
                                  (_, i) => i !== index
                                ),
                              }));
                            }}
                          >
                            <Minus /> Remover
                          </Button>
                        </div>
                        <Input
                          type="text"
                          placeholder="Nome da pessoa"
                          className="font-normal border-[#D7D7DA] bg-transparent mt-2"
                          {...register(`responds.${index}.name` as const)}
                        />
                        {errors.responds?.[index]?.name && (
                          <span className="text-red-500">
                            {errors.responds?.[index]?.name.message}
                          </span>
                        )}
                      </div>
                      <div
                        key={index}
                        className="text-[#050506] w-full flex flex-col"
                      >
                        <Label className="font-semibold text-lg">
                          E-mail <span className="text-red-500 ">*</span>
                        </Label>
                        <Input
                          type="text"
                          placeholder="someone@example.com"
                          className="font-normal border-[#D7D7DA] bg-transparent mt-2"
                          {...register(`responds.${index}.email` as const)}
                        />
                        {errors.responds?.[index]?.email && (
                          <span className="text-red-500">
                            {errors.responds?.[index]?.email.message}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex w-full gap-4 justify-start items-center mt-2">
                  <Button
                    variant={"outline"}
                    className="text-[#3088EE] font-semibold border-none"
                    type="button"
                    onClick={() => setRespSize((prev) => prev + 1)}
                  >
                    <Plus /> Adicionar mais respondentes
                  </Button>
                </div>
              </>
            )}
            {watchType === "2" && (
              <div className="text-[#050506] flex flex-col w-full mt-4">
                <Label className="font-semibold text-lg">
                  Selecione o(s) terceiro(s){" "}
                  <span className="text-red-500 ">*</span>
                </Label>
                <div
                  onClick={() => setOpenThirth(!openThirth)}
                  className="w-full h-12 border rounded-lg border-[#E6E6E8] flex justify-between items-center cursor-pointer"
                >
                  <p className="px-2">
                    {thirthNames.join(", ") || "Selecione os terceiros"}
                  </p>
                  <IoIosArrowDown />
                </div>
                {openThirth && (
                  <div className="w-full max-w-[550px] relative border rounded-lg bg-[#FBFBFB] border-[#E6E6E8] mt-2 p-2">
                    {thirthData?.map((control, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2">
                        <input
                          type="checkbox"
                          id={`control-${index}`}
                          checked={thirthIds.includes(control.id)}
                          value={control.name}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setThirthNames([...thirthNames, control.name]);
                              setThirthIds([...thirthIds, control.id]);
                            } else {
                              setThirthNames(
                                thirthNames.filter(
                                  (item) => item !== control.name
                                )
                              );
                              setThirthIds(
                                thirthIds.filter((item) => item !== control.id)
                              );
                            }
                          }}
                          className="h-4 w-4 border border-gray-300 rounded-md text-blue-600 focus:ring-blue-500 data-[state=checked]:bg-blue-500 data-[state=checked]:text-blue-500 "
                        />
                        <Label
                          htmlFor={`control-${index}`}
                          className="text-sm font-medium leading-none"
                        >
                          {control.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
                {thirthData
                  ?.filter((item) => thirthIds.includes(item.id))
                  .map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-col justify-start items-start gap-2 mt-4"
                      >
                        <p className="font-semibold text-[#636267]">
                          {item.externalEnvironment?.tecnicalName}
                        </p>
                        <Label className="font-semibold text-lg">
                          E-mail técnico
                          <span className="text-red-500 ">*</span>
                        </Label>
                        <Input
                          type="text"
                          value={item.externalEnvironment?.tecnicalEmail}
                          className="font-normal border-[#D7D7DA] bg-transparent mt-2"
                        />
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          <div className="flex w-full gap-4 justify-end items-center mt-2">
            <Button
              variant={"outline"}
              onClick={() => setOpen()}
              className="text-[#1A69C4] border-[#5CA7FF] font-semibold"
              type="button"
            >
              Voltar
            </Button>
            <Button
              disabled={loading}
              className="text-white bg-[#3088EE] font-semibold"
              type="submit"
            >
              {loading ? <LoadingSpinner /> : "Enviar"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalSendQuest;
