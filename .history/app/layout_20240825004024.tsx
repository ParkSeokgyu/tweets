import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// ## 메타데이터 수정
export const metadata: Metadata = {
  title: {
    template: "%s | Tweets",
    default: "Tweets",
  },
  description: "지금 일어나고 있는 일",
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
      </body>
    </html>
  );
}
