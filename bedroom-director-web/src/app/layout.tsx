import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Bedroom Director | From Bedroom to Big Screen",
  description: "Discover 156+ AI creative tools for filmmakers and content creators. Your bedroom is your studio. No Hollywood required.",
  keywords: ["AI tools", "filmmaking", "video generation", "image generation", "AI creative tools", "bedroom director"],
  authors: [{ name: "Bedroom Director" }],
  openGraph: {
    title: "Bedroom Director | From Bedroom to Big Screen",
    description: "Discover 156+ AI creative tools for filmmakers and content creators.",
    type: "website",
    locale: "en_US",
    siteName: "Bedroom Director",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bedroom Director | From Bedroom to Big Screen",
    description: "Discover 156+ AI creative tools for filmmakers and content creators.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-director-black text-screen-white antialiased`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
