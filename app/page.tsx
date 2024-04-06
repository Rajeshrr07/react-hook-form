"use client";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number; // Corrected type to number
  password: string;
  confirmPassword: string;
};

export default function Home() {
  const schema: ZodType<FormData> = z
    .object({
      firstName: z.string().min(2).max(30),
      lastName: z.string().min(2).max(30),
      email: z.string().email(),
      age: z.number().min(18).max(70),
      password: z.string().min(5).max(20),
      confirmPassword: z.string().min(5).max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitData = (data: FormData) => {
    console.log("IT worked", data);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        className="flex flex-col justify-center py-2"
        onSubmit={handleSubmit(submitData)}
      >
        <label className="mt-2">First Name:</label>
        <input type="text" {...register("firstName")} />
        {errors.firstName && (
          <span className="text-red-500">{errors.firstName.message}</span>
        )}
        <label className="mt-2">Last Name:</label>
        <input type="text" {...register("lastName")} />
        {errors.lastName && (
          <span className="text-red-500">{errors.lastName.message}</span>
        )}
        <label className="mt-2">Email:</label>
        <input type="email" {...register("email")} />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <label className="mt-2">Age:</label>
        <input type="number" {...register("age", { valueAsNumber: true })} />
        {errors.age && (
          <span className="text-red-500">{errors.age.message}</span>
        )}
        <label className="mt-2">Password:</label>
        <input type="password" {...register("password")} />{" "}
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <label className="mt-2">Confirm Password:</label>
        <input type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
        <input className="mt-4 cursor-pointer" type="submit" />
      </form>
    </main>
  );
}
