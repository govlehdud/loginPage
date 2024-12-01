import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect, notFound } from "next/navigation";
async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) return user;
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  console.log("user : ", user);
  const logOut = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/");
  };
  return (
    <div className="flex flex-col gap-10 py-8 px-6 items-center">
      <h1 className="text-2xl">welcome! {user?.username}</h1>
      <h2 className="text-xl">my profile</h2>
      <p className="text-lg">my email : {user?.email}</p>
      <p className="text-lg">myname : {user?.username}</p>
      <form action={logOut}>
        <button className="bg-black text-white rounded-md p-2">Log out</button>
      </form>
    </div>
  );
}
