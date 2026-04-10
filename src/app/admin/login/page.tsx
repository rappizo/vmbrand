import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin-login-form";
import {
  getDefaultAdminUsername,
  isAdminAuthenticated,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-4 py-10 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.24),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(37,211,154,0.18),_transparent_35%)]" />

      <div className="relative grid w-full max-w-6xl gap-8 lg:grid-cols-[0.95fr_0.75fr]">
        <section className="admin-panel flex flex-col justify-between gap-8">
          <div className="space-y-5">
            <span className="admin-chip">VMBRANDS ADMIN</span>
            <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
              管理品牌出海网站的内容与线索
            </h1>
            <p className="max-w-2xl text-base leading-8 text-white/68">
              登录后可以编辑首页文案、服务矩阵、平台信息，并查看官网提交的咨询线索。
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="item-panel">
              <p className="text-sm uppercase tracking-[0.28em] text-white/42">
                默认账号
              </p>
              <p className="mt-3 font-display text-3xl font-semibold text-white">
                {getDefaultAdminUsername()}
              </p>
              <p className="mt-3 text-sm leading-7 text-white/60">
                密码建议通过环境变量 `ADMIN_PASSWORD` 和 `ADMIN_SECRET` 配置。
              </p>
            </div>
            <div className="item-panel">
              <p className="text-sm uppercase tracking-[0.28em] text-white/42">
                当前能力
              </p>
              <p className="mt-3 font-display text-3xl font-semibold text-white">
                内容管理
              </p>
              <p className="mt-3 text-sm leading-7 text-white/60">
                支持官网首页内容编辑与前台咨询线索收集，适合当前项目快速上线。
              </p>
            </div>
          </div>
        </section>

        <section className="admin-panel">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-semibold">后台登录</h2>
            <p className="mt-2 text-sm leading-7 text-white/62">
              使用管理员账号进入内容后台。
            </p>
          </div>
          <AdminLoginForm defaultUsername={getDefaultAdminUsername()} />
        </section>
      </div>
    </main>
  );
}
