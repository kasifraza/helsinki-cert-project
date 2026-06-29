"use client";

import { useNotification } from "./NotificationContext";

export default function Notification() {
  const { message, type } = useNotification();

  if (!message) return null;

  const bgColor =
    type === "success" ? "bg-green-600" : "bg-red-600";

  return (
    <div data-testid="notification" className={`${bgColor} text-white px-6 py-3 text-sm text-center`}>
      {message}
    </div>
  );
}
