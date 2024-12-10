"use server";

import db from "@/lib/db";

export const getSearchResponse = async (formData: FormData) => {
  const search = formData.get("search");
  console.log("search_value: ", search);
  // sql문 작성해서 tweet 테이블 값 리턴해주기
  const result = await db.tweet.findMany({
    where: {
      tweet: {
        contains: search?.toString(),
      },
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
  return result;
};
