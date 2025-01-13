import { QuestionaryStatusEnum } from '@/enums/QuestionaryStatusEnum';
import { FC } from 'react';

const statusMapping: { [key in QuestionaryStatusEnum]: string } = {
  [QuestionaryStatusEnum.Enviado]: "Enviado",
  [QuestionaryStatusEnum['Em Progresso']]: "Em Andamento",
  [QuestionaryStatusEnum.Finalizado]: "Finalizado",
};

const statusStyles: { [key in QuestionaryStatusEnum]: string } = {
  [QuestionaryStatusEnum.Enviado]: "bg-[#FFF8E1] text-[#FFB300]",
  [QuestionaryStatusEnum['Em Progresso']]: "bg-[#F0F8FF] text-[#1A69C4]",
  [QuestionaryStatusEnum.Finalizado]: "bg-[#E4F5EA] text-[#028B53]",
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
