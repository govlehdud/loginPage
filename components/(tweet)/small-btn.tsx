"use client";

import { useFormStatus } from "react-dom";
interface IButton {
  text: string;
}

export default function SmallBtn({ text }: IButton) {
  const { pending } = useFormStatus();
  return (
    <>
      <button
        disabled={pending}
        className="w-[80px] text-white bg-gray-500 rounded-md h-10  transition placeholder:text-neutral-400  active:scale-95"
      >
        {pending ? "로딩 중!!" : text}
      </button>
    </>
  );
}
