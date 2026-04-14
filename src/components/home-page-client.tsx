"use client";

import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CheckCircle2,
  Clapperboard,
  Compass,
  FileText,
  Globe2,
  Layers3,
  Mail,
  MapPinned,
  Megaphone,
  MonitorSmartphone,
  Palette,
  Phone,
  Quote,
  Rocket,
  ShieldCheck,
  Sparkles,
  Store,
  Users,
  Workflow,
} from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import {
  getLocalizedHomeData,
  type Language,
} from "@/lib/site-localization";
import type { SiteContent } from "@/lib/site-schema";

const languageStorageKey = "vmbrands-language";

const serviceIcons: LucideIcon[] = [
  Compass,
  Layers3,
  Palette,
  MonitorSmartphone,
  FileText,
  Clapperboard,
  Store,
  Megaphone,
  MapPinned,
];

const differentiatorIcons: LucideIcon[] = [
  Sparkles,
  ShieldCheck,
  Users,
  Workflow,
];

const touchpointIcons: LucideIcon[] = [Store, Megaphone, MapPinned];

type HomePageClientProps = {
  content: SiteContent;
};

function detectPreferredLanguage(): Language {
  if (typeof window === "undefined") {
    return "zh";
  }

  const savedLanguage = window.localStorage.getItem(languageStorageKey);

  if (savedLanguage === "zh" || savedLanguage === "en") {
    return savedLanguage;
  }

  return window.navigator.language.toLowerCase().startsWith("en")
    ? "en"
    : "zh";
}

function subscribeToLanguageChange(callback: () => void) {
  const handleChange = () => callback();

  window.addEventListener("storage", handleChange);
  window.addEventListener(languageStorageKey, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(languageStorageKey, handleChange);
  };
}

function setStoredLanguage(language: Language) {
  window.localStorage.setItem(languageStorageKey, language);
  window.dispatchEvent(new Event(languageStorageKey));
}

