"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import {
    BookOpen,
    Code2,
    FileText,
    LifeBuoy,
    Mail,
    MessageCircle,
    ExternalLink,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { useState } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const DOCS_URL = "https://docs.calcglobal.com";
const API_REFERENCE_URL = "https://docs.calcglobal.com/api-reference";
const SAMPLE_REQUESTS_URL = "https://docs.calcglobal.com/examples";
const SUPPORT_EMAIL = "support@calcglobal.com";

function FaqItem({ question, answer }: { question: string; answer: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-border last:border-0">
            <button
                className="flex w-full items-center justify-between py-4 text-sm font-medium text-foreground text-left gap-4"
                onClick={() => setOpen((v) => !v)}
            >
                <span>{question}</span>
                {open ? (
                    <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
                ) : (
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                )}
            </button>
            {open && (
                <p className="pb-4 text-sm text-muted-foreground leading-relaxed">
                    {answer}
                </p>
            )}
        </div>
    );
}

export default function HelpPage() {
    const t = useTranslations("HelpPage");
    const locale = useLocale();

    const resources = [
        {
            icon: BookOpen,
            title: t("DOCUMENTATION"),
            description: t("DOCUMENTATION_DESCRIPTION"),
            href: DOCS_URL,
            action: t("READ_DOCS"),
        },
        {
            icon: Code2,
            title: t("API_REFERENCE"),
            description: t("API_REFERENCE_DESCRIPTION"),
            href: API_REFERENCE_URL,
            action: t("VIEW_REFERENCE"),
        },
        {
            icon: FileText,
            title: t("SAMPLE_REQUESTS"),
            description: t("SAMPLE_REQUESTS_DESCRIPTION"),
            href: SAMPLE_REQUESTS_URL,
            action: t("BROWSE_EXAMPLES"),
        },
    ];

    const faqs = [
        {
            question: t("FAQ_1_Q"),
            answer: t("FAQ_1_A"),
        },
        {
            question: t("FAQ_2_Q"),
            answer: t("FAQ_2_A"),
        },
        {
            question: t("FAQ_3_Q"),
            answer: t("FAQ_3_A"),
        },
        {
            question: t("FAQ_4_Q"),
            answer: t("FAQ_4_A"),
        },
    ];

    return (
        <div className="p-8 space-y-8 max-w-3xl">
            <div>
                <h1 className="text-2xl font-semibold text-foreground">{t("TITLE")}</h1>
                <p className="text-sm text-muted-foreground mt-1">{t("DESCRIPTION")}</p>
            </div>

            {/* Resources */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {resources.map((r) => (
                    <Card key={r.title} className="flex flex-col">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2">
                                <r.icon className="h-4 w-4 text-muted-foreground" />
                                <CardTitle className="text-sm">{r.title}</CardTitle>
                            </div>
                            <CardDescription className="text-xs leading-snug">
                                {r.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="mt-auto pt-0">
                            <Button asChild variant="outline" size="sm" className="w-full gap-1">
                                <a href={r.href} target="_blank" rel="noopener noreferrer">
                                    {r.action}
                                    <ExternalLink className="h-3 w-3" />
                                </a>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* FAQ */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-muted-foreground" />
                        <CardTitle className="text-base">{t("FAQ")}</CardTitle>
                    </div>
                    <CardDescription>{t("FAQ_DESCRIPTION")}</CardDescription>
                </CardHeader>
                <CardContent>
                    {faqs.map((faq) => (
                        <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
                    ))}
                </CardContent>
            </Card>

            {/* Contact */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <LifeBuoy className="h-4 w-4 text-muted-foreground" />
                        <CardTitle className="text-base">{t("CONTACT_SUPPORT")}</CardTitle>
                    </div>
                    <CardDescription>{t("CONTACT_SUPPORT_DESCRIPTION")}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3">
                        <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                        <div className="flex flex-col gap-0.5">
                            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                                {t("EMAIL_SUPPORT")}
                            </span>
                            <a
                                href={`mailto:${SUPPORT_EMAIL}`}
                                className="text-sm text-foreground hover:underline"
                            >
                                {SUPPORT_EMAIL}
                            </a>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{t("RESPONSE_TIME")}</p>
                </CardContent>
            </Card>
        </div>
    );
}
