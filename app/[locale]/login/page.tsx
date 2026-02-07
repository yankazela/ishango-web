"use client";

import React, { useState, useEffect } from 'react';

import { useSession, useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Calculator,
    Eye,
    EyeOff,
    ArrowRight,
    Globe,
    Zap,
    Shield,
} from "lucide-react";

const features = [
    {
        icon: Globe,
        title: "50+ Countries Supported",
        description: "Access accurate tax and financial calculations worldwide",
    },
    {
        icon: Zap,
        title: "Real-Time Updates",
        description: "Tax rates and regulations updated automatically",
    },
    {
        icon: Shield,
        title: "Enterprise Security",
        description: "SOC 2 compliant with bank-level encryption",
    },
];

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const t = useTranslations("LoginPage");
    const locale = useLocale();

    const router = useRouter();
    const { signIn, isLoaded } = useSignIn();
    const { session } = useSession();

    useEffect(() => {
        if (session && session.status === "active") {
            router.push(`/${locale}/dashboard`);
        }
    }, [session, router, locale]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!isLoaded) return

        try {
            const result = await signIn.create({
                identifier: email,
                password,
            })

            if (result.status === 'complete') {
                router.push(`/${locale}/dashboard`)
            }
        } catch (err: any) {
            console.error(err.errors?.[0]?.message || 'Sign-in failed')
        }
    };

    const oauthSignIn = async (provider: 'oauth_google' | 'oauth_github') => {
        await signIn?.authenticateWithRedirect({
            strategy: provider,
            redirectUrl: `/${locale}/dashboard`,
            redirectUrlComplete: `/${locale}/dashboard`,
        })
    }

    return (
        <main className="min-h-screen relative overflow-hidden flex">
            {/* Background Gradients */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-accent/30 via-accent/10 to-transparent blur-3xl" />
                <div className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-teal-400/20 via-emerald-300/10 to-transparent blur-3xl" />
                <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] rounded-full bg-gradient-to-t from-teal-400/15 via-emerald-300/10 to-transparent blur-3xl" />
            </div>

            {/* Left Side - Features (Hidden on mobile) */}
            <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 xl:p-16">
                <div>
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-lg bg-foreground flex items-center justify-center">
                            <Calculator className="h-6 w-6 text-background" />
                        </div>
                        <span className="text-2xl font-semibold text-foreground">
                            CalcGlobal
                        </span>
                    </Link>
                </div>

                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl xl:text-5xl font-semibold text-foreground leading-tight text-balance">
                            Financial calculations
                        <br />
                        <span className="bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
                            made simple
                        </span>
                        </h1>
                        <p className="text-lg text-muted-foreground mt-4 max-w-md">
                            Access professional-grade calculators for taxes, loans, and
                            mortgages across 50+ countries.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {features.map((feature) => (
                        <div key={feature.title} className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                                <feature.icon className="h-5 w-5 text-accent" />
                            </div>
                            <div>
                                <h3 className="font-medium text-foreground">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <Link href="/privacy" className="hover:text-foreground transition-colors">
                        Privacy
                    </Link>
                    <Link href="/terms" className="hover:text-foreground transition-colors">
                        Terms
                    </Link>
                    <Link href="/contact" className="hover:text-foreground transition-colors">
                        Contact
                    </Link>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden mb-8 text-center">
                        <Link href="/" className="inline-flex items-center gap-2">
                        <div className="h-10 w-10 rounded-lg bg-foreground flex items-center justify-center">
                            <Calculator className="h-6 w-6 text-background" />
                        </div>
                        <span className="text-2xl font-semibold text-foreground">
                            CalcGlobal
                        </span>
                        </Link>
                    </div>

                    {/* Login Card */}
                    <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-foreground">
                                Welcome back
                            </h2>
                            <p className="text-muted-foreground mt-1">
                                Sign in to access your calculators and saved data
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                id="email"
                                type="email"
                                placeholder="john@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-11"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-accent hover:underline"
                                >
                                    Forgot password?
                                </Link>
                                </div>
                                <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="h-11 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                    ) : (
                                    <Eye className="h-4 w-4" />
                                    )}
                                </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Checkbox
                                id="remember"
                                checked={rememberMe}
                                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                                />
                                <Label
                                htmlFor="remember"
                                className="text-sm text-muted-foreground cursor-pointer"
                                >
                                Remember me for 30 days
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-11 gap-2"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                <div className="h-4 w-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                                ) : (
                                <>
                                    Sign in
                                    <ArrowRight className="h-4 w-4" />
                                </>
                                )}
                            </Button>
                        </form>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-3 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                variant="outline"
                                className="h-11 bg-transparent"
                                onClick={() => oauthSignIn('oauth_google')}
                            >
                                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                                </svg>
                                Google
                            </Button>
                            <Button
                                variant="outline"
                                className="h-11 bg-transparent"
                                onClick={() => oauthSignIn('oauth_github')}
                            >
                                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                GitHub
                            </Button>
                        </div>

                        <p className="text-center text-sm text-muted-foreground mt-8">
                            Don't have an account?{" "}
                            <Link
                                href="/get-started"
                                className="text-accent font-medium hover:underline"
                            >
                                Get started for free
                            </Link>
                        </p>
                    </div>

                    {/* Mobile Footer Links */}
                    <div className="lg:hidden flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
                        <Link href="/privacy" className="hover:text-foreground transition-colors">
                            Privacy
                        </Link>
                        <Link href="/terms" className="hover:text-foreground transition-colors">
                            Terms
                        </Link>
                        <Link href="/contact" className="hover:text-foreground transition-colors">
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
