"use server";
import { redirect } from "next/navigation";
import db, { createUser } from "./db";
import { z } from "zod";

export const getUserData = async (id: number) => {
  const user = await db.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
};

async function updateUser(data: any) {
  const updateUser = await db.user.update({
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

export async function updateUserProfile(prevState: any, formData: any) {
  const data = {
    id: Number(formData.get("id")),
    username: formData.get("username"),
    email: formData.get("email"),
    bio: formData.get("bio") || undefined,
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

export async function deleteAction(prevState: any, formData: any) {
  const id = Number(formData.get("id"));
  await db.tweet.delete({
    where: { id },
  });
  redirect("/");
}
