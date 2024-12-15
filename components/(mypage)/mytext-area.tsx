import { InputHTMLAttributes } from "react";

interface IFormInput {
  name: string;
  bio?: string;
  errors?: string[];
}

export default function MyTextArea({
  name,
  bio,
  errors = [],
}: IFormInput & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col items-center gap-2 w-full h-20 justify-center">
      <label htmlFor={name} className="sr-only">
        {name}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={`Enter your ${name}`}
        className="bg-gray-400 text-black resize-none overflow-hidden  rounded-md w-full h-30 ring-2 border-none focus:ring-4 pl-14 transition"
        defaultValue={bio}
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
