"use client"

import Button from "@/components/button"
import Input from "@/components/input"

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-auto flex flex-col gap-5">
        <div className="text-center my-3">
          <h1 className="text-3xl">🔥</h1>
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