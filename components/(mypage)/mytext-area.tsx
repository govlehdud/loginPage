import { InputHTMLAttributes } from "react";

interface IFormInput {
  bio?: string;
  errors?: string[];
}

export default function MyTextArea({
  bio,
  errors = [],
}: IFormInput & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col items-center gap-2 w-96 relative">
      <textarea
        // className={`bg-white rounded-full w-[400px] h-10 ring-2 border-none focus:ring-4 pl-14 transition ${
        //   errors.length
        //     ? "ring-red-500     focus:ring-red-500"
        //     : "ring-neutral-300 focus:ring-neutral-400 "
        // }`}
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
