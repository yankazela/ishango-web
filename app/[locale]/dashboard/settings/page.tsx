"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslations, useLocale } from "next-intl";
import { useSession } from "@clerk/react";
import { User, Building2, CreditCard, Bell, Shield } from "lucide-react";

import { RootState } from "@/store/rootStore";
import { fetchUserDetails } from "../store/slice";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

function FieldRow({ label, value }: { label: string; value?: string | null }) {
    return (
        <div className="flex flex-col gap-1 py-3">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                {label}
            </span>
            {value ? (
                <span className="text-sm text-foreground">{value}</span>
            ) : (
                <Skeleton className="h-4 w-40" />
            )}
        </div>
    );
}

export default function SettingsPage() {
    const t = useTranslations("SettingsPage");
    const locale = useLocale();
    const dispatch = useDispatch();
    const { session } = useSession();
    const { userDetails } = useSelector((state: RootState) => state.dashboard);

    useEffect(() => {
        const email = session?.user?.primaryEmailAddress?.emailAddress;
        if (email && !userDetails.data && !userDetails.loading) {
            dispatch(fetchUserDetails({ email }));
        }
    }, [session, dispatch, userDetails.data, userDetails.loading]);

    const client = userDetails.data?.client;
    const subscription = userDetails.data?.subscription;
    const plan = userDetails.data?.plan;
    const paymentFrequency = userDetails.data?.paymentFrequency;

    return (
        <div className="p-8 space-y-8 max-w-3xl">
            <div>
                <h1 className="text-2xl font-semibold text-foreground">{t("TITLE")}</h1>
                <p className="text-sm text-muted-foreground mt-1">{t("DESCRIPTION")}</p>
            </div>

            {/* Profile */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <CardTitle className="text-base">{t("PROFILE")}</CardTitle>
                    </div>
                    <CardDescription>{t("PROFILE_DESCRIPTION")}</CardDescription>
                </CardHeader>
                <CardContent className="divide-y divide-border">
                    <FieldRow
                        label={t("FIRST_NAME")}
                        value={client?.firstName}
                    />
                    <FieldRow
                        label={t("LAST_NAME")}
                        value={client?.lastName}
                    />
                    <FieldRow
                        label={t("EMAIL")}
                        value={client?.email}
                    />
                    <FieldRow
                        label={t("PHONE")}
                        value={
                            client?.phone
                                ? `${client.countryDialCode} ${client.phone}`
                                : undefined
                        }
                    />
                    <FieldRow
                        label={t("MEMBER_SINCE")}
                        value={
                            client?.createdAt
                                ? new Date(client.createdAt).toLocaleDateString(locale, {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                  })
                                : undefined
                        }
                    />
                </CardContent>
            </Card>

            {/* Company */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <CardTitle className="text-base">{t("COMPANY")}</CardTitle>
                    </div>
                    <CardDescription>{t("COMPANY_DESCRIPTION")}</CardDescription>
                </CardHeader>
                <CardContent className="divide-y divide-border">
                    <FieldRow label={t("COMPANY_NAME")} value={client?.company} />
                    <FieldRow label={t("COMPANY_SIZE")} value={client?.companySize} />
                </CardContent>
            </Card>

            {/* Plan & Billing */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <CardTitle className="text-base">{t("PLAN_BILLING")}</CardTitle>
                    </div>
                    <CardDescription>{t("PLAN_BILLING_DESCRIPTION")}</CardDescription>
                </CardHeader>
                <CardContent className="divide-y divide-border">
                    <div className="flex flex-col gap-1 py-3">
                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                            {t("CURRENT_PLAN")}
                        </span>
                        <div className="flex items-center gap-2">
                            {plan ? (
                                <>
                                    <span className="text-sm text-foreground">{plan.description}</span>
                                    {plan.isMostPopular && (
                                        <Badge variant="secondary">{t("MOST_POPULAR")}</Badge>
                                    )}
                                    {plan.isCustomPrice && (
                                        <Badge variant="outline">{t("CUSTOM")}</Badge>
                                    )}
                                </>
                            ) : (
                                <Skeleton className="h-4 w-40" />
                            )}
                        </div>
                    </div>
                    <FieldRow
                        label={t("BILLING_CYCLE")}
                        value={paymentFrequency?.description}
                    />
                    <FieldRow
                        label={t("API_CALLS_PER_MONTH")}
                        value={
                            plan?.maxApiCalculationsPerMonth != null
                                ? plan.maxApiCalculationsPerMonth.toLocaleString()
                                : plan
                                ? t("UNLIMITED")
                                : undefined
                        }
                    />
                    <FieldRow
                        label={t("MAX_COUNTRIES")}
                        value={
                            plan?.maxCountries != null
                                ? plan.maxCountries.toLocaleString()
                                : plan
                                ? t("UNLIMITED")
                                : undefined
                        }
                    />
                    <FieldRow
                        label={t("SUBSCRIPTION_SINCE")}
                        value={
                            subscription?.startDate
                                ? new Date(subscription.startDate).toLocaleDateString(locale, {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                  })
                                : undefined
                        }
                    />
                </CardContent>
            </Card>

            {/* Security */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <CardTitle className="text-base">{t("SECURITY")}</CardTitle>
                    </div>
                    <CardDescription>{t("SECURITY_DESCRIPTION")}</CardDescription>
                </CardHeader>
                <CardContent className="divide-y divide-border">
                    <div className="flex flex-col gap-1 py-3">
                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                            {t("AUTHENTICATION")}
                        </span>
                        <div className="flex items-center gap-2">
                            {client ? (
                                <>
                                    <span className="text-sm text-foreground">
                                        {client.isSso ? t("SSO_ENABLED") : t("PASSWORD")}
                                    </span>
                                    {client.isSso && (
                                        <Badge variant="secondary">{t("SSO")}</Badge>
                                    )}
                                </>
                            ) : (
                                <Skeleton className="h-4 w-32" />
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
