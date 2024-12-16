"use client";
import { LoadingSpinner } from "@/components/default/Spinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EnvironmentService from "@/services/EnvironmentsService";
import { IEnvironment } from "@/types/IEnvironment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const schemaData = z.object({
  name: z.string().min(3, "Nome é obrigatório").max(255, "Nome é muito longo"),
  severity: z.string().min(1, "Severidade é obrigatória"),
  status: z.string().min(1, "Status é obrigatória"),
  ativos: z
    .array(
      z.union([z.boolean(), z.string()]) // Allow both boolean and string inputs
    )
    .transform((values) =>
      values.map((val) => (typeof val === "boolean" ? val.toString() : val))
    ),
});

type FormType = z.infer<typeof schemaData>;

const InternFormEnv = ({ dataEnv }: { dataEnv?: IEnvironment }) => {
  const navigation = useRouter();
  const [selectedCount, setSelectedCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingButtons, setLoadingButtons] = useState(false);
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schemaData),
  });
  const ativos = watch("ativos");

  useEffect(() => {
    setSelectedCount(
      ativos?.filter((x) => x.toString() === "true").length || 0
    );
  }, [ativos, loadingButtons]);

  const onSubmit = async (data: FormType) => {
    if (dataEnv) {
      try {
        setLoading(true);
        await EnvironmentService.Put(
          {
            name: data.name,
            severity: Number(data.severity),
            status: Number(data.status),
            type: 1,
          },
          dataEnv.id
        );
        toast.success("Ambiente atualizado com sucesso");
        navigation.push("/environment");
      } catch (erro) {
        console.log(erro);
        toast.error("Erro ao atualizar ambiente");
      } finally {
        setLoading(false);
      }
      return;
    } else {
      try {
        setLoading(true);
        await EnvironmentService.Post({
          name: data.name,
          severity: Number(data.severity),
          status: Number(data.status),
          type: 1,
        });
        toast.success("Ambiente criado com sucesso");
        navigation.push("/environment");
      } catch (erro) {
        console.log(erro);
        toast.error("Erro ao criar ambiente");
      } finally {
        setLoading(false);
      }
    }
  };

  useMemo(() => {
    if (dataEnv) {
      reset({
        name: dataEnv.name,
        severity: dataEnv.severity.toString(),
        status: dataEnv.status.toString(),
      });
    }
  }, [dataEnv]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-4 bg-white w-full rounded-xl">
        <h4 className="hidden md:block text-[#050506] font-semibold text-sm mb-4">
          Informações de cadastro
        </h4>
        <div className="flex flex-col md:flex-row gap-4 md:w-fit">
          <div className="flex flex-col gap-2 w-full md:w-[230px]">
            <Label className="text-[#818086] font-semibold text-sm">
              Nome<span className="text-red-500">*</span>
            </Label>
            <Input
              {...register("name")}
              className="p-2 bg-transparent border border-[#E6E6E8] rounded-lg"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full md:w-[230px]">
            <Label className="text-[#818086] font-semibold text-sm">
              Severidade<span className="text-red-500">*</span>
            </Label>
            <select
              {...register("severity")}
              className="p-2 bg-transparent border border-[#E6E6E8] rounded-lg"
            >
              <option value="1">Baixo</option>
              <option value="2">Médio</option>
              <option value="3">Alto</option>
              <option value="4">Crítico</option>
            </select>
            {errors.severity && (
              <span className="text-red-500 text-sm">
                {errors.severity.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full md:w-[230px]">
            <Label className="text-[#818086] font-semibold text-sm">
              Status<span className="text-red-500">*</span>
            </Label>
            <select
              {...register("status")}
              className="p-2 bg-transparent border border-[#E6E6E8] rounded-lg"
            >
              <option value="1">Ativo</option>
              <option value="2">Inativo</option>
            </select>
            {errors.status && (
              <span className="text-red-500 text-sm">
                {errors.status.message}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="p-4 w-full bg-[#FBFBFB] rounded-lg">
        <h4 className="hidden md:block text-[#050506] font-semibold text-sm mb-4">
          Seleção de ativos
        </h4>
        <div className="p-4 bg-white w-full rounded-xl border border-[#3088EE]">
          <div className="w-full h-fit overflow-y-auto flex flex-col gap-3">
            <Input
              className="md:w-2/3 m-1"
              placeholder="Buscar ativo"
              type="text"
            />
            <p className="p-2">{selectedCount} selecionados</p>
            <div className="flex gap-4 flex-wrap max-h-[160px] overflow-y-auto">
              {[...Array(30)].map((_, index) => (
                <div
                  key={index}
                  className="w-[230px] p-2 flex gap-2 items-center justify-center"
                >
                  <input
                    type="checkbox"
                    {...register(`ativos.${index}` as const)}
                    id={`${index}`}
                    onClick={() => setLoadingButtons(!loadingButtons)}
                    className="peer h-4 w-4 border border-gray-300 rounded-md text-blue-600 focus:ring-blue-500"
                  />
                  <Label
                    htmlFor={`${index}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    someone@example.com
                  </Label>
                </div>
              ))}
            </div>
            {errors.ativos && (
              <span className="text-red-500 text-sm">
                {errors.ativos.message}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <button
          disabled={loading}
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-lg px-16 mt-6"
        >
          {loading ? <LoadingSpinner /> : "Criar"}
        </button>
      </div>
    </form>
  );
};

export default InternFormEnv;
