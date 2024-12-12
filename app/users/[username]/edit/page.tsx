import { notFound } from "next/navigation";
import { getUserData } from "@/lib/editService";
import EditProfileForm from "@/components/(mypage)/edit-profile";

export default async function EditTweet({
  params,
}: {
  params: { username: string };
}) {
  const id = params.username;
  if (isNaN(Number(id))) {
    return notFound();
  }
  const user = await getUserData(Number(id));
  if (!user) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-3">
      <h1>Edit Page입니다!</h1>
      <EditProfileForm user={user} />
    </div>
  );
}
