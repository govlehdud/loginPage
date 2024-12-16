"use client";
import { useActionState } from "react";
import { createTweet } from "@/app/tweet/action";
import SmallBtn from "./small-btn";

export default function InsertForm() {
  const [state, action] = useActionState(createTweet, null);
  console.log(state);
  return (
    <div className="relative w-full max-w-xl px-14">
      <form action={action} className="flex gap-6 text-black">
        <input
          name="tweet"
          className="bg-white rounded-md w-[900px] h-10 border-2 border-black transition text-black"
          required
          placeholder="글을 남겨주세요"
          type="text"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <SmallBtn text="Done" />
        </div>
      </form>
    </div>
  );
}
