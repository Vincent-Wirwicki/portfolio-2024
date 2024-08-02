import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import MainNav from "@/layout/MainNav";

const font = Outfit({ subsets: ["latin"] });
// variable: "--font-outfit" Crimson_Pro
// const Crimson = Crimson_Pro({ subsets: ["latin"], variable: "--font-crimson" }); ${Crimson.variable}

export const metadata: Metadata = {
  title: "Vincent Wirwicki",
  description: "Vincent Wirwicki front end and creative developer from Paris",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        {/* <MainNav /> */}
        {children}
      </body>
    </html>
  );
}
