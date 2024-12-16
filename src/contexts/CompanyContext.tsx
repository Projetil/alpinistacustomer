"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import CompanyService from "@/services/CompanyService";
import { ICompany } from "@/types/ICompany";
import { useCustomerContext } from "@/contexts/CustomerContext";

interface CompanyContextProps {
  company: ICompany | null;
  loading: boolean;
  error: string | null;
}

const CompanyContext = createContext<CompanyContextProps | undefined>(
  undefined
);

interface CompanyProviderProps {
  children: React.ReactNode;
}

export const CompanyProvider: React.FC<CompanyProviderProps> = ({
  children,
}) => {
  const { data: session } = useSession();
  const { customers } = useCustomerContext();
  const [company, setCompany] = useState<ICompany | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      if (session?.user?.id && customers?.companyId) {
        try {
          const response = await CompanyService.GetById(customers.companyId);
          setCompany(response);
        } catch (err) {
          console.log(err);
          setError("Failed to fetch company");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCompany();
  }, [session, customers]);

  return (
    <CompanyContext.Provider value={{ company, loading, error }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanyContext = () => {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error("useCompanyContext must be used within a CompanyProvider");
  }
  return context;
};
