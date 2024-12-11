import Link from "next/link";

export default function MyPage({ id }: { id: number }) {
  return (
    <Link href={`/users/${id}`}>
      <div className="border-2 border-neutral-200 rounded-lg p-3" key={id}>
        <h1>마이페이지</h1>
      </div>
    </Link>
  );
}
