import type { Metadata } from "next"
import { JetBrains_Mono, Open_Sans } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { cn } from "@/ui/cn"
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
      className={cn(
        `${ sans.variable } ${ mono.variable } h-full antialiased`,
      )}
    >
      <body className={cn(
        cns.base(),
        "min-h-full font-mono",
        "base",
      )}>
        <div className="root">
          <div className={"flex flex-col items-center"}>
            <Analytics />
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
