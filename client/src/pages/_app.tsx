import type { AppProps } from "next/app"
import { interFont } from "@/shared/assets/fonts"
import { CssBaseline } from "@mui/material";
import { PageLayout } from "@/shared/layouts/page";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <PageLayout className={`${interFont.variable} font-inter`}>
                <CssBaseline/>
                <Component {...pageProps} />
            </PageLayout>
        </QueryClientProvider>
    )
}
