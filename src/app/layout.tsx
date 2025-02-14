import type { Metadata } from "next";
import { GeistSans } from "next/font/geist";
import "./globals.css";

const geistSans = GeistSans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SG PR Calculator",
  description: "Singapore PR Application Points Calculator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geistSans.className}>{children}</body>
    </html>
  );
}