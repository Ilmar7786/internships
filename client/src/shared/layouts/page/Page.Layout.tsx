import type { FC, ReactNode } from "react"
import { Header } from "@/shared/components/header";

export interface PageLayoutProps {
    children: ReactNode
}

export const PageLayout: FC<PageLayoutProps> = ({ children }) => {
    return (
        <>
            <Header/>
            <main className="container">
                {children}
            </main>
        </>
    )
}
