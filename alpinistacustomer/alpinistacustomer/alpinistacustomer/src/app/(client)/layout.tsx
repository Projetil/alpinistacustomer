"use client";
import Header from "@/components/default/Header";
import Sidebar from "@/components/default/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: PrivateLayoutProps) {
  const { status } = useSession();

  const navigate = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      navigate.push("/");
      toast.warn("Usuário não autenticado");
    }
  }, [status, navigate]);

  return (
    <div className="flex flex-col w-full bg-[#F8F7F9] min-h-screen">
      <Header />
      <div className="flex gap-6">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
