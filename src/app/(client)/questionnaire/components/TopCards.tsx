interface TopCardsProps {
    title: string,
    value: number
}
export default function TopCards( { title, value } : TopCardsProps  ) {
    return (
        <div className="min-w-64 h-36 flex flex-col items-start gap-5 p-3 bg-white rounded-lg shadow-md justify-start">
            <h1 className="text-lg text-[#818086] font-semibold">{title}</h1>
            <p className="text-5xl text-[#5CA7FF] font-bold">{value}</p>
        </div>
    )
}