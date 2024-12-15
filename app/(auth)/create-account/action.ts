"use server";
import bcrypt from "bcrypt";
import {
  PASSWORD_MIN_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_INPUT_REGEX_ERROR,
  EMAIL_INPUT_REGEX,
  EMAIL_REGEX,
  EMAIL_INPUT_REGEX_ERROR,
  PASSWORD_NORMALIZATION_REGEX_ERROR,
  PASSWORD_INPUT_REGEX_ERROR,
  PASSWORD_NORMALIZATION_REGEX,
} from "@/lib/constants";
import db, { createUser } from "@/lib/db";
import { z } from "zod";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string!",
        required_error: "Where is my username???",
      })
      .toLowerCase()
      .min(USERNAME_MIN_LENGTH, USERNAME_INPUT_REGEX_ERROR)
      .trim(),
    email: z
      .string()
      .email(EMAIL_REGEX)
      .regex(EMAIL_INPUT_REGEX, EMAIL_INPUT_REGEX_ERROR)
      .toLowerCase(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, PASSWORD_INPUT_REGEX_ERROR)
      .regex(PASSWORD_NORMALIZATION_REGEX, PASSWORD_NORMALIZATION_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      // 유저 중복 확인
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already taken",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    // 이메일 중복 확인
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This email is already taken",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPasswords, {
    // 비밀번호 확인
    message: "Both passwords should be the same!",
    path: ["confirm_password"],
  });

export type CreateAccountState = {
  fieldErrors?: {
    username?: string[];
    email?: string[];
    password?: string[];
    confirm_password?: string[];
  } | null;
} | null;

export async function createAccount(
  prevState: CreateAccountState,
  formData: FormData
) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = await formSchema.spa(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    // password 암호화
    const HPassword = await bcrypt.hash(result.data.password, 12);
    // 유저 정보 저장
    const user = await createUser({ ...result.data, password: HPassword });
    const session = await getSession();
    session.id = user.data.id;
    await session.save();
    redirect("/");
  }
}
