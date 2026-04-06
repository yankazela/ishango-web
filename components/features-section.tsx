import { useTranslations } from "next-intl";
import {
	Calculator,
	Building2,
	Landmark,
	Home,
	Globe2,
	Shield,
	Zap,
	RefreshCw,
	PackageSearch,
} from "lucide-react";


export function FeaturesSection() {
	const t = useTranslations('Home');

	const calculatorTypes = [
		{
			icon: Landmark,
			title: t('INCOME_TAX_CALCULATOR'),
			description:
			t('INCOME_TAX_CALCULATOR_DESCRIPTION'),
		},
		{
			icon: Building2,
			title: t('CORPORATE_TAX_CALCULATOR'),
			description:
			t('CORPORATE_TAX_CALCULATOR_DESCRIPTION'),
		},
		{
			icon: Home,
			title: t('MORTGAGE_CALCULATOR'),
			description:
			t('MORTGAGE_CALCULATOR_DESCRIPTION'),
		},
		{
			icon: Calculator,
			title: t('INHERITANCE_CALCULATOR'),
			description:
			t('INHERITANCE_CALCULATOR_DESCRIPTION'),
		},
		{
			icon: PackageSearch,
			title: t('CAPITAL_GAINS_TAX_CALCULATOR'),
			description:
			t('CAPITAL_GAINS_TAX_CALCULATOR_DESCRIPTION'),
		},
	];
	
	const benefits = [
		{
			icon: Globe2,
			title: t('BENEFIT1_TITLE'),
			description:
			t('BENEFIT1_DESC'),
		},
		{
			icon: Shield,
			title: t('BENEFIT2_TITLE'),
			description:
			t('BENEFIT2_DESC'),
		},
		{
			icon: Zap,
			title: t('BENEFIT3_TITLE'),
			description:
			t('BENEFIT3_DESC'),
		},
		{
			icon: RefreshCw,
			title: t('BENEFIT4_TITLE'),
			description:
			t('BENEFIT4_DESC'),
		},
	];
	return (
		<section id="features" className="py-20 lg:py-32 bg-card">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Calculator Types */}
				<div className="text-center mb-16">
					<h2 className="text-3xl sm:text-4xl font-semibold text-foreground text-balance">
						{t('SECTION2_TITLE')}
					</h2>
					<p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
						{t('SECTION2_DESCRIPTION')}
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
					{calculatorTypes.map((calc) => (
						<div
						key={calc.title}
						className="group relative bg-background rounded-2xl border border-border p-6 hover:border-accent/50 transition-all hover:-translate-y-1"
						>
						<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent mb-4">
							<calc.icon className="h-6 w-6" />
						</div>
						<h3 className="text-lg font-semibold text-foreground">
							{calc.title}
						</h3>
						<p className="mt-2 text-sm text-muted-foreground leading-relaxed">
							{calc.description}
						</p>
						</div>
					))}
				</div>

				{/* Benefits */}
				<div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				<div>
					<h2 className="text-3xl sm:text-4xl font-semibold text-foreground text-balance">
						{t('BUILT_FOR_GLOBAL_SCALE')}
					</h2>
					<p className="mt-4 text-lg text-muted-foreground leading-relaxed">
						{t('BUILT_FOR_GLOBAL_SCALE_DESCRIPTION')}
					</p>

					<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
					{benefits.map((benefit) => (
						<div key={benefit.title} className="flex gap-4">
						<div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-accent/10 text-accent">
							<benefit.icon className="h-5 w-5" />
						</div>
						<div>
							<h4 className="font-medium text-foreground">
							{benefit.title}
							</h4>
							<p className="mt-1 text-sm text-muted-foreground">
							{benefit.description}
							</p>
						</div>
						</div>
					))}
					</div>
				</div>

				{/* Code Preview */}
				<div className="bg-foreground rounded-2xl p-6 overflow-hidden">
					<div className="flex items-center gap-2 mb-4">
					<div className="h-3 w-3 rounded-full bg-red-500" />
					<div className="h-3 w-3 rounded-full bg-yellow-500" />
					<div className="h-3 w-3 rounded-full bg-green-500" />
					</div>
					<pre className="text-sm text-background/80 font-mono overflow-x-auto">
	<code>{`// ${t('CODE_EXAMPLE_TITLE')}
	const result = await ishangEngine.incomeTax({
		country: "US",
		income: 85000,
		filingStatus: "single",
			deductions: {
				standard: true,
				retirement401k: 6000
			}
	});

	// Response
	{
		federalTax: 12548,
		stateTax: 4250,
		effectiveRate: 0.198,
		marginalRate: 0.22,
		breakdown: [...]
	}`}</code>
					</pre>
				</div>
				</div>
			</div>
		</section>
	);
}
