import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/providers/ClientProviders";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bedroomdirector.com"),
  title: {
    default: "Bedroom Director | From Bedroom to Big Screen",
    template: "%s | Bedroom Director",
  },
  description: "Discover 157+ AI creative tools for filmmakers and content creators. Your bedroom is your studio. No Hollywood required.",
  keywords: [
    "AI tools",
    "filmmaking",
    "video generation",
    "image generation",
    "AI creative tools",
    "bedroom director",
    "Sora",
    "Midjourney",
    "Runway",
    "AI video",
    "AI art",
    "content creation",
  ],
  authors: [{ name: "Bedroom Director", url: "https://bedroomdirector.com" }],
  creator: "Bedroom Director",
  publisher: "Bedroom Director",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Bedroom Director | From Bedroom to Big Screen",
    description: "Discover 157+ AI creative tools for filmmakers and content creators. Your bedroom is your studio.",
    url: "https://bedroomdirector.com",
    type: "website",
    locale: "en_US",
    siteName: "Bedroom Director",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bedroom Director | From Bedroom to Big Screen",
    description: "Discover 157+ AI creative tools for filmmakers and content creators.",
    site: "@bedroomdirector",
    creator: "@bedroomdirector",
  },
  category: "technology",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark overflow-x-hidden">
      <body className={`${inter.variable} font-sans bg-director-black text-screen-white antialiased overflow-x-hidden`}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
