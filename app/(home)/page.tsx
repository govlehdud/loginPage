import { Prisma } from "@prisma/client";
import React from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import db from "@/lib/db";
import TweetList from "@/components/(tweet)/tweet-list";
import Link from "next/link";
import MyPage from "@/components/(mypage)/mypage";
import getSession from "@/lib/session";
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
    <div className="flex flex-col items-center justify-center gap-5 p-5 pt-52">
      <Link
        href="/tweet"
        className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed top-24 text-white transition-colors hover:bg-orange-400"
      >
        <PlusIcon className="size-10" />
      </Link>
      <TweetList initialProducts={tweets} />
      <MyPage id={session.id!} />
    </div>
  );
}
