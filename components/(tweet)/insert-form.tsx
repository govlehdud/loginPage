"use client";
import Input from "@/components/(common)/form-input";
import { useActionState } from "react";
import { createTweet } from "@/app/tweet/action";
import SmallBtn from "./small-btn";

export default function InsertForm() {
  const [state, action] = useActionState(createTweet, null);
  console.log(state);
  return (
    <div>
      <form action={action} className="w-full max-w-xl flex gap-6 text-black">
        <Input
          name="tweet"
          required
          placeholder="글을 남겨주세요"
          type="text"
        />

        <SmallBtn text="작성완료" />
      </form>
    </div>
  );
}
