"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { auth } from "@/auth";
import { getCurrentUser } from "@/app/services/session";

export const registerUser = async (
  prevState: { error: string; values: { username: string; name: string } },
  formData: FormData
) => {
  const username = (formData.get("username") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;

  if (!username || username.length < 4) {
    return { error: "Username must be at least 4 characters", values: { username, name } };
  }
  if (!name || name.length < 1) {
    return { error: "Name is required", values: { username, name } };
  }
  if (!password || password.length < 4) {
    return { error: "Password must be at least 4 characters", values: { username, name } };
  }
  if (password !== passwordConfirm) {
    return { error: "Passwords do not match", values: { username, name } };
  }

  const existing = await db.query.users.findFirst({
    where: eq(users.username, username),
  });
  if (existing) {
    return { error: "Username already exists", values: { username, name } };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await db.insert(users).values({ username, name, passwordHash });

  redirect("/login");
};

export const generateTokenAction = async () => {
  const user = await getCurrentUser();
  if (!user) return;

  const token = crypto.randomUUID();
  await db.update(users).set({ token }).where(eq(users.id, user.id));
};
