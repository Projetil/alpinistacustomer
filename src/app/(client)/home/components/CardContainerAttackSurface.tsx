  interface CardContainerAttackSurfaceProps {
    title: string,
    data?: number
  }
  
  export default function CardContainerAttackSurface ({title, data} : CardContainerAttackSurfaceProps) {
    return (
         <div className="bg-white w-full p-6 rounded-lg">
            <div className="flex flex-col gap-4">
                <h1 className="text-[#818086] font-semibold">{title}</h1>
                <p className="text-4xl font-bold text-[#5CA7FF]">{data || 12}</p>
            </div>
            <p className="text-xs text-end cursor-pointer font-semibold">Detalhes</p>
         </div>
    )
  }