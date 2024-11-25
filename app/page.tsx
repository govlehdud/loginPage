"use client";

import Button from "@/components/form-button";
import FormInput from "@/components/form-input";
import { useActionState } from "react";
import { createAccount } from "@/app/login/action";
import { HiFire } from "react-icons/hi";
import { FaCheckCircle } from "react-icons/fa";

export default function Home() {
  const [state, action] = useActionState(createAccount, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6 items-center">
      <div>
        <h1>
          <HiFire className="text-[100px]" />
        </h1>
      </div>
      <div className="flex flex-col gap-16 w-screen justify-center items-center text-black">
        <form action={action} className="flex flex-col gap-3">
          <FormInput name="email" type="email" placeholder="Email" required />
          <FormInput
            name="username"
            type="text"
            placeholder="Username"
            required
          />
          <FormInput
            name="password"
            type="password"
            placeholder="Password"
            errors={state?.errors ?? []}
            required
            prop="3"
          />
          <Button text="Log in" />
          {state?.success && (
            <div className="text-black font-medium p-3 pl-10 bg-green-500 rounded-lg flex relative">
              <span className="absolute left-2 text-xl mt-0.5 ml-1">
                <FaCheckCircle />
              </span>
              <span>{state.success}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
