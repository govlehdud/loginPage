import db from "@/lib/db";
import getSession from "@/lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getTweet(id: number) {
  const tweet = await db.tweet.findMany({
    where: {
      userId: id,
    },
  });
  return tweet;
}

async function getUser(id: number) {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });
  return user;
}

const logOut = async () => {
  "use server";
  const session = await getSession();
  session.destroy();
  redirect("/");
};

// a문제
export default async function UserPage(props: {
  params: Promise<{ username: string }>;
}) {
  const params = await props.params;
  // 작성한 tweet이 없을경우를 대비해 user를 가져온다.
  const tweet = await getTweet(Number(params.username));
  const user = await getUser(Number(params.username));
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2 bg-gray-500 p-4">
      <h1 className="text-3xl font-bold">마이페이지</h1>
      <div className="flex flex-col gap-2 p-2 w-full pt-20">
        <span>이름 : {user?.username}</span>
        <span>이메일 : {user?.email}</span>
        <span>소개 : {user?.bio}</span>
      </div>

      <div className="flex flex-col gap-2 p-3 w-full">
        <span className="text-xl font-bold">나의 트윗</span>
        {tweet.map((item) => (
          <span
            className="border-2 border-gray-400 p-2 rounded-md w-full"
            key={item.id}
          >
            {item.tweet}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <Link
          href="/"
          className="bg-orange-500 hover:bg-orange-400 text-white flex items-center justify-center rounded-md size-16 transition-colors"
        >
          <span>Home</span>
        </Link>
        <Link
          href={`/users/${params.username}/edit`}
          className="bg-green-300 hover:bg-green-400 text-black flex items-center justify-center rounded-md size-16 transition-colors"
        >
          <span>Edit</span>
        </Link>
        <form action={logOut}>
          <button className="bg-black hover:bg-gray-700 text-white flex items-center justify-center rounded-md size-16 transition-colors">
            Log out
          </button>
        </form>
      </div>
    </div>
  );
}
