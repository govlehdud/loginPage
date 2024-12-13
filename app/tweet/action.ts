"use server";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const tweetSchema = z.object({
  tweet: z.string({
    required_error: "Tweet is required",
  }),
});

export async function createTweet(prevState: any, formData: FormData) {
  const data = formData.get("tweet");
  const result = tweetSchema.safeParse({ tweet: data });
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const tweet = await db.tweet.create({
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
      // revalidateTag(`insert-tweet-${tweet.id}`);
      // redirect(`/tweet/${tweet.id}`);
      redirect("/");
    }
  }
}
