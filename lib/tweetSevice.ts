"use server";

import db from "./db";

export const getTweet = async (id: number) => {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return tweet;
};

export const getTweets = async () => {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
      updated_at: true,
      user: true,
      userId: true,
    },
    take: 4,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
};
