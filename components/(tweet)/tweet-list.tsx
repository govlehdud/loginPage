"use client";
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
      <div className="flex flex-col gap-5 w-[600px]">
        {tweets.map((tweet) => (
          <ListTweet key={tweet.id} {...tweet} view={0} />
        ))}
      </div>

      <div className="flex px-52">
        <button
          onClick={preBtn}
          disabled={isLoading}
          className="text-sm font-semibold bg-orange-500 w-fit h-10 mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? "로딩" : "이전"}
        </button>
        <span className="border-2 border-orange-500 rounded-md px-2 my-auto py-1">
          {page + 1}
        </span>
        <button
          onClick={nextBtn}
          disabled={isLoading}
          className="text-sm font-semibold bg-orange-500 w-fit h-10 mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? "로딩" : "다음"}
        </button>
      </div>
    </div>
  );
}
