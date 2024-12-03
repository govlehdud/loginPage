import { Prisma } from "@prisma/client";
import React from "react";
// import getSession from "@/lib/session";
import db from "@/lib/db";
import TweetList from "@/components/(tweet)/tweet-list";
async function getTwitter() {
  const twitter = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
      updated_at: true,
      user: true,
      userId: true,
      Like: true,
    },
    // pagenation을 위한 갯수제한
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
  const tweets = await getTwitter();
  return (
    <div className="flex flex-col items-center justify-center gap-5 p-5 pt-52">
      <TweetList initialProducts={tweets} />
    </div>
  );
}
