import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Wild Paws Blog"
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s - ${siteName}`,
  },
  description:
    "Discover the fascinating world of wolves, dogs, and their evolutionary journey through engaging articles and stunning photography.",
  keywords: ["wolves", "dogs", "pets", "wildlife", "evolution", "canines", "dire wolves"],
  authors: [{ name: "mable pines", url: `${siteUrl}/about` }],
  creator: "mable pines",
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: siteName,
    description: "Discover the fascinating world of wolves, dogs, and their evolutionary journey.",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${siteName} - Wildlife and Pet Blog`,
      },
    ],
  },
 
 
 
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Theme Color */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteName,
              url: siteUrl,
              description: "Discover the fascinating world of wolves, dogs, and their evolutionary journey.",
              author: {
                "@type": "Person",
                name: "mable pines",
                jobTitle: "Wildlife Biologist",
              },
              publisher: {
                "@type": "Organization",
                name: siteName,
                url: siteUrl,
              },
            }),
          }}
        />
      </head>
      <body className="font-inter bg-gray-50 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
