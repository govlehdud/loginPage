"use server";
import db from "@/lib/db";

export async function getMoreProducts(page: number) {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
      updated_at: true,
      user: true,
      userId: true,
      likes: true,
      comments: true,
    },
    skip: page * 4,
    take: 4,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

// 최대 페이지수
export async function getMaxValue() {
  const maxValue = await db.tweet.count();
  return Math.ceil(maxValue / 4);
}
