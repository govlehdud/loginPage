"use server";

import {
  EMAIL_INPUT_REGEX,
  EMAIL_INPUT_REGEX_ERROR,
  PASSWORD_INPUT_REGEX_ERROR,
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
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, PASSWORD_INPUT_REGEX_ERROR)
    .regex(PASSWORD_NORMALIZATION_REGEX, PASSWORD_NORMALIZATION_REGEX_ERROR),
});

export type LoginState = {
  LOGIN_TOKEN?: boolean;
  fieldErrors?: z.typeToFlattenedError<{
    email: string;
    password: string;
  }>;
  LOGIN_FAILED_TOKEN?: {
    info: string[];
  };
} | null;

export async function login(prevState: LoginState, formData: FormData) {
  const data = {
    email: formData.get("email"),
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
      user?.password ?? "xxxx"
    );
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/");
    } else {
      return {
        LOGIN_FAILED_TOKEN: {
          info: ["입력하신 정보는 올바르지 않습니다."],
        },
      };
    }
  }
}
