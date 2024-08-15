import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/themetoggle";
import "./globals.css";

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
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem>
            <div id="main" className="dark:bg-emerald-950 dark:text-white bg-emerald-50 text-emerald-950">

            <div id="navbar" className="fixed top-0 left-0 right-0 w-full backdrop-blur-md h-12 z-50">
              {/* <div id="themetoggle" className="absolute z-50 w-fit h-fit top-10 right-10">
                <ModeToggle/>
              </div> */}
            </div>
            {children}
            </div>
          </ThemeProvider>
      

      </body>
    </html>
  );
}
