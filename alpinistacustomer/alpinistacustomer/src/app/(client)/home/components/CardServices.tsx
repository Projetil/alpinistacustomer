interface CardServicesProps {
    title: string;
    value: number | string;
}

export default function CardServices({ title, value }: CardServicesProps) {
    return (
        <div className="w-full h-full flex flex-col items-center bg-white rounded-lg shadow-md overflow-hidden">
            {/* Título */}
            <div className="w-full bg-[#EEEEF0] py-2 text-center">
                <h1 className="text-sm text-[#818086] font-semibold">{title}</h1>
            </div>
            {/* Valor */}
            <div className="flex-1 flex items-center justify-center p-4">
                <p className="text-lg text-[#050506]">{value}</p>
            </div>
        </div>
    );
}
