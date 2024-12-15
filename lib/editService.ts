"use server";
import { redirect } from "next/navigation";
import db from "./db";
import { z } from "zod";

export const getUserData = async (id: number) => {
  const user = await db.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
};

interface IUpdateForm {
  id: number;
  username: string;
  email: string;
  bio: string;
}

export type UpdateUserProfileState = {
  fieldErrors?: {
    username?: string[];
    email?: string[];
    bio?: string[];
  } | null;
} | null;

async function updateUser(data: IUpdateForm) {
  await db.user.update({
    where: { id: Number(data.id) },
    data: data,
  });
}

const UserSchema = z.object({
  id: z.number(),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  bio: z.string().optional(),
});

export async function updateUserProfile(
  prevState: UpdateUserProfileState,
  formData: FormData
) {
  const data = {
    id: Number(formData.get("id")),
    username: String(formData.get("username")),
    email: String(formData.get("email")),
    bio: String(formData.get("bio") || ""),
  };
  const result = UserSchema.safeParse(data);

  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    // 유저 정보 변경
    await updateUser(data);
    redirect(`/users/${data.id}`);
  }
}

export type DeleteActionState = {
  fieldErrors?: {
    username?: string[];
  } | null;
} | null | void;

export async function deleteAction(
  prevState: DeleteActionState,
  formData: FormData
) {
  const id = Number(formData.get("id"));
  await db.tweet.delete({
    where: { id },
  });
  redirect("/");
}
