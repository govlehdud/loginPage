import Link from "next/link";

export default function MyPage({ id }: { id: number }) {
  return (
    <Link href={`/users/${id}`}>
      <div
        className="rounded-lg p-3 hover:opacity-60 active:scale-95 bg-indigo-950 w-20 flex items-center justify-center"
        key={id}
      >
        <h1>Profile</h1>
      </div>
    </Link>
  );
}
