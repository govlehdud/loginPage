"use client";
import Link from "next/link";

import Button from "@/components/(common)/form-button";
import FormInput from "@/components/(common)/form-input";
import { useActionState } from "react";
import { login } from "@/app/(auth)/login/action";
import { HiFire } from "react-icons/hi";
import { FaCheckCircle } from "react-icons/fa";
import { PASSWORD_MIN_LENGTH, USERNAME_MIN_LENGTH } from "@/lib/constants";

export default function Home() {
  const [state, dispatch] = useActionState(login, null);
  console.log("state : ", state);
  return (
    <div className="flex flex-col gap-10 py-8 px-6 items-center">
      <div>
        <h1>
          <HiFire className="text-[100px]" />
        </h1>
      </div>
      <div className="flex flex-col gap-16 w-screen justify-center items-center text-black">
        <form action={dispatch} className="flex flex-col gap-3">
          <FormInput
            name="email"
            type="email"
            placeholder="Email"
            required
            errors={state?.fieldErrors?.fieldErrors?.email}
          />
          <FormInput
            name="username"
            type="text"
            placeholder="Username"
            required
            minLength={USERNAME_MIN_LENGTH}
            errors={state?.fieldErrors?.fieldErrors?.username}
          />
          <FormInput
            name="password"
            type="password"
            placeholder="Password"
            errors={state?.fieldErrors?.fieldErrors?.password}
            required
            minLength={PASSWORD_MIN_LENGTH}
            prop="3"
          />

          <span className="text-red-500">
            {state?.LOGIN_FAILED_TOKEN?.info}
          </span>

          <Button text="Log in" />
          {state?.LOGIN_TOKEN && (
            <div className="text-black font-medium p-3 pl-10 bg-green-500 rounded-lg flex relative">
              <span className="absolute left-2 text-xl mt-0.5 ml-1">
                <FaCheckCircle />
              </span>
            </div>
          )}
          <Link
            href="/create-account"
            className="w-full flex justify-center items-center text-white bg-indigo-500 rounded-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
          >
            create-account
          </Link>
        </form>
      </div>
    </div>
  );
}
