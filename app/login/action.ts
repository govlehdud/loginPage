"use server";

import {
  USERNAME_MIN_LENGTH,
  EMAIL_INPUT_REGEX,
  EMAIL_INPUT_REGEX_ERROR,
  PASSWORD_INPUT_REGEX_ERROR,
  USERNAME_INPUT_REGEX_ERROR,
  PASSWORD_NORMALIZATION_REGEX_ERROR,
  PASSWORD_NORMALIZATION_REGEX,
  EMAIL_REGEX,
} from "@/lib/constants";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
const schema = z.object({
  email: z
    .string()
    .email(EMAIL_REGEX)
    .regex(EMAIL_INPUT_REGEX, EMAIL_INPUT_REGEX_ERROR),
  username: z.string().min(USERNAME_MIN_LENGTH, USERNAME_INPUT_REGEX_ERROR),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, PASSWORD_INPUT_REGEX_ERROR)
    .regex(PASSWORD_NORMALIZATION_REGEX, PASSWORD_NORMALIZATION_REGEX_ERROR),
});
export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const result = schema.safeParse(data);
  if (!result.success) {
    return {
      LOGIN_TOKEN: false,
      fieldErrors: result.error?.flatten(),
    };
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(
      result.data.password,
      user!.password ?? "xxxx"
    );
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/profile");
    } else {
      return {
        password: ["Wrong password."],
        email: [],
        username: [],
      };
    }
  }
}
