import Link from "next/link"




export default function SignUpPage() {
  return (
    
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left side */}
        <section className="hidden lg:flex flex-col justify-between border-r border-white/10 bg-zinc-900 p-10">
          <div>
            <Link href="/" className="text-xl font-semibold tracking-tight">
              YourBrand
            </Link>
          </div>

          <div className="max-w-xl">
            <span className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
              New generation platform
            </span>

            <h1 className="mt-4 text-4xl font-semibold leading-tight">
              Create your account and start building faster
            </h1>

            <p className="mt-4 text-base leading-7 text-zinc-400">
              Join thousands of users using our platform to launch products,
              manage workflows, and scale their business with confidence.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-sm font-medium text-white">Fast setup</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Get started in minutes with a clean onboarding experience.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-sm font-medium text-white">Secure by default</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Your account and data are protected with modern best practices.
                </p>
              </div>
            </div>
          </div>

          <div className="text-sm text-zinc-500">
            © 2026 YourBrand. All rights reserved.
          </div>
        </section>

        {/* Right side */}
        <section className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur md:p-8">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-semibold">Create an account</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Enter your details below to get started
              </p>
            </div>

            <div className="grid gap-3">
              <button className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white text-sm font-medium text-black transition hover:opacity-90">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="h-4 w-4"
                >
                  <path
                    fill="#FFC107"
                    d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 44c5.2 0 10-2 13.5-5.3l-6.2-5.2C29.3 35.1 26.8 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.5-6.1 7l6.2 5.2C39.2 36.7 44 31 44 24c0-1.3-.1-2.3-.4-3.5z"
                  />
                </svg>
                Continue with Google
              </button>

              <button className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-zinc-900 text-sm font-medium text-white transition hover:bg-zinc-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                >
                  <path d="M16.365 1.43c0 1.14-.466 2.25-1.22 3.04-.8.84-2.1 1.49-3.24 1.4-.14-1.11.4-2.29 1.14-3.05.81-.84 2.2-1.45 3.32-1.39zM20.54 17.09c-.6 1.38-.88 1.99-1.66 3.22-1.08 1.67-2.61 3.76-4.5 3.78-1.68.02-2.11-1.09-4.39-1.08-2.28.01-2.75 1.1-4.43 1.08-1.89-.02-3.34-1.91-4.42-3.58C-1.84 15.9-.8 8.62 2.3 4.66c1.52-1.95 3.92-3.1 6.18-3.1 2.31 0 3.76 1.27 5.67 1.27 1.85 0 2.98-1.27 5.65-1.27 2.02 0 4.16 1.1 5.67 2.99-4.99 2.73-4.18 9.89.07 12.54z" />
                </svg>
                Continue with Apple
              </button>
            </div>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                or
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-zinc-300">
                    First name
                  </label>
                  <input
                    type="text"
                    placeholder="Moulaye"
                    className="h-11 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 text-sm outline-none ring-0 placeholder:text-zinc-500 focus:border-white/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-300">
                    Last name
                  </label>
                  <input
                    type="text"
                    placeholder="Ely"
                    className="h-11 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 text-sm outline-none ring-0 placeholder:text-zinc-500 focus:border-white/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="h-11 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 text-sm outline-none ring-0 placeholder:text-zinc-500 focus:border-white/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="h-11 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 text-sm outline-none ring-0 placeholder:text-zinc-500 focus:border-white/20"
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="terms"
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-white/10 bg-zinc-900"
                />
                <label htmlFor="terms" className="text-sm leading-6 text-zinc-400">
                  I agree to the{" "}
                  <Link href="#" className="text-white hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-white hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              <button
                type="submit"
                className="h-11 w-full rounded-xl bg-white text-sm font-medium text-black transition hover:opacity-90"
              >
                Create account
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-400">
              Already have an account?{" "}
              <Link href="/login" className="text-white hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}