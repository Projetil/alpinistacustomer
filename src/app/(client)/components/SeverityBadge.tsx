import { SeverityTypeEnum } from "@/enums/SeverityTypeEnum";

interface SeverityBadgeProps {
  severity: number;
}

const severityTextMap: Record<SeverityTypeEnum, string> = {
  [SeverityTypeEnum.Critic]: "Crítico",
  [SeverityTypeEnum.High]: "Alto",
  [SeverityTypeEnum.Low]: "Baixo",
  [SeverityTypeEnum.Medium]: "Médio",
  [SeverityTypeEnum.Info]: "Info",
};

const severityStyles: Record<SeverityTypeEnum, string> = {
  [SeverityTypeEnum.Critic]: "bg-[#FF5C63] text-[#FBFBFB]",
  [SeverityTypeEnum.High]: "bg-[#FFDDD8] text-[#661616]",
  [SeverityTypeEnum.Medium]: "bg-[#FFBB5C] text-[#F8F7F9]",
  [SeverityTypeEnum.Low]: "bg-[#5CA7FF] text-[#FBFBFB]",
  [SeverityTypeEnum.Info]: "bg-[#A8D3FF] text-[#0D3C73]",
};

const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity }) => {
  const severityEnumValue = Object.values(SeverityTypeEnum).includes(
    Number(severity)
  )
    ? (Number(severity) as SeverityTypeEnum)
    : null;

  return (
    <div
      className={`px-3 py-1 rounded-full w-24 lg:w-32 text-sm text-center font-semibold ${
        severityEnumValue
          ? severityStyles[severityEnumValue]
          : "bg-gray-100 text-gray-700"
      }`}
    >
      {severityEnumValue ? severityTextMap[severityEnumValue] : "Desconhecido"}
    </div>
  );
};

export default SeverityBadge;
