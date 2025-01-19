"use client";
import { LoadingSpinner } from "@/components/default/Spinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCustomerContext } from "@/contexts/CustomerContext";
import AssetsService from "@/services/AssetsService";
import EnvironmentService from "@/services/EnvironmentsService";
import { ICompanyAssets } from "@/types/ICompanyAssets";
import { ICreateExternalEnv, IEnvironment } from "@/types/IEnvironment";
import { formatPhone } from "@/utils/formatString";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const schemaData = z.object({
  name: z.string().min(3, "Nome é obrigatório").max(255, "Nome é muito longo"),
  domain: z
    .string()
    .min(3, "Domínio é obrigatório")
    .max(255, "Domínio é muito longo"),
  severity: z.string().min(1, "Severidade é obrigatória"),
  status: z.string().min(1, "Status é obrigatório"),
  ativos: z
    .array(z.union([z.boolean(), z.string()]))
    .transform((values) =>
      values.map((val) => (typeof val === "boolean" ? val.toString() : val))
    ),
  tecnicalName: z.string().min(1, "Nome Técnico é obrigatório"),
  tecnicalPhone: z.string().min(1, "Telefone Técnico é obrigatório"),
  tecnicalEmail: z.string().email("Email Técnico é obrigatório"),
  tecnicalPosition: z.string().min(3, "Cargo Técnico é obrigatório"),
  comercialName: z.string().min(1, "Nome comercial é obrigatório"),
  comercialPhone: z.string().min(1, "Telefone comercial é obrigatório"),
  comercialEmail: z.string().email("Email comercial é obrigatório"),
  comercialPosition: z.string().min(3, "Cargo comercial é obrigatório"),
  financialRespName: z
    .string()
    .min(1, "Nome do responsavel financeiro é obrigatório"),
  financialRespPhone: z
    .string()
    .min(1, "Telefone do responsavel financeiro é obrigatório"),
  financialRespEmail: z
    .string()
    .email("Email do responsavel financeiro é obrigatório"),
  financialRespPosition: z
    .string()
    .min(3, "Cargo do responsavel financeiro é obrigatório"),
});

type FormType = z.infer<typeof schemaData>;

