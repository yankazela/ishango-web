"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from 'next-intl';
import { useSession } from "@clerk/nextjs"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, X, Calculator } from "lucide-react";
import { useState } from "react";

export function Header() {
  const t = useTranslations("Header");
  const { session } = useSession()
  const locale = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                <DropdownMenuItem>{t("LOAN_CALCULATOR")}</DropdownMenuItem>
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
                <DropdownMenuItem>{t("IMPORT_TAX_DUTIES_CALCULATOR")}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="#features"
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              {t("FEATURES")}
            </Link>

            <Link
              href="#pricing"
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              {t("PRICING")}
            </Link>

            <Link
              href="#countries"
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              {t("COUNTRIES")}
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
            <nav className="flex flex-col gap-4">
              <Link
                href="#calculators"
                className="text-sm font-medium text-foreground"
              >
                {t("CALCULATORS")}
              </Link>
              <Link
                href="#features"
                className="text-sm font-medium text-foreground"
              >
                {t("FEATURES")}
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-medium text-foreground"
              >
                {t("PRICING")}
              </Link>
              <Link
                href="#countries"
                className="text-sm font-medium text-foreground"
              >
                {t("COUNTRIES")}
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button variant="ghost" size="sm" className="justify-start">
                  {t("LOGIN")}
                </Button>
                <Button size="sm">{t("GET_STARTED")}</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
