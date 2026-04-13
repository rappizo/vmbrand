"use client";

import {
  useDeferredValue,
  useEffect,
  useEffectEvent,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import {
  Inbox,
  LogOut,
  Plus,
  RefreshCw,
  Save,
  Search,
  Trash2,
} from "lucide-react";

import type { Lead, SiteContent } from "@/lib/site-schema";

type AdminDashboardProps = {
  initialContent: SiteContent;
  initialLeads: Lead[];
};

type Notice =
  | {
      tone: "success" | "error";
      text: string;
    }
  | null;

type AdminView = "home" | "leads";

const emptyMetric = {
  value: "0+",
  label: "新增指标",
  detail: "请补充这项指标的说明。",
};

const emptyService = {
  title: "新增服务",
  summary: "请补充服务摘要。",
  detail: "请补充这项服务的详细说明。",
  tags: ["标签一", "标签二"],
};

const emptyDifferentiator = {
  title: "新增优势",
  description: "请补充这项优势的说明。",
};

const emptyProcess = {
  step: "00",
  title: "新增步骤",
  description: "请补充步骤内容。",
};

function linesToArray(value: string) {
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function arrayToLines(value: string[]) {
  return value.join("\n");
}

function formatLeadDate(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value));
}

function formatContentDate(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value));
}

export function AdminDashboard({
  initialContent,
  initialLeads,
}: AdminDashboardProps) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [leads, setLeads] = useState(initialLeads);
  const [activeView, setActiveView] = useState<AdminView>("home");
  const [searchText, setSearchText] = useState("");
  const [notice, setNotice] = useState<Notice>(null);
  const [isRefreshingLeads, setIsRefreshingLeads] = useState(false);
  const [isSaving, startSaving] = useTransition();
  const [isLoggingOut, startLoggingOut] = useTransition();
  const deferredSearch = useDeferredValue(searchText);

  const filteredLeads = leads.filter((lead) => {
    const query = deferredSearch.trim().toLowerCase();

    if (!query) {
      return true;
    }

    const haystack = [
      lead.companyName,
      lead.contactName,
      lead.contact,
      lead.targetMarket,
      lead.serviceNeed,
      lead.message,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });

  async function refreshLeads(silent = false) {
    if (isRefreshingLeads) {
      return;
    }

    if (!silent) {
      setNotice(null);
    }

    setIsRefreshingLeads(true);

    try {
      const response = await fetch("/api/leads", {
        cache: "no-store",
      });

      const payload = (await response.json().catch(() => null)) as
        | { leads?: Lead[]; message?: string }
        | null;

      if (!response.ok || !Array.isArray(payload?.leads)) {
        if (!silent) {
          setNotice({
            tone: "error",
            text: payload?.message ?? "线索列表刷新失败，请稍后重试。",
          });
        }
        return;
      }

      setLeads(payload.leads);

      if (!silent) {
        setNotice({
          tone: "success",
          text: "官网咨询线索已刷新。",
        });
      }
    } catch {
      if (!silent) {
        setNotice({
          tone: "error",
          text: "线索列表刷新失败，请稍后重试。",
        });
      }
    } finally {
      setIsRefreshingLeads(false);
    }
  }

  const refreshLeadsOnFocus = useEffectEvent(async () => {
    await refreshLeads(true);
  });

  useEffect(() => {
    void refreshLeadsOnFocus();

    function handleWindowFocus() {
      void refreshLeadsOnFocus();
    }

    window.addEventListener("focus", handleWindowFocus);

    return () => {
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, []);

  function updateSite(field: keyof SiteContent["site"], value: string) {
    setContent((current) => ({
      ...current,
      site: {
        ...current.site,
        [field]: value,
      },
    }));
  }

  function updateHero(field: keyof SiteContent["hero"], value: string | string[]) {
    setContent((current) => ({
      ...current,
      hero: {
        ...current.hero,
        [field]: value,
      },
    }));
  }

  function updateFounder(
    field: keyof SiteContent["founder"],
    value: string | string[],
  ) {
    setContent((current) => ({
      ...current,
      founder: {
        ...current.founder,
        [field]: value,
      },
    }));
  }

  function updateCta(field: keyof SiteContent["cta"], value: string) {
    setContent((current) => ({
      ...current,
      cta: {
        ...current.cta,
        [field]: value,
      },
    }));
  }

  function updateMetricField(
    index: number,
    field: keyof SiteContent["metrics"][number],
    value: string,
  ) {
    setContent((current) => ({
      ...current,
      metrics: current.metrics.map((metric, metricIndex) =>
        metricIndex === index
          ? {
              ...metric,
              [field]: value,
            }
          : metric,
      ),
    }));
  }

  function updateServiceField(
    index: number,
    field: keyof SiteContent["services"][number],
    value: string | string[],
  ) {
    setContent((current) => ({
      ...current,
      services: current.services.map((service, serviceIndex) =>
        serviceIndex === index
          ? {
              ...service,
              [field]: value,
            }
          : service,
      ),
    }));
  }

  function updateDifferentiatorField(
    index: number,
    field: keyof SiteContent["differentiators"][number],
    value: string,
  ) {
    setContent((current) => ({
      ...current,
      differentiators: current.differentiators.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    }));
  }

  function updateProcessField(
    index: number,
    field: keyof SiteContent["process"][number],
    value: string,
  ) {
    setContent((current) => ({
      ...current,
      process: current.process.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    }));
  }

  function addMetric() {
    setContent((current) => ({
      ...current,
      metrics: [...current.metrics, emptyMetric],
    }));
  }

  function removeMetric(index: number) {
    setContent((current) => ({
      ...current,
      metrics: current.metrics.filter((_, metricIndex) => metricIndex !== index),
    }));
  }

  function addService() {
    setContent((current) => ({
      ...current,
      services: [...current.services, emptyService],
    }));
  }

  function removeService(index: number) {
    setContent((current) => ({
      ...current,
      services: current.services.filter((_, serviceIndex) => serviceIndex !== index),
    }));
  }

  function addDifferentiator() {
    setContent((current) => ({
      ...current,
      differentiators: [...current.differentiators, emptyDifferentiator],
    }));
  }

  function removeDifferentiator(index: number) {
    setContent((current) => ({
      ...current,
      differentiators: current.differentiators.filter(
        (_, itemIndex) => itemIndex !== index,
      ),
    }));
  }

  function addProcess() {
    setContent((current) => ({
      ...current,
      process: [...current.process, emptyProcess],
    }));
  }

  function removeProcess(index: number) {
    setContent((current) => ({
      ...current,
      process: current.process.filter((_, itemIndex) => itemIndex !== index),
    }));
  }

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(null);

    startSaving(() => {
      void saveContent();
    });
  }

  async function saveContent() {
    const response = await fetch("/api/site-content", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });

    const payload = (await response.json().catch(() => null)) as
      | { content?: SiteContent; message?: string }
      | null;

    if (!response.ok || !payload?.content) {
      setNotice({
        tone: "error",
        text: payload?.message ?? "保存失败，请检查内容格式后重试。",
      });
      return;
    }

    setContent(payload.content);
    setNotice({
      tone: "success",
      text: "内容已保存，前台页面会同步展示最新数据。",
    });
    router.refresh();
  }

  function handleLogout() {
    startLoggingOut(() => {
      void logout();
    });
  }

  async function logout() {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    router.replace("/admin/login");
    router.refresh();
  }

  const navItems: Array<{
    id: AdminView;
    title: string;
    description: string;
    badge: string;
  }> = [
    {
      id: "home",
      title: "首页设置",
      description: "首页文案、模块和展示内容",
      badge: `${content.services.length} 项内容`,
    },
    {
      id: "leads",
      title: "咨询线索",
      description: "官网预约与咨询表单线索",
      badge: `${leads.length} 条线索`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6">
        <div className="admin-panel flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <span className="admin-chip">VMBRANDS CMS</span>
            <div>
              <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                姜生品牌咨询后台
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-white/68">
                在这里统一管理首页文案、服务矩阵、品牌优势与官网咨询线索。最后更新时间：
                <span className="ml-2 text-white">
                  {formatContentDate(content.updatedAt)}
                </span>
              </p>
            </div>
          </div>

          <button
            className="secondary-button"
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <LogOut className="h-4 w-4" />
            {isLoggingOut ? "退出中..." : "退出后台"}
          </button>
        </div>

        <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="admin-panel h-fit xl:sticky xl:top-6">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.28em] text-white/42">
                项目
              </p>
              <h2 className="font-display text-2xl font-semibold text-white">
                后台结构
              </h2>
              <p className="text-sm leading-7 text-white/62">
                左边是项目，右边是内容。当前先收成首页设置和咨询线索两类，后面新增页面也能继续扩展。
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {navItems.map((item) => {
                const isActive = item.id === activeView;

                return (
                  <button
                    key={item.id}
                    className={`w-full rounded-[1.6rem] border px-4 py-4 text-left transition ${
                      isActive
                        ? "border-emerald-300/30 bg-[linear-gradient(135deg,rgba(124,58,237,0.24),rgba(37,211,154,0.16))] shadow-[0_18px_50px_rgba(6,10,24,0.35)]"
                        : "border-white/10 bg-white/[0.03] hover:border-white/18 hover:bg-white/[0.05]"
                    }`}
                    type="button"
                    onClick={() => setActiveView(item.id)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-xl font-semibold text-white">
                          {item.title}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-white/58">
                          {item.description}
                        </p>
                      </div>
                      <span className="admin-chip whitespace-nowrap">{item.badge}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          <SummaryCard
            title="官网服务数"
            value={`${content.services.length}`}
            detail="当前站点展示的核心服务板块数量。"
          />
          <SummaryCard
            title="品牌线索数"
            value={`${leads.length}`}
            detail="来自官网咨询表单的累计线索。"
          />
          <SummaryCard
            title="行业覆盖"
            value={`${content.sectors.length}`}
            detail="前台页面展示的行业标签数量。"
          />
        </div>

          </aside>

          <main className="min-w-0">
            {activeView === "home" ? (
              <div className="space-y-6">
                <div className="admin-panel flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <span className="admin-chip">HOME SETTINGS</span>
                    <h2 className="mt-4 font-display text-3xl font-semibold text-white">
                      首页设置
                    </h2>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-white/64">
                      这里统一管理所有主页相关内容，后续如果增加案例页、关于我们或其他栏目，也可以继续放到左侧项目里。
                    </p>
                  </div>

                  <button
                    className="primary-button"
                    type="submit"
                    form="home-settings-form"
                    disabled={isSaving}
                  >
                    <Save className="h-4 w-4" />
                    {isSaving ? "保存中..." : "保存首页设置"}
                  </button>
                </div>

                <form className="space-y-6" id="home-settings-form" onSubmit={handleSave}>
            <Panel
              title="站点与首屏信息"
              description="控制官网最重要的品牌信息和首屏 Banner 文案。"
            >
              <div className="grid gap-4 md:grid-cols-3">
                <Field
                  label="公司名称"
                  value={content.site.companyName}
                  onChange={(value) => updateSite("companyName", value)}
                />
                <Field
                  label="品牌简称"
                  value={content.site.brandName}
                  onChange={(value) => updateSite("brandName", value)}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="官网域名"
                  value={content.site.domain}
                  onChange={(value) => updateSite("domain", value)}
                />
                <Field
                  label="首屏 Eyebrow"
                  value={content.hero.eyebrow}
                  onChange={(value) => updateHero("eyebrow", value)}
                />
              </div>

              <Field
                label="品牌简介"
                value={content.site.description}
                onChange={(value) => updateSite("description", value)}
                multiline
              />

              <Field
                label="首屏标题"
                value={content.hero.title}
                onChange={(value) => updateHero("title", value)}
              />

              <Field
                label="首屏副标题"
                value={content.hero.subtitle}
                onChange={(value) => updateHero("subtitle", value)}
              />

              <Field
                label="首屏说明"
                value={content.hero.description}
                onChange={(value) => updateHero("description", value)}
                multiline
              />

              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="主按钮文案"
                  value={content.hero.primaryCta}
                  onChange={(value) => updateHero("primaryCta", value)}
                />
                <Field
                  label="次按钮文案"
                  value={content.hero.secondaryCta}
                  onChange={(value) => updateHero("secondaryCta", value)}
                />
              </div>

              <Field
                label="首屏亮点（一行一个）"
                value={arrayToLines(content.hero.highlights)}
                onChange={(value) => updateHero("highlights", linesToArray(value))}
                multiline
              />
            </Panel>

            <Panel
              title="创始人与团队"
              description="用于首页人物区和团队信任背书区域。"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="创始人姓名"
                  value={content.founder.name}
                  onChange={(value) => updateFounder("name", value)}
                />
                <Field
                  label="创始人职位"
                  value={content.founder.title}
                  onChange={(value) => updateFounder("title", value)}
                />
              </div>

              <Field
                label="创始人摘要"
                value={content.founder.summary}
                onChange={(value) => updateFounder("summary", value)}
                multiline
              />

              <Field
                label="创始人理念 / 引语"
                value={content.founder.bio}
                onChange={(value) => updateFounder("bio", value)}
                multiline
              />

              <Field
                label="团队说明"
                value={content.founder.teamCaption}
                onChange={(value) => updateFounder("teamCaption", value)}
                multiline
              />

              <Field
                label="创始人背书（一行一个）"
                value={arrayToLines(content.founder.credentials)}
                onChange={(value) =>
                  updateFounder("credentials", linesToArray(value))
                }
                multiline
              />
            </Panel>

            <Panel
              title="核心数据"
              description="这些数字会出现在首页信任数据区。"
              action={
                <button className="secondary-button" type="button" onClick={addMetric}>
                  <Plus className="h-4 w-4" />
                  新增指标
                </button>
              }
            >
              <div className="grid gap-4">
                {content.metrics.map((metric, index) => (
                  <div className="item-panel" key={`${metric.label}-${index}`}>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="admin-chip">指标 {index + 1}</span>
                      <button
                        className="icon-button"
                        type="button"
                        onClick={() => removeMetric(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <Field
                        label="数值"
                        value={metric.value}
                        onChange={(value) => updateMetricField(index, "value", value)}
                      />
                      <Field
                        label="标题"
                        value={metric.label}
                        onChange={(value) => updateMetricField(index, "label", value)}
                      />
                    </div>

                    <Field
                      label="说明"
                      value={metric.detail}
                      onChange={(value) => updateMetricField(index, "detail", value)}
                      multiline
                    />
                  </div>
                ))}
              </div>
            </Panel>

            <Panel
              title="服务矩阵"
              description="控制首页服务卡片。标签可用一行一个。"
              action={
                <button className="secondary-button" type="button" onClick={addService}>
                  <Plus className="h-4 w-4" />
                  新增服务
                </button>
              }
            >
              <div className="grid gap-4">
                {content.services.map((service, index) => (
                  <div className="item-panel" key={`${service.title}-${index}`}>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="admin-chip">服务 {index + 1}</span>
                      <button
                        className="icon-button"
                        type="button"
                        onClick={() => removeService(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <Field
                      label="服务标题"
                      value={service.title}
                      onChange={(value) => updateServiceField(index, "title", value)}
                    />

                    <Field
                      label="服务摘要"
                      value={service.summary}
                      onChange={(value) => updateServiceField(index, "summary", value)}
                      multiline
                    />

                    <Field
                      label="详细说明"
                      value={service.detail}
                      onChange={(value) => updateServiceField(index, "detail", value)}
                      multiline
                    />

                    <Field
                      label="标签（一行一个）"
                      value={arrayToLines(service.tags)}
                      onChange={(value) =>
                        updateServiceField(index, "tags", linesToArray(value))
                      }
                      multiline
                    />
                  </div>
                ))}
              </div>
            </Panel>

            <Panel
              title="品牌优势"
              description="展示为什么客户应该相信你们的专业能力。"
              action={
                <button
                  className="secondary-button"
                  type="button"
                  onClick={addDifferentiator}
                >
                  <Plus className="h-4 w-4" />
                  新增优势
                </button>
              }
            >
              <div className="grid gap-4">
                {content.differentiators.map((item, index) => (
                  <div className="item-panel" key={`${item.title}-${index}`}>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="admin-chip">优势 {index + 1}</span>
                      <button
                        className="icon-button"
                        type="button"
                        onClick={() => removeDifferentiator(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <Field
                      label="优势标题"
                      value={item.title}
                      onChange={(value) =>
                        updateDifferentiatorField(index, "title", value)
                      }
                    />

                    <Field
                      label="优势说明"
                      value={item.description}
                      onChange={(value) =>
                        updateDifferentiatorField(index, "description", value)
                      }
                      multiline
                    />
                  </div>
                ))}
              </div>
            </Panel>

            <Panel
              title="服务流程"
              description="展示品牌出海项目的推进路径。"
              action={
                <button className="secondary-button" type="button" onClick={addProcess}>
                  <Plus className="h-4 w-4" />
                  新增步骤
                </button>
              }
            >
              <div className="grid gap-4">
                {content.process.map((item, index) => (
                  <div className="item-panel" key={`${item.step}-${item.title}-${index}`}>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="admin-chip">流程 {index + 1}</span>
                      <button
                        className="icon-button"
                        type="button"
                        onClick={() => removeProcess(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-[140px_1fr]">
                      <Field
                        label="步骤编号"
                        value={item.step}
                        onChange={(value) => updateProcessField(index, "step", value)}
                      />
                      <Field
                        label="步骤标题"
                        value={item.title}
                        onChange={(value) => updateProcessField(index, "title", value)}
                      />
                    </div>

                    <Field
                      label="步骤说明"
                      value={item.description}
                      onChange={(value) =>
                        updateProcessField(index, "description", value)
                      }
                      multiline
                    />
                  </div>
                ))}
              </div>
            </Panel>

            <Panel
              title="平台、行业与咨询区"
              description="用于平台滚动区、行业覆盖区和最终咨询 CTA。"
            >
              <Field
                label="平台矩阵（一行一个）"
                value={arrayToLines(content.platforms)}
                onChange={(value) =>
                  setContent((current) => ({
                    ...current,
                    platforms: linesToArray(value),
                  }))
                }
                multiline
              />

              <Field
                label="行业覆盖（一行一个）"
                value={arrayToLines(content.sectors)}
                onChange={(value) =>
                  setContent((current) => ({
                    ...current,
                    sectors: linesToArray(value),
                  }))
                }
                multiline
              />

              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="CTA 标题"
                  value={content.cta.title}
                  onChange={(value) => updateCta("title", value)}
                />
                <Field
                  label="联系邮箱"
                  value={content.cta.email}
                  onChange={(value) => updateCta("email", value)}
                />
                <Field
                  label="鑱旂郴鐢佃瘽"
                  value={content.cta.phone}
                  onChange={(value) => updateCta("phone", value)}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="展示域名"
                  value={content.cta.domain}
                  onChange={(value) => updateCta("domain", value)}
                />
                <Field
                  label="CTA 说明"
                  value={content.cta.description}
                  onChange={(value) => updateCta("description", value)}
                  multiline
                />
              </div>

              <Field
                label="CTA 备注"
                value={content.cta.note}
                onChange={(value) => updateCta("note", value)}
                multiline
              />
            </Panel>

            {notice ? (
              <div
                className={`rounded-3xl border px-5 py-4 text-sm ${
                  notice.tone === "success"
                    ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-100"
                    : "border-rose-400/40 bg-rose-400/10 text-rose-100"
                }`}
              >
                {notice.text}
              </div>
            ) : null}

            <div className="sticky bottom-4 z-20 flex justify-end">
              <button className="primary-button" type="submit" disabled={isSaving}>
                <Save className="h-4 w-4" />
                {isSaving ? "保存中..." : "保存站点内容"}
              </button>
            </div>
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="admin-panel flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <span className="admin-chip">LEADS</span>
                    <h2 className="mt-4 font-display text-3xl font-semibold text-white">
                      咨询线索
                    </h2>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-white/64">
                      这里集中查看官网提交的预约和咨询表单，方便团队统一跟进。
                    </p>
                  </div>

                  <button
                    className="secondary-button"
                    type="button"
                    onClick={() => void refreshLeads()}
                    disabled={isRefreshingLeads}
                  >
                    <RefreshCw
                      className={`h-4 w-4 ${isRefreshingLeads ? "animate-spin" : ""}`}
                    />
                    {isRefreshingLeads ? "刷新中..." : "刷新线索"}
                  </button>
                </div>

                <div className="space-y-6">
            <Panel
              title="官网咨询线索"
              description="来自前台表单的咨询需求，方便你快速跟进。"
            >
              <div className="flex justify-end">
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => void refreshLeads()}
                  disabled={isRefreshingLeads}
                >
                  <RefreshCw
                    className={`h-4 w-4 ${isRefreshingLeads ? "animate-spin" : ""}`}
                  />
                  {isRefreshingLeads ? "刷新中..." : "刷新线索"}
                </button>
              </div>

              <label className="field-shell">
                <span className="field-label">搜索线索</span>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
                  <input
                    className="field-input pl-11"
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                    placeholder="搜索公司、联系人、市场或服务需求"
                  />
                </div>
              </label>

              <div className="space-y-4">
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <article className="item-panel" key={lead.id}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-lg font-semibold text-white">
                            {lead.companyName}
                          </p>
                          <p className="mt-1 text-sm text-white/55">
                            {lead.contactName} / {lead.contact}
                          </p>
                        </div>
                        <span className="admin-chip whitespace-nowrap">
                          {formatLeadDate(lead.createdAt)}
                        </span>
                      </div>

                      <div className="mt-4 grid gap-3 text-sm text-white/72">
                        <p>
                          <span className="text-white">目标市场：</span>
                          {lead.targetMarket}
                        </p>
                        <p>
                          <span className="text-white">服务需求：</span>
                          {lead.serviceNeed}
                        </p>
                        <p className="leading-7 text-white/78">{lead.message}</p>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="item-panel flex flex-col items-center justify-center gap-3 py-10 text-center text-white/60">
                    <Inbox className="h-7 w-7" />
                    <p>暂时没有匹配的咨询线索。</p>
                  </div>
                )}
              </div>
                  </Panel>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function Panel({
  title,
  description,
  children,
  action,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="admin-panel space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-white">
            {title}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-white/65">
            {description}
          </p>
        </div>
        {action ? <div>{action}</div> : null}
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <label className="field-shell">
      <span className="field-label">{label}</span>
      {multiline ? (
        <textarea
          className="field-input min-h-28 resize-y"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          className="field-input"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

function SummaryCard({
  title,
  value,
  detail,
}: {
  title: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="admin-panel">
      <p className="text-sm uppercase tracking-[0.28em] text-white/42">{title}</p>
      <p className="mt-3 font-display text-4xl font-semibold text-white">{value}</p>
      <p className="mt-3 text-sm leading-7 text-white/62">{detail}</p>
    </div>
  );
}
