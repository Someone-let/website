"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { registerUser } from "../../../../../server/actions/register";

import { registerSchema, type RegisterSchemaValues } from "@/types/register-schema";
import { AuthCard } from "./auth-card";
import { Input } from "@/app/[locale]/components/ui/input";
import { Button } from "@/app/[locale]/components/ui/button";
import { cn } from "@/lib/utils";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/app/[locale]/components/ui/field";

import { FormError } from "@/app/[locale]/components/Auth/form-error";
import { FormSuccess } from "@/app/[locale]/components/Auth/form-success";

export const RegisterForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "en";
  const signInRoute = `/${locale}/sign-in`;
  const callbackUrl = `/${locale}`;

  const form = useForm<RegisterSchemaValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: RegisterSchemaValues) => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const data = await registerUser(values);

      if (data?.error) {
        setError(data.error);
        return;
      }

      const signInResult = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl,
      });

      if (signInResult?.error) {
        setSuccess("Account created successfully. Please log in.");
        form.reset();
        router.push(signInRoute);
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      cardTitle="Create an account."
      backButtonHref={signInRoute}
      backButtonLabel="Already have an account?"
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FieldGroup>
          {/* NAME */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Username</FieldLabel>
                <Input {...field} placeholder="John Doe" />
                <FieldDescription>
                  Your display name
                </FieldDescription>
                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* EMAIL */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Email</FieldLabel>
                <Input
                  {...field}
                  type="email"
                  placeholder="john@example.com"
                />
                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* PASSWORD */}
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Password</FieldLabel>
                <Input
                  {...field}
                  type="password"
                  placeholder="••••••••"
                />
                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <FormSuccess message={success} />
        <FormError message={error} />

        <Button
          type="submit"
          className={cn("w-full", loading && "animate-pulse")}
        >
          Register
        </Button>

   
      </form>
    </AuthCard>
  );
};