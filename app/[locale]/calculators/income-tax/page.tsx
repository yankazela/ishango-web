"use client";

import { Globe2, Shield, RefreshCw } from "lucide-react";
import { useTranslations } from 'next-intl';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { IncomeTaxCalculator } from "@/components/income-tax-calculator";
import { Badge } from "@/components/ui/badge";

const IncomeTaxPage = () => {
	const t = useTranslations('IncomeTaxCalculator');

	return (
		<div className="min-h-screen bg-background">
			<Header />

			<main className="pt-24 pb-20">
				<section className="relative overflow-hidden">
					<div className="absolute inset-0 -z-10">
						<div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-accent/25 via-accent/10 to-transparent blur-3xl" />
						<div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-teal-400/15 via-emerald-300/10 to-transparent blur-3xl" />
					</div>

					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
						<div className="text-center max-w-3xl mx-auto mb-12">
							<Badge variant="secondary" className="mb-4">
								<Globe2 className="h-3 w-3 mr-1" />
								{t('COUNTRIES_SUPPORTED')}
							</Badge>
							<h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-4 text-balance">
								{t('INCOME_TAX_CALCULATOR')}
							</h1>
							<p className="text-lg text-muted-foreground text-balance">
								{t('INCOME_TAX_DESCRIPTION')}
							</p>
						</div>

						{/* Features */}
						<div className="flex flex-wrap justify-center gap-6 mb-12">
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Shield className="h-4 w-4 text-accent" />
							<span>{t('EXACT_TAX_RATES')}</span>
						</div>
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<RefreshCw className="h-4 w-4 text-accent" />
							<span>{t('REAL_TIME_CALCULATIONS')}</span>
						</div>
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Globe2 className="h-4 w-4 text-accent" />
							<span>{t('COUNTRY_SPECIFIC_RULES')}</span>
						</div>
						</div>

						{/* Calculator */}
						<IncomeTaxCalculator />
					</div>
				</section>

				{/* Info Section */}
				<section className="py-16 border-t border-border">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="grid md:grid-cols-3 gap-8">
						<div>
							<h3 className="text-lg font-semibold text-foreground mb-2">
							{t('PROGRESSIVE_TAX_SYSTEM')}
							</h3>
							<p className="text-sm text-muted-foreground">
							{t('PROGRESSIVE_TAX_SYSTEM_DESC')}
							</p>
						</div>
						<div>
							<h3 className="text-lg font-semibold text-foreground mb-2">
							{t('STANDARD_DEDUCTIONS')}
							</h3>
							<p className="text-sm text-muted-foreground">
							{t('STANDARD_DEDUCTIONS_DESC')}
							</p>
						</div>
						<div>
							<h3 className="text-lg font-semibold text-foreground mb-2">
							{t('EFFECTIVE_VS_MARGINAL_RATE')}
							</h3>
							<p className="text-sm text-muted-foreground">
							{t('EFFECTIVE_VS_MARGINAL_RATE_DESC')}
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

export default IncomeTaxPage;