const ExternalFormEnv = ({ dataEnv }: { dataEnv?: IEnvironment }) => {
  const navigation = useRouter();
  const [tabs, setTabs] = useState(1);
  const [selectedCount, setSelectedCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingButtons, setLoadingButtons] = useState(false);
  const [filterName, setFilterName] = useState<string | undefined>();
  const [assets, setAssets] = useState<ICompanyAssets[]>([]);
  const { customers } = useCustomerContext();
  const {
    register,
    watch,
    reset,
    setError,
    clearErrors,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schemaData),
  });
  const ativos = watch("ativos");

  useEffect(() => {
    setSelectedCount(
      ativos?.filter((x) => x.toString() != "false").length || 0
    );
  }, [ativos, loadingButtons]);

  const onSubmit = async (data: FormType) => {
    if (dataEnv) {
      try {
        setLoading(true);
        data.ativos = data.ativos.filter((ativo) => ativo !== "false");
        await EnvironmentService.Put(
          {
            name: data.name,
            severity: Number(data.severity),
            status: Number(data.status),
            ativos: data.ativos,
            type: 2,
            externalEnvironment: {
              id: dataEnv.externalEnvironment?.id || 0,
              environmentId: dataEnv.id,
              domain: data.domain,
              tecnicalName: data.tecnicalName,
              tecnicalPhone: Number(data.tecnicalPhone.replace(/\D/g, "")),
              tecnicalEmail: data.tecnicalEmail,
              tecnicalPosition: data.tecnicalPosition,
              comercialName: data.comercialName,
              comercialPhone: Number(data.comercialPhone.replace(/\D/g, "")),
              comercialEmail: data.comercialEmail,
              comercialPosition: data.comercialPosition,
              financialRespName: data.financialRespName,
              financialRespPhone: Number(
                data.financialRespPhone.replace(/\D/g, "")
              ),
              financialRespEmail: data.financialRespEmail,
              financialRespPosition: data.financialRespPosition,
            },
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
    } else {
      try {
        setLoading(true);
        const externalEnv: ICreateExternalEnv = {
          domain: data.domain,
          tecnicalName: data.tecnicalName,
          tecnicalPhone: Number(data.tecnicalPhone.replace(/\D/g, "")),
          tecnicalEmail: data.tecnicalEmail,
          tecnicalPosition: data.tecnicalPosition,
          comercialName: data.comercialName,
          comercialPhone: Number(data.comercialPhone.replace(/\D/g, "")),
          comercialEmail: data.comercialEmail,
          comercialPosition: data.comercialPosition,
          financialRespName: data.financialRespName,
          financialRespPhone: Number(
            data.financialRespPhone.replace(/\D/g, "")
          ),
          financialRespEmail: data.financialRespEmail,
          financialRespPosition: data.financialRespPosition,
        };
        data.ativos = data.ativos.filter((ativo) => ativo !== "false");
        await EnvironmentService.Post({
          name: data.name,
          status: Number(data.status),
          severity: Number(data.severity),
          ativos: data.ativos,
          type: 2,
          externalEnvironment: externalEnv,
          companyId: customers ? Number(customers.companyId) : 0,
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

  const fetchAssets = async () => {
    try {
      const res = await AssetsService.GetByCompanyId(
        customers?.companyId ?? 0,
        filterName
      );
      setAssets(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [filterName]);

  useMemo(() => {
    if (dataEnv) {
      reset({
        name: dataEnv.name,
        severity: dataEnv.severity.toString(),
        status: dataEnv.status.toString(),
        domain: dataEnv.externalEnvironment?.domain,
        tecnicalName: dataEnv.externalEnvironment?.tecnicalName,
        tecnicalPhone: formatPhone(
          dataEnv.externalEnvironment?.tecnicalPhone.toString() || ""
        ),
        tecnicalEmail: dataEnv.externalEnvironment?.tecnicalEmail,
        tecnicalPosition: dataEnv.externalEnvironment?.tecnicalPosition,
        comercialName: dataEnv.externalEnvironment?.comercialName,
        comercialPhone: formatPhone(
          dataEnv.externalEnvironment?.comercialPhone.toString() || ""
        ),
        comercialEmail: dataEnv.externalEnvironment?.comercialEmail,
        comercialPosition: dataEnv.externalEnvironment?.comercialPosition,
        financialRespName: dataEnv.externalEnvironment?.financialRespName,
        financialRespPhone: formatPhone(
          dataEnv.externalEnvironment?.financialRespPhone.toString() || ""
        ),
        financialRespEmail: dataEnv.externalEnvironment?.financialRespEmail,
        financialRespPosition:
          dataEnv.externalEnvironment?.financialRespPosition,
      });
    }
  }, [dataEnv]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-4 bg-white w-full rounded-xl">
        <h4 className="hidden md:block text-[#050506] font-semibold text-sm mb-4">
          Informações de cadastro
        </h4>
        <div className="md:flex gap-8 mb-6 hidden flex-wrap">
          <div
            className={`${
              tabs == 1 ? "text-[#3088EE]" : "text-[#B9B8BF]"
            } flex gap-2 items-center justify-center font-semibold`}
          >
            <p
              className={`flex items-center justify-center p-1 rounded-full border-[2px] w-10 h-10 ${
                tabs == 1 ? "border-[#3088EE]" : "border-[#B9B8BF]"
              }`}
            >
              01
            </p>
            <p>Pessoal</p>
          </div>
          <div
            className={`${
              tabs == 2 ? "text-[#3088EE]" : "text-[#B9B8BF]"
            } flex gap-2 items-center justify-center font-semibold`}
          >
            <p
              className={`flex items-center justify-center p-1 rounded-full border-[2px] w-10 h-10 ${
                tabs == 2 ? "border-[#3088EE]" : "border-[#B9B8BF]"
              }`}
            >
              02
            </p>
            <p>Técnico</p>
          </div>
          <div
            className={`${
              tabs == 3 ? "text-[#3088EE]" : "text-[#B9B8BF]"
            } flex gap-2 items-center justify-center font-semibold`}
          >
            <p
              className={`flex items-center justify-center p-1 rounded-full border-[2px] w-10 h-10 ${
                tabs == 3 ? "border-[#3088EE]" : "border-[#B9B8BF]"
              }`}
            >
              03
            </p>
            <p>Comercial</p>
          </div>
          <div
            className={`${
              tabs == 4 ? "text-[#3088EE]" : "text-[#B9B8BF]"
            } flex gap-2 items-center justify-center font-semibold`}
          >
            <p
              className={`flex items-center justify-center p-1 rounded-full border-[2px] w-10 h-10 ${
                tabs == 4 ? "border-[#3088EE]" : "border-[#B9B8BF]"
              }`}
            >
              04
            </p>
            <p>Responsável Interno</p>
          </div>
        </div>
        <div className="flex md:hidden gap-2 w-full mb-6">
          <div
            className={`h-3 w-full rounded ${
              tabs == 1 ? "bg-[#3088EE]" : "bg-[#E5E8ED]"
            }`}
          ></div>
          <div
            className={`h-3 w-full rounded ${
              tabs == 2 ? "bg-[#3088EE]" : "bg-[#E5E8ED]"
            }`}
          ></div>
          <div
            className={`h-3 w-full rounded ${
              tabs == 3 ? "bg-[#3088EE]" : "bg-[#E5E8ED]"
            }`}
          ></div>
          <div
            className={`h-3 w-full rounded ${
              tabs == 4 ? "bg-[#3088EE]" : "bg-[#E5E8ED]"
            }`}
          ></div>
        </div>
        {tabs == 1 && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                <Label className="text-[#050506] font-semibold text-sm">
                  Nome<span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Insira o nome do seu ambiente"
                  {...register("name")}
                  className="p-2 bg-transparent border border-[#E6E6E8] rounded-lg"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label className="text-[#050506] font-semibold text-sm">
                  Dominío<span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Insira o domínio"
                  {...register("domain")}
                  className="p-2 bg-transparent border border-[#E6E6E8] rounded-lg"
                />
                {errors.domain && (
                  <span className="text-red-500 text-sm">
                    {errors.domain.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="flex flex-col gap-2 w-full md:w-72">
                <Label className="text-[#050506] font-semibold text-sm">
                  Severidade<span className="text-red-500">*</span>
                </Label>
                <select
                  {...register("severity")}
                  className="p-2 bg-transparent border border-[#E6E6E8] rounded-lg w-full"
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
              <div className="flex flex-col gap-2 w-full md:w-72">
                <Label className="text-[#050506] font-semibold text-sm">
                  Status<span className="text-red-500">*</span>
                </Label>
                <select
                  {...register("status")}
                  className="p-2 bg-transparent border border-[#E6E6E8] rounded-lg w-full"
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
        )}
        {tabs == 2 && (
          <div className="flex flex-col gap-4">
            <p>
              Por favor, insira as informações do ponto de contato técnico do
              terceiro.
            </p>
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                <Label className="text-[#050506] font-semibold text-sm">
                  Nome<span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Insira o nome"
                  {...register("tecnicalName")}
                  className="p-2 bg-transparent border border-[#E6E6E8] rounded-lg"
                />
                {errors.tecnicalName && (
                  <span className="text-red-500 text-sm">
                    {errors.tecnicalName.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label className="text-[#050506] font-semibold text-sm">
                  Telefone<span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Insira o telefone"
                  {...register("tecnicalPhone")}
                  className="p-2 bg-transparent border border-[#E6E6E8] rounded-lg"
                  onChange={(e) => {
                    const formattedValue = formatPhone(e.target.value);
                    e.target.value = formattedValue;
                    register("tecnicalPhone").onChange(e);
                  }}
                />
                {errors.tecnicalPhone && (
                  <span className="text-red-500 text-sm">
                    {errors.tecnicalPhone.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                <Label className="text-[#050506] font-semibold text-sm">
                  E-mail<span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Insira o email"
                  {...register("tecnicalEmail")}
                  className="p-2 bg-transparent border border-[#E6E6E8] rounded-lg"
                />
                {errors.tecnicalEmail && (
                  <span className="text-red-500 text-sm">
                    {errors.tecnicalEmail.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label className="text-[#050506] font-semibold text-sm">
                  Cargo<span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Insira o cargo"
                  {...register("tecnicalPosition")}
                  className="p-2 bg-transparent border border-[#E6E6E8] rounded-lg"
                />
                {errors.tecnicalPosition && (
                  <span className="text-red-500 text-sm">
                    {errors.tecnicalPosition.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
        {tabs == 3 && (
          <div className="flex flex-col gap-4">
            <p>
              Por favor, insira as informações do ponto de contato comercial do
              terceiro.
            </p>
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                <Label className="text-[#050506] font-semibold text-sm">
                  Nome<span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Insira o nome"
                  {...register("comercialName")}
                  className="p-2 bg-transparent border border-[#E6E6E8] rounded-lg"
                />
                {errors.comercialName && (
                  <span className="text-red-500 text-sm">
                    {errors.comercialName.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label className="text-[#050506] font-semibold text-sm">
                  Telefone<span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Insira o telefone"
                  {...register("comercialPhone")}
                  className="p-2 bg-transparent border border-[#E6E6E8] rounded-lg"
                  onChange={(e) => {
                    const formattedValue = formatPhone(e.target.value);
                    e.target.value = formattedValue;
                    register("comercialPhone").onChange(e);
                  }}
                />
                {errors.comercialPhone && (
                  <span className="text-red-500 text-sm">
                    {errors.comercialPhone.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                <Label className="text-[#050506] font-semibold text-sm">
                  E-mail<span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Insira o email"
                  {...register("comercialEmail")}
                  className="p-2 bg-transparent border border-[#E6E6E8] rounded-lg"
                />
                {errors.comercialEmail && (
                  <span className="text-red-500 text-sm">
                    {errors.comercialEmail.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label className="text-[#050506] font-semibold text-sm">
                  Cargo<span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Insira o cargo"
                  {...register("comercialPosition")}
                  className="p-2 bg-transparent border border-[#E6E6E8] rounded-lg"
                />
                {errors.comercialPosition && (
                  <span className="text-red-500 text-sm">
                    {errors.comercialPosition.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
        {tabs == 4 && (
          <div className="flex flex-col gap-4">
            <p>
              Por favor, insira as informações da pessoa responsável pelo
              terceiro dentro de sua empresa
            </p>
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                <Label className="text-[#050506] font-semibold text-sm">
                  Nome<span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Insira o nome"
                  {...register("financialRespName")}
                  className="p-2 bg-transparent border border-[#E6E6E8] rounded-lg"
                />
                {errors.financialRespName && (
                  <span className="text-red-500 text-sm">
                    {errors.financialRespName.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label className="text-[#050506] font-semibold text-sm">
                  Telefone<span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Insira o telefone"
                  {...register("financialRespPhone")}
                  className="p-2 bg-transparent border border-[#E6E6E8] rounded-lg"
                  onChange={(e) => {
                    const formattedValue = formatPhone(e.target.value);
                    e.target.value = formattedValue;
                    register("financialRespPhone").onChange(e);
                  }}
                />
                {errors.financialRespPhone && (
                  <span className="text-red-500 text-sm">
                    {errors.financialRespPhone.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                <Label className="text-[#050506] font-semibold text-sm">
                  E-mail<span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Insira o email"
                  {...register("financialRespEmail")}
                  className="p-2 bg-transparent border border-[#E6E6E8] rounded-lg"
                />
                {errors.financialRespEmail && (
                  <span className="text-red-500 text-sm">
                    {errors.financialRespEmail.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label className="text-[#050506] font-semibold text-sm">
                  Cargo<span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="Insira o cargo"
                  {...register("financialRespPosition")}
                  className="p-2 bg-transparent border border-[#E6E6E8] rounded-lg"
                />
                {errors.financialRespPosition && (
                  <span className="text-red-500 text-sm">
                    {errors.financialRespPosition.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {tabs == 1 && (
        <div className="p-4 w-full bg-[#FBFBFB] rounded-lg">
          <h4 className="hidden md:block text-[#050506] font-semibold text-sm mb-4">
            Seleção de ativos
          </h4>
          <div className="p-4 bg-white w-full rounded-xl border border-[#3088EE]">
            <div className="w-full h-fit overflow-y-auto flex flex-col gap-3">
              <Input
                onChange={(e) => setFilterName(e.target.value)}
                className="md:w-2/3 m-1"
                placeholder="Buscar ativo"
                type="text"
              />
              <p className="p-2">{selectedCount} selecionados</p>
              <div className="flex gap-4 flex-wrap max-h-[160px] overflow-y-auto">
                {assets.map((asset, index) => (
                  <div
                    key={index}
                    className="w-[230px] p-2 flex gap-2 items-center justify-center"
                  >
                    <input
                      type="checkbox"
                      {...register(`ativos.${index}` as const)}
                      id={`${index}`}
                      value={asset.id}
                      onClick={() => setLoadingButtons(!loadingButtons)}
                      className="peer h-4 w-4 border border-gray-300 rounded-md text-blue-600 focus:ring-blue-500"
                    />
                    <Label
                      htmlFor={`${index}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {asset.hostname}
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
      )}
      {tabs == 4 ? (
        <div className="w-full flex justify-between">
          <button
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              setLoading(true);
              setTabs(tabs - 1);
              setLoading(false);
            }}
            type="button"
            className="p-2 bg-transparent border border-blue-500 text-blue-500 font-semibold rounded-lg px-16 mt-6"
          >
            {loading ? <LoadingSpinner /> : "Voltar"}
          </button>
          <button
            disabled={loading}
            type="submit"
            className="p-2 bg-blue-500 text-white font-semibold rounded-lg px-16 mt-6"
          >
            {loading ? <LoadingSpinner /> : "Finalizar"}
          </button>
        </div>
      ) : tabs == 1 ? (
        <div className="w-full flex justify-end">
          <button
            disabled={loading}
            onClick={(e) => {
              if (
                getValues("name").length > 0 &&
                getValues("domain").length > 0
              ) {
                setLoading(true);
                e.preventDefault();
                clearErrors();
                setTabs(tabs + 1);
                setLoading(false);
              } else {
                setError("name", {
                  message: "Nome é obrigatório",
                });
                setError("domain", {
                  message: "Dominío é obrigatório",
                });
              }
            }}
            type="button"
            className="p-2 bg-blue-500 text-white font-semibold rounded-lg px-16 mt-6"
          >
            {loading ? <LoadingSpinner /> : "Próximo"}
          </button>
        </div>
      ) : (
        <div className="w-full flex justify-between">
          <button
            disabled={loading}
            onClick={(e) => {
              setLoading(true);
              e.preventDefault();
              setTabs(tabs - 1);
              setLoading(false);
            }}
            type="button"
            className="p-2 bg-transparent border border-blue-500 text-blue-500 font-semibold rounded-lg px-16 mt-6"
          >
            {loading ? <LoadingSpinner /> : "Voltar"}
          </button>
          <button
            disabled={loading}
            onClick={(e) => {
              if (tabs == 2) {
                if (
                  getValues("tecnicalName").length == 0 ||
                  getValues("tecnicalPhone").length == 0 ||
                  getValues("tecnicalEmail").length == 0 ||
                  getValues("tecnicalPosition").length == 0
                ) {
                  setError("tecnicalName", {
                    message: "Nome é obrigatório",
                  });
                  setError("tecnicalPhone", {
                    message: "Telefone é obrigatório",
                  });
                  setError("tecnicalEmail", {
                    message: "Email é obrigatório",
                  });
                  setError("tecnicalPosition", {
                    message: "Cargo é obrigatório",
                  });
                } else {
                  setLoading(true);
                  e.preventDefault();
                  setTabs(tabs + 1);
                  setLoading(false);
                }
              }
              if (tabs == 3) {
                if (
                  getValues("comercialName").length == 0 ||
                  getValues("comercialPhone").length == 0 ||
                  getValues("comercialEmail").length == 0 ||
                  getValues("comercialPosition").length == 0
                ) {
                  setError("comercialName", {
                    message: "Nome é obrigatório",
                  });
                  setError("comercialPhone", {
                    message: "Telefone é obrigatório",
                  });
                  setError("comercialEmail", {
                    message: "Email é obrigatório",
                  });
                  setError("comercialPosition", {
                    message: "Cargo é obrigatório",
                  });
                } else {
                  setLoading(true);
                  e.preventDefault();
                  setTabs(tabs + 1);
                  setLoading(false);
                }
              }
            }}
            type="button"
            className="p-2 bg-blue-500 text-white font-semibold rounded-lg px-16 mt-6"
          >
            {loading ? <LoadingSpinner /> : "Próximo"}
          </button>
        </div>
      )}
    </form>
  );
};

export default ExternalFormEnv;
