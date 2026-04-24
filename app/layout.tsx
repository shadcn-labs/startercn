import type { Metadata } from "next"

import { ActiveThemeProvider } from "@/components/active-theme"
import { Analytics } from "@/components/analytics"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { META_THEME_COLORS, siteConfig } from "@/lib/config"
import { fontVariables } from "@/lib/fonts"
import { cn } from "@/lib/utils"

import "@/styles/globals.css"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "shadcn",
    "shadcn registry",
    "shadcn components",
    "shadcn template",
    "react components",
    "component library",
    "tailwind components",
    "ui components",
    "nextjs components",
    "custom registry",
    "component registry",
    "npx shadcn add",
  ],
  category: "technology",
  classification: "Developer Tools",
  authors: [
    {
      name: "mehmetpekcan",
      url: "https://github.com/mehmetpekcan/shadcn-registry-kit",
    },
  ],
  creator: "mehmetpekcan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/opengraph-image.png`],
    creator: "@mehmetpekcan",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareSourceCode",
              name: siteConfig.name,
              description: siteConfig.description,
              url: siteConfig.url,
              codeRepository: siteConfig.links.github,
              programmingLanguage: ["TypeScript", "React", "Next.js"],
              runtimePlatform: "Node.js",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Cross-platform",
              author: {
                "@type": "Person",
                name: "mehmetpekcan",
                url: "https://github.com/mehmetpekcan",
              },
              license: "https://opensource.org/licenses/MIT",
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
                document.documentElement.classList.add('layout-fixed')
              } catch (_) {}
            `,
          }}
        />
        <meta name="theme-color" content={META_THEME_COLORS.light} />
      </head>
      <body
        className={cn(
          "text-foreground group/body overscroll-none font-sans antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]",
          fontVariables
        )}
      >
        <ThemeProvider>
          <ActiveThemeProvider>
            {children}
            <TailwindIndicator />
            <Toaster position="top-center" />
            <Analytics />
          </ActiveThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
