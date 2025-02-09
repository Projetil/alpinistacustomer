import React, { useState } from "react";
import Container from "../Container";
import Header from "../Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UserService from "@/services/UserService";
import { toast } from "react-toastify";
import { LoadingSpinner } from "@/components/default/Spinner";

const resetPasswordSchema = z.object({
  email: z.string().email("Por favor, insira um email válido."),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword({
  onClose,
  nextPage,
}: {
  onClose: () => void;
  nextPage: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setLoading(true);
      await UserService.PasswordRecovery(data.email ?? "");
      onClose();
      nextPage();
    } catch (error) {
      console.log(error);
      toast.error("Erro ao enviar código de recuperação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header title="Recuperar Senha" onClose={onClose} />
      <p className="p-4">
        Para recuperar sua senha, digite o e-mail ou telefone cadastrado.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 p-4 text-[#40414A]"
      >
        <div className="space-y-1">
          <label className="block font-semibold">Email:</label>
          <Input
            type="email"
            {...register("email")}
            placeholder="mail.example@gmail.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <Button
          disabled={loading}
          type="submit"
          className="w-full bg-[#3088EE]"
        >
          {loading ? <LoadingSpinner /> : "Enviar"}
        </Button>
      </form>
    </Container>
  );
}
