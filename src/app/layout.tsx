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
    "姜生品牌咨询（深圳）有限公司，专注品牌出海咨询、品牌体系建立、品牌 VI 设计、品牌官网建设、内容制作、视频制作、平台代运营、海外社媒运营与全球展会服务。",
  keywords: [
    "品牌出海咨询",
    "品牌体系建立",
    "品牌VI设计",
    "品牌官网建设",
    "品牌宣传内容制作",
    "品牌宣传视频制作",
    "亚马逊代运营",
    "TikTok代运营",
    "海外社媒运营",
    "展会服务",
    "姜生品牌咨询",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "姜生品牌咨询（深圳）有限公司 | VM Brands",
    description:
      "聚焦品牌出海咨询、品牌体系建立与全球传播落地，以策略、设计、官网、内容、平台与展会执行一体化推动品牌增长。",
    siteName: "VM Brands",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "姜生品牌咨询（深圳）有限公司 | VM Brands",
    description:
      "品牌出海咨询、品牌体系建立、品牌官网建设、平台运营与全球展会一体化服务。",
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
