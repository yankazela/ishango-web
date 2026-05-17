"use client";
import { useClerk } from '@clerk/react'
import { useTranslations, useLocale } from 'next-intl';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Calculator,
    Landmark,
    Home,
    Building2,
    PackageSearch,
    CreditCard,
    Settings,
    HelpCircle,
    LogOut,
    ChevronRight,
    Globe2,
    KeyRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

const navigation = (local: string, t: any) => [
    { name: t("DASHBOARD"), href: `/${local}/dashboard`, icon: LayoutDashboard },
    { name: t("API_KEYS"), href: `/${local}/dashboard/api-keys`, icon: KeyRound },
    { name: t("HISTORY"), href: `/${local}/dashboard/history`, icon: History },
    // { name: t("COMPARISON"), href: `/${local}/dashboard/comparison`, icon: Scale },
];

import { History, Scale } from "lucide-react";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/rootStore';

const calculators = (local: string, t: any) => [
    { name: t("CAPITAL_GAINS_TAX"), href: `/${local}/calculators/capital-gains-tax`, icon: CreditCard },
    { name: t("INCOME_TAX"), href: `/${local}/calculators/income-tax`, icon: Landmark },
    { name: t("CORPORATE_TAX"), href: `/${local}/calculators/corporate-tax`, icon: Building2 },
    { name: t("MORTGAGE"), href: `/${local}/calculators/mortgage`, icon: Home },
    { name: t("INHERITANCE_TAX"), href: `/${local}/calculators/inheritance-tax`, icon: PackageSearch },
];

const secondaryNav = (local: string, t: any) => [
    { name: t("SETTINGS"), href: `/${local}/dashboard/settings`, icon: Settings },
    { name: t("HELP_SUPPORT"), href: `/${local}/dashboard/help`, icon: HelpCircle },
];

export function DashboardSidebar() {
    const t = useTranslations("DashboardPage");
    const locale = useLocale();
    const { signOut } = useClerk()
    const pathname = usePathname();
    const [calculatorsOpen, setCalculatorsOpen] = useState(true);
    const { userDetails } = useSelector((state: RootState) => state.dashboard);
    const client = userDetails?.data?.client;
    
    const handleSignOut = () => {
        const storedLocale = sessionStorage.getItem('locale');
        signOut({
            redirectUrl: `/${storedLocale || locale}`
        });
    }

    return (
        <aside className="flex flex-col w-64 border-r border-border bg-card h-screen sticky top-0">
        {/* Logo */}
            <div className="p-6 border-b border-border">
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent to-teal-600 flex items-center justify-center">
                        <Globe2 className="h-4 w-4 text-accent-foreground" />
                    </div>
                    <span className="font-semibold text-lg text-foreground">
                        Ishango Engine
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {/* Main Navigation */}
                {navigation(locale, t).map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                            isActive
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                        >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                        </Link>
                    );
                })}

                {/* Calculators Collapsible */}
                <Collapsible open={calculatorsOpen} onOpenChange={setCalculatorsOpen}>
                    <CollapsibleTrigger asChild>
                        <button className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                            <div className="flex items-center gap-3">
                                <Calculator className="h-4 w-4" />
                                {t("CALCULATORS")}
                            </div>
                            <ChevronRight
                                className={cn(
                                    "h-4 w-4 transition-transform",
                                    calculatorsOpen && "rotate-90"
                                )}
                            />
                        </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4 space-y-1 mt-1">
                        {calculators(locale, t).map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                                        isActive
                                        ? "bg-accent/10 text-accent font-medium"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                    )}
                                >
                                <item.icon className="h-4 w-4" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </CollapsibleContent>
                </Collapsible>

                {/* Divider */}
                <div className="my-4 border-t border-border" />

                {/* Secondary Navigation */}
                {secondaryNav(locale, t).map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                ? "bg-accent text-accent-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            )}
                        >
                        <item.icon className="h-4 w-4" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* User Section */}
            <div className="p-4 border-t border-border">
                <div className="flex items-center gap-3 mb-3">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-accent to-teal-600 flex items-center justify-center text-accent-foreground font-medium text-sm">
                        {client?.firstName && client?.lastName
                            ? `${client.firstName[0]}${client.lastName[0]}`
                            : ""}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                            {client?.firstName && client?.lastName
                                ? `${client.firstName} ${client.lastName}`
                                : ""}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                            {client?.email || ""}
                        </p>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
                    onClick={handleSignOut}
                >
                    <LogOut className="h-4 w-4" />
                    {t("SIGN_OUT")}
                </Button>
            </div>
        </aside>
    );
}
