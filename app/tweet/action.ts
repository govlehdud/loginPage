"use server";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const tweetSchema = z.object({
  tweet: z.string({
    required_error: "Tweet is required",
  }),
});

export type ActionState =
  | z.typeToFlattenedError<{
      tweet: string;
    }>
  | null
  | undefined;

export async function createTweet(prevState: ActionState, formData: FormData) {
  const data = formData.get("tweet");
  const result = tweetSchema.safeParse({ tweet: data });
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      await db.tweet.create({
        data: {
          tweet: result.data.tweet,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });

      redirect("/");
    }
  }
}
