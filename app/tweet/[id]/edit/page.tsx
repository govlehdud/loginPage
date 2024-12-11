import db from "@/lib/db";
import MyInput from "@/components/(mypage)/myinput";
import Link from "next/link";
import MyTextArea from "@/components/(mypage)/mytext-area";

const getUserData = async (params: { id: string }) => {
  const user = await db.user.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  return user;
};

export default async function EditTweet({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUserData(params);
  console.log(user);
  return (
    <div>
      <h1>Edit Page입니다!</h1>
      <Link
        href="/"
        className="bg-orange-500 hover:bg-orange-400 text-white flex items-center justify-center rounded-md size-16 transition-colors"
      >
        <span>Home</span>
      </Link>
      <Link
        href={`/users/${params.id}`}
        className="bg-green-300 hover:bg-green-400 text-black flex items-center justify-center rounded-md size-16 transition-colors"
      >
        <span>Edit</span>
      </Link>
      <span>{user?.username}</span>
      <MyInput name="username" username={user!.username} />
      <MyInput name="email" email={user!.email || undefined} />
      <MyTextArea bio={user!.bio || undefined} />
    </div>
  );
}
