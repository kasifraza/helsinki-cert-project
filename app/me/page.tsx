import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getCurrentUser } from "@/app/services/session";
import { getReadingList } from "@/app/services/readinglist";
import { generateTokenAction } from "@/app/actions/users";
import { markAsReadAction } from "@/app/actions/blogs";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function MePage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const list = await getReadingList(user.id);
  const unread = list.filter((entry) => !entry.read);
  const read = list.filter((entry) => entry.read);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2">My Profile</h2>
      <p className="text-sm text-zinc-500 mb-1">
        Name: <span className="font-medium text-zinc-800">{user.name}</span>
      </p>
      <p className="text-sm text-zinc-500 mb-6">
        Username:{" "}
        <span className="font-medium text-zinc-800">{user.username}</span>
      </p>

      <h3 className="text-lg font-semibold mb-3">Reading List</h3>

      {unread.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-zinc-500 mb-2">
            Unread ({unread.length})
          </h4>
          <ul className="space-y-2">
            {unread.map((entry) => (
              <li
                key={entry.id}
                className="border border-zinc-200 rounded-lg p-3 flex items-center justify-between"
              >
                <Link
                  href={`/blogs/${entry.blog.id}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  {entry.blog.title}
                </Link>
                <form action={markAsReadAction}>
                  <input type="hidden" name="entryId" value={entry.id} />
                  <button
                    type="submit"
                    className="text-xs bg-zinc-200 hover:bg-zinc-300 px-2 py-1 rounded transition-colors"
                  >
                    Mark as read
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </div>
      )}

      {read.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-zinc-500 mb-2">
            Read ({read.length})
          </h4>
          <ul className="space-y-2">
            {read.map((entry) => (
              <li
                key={entry.id}
                className="border border-zinc-200 rounded-lg p-3"
              >
                <Link
                  href={`/blogs/${entry.blog.id}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  {entry.blog.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {list.length === 0 && (
        <p className="text-zinc-500 text-sm mb-6">
          Your reading list is empty. Browse blogs and add some!
        </p>
      )}

      <h3 className="text-lg font-semibold mb-3">API Token</h3>
      {user.token ? (
        <div className="bg-zinc-100 border border-zinc-300 rounded px-4 py-3 mb-4">
          <p className="text-xs text-zinc-500 mb-1">Current token:</p>
          <code className="text-sm font-mono text-zinc-800 break-all">
            {user.token}
          </code>
        </div>
      ) : (
        <p className="text-zinc-500 text-sm mb-4">
          No token has been generated yet.
        </p>
      )}

      <form action={generateTokenAction}>
        <button
          type="submit"
          className="bg-zinc-900 text-white px-4 py-2 rounded text-sm font-medium hover:bg-zinc-800 transition-colors"
        >
          Generate New Token
        </button>
      </form>
    </div>
  );
}
