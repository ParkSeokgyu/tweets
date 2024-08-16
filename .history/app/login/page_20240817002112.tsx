"use client"

import Button from "@/components/button"
import Input from "@/components/input"
import { EmailIcon, PasswordIcon, SuccessfullLoginIcon, UsernameIcon } from "@/components/icons"
import { useFormState } from "react-dom";
import { login } from "./actions";

export default function Login() {

  const [state, action] = useFormState(login, null); //

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-auto flex flex-col gap-5">
        <div className="text-center my-3">
          <h1 className="text-5xl">🔥</h1>
        </div>
        <form action={action} className="flex flex-col gap-5 w-full">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            icon={<EmailIcon />}
            required
            errors={state?.fieldErrors.email} 
          />
          <Input
            name="username"
            type="text"
            placeholder="Username"
            icon={<UsernameIcon />}
            required
            errors={state?.fieldErrors.username} 
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            icon={<PasswordIcon />}
            required
            errors={state?.fieldErrors.password} 
          />

          <Button text="Login" />
        </form>

        {/* 로그인 성공 메시지 추가 */}
        {state?.success && (
          <div className="p-4 bg-green-500 rounded-2xl relative">
            <div className="absolute left-4">
              <SuccessfullLoginIcon />
            </div>
            <div className="font-bold pl-10">
              Welcome back!
            </div>
          </div>
        )}

      </div>
    </div>
  )
}