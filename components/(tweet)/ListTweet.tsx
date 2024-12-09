import { Tweet, User } from "@prisma/client/index-browser";
import Link from "next/link";
import { formatToTimeAgo } from "@/lib/utils";
interface ITweet extends Tweet {
  tweet: string;
  id: number;
  created_at: Date;
  updated_at: Date;
  userId: number;
  user: User;
  view: number;
}

export default function ListTweet({
  tweet,
  id,
  created_at,
  user,
  view,
  updated_at,
  userId,
}: ITweet) {
  return (
    <Link href={`/tweet/${id}`}>
      <div className="border-2 border-neutral-200 rounded-lg p-3" key={id}>
        <span>
          {user.username} /{formatToTimeAgo(created_at.toString())}
        </span>
        <h1>{tweet}</h1>
      </div>
    </Link>
  );
}
