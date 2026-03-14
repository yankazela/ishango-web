import { useTranslations } from "next-intl";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CapitalGainsCalculator } from "@/components/capital-gains-tax";
import { Badge } from "@/components/ui/badge";
import { Globe2, Shield, RefreshCw, TrendingUp } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Capital Gains Tax Calculator - CalcGlobal",
  description:
    "Calculate your capital gains tax on stocks, crypto, real estate, and other investments across 50+ countries. Understand short-term vs long-term rates instantly.",
};

export default function CapitalGainsPage() {
	const t = useTranslations("CapitalGainsTaxCalculator");
	return (
		<div className="min-h-screen bg-background">
			<Header />

			<main className="pt-24 pb-20">
				{/* Hero Section */}
				<section className="relative overflow-hidden">
				{/* Background Gradients */}
					<div className="absolute inset-0 -z-10">
						<div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-emerald-500/20 via-teal-400/10 to-transparent blur-3xl" />
						<div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-accent/20 via-emerald-300/10 to-transparent blur-3xl" />
						<div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full bg-gradient-to-t from-teal-400/10 to-transparent blur-3xl" />
					</div>

					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
						<div className="text-center max-w-3xl mx-auto mb-12">
						<Badge variant="secondary" className="mb-4">
							<Globe2 className="h-3 w-3 mr-1" />
							{t('COUNTRIES_SUPPORTED')}
						</Badge>
						<h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-4 text-balance">
							{t('CAPITAL_GAINS_TAX')}{" "}
							<span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent">
							{t('CALCULATOR')}
							</span>
						</h1>
						<p className="text-lg text-muted-foreground text-balance">
							Calculate taxes on your investment profits including stocks,
							cryptocurrency, real estate, and more. Compare short-term vs
							long-term rates across countries.
						</p>
						</div>

						{/* Features */}
						<div className="flex flex-wrap justify-center gap-6 mb-12">
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Shield className="h-4 w-4 text-accent" />
							<span>{t('TAX_RATE_HEADER')}</span>
						</div>
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<RefreshCw className="h-4 w-4 text-accent" />
							<span>{t('REAL_TIME_CALCULATIONS')}</span>
						</div>
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Globe2 className="h-4 w-4 text-accent" />
							<span>{t('MULTI_COUNTRY_SUPPORT')}</span>
						</div>
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<TrendingUp className="h-4 w-4 text-accent" />
							<span>{t('MULTIPLE_ASSET_TYPES')}</span>
						</div>
						</div>

						{/* Calculator */}
						<CapitalGainsCalculator />
					</div>
				</section>

				{/* Info Section */}
				<section className="py-16 border-t border-border">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="grid md:grid-cols-3 gap-8">
							<div>
								<h3 className="text-lg font-semibold text-foreground mb-2">
									{t('SHORT_TERM_VS_LONG_TERM')}
								</h3>
								<p className="text-sm text-muted-foreground">
									{t('SHORT_TERM_VS_LONG_TERM_DESC')}
								</p>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-foreground mb-2">
									{t('TAX_LOSS_HARVESTING')}
								</h3>
								<p className="text-sm text-muted-foreground">
								{t('TAX_LOSS_HARVESTING_DESC')}
								</p>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-foreground mb-2">
									{t('ANNUAL_EXEMPTIONS')}
								</h3>
								<p className="text-sm text-muted-foreground">
									{t('ANNUAL_EXEMPTIONS_DESC')}
								</p>
							</div>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
