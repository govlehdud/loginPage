"use client";

import CommentList from "@/components/(tweet)/comment-list";
import db from "@/lib/db";
import { responseSchema } from "@/lib/scehma";
import { getSearchResponse } from "@/lib/searchService";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useActionState, useOptimistic } from "react";

export default function SearchPage() {
  const searchResponse = async (prevState: any, formData: FormData) => {
    const result = responseSchema.safeParse(formData.get("search"));

    if (result.success) {
      const response = await getSearchResponse(formData);
      return response;
    } else {
      return notFound();
    }
  };

  const [state, action] = useActionState(searchResponse, []);
  return (
    <div className="flex flex-col items-center gap-5 p-5 pt-32 bg-gray-500 h-screen">
      <Link
        href="/"
        className="bg-blue-950 flex items-center justify-center rounded-md size-16   text-white transition-colors hover:bg-blue-400"
      >
        <span>Home</span>
      </Link>
      <form action={action} className="flex w-full gap-2 ">
        <CommentList
          labelIcon={<MagnifyingGlassIcon />}
          name="search"
          placeholder="검색"
          type="text"
          required
        />
        <button className="ml-auto min-w-14 bg-stone-600 rounded-xl p-3">
          검색
        </button>
      </form>
      <div className="flex flex-col gap-4 w-3/4">
        {state!.map((item) => (
          <div
            key={item.id}
            className="flex flex-col bg-blue-200 border-2 border-stone-300 rounded-xl p-2"
          >
            <span className="text-lg">{item.tweet}</span>
            <span className="text-sm">@{item.user.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

//
