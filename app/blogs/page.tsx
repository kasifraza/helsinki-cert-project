import Link from "next/link";
import { getBlogs } from "@/app/services/blogs";

type Props = {
  searchParams: Promise<{ filter?: string }>;
};

export default async function Blogs({ searchParams }: Props) {
  const { filter } = await searchParams;
  const searchTerm = filter?.trim() ?? "";

  const allBlogs = await getBlogs();

  const filteredBlogs = searchTerm
    ? allBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allBlogs;

  const sortedBlogs = [...filteredBlogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Blogs</h2>
      </div>

      <form action="/blogs" method="GET" className="mb-6 flex gap-2">
        <input
          data-testid="filter-input"
          name="filter"
          type="text"
          placeholder="Search by title..."
          defaultValue={searchTerm}
          className="flex-1 border border-zinc-300 rounded px-3 py-2 text-sm"
        />
        <button
          data-testid="search-button"
          type="submit"
          className="bg-zinc-900 text-white px-4 py-2 rounded text-sm font-medium hover:bg-zinc-800 transition-colors"
        >
          Search
        </button>
      </form>

      {sortedBlogs.length === 0 ? (
        <p className="text-zinc-500 text-sm">No blogs found.</p>
      ) : (
        <ul data-testid="blogs-list" className="space-y-4">
          {sortedBlogs.map((blog) => (
            <li
              key={blog.id}
              className="border border-zinc-200 rounded-lg p-4"
            >
              <Link
                href={`/blogs/${blog.id}`}
                className="text-blue-600 hover:underline font-medium"
              >
                {blog.title}
              </Link>
              <div className="text-sm text-zinc-500 mt-1">
                {blog.author} &middot; {blog.likes} likes
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
