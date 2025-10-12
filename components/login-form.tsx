"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { signIn } from "next-auth/react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  userLoginValidationSchema,
  UserLoginValidationSchemaType,
} from "@/schema/user-schema";
import { toast } from "sonner";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();

  const form = useForm<UserLoginValidationSchemaType>({
    resolver: zodResolver(userLoginValidationSchema),
  });

  const onSubmit = useCallback(
    async (values: UserLoginValidationSchemaType) => {
      toast.loading("Logging in...", { id: "user-login" });

      // NextAuth credential login
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        toast.error("Invalid credentials ❌", { id: "user-login" });
      } else {
        toast.success("Login successful 🎉", { id: "user-login" });
        router.push("/dashboard/admin");
      }
    },
    [router]
  );

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your email below to login to your account
            </p>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input defaultValue={""} type="email" {...field} />
                </FormControl>
                <FormDescription>Email</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input defaultValue={""} type="password" {...field} />
                </FormControl>
                <FormDescription>Password</FormDescription>
              </FormItem>
            )}
          />
          <Button variant="outline" type="submit">
            Login
          </Button>
        </form>
      </Form>
    </>
  );
}
