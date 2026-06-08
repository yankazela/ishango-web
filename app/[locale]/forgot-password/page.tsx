"use client";

import React, { useState } from 'react';
import { useSignIn } from '@clerk/react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteLogo } from "@/components/ui/site-logo";
import { ArrowRight, Eye, EyeOff, ArrowLeft, CheckCircle2 } from "lucide-react";

type Step = "email" | "reset" | "done";

export default function ForgotPasswordPage() {
    const t = useTranslations("ForgotPasswordPage");
    const locale = useLocale();
    const router = useRouter();
    const { signIn, fetchStatus } = useSignIn();

    const [step, setStep] = useState<Step>("email");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isLoading = fetchStatus === "fetching";

    const handleSendCode = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!signIn) return;
        setError(null);

        const { error: createError } = await signIn.create({ identifier: email });
        if (createError) {
            setError(createError.message || t("ERROR_SEND_FAILED"));
            return;
        }

        const { error: sendError } = await signIn.resetPasswordEmailCode.sendCode();
        if (sendError) {
            setError(sendError.message || t("ERROR_SEND_FAILED"));
            return;
        }

        setStep("reset");
    };

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!signIn) return;
        if (password !== confirmPassword) {
            setError(t("ERROR_PASSWORDS_MISMATCH"));
            return;
        }
        setError(null);

        const { error: verifyError } = await signIn.resetPasswordEmailCode.verifyCode({ code });
        if (verifyError) {
            setError(verifyError.message || t("ERROR_INVALID_CODE"));
            return;
        }

        if (signIn.status !== "needs_new_password") {
            setError(t("ERROR_INVALID_CODE"));
            return;
        }

        const { error: passwordError } = await signIn.resetPasswordEmailCode.submitPassword({
            password,
            signOutOfOtherSessions: false,
        });
        if (passwordError) {
            setError(passwordError.message || t("ERROR_RESET_FAILED"));
            return;
        }

        const { error: finalizeError } = await signIn.finalize({
            navigate: async () => {
                setStep("done");
            },
        });
        if (finalizeError) {
            setError(finalizeError.message || t("ERROR_RESET_FAILED"));
        }
    };

    if (!signIn) return null;

    return (
        <main className="min-h-screen relative overflow-hidden flex">
            {/* Background Gradients */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-accent/30 via-accent/10 to-transparent blur-3xl" />
                <div className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-teal-400/20 via-emerald-300/10 to-transparent blur-3xl" />
                <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] rounded-full bg-gradient-to-t from-teal-400/15 via-emerald-300/10 to-transparent blur-3xl" />
            </div>

            {/* Left Side (hidden on mobile) */}
            <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 xl:p-16">
                <Link href="/" className="flex items-center gap-2">
                    <SiteLogo width={120} height={120} />
                </Link>
                <div className="space-y-4">
                    <h1 className="text-4xl xl:text-5xl font-semibold text-foreground leading-tight text-balance">
                        {t("LEFT_HEADING")}
                        <br />
                        <span className="bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
                            {t("LEFT_HEADING_ACCENT")}
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-md">
                        {t("LEFT_SUBHEADING")}
                    </p>
                </div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <Link href="/privacy" className="hover:text-foreground transition-colors">{t("PRIVACY")}</Link>
                    <Link href="/terms" className="hover:text-foreground transition-colors">{t("TERMS")}</Link>
                    <Link href="/contact" className="hover:text-foreground transition-colors">{t("CONTACT")}</Link>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden mb-8 text-center">
                        <Link href="/" className="inline-flex items-center gap-2">
                            <SiteLogo width={100} height={100} />
                        </Link>
                    </div>

                    <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">

                        {/* Step: Email */}
                        {step === "email" && (
                            <>
                                <div className="mb-8">
                                    <h2 className="text-2xl font-semibold text-foreground">{t("HEADING_EMAIL")}</h2>
                                    <p className="text-muted-foreground mt-1">{t("SUBHEADING_EMAIL")}</p>
                                </div>
                                <form onSubmit={handleSendCode} className="space-y-5">
                                    {error && (
                                        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                                            {error}
                                        </div>
                                    )}
                                    <div className="space-y-2">
                                        <Label htmlFor="email">{t("EMAIL_ADDRESS")}</Label>
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
                                    <Button type="submit" className="w-full h-11 gap-2" disabled={isLoading}>
                                        {isLoading ? (
                                            <div className="h-4 w-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                {t("SEND_CODE")}
                                                <ArrowRight className="h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                                <p className="text-center text-sm text-muted-foreground mt-6">
                                    <Link
                                        href={`/${locale}/login`}
                                        className="inline-flex items-center gap-1 text-accent hover:underline"
                                    >
                                        <ArrowLeft className="h-3 w-3" />
                                        {t("BACK_TO_LOGIN")}
                                    </Link>
                                </p>
                            </>
                        )}

                        {/* Step: Code + New Password */}
                        {step === "reset" && (
                            <>
                                <div className="mb-8">
                                    <h2 className="text-2xl font-semibold text-foreground">{t("HEADING_RESET")}</h2>
                                    <p className="text-muted-foreground mt-1">
                                        {t("SUBHEADING_RESET_PREFIX")} <span className="font-medium text-foreground">{email}</span>
                                    </p>
                                </div>
                                <form onSubmit={handleReset} className="space-y-5">
                                    {error && (
                                        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                                            {error}
                                        </div>
                                    )}
                                    <div className="space-y-2">
                                        <Label htmlFor="code">{t("VERIFICATION_CODE")}</Label>
                                        <Input
                                            id="code"
                                            type="text"
                                            inputMode="numeric"
                                            placeholder="123456"
                                            value={code}
                                            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                            required
                                            className="h-11 tracking-widest text-center font-mono text-lg"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password">{t("NEW_PASSWORD")}</Label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder={t("ENTER_NEW_PASSWORD")}
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
                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirm">{t("CONFIRM_PASSWORD")}</Label>
                                        <div className="relative">
                                            <Input
                                                id="confirm"
                                                type={showConfirm ? "text" : "password"}
                                                placeholder={t("CONFIRM_NEW_PASSWORD")}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                                className="h-11 pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirm(!showConfirm)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>
                                    <Button type="submit" className="w-full h-11 gap-2" disabled={isLoading}>
                                        {isLoading ? (
                                            <div className="h-4 w-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                {t("RESET_PASSWORD")}
                                                <ArrowRight className="h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                                <p className="text-center text-sm text-muted-foreground mt-6">
                                    {t("DIDNT_RECEIVE_CODE")}{" "}
                                    <button
                                        type="button"
                                        onClick={() => { setStep("email"); setError(null); setCode(""); }}
                                        className="text-accent hover:underline"
                                    >
                                        {t("RESEND")}
                                    </button>
                                </p>
                            </>
                        )}

                        {/* Step: Success */}
                        {step === "done" && (
                            <div className="text-center space-y-6 py-4">
                                <div className="flex justify-center">
                                    <CheckCircle2 className="h-16 w-16 text-teal-500" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold text-foreground">{t("HEADING_SUCCESS")}</h2>
                                    <p className="text-muted-foreground mt-2">{t("SUBHEADING_SUCCESS")}</p>
                                </div>
                                <Button className="w-full h-11 gap-2" onClick={() => router.push(`/${locale}/dashboard`)}>
                                    {t("GO_TO_DASHBOARD")}
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </main>
    );
}
