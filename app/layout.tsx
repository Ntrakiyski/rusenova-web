import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppLayout from "./components/AppLayout";

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Gloria Rusenova",
  "jobTitle": "Product Design & Machine Learning Engineer",
  "description": "Building intelligent systems that bridge machine learning and user experience. 9+ years designing products that impact 2M+ users.",
  "url": "https://gloriarusenova.com",
  "sameAs": [
    "https://www.linkedin.com/in/gloriarusenova/",
    "https://github.com/gloriarusenova"
  ],
  "knowsAbout": [
    "Machine Learning Engineering",
    "Product Design",
    "Data Science",
    "AI Integration",
    "UX Design",
    "User Experience"
  ],
  "hasOccupation": [
    {
      "@type": "Occupation",
      "name": "Product Designer",
      "occupationLocation": {
        "@type": "Country",
        "name": "Bulgaria"
      }
    },
    {
      "@type": "Occupation",
      "name": "Machine Learning Engineer",
      "occupationLocation": {
        "@type": "Country",
        "name": "Bulgaria"
      }
    }
  ],
  "alumniOf": [
    {
      "@type": "Organization",
      "name": "Tide"
    },
    {
      "@type": "Organization",
      "name": "Telenor"
    },
    {
      "@type": "Organization",
      "name": "EPAM"
    },
    {
      "@type": "Organization",
      "name": "Mentormate"
    }
  ]
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gloriarusenova.com'),
  title: "Gloria Rusenova | Product Design & Machine Learning Engineer",
  description: "Building intelligent systems that bridge machine learning and user experience. 9+ years designing products that impact 2M+ users. Specializing in AI/ML solutions and product design.",
  keywords: ["product design", "machine learning", "AI engineer", "UX design", "data science", "portfolio", "Gloria Rusenova"],
  authors: [{ name: "Gloria Rusenova" }],
  creator: "Gloria Rusenova",
  publisher: "Gloria Rusenova",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gloriarusenova.com',
    title: 'Gloria Rusenova | Product Design & Machine Learning Engineer',
    description: 'Building intelligent systems that bridge machine learning and user experience. 9+ years designing products that impact 2M+ users.',
    siteName: 'Gloria Rusenova Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gloria Rusenova - Product Design & Machine Learning Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gloria Rusenova | Product Design & Machine Learning Engineer',
    description: 'Building intelligent systems that bridge machine learning and user experience. 9+ years designing products that impact 2M+ users.',
    images: ['/og-image.png'],
    creator: '@gloriarusenova',
  },
  alternates: {
    canonical: 'https://gloriarusenova.com',
  },
  category: 'portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <script defer src="https://analytics.worfklow.org/script.js" data-website-id="5118218e-7a5d-4f5a-97f7-4a041b67f0ee"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
