"use client";

import CommentList from "@/components/(tweet)/comment-list";
import { responseSchema } from "@/lib/scehma";
import { getSearchResponse } from "@/lib/searchService";
import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useActionState } from "react";

interface ISearchResponse {
  id: number;
  tweet: string;
  created_at: Date;
  user: { username: string };
}

export default function SearchPage() {
  const searchResponse = async (
    prevState: ISearchResponse[],
    formData: FormData
  ) => {
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
    <div className="flex flex-col items-center gap-5 p-5 pt-32 bg-gray-500 h-screen ">
      <Link href="/">
        <HomeIcon className="w-6 h-6 first-line:transition-transform hover:scale-110" />
      </Link>
      <form action={action} className="flex w-full gap-2 ">
        <CommentList
          labelIcon={
            <button type="submit">
              <MagnifyingGlassIcon className="w-6 h-6 transition-transform hover:scale-110 cursor-pointer" />
            </button>
          }
          name="search"
          placeholder="검색"
          type="text"
          required
        />
      </form>
      <div className="flex flex-col gap-4 w-3/4 overflow-y-auto">
        {state!.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-center items-center bg-blue-300 border-2 border-black rounded-xl p-2 text-black h-[150px]"
          >
            <span className="text-lg">{item.tweet}</span>
            <span className="text-sm">작성자 : {item.user.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

//
