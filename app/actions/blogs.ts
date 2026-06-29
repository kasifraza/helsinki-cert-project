"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { addBlog, likeBlog } from "@/app/services/blogs";
import { db } from "@/db";
import { readingList } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export const createBlog = async (
  prevState: { error: string; values: { title: string; author: string; url: string } },
  formData: FormData
): Promise<{ error: string; success: boolean; values: { title: string; author: string; url: string } }> => {
  const session = await auth();
  if (!session) {
    return { error: "Not authenticated", success: false, values: { title: "", author: "", url: "" } };
  }

  const title = (formData.get("title") as string)?.trim();
  const author = (formData.get("author") as string)?.trim();
  const url = (formData.get("url") as string)?.trim();

  if (!title || title.length < 5) {
    return { error: "Title must be at least 5 characters", success: false, values: { title, author, url } };
  }
  if (!author || author.length < 5) {
    return { error: "Author must be at least 5 characters", success: false, values: { title, author, url } };
  }
  if (!url || url.length < 5) {
    return { error: "URL must be at least 5 characters", success: false, values: { title, author, url } };
  }

  const userId = Number(session.user?.id);
  if (!userId) {
    return { error: "User not found", success: false, values: { title, author, url } };
  }

  await addBlog(title, author, url, userId);

  revalidatePath("/blogs");
  return { error: "", success: true, values: { title: "", author: "", url: "" } };
};

export const likeBlogAction = async (formData: FormData) => {
  const id = Number(formData.get("id"));

  await likeBlog(id);

  revalidatePath("/blogs");
  revalidatePath(`/blogs/${id}`);
};

export const addToReadingListAction = async (formData: FormData) => {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = Number(session.user.id);
  const blogId = Number(formData.get("blogId"));

  const existing = await db.query.readingList.findFirst({
    where: and(
      eq(readingList.userId, userId),
      eq(readingList.blogId, blogId)
    ),
  });

  if (!existing) {
    await db.insert(readingList).values({ userId, blogId, read: false });
  }

  revalidatePath(`/blogs/${blogId}`);
  revalidatePath("/me");
};

export const markAsReadAction = async (formData: FormData) => {
  const session = await auth();
  if (!session?.user?.id) return;

  const userId = Number(session.user.id);
  const entryId = Number(formData.get("entryId"));

  await db
    .update(readingList)
    .set({ read: true })
    .where(
      and(eq(readingList.id, entryId), eq(readingList.userId, userId))
    );

  revalidatePath("/me");
};
