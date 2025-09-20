"use client";

import { ConvexClientProvider } from "./convex";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { LoaderOne } from "@/components/ui/loader";
import DarkModeToggle from "@/components/darkmode-toggle";

function AuthenticatedContent() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const user = useQuery(api.auth.getCurrentUser, isAuthenticated === true ? {} : "skip");
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();
        setIsAuthenticated(!!session.data);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    setIsAuthenticated(false);
    router.push("/login");
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4">
        <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
          <div className="flex flex-col items-center justify-center space-y-4">
            <LoaderOne />
          </div>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4">
        <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black ">
          <div className="flex justify-center">
            <DarkModeToggle />
          </div>
            <div className="flex justify-center mt-4">
              <Image src="/convex.ico" alt="logo" width={100} height={100} />
              <Image
                src="/betterauth-black.png"
                alt="logo"
                width={100}
                height={100}
                className="dark:hidden"
              />
              <Image
                src="/betterauth-white.png"
                alt="logo"
                width={100}
                height={100}
                className="hidden dark:block"
              />
            </div>
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 text-center mt-4">Convex + BetterAuth</h2>
          <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300 text-center">
            Open Source Authentication for your Next.js app by <Link href="https://github.com/gayakaci20" className="text-neutral-600 dark:text-neutral-300 font-bold">Gaya KACI</Link>
          </p>
            <BottomGradient />
          <div className="my-8 grid grid-cols-1 gap-3">
            <Link
              href="/login"
              className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 text-center leading-10 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            >
              Sign in →
              <BottomGradient />
            </Link>
            <Link
              href="/register"
              className="group/btn shadow-input relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            >
              Create account
              <BottomGradient />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-black/80 backdrop-blur shadow-sm">
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Welcome back, {user.name || user.email}!</h1>
                <p className="mt-1 text-slate-600 dark:text-slate-400">You are authenticated with Convex + BetterAuth</p>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600/50"
              >
                Sign out
              </button>
            </div>

            <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4">
              <h2 className="text-base font-medium text-slate-900 dark:text-slate-100">User information</h2>
              <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 p-3">
                  <dt className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">User ID</dt>
                  <dd className="mt-1 text-sm text-slate-900 dark:text-slate-100 break-words font-mono">{user._id}</dd>
                </div>
                <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 p-3">
                  <dt className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Email</dt>
                  <dd className="mt-1 text-sm text-slate-900 dark:text-slate-100">{user.email}</dd>
                </div>
                <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 p-3">
                  <dt className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Name</dt>
                  <dd className="mt-1 text-sm text-slate-900 dark:text-slate-100">{user.name || "Not set"}</dd>
                </div>
                <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 p-3">
                  <dt className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Created</dt>
                  <dd className="mt-1 text-sm text-slate-900 dark:text-slate-100">
                    {user._creationTime ? new Date(user._creationTime).toLocaleDateString() : "Unknown"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

export default function Home() {
  return (
    <ConvexClientProvider>
      <AuthenticatedContent />
    </ConvexClientProvider>
  );
}