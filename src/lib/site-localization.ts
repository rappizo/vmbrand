import type { SiteContent } from "./site-schema";

export type Language = "zh" | "en";

type HomeCopy = {
  nav: {
    services: string;
    advantages: string;
    process: string;
    consultation: string;
    cta: string;
  };
  languageToggle: {
    label: string;
    zh: string;
    en: string;
  };
  servicesSection: {
    kicker: string;
    title: string;
    copy: string;
  };
  advantagesSection: {
    kicker: string;
    title: string;
  };
  processSection: {
    kicker: string;
    title: string;
    copy: string;
  };
  touchpointsSection: {
    kicker: string;
    title: string;
    copy: string;
    groups: Array<{
      title: string;
      description: string;
    }>;
    emptyGroupItem: string;
    mixLabel: string;
    founderInsightLabel: string;
    founderInsightQuote: string;
    companyEntityLabel: string;
    businessDeskLabel: string;
  };
  consultationSection: {
    kicker: string;
    emailLabel: string;
    phoneLabel: string;
  };
  footer: {
    services: string;
    process: string;
    consultation: string;
  };
  heroBadges: {
    projectsTitle: string;
    projectsDescription: string;
    exhibitionsTitle: string;
    exhibitionsDescription: string;
  };
  founderImageAlt: string;
  documentTitle: string;
};

export type LocalizedHomeData = {
  content: SiteContent;
  copy: HomeCopy;
};

type ContactFormCopy = {
  labels: {
    companyName: string;
    contactName: string;
    contact: string;
    targetMarket: string;
    serviceNeed: string;
    message: string;
  };
  placeholders: {
    companyName: string;
    contactName: string;
    contact: string;
    targetMarket: string;
    message: string;
  };
  helperText: string;
  submit: string;
  submitting: string;
  validationError: string;
  systemError: string;
  networkError: string;
  successNotice: string;
  successDialog: {
    kicker: string;
    title: string;
    description: string;
    confirm: string;
  };
};

const chineseCopy: HomeCopy = {
  nav: {
    services: "服务矩阵",
    advantages: "核心优势",
    process: "服务流程",
    consultation: "联系咨询",
    cta: "联系咨询",
  },
  languageToggle: {
    label: "切换语言",
    zh: "中文",
    en: "EN",
  },
  servicesSection: {
    kicker: "SERVICE MATRIX",
    title: "从品牌战略到全球落地执行的一站式服务矩阵",
    copy:
      "我们把品牌出海拆解成真正可交付的模块，但最终会以一套完整品牌系统去协同推进，让策略、设计、官网、内容、平台和展会不再彼此割裂。",
  },
  advantagesSection: {
    kicker: "WHY VM BRANDS",
    title: "既做品牌，也真正把品牌放进全球商业场景里去跑",
  },
  processSection: {
    kicker: "OUR PROCESS",
    title: "围绕全球品牌增长而设计的项目推进路径",
    copy:
      "每个项目都从诊断开始，但不会停在策略报告；我们会一路推进到视觉资产、数字门户、传播内容、平台运营和展会执行。",
  },
  touchpointsSection: {
    kicker: "GLOBAL TOUCHPOINTS",
    title: "把平台、社媒、搜索与国际展会整合成统一的品牌触点矩阵",
    copy:
      "我们不把不同渠道拆成彼此孤立的执行项目，而是以统一品牌叙事、统一视觉表达和统一转化目标，去连接平台招商、社媒传播、搜索承接与线下展会触达。",
    groups: [
      {
        title: "出海平台运营",
        description: "围绕平台转化、内容结构与品牌表达同步优化。",
      },
      {
        title: "海外社媒传播",
        description: "以持续内容节奏建立品牌认知、互动和种草链路。",
      },
      {
        title: "搜索与展会触达",
        description: "结合搜索、渠道与国际展会，放大品牌触点密度。",
      },
    ],
    emptyGroupItem: "持续扩展中",
    mixLabel: "Touchpoint Mix",
    founderInsightLabel: "Founder Insight",
    founderInsightQuote:
      "“品牌出海不是把中文资料翻译成英文，而是建立一套让海外市场愿意理解、愿意信任、愿意传播、愿意转化的品牌系统。”",
    companyEntityLabel: "公司主体",
    businessDeskLabel: "商务沟通",
  },
  consultationSection: {
    kicker: "CONSULTATION",
    emailLabel: "Email",
    phoneLabel: "Phone",
  },
  footer: {
    services: "服务矩阵",
    process: "服务流程",
    consultation: "联系咨询",
  },
  heroBadges: {
    projectsTitle: "100+ 品牌出海项目",
    projectsDescription: "品牌体系、官网、平台与传播协同推进",
    exhibitionsTitle: "300+ 海外展会服务",
    exhibitionsDescription: "从预定、设计、搭建到现场执行全链协同",
  },
  founderImageAlt: "姜生，姜生品牌咨询（深圳）有限公司负责人",
  documentTitle: "姜生品牌咨询（深圳）有限公司 | VM Brands",
};

