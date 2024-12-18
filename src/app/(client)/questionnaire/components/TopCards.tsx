interface TopCardsProps {
  title: string;
  value: number | string;
}
export default function TopCards({ title, value }: TopCardsProps) {
  return (
    <div className="min-w-64 w-full h-36 flex flex-col items-start gap-5 p-3 bg-white rounded-lg shadow-sm justify-start">
      <h1 className="text-lg text-[#818086] font-semibold">{title}</h1>
      <p className="text-5xl text-[#5CA7FF] font-bold">{value}</p>
    </div>
  );
}
