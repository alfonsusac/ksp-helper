import type { Metadata } from "next"
import { Geist, Geist_Mono, Inconsolata, Inter, JetBrains_Mono, Kode_Mono, Manrope, Open_Sans, Roboto_Mono, Space_Mono, Ubuntu_Mono } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { cns } from "@/design-system"




const mono = JetBrains_Mono({
  variable: "--font-next-mono",
  subsets: [ "latin" ],
  weight: 'variable'
})

const sans = Open_Sans({
  variable: "--font-next-sans",
  subsets: [ 'latin' ]
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
      className={`${ sans.variable } ${ mono.variable } h-full antialiased`}
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
