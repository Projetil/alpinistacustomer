interface SeverityEnvBagProps {
  severity: number;
}

enum SeverityTypeEnum {
  "Low" = 1,
  "Medium" = 2,
  "High" = 3,
  "Critic" = 4,
}

const severityTextMap: Record<SeverityTypeEnum, string> = {
  [SeverityTypeEnum.Low]: "Baixo",
  [SeverityTypeEnum.Medium]: "Médio",
  [SeverityTypeEnum.High]: "Alto",
  [SeverityTypeEnum.Critic]: "Crítico",
};

const severityStyles: Record<SeverityTypeEnum, string> = {
  [SeverityTypeEnum.Low]: "bg-[#5CA7FF] text-[#FBFBFB]",
  [SeverityTypeEnum.Medium]: "bg-[#FFBB5C] text-[#F8F7F9]",
  [SeverityTypeEnum.High]: "bg-[#FFDDD8] text-[#661616]",
  [SeverityTypeEnum.Critic]: "bg-[#FF5C63] text-[#FBFBFB]",
};

const SeverityEnvBag: React.FC<SeverityEnvBagProps> = ({ severity }) => {
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

export default SeverityEnvBag;
