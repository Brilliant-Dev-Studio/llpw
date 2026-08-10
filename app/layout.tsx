import type { Metadata } from "next";
import { Poppins, Geist_Mono, Fraunces, IBM_Plex_Mono } from "next/font/google";
import SmoothScroll from "./components/SmoothScroll";
import SiteChrome from "./components/SiteChrome";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = "https://llpw-edu.com";
const siteName = "LLPW International School University";
const description =
  "LLPW International School University in Lashio, Myanmar — developing disciplined, capable, and future-ready students since 2019 through Hard Work, Discipline, and the Right Mindset.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description,
  keywords: [
    "LLPW",
    "LLPW International School",
    "Lashio school",
    "Myanmar international school",
    "Shan State education",
    "hard work discipline",
    "certificate verification",
    "student QR verification",
  ],
  authors: [{ name: siteName }],
  applicationName: siteName,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: siteName,
    description,
    locale: "en_US",
    images: [
      {
        url: "/og-share.png",
        width: 3024,
        height: 1656,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
    images: ["/og-share.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: siteName,
  alternateName: "LLPW",
  url: siteUrl,
  logo: `${siteUrl}/logo.jpg`,
  description,
  foundingDate: "2019",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lashio",
    addressRegion: "Shan State",
    addressCountry: "MM",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+959975362219",
    email: "info@llpw-edu.com",
    contactType: "admissions",
  },
  slogan: "Hard Work & Discipline",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${geistMono.variable} ${fraunces.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
