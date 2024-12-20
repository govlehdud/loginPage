"use client";

import { InputHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";

const CommentList = ({
  name,
  placeholder,
  errors,
  labelIcon,
  ...rest
}: {
  name: string;
  placeholder: string;
  errors?: string[];
  labelIcon?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>) => {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="relative flex">
        <label
          htmlFor={name}
          className="absolute top-1/2 left-4 -translate-y-1/2 text-white *:size-5"
        >
          {labelIcon}
        </label>
        <input
          id={name}
          className={`w-full h-12 pl-11 border-stone-300 rounded-3xl bg-transparent text-white border placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-offset-2 transition `}
          name={name}
          placeholder={placeholder}
          disabled={pending}
          {...rest}
        />
      </div>
      <div>
        {errors?.map((error) => (
          <p key={error} className="pt-2 pl-1 text-red-400">
            {error}
          </p>
        ))}
      </div>
    </div>
  );
};
export default CommentList;
