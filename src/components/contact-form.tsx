"use client";

import { useState, useTransition } from "react";

type ContactFormProps = {
  serviceOptions: string[];
};

type LeadFormState = {
  companyName: string;
  contactName: string;
  contact: string;
  targetMarket: string;
  serviceNeed: string;
  message: string;
};

type Notice =
  | {
      tone: "success" | "error";
      text: string;
    }
  | null;

function createInitialState(serviceOptions: string[]): LeadFormState {
  return {
    companyName: "",
    contactName: "",
    contact: "",
    targetMarket: "",
    serviceNeed: serviceOptions[0] ?? "品牌出海咨询",
    message: "",
  };
}

export function ContactForm({ serviceOptions }: ContactFormProps) {
  const [formState, setFormState] = useState<LeadFormState>(() =>
    createInitialState(serviceOptions),
  );
  const [notice, setNotice] = useState<Notice>(null);
  const [isPending, startTransition] = useTransition();

  function updateField(field: keyof LeadFormState, value: string) {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(null);

    startTransition(() => {
      void submitLead();
    });
  }

  async function submitLead() {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    });

    const payload = (await response.json().catch(() => null)) as
      | { message?: string }
      | null;

    if (!response.ok) {
      setNotice({
        tone: "error",
        text: payload?.message ?? "提交失败，请稍后再试。",
      });
      return;
    }

    setNotice({
      tone: "success",
      text: payload?.message ?? "已收到你的咨询需求，我们会尽快联系你。",
    });
    setFormState(createInitialState(serviceOptions));
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="field-shell">
          <span className="field-label">公司名称</span>
          <input
            className="field-input"
            name="companyName"
            value={formState.companyName}
            onChange={(event) => updateField("companyName", event.target.value)}
            placeholder="例如：某某科技 / 某某品牌"
            required
          />
        </label>

        <label className="field-shell">
          <span className="field-label">联系人</span>
          <input
            className="field-input"
            name="contactName"
            value={formState.contactName}
            onChange={(event) => updateField("contactName", event.target.value)}
            placeholder="请输入你的姓名"
            required
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="field-shell">
          <span className="field-label">联系方式</span>
          <input
            className="field-input"
            name="contact"
            value={formState.contact}
            onChange={(event) => updateField("contact", event.target.value)}
            placeholder="手机 / 邮箱 / 微信"
            required
          />
        </label>

        <label className="field-shell">
          <span className="field-label">目标市场</span>
          <input
            className="field-input"
            name="targetMarket"
            value={formState.targetMarket}
            onChange={(event) => updateField("targetMarket", event.target.value)}
            placeholder="北美 / 欧洲 / 东南亚等"
            required
          />
        </label>
      </div>

      <label className="field-shell">
        <span className="field-label">服务需求</span>
        <select
          className="field-input"
          name="serviceNeed"
          value={formState.serviceNeed}
          onChange={(event) => updateField("serviceNeed", event.target.value)}
          required
        >
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="field-shell">
        <span className="field-label">需求说明</span>
        <textarea
          className="field-input min-h-36 resize-y"
          name="message"
          value={formState.message}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="告诉我们你当前的品牌阶段、想进入的市场、要解决的官网/内容/平台/展会问题。"
          required
        />
      </label>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-white/60">
          提交后将进入后台线索池，方便顾问团队统一跟进。
        </p>
        <button className="primary-button" type="submit" disabled={isPending}>
          {isPending ? "提交中..." : "提交咨询需求"}
        </button>
      </div>

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
