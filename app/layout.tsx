import { ClerkProvider } from "@clerk/nextjs"
import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { Analytics } from '@vercel/analytics/next'
import { ReduxProvider } from '@/app/redux-provider'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const locales = ["en", "fr", "es"];

export const metadata: Metadata = {
    title: 'CalcGlobal - Multi-Country Financial Calculators',
    description: 'Professional financial calculators for loans, mortgages, income tax, and corporate tax across 50+ countries. Make informed decisions with accurate, localized calculations.',
    generator: 'v0.app',
    icons: {
        icon: [
            {
                url: '/icon-light-32x32.png',
                media: '(prefers-color-scheme: light)',
            },
            {
                url: '/icon-dark-32x32.png',
                media: '(prefers-color-scheme: dark)',
            },
            {
                url: '/icon.svg',
                type: 'image/svg+xml',
            },
        ],
        apple: '/apple-icon.png',
    },
}

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {

    return (
        <ClerkProvider>
            <html>
                <body className={`font-sans antialiased`}>
                    <NextIntlClientProvider>
                        <ReduxProvider>
                            {children}
                            <Analytics />
                        </ReduxProvider>
                    </NextIntlClientProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}
