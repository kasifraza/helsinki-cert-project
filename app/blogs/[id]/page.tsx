import { notFound } from "next/navigation";
import { getBlogById } from "@/app/services/blogs";
import { likeBlogAction } from "@/app/actions/blogs";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BlogPage({ params }: Props) {
  const { id } = await params;
  const blog = getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{blog.title}</h2>
      <div className="space-y-2 text-sm text-zinc-600">
        <p>
          <span className="font-medium text-zinc-800">Author:</span>{" "}
          {blog.author}
        </p>
        <p>
          <span className="font-medium text-zinc-800">URL:</span>{" "}
          <a
            href={blog.url}
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {blog.url}
          </a>
        </p>
        <p>
          <span className="font-medium text-zinc-800">Likes:</span>{" "}
          {blog.likes}
        </p>
      </div>

      <form action={likeBlogAction} className="mt-6">
        <input type="hidden" name="id" value={blog.id} />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Like
        </button>
      </form>
    </div>
  );
}
