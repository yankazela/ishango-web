"use client";
import { useClerk } from '@clerk/nextjs'
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "History", href: "/dashboard/history", icon: History },
    { name: "Comparison", href: "/dashboard/comparison", icon: Scale },
];

import { History, Scale } from "lucide-react";

const calculators = [
    { name: "Loan", href: "/calculators/loan", icon: CreditCard },
    { name: "Income Tax", href: "/calculators/income-tax", icon: Landmark },
    { name: "Corporate Tax", href: "/calculators/corporate-tax", icon: Building2 },
    { name: "Mortgage", href: "/calculators/mortgage", icon: Home },
    { name: "Import Tax & Duties", href: "/calculators/import-tax", icon: PackageSearch },
];

const secondaryNav = [
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
    { name: "Help & Support", href: "/dashboard/help", icon: HelpCircle },
];

export function DashboardSidebar() {
    const t = useTranslations("DashboardSidebar");
    const locale = useLocale();
    const { signOut } = useClerk()
    const pathname = usePathname();
    const [calculatorsOpen, setCalculatorsOpen] = useState(true);

    const handleSignOut = () => {
        signOut();
        window.location.href = `/${locale}`
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
                        CalcGlobal
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {/* Main Navigation */}
                {navigation.map((item) => {
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
                                Calculators
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
                        {calculators.map((item) => {
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
                {secondaryNav.map((item) => {
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
                        JD
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                            John Doe
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                            john@example.com
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
                    Sign out
                </Button>
            </div>
        </aside>
    );
}
