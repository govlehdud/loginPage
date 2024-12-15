import { notFound } from "next/navigation";
import { getUserData } from "@/lib/editService";
import EditProfileForm from "@/components/(mypage)/edit-profile";

export default async function EditTweet(
  props: {
    params: Promise<{ username: string }>;
  }
) {
  const params = await props.params;
  const id = params.username;
  if (isNaN(Number(id))) {
    return notFound();
  }
  const user = await getUserData(Number(id));
  if (!user) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-3 bg-gray-500 p-10 h-screen justify-center items-center">
      <h1 className="text-red-100 text-2xl font-bold">Edit Page</h1>
      <EditProfileForm user={user} />
    </div>
  );
}
