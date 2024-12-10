"use server";

import { Prisma } from "@prisma/client";
import { revalidateTag } from "next/cache";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { responseSchema } from "./scehma";

export const getComment = async (tweetId: number) => {
  const comments = await db.comment.findMany({
    where: {
      tweetId,
    },
    select: {
      id: true,
      payload: true,
      created_at: true,
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return comments;
};

export const getInitialResponse = async (tweetId: number) => {
  const responses = await db.comment.findMany({
    where: {
      tweetId,
    },
    select: {
      id: true,
      payload: true,
      created_at: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
  return responses;
};
export type InitialResponses = Prisma.PromiseReturnType<
  typeof getInitialResponse
>;

export const addTweetResponse = async (formData: FormData) => {
  const payload = formData.get("payload");
  const tweetId = formData.get("tweetId");
  const result = responseSchema.safeParse(payload);
  if (!result.success) {
    return { error: result.error.flatten(), isSuccess: false };
  }
  const session = await getSession();
  try {
    if (session.id) {
      await db.comment.create({
        data: {
          userId: session.id,
          tweetId: Number(tweetId),
          payload: result.data,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
  revalidateTag(`tweet-responses-${tweetId}`);
};
