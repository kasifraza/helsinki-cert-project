import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserWithBlogs } from "@/app/services/users";

type Props = {
  params: Promise<{ username: string }>;
};

export default async function UserPage({ params }: Props) {
  const { username } = await params;
  const user = await getUserWithBlogs(username);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">{user.name}</h2>
      <p className="text-sm text-zinc-500 mb-6">Username: {user.username}</p>

      <h3 className="text-lg font-semibold mb-3">Blogs</h3>
      {user.blogs.length === 0 ? (
        <p className="text-zinc-500 text-sm">No blogs yet.</p>
      ) : (
        <ul className="space-y-2">
          {user.blogs.map((blog) => (
            <li key={blog.id}>
              <Link
                href={`/blogs/${blog.id}`}
                className="text-blue-600 hover:underline"
              >
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