const englishCopy: HomeCopy = {
  nav: {
    services: "Services",
    advantages: "Advantages",
    process: "Process",
    consultation: "Contact",
    cta: "Contact Us",
  },
  languageToggle: {
    label: "Switch language",
    zh: "中文",
    en: "EN",
  },
  servicesSection: {
    kicker: "SERVICE MATRIX",
    title: "One integrated service matrix from brand strategy to global execution",
    copy:
      "We break overseas brand growth into clear deliverables, then reconnect strategy, identity, website, content, marketplaces, social, and exhibitions into one coordinated system.",
  },
  advantagesSection: {
    kicker: "WHY VM BRANDS",
    title: "We do not stop at branding. We help brands perform in real global markets.",
  },
  processSection: {
    kicker: "OUR PROCESS",
    title: "A delivery path designed around global brand growth",
    copy:
      "Every engagement starts with diagnosis, but it does not end with strategy slides. We carry the work forward into assets, websites, content, platforms, and exhibition execution.",
  },
  touchpointsSection: {
    kicker: "GLOBAL TOUCHPOINTS",
    title: "Unify marketplaces, social, search, and exhibitions into one global brand touchpoint system",
    copy:
      "We do not treat channels as disconnected tasks. We align them through one brand story, one visual system, and one conversion direction across marketplaces, social media, search, and offline events.",
    groups: [
      {
        title: "Marketplace Operations",
        description:
          "Align conversion, content structure, and brand expression across Amazon, TikTok Shop, Walmart, and beyond.",
      },
      {
        title: "Overseas Social Media",
        description:
          "Build awareness, engagement, and influence through a consistent cross-platform content rhythm.",
      },
      {
        title: "Search and Exhibitions",
        description:
          "Expand reach through search visibility, channel support, and high-impact international trade shows.",
      },
    ],
    emptyGroupItem: "More channels in progress",
    mixLabel: "Touchpoint Mix",
    founderInsightLabel: "Founder Insight",
    founderInsightQuote:
      '"Going global is not about translating Chinese materials into English. It is about building a brand system overseas audiences can understand, trust, share, and buy from."',
    companyEntityLabel: "Company Entity",
    businessDeskLabel: "Business Desk",
  },
  consultationSection: {
    kicker: "CONSULTATION",
    emailLabel: "Email",
    phoneLabel: "Phone",
  },
  footer: {
    services: "Services",
    process: "Process",
    consultation: "Contact",
  },
  heroBadges: {
    projectsTitle: "100+ go-global projects",
    projectsDescription:
      "Brand systems, websites, marketplaces, and communications executed in sync",
    exhibitionsTitle: "300+ exhibition projects",
    exhibitionsDescription:
      "End-to-end coordination from booking and design to build-up and on-site delivery",
  },
  founderImageAlt:
    "Mr. Jiang, founder of Jiangsheng Brand Consulting (Shenzhen) Co., Ltd.",
  documentTitle: "VM Brands | Global Brand Consulting",
};

