import { Prisma } from "@prisma/client";
import React from "react";
import TweetList from "@/components/(tweet)/tweet-list";
import Link from "next/link";
import MyPage from "@/components/(mypage)/mypage";
import getSession from "@/lib/session";
import InsertForm from "@/components/(tweet)/insert-form";
import { getTweets } from "@/lib/tweetSevice";

// relation 떄문에 prisma.PromiseReturnType 사용
export type InitialProducts = Prisma.PromiseReturnType<typeof getTweets>;

export default async function Home() {
  const session = await getSession();
  const tweets = await getTweets();
  return (
    <div className="flex flex-col items-center justify-center gap-5  bg-slate-500 h-[919px] w-[800px]">
      <h1>오... 완전 명언같았어!</h1>
      <div className="flex items-center justify-center gap-2">
        <Link
          href="/search"
          className="flex flex-col items-center justify-center gap-px bg-red-500 w-28 rounded-lg hover:opacity-90 active:scale-95"
        >
          <span>검색</span>
        </Link>
        <MyPage id={session.id!} />
        <Link
          href="/tweet"
          className="flex flex-col items-center justify-center gap-px bg-red-500 w-28 rounded-lg hover:opacity-90 active:scale-95"
        >
          {/* <PlusIcon className="size-10" /> */}
          <span>추가</span>
        </Link>
      </div>
      <InsertForm />
      <TweetList initialProducts={tweets} />
    </div>
  );
}
