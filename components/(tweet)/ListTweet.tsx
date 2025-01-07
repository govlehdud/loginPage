import { Tweet, User } from "@prisma/client/index-browser";
import Link from "next/link";
import { formatToTimeAgo } from "@/lib/utils";
interface ITweet extends Tweet {
  tweet: string;
  id: number;
  created_at: Date;
  user: User;
}

export default function ListTweet({ tweet, id, created_at, user }: ITweet) {
  return (
    <Link href={`/tweet/${id}`}>
      <div
        className="border border-neutral-200 rounded-lg p-4 w-[400px] max-w-[600px] hover:border-neutral-400 
        transition-all hover:shadow-md bg-white"
        key={id}
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-neutral-200" />
            <span className="font-medium">{user.username}</span>
          </div>
          <p className="text-lg text-neutral-800">{tweet}</p>
          <div className="flex justify-end">
            <span className="text-sm text-neutral-500">
              {formatToTimeAgo(created_at.toString())}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