function buildEnglishContent(content: SiteContent): SiteContent {
  const metricLabels = [
    {
      label: "Years in Brand Services",
      detail:
        "Two decades of brand strategy, identity planning, and market-facing execution for companies entering new regions.",
    },
    {
      label: "Go-Global Brand Projects",
      detail:
        "Cross-functional overseas projects covering brand systems, websites, content, platforms, and launch coordination.",
    },
    {
      label: "Global Exhibition Engagements",
      detail:
        "International exhibition support spanning booking, spatial design, booth build, and on-site delivery.",
    },
    {
      label: "Specialist Team Members",
      detail:
        "A 100+ person team across strategy, design, content, media, operations, and production delivery.",
    },
  ];

  const englishServices = [
    {
      title: "Brand Globalization Consulting",
      summary:
        "Clarify target markets, audience priorities, competitive positioning, and the brand growth path for overseas expansion.",
      detail:
        "Designed for companies preparing to go global or rebuilding fragmented overseas expression into a clear strategic direction.",
      tags: ["Market Diagnosis", "Brand Positioning", "Go-Global Roadmap"],
    },
    {
      title: "Brand System Development",
      summary:
        "Build a coherent brand architecture, messaging system, visual rules, and communication principles for global use.",
      detail:
        "Ideal for teams creating a full brand system from scratch or upgrading an existing one for international competition.",
      tags: ["Brand Architecture", "Brand Language", "System Upgrade"],
    },
    {
      title: "Brand VI Design",
      summary:
        "Create high-recognition and consistent visual assets from logo, color, and typography to practical applications.",
      detail:
        "Balances Chinese brand heritage with global readability, reproducibility, and multi-scenario adaptability.",
      tags: ["Identity System", "Visual Standards", "Asset Extension"],
    },
    {
      title: "Brand Website Development",
      summary:
        "Build an international-facing website that carries the brand narrative, supports conversion, and earns trust.",
      detail:
        "From information architecture and page strategy to frontend, backend, and conversion design, we create a real digital brand hub.",
      tags: ["Website Planning", "Frontend & Backend", "Conversion Design"],
    },
    {
      title: "Brand Content Production",
      summary:
        "Develop brand copy, visual content, campaign assets, and communication materials tailored for overseas markets.",
      detail:
        "Keeps messaging consistent across websites, social, platform storefronts, and exhibition materials while remaining persuasive.",
      tags: ["Brand Copy", "Visual Content", "Campaign Assets"],
    },
    {
      title: "Brand Video Production",
      summary:
        "Produce globally suitable video content around brand image, product selling points, and channel communication needs.",
      detail:
        "Supports brand films, product videos, social shorts, exhibition videos, and distribution-ready channel content.",
      tags: ["Brand Film", "Short Video", "Product Video"],
    },
    {
      title: "Marketplace Operations",
      summary:
        "Support overseas channels such as Amazon, TikTok Shop, and Walmart with brand-driven operational execution.",
      detail:
        "Covers storefront content, campaigns, page optimization, creative production, and platform rhythm to grow brand and sales together.",
      tags: ["Amazon", "TikTok", "Walmart"],
    },
    {
      title: "Overseas Social Media Operations",
      summary:
        "Run international brand social channels across TikTok, Instagram, X, Facebook, Lemon7, and other relevant platforms.",
      detail:
        "From account positioning and content planning to visual consistency, topic strategy, distribution, and community interaction.",
      tags: ["TikTok", "Instagram", "Facebook"],
    },
    {
      title: "Exhibition Services",
      summary:
        "Deliver one-stop support for global exhibitions, from booking and creative direction to booth build and on-site execution.",
      detail:
        "Bring the brand system into the real trade-show environment while linking brand image, traffic capture, deal-making, and follow-up communication.",
      tags: ["Booth Booking", "Spatial Design", "On-Site Delivery"],
    },
  ];

  const englishDifferentiators = [
    {
      title: "Strategy That Reaches Delivery",
      description:
        "We connect positioning, identity, website, content, platforms, and exhibitions so the brand behaves as one system instead of isolated tasks.",
    },
    {
      title: "China-to-Global Brand Translation",
      description:
        "We translate not only language, but also narrative logic, visual codes, and trust signals for overseas audiences and partners.",
    },
    {
      title: "Senior Advisory, Specialist Execution",
      description:
        "Mr. Jiang leads the strategic direction, while a 100+ person team carries design, content, media, operations, and production into action.",
    },
    {
      title: "Growth Rhythm Across Touchpoints",
      description:
        "Marketplace operations, social media, search visibility, websites, and exhibitions are planned as one growth rhythm, not parallel silos.",
    },
  ];

  const englishProcess = [
    {
      title: "Diagnose",
      description:
        "Audit the current brand stage, channel readiness, competitive environment, and market priorities before expansion.",
    },
    {
      title: "Position",
      description:
        "Define brand positioning, messaging structure, growth priorities, and the operating path for the target market.",
    },
    {
      title: "Build",
      description:
        "Develop the brand system, identity assets, website foundation, and communication materials needed for launch.",
    },
    {
      title: "Launch",
      description:
        "Activate content, marketplaces, social media, and supporting touchpoints with coordinated roll-out execution.",
    },
    {
      title: "Scale",
      description:
        "Optimize performance, expand touchpoints, and carry the brand into exhibitions, campaigns, and longer-term overseas growth.",
    },
  ];

  const englishCredentials = [
    "20 years of brand growth and brand globalization experience",
    "100+ overseas brand projects coordinated end to end",
    "300+ exhibition service projects delivered across global markets",
    "Integrated team covering strategy, design, content, media, and execution",
  ];

  const englishSectors = [
    "Consumer Electronics",
    "Smart Home",
    "Beauty & Personal Care",
    "Lifestyle Products",
    "Home & Living",
    "Fashion Accessories",
    "FMCG",
    "B2B Manufacturing",
  ];

  return {
    ...content,
    site: {
      companyName: "Jiangsheng Brand Consulting (Shenzhen) Co., Ltd.",
      brandName: content.site.brandName,
      domain: content.site.domain,
      description:
        "VM Brands helps companies build export-ready brand systems and deliver them across strategy, identity, websites, content, social media, marketplaces, and international exhibitions.",
    },
    hero: {
      eyebrow: "Brand Globalization Consulting",
      title: "Build a global brand system that can be understood, trusted, and scaled.",
      subtitle:
        "From strategic positioning and visual identity to websites, content, social media, marketplaces, and exhibitions, we help brands expand overseas with one integrated execution model.",
      description:
        "Led by Mr. Jiang with 20 years of experience, we have supported 100+ brands in overseas expansion, 300+ exhibition projects abroad, and coordinate a 100+ person specialist team for brand globalization delivery.",
      primaryCta: "Book a Consultation",
      secondaryCta: "Explore Services",
      highlights: [
        "20 Years of Brand Experience",
        "100+ Go-Global Brand Projects",
        "300+ Overseas Exhibition Projects",
        "100+ Specialist Team Members",
      ],
    },
    founder: {
      name: "Mr. Jiang",
      title: "Founder / Brand Globalization Strategist",
      summary:
        "Mr. Jiang has spent two decades helping Chinese brands turn fragmented outbound efforts into complete international brand systems.",
      bio:
        "From strategy, storytelling, and visual systems to websites, content, channel execution, and exhibitions, he works closely with teams to translate brand direction into market-facing delivery.",
      teamCaption:
        "A 100+ person cross-functional team supports strategy, design, content, websites, social media, marketplace operations, and exhibition execution.",
      credentials: content.founder.credentials.map(
        (item, index) => englishCredentials[index] ?? item,
      ),
    },
    metrics: content.metrics.map((metric, index) => ({
      value: metric.value,
      label: metricLabels[index]?.label ?? metric.label,
      detail: metricLabels[index]?.detail ?? metric.detail,
    })),
    services: content.services.map((service, index) => ({
      title: englishServices[index]?.title ?? service.title,
      summary: englishServices[index]?.summary ?? service.summary,
      detail: englishServices[index]?.detail ?? service.detail,
      tags: englishServices[index]?.tags ?? service.tags,
    })),
    differentiators: content.differentiators.map((item, index) => ({
      title: englishDifferentiators[index]?.title ?? item.title,
      description: englishDifferentiators[index]?.description ?? item.description,
    })),
    process: content.process.map((item, index) => ({
      step: item.step,
      title: englishProcess[index]?.title ?? item.title,
      description: englishProcess[index]?.description ?? item.description,
    })),
    platforms: [...content.platforms],
    sectors: content.sectors.map(
      (sector, index) => englishSectors[index] ?? sector,
    ),
    cta: {
      title: "Tell us where your brand is heading next.",
      description:
        "If you are preparing for overseas expansion, rebuilding your brand system, or aligning content, channels, and exhibitions into one growth journey, we can help shape the strategy and execute the delivery.",
      email: content.cta.email,
      phone: content.cta.phone,
      domain: content.cta.domain,
      note:
        "Submit the form and our consulting team will review your enquiry first, then contact you within 24 hours to understand your market, current stage, and delivery needs.",
    },
  };
}

