"use client";
import { useActionState } from "react";
import { createTweet } from "@/app/tweet/action";
import SmallBtn from "./small-btn";

export default function InsertForm() {
  const [state, action] = useActionState(createTweet, null);
  console.log(state);
  return (
    <div className="relative w-full max-w-xl px-14">
      <form action={action} className="relative flex gap-6 text-black">
        <input
          name="tweet"
          className="bg-white rounded-md w-[900px] h-10 border-2 border-black transition text-black pr-20"
          required
          placeholder="글을 남겨주세요"
          type="text"
        />
        <div className="absolute right-0 top-10 ">
          <SmallBtn text="등록" />
        </div>
      </form>
    </div>
  );
}
