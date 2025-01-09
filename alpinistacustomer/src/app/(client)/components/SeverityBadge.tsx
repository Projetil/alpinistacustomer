// components/SeverityBadge.tsx
import { FC } from 'react';

interface SeverityBadgeProps {
  severity: string;
}

const severityStyles: Record<string, string> = {
  'Crítico': 'bg-[#FF5C63] text-[#FBFBFB]',
  'Alto': 'bg-[#FFDDD8] text-[#661616]',
  'Médio': 'bg-[#FFBB5C] text-[#F8F7F9]',
  'Baixo': 'bg-[#5CA7FF] text-[#FBFBFB]',
  'Info': 'bg-[#A8D3FF] text-[#0D3C73]',
};

const SeverityBadge: FC<SeverityBadgeProps> = ({ severity }) => {
  return (
    <div
      className={`px-3 py-1 rounded-full w-24 lg:w-32 text-sm text-center font-semibold ${severityStyles[severity] || 'bg-gray-100 text-gray-700'}`}
    >
      {severity}
    </div>
  );
};

export default SeverityBadge;