export function getLocalizedHomeData(
  content: SiteContent,
  language: Language,
): LocalizedHomeData {
  return {
    content: language === "en" ? buildEnglishContent(content) : content,
    copy: language === "en" ? englishCopy : chineseCopy,
  };
}

export function getContactFormCopy(language: Language): ContactFormCopy {
  if (language === "en") {
    return {
      labels: {
        companyName: "Company",
        contactName: "Contact Name",
        contact: "Contact Details",
        targetMarket: "Target Market",
        serviceNeed: "Service Need",
        message: "Project Brief",
      },
      placeholders: {
        companyName: "Your company or brand name",
        contactName: "Your name",
        contact: "Phone / Email / WhatsApp",
        targetMarket: "North America / Europe / Southeast Asia...",
        message:
          "Tell us about your current brand stage, target market, and the website, content, marketplace, social, or exhibition challenges you want to solve.",
      },
      helperText:
        "Once submitted, your request will enter our consultation lead queue for unified follow-up.",
      submit: "Submit Consultation",
      submitting: "Submitting...",
      validationError: "Please complete the consultation form before submitting.",
      systemError:
        "The booking system is temporarily unavailable. Please try again later, or contact us directly by phone or email.",
      networkError:
        "Network connection failed. Please try again later, or contact us directly by phone or email.",
      successNotice: "Your consultation request has been submitted.",
      successDialog: {
        kicker: "BOOKING RECEIVED",
        title: "We've received your booking",
        description:
          "Mr. Jiang's team will contact you within 24 hours to understand your needs in more detail.",
        confirm: "Got it",
      },
    };
  }

  return {
    labels: {
      companyName: "公司名称",
      contactName: "联系人",
      contact: "联系方式",
      targetMarket: "目标市场",
      serviceNeed: "服务需求",
      message: "需求说明",
    },
    placeholders: {
      companyName: "例如：某某科技 / 某某品牌",
      contactName: "请输入你的姓名",
      contact: "手机 / 邮箱 / 微信",
      targetMarket: "北美 / 欧洲 / 东南亚等",
      message:
        "告诉我们你当前的品牌阶段、想进入的市场，以及希望解决的官网、内容、平台或展会问题。",
    },
    helperText: "提交后将进入后台线索池，方便顾问团队统一跟进。",
    submit: "提交咨询需求",
    submitting: "提交中...",
    validationError: "请完整填写咨询信息后再提交。",
    systemError:
      "预约系统暂时不可用，请稍后再试，或直接通过电话和邮箱联系我们。",
    networkError:
      "网络连接异常，请稍后再试，或直接通过电话和邮箱联系我们。",
    successNotice: "预约信息已提交。",
    successDialog: {
      kicker: "预约已收到",
      title: "我们已经收到你的预约",
      description:
        "姜生的团队会在24小时内联系你了解更详细的需求。",
      confirm: "知道了",
    },
  };
}
