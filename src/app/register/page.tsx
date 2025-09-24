"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import SocialRegister from "@/components/social-register";
import Password from "@/components/input/password";
import PasswordConfirm from "@/components/input/password_confirm";
import RegisterButton2 from "@/components/buttons/register-a";
import BackToHomeButton from "@/components/buttons/home";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    ];

    const unmetRequirements = requirements.filter(req => !req.regex.test(password));

    if (unmetRequirements.length > 0) {
      const errorMessages = unmetRequirements.map(req => `${req.text}- Requirement not met`);
      setError(errorMessages.join('\n'));
      setIsLoading(false);
      return;
    }

    try {
      const result = await authClient.signUp.email({
        email,
        password,
        name: email.split("@")[0],
      });

      if (result.error) {
        setError(result.error.message || "Registration failed");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: string) => {
    await authClient.signIn.social({
      provider,
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <div className="flex justify-center mt-4 mb-4">
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
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
          Create your account
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
          Join us today and get started.{" "}
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
            Sign in instead
          </Link>
        </p>

        {error ? (
          <div role="alert" aria-live="polite" id="form-error" className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        ) : null}

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!error}
              aria-describedby={error ? "form-error" : undefined}
              placeholder="you@example.com"
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">Min. 8 characters</span>
            </div>
            <div className="relative">
              <Password value={password} onChange={setPassword} />
            </div>
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <PasswordConfirm originalPassword={password} value={confirmPassword} onChange={setConfirmPassword} />
            </div>
          </LabelInputContainer>

          <RegisterButton2
            onClick={() => {
              const form = document.querySelector('form') as HTMLFormElement;
              form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                Creating account...
              </span>
            ) : (
              "Create account"
            )}
          </RegisterButton2>
        </form>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        <SocialRegister onClick={handleSocialSignUp} />
        <div className="my-8 grid grid-cols-1 gap-3">
          <BackToHomeButton
            onClick={() => router.push("/")}
          >
            Back to home →
          </BackToHomeButton>
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

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
