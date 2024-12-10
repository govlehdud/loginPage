"use client";
import { Tweet, User } from "@prisma/client";
import ListTweet from "./ListTweet";
import { InitialProducts } from "@/app/(home)/page";
import { useState } from "react";
import { getMaxValue, getMoreProducts } from "@/app/(home)/action";

interface TweetWithUser {
  initialProducts: InitialProducts;
}

export default function TweetList({ initialProducts }: TweetWithUser) {
  const [tweets, setTweets] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [maxValue, setMaxValue] = useState(0);
  const [page, setPage] = useState(0);
  //   setMaxValue(await getMaxValue());
  const nextBtn = async () => {
    setMaxValue(await getMaxValue());
    if (maxValue > page + 1) {
      setIsLoading(true);
      const newTweets = await getMoreProducts(page + 1);

      setPage((prev) => prev + 1);
      setTweets(newTweets);
      setIsLoading(false);
    }
  };
  const preBtn = async () => {
    if (page > 0) {
      // 페이지가 0보다 클 때만 실행
      setIsLoading(true);
      const newTweets = await getMoreProducts(page - 1);
      setPage((prev) => prev - 1);

      setTweets(newTweets);
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5">
        <h1>Sweet Home Twitter!!!</h1>
        <span>트위터 공간입니다!</span>
        {tweets.map((tweet) => (
          <ListTweet key={tweet.id} {...tweet} view={0} />
        ))}
      </div>
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={preBtn}
          disabled={isLoading}
          className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? "로딩중..." : "이전"}
        </button>
        <span className="border-2 border-orange-500 rounded-md px-2">
          {page + 1}
        </span>
        <button
          onClick={nextBtn}
          disabled={isLoading}
          className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? "로딩중..." : "다음"}
        </button>
      </div>
    </div>
  );
}
