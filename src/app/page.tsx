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

import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

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

export default async function HomePage() {
  const content = await getSiteContent();

  const platformOps = content.platforms.filter((item) =>
    ["Amazon", "TikTok", "Walmart"].includes(item),
  );
  const socialOps = content.platforms.filter((item) =>
    ["Instagram", "X", "Facebook", "Lemon7", "YouTube", "LinkedIn"].includes(
      item,
    ),
  );
  const channelOps = content.platforms.filter(
    (item) => !platformOps.includes(item) && !socialOps.includes(item),
  );

  const touchpointGroups = [
    {
      title: "出海平台运营",
      description: "围绕平台转化、内容结构与品牌表达同步优化。",
      icon: Store,
      items: platformOps,
    },
    {
      title: "海外社媒传播",
      description: "以持续内容节奏建立品牌认知、互动和种草链路。",
      icon: Megaphone,
      items: socialOps,
    },
    {
      title: "搜索与展会触达",
      description: "结合搜索、渠道与国际展会，放大品牌触点密度。",
      icon: MapPinned,
      items: channelOps,
    },
  ];

  return (
    <main className="relative overflow-hidden">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/75 backdrop-blur-xl">
        <div className="section-content flex min-h-20 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="brand-orb" />
            <div>
              <p className="font-display text-lg font-semibold text-white">
                {content.site.brandName}
              </p>
              <p className="text-xs uppercase tracking-[0.28em] text-white/45">
                {content.site.domain}
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-white/68 lg:flex">
            <a href="#services" className="nav-link">
              服务矩阵
            </a>
            <a href="#advantages" className="nav-link">
              核心优势
            </a>
            <a href="#process" className="nav-link">
              服务流程
            </a>
            <a href="#consultation" className="nav-link">
              联系咨询
            </a>
          </nav>

          <a className="primary-button" href="#consultation">
            联系咨询
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      <section className="section-shell hero-section">
        <div className="section-content grid gap-14 pb-20 pt-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:pt-24">
          <Reveal className="space-y-8">
            <div className="space-y-5">
              <span className="section-kicker">{content.hero.eyebrow}</span>
              <h1 className="font-display text-5xl font-semibold leading-[1.04] tracking-tight text-white sm:text-6xl xl:text-7xl">
                {content.hero.title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-white/74 sm:text-xl">
                {content.hero.subtitle}
              </p>
              <p className="max-w-3xl text-base leading-8 text-white/66 sm:text-lg">
                {content.hero.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a className="primary-button" href="#consultation">
                {content.hero.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a className="secondary-button" href="#services">
                {content.hero.secondaryCta}
              </a>
            </div>

            <div className="flex flex-wrap gap-3">
              {content.hero.highlights.map((highlight) => (
                <span className="data-pill" key={highlight}>
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  {highlight}
                </span>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {content.metrics.slice(0, 2).map((metric) => (
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
                      alt="姜生，姜生品牌咨询（深圳）有限公司创始人"
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
                    <p className="font-semibold text-white">100+ 品牌出海项目</p>
                    <p className="mt-1 text-white/55">品牌体系、官网、平台与传播协同推进</p>
                  </div>
                </div>

                <div className="absolute bottom-5 left-5 hidden max-w-[250px] items-center gap-3 rounded-[1.3rem] border border-white/12 bg-[#0d1430]/88 px-4 py-4 text-sm text-white/78 shadow-[0_24px_80px_rgba(6,10,24,0.45)] backdrop-blur-xl xl:flex">
                  <BarChart3 className="h-5 w-5 shrink-0 text-violet-300" />
                  <div>
                    <p className="font-semibold text-white">300+ 海外展会服务</p>
                    <p className="mt-1 text-white/55">从预定、设计、搭建到现场执行全链协同</p>
                  </div>
                </div>
              </div>

              <div className="glass-panel relative -mt-10 ml-auto max-w-[94%] p-6 sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-white/45">
                      {content.founder.title}
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-semibold text-white">
                      {content.founder.name}
                    </h2>
                  </div>
                  <Quote className="h-8 w-8 text-violet-200/70" />
                </div>

                <p className="mt-5 text-base leading-8 text-white/74">
                  {content.founder.summary}
                </p>
                <p className="mt-4 text-sm leading-7 text-white/62">
                  {content.founder.bio}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell section-band border-y border-white/10 bg-white/[0.02]">
        <div className="section-content content-drift-center grid gap-4 py-10 md:grid-cols-2 xl:grid-cols-4">
          {content.metrics.map((metric, index) => (
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
            <span className="section-kicker">SERVICE MATRIX</span>
            <h2 className="section-title">
              从品牌战略到全球落地执行的一站式服务矩阵
            </h2>
            <p className="section-copy">
              我们把品牌出海拆解成能真正交付的模块，但最终会以一套完整品牌系统去协同推进，
              让策略、设计、官网、内容、平台和展会不再彼此割裂。
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {content.services.map((service, index) => {
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
            <span className="section-kicker">WHY VM BRANDS</span>
            <h2 className="section-title mt-5">
              既做品牌，也真正把品牌放进全球商业场景里去跑
            </h2>
            <p className="section-copy mt-5">{content.site.description}</p>
            <p className="mt-5 text-sm leading-7 text-white/62">
              {content.founder.teamCaption}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {content.sectors.map((sector) => (
                <div className="data-pill justify-start" key={sector}>
                  <BadgeCheck className="h-4 w-4 text-violet-200" />
                  {sector}
                </div>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {content.differentiators.map((item, index) => {
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
            <span className="section-kicker">OUR PROCESS</span>
            <h2 className="section-title">围绕全球品牌增长而设计的项目推进路径</h2>
            <p className="section-copy">
              每个项目都从诊断开始，但不会停在策略报告；我们会一路推进到视觉资产、
              数字门户、传播内容、平台运营和展会执行。
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-5">
            {content.process.map((item, index) => (
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
            <span className="section-kicker">GLOBAL TOUCHPOINTS</span>
            <h2 className="section-title">
              把平台、社媒、搜索与国际展会整合成统一的品牌触点矩阵
            </h2>
            <p className="section-copy">
              我们不把不同渠道拆成彼此孤立的执行项目，而是以统一品牌叙事、统一视觉表达和统一转化目标，
              去连接平台招商、社媒传播、搜索承接与线下展会触达。
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <Reveal className="glass-panel p-7 sm:p-9">
              <div className="grid gap-5 xl:grid-cols-3">
                {touchpointGroups.map((group) => {
                  const Icon = group.icon;

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
                        {group.items.map((item) => (
                          <span className="tag-pill" key={`${group.title}-${item}`}>
                            {item}
                          </span>
                        ))}
                        {group.items.length === 0 ? (
                          <span className="tag-pill">持续扩展中</span>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm uppercase tracking-[0.28em] text-white/42">
                  Touchpoint Mix
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {content.platforms.map((platform) => (
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
                  Founder Insight
                </p>
                <p className="mt-5 text-xl leading-9 text-white/82">
                  “品牌出海不是把中文资料翻译成英文，而是建立一套让海外市场愿意理解、
                  愿意信任、愿意传播、愿意转化的品牌系统。”
                </p>
                <div className="mt-7 grid gap-3">
                  {content.founder.credentials.map((item) => (
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
                    公司主体
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/64">
                    {content.site.companyName}
                  </p>
                </div>
                <div className="advantage-card">
                  <Phone className="h-6 w-6 text-emerald-200" />
                  <h3 className="mt-6 font-display text-2xl font-semibold text-white">
                    商务沟通
                  </h3>
                  <p className="mt-4 font-display text-2xl font-semibold text-white">
                    {content.cta.phone}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/52">
                    {content.cta.email}
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
            <span className="section-kicker">CONSULTATION</span>
            <h2 className="section-title mt-5">{content.cta.title}</h2>
            <p className="section-copy mt-5">{content.cta.description}</p>
            <p className="mt-5 text-sm leading-7 text-white/62">
              {content.cta.note}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="item-panel">
                <Mail className="h-5 w-5 text-emerald-200" />
                <p className="mt-5 text-sm uppercase tracking-[0.28em] text-white/42">
                  Email
                </p>
                <p className="mt-3 max-w-full break-all font-display text-[1.55rem] font-semibold leading-tight text-white sm:text-[1.7rem] xl:text-2xl">
                  {content.cta.email}
                </p>
              </div>
              <div className="item-panel">
                <Phone className="h-5 w-5 text-violet-200" />
                <p className="mt-5 text-sm uppercase tracking-[0.28em] text-white/42">
                  Phone
                </p>
                <p className="mt-3 max-w-full font-display text-[1.55rem] font-semibold leading-tight text-white sm:text-[1.7rem] xl:text-2xl">
                  {content.cta.phone}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="glass-panel p-7 sm:p-10" delay={100}>
            <ContactForm
              serviceOptions={content.services.map((service) => service.title)}
            />
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/25">
        <div className="section-content flex flex-col gap-5 py-8 text-sm text-white/52 md:flex-row md:items-center md:justify-between">
          <p>
            {content.site.companyName} · {content.site.domain}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <a className="nav-link" href="#services">
              服务矩阵
            </a>
            <a className="nav-link" href="#process">
              服务流程
            </a>
            <a className="nav-link" href="#consultation">
              联系咨询
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
