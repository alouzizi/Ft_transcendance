"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import GoogleSignInButton from "../GoogleSignInButton";

export default function LoginForm() {
  const FormSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have 8 characters"),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black mx-auto w-fit ">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="mail@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black mx-auto w-fit ">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Enter Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full mt-6" type="submit">
            Login
          </Button>
          <div className="flex flex-row justify-around h-6 my-2 items-center">
            <hr className="w-[40%] bg-black h-[1px] my-auto" />
            <p className="text-black  text-center my-auto">or</p>
            <hr className="w-[40%] bg-black h-[1px] my-auto" />
          </div>
          <GoogleSignInButton>Sign in with Google</GoogleSignInButton>
          <p className=" text-center text-sm text-gray-600 mt-2">
            If you don&apos;t have an account, please&nbsp;
            <Link
              className="text-blue-500 hover:underline cursor-pointer"
              href="/openAccount"
            >
              Sign up
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
