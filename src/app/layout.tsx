import type { Metadata, Viewport } from "next";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vmbrands.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "姜生品牌咨询（深圳）有限公司 | VM Brands",
    template: "%s | VM Brands",
  },
  description:
    "品牌出海咨询、品牌体系建立、VI 设计、官网建设、内容与视频制作、平台代运营、海外社媒运营与全球展会服务。 VM Brands provides brand globalization consulting, identity systems, websites, content, video, marketplace operations, social media, and exhibition delivery.",
  keywords: [
    "品牌出海咨询",
    "品牌体系建立",
    "品牌VI设计",
    "品牌官网建设",
    "海外社媒运营",
    "展会服务",
    "brand globalization consulting",
    "brand system development",
    "brand website development",
    "social media operations",
    "exhibition services",
    "VM Brands",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "姜生品牌咨询（深圳）有限公司 | VM Brands",
    description:
      "从品牌战略、视觉系统、官网、内容到平台、社媒和展会执行，VM Brands 以一体化方式推动品牌全球化落地。",
    siteName: "VM Brands",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "姜生品牌咨询（深圳）有限公司 | VM Brands",
    description:
      "Integrated brand globalization consulting across strategy, identity, websites, content, social media, marketplaces, and exhibitions.",
  },
  alternates: {
    canonical: "/",
  },
  applicationName: "VM Brands",
  category: "business",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0d1b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
