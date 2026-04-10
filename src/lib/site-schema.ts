import { z } from "zod";

const nonEmptyText = z.string().trim().min(1);
const shortText = z.string().trim().min(1).max(120);
const bodyText = z.string().trim().min(1).max(1000);

export const metricSchema = z.object({
  value: shortText.max(24),
  label: shortText.max(60),
  detail: bodyText.max(180),
});

export const serviceSchema = z.object({
  title: shortText.max(60),
  summary: bodyText.max(180),
  detail: bodyText.max(240),
  tags: z.array(shortText.max(30)).min(1).max(6),
});

export const pairSchema = z.object({
  title: shortText.max(60),
  description: bodyText.max(220),
});

export const processSchema = z.object({
  step: shortText.max(8),
  title: shortText.max(60),
  description: bodyText.max(220),
});

export const siteContentSchema = z.object({
  updatedAt: nonEmptyText,
  site: z.object({
    companyName: shortText.max(80),
    brandName: shortText.max(40),
    domain: shortText.max(80),
    description: bodyText.max(240),
  }),
  hero: z.object({
    eyebrow: shortText.max(80),
    title: bodyText.max(80),
    subtitle: bodyText.max(120),
    description: bodyText.max(360),
    primaryCta: shortText.max(40),
    secondaryCta: shortText.max(40),
    highlights: z.array(shortText.max(40)).min(2).max(8),
  }),
  founder: z.object({
    name: shortText.max(24),
    title: shortText.max(60),
    summary: bodyText.max(240),
    bio: bodyText.max(280),
    teamCaption: bodyText.max(180),
    credentials: z.array(bodyText.max(120)).min(2).max(6),
  }),
  metrics: z.array(metricSchema).min(2).max(8),
  services: z.array(serviceSchema).min(4).max(12),
  differentiators: z.array(pairSchema).min(2).max(8),
  process: z.array(processSchema).min(3).max(8),
  platforms: z.array(shortText.max(40)).min(4).max(20),
  sectors: z.array(shortText.max(40)).min(4).max(20),
  cta: z.object({
    title: shortText.max(80),
    description: bodyText.max(320),
    email: shortText.max(80),
    domain: shortText.max(80),
    note: bodyText.max(240),
  }),
});

export const leadInputSchema = z.object({
  companyName: shortText.max(80),
  contactName: shortText.max(40),
  contact: shortText.max(120),
  targetMarket: shortText.max(120),
  serviceNeed: shortText.max(120),
  message: bodyText.max(1000),
});

export const leadSchema = leadInputSchema.extend({
  id: nonEmptyText,
  createdAt: nonEmptyText,
});

export const loginSchema = z.object({
  username: shortText.max(40),
  password: shortText.max(120),
});

export type SiteContent = z.infer<typeof siteContentSchema>;
export type LeadInput = z.infer<typeof leadInputSchema>;
export type Lead = z.infer<typeof leadSchema>;
