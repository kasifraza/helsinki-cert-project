import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";

export const GET = async (req: NextRequest) => {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.slice(7);
  const user = await db.query.users.findFirst({
    where: eq(users.token, token),
    with: { blogs: true },
  });

  if (!user) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  return NextResponse.json({
    id: user.id,
    username: user.username,
    name: user.name,
    createdBlogs: user.blogs.map((b) => ({
      author: b.author,
      title: b.title,
      url: b.url,
    })),
  });
};
