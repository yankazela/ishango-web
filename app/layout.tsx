import React from "react"
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { ReduxProvider } from '@/app/redux-provider'
import { ClerkProviderWrapper } from '@/components/clerk-provider'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
    title: 'CalcGlobal - Multi-Country Financial Calculators',
    description: 'Professional financial calculators for loans, mortgages, income tax, and corporate tax across 50+ countries. Make informed decisions with accurate, localized calculations.',
}

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {

    return (
        <html>
            <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
                <ClerkProviderWrapper>
                    <ReduxProvider>
                        {children}
                        <Analytics />
                    </ReduxProvider>
                </ClerkProviderWrapper>
            </body>
        </html>
    )
}
