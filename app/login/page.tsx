"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid username or password");
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Login</h2>
      {error && (
        <p className="text-red-600 bg-red-50 border border-red-200 rounded px-4 py-2 mb-4 text-sm">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">
            Username
          </label>
          <input
            name="username"
            type="text"
            required
            className="w-full border border-zinc-300 rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            className="w-full border border-zinc-300 rounded px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-zinc-900 text-white px-4 py-2 rounded text-sm font-medium hover:bg-zinc-800 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}
