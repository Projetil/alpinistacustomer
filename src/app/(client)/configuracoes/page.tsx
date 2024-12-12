import { IoMdSettings } from "react-icons/io";
import UserForm from "./components/UserForm";

export default function ConfigPage() {
  return (
    <main className="text-[#636267] w-full flex flex-col gap-1 items-start ">
      <section className="hidden md:flex flex-col p-6 md:gap-10 items-start md:mb-3">
        <div className="flex gap-4 items-center text-[#050506]">
          <IoMdSettings color="#3088EE" size={24} />
          <h2 className="font-semibold md:text-3xl">Configurações</h2>
        </div>
      </section>
      <UserForm />
    </main>
  );
}
