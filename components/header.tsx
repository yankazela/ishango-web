"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from 'next-intl';
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "@clerk/react"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RootState } from "@/store/rootStore";
import { ChevronDown, Menu, X } from "lucide-react";
import { fetchFeatureFlagsStart } from "@/app/[locale]/store/slice";

export function Header() {
  const t = useTranslations("Header");
  const { session } = useSession()
  const locale = useLocale();
  const dispatch = useDispatch();
  const featureFlags = useSelector((state: RootState) => state.featureFlags);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pricingEnabled = featureFlags.featureFlags.data?.find(flag => flag.name === "DISPLAY_PRICING")?.isEnabled;
  const expertsEnabled = featureFlags.featureFlags.data?.find(flag => flag.name === "DISPLAY_EXPERT")?.isEnabled;

  useEffect(() => {
      dispatch(fetchFeatureFlagsStart());
  },[]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-5">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            {/* <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary"> */}
              <Image
                src="/logo.svg"
                alt="Ishango Logo"
                width={240}
                height={240}
                className="rounded"
              />
            {/* </div> */}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-accent transition-colors">
                {t("CALCULATORS")}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>
                   <Link href={`/${locale}/calculators/inheritance-tax`}>{t("INHERITANCE_CALCULATOR")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={`/${locale}/calculators/mortgage`}>{t("MORTGAGE_CALCULATOR")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={`/${locale}/calculators/income-tax`}>{t("INCOME_TAX_CALCULATOR")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={`/${locale}/calculators/corporate-tax`}>
                  {t("CORPORATE_TAX_CALCULATOR")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={`/${locale}/calculators/capital-gains-tax`}>
                  {t("CAPITAL_GAINS_TAX_CALCULATOR")}</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href={`/${locale}/docs`}
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              {t("API_DOCS")}
            </Link>
            {pricingEnabled && (
              <Link
                href="#pricing"
                className="text-sm font-medium text-foreground hover:text-accent transition-colors"
              >
                {t("PRICING")}
              </Link>
            )}
            <Link
              href={`/${locale}/countries`}
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              {t("COUNTRIES")}
            </Link>
            {expertsEnabled && (
              <Link
                href={`/${locale}/experts`}
                className="text-sm font-medium text-foreground hover:text-accent transition-colors"
              >
                {t("EXPERTS")}
              </Link>
            )}
            <Link
                href={`/${locale}/resources`}
                className="text-sm font-medium text-foreground hover:text-accent transition-colors"
              >
                {t("BLOG")}
              </Link>
          </nav>

          {/* CTA Buttons */}
          {(!session || session.status !== 'active') && (
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Link href={`/${locale}/login`}>{t("LOGIN")}</Link>
              </Button>
              <Button size="sm">
                <Link href={`/${locale}/get-started`}>{t("GET_STARTED")}</Link>
              </Button>
            </div>
          )}
          {session?.status === 'active' && (
            <div className="hidden md:flex items-center gap-4">
              <Button size="sm">
                <Link href={`/${locale}/dashboard`}>{t("DASHBOARD")}</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-1">
              <p className="px-1 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t("CALCULATORS")}
              </p>
              {[
                { href: `/${locale}/calculators/income-tax`, label: t("INCOME_TAX_CALCULATOR") },
                { href: `/${locale}/calculators/corporate-tax`, label: t("CORPORATE_TAX_CALCULATOR") },
                { href: `/${locale}/calculators/capital-gains-tax`, label: t("CAPITAL_GAINS_TAX_CALCULATOR") },
                { href: `/${locale}/calculators/inheritance-tax`, label: t("INHERITANCE_CALCULATOR") },
                { href: `/${locale}/calculators/mortgage`, label: t("MORTGAGE_CALCULATOR") },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="pl-3 py-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}

              <div className="my-2 border-t border-border" />

              <Link href={`/${locale}/countries`} className="py-2 text-sm font-medium text-foreground hover:text-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                {t("COUNTRIES")}
              </Link>
              <Link href={`/${locale}/resources`} className="py-2 text-sm font-medium text-foreground hover:text-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                {t("BLOG")}
              </Link>
              <Link href={`/${locale}/docs`} className="py-2 text-sm font-medium text-foreground hover:text-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                {t("API_DOCS")}
              </Link>
              {expertsEnabled && (
                <Link href={`/${locale}/experts`} className="py-2 text-sm font-medium text-foreground hover:text-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  {t("EXPERTS")}
                </Link>
              )}
              {pricingEnabled && (
                <Link href="#pricing" className="py-2 text-sm font-medium text-foreground hover:text-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  {t("PRICING")}
                </Link>
              )}

              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                {(!session || session.status !== 'active') ? (
                  <>
                    <Button variant="ghost" size="sm" className="justify-start" asChild>
                      <Link href={`/${locale}/login`} onClick={() => setMobileMenuOpen(false)}>{t("LOGIN")}</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={`/${locale}/get-started`} onClick={() => setMobileMenuOpen(false)}>{t("GET_STARTED")}</Link>
                    </Button>
                  </>
                ) : (
                  <Button size="sm" asChild>
                    <Link href={`/${locale}/dashboard`} onClick={() => setMobileMenuOpen(false)}>{t("DASHBOARD")}</Link>
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
