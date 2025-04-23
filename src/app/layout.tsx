import type { Metadata } from "next";
import "./globals.scss";
import { QueryProvider } from "./provider/query-provider";

export const metadata: Metadata = {
  title: "WEEBUR 프론트엔드 코딩 과제",
  description: "WEEBUR 프론트엔드 코딩 과제",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
