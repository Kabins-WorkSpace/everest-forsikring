import type { Metadata } from "next";
import "./globals.css";
import { appSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Everest Forsikring",
  description: "Beste forsikring i markedet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" className={`${appSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
