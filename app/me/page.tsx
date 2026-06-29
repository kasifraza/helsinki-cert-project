import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getCurrentUser } from "@/app/services/session";
import { getReadingList } from "@/app/services/readinglist";
import { TokenSection } from "./TokenSection";
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
    <div className="max-w-2xl mx-auto" data-testid="user-profile">
      <h2 className="text-2xl font-semibold mb-2">My Profile</h2>
      <p className="text-sm text-zinc-500 mb-1">
        Name: <span data-testid="user-name" className="font-medium text-zinc-800">{user.name}</span>
      </p>
      <p className="text-sm text-zinc-500 mb-6">
        Username:{" "}
        <span data-testid="user-username" className="font-medium text-zinc-800">{user.username}</span>
      </p>

      <div data-testid="reading-list-section">
        <h3 className="text-lg font-semibold mb-3">Reading List</h3>

        {unread.length > 0 && (
          <div data-testid="unread-section" className="mb-4">
            <h4 className="text-sm font-medium text-zinc-500 mb-2">
              Unread ({unread.length})
            </h4>
            <ul className="space-y-2">
              {unread.map((entry, index) => (
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
                      data-testid={`mark-read-${index}`}
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

        {unread.length === 0 && list.length > 0 && (
          <p data-testid="no-unread-blogs" className="text-zinc-500 text-sm mb-4">
            All caught up! No unread blogs.
          </p>
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
          <p data-testid="empty-reading-list" className="text-zinc-500 text-sm mb-6">
            Your reading list is empty. Browse blogs and add some!
          </p>
        )}
      </div>

      <TokenSection currentToken={user.token ?? null} />
    </div>
  );
}
