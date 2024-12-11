import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
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

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  // 작성한 tweet이 없을경우를 대비해 user를 가져온다.
  const tweet = await getTweet(Number(params.username));
  const user = await getUser(Number(params.username));
  console.log("params: ", params.username);
  console.log("user: ", user);
  console.log("tweet: ", tweet);
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      <h1 className="text-2xl font-bold">마이페이지</h1>
      <span>나의 이름 : {user?.username}</span>
      <span>나의 이메일 : {user?.email}</span>
      <span>나의 소개 : {user?.bio}</span>
      {/* <span>
        나의 업데이트 시간 :{" "}
        {formatToTimeAgo(user?.updated_at.toString() || "")}
      </span> */}
      <span>
        나의 생성 시간 : {formatToTimeAgo(user!.created_at.toString())}
      </span>
      <div className="flex flex-col gap-2 border-2 border-black p-2">
        <span className="text-xl font-bold">나의 트윗</span>
        {tweet.map((item) => (
          <span className="border-2 border-black p-2" key={item.id}>
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
          href={`/tweet/${params.username}/edit`}
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
