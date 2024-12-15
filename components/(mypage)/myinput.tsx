import { IoIosPerson } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import { IoKey } from "react-icons/io5";
import { InputHTMLAttributes } from "react";

interface IFormInput {
  name?: string;
  errors?: string[];
  username?: string;
  email?: string;
}

export default function MyInput({
  name,
  errors = [],
  username,
  email,
}: IFormInput & InputHTMLAttributes<HTMLInputElement>) {
  const setIcon = () => {
    if (name === "email") return <IoIosMail />;
    if (name === "username") return <IoIosPerson />;
    if (name === "password") return <IoKey />;
    if (name === "confirm_password") return <IoKey />;
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full relative">
      <label htmlFor={name} className="sr-only">
        {name}
      </label>
      <span className="absolute left-2 text-xl m-1 mt-2.5">{setIcon()}</span>
      <input
        id={name}
        name={name}
        placeholder={`Enter your ${name}`}
        className={`bg-gray-400 text-black rounded-md w-full h-10 ring-2 border-none focus:ring-4 pl-14 transition ${
          errors.length
            ? "ring-red-500     focus:ring-red-500"
            : "ring-neutral-300 focus:ring-neutral-400 "
        }`}
        defaultValue={username || email}
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
