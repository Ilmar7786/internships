import type { FC, ReactNode } from "react"
import { Header } from "@/shared/components/header";

export interface PageLayoutProps {
    children: ReactNode
    className: string
}

export const PageLayout: FC<PageLayoutProps> = ({ children, className }) => {
    return (
        <div className={className}>
            <Header/>
            <main className="container">
                {children}
            </main>
        </div>
    )
}
