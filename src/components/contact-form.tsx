"use client";

import { useEffect, useState } from "react";

import {
  getContactFormCopy,
  type Language,
} from "@/lib/site-localization";

type ContactFormProps = {
  language: Language;
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
    serviceNeed: serviceOptions[0] ?? "",
    message: "",
  };
}

export function ContactForm({
  language,
  serviceOptions,
}: ContactFormProps) {
  const copy = getContactFormCopy(language);
  const [formState, setFormState] = useState<LeadFormState>(() =>
    createInitialState(serviceOptions),
  );
  const [notice, setNotice] = useState<Notice>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  useEffect(() => {
    setFormState((current) => ({
      ...current,
      serviceNeed: serviceOptions.includes(current.serviceNeed)
        ? current.serviceNeed
        : (serviceOptions[0] ?? ""),
    }));
  }, [serviceOptions]);

  function updateField(field: keyof LeadFormState, value: string) {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setNotice(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        setNotice({
          tone: "error",
          text:
            response.status === 400
              ? copy.validationError
              : copy.systemError,
        });
        return;
      }

      setFormState(createInitialState(serviceOptions));
      setNotice({
        tone: "success",
        text: copy.successNotice,
      });
      setIsSuccessDialogOpen(true);
    } catch {
      setNotice({
        tone: "error",
        text: copy.networkError,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="field-shell">
            <span className="field-label">{copy.labels.companyName}</span>
            <input
              className="field-input"
              name="companyName"
              value={formState.companyName}
              onChange={(event) => updateField("companyName", event.target.value)}
              placeholder={copy.placeholders.companyName}
              required
            />
          </label>

          <label className="field-shell">
            <span className="field-label">{copy.labels.contactName}</span>
            <input
              className="field-input"
              name="contactName"
              value={formState.contactName}
              onChange={(event) => updateField("contactName", event.target.value)}
              placeholder={copy.placeholders.contactName}
              required
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="field-shell">
            <span className="field-label">{copy.labels.contact}</span>
            <input
              className="field-input"
              name="contact"
              value={formState.contact}
              onChange={(event) => updateField("contact", event.target.value)}
              placeholder={copy.placeholders.contact}
              required
            />
          </label>

          <label className="field-shell">
            <span className="field-label">{copy.labels.targetMarket}</span>
            <input
              className="field-input"
              name="targetMarket"
              value={formState.targetMarket}
              onChange={(event) =>
                updateField("targetMarket", event.target.value)
              }
              placeholder={copy.placeholders.targetMarket}
              required
            />
          </label>
        </div>

        <label className="field-shell">
          <span className="field-label">{copy.labels.serviceNeed}</span>
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
          <span className="field-label">{copy.labels.message}</span>
          <textarea
            className="field-input min-h-36 resize-y"
            name="message"
            value={formState.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder={copy.placeholders.message}
            required
          />
        </label>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-white/60">{copy.helperText}</p>
          <button
            className="primary-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? copy.submitting : copy.submit}
          </button>
        </div>

        {notice ? (
          <div
            aria-live="polite"
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

      {isSuccessDialogOpen ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#040814]/78 p-4 backdrop-blur-md">
          <div
            aria-labelledby="booking-success-title"
            aria-modal="true"
            className="glass-panel w-full max-w-xl p-7 sm:p-9"
            role="dialog"
          >
            <span className="section-kicker">{copy.successDialog.kicker}</span>
            <h3
              className="mt-5 font-display text-3xl font-semibold text-white"
              id="booking-success-title"
            >
              {copy.successDialog.title}
            </h3>
            <p className="mt-5 text-base leading-8 text-white/74">
              {copy.successDialog.description}
            </p>

            <div className="mt-7 flex justify-end">
              <button
                className="primary-button"
                type="button"
                onClick={() => setIsSuccessDialogOpen(false)}
              >
                {copy.successDialog.confirm}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
