import { UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function MyPage({ id }: { id: number }) {
  return (
    <Link href={`/users/${id}`}>
      <div
        className="rounded-lg p-3 hover:opacity-60 active:scale-95 w-20 flex items-center justify-center"
        key={id}
      >
        <UserIcon className="size-7" />
      </div>
    </Link>
  );
}
