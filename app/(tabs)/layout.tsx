import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import TabBar from "@/components/tab-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Tweets",
    default: "Tweets에 오신것을 환영합니다.",
  },
  description: "실시간으로 사람들과 소통하고, 최신 소식을 공유하세요.s",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} max-w-screen-sm mx-auto`}>
        {children}
        <TabBar />

      </body>
    </html>
  );
}