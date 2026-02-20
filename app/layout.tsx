import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { ThemeProvider } from "next-themes";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "600", "800"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Countries Site",
  description: "Countries project with dark mode",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${nunito.variable}
          antialiased
          transition-colors duration-300
        `}
      >
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
              <Navbar />
          <main className="max-w-360 mx-auto px-4 md:px-6 lg:px-8">
            {children}
          </main>

        </ThemeProvider>
      </body>
    </html>
  );
}
