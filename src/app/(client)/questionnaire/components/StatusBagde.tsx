import { FC } from 'react';

interface StatusBagdeProps {
  status: string;
}

const statusStyles: Record<string, string> = {
  'Finalizado': 'bg-[#E4F5EA] text-[#028B53]',
  'Em andamento': 'bg-[#F0F8FF] text-[#1A69C4]',
  'Médio': 'bg-[#FEEAE7] text-[#D31926]'
};

const StatusBagde: FC<StatusBagdeProps> = ({ status }) => {
  return (
    <div
      className={`px-3 py-1 rounded-full w-24 lg:w-32 text-sm text-center font-semibold ${statusStyles[status] || 'bg-gray-100 text-gray-700'}`}
    >
      {status}
    </div>
  );
};

export default StatusBagde;
