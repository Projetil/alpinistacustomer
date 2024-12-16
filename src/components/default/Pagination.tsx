"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "../ui/button";

export interface PaginationProps {
  pageIndex?: number;
  totalCount?: number;
  perPage?: number;
  handlePage?: (page: number) => void;
}

export function Pagination({
  pageIndex = 1,
  perPage = 10,
  totalCount = 0,
  handlePage,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1;

  return (
    <div className="flex font-sans items-center justify-between rounded-lg px-3 py-1 text-[#818086]">
      <div>
        <Button
          onClick={() => pageIndex > 1 && handlePage?.(pageIndex - 1)}
          variant="outline"
          className="bg-transparent border-none hover:bg-[#FEEAE7]"
          disabled={pageIndex === 1}
        >
          <ArrowLeft size={18} className="mr-2" />
          <span className="font-medium">Anterior</span>
        </Button>
      </div>
      <div className="flex items-center gap-6 py-4 lg:gap-8">
        {Array.from({ length: pages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            onClick={() => handlePage?.(page)}
            variant="outline"
            className={`h-8 w-8 border-none p-0 ${
              page === pageIndex ? "bg-[#FEEAE7] font-bold" : ""
            }`}
          >
            <span>{page}</span>
          </Button>
        ))}
      </div>
      <div>
        <Button
          onClick={() => pageIndex < pages && handlePage?.(pageIndex + 1)}
          variant="outline"
          className="bg-transparent border-none hover:bg-[#FEEAE7]"
          disabled={pageIndex === pages}
        >
          <span className="font-medium">Próximo</span>
          <ArrowRight size={18} className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
