import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import React from "react"

import '../globals.css';

export const metadata = {
    title: 'Tripy',
    description: 'A Next.js 14 Meta Tripy Application'
}

const inter = Inter({ subsets: ["latin"] })

const styles = {
    body: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    }
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${inter.className} bg-stone-950`} style={styles.body}>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    )
}