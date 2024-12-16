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
        className="border-2 border-neutral-200 rounded-lg p-6 w-[400px] h-[100px] flex flex-col justify-center items-center"
        key={id}
      >
        <div className="p-3 flex flex-col gap-2 text-sm">
          <h1 className="text-2xl text-left font-sans">{tweet}</h1>
        </div>
        <div className="flex justify-between w-full">
          <div />
          <div className="flex flex-col gap-2">
            <span className="text-black/50 text-right">
              {user.username} / {formatToTimeAgo(created_at.toString())}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
