"use client"

import Button from "@/components/button"
import { EmailIcon, PasswordIcon, UsernameIcon } from "@/components/icons"
import Input from "@/components/input"

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-auto flex flex-col gap-5">
        <div className="text-center my-3">
          <h1 className="text-5xl">🔥</h1>
        </div>
        <form action="" className="flex flex-col gap-5 w-full">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            icon={<EmailIcon />}
            required
            errors={[]}
          />
          <Input
            name="username"
            type="text"
            placeholder="Username"
            icon={<UsernameIcon />}
            required
            errors={[]}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            icon={<PasswordIcon />}
            required
            errors={[]}
          />

          <Button text="Login" />
        </form>
      </div>
    </div>
  )
}