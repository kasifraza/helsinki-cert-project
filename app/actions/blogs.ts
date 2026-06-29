"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { addBlog, likeBlog } from "@/app/services/blogs";
import { getCurrentUser } from "@/app/services/session";
import { db } from "@/db";
import { readingList } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export const createBlog = async (
  prevState: { error: string; values: { title: string; author: string; url: string } },
  formData: FormData
) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const title = (formData.get("title") as string)?.trim();
  const author = (formData.get("author") as string)?.trim();
  const url = (formData.get("url") as string)?.trim();

  if (!title || title.length < 5) {
    return { error: "Title must be at least 5 characters", values: { title, author, url } };
  }
  if (!author || author.length < 5) {
    return { error: "Author must be at least 5 characters", values: { title, author, url } };
  }
  if (!url || url.length < 5) {
    return { error: "URL must be at least 5 characters", values: { title, author, url } };
  }

  const user = await getCurrentUser();
  if (!user) {
    return { error: "User not found", values: { title, author, url } };
  }

  await addBlog(title, author, url, user.id);

  revalidatePath("/blogs");
  redirect("/blogs");
};

export const likeBlogAction = async (formData: FormData) => {
  const id = Number(formData.get("id"));

  await likeBlog(id);

  revalidatePath("/blogs");
  revalidatePath(`/blogs/${id}`);
};

export const addToReadingListAction = async (formData: FormData) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const user = await getCurrentUser();
  if (!user) return;

  const blogId = Number(formData.get("blogId"));

  const existing = await db.query.readingList.findFirst({
    where: and(
      eq(readingList.userId, user.id),
      eq(readingList.blogId, blogId)
    ),
  });

  if (!existing) {
    await db.insert(readingList).values({ userId: user.id, blogId, read: false });
  }

  revalidatePath(`/blogs/${blogId}`);
  revalidatePath("/me");
};

export const markAsReadAction = async (formData: FormData) => {
  const session = await auth();
  if (!session) return;

  const user = await getCurrentUser();
  if (!user) return;

  const entryId = Number(formData.get("entryId"));

  await db
    .update(readingList)
    .set({ read: true })
    .where(
      and(eq(readingList.id, entryId), eq(readingList.userId, user.id))
    );

  revalidatePath("/me");
};
