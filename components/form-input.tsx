import { IoIosPerson } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import { IoKey } from "react-icons/io5";

interface IFormInput {
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  errors?: string[];
  prop?: string;
}

export default function FormInput({
  name,
  type,
  placeholder,
  errors = [],
  required,
  prop,
}: IFormInput) {
  const setIcon = () => {
    if (name === "email") return <IoIosMail />;
    if (name === "username") return <IoIosPerson />;
    if (name === "password") return <IoKey />;
  };
  console.log(prop);
  return (
    <div className="flex flex-col items-center gap-2 w-96">
      <span className="absolute left-[780px] text-xl mt-2.5">{setIcon()}</span>
      <input
        name={name}
        className={`bg-white rounded-full w-full h-10 ring-2 border-none focus:ring-4 pl-12 transition ${
          errors.length && prop === "3"
            ? "ring-red-500     focus:ring-red-500"
            : "ring-neutral-300 focus:ring-neutral-400 "
        }`}
        type={type}
        placeholder={placeholder}
        required={required}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium w-full">
          {error}
        </span>
      ))}
    </div>
  );
}
