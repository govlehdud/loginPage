import { IoIosPerson } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import { IoKey } from "react-icons/io5";
import { InputHTMLAttributes } from "react";

interface IFormInput {
  name: string;
  errors?: string[];
  prop?: string;
}

export default function FormInput({
  prop,
  name,
  errors = [],
  ...props
}: IFormInput & InputHTMLAttributes<HTMLInputElement>) {
  const setIcon = () => {
    if (name === "email") return <IoIosMail />;
    if (name === "username") return <IoIosPerson />;
    if (name === "password") return <IoKey />;
    if (name === "confirm_password") return <IoKey />;
  };
  return (
    <div className="flex flex-col items-center gap-2 w-96 relative">
      <span className="absolute left-2 text-xl m-1 mt-2.5">{setIcon()}</span>
      <input
        name={name}
        className={`bg-white rounded-full w-[400px] h-10 ring-2 border-none focus:ring-4 pl-14 transition ${
          errors.length
            ? "ring-red-500     focus:ring-red-500"
            : "ring-neutral-300 focus:ring-neutral-400 "
        }`}
        {...props}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium w-full text-sm">
          {error}
        </span>
      ))}
    </div>
    // ... existing code ...
  );
}
