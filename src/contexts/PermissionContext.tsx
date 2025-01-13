"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useCustomerContext } from "./CustomerContext";
import { IPermission, IPermissionPage } from "@/types/IPermission";
import PermissionService from "@/services/PermissionService";

interface PermissionContextProps {
  getPermissions: (pageName: string) => void;
  permission: IPermission | undefined;
  currentPage: IPermissionPage | undefined;
}

const PermissionContext = createContext<PermissionContextProps | undefined>(
  undefined
);

interface PermissionProviderProps {
  children: React.ReactNode;
}

export const PermissionProvider: React.FC<PermissionProviderProps> = ({
  children,
}) => {
  const { customers } = useCustomerContext();
  const [permission, setPermission] = useState<IPermission | undefined>();
  const [currentPage, setCurrentPage] = useState<IPermissionPage>();

  const getPermissions = (pageName: string) => {
    setCurrentPage(
      permission?.permissionPages.find((x) => x.name === pageName)
    );
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      if (customers?.profileId) {
        try {
          const response = await PermissionService.GetById(customers.profileId);
          setPermission(response);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          console.log(err);
        }
      }
    };

    fetchCustomers();
  }, [customers]);

  return (
    <PermissionContext.Provider
      value={{ getPermissions, permission, currentPage }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermissionContext = () => {
  const context = useContext(PermissionContext);
  if (context === undefined) {
    throw new Error(
      "usePermissionContext must be used within a PermissionProvider"
    );
  }
  return context;
};
