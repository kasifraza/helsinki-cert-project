import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { blogs } from "@/db/schema";

export type Blog = {
  id: number;
  title: string;
  author: string;
  url: string;
  likes: number;
};

export const getBlogs = async () => {
  return db.query.blogs.findMany();
};

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  });
};

export const addBlog = async (
  title: string,
  author: string,
  url: string,
  userId: number
) => {
  await db.insert(blogs).values({ title, author, url, likes: 0, userId });
};

export const likeBlog = async (id: number) => {
  await db
    .update(blogs)
    .set({ likes: sql`${blogs.likes} + 1` })
    .where(eq(blogs.id, id));
};
