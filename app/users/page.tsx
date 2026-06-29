import Link from "next/link";
import { getUsers } from "@/app/services/users";

export const dynamic = "force-dynamic";

export default async function Users() {
  const users = await getUsers();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Users</h2>
      {users.length === 0 ? (
        <p className="text-zinc-500 text-sm">No users yet.</p>
      ) : (
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user.id}>
              <Link
                href={`/users/${user.username}`}
                className="text-blue-600 hover:underline font-medium"
              >
                {user.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
