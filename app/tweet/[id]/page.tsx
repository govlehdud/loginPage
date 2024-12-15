import { notFound } from "next/navigation";
import db from "@/lib/db";
import getSession from "@/lib/session";
import Link from "next/link";
import LikeButton from "@/components/(tweet)/like-button";
import { getLikeStatus } from "@/lib/likeService";
import { unstable_cache as NextCache } from "next/cache";
import CommentForm from "@/components/(tweet)/comment-form";
import { getComment } from "@/lib/commentService";
import DeleteButton from "@/components/(tweet)/delete-button";

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

async function getCachedLikeStatus(tweetId: number) {
  const session = await getSession();
  const cachedLikeStatus = NextCache(getLikeStatus, ["tweet-like-status"], {
    tags: [`like-status-${tweetId}`],
  });
  return cachedLikeStatus(Number(tweetId), Number(session.id!));
}

async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

type PageProps = {
  params: {
    id: string;
  };
};

export default async function TweetDetail({ params }: PageProps) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const tweet = await getTweet(id);
  if (!tweet) {
    return notFound();
  }
  const isOwner = await getIsOwner(tweet.userId);
  const comments = await getComment(id);
  const { isLiked, likeCount } = await getCachedLikeStatus(id);
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3 bg-gray-500 p-4">
      <h1 className="text-4xl font-bold">{tweet?.tweet}</h1>
      <LikeButton tweetId={tweet?.id} isLiked={isLiked} likeCount={likeCount} />
      <div className="flex w-full justify-between">
        <Link
          href="/"
          className="bg-blue-950 flex items-center justify-center rounded-md size-16   text-white transition-colors hover:bg-blue-400"
        >
          <span>Home</span>
        </Link>
        {isOwner ? <DeleteButton id={tweet?.id} /> : null}
      </div>
      <div className="flex gap-2 w-full justify-between">
        <span>작성자 : {tweet?.user?.username}</span>
      </div>
      <CommentForm
        payload={JSON.stringify(comments)}
        tweetId={tweet?.id}
        username={tweet?.user?.username}
      />
    </div>
  );
}
