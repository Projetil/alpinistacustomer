"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCustomerContext } from "@/contexts/CustomerContext";
import CustomerService from "@/services/CustomerService";
import UserService from "@/services/UserService";
import { formatPhone } from "@/utils/formatString";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "next-auth/react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const schemaUser = z
  .object({
    name: z.string().optional(),
    email: z.string().optional(),
    cargo: z.string().optional(),
    phone: z.string().optional(),
    currentPassword: z.string().optional(),
    newPassword: z
      .string()
      .optional()
      .refine(
        (value) =>
          !value || /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).+$/.test(value),
        {
          message:
            "Senha deve ter pelo menos 1 letra maiúscula, 1 caractere especial e 1 número",
        }
      ),
    repeatPassword: z.string().optional(),
  })
  .refine((data) => !data.newPassword || data.repeatPassword, {
    message: "Repetir nova senha é obrigatório",
    path: ["repeatPassword"],
  })
  .refine((data) => data.newPassword === data.repeatPassword, {
    message: "Nova senha e Repetir nova senha devem ser iguais",
    path: ["repeatPassword"],
  });

type FormDataUser = z.infer<typeof schemaUser>;

const UserForm = () => {
  const { customers } = useCustomerContext();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataUser>({
    resolver: zodResolver(schemaUser),
  });

  const onSubmit = async (data: FormDataUser) => {
    await onSubmitCustomer(data);
    if (data.newPassword && data.currentPassword && data.repeatPassword) {
      await onSubmitPassword(data);
      await signOut();
    }
    toast.success("Usuário atualizado com sucesso");
  };

  const onSubmitCustomer = async (data: FormDataUser) => {
    try {
      await CustomerService.Put(
        {
          ...customers,
          name: data.name,
          number: Number(data.phone?.replace(/\D/g, "")),
          position: data.cargo,
        },
        customers?.id ?? 0
      );
    } catch (erro) {
      console.log(erro);
      toast.error("Erro ao atualizar usuário");
    }
  };

  const onSubmitPassword = async (data: FormDataUser) => {
    try {
      await UserService.ChangePassword({
        userId: customers?.userId ?? 0,
        oldPassword: data.currentPassword ?? "",
        newPassword: data.newPassword ?? "",
      });
    } catch (erro) {
      console.log(erro);
      toast.error("Erro ao atualizar senha");
    }
  };

  useMemo(() => {
    reset({
      name: customers?.name,
      email: customers?.email,
      cargo: customers?.position,
      phone: formatPhone(customers?.number.toString() || ""),
    });
  }, [customers]);

  return (
    <section className="flex flex-col gap-5 w-full max-w-[1200px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10 bg-white md:bg-inherit"
      >
        <div className="flex flex-col bg-white p-3 gap-4 rounded-xl pt-5">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="w-full">
              <Label className="text-[#40414A] font-semibold text-sm">
                Nome de usuário
              </Label>
              <Input
                placeholder="Nome de usuário"
                className="border-[#D8D9E0] border-[2px]"
                type="text"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div className="w-full">
              <Label className="text-[#40414A] font-semibold text-sm">
                E-mail
              </Label>
              <Input
                disabled
                placeholder="E-mail"
                className="border-[#D8D9E0] border-[2px]"
                type="text"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="w-full">
              <Label className="text-[#40414A] font-semibold text-sm">
                Cargo
              </Label>
              <Input
                placeholder="Cargo"
                className="border-[#D8D9E0] border-[2px]"
                type="text"
                {...register("cargo")}
              />
              {errors.cargo && (
                <p className="text-red-500 text-sm">{errors.cargo.message}</p>
              )}
            </div>
          </div>
          <div className="w-fit">
            <Label className="text-[#40414A] font-semibold text-sm">
              Telefone
            </Label>
            <Input
              placeholder="Telefone"
              className="border-[#D8D9E0] border-[2px]"
              type="phone"
              {...register("phone")}
              onChange={(e) => {
                const formattedValue = formatPhone(e.target.value);
                e.target.value = formattedValue;
                register("phone").onChange(e);
              }}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col bg-white p-3 rounded-xl gap-6 w-full">
          <h3 className="text-[#050506] font-semibold">Alterar senha</h3>
          <div className="flex flex-col md:flex-row w-full gap-4">
            <div className="w-full">
              <Label className="text-[#40414A] font-semibold text-sm">
                Senha atual
              </Label>
              <Input
                className="border-[#D8D9E0] border-[2px]"
                type="password"
                placeholder="Senha atual"
                {...register("currentPassword")}
              />
              {errors.currentPassword && (
                <p className="text-red-500 text-sm">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <Label className="text-[#40414A] font-semibold text-sm">
                Nova senha
              </Label>
              <Input
                className="border-[#D8D9E0] border-[2px]"
                type="password"
                {...register("newPassword")}
                placeholder="Nova senha"
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <Label className="text-[#40414A] font-semibold text-sm">
                Repetir nova senha
              </Label>
              <Input
                className="border-[#D8D9E0] border-[2px]"
                type="password"
                placeholder="Repetir nova senha"
                {...register("repeatPassword")}
              />
              {errors.repeatPassword && (
                <p className="text-red-500 text-sm">
                  {errors.repeatPassword.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <Button className="border-none text-white bg-[#3088EE]">
            Salvar
          </Button>
        </div>
      </form>
    </section>
  );
};

export default UserForm;
