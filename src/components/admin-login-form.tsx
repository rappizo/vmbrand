"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type AdminLoginFormProps = {
  defaultUsername: string;
};

type Notice =
  | {
      tone: "error" | "success";
      text: string;
    }
  | null;

export function AdminLoginForm({ defaultUsername }: AdminLoginFormProps) {
  const router = useRouter();
  const [username, setUsername] = useState(defaultUsername);
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState<Notice>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(null);

    startTransition(() => {
      void login();
    });
  }

  async function login() {
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const payload = (await response.json().catch(() => null)) as
      | { message?: string }
      | null;

    if (!response.ok) {
      setNotice({
        tone: "error",
        text: payload?.message ?? "登录失败，请检查账号密码。",
      });
      return;
    }

    setNotice({
      tone: "success",
      text: "登录成功，正在进入后台。",
    });

    router.replace("/admin");
    router.refresh();
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <label className="field-shell">
        <span className="field-label">管理员账号</span>
        <input
          className="field-input"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          autoComplete="username"
          required
        />
      </label>

      <label className="field-shell">
        <span className="field-label">管理员密码</span>
        <input
          className="field-input"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          placeholder="请输入后台密码"
          required
        />
      </label>

      <button
        className="primary-button w-full justify-center"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "登录中..." : "进入内容后台"}
      </button>

      {notice ? (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm ${
            notice.tone === "success"
              ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-100"
              : "border-rose-400/40 bg-rose-400/10 text-rose-100"
          }`}
        >
          {notice.text}
        </div>
      ) : null}
    </form>
  );
}