export function HomePageClient({ content }: HomePageClientProps) {
  const language = useSyncExternalStore<Language>(
    subscribeToLanguageChange,
    detectPreferredLanguage,
    () => "zh",
  );

  const localized = getLocalizedHomeData(content, language);
  const localizedContent = localized.content;
  const copy = localized.copy;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(languageStorageKey, language);
    document.documentElement.lang = language === "en" ? "en" : "zh-CN";
    document.title = copy.documentTitle;
  }, [copy.documentTitle, language]);

  const platformOps = localizedContent.platforms.filter((item) =>
    ["Amazon", "TikTok", "Walmart"].includes(item),
  );
  const socialOps = localizedContent.platforms.filter((item) =>
    ["Instagram", "X", "Facebook", "Lemon7", "YouTube", "LinkedIn"].includes(
      item,
    ),
  );
  const channelOps = localizedContent.platforms.filter(
    (item) => !platformOps.includes(item) && !socialOps.includes(item),
  );

  const touchpointItems = [platformOps, socialOps, channelOps];
  const serviceOptions = localizedContent.services.map((service) => service.title);

  return (
    <main className="relative overflow-hidden">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/75 backdrop-blur-xl">
        <div className="section-content flex min-h-20 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="brand-orb" />
            <div>
              <p className="font-display text-lg font-semibold text-white">
                {localizedContent.site.brandName}
              </p>
              <p className="text-xs uppercase tracking-[0.28em] text-white/45">
                {localizedContent.site.domain}
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-white/68 lg:flex">
            <a href="#services" className="nav-link">
              {copy.nav.services}
            </a>
            <a href="#advantages" className="nav-link">
              {copy.nav.advantages}
            </a>
            <a href="#process" className="nav-link">
              {copy.nav.process}
            </a>
            <a href="#consultation" className="nav-link">
              {copy.nav.consultation}
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div
              aria-label={copy.languageToggle.label}
              className="lang-switch"
              role="group"
            >
              {(["zh", "en"] as const).map((item) => {
                const isActive = language === item;
                const label =
                  item === "zh"
                    ? copy.languageToggle.zh
                    : copy.languageToggle.en;

                return (
                  <button
                    key={item}
                    className={`lang-switch-button ${
                      isActive ? "lang-switch-button-active" : ""
                    }`}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => {
                      if (item === language) {
                        return;
                      }

                      setStoredLanguage(item);
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <a className="primary-button header-cta" href="#consultation">
              {copy.nav.cta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      <section className="section-shell hero-section">
        <div className="section-content grid gap-14 pb-20 pt-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:pt-24">
          <Reveal className="space-y-8">
            <div className="space-y-5">
              <span className="section-kicker">{localizedContent.hero.eyebrow}</span>
              <h1 className="font-display text-5xl font-semibold leading-[1.04] tracking-tight text-white sm:text-6xl xl:text-7xl">
                {localizedContent.hero.title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-white/74 sm:text-xl">
                {localizedContent.hero.subtitle}
              </p>
              <p className="max-w-3xl text-base leading-8 text-white/66 sm:text-lg">
                {localizedContent.hero.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a className="primary-button" href="#consultation">
                {localizedContent.hero.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a className="secondary-button" href="#services">
                {localizedContent.hero.secondaryCta}
              </a>
            </div>

            <div className="flex flex-wrap gap-3">
              {localizedContent.hero.highlights.map((highlight) => (
                <span className="data-pill" key={highlight}>
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  {highlight}
                </span>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {localizedContent.metrics.slice(0, 2).map((metric) => (
                <div className="glass-panel p-5" key={metric.label}>
                  <p className="font-display text-4xl font-semibold text-white">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm uppercase tracking-[0.28em] text-white/48">
                    {metric.label}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-white/64">
                    {metric.detail}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="relative" delay={120}>
            <div className="relative mx-auto w-full max-w-[780px]">
              <div className="image-stage">
                <div className="image-stage-inner">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.32),_rgba(8,10,22,0.7))]">
                    <Image
                      src="/images/jiangsheng-hero.webp"
                      alt={copy.founderImageAlt}
                      fill
                      priority
                      sizes="(min-width: 1280px) 42vw, (min-width: 768px) 48vw, 92vw"
                      className="object-cover object-top scale-[1.04] -translate-y-2 sm:-translate-y-3"
                    />
                  </div>
                </div>

                <div className="absolute right-5 top-5 hidden max-w-[250px] items-center gap-3 rounded-[1.3rem] border border-white/12 bg-[#0d1430]/88 px-4 py-4 text-sm text-white/78 shadow-[0_24px_80px_rgba(6,10,24,0.45)] backdrop-blur-xl xl:flex">
                  <Rocket className="h-5 w-5 shrink-0 text-emerald-300" />
                  <div>
                    <p className="font-semibold text-white">
                      {copy.heroBadges.projectsTitle}
                    </p>
                    <p className="mt-1 text-white/55">
                      {copy.heroBadges.projectsDescription}
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-5 left-5 hidden max-w-[250px] items-center gap-3 rounded-[1.3rem] border border-white/12 bg-[#0d1430]/88 px-4 py-4 text-sm text-white/78 shadow-[0_24px_80px_rgba(6,10,24,0.45)] backdrop-blur-xl xl:flex">
                  <BarChart3 className="h-5 w-5 shrink-0 text-violet-300" />
                  <div>
                    <p className="font-semibold text-white">
                      {copy.heroBadges.exhibitionsTitle}
                    </p>
                    <p className="mt-1 text-white/55">
                      {copy.heroBadges.exhibitionsDescription}
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-panel relative -mt-10 ml-auto max-w-[94%] p-6 sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-white/45">
                      {localizedContent.founder.title}
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-semibold text-white">
                      {localizedContent.founder.name}
                    </h2>
                  </div>
                  <Quote className="h-8 w-8 text-violet-200/70" />
                </div>

                <p className="mt-5 text-base leading-8 text-white/74">
                  {localizedContent.founder.summary}
                </p>
                <p className="mt-4 text-sm leading-7 text-white/62">
                  {localizedContent.founder.bio}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell section-band border-y border-white/10 bg-white/[0.02]">
        <div className="section-content content-drift-center grid gap-4 py-10 md:grid-cols-2 xl:grid-cols-4">
          {localizedContent.metrics.map((metric, index) => (
            <Reveal className="metric-card" delay={index * 70} key={metric.label}>
              <p className="font-display text-5xl font-semibold text-white">
                {metric.value}
              </p>
              <p className="mt-3 text-sm uppercase tracking-[0.28em] text-white/48">
                {metric.label}
              </p>
              <p className="mt-4 text-sm leading-7 text-white/64">
                {metric.detail}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell section-tint-violet" id="services">
        <div className="section-content content-drift-left py-20 lg:py-28">
          <Reveal className="max-w-4xl space-y-5">
            <span className="section-kicker">{copy.servicesSection.kicker}</span>
            <h2 className="section-title">{copy.servicesSection.title}</h2>
            <p className="section-copy">{copy.servicesSection.copy}</p>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {localizedContent.services.map((service, index) => {
              const Icon = serviceIcons[index % serviceIcons.length];

              return (
                <Reveal className="service-card" delay={index * 60} key={service.title}>
                  <div className="service-icon">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-white/72">
                    {service.summary}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-white/58">
                    {service.detail}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span className="tag-pill" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell section-tint-emerald" id="advantages">
        <div className="section-content content-drift-right grid gap-8 py-20 lg:grid-cols-[0.92fr_1.08fr] lg:py-28">
          <Reveal className="glass-panel h-full p-7 sm:p-9">
            <span className="section-kicker">{copy.advantagesSection.kicker}</span>
            <h2 className="section-title mt-5">{copy.advantagesSection.title}</h2>
            <p className="section-copy mt-5">{localizedContent.site.description}</p>
            <p className="mt-5 text-sm leading-7 text-white/62">
              {localizedContent.founder.teamCaption}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {localizedContent.sectors.map((sector) => (
                <div className="data-pill justify-start" key={sector}>
                  <BadgeCheck className="h-4 w-4 text-violet-200" />
                  {sector}
                </div>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {localizedContent.differentiators.map((item, index) => {
              const Icon = differentiatorIcons[index % differentiatorIcons.length];

              return (
                <Reveal className="advantage-card" delay={index * 80} key={item.title}>
                  <div className="service-icon">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-white/66">
                    {item.description}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell section-tint-violet" id="process">
        <div className="section-content content-drift-center py-20 lg:py-28">
          <Reveal className="max-w-4xl space-y-5">
            <span className="section-kicker">{copy.processSection.kicker}</span>
            <h2 className="section-title">{copy.processSection.title}</h2>
            <p className="section-copy">{copy.processSection.copy}</p>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-5">
            {localizedContent.process.map((item, index) => (
              <Reveal className="process-card" delay={index * 80} key={item.step}>
                <p className="font-display text-5xl font-semibold text-violet-200/78">
                  {item.step}
                </p>
                <h3 className="mt-5 font-display text-2xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/64">
                  {item.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-tint-mixed">
        <div className="section-content content-drift-left py-20 lg:py-28">
          <Reveal className="max-w-4xl space-y-5">
            <span className="section-kicker">{copy.touchpointsSection.kicker}</span>
            <h2 className="section-title">{copy.touchpointsSection.title}</h2>
            <p className="section-copy">{copy.touchpointsSection.copy}</p>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <Reveal className="glass-panel p-7 sm:p-9">
              <div className="grid gap-5 xl:grid-cols-3">
                {copy.touchpointsSection.groups.map((group, index) => {
                  const Icon = touchpointIcons[index];
                  const items = touchpointItems[index] ?? [];

                  return (
                    <div className="item-panel" key={group.title}>
                      <div className="service-icon">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-5 font-display text-2xl font-semibold text-white">
                        {group.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-white/64">
                        {group.description}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {items.map((item) => (
                          <span className="tag-pill" key={`${group.title}-${item}`}>
                            {item}
                          </span>
                        ))}
                        {items.length === 0 ? (
                          <span className="tag-pill">
                            {copy.touchpointsSection.emptyGroupItem}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm uppercase tracking-[0.28em] text-white/42">
                  {copy.touchpointsSection.mixLabel}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {localizedContent.platforms.map((platform) => (
                    <span className="platform-pill" key={platform}>
                      <Globe2 className="h-4 w-4 text-emerald-300" />
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="grid gap-5">
              <Reveal className="glass-panel p-7 sm:p-9" delay={70}>
                <p className="text-sm uppercase tracking-[0.28em] text-white/42">
                  {copy.touchpointsSection.founderInsightLabel}
                </p>
                <p className="mt-5 text-xl leading-9 text-white/82">
                  {copy.touchpointsSection.founderInsightQuote}
                </p>
                <div className="mt-7 grid gap-3">
                  {localizedContent.founder.credentials.map((item) => (
                    <div className="data-pill justify-start" key={item}>
                      <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                      {item}
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal className="grid gap-5 sm:grid-cols-2" delay={120}>
                <div className="advantage-card">
                  <Building2 className="h-6 w-6 text-violet-200" />
                  <h3 className="mt-6 font-display text-2xl font-semibold text-white">
                    {copy.touchpointsSection.companyEntityLabel}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/64">
                    {localizedContent.site.companyName}
                  </p>
                </div>
                <div className="advantage-card">
                  <Phone className="h-6 w-6 text-emerald-200" />
                  <h3 className="mt-6 font-display text-2xl font-semibold text-white">
                    {copy.touchpointsSection.businessDeskLabel}
                  </h3>
                  <p className="mt-4 font-display text-2xl font-semibold text-white">
                    {localizedContent.cta.phone}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/52">
                    {localizedContent.cta.email}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell section-tint-emerald" id="consultation">
        <div className="section-content content-drift-right grid gap-8 py-20 lg:grid-cols-[0.92fr_1.08fr] lg:py-28">
          <Reveal className="glass-panel h-full p-7 sm:p-10">
            <span className="section-kicker">{copy.consultationSection.kicker}</span>
            <h2 className="section-title mt-5">{localizedContent.cta.title}</h2>
            <p className="section-copy mt-5">{localizedContent.cta.description}</p>
            <p className="mt-5 text-sm leading-7 text-white/62">
              {localizedContent.cta.note}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="item-panel">
                <Mail className="h-5 w-5 text-emerald-200" />
                <p className="mt-5 text-sm uppercase tracking-[0.28em] text-white/42">
                  {copy.consultationSection.emailLabel}
                </p>
                <p className="mt-3 max-w-full break-all font-display text-[1.55rem] font-semibold leading-tight text-white sm:text-[1.7rem] xl:text-2xl">
                  {localizedContent.cta.email}
                </p>
              </div>
              <div className="item-panel">
                <Phone className="h-5 w-5 text-violet-200" />
                <p className="mt-5 text-sm uppercase tracking-[0.28em] text-white/42">
                  {copy.consultationSection.phoneLabel}
                </p>
                <p className="mt-3 max-w-full font-display text-[1.55rem] font-semibold leading-tight text-white sm:text-[1.7rem] xl:text-2xl">
                  {localizedContent.cta.phone}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="glass-panel p-7 sm:p-10" delay={100}>
            <ContactForm language={language} serviceOptions={serviceOptions} />
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/25">
        <div className="section-content flex flex-col gap-5 py-8 text-sm text-white/52 md:flex-row md:items-center md:justify-between">
          <p>
            {localizedContent.site.companyName} · {localizedContent.site.domain}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <a className="nav-link" href="#services">
              {copy.footer.services}
            </a>
            <a className="nav-link" href="#process">
              {copy.footer.process}
            </a>
            <a className="nav-link" href="#consultation">
              {copy.footer.consultation}
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
