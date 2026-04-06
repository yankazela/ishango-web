"use client";

import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { fetchPlansStart } from "../app/[locale]/get-started/store/slice";
import { RootState } from "@/store/rootStore";

export function PricingSection() {
	const [currencyRegionCode, setCurrencyRegionCode] = useState("usd");
	const dispatch = useDispatch();
	const router = useRouter();
	const t = useTranslations("Home");
	const locale = useLocale();
	const { plans } = useSelector((state: RootState) => state.getStarted);
    
    useEffect(() => {
      	dispatch(fetchPlansStart(currencyRegionCode));
    }, [dispatch, currencyRegionCode]);

	const handlePlanSelect = (planId: string) => {
		// Navigate to the sign-up page with the selected plan ID as a query parameter
		router.push(`/${locale}/get-started?plan=${planId}`);
	}

	return (
		<section id="pricing" className="py-20 lg:py-32 bg-card">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
				<h2 className="text-3xl sm:text-4xl font-semibold text-foreground text-balance">
					{t("SECTION4_TITLE")}
				</h2>
				<p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
					{t("CHOOSE_PLAN")}
				</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{plans.items.map((plan) => (
					<div
					key={plan.id}
					className={`relative rounded-2xl border p-8 ${
						plan.isMostPopular
						? "border-accent bg-background shadow-lg scale-105"
						: "border-border bg-background"
					}`}
					>
					{plan.isMostPopular && (
						<span className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full bg-accent px-4 py-1 text-sm font-medium text-accent-foreground">
							{t("MOST_POPULAR")}
						</span>
					)}

					<div className="text-center">
						<h3 className="text-xl font-semibold text-foreground">
							{t(plan.code)}
						</h3>
						<div className="mt-4 flex items-baseline justify-center gap-1">
							{plan.isCustomPrice ? (
								<span className="text-4xl font-semibold text-foreground">{t('CUSTOM_PRICING')}</span>
							) : (
								<>
									<span className="text-4xl font-semibold text-foreground">
										{plan.currencySymbol}{plan.monthlyCost}
									</span>
									<span className="text-muted-foreground">{t("PER_MONTH")}</span>
								</>
							)}
						</div>
						<p className="mt-2 text-sm text-muted-foreground">
							{t(plan.description)}
						</p>
					</div>

					<ul className="mt-8 space-y-4">
						<li className="flex items-start gap-3">
							<Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
							<span className="text-sm text-foreground">
								{plan.maxApiCalculationsPerMonth ? `${plan.maxApiCalculationsPerMonth.toLocaleString()} ${t('CALCULATIONS_PER_MONTH')}` : t('UNLIMITED_CALCULATIONS')}
							</span>
						</li>
						<li className="flex items-start gap-3">
							<Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
							<span className="text-sm text-foreground">
								{plan.maxCountries ? `${plan.maxCountries} ${t('COUNTRIES')}` : t('ALL_COUNTRIES')}
							</span>
						</li>
						<li className="flex items-start gap-3">
							<Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
							<span className="text-sm text-foreground">
								{t(plan.apiType)}
							</span>
						</li>
					</ul>

					<Button
						className="mt-8 w-full"
						variant={plan.isMostPopular ? "default" : "outline"}
						onClick={() => handlePlanSelect(plan.id)}
					>
						{t('START_FREE_TRIAL')}
					</Button>
					</div>
				))}
				</div>
			</div>
		</section>
	);
}
