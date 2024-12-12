"use client";

import { useActionState } from "react";
import { updateUserProfile } from "@/lib/editService";
import MyInput from "@/components/(mypage)/myinput";
import MyTextArea from "@/components/(mypage)/mytext-area";
import Button from "@/components/(common)/form-button";
import Link from "next/link";
import { User } from "@prisma/client";

export default function EditProfileForm({ user }: { user: User }) {
  const [state, formAction] = useActionState(updateUserProfile, null);
  console.log(state);
  return (
    <>
      <form action={formAction} className="flex flex-col gap-3">
        <input type="hidden" name="id" value={user.id} />
        <MyInput
          name="username"
          username={user.username}
          errors={state?.fieldErrors?.username}
        />
        <MyInput
          name="email"
          email={user.email || undefined}
          errors={state?.fieldErrors?.email}
        />
        <MyTextArea
          bio={user.bio || undefined}
          errors={state?.fieldErrors?.bio}
        />
        <Button text="Submit" />
      </form>
      <div className="flex gap-2 justify-center">
        <Link
          href="/"
          className="bg-orange-500 hover:bg-orange-400 text-white flex items-center justify-center rounded-2xl w-full h-20 transition-colors"
        >
          <span>Home</span>
        </Link>
        <Link
          href={`/users/${user.id}`}
          className="bg-green-300 hover:bg-green-400 text-black flex items-center justify-center rounded-2xl w-full h-20 transition-colors"
        >
          <span>Profile</span>
        </Link>
      </div>
    </>
  );
}
