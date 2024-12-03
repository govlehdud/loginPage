"use client";

import { useFormStatus } from "react-dom";
interface IButton {
  text: string;
}

export default function Button({ text }: IButton) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="w-full text-white bg-gray-500 rounded-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
    >
      {pending ? "로딩 중!!" : text}
    </button>
  );
}
