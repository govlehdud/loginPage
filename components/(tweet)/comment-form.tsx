"use client";

import CommentList from "./comment-list";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { useActionState, useOptimistic } from "react";
import { addTweetResponse } from "@/lib/commentService";
import { responseSchema } from "@/lib/scehma";

interface IComment {
  payload: any;
  tweetId: number;
  username: string;
}

export default function CommentForm({ payload, tweetId, username }: IComment) {
  // 최적화 상태 관리
  const [responses, optimisticResponse] = useOptimistic(
    payload,
    (previousResponses, responseOptimisticValue: string) => {
      return [
        ...previousResponses,
        {
          id: new Date().getDate(),
          text: responseOptimisticValue,
          created_at: new Date(),
          tweetId,
          user: { username, id: Infinity },
        },
      ];
    }
  );

  // 댓글 추가 함수
  const handleUploadResponse = (_: unknown, formData: FormData) => {
    const result = responseSchema.safeParse(formData.get("payload"));
    if (result.success) {
      optimisticResponse(result.data);
      addTweetResponse(formData);
    } else {
      return result.error.flatten();
    }
  };
  // 댓글 추가 함수 호출
  const [state, action] = useActionState(handleUploadResponse, null);
  return (
    <div className="w-full flex flex-col gap-3">
      <form action={action} className="flex w-full gap-2 ">
        <CommentList
          labelIcon={<ChatBubbleBottomCenterTextIcon />}
          name="payload"
          type="text"
          required
          placeholder="Write a response."
          errors={state?.fieldErrors[0]}
        />
        <input
          className="hidden"
          type="hidden"
          name="tweetId"
          value={tweetId}
        />
        <button className="ml-auto min-w-14 bg-stone-600 rounded-xl p-3">
          추가
        </button>
      </form>

      {responses.map((response: any) => (
        <div key={response.id} className="*:text-md flex items-center my-3">
          <span className="font-semibold w-3/12">{response.user.username}</span>
          <span>
            {">> "} {response.payload}
          </span>
        </div>
      ))}
    </div>
  );
}
