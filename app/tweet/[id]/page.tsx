import { notFound } from "next/navigation";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";

async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          id: true,
        },
      },
    },
  });
  return tweet;
}

async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const tweet = await getTweet(id);
  console.log("tweet: ", tweet);
  const isOwner = await getIsOwner(tweet!.id);
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      <h1 className="text-2xl font-bold">TweetDetail</h1>
      <span>{params.id} 페이지입니다</span>
      <br />
      <span>{tweet?.user?.username}님이 쓴 글입니다</span>
      <span>{tweet?.tweet}</span>
      <span>{formatToTimeAgo(tweet?.created_at.toString()!)}</span>
      {isOwner ? (
        <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold hover:opacity-90 active:scale-95">
          Delete product
        </button>
      ) : null}
      <Link
        href="/"
        className="bg-orange-500 flex items-center justify-center rounded-md size-16   text-white transition-colors hover:bg-orange-400"
      >
        <span>Home</span>
      </Link>
    </div>
  );
}
