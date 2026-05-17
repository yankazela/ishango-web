import React from "react"
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { ReduxProvider } from '@/app/redux-provider'
import { ClerkProviderWrapper } from '@/components/clerk-provider'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

const BASE_URL = 'https://calcglobal.com'

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: {
        default: 'CalcGlobal - Multi-Country Financial Calculators',
        template: '%s | CalcGlobal',
    },
    description: 'Professional financial calculators for income tax, corporate tax, mortgage, capital gains, and inheritance tax across 50+ countries. Make smarter financial decisions globally.',
    keywords: [
        'financial calculator', 'income tax calculator', 'corporate tax calculator',
        'mortgage calculator', 'capital gains tax calculator', 'inheritance tax calculator',
        'global tax calculator', 'international finance', 'tax planning',
        'multi-country calculator', 'cross-border finance',
    ],
    authors: [{ name: 'CalcGlobal', url: BASE_URL }],
    creator: 'CalcGlobal',
    publisher: 'CalcGlobal',
    openGraph: {
        type: 'website',
        siteName: 'CalcGlobal',
        title: 'CalcGlobal - Multi-Country Financial Calculators',
        description: 'Professional financial calculators for income tax, corporate tax, mortgage, capital gains, and inheritance tax across 50+ countries.',
        url: BASE_URL,
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'CalcGlobal - Multi-Country Financial Calculators',
        description: 'Professional financial calculators for income tax, corporate tax, mortgage, capital gains, and inheritance tax across 50+ countries.',
        creator: '@calcglobal',
        site: '@calcglobal',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    category: 'finance',
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
