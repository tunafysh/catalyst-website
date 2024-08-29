import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Blob from "@/components/misc/blob";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Catalyst",
  description: "A build system made in rust that is scriptable with Lua.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-primaryclr ${inter.className}`}>
        
            {children}
      

      </body>
    </html>
  );
}
