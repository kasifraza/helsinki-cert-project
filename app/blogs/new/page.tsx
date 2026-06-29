import { createBlog } from "@/app/actions/blogs";

export default function NewBlog() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Create a new blog</h2>
      <form action={createBlog} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">
            Title
          </label>
          <input
            name="title"
            type="text"
            required
            className="w-full border border-zinc-300 rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">
            Author
          </label>
          <input
            name="author"
            type="text"
            required
            className="w-full border border-zinc-300 rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">
            URL
          </label>
          <input
            name="url"
            type="url"
            required
            className="w-full border border-zinc-300 rounded px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-zinc-900 text-white px-4 py-2 rounded text-sm font-medium hover:bg-zinc-800 transition-colors"
        >
          Create
        </button>
      </form>
    </div>
  );
}
