"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBlog } from "@/app/actions/blogs";
import { useNotification } from "@/app/components/NotificationContext";

export default function NewBlog() {
  const router = useRouter();
  const { showNotification } = useNotification();
  const [state, formAction] = useActionState(createBlog, {
    error: "",
    success: false,
    values: { title: "", author: "", url: "" },
  });

  useEffect(() => {
    if (state?.success) {
      showNotification("Blog created successfully", "success");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Create a new blog</h2>
      {state?.error && (
        <p className="text-red-600 bg-red-50 border border-red-200 rounded px-4 py-2 mb-4 text-sm">
          {state.error}
        </p>
      )}
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-zinc-700 mb-1">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={state?.values?.title}
            className="w-full border border-zinc-300 rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-zinc-700 mb-1">
            Author
          </label>
          <input
            id="author"
            name="author"
            type="text"
            required
            defaultValue={state?.values?.author}
            className="w-full border border-zinc-300 rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-zinc-700 mb-1">
            URL
          </label>
          <input
            id="url"
            name="url"
            type="url"
            required
            defaultValue={state?.values?.url}
            className="w-full border border-zinc-300 rounded px-3 py-2 text-sm"
          />
        </div>
        <button
          data-testid="create-blog-button"
          type="submit"
          className="bg-zinc-900 text-white px-4 py-2 rounded text-sm font-medium hover:bg-zinc-800 transition-colors"
        >
          Create
        </button>
      </form>
    </div>
  );
}
