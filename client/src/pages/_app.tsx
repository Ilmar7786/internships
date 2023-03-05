import type { AppProps } from "next/app"
import { interFont } from "@/shared/assets/fonts"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${interFont.variable} font-inter`}>
      <Component {...pageProps} />
    </div>
  )
}
