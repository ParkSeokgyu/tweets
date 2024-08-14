"use client"

import Button from "@/components/button"
import Input from "@/components/input"

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-5">
      <div className="w-full max-w-md ">
        <div>
          <h1>🔥</h1>
        </div>
        <form action="" className="flex flex-col gap-5 w-full">
          <Input
            name="email"
            type="email"
            placeholder="email"
            required
            errors={[]}
          />
          <Input
            name="username"
            type="text"
            placeholder="Username"
            required
            errors={[]}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            required
            errors={[]}
          />

          <Button text="Login" />
        </form>
      </div>
    </div>
  )
}