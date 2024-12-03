"use client";

import Button from "@/components/(common)/form-button";
import FormInput from "@/components/(common)/form-input";
import { createAccount } from "@/app/(auth)/create-account/action";
import { useActionState } from "react";

export default function LogIn() {
  const [state, dispatch] = useActionState(createAccount, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6 items-center justify-center h-screen *:font-medium w-full">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Create Account with email and password.</h2>
      </div>

      <form action={dispatch} className="flex flex-col gap-3">
        <FormInput
          name="username"
          type="text"
          placeholder="Username"
          required
          errors={state?.fieldErrors?.username}
        />
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors?.email}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.fieldErrors?.password}
        />
        <FormInput
          name="confirm_password"
          type="password"
          placeholder="Password Confirm"
          required
          errors={state?.fieldErrors?.confirm_password}
        />
        <Button text="Create Account" />
      </form>
    </div>
  );
}
