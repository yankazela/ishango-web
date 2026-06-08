"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslations, useLocale } from "next-intl";
import { useSession, useUser } from "@clerk/react";
import { User, Building2, CreditCard, Bell, Shield, Eye, EyeOff, CheckCircle2 } from "lucide-react";

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
    const { user, isLoaded, isSignedIn } = useUser();
    const { userDetails } = useSelector((state: RootState) => state.dashboard);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        // const userEmail = sessionStorage.getItem("userEmail") || null;
        console.log("Attempting password change for user:", isLoaded, isSignedIn, user);
        if (!user) return;
        setPasswordError(null);
        setPasswordSuccess(false);
        if (newPassword !== confirmPassword) {
            setPasswordError(t("ERROR_PASSWORDS_MISMATCH"));
            return;
        }
        setPasswordLoading(true);
        try {
            await user.updatePassword({ currentPassword, newPassword, signOutOfOtherSessions: false });
            setPasswordSuccess(true);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err: any) {
            setPasswordError(err.errors?.[0]?.message || t("ERROR_PASSWORD_UPDATE_FAILED"));
        } finally {
            setPasswordLoading(false);
        }
    };

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

                    {/* Change password — password users only */}
                    {client && !client.isSso && (
                        <div className="py-4">
                            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                                {t("CHANGE_PASSWORD")}
                            </span>
                            <form onSubmit={handleChangePassword} className="mt-3 space-y-3 max-w-sm">
                                {passwordSuccess && (
                                    <div className="flex items-center gap-2 rounded-lg border border-teal-500/30 bg-teal-500/10 px-3 py-2 text-sm text-teal-600 dark:text-teal-400">
                                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                                        {t("PASSWORD_UPDATED")}
                                    </div>
                                )}
                                {passwordError && (
                                    <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                                        {passwordError}
                                    </div>
                                )}
                                <div className="space-y-1">
                                    <label htmlFor="current-password" className="text-xs font-medium text-foreground">
                                        {t("CURRENT_PASSWORD")}
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="current-password"
                                            type={showCurrent ? "text" : "password"}
                                            value={currentPassword}
                                            onChange={(e) => { setCurrentPassword(e.target.value); setPasswordSuccess(false); }}
                                            required
                                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pr-9 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                            placeholder={t("ENTER_CURRENT_PASSWORD")}
                                        />
                                        <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                            {showCurrent ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="new-password" className="text-xs font-medium text-foreground">
                                        {t("NEW_PASSWORD")}
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="new-password"
                                            type={showNew ? "text" : "password"}
                                            value={newPassword}
                                            onChange={(e) => { setNewPassword(e.target.value); setPasswordSuccess(false); }}
                                            required
                                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pr-9 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                            placeholder={t("ENTER_NEW_PASSWORD")}
                                        />
                                        <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                            {showNew ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="confirm-password" className="text-xs font-medium text-foreground">
                                        {t("CONFIRM_PASSWORD")}
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="confirm-password"
                                            type={showConfirm ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => { setConfirmPassword(e.target.value); setPasswordSuccess(false); }}
                                            required
                                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pr-9 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                            placeholder={t("CONFIRM_NEW_PASSWORD")}
                                        />
                                        <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                            {showConfirm ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                        </button>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={passwordLoading}
                                    className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {passwordLoading ? (
                                        <div className="h-3.5 w-3.5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                                    ) : null}
                                    {t("UPDATE_PASSWORD")}
                                </button>
                            </form>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
