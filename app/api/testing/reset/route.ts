import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/db";

export const DELETE = async () => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  await db.execute(sql`DELETE FROM reading_list`);
  await db.execute(sql`DELETE FROM blogs`);
  await db.execute(sql`DELETE FROM users`);

  return NextResponse.json({ success: true });
};
