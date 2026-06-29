import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { getBlogById } from "@/app/services/blogs";
import { getCurrentUser } from "@/app/services/session";
import { isInReadingList } from "@/app/services/readinglist";
import {
  likeBlogAction,
  addToReadingListAction,
} from "@/app/actions/blogs";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BlogPage({ params }: Props) {
  const { id } = await params;
  const blog = await getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  const session = await auth();
  const user = session ? await getCurrentUser() : null;
  const inList =
    user ? await isInReadingList(user.id, blog.id) : false;

  return (
    <div data-testid="blog-detail">
      <h2 data-testid="blog-title" className="text-2xl font-semibold mb-4">{blog.title}</h2>
      <div className="space-y-2 text-sm text-zinc-600">
        <p>
          <span className="font-medium text-zinc-800">Author:</span>{" "}
          <span data-testid="blog-author">{blog.author}</span>
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

      <div className="mt-6 flex gap-3">
        <form action={likeBlogAction}>
          <input type="hidden" name="id" value={blog.id} />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Like
          </button>
        </form>

        {user && user.id !== blog.userId && !inList && (
          <form action={addToReadingListAction}>
            <input type="hidden" name="blogId" value={blog.id} />
            <button
              data-testid="add-to-reading-list-button"
              type="submit"
              className="bg-zinc-700 text-white px-4 py-2 rounded text-sm font-medium hover:bg-zinc-600 transition-colors"
            >
              Add to reading list
            </button>
          </form>
        )}

        {inList && (
          <span className="text-sm text-zinc-500 self-center">
            In your reading list
          </span>
        )}
      </div>
    </div>
  );
}
