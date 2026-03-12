"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function SignUp() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex flex-col justify-between bg-black text-white p-10">
        
        <div className="text-xl font-bold">
          SaaS App
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold">
            Create your account
          </h1>

          <p className="text-gray-400">
            Build modern SaaS applications faster with Next.js and Tailwind.
          </p>
        </div>

        <div className="text-sm text-gray-500">
          © 2026 SaaS
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center p-6">

        <div className="w-full max-w-md space-y-6">

          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold">
              Sign Up
            </h2>
            <p className="text-gray-500">
              Create your account to continue
            </p>
          </div>

          <form className="space-y-4">

            <div className="grid grid-cols-2 gap-4">

              <div className="space-y-2">
                <Label>First name</Label>
                <Input placeholder="John" />
              </div>

              <div className="space-y-2">
                <Label>Last name</Label>
                <Input placeholder="Doe" />
              </div>

            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="email@example.com" />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" placeholder="••••••••" />
            </div>

            <Button className="w-full">
              Create account
            </Button>

          </form>

          <div className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-black font-medium underline">
              Login
            </Link>
          </div>

        </div>

      </div>

    </div>
  )
}