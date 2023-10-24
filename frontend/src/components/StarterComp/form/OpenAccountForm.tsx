"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import GoogleSignInButton from "../GoogleSignInButton";
import { Backend_URL } from "@/lib/Constants";

export default function OpenAccountForm() {
  const FormSchema = z
    .object({
      username: z.string().min(1, "Username is required").max(100),
      email: z.string().min(1, "Email is required").email("Invalid email"),
      password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must have 8 characters"),
      confirmPassword: z.string().min(1, "Password confirmation is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Password do not match",
    });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    // const res = await fetch(Backend_URL + "/auth/signup", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     email: data.email,
    //     password: data.password,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // if (!res.ok) {
    //   alert(res.statusText);
    //   return;
    // }
    // const response = await res.json();
    // alert("User Registered!");

    // console.log(response);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black mx-auto w-fit ">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="hixcoder"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black mx-auto w-fit ">
                    Confirm password
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Re-Enter your password"
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
            Open Account
          </Button>
          <div className="flex flex-row justify-around h-6 my-2 items-center">
            <hr className="w-[40%] bg-black h-[1px] my-auto" />
            <p className="text-black  text-center my-auto">or</p>
            <hr className="w-[40%] bg-black h-[1px] my-auto" />
          </div>
          <GoogleSignInButton>Sign up with Google</GoogleSignInButton>
          <p className=" text-center text-sm text-gray-600 mt-2">
            If you have an account, please&nbsp;
            <Link
              className="text-blue-500 hover:underline cursor-pointer"
              href="/login"
            >
              Sign in
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
