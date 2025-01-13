interface CardHomeProps {
    title: string,
    value: number
}
export default function CardHome( { title, value } : CardHomeProps  ) {
    return (
        <div className="w-full h-full flex flex-col items-start gap-5 p-3 bg-white rounded-lg shadow-md">
            <h1 className="text-lg text-[#818086] font-semibold">{title}</h1>
            <p className="text-5xl text-[#5CA7FF] font-bold">{value}</p>
        </div>
    )
}