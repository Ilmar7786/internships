import Head from "next/head"
import type { ReactNode } from "react"

export interface SeoProps {
  title?: string
  description: string
  keywords: string
  children?: ReactNode
}

const baseTitle = "Xenforo"

export function SEO({ title, keywords, description, children }: SeoProps) {
  const titleAndDescription = title ? `${baseTitle} | ${title}` : baseTitle

  return (
    <Head>
      <title>{titleAndDescription}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {children}
    </Head>
  )
}
