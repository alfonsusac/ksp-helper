import type { Metadata } from "next"
import { Geist, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { cns } from "@/design-system"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: [ "latin" ],
})

const geistMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: [ "latin" ],
})

export const metadata: Metadata = {
  title: {
    absolute: "KSP Calculator",
    default: "KSP Calculator",
    template: "%s | KSP Calculator"
  },
  description: "Collection KSP Calculators made by the Community",
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${ geistSans.variable } ${ geistMono.variable } h-full antialiased`}
    >
      <body className={cns.bg("min-h-full")}>
        <div className="root">
          <div className={cns.text.base("flex flex-col items-center")}>
            <Analytics />
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
