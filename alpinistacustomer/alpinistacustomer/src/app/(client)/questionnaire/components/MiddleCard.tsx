// components/CardButton.tsx
import { FC, ReactNode } from "react";

interface MiddleCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
}

const MiddleCard: FC<MiddleCardProps> = ({ icon, title, subtitle }) => {
  return (
    <div className="flex min-w-[305px] items-center p-4 bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-200 w-full h-24">
      <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-md text-blue-600">
        {icon}
      </div>
      <div className="ml-4">
        <h2 className="text-blue-800 font-semibold">{title}</h2>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>
    </div>
  );
};

export default MiddleCard;
