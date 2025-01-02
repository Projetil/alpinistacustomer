import { QuestionaryStatusEnum } from '@/enums/QuestionaryStatusEnum';
import { FC } from 'react';

const statusMapping: { [key in QuestionaryStatusEnum]: string } = {
  [QuestionaryStatusEnum.Sent]: "Enviado",
  [QuestionaryStatusEnum.InProgress]: "Em Andamento",
  [QuestionaryStatusEnum.Finished]: "Finalizado",
};

const statusStyles: { [key in QuestionaryStatusEnum]: string } = {
  [QuestionaryStatusEnum.Sent]: "bg-[#FFF8E1] text-[#FFB300]",
  [QuestionaryStatusEnum.InProgress]: "bg-[#F0F8FF] text-[#1A69C4]",
  [QuestionaryStatusEnum.Finished]: "bg-[#E4F5EA] text-[#028B53]",
};

const StatusBagde: FC<{ status: QuestionaryStatusEnum }> = ({ status }) => {
  return (
    <div
      className={`px-3 py-1 rounded-full w-24 lg:w-32 text-sm text-center font-semibold ${
        statusStyles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {statusMapping[status] || "Desconhecido"}
    </div>
  );
};

export default StatusBagde;
