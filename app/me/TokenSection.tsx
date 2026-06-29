"use client";

import { useState } from "react";
import { generateTokenAction } from "@/app/actions/users";

export function TokenSection({ currentToken }: { currentToken: string | null }) {
  const [token, setToken] = useState<string | null>(currentToken);

  const handleGenerate = async () => {
    const result = await generateTokenAction();
    if (result?.token) {
      setToken(result.token);
    }
  };

  return (
    <div data-testid="api-token-section">
      <h3 className="text-lg font-semibold mb-3">API Token</h3>
      {token ? (
        <div
          data-testid="token-display"
          className="bg-zinc-100 border border-zinc-300 rounded px-4 py-3 mb-4"
        >
          <p className="text-xs text-zinc-500 mb-1">Current token:</p>
          <code
            data-testid="api-token"
            className="text-sm font-mono text-zinc-800 break-all"
          >
            {token}
          </code>
        </div>
      ) : (
        <p
          data-testid="no-token-message"
          className="text-zinc-500 text-sm mb-4"
        >
          No token has been generated yet.
        </p>
      )}

      <button
        data-testid="generate-token-button"
        type="button"
        onClick={handleGenerate}
        className="bg-zinc-900 text-white px-4 py-2 rounded text-sm font-medium hover:bg-zinc-800 transition-colors"
      >
        Generate New Token
      </button>
    </div>
  );
}
