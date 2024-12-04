"use client";
import Button from "@/components/(common)/form-button";
import Input from "@/components/(common)/form-input";
import { createTweet } from "./action";
import { useActionState } from "react";

export default function Tweet() {
  const [state, action] = useActionState(createTweet, null);
  return (
    <div className="flex flex-col items-center justify-center pt-52">
      <form action={action} className="flex flex-col gap-5 w-full max-w-xl">
        <h1 className="text-2xl font-bold">tweet 글을 추가해주세요</h1>
        <Input
          name="tweet"
          required
          placeholder="글을 남겨주세요"
          type="text"
        />

        <Button text="작성완료" />
      </form>
    </div>
  );
}
