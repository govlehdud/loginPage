import { Prisma } from "@prisma/client";
import React from "react";
import TweetList from "@/components/(tweet)/tweet-list";
import Link from "next/link";
import MyPage from "@/components/(mypage)/mypage";
import getSession from "@/lib/session";
import InsertForm from "@/components/(tweet)/insert-form";
import { getTweets } from "@/lib/tweetSevice";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

// relation 떄문에 prisma.PromiseReturnType 사용
export type InitialProducts = Prisma.PromiseReturnType<typeof getTweets>;

export default async function Home() {
  const session = await getSession();
  const tweets = await getTweets();
  return (
    <div className="flex flex-col items-center justify-center gap-5  bg-slate-500 h-screen w-full">
      <div className="flex justify-between w-full px-1">
        <Link
          href="/search"
          className="flex flex-col items-center justify-center gap-px  w-20 rounded-lg hover:opacity-80 active:scale-95"
        >
          <MagnifyingGlassIcon className="size-7" />
        </Link>
        <MyPage id={session.id!} />
      </div>
      <TweetList initialProducts={tweets} />
      <InsertForm />
    </div>
  );
}
