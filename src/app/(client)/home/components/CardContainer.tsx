import { cn } from "@/lib/utils";

interface CardContainerProps {
    title: string,
    data?: number
    className?: string;
  }
  
  export default function CardContainer ({title, data, className} : CardContainerProps) {
    return (
         <div className={cn("bg-white w-full p-6 rounded-lg", className)}>
            <div className="flex flex-col gap-4">
                <h1 className="text-[#818086] font-semibold">{title}</h1>
                <p className="text-4xl font-bold text-[#5CA7FF]">{data || 12}</p>
            </div>
         </div>
    )
  }