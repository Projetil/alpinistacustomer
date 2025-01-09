"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import CustomerService from "@/services/CustomerService";
import { ICustomer } from "@/types/ICustomer";

interface CustomerContextProps {
  customers: ICustomer | null;
  loading: boolean;
  error: string | null;
}

const CustomerContext = createContext<CustomerContextProps | undefined>(
  undefined
);

interface CustomerProviderProps {
  children: React.ReactNode;
}

export const CustomerProvider: React.FC<CustomerProviderProps> = ({
  children,
}) => {
  const { data: session } = useSession();
  const [customers, setCustomers] = useState<ICustomer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      if (session?.user?.id) {
        try {
          const response = await CustomerService.GetAll(
            1,
            10,
            undefined,
            Number(session.user.id)
          );
          setCustomers(response.items[0]);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          console.log(err);
          setError("Failed to fetch customers");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCustomers();
  }, [session]);

  return (
    <CustomerContext.Provider value={{ customers, loading, error }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomerContext = () => {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error(
      "useCustomerContext must be used within a CustomerProvider"
    );
  }
  return context;
};
