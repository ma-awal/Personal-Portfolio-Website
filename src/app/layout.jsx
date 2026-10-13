import "./globals.css";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import { SITE_URL, SEO, site } from "@/config/site";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SEO.title, template: `%s | ${site.name}` },
  description: SEO.description,
  keywords: SEO.keywords,
  authors: [{ name: site.fullName }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", url: SITE_URL, siteName: `${site.name} – ${site.role}`, title: SEO.title, description: SEO.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name} – ${site.role}` }],
  },
  twitter: { card: "summary_large_image", title: SEO.title, description: SEO.description, images: ["/og.png"] },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${sora.variable}`}>
      <head>
        {/* JS off thakleo scroll-reveal er content jate dekha jay */}
        <noscript><style>{".reveal{opacity:1!important;transform:none!important}"}</style></noscript>
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
