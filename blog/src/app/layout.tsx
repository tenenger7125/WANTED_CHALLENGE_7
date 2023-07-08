import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";

const notoSansKR = Noto_Sans_KR({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  fallback: [
    "-apple-system",
    "Malgun Gothic",
    "Apple SD Gothic Neo",
    "Roboto",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "sans-serif",
  ],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={notoSansKR.className}>{children}</body>
    </html>
  );
}