"use client";

import { AuthCard } from "@/app/[locale]/components/Auth/auth-card";
import { Input } from "@/app/[locale]/components/ui/input";
import { Button } from "@/app/[locale]/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginSchemaValues } from "@/types/login-schema";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

import { signIn } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/app/[locale]/components/ui/field";

export const LoginForm = () => {
  const form = useForm<LoginSchemaValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "en";
  const registerRoute = `/${locale}/register`;
  const resetRoute = `/${locale}/reset`;
  const homeRoute = `/${locale}`;

  const onSubmit = async (values: LoginSchemaValues) => {
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push(homeRoute);
  };

  return (
    <AuthCard
      cardTitle="Welcome Back"
      backButtonHref={registerRoute}
      backButtonLabel="Register"
      showSocial
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          {/* EMAIL */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...form.register("email")}
              autoComplete="email"
            />
            {form.formState.errors.email && (
              <FieldError errors={[form.formState.errors.email]} />
            )}
          </Field>

          {/* PASSWORD */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...form.register("password")}
              autoComplete="current-password"
            />
            {form.formState.errors.password && (
              <FieldError errors={[form.formState.errors.password]} />
            )}
          </Field>
        </FieldGroup>

        <div className="mt-2">
          <Button size="sm" variant="link">
            <Link href={resetRoute}>Forgot your password?</Link>
          </Button>
        </div>

        {error && (
          <p className="text-sm text-red-500 mt-2">{error}</p>
        )}

        <Button
          type="submit"
          className={cn("w-full mt-4", loading && "animate-pulse")}
        >
          Login
        </Button>
      </form>
    </AuthCard>
  );
};