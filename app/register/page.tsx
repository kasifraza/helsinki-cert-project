"use client";

import { useActionState } from "react";
import { registerUser } from "@/app/actions/users";

export default function RegisterPage() {
  const [state, formAction] = useActionState(
    registerUser,
    { error: "", values: { username: "", name: "" } }
  );

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Register</h2>
      {state?.error && (
        <p className="text-red-600 bg-red-50 border border-red-200 rounded px-4 py-2 mb-4 text-sm">
          {state.error}
        </p>
      )}
      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">
            Username
          </label>
          <input
            name="username"
            type="text"
            required
            defaultValue={state?.values?.username}
            className="w-full border border-zinc-300 rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">
            Name
          </label>
          <input
            name="name"
            type="text"
            required
            defaultValue={state?.values?.name}
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
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">
            Confirm Password
          </label>
          <input
            name="passwordConfirm"
            type="password"
            required
            className="w-full border border-zinc-300 rounded px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-zinc-900 text-white px-4 py-2 rounded text-sm font-medium hover:bg-zinc-800 transition-colors"
        >
          Register
        </button>
      </form>
    </div>
  );
}
