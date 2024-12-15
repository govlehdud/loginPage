import { Prisma } from "@prisma/client";
import React from "react";
import db from "@/lib/db";
import TweetList from "@/components/(tweet)/tweet-list";
import Link from "next/link";
import MyPage from "@/components/(mypage)/mypage";
import getSession from "@/lib/session";
import InsertForm from "@/components/(tweet)/insert-form";
async function getTwitter() {
  const twitter = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
      updated_at: true,
      user: true,
      userId: true,
    },
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return twitter;
}

// relation 떄문에 prisma.PromiseReturnType 사용
export type InitialProducts = Prisma.PromiseReturnType<typeof getTwitter>;

export default async function Home() {
  const session = await getSession();
  const tweets = await getTwitter();
  return (
    <div className="flex flex-col items-center justify-center gap-5  bg-slate-500 h-screen w-full">
      <div className="flex justify-between w-full px-5">
        {/* 검색 버튼 */}
        <Link
          href="/search"
          className="flex flex-col items-center justify-center gap-px bg-red-500 w-20 rounded-lg hover:opacity-90 active:scale-95"
        >
          <span>Search</span>
        </Link>
        {/* 마이페이지 버튼 */}
        <MyPage id={session.id!} />
      </div>
      {/* 트윗 리스트 */}
      <TweetList initialProducts={tweets} />
      {/* 트윗 추가 버튼 */}
      <InsertForm />
    </div>
  );
}
