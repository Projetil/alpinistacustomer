import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HiOutlinePencil } from "react-icons/hi2";
import { FaRegTrashAlt } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";

const PopoverEnvironment = ({
  environmentId,
  handleDelete,
}: {
  environmentId: number;
  handleDelete: (id: number) => void;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild className="w-full md:w-auto">
        <SlOptionsVertical className="cursor-pointer text-[#1A69C4]" />
      </PopoverTrigger>
      <PopoverContent className="w-52 right-4 top-3 relative flex flex-col gap-2 justifty-start items-start">
        <a
          className="p-2 hover:bg-[#E0F3FF] hover:text-[#1A69C4] hover:font-semibold text-[#1E1F24] flex gap-2 items-center rounded-lg w-full"
          href={`/environment/new-environment?id=${environmentId}`}
        >
          {" "}
          <HiOutlinePencil size={25} /> Editar
        </a>
        <button
          onClick={() => handleDelete(environmentId)}
          className="p-2 hover:bg-[#E0F3FF] hover:text-[#1A69C4] hover:font-semibold text-[#1E1F24] flex gap-2 items-center rounded-lg w-full"
        >
          <FaRegTrashAlt size={25} /> Excluir
        </button>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverEnvironment;
