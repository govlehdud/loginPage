"use client";

import Button from "@/components/form-button";
import FormInput from "@/components/form-input";
import { useActionState } from "react";
import { useFormState } from "react-dom";
import { createAccount } from "@/app/login/action";
import { HiFire } from "react-icons/hi";
import { FaCheckCircle } from "react-icons/fa";
import {
  PASSWORD_MIN_LENGTH,
  SUCCESS_MESSAGE,
  USERNAME_MIN_LENGTH,
} from "@/lib/constants";

const initialState = {
  LOGIN_TOKEN: false,
  success: "",
};

export default function Home() {
  // const [state, dispatch] = useFormState(createAccount, flag);
  // const [state, dispatch] = useActionState(createAccount, null);
  const [state, dispatch] = useActionState(createAccount, initialState);
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
          <Button text="Log in" />
          {state?.LOGIN_TOKEN && (
            <div className="text-black font-medium p-3 pl-10 bg-green-500 rounded-lg flex relative">
              <span className="absolute left-2 text-xl mt-0.5 ml-1">
                <FaCheckCircle />
              </span>
              <span>{state?.success}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
