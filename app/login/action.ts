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
  SUCCESS_MESSAGE,
} from "@/lib/constants";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { z } from "zod";

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
interface ActionState {
  LOGIN_TOKEN: boolean;
}
export async function createAccount(
  prevState: ActionState,
  formData: FormData
) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const result = schema.safeParse(data);
  console.log("result : ", result.error?.flatten());
  if (!result.success) {
    return {
      LOGIN_TOKEN: false,
      fieldErrors: result.error?.flatten(),
    };
  } else {
    return {
      LOGIN_TOKEN: true,
      success: SUCCESS_MESSAGE,
    };
  }
}
