"use client";

import React, { useEffect, useMemo, useState } from "react"

import { useSignUp, useUser, useClerk, useSession } from "@clerk/nextjs"
import {
	ArrowRight,
	Check,
	Calculator,
	Landmark,
	Home,
	Building2,
	PackageSearch,
	Globe,
	Zap,
	Shield,
} from "lucide-react";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RootState } from "@/store/rootStore";
import {
	fetchCalculatorTypesStart,
	fetchPlansStart,
	submitSubscriptionStart
} from "@/app/[locale]/get-started/store/slice";
import router from "next/router";


const calculatorIcons: Record<string, React.ComponentType<any>> = {
	LOAN_CALCULATOR: Calculator,
	INCOME_TAX: Landmark,
	CORPORATE_TAX: Building2,
	MORTGAGE: Home,
	IMPORT_TAX_DUTIES: PackageSearch,
};

	const benefits = [
	{
		icon: Globe,
		title: "50+ Countries",
		description: "Access localized calculations for countries worldwide",
	},
	{
		icon: Zap,
		title: "Instant Results",
		description: "Get accurate calculations in milliseconds",
	},
	{
		icon: Shield,
		title: "Always Up-to-Date",
		description: "Tax rates and regulations updated automatically",
	},
];

const dialCodes = [
    { code: "+1", country: "US/CA" },
    { code: "+44", country: "UK" },
    { code: "+49", country: "DE" },
    { code: "+33", country: "FR" },
    { code: "+61", country: "AU" },
    { code: "+81", country: "JP" },
    { code: "+65", country: "SG" },
    { code: "+86", country: "CN" },
    { code: "+91", country: "IN" },
    { code: "+55", country: "BR" },
    { code: "+52", country: "MX" },
    { code: "+34", country: "ES" },
    { code: "+39", country: "IT" },
    { code: "+31", country: "NL" },
    { code: "+46", country: "SE" },
    { code: "+41", country: "CH" },
    { code: "+82", country: "KR" },
    { code: "+971", country: "UAE" },
    { code: "+966", country: "SA" },
    { code: "+27", country: "ZA" },
];

export default function GetStartedPage() {
	const locale = useLocale();
	const dispatch = useDispatch();
	const { user, isLoaded } = useUser();
	const { signOut } = useClerk();
	const { session } = useSession();
	const t = useTranslations("GetStarted");
	const [paymentFrequency, setPaymentFrequency] = useState<"MONTHLY" | "YEARLY">("YEARLY");
	const [currencyRegionCode, setCurrencyRegionCode] = useState("usd");
	const [password, setPassword] = useState("");
	const [verifySent, setVerifySent] = useState(false);
	const [verificationCode, setVerificationCode] = useState("");
	const [step, setStep] = useState(1);
	const { signUp } = useSignUp();
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		company: "",
		companySize: "",
		phone: "",
    	dialCode: "+1",
		selectedCalculators: [] as string[],
		selectedPlan: "",
		selectedPlanCode: "",
		agreedToTerms: false,
	});
	const { calculatorTypes, plans } = useSelector((state: RootState) => state.getStarted);

	const selectedPlanMaxCalculators = useMemo(() => {
		const selectedPlan = plans.items.find(plan => plan.id === formData.selectedPlan);
		return selectedPlan?.maxCalculators || 0;
	}, [plans.items, formData.selectedPlan]);

	useEffect(() => {
		if (session && session.status === "active") {
			router.push(`/${locale}/dashboard`);
		}
	}, [session, router, locale]);

	useEffect(() => {
		dispatch(fetchCalculatorTypesStart());
		dispatch(fetchPlansStart(currencyRegionCode));
		if (plans.items.length > 0 && !formData.selectedPlan) {
			setFormData((prev) => ({
				...prev,
				selectedPlan: plans.items.find(item => item.isMostPopular)?.id || plans.items[0].id,
				selectedPlanCode: plans.items.find(item => item.isMostPopular)?.code || plans.items[0].code,
			}))
		}
	}, [dispatch, plans.items.length, currencyRegionCode]);

	useEffect(() => {
		if (!isLoaded || !user) return
        console.log("User loaded:", user);
		setFormData((prev) => ({
			...prev,
			firstName: user.firstName || "",
			lastName: user.lastName || "",
			email: user.primaryEmailAddress?.emailAddress || "",
		}))
	}, [isLoaded, user])

	// useEffect(() => {
	// 	signOut();
	// })

	const handleCalculatorToggle = (calculatorId: string) => {
		setFormData((prev) => {
			const isCurrentlySelected = prev.selectedCalculators.includes(calculatorId);
			
			// If unchecking, allow it
			if (isCurrentlySelected) {
				return {
					...prev,
					selectedCalculators: prev.selectedCalculators.filter((id) => id !== calculatorId),
				};
			}
			
			// If checking, only allow if under the limit
			if (prev.selectedCalculators.length < selectedPlanMaxCalculators || formData.selectedPlanCode === 'ENTERPRISE') {
				return {
					...prev,
					selectedCalculators: [...prev.selectedCalculators, calculatorId],
				};
			}
			
			// Already at max, don't add
			return prev;
		});
	};

	const generatePass = (length = 9) => {
		const charset = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*";
		const values = crypto.getRandomValues(new Uint32Array(length))

		return Array.from(values, (v) => charset[v % charset.length]).join("")
	}

	const handleSubmit = async(e: React.FormEvent) => {
		e.preventDefault();
		if (step < 3) {
			setStep(step + 1);
		} else {
			// Handle form submission
			if (!user && !verifySent) {
				const generatedPassword = generatePass(12);
				setPassword(generatedPassword);
				try {
					await signUp?.create({
						firstName: formData.firstName,
						lastName: formData.lastName,
						emailAddress: formData.email,
						password: generatedPassword,
					});
	
					await signUp?.prepareEmailAddressVerification({
						strategy: "email_code",
					});

					setStep(4);

					return;
				} catch (error) {
					console.error("Error during sign up:", error);
					// log error on screen
					return;
				}

			}
			await submitData();
			console.log("Form submitted:", formData);
			setStep(4);
		}
	};

	const verifyEmail = async (code: string) => {
		try {
			const result = await signUp?.attemptEmailAddressVerification({
				code,
			})
	
			if (result?.status === "complete") {
				setVerifySent(true);
				await submitData();
			}
		} catch (error) {
			console.error("Error during email verification:", error);
			// log error on screen
			return;
		}
	}

	const submitData = async() => {
		const client = {
			firstName: formData.firstName,
			lastName: formData.lastName,
			email: formData.email,
			phone: formData.phone,
			countryDialCode: formData.dialCode,
			company: formData.company,
			companySize: formData.companySize,
			isSso: verificationCode ? false : true,
			password: !verificationCode ? undefined : password,
		};
		const subscription = {
			planId: formData.selectedPlan,
			paymentFrequencyCode: paymentFrequency,
			currencyRegionCode: currencyRegionCode.toUpperCase(),
			selectedCalculators: JSON.stringify(formData.selectedCalculators),
			currentCost: plans.items.find(plan => plan.id === formData.selectedPlan)?.[paymentFrequency === "MONTHLY" ? "monthlyCost" : "yearlyCost"] || 0,
		}

		console.log("Dispatching subscription:", { subscription, client });
		dispatch(submitSubscriptionStart({ subscription, client }));
	};

	const canProceed = () => {
		switch (step) {
			case 1:
				return (
					formData.firstName &&
					formData.lastName &&
					formData.email &&
					formData.phone &&
					formData.company &&
					formData.companySize
				);
				case 2:
					return formData.selectedPlan;
				case 3:
					return formData.selectedCalculators.length > 0 && formData.agreedToTerms;
			default:
				return true;
		}
	};

	return (
		<main className="min-h-screen relative overflow-hidden">
		{/* Background Gradients */}
		<div className="absolute inset-0 -z-10">
			<div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-accent/30 via-accent/10 to-transparent blur-3xl" />
			<div className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-teal-400/20 via-emerald-300/10 to-transparent blur-3xl" />
			<div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] rounded-full bg-gradient-to-t from-teal-400/15 via-emerald-300/10 to-transparent blur-3xl" />
		</div>

		{/* Header */}
		<header className="py-6 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto flex items-center justify-between">
				<Link href="/" className="flex items-center gap-2">
					{/* <div className="h-8 w-8 rounded-lg bg-foreground flex items-center justify-center"> */}
						{/* <Calculator className="h-5 w-5 text-background" /> */}
						<span className="text-xl font-semibold text-foreground">
							{/* <Image
								src="/logo.svg"
								alt="Ishango Logo"
								width={100}
								height={100}
								className="rounded"
							/> */}
						</span>
					{/* </div> */}
				</Link>
				<Link
					href={`/${locale}`}
					className="text-sm text-muted-foreground hover:text-foreground transition-colors"
				>
					Back to home
				</Link>
			</div>
		</header>

		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
				{/* Left Column - Form */}
				<div className="order-2 lg:order-1">
					<div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
						{/* Progress Steps */}
						<div className="flex items-center gap-2 mb-8">
							{[1, 2, 3].map((s) => (
							<div key={s} className="flex items-center gap-2">
								<div
								className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
									step > s
									? "bg-accent text-accent-foreground"
									: step === s
										? "bg-foreground text-background"
										: "bg-muted text-muted-foreground"
								}`}
								>
								{step > s ? <Check className="h-4 w-4" /> : s}
								</div>
								{s < 3 && (
								<div
									className={`h-0.5 w-8 sm:w-12 ${
									step > s ? "bg-accent" : "bg-border"
									}`}
								/>
								)}
							</div>
							))}
						</div>

						{step === 4 ? (
							/* Success State */
							<>
								{(user || verifySent) && (
									<div className="text-center py-8">
										<div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
											<Check className="h-8 w-8 text-accent" />
										</div>
										<h2 className="text-2xl font-semibold text-foreground mb-2">
											You're all set!
										</h2>
										<p className="text-muted-foreground mb-6">
											Check your email for confirmation and next steps to get
											started with CalcGlobal.
										</p>
										<div className="flex flex-col sm:flex-row gap-4 justify-center">
											<Button asChild>
												<Link href={`/${locale}/calculators/income-tax`}>
													Try Income Tax Calculator
												</Link>
											</Button>
											<Button variant="outline" asChild className="bg-transparent">
												<Link href={`/${locale}/calculators/mortgage`}>
													Try Mortgage Calculator
												</Link>
											</Button>
										</div>
									</div>
								)}
								{(!user && !verifySent) && (
									<div className="space-y-6">
										<div>
											<h2 className="text-xl font-semibold text-foreground">
												Verify your email address
											</h2>
											<p className="text-sm text-muted-foreground mt-1">
											    A confirmation code has been sent to your address.
											</p>
										</div>
										<div className="space-y-2">
											<Label htmlFor="verificationCode">Verification Code</Label>
											<Input
												id="verificationCode"
												placeholder="Enter your verification code"
												value={verificationCode}
												onChange={(e) => setVerificationCode(e.target.value)}
											/>
										</div>
										<div className="flex items-center gap-4 mt-8">
											<Button
												type="submit"
												className="flex-1 gap-2"
												onClick={() => verifyEmail(verificationCode)}
											>
												Verify Email
											<ArrowRight className="h-4 w-4" />
										</Button>

										</div>
									</div>
								)}
							</>
						) : (
							<form onSubmit={handleSubmit}>
								<div id="clerk-captcha" />
								{step === 1 && (
									/* Step 1: Account Details */
									<div className="space-y-6">
										<div>
											<h2 className="text-xl font-semibold text-foreground">
											Create your account
											</h2>
											<p className="text-sm text-muted-foreground mt-1">
											Start your 14-day free trial. No credit card required.
											</p>
										</div>

										{/* Social Sign Up */}
										<div className="grid grid-cols-2 gap-3">
											<Button
												type="button"
												variant="outline"
												className="gap-2 bg-transparent"
												onClick={() =>
													signUp?.authenticateWithRedirect({
														strategy: "oauth_google",
														redirectUrl: `/${locale}/get-started`,
														redirectUrlComplete: `/${locale}/get-started`,
												})}
											>
												<svg className="h-4 w-4" viewBox="0 0 24 24">
													<path
														d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
														fill="#4285F4"
													/>
													<path
														d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
														fill="#34A853"
													/>
													<path
														d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
														fill="#FBBC05"
													/>
													<path
														d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
														fill="#EA4335"
													/>
												</svg>
												Google
											</Button>
											<Button
												type="button"
												variant="outline"
												className="gap-2 bg-transparent"
												onClick={() =>
													signUp?.authenticateWithRedirect({
													strategy: "oauth_github",
													redirectUrl: `/${locale}/get-started`,
													redirectUrlComplete: `/${locale}/get-started`,
												})}
											>
												<svg
													className="h-4 w-4"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
												</svg>
												GitHub
											</Button>
										</div>
										<div className="relative">
											<div className="absolute inset-0 flex items-center">
												<div className="w-full border-t border-border" />
												</div>
												<div className="relative flex justify-center text-xs uppercase">
												<span className="bg-card px-2 text-muted-foreground">
													Or continue with email
												</span>
											</div>
										</div>

										<div className="grid grid-cols-2 gap-4">
											<div className="space-y-2">
											<Label htmlFor="firstName">First name</Label>
											<Input
												id="firstName"
												placeholder="John"
												value={formData.firstName}
												onChange={(e) =>
												setFormData({
													...formData,
													firstName: e.target.value,
												})
												}
											/>
											</div>
											<div className="space-y-2">
											<Label htmlFor="lastName">Last name</Label>
											<Input
												id="lastName"
												placeholder="Doe"
												value={formData.lastName}
												onChange={(e) =>
												setFormData({
													...formData,
													lastName: e.target.value,
												})
												}
											/>
											</div>
										</div>

										<div className="space-y-2">
											<Label htmlFor="email">Work email</Label>
											<Input
											id="email"
											type="email"
											placeholder="john@company.com"
											value={formData.email}
											onChange={(e) =>
												setFormData({ ...formData, email: e.target.value })
											}
											/>
										</div>

										<div className="space-y-2">
											<Label htmlFor="phone">Phone number</Label>
											<div className="flex gap-2">
											<Select
												value={formData.dialCode}
												onValueChange={(value) =>
												setFormData({ ...formData, dialCode: value })
												}
											>
												<SelectTrigger className="w-28 shrink-0">
												<SelectValue placeholder="+1" />
												</SelectTrigger>
												<SelectContent>
												{dialCodes.map((dial) => (
													<SelectItem key={dial.code} value={dial.code}>
													{dial.code} {dial.country}
													</SelectItem>
												))}
												</SelectContent>
											</Select>
											<Input
												id="phone"
												type="tel"
												placeholder="(555) 123-4567"
												value={formData.phone}
												onChange={(e) =>
												setFormData({ ...formData, phone: e.target.value })
												}
												className="flex-1"
											/>
											</div>
										</div>
										<div className="space-y-2">
											<Label htmlFor="company">Company name</Label>
											<Input
											id="company"
											placeholder="Acme Inc."
											value={formData.company}
											onChange={(e) =>
												setFormData({ ...formData, company: e.target.value })
											}
											/>
										</div>

										<div className="space-y-2">
											<Label htmlFor="companySize">Company size</Label>
											<Select
											value={formData.companySize}
											onValueChange={(value) =>
												setFormData({ ...formData, companySize: value })
											}
											>
											<SelectTrigger id="companySize">
												<SelectValue placeholder="Select company size" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="1-10">1-10 employees</SelectItem>
												<SelectItem value="11-50">11-50 employees</SelectItem>
												<SelectItem value="51-200">
												51-200 employees
												</SelectItem>
												<SelectItem value="201-1000">
												201-1000 employees
												</SelectItem>
												<SelectItem value="1000+">1000+ employees</SelectItem>
											</SelectContent>
											</Select>
										</div>
									</div>
								)}
								{step === 2 && (
									/* Step 3: Select Plan */
									<div className="space-y-6">
										<div>
											<h2 className="text-xl font-semibold text-foreground">
											Select your plan
											</h2>
											<p className="text-sm text-muted-foreground mt-1">
											All plans include a 14-day free trial.
											</p>
										</div>

										<div className="flex items-center gap-4">
											<button
												type="button"
												onClick={() => setPaymentFrequency("YEARLY")}
												className="flex items-center gap-2"
											>
												<div
													className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
														paymentFrequency === "YEARLY"
														? "border-accent bg-accent"
														: "border-border"
													}`}
												>
													{paymentFrequency === "YEARLY" && (
														<Check className="h-3 w-3 text-accent-foreground" />
													)}
												</div>
												<span className="text-sm font-medium text-foreground">Yearly</span>
											</button>
											<button
												type="button"
												onClick={() => setPaymentFrequency("MONTHLY")}
												className="flex items-center gap-2"
											>
												<div
													className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
														paymentFrequency === "MONTHLY"
														? "border-accent bg-accent"
														: "border-border"
													}`}
												>
													{paymentFrequency === "MONTHLY" && (
														<Check className="h-3 w-3 text-accent-foreground" />
													)}
												</div>
												<span className="text-sm font-medium text-foreground">Monthly</span>
											</button>
										</div>

										<div className="space-y-3">
											{plans.items.map((plan) => {
											const isSelected = formData.selectedPlanCode === plan.code;
											return (
												<button
													key={plan.id}
													type="button"
													onClick={() =>
														setFormData({
															...formData,
															selectedPlan: plan.id,
															selectedPlanCode: plan.code,
															selectedCalculators: [],
														})
													}
													className={`w-full p-4 rounded-xl border transition-all text-left relative ${
														isSelected
														? "border-accent bg-accent/5"
														: "border-border hover:border-accent/50"
													}`}
												>
													{plan.isMostPopular && (
														<span className="absolute -top-2.5 right-4 inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
														Most Popular
														</span>
													)}
													<div className="flex items-start justify-between mb-3">
														<div>
															<p className="font-semibold text-foreground">
																{t(plan.code)}
															</p>
															<div className="flex items-baseline gap-1 mt-1">
																{plan.isCustomPrice ? (
																	<span className="text-2xl font-semibold text-foreground">
																		{t("CUSTOM_PRICING")}
																	</span>
																) : (
																	<>
																		<span className="text-2xl font-semibold text-foreground">
																			{paymentFrequency === "MONTHLY" ? `${plan.currencySymbol}${plan.monthlyCost}` : `${plan.currencySymbol}${plan.yearlyCost}`}
																		</span>
																		<span className="text-sm text-muted-foreground">
																			{paymentFrequency === "MONTHLY" ? t("PER_MONTH") : t("PER_YEAR")}
																		</span>
																	</>
																)}
															</div>
														</div>
														<div
															className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
																isSelected
																? "border-accent bg-accent"
																: "border-border"
															}`}
															>
															{isSelected && (
																<Check className="h-3 w-3 text-accent-foreground" />
															)}
														</div>
													</div>
													<div className="flex flex-wrap gap-2">
														<span className="inline-flex items-center text-xs text-muted-foreground">
															<Check className="h-3 w-3 text-accent mr-1" />
															{plan.maxApiCalculationsPerMonth ? `${plan.maxApiCalculationsPerMonth.toLocaleString()} ${t('CALCULATIONS_PER_MONTH')}` : t('UNLIMITED_CALCULATIONS')}
														</span>
														<span className="inline-flex items-center text-xs text-muted-foreground">
															<Check className="h-3 w-3 text-accent mr-1" />
															{plan.maxCountries ? `${plan.maxCountries} ${t('COUNTRIES')}` : t('ALL_COUNTRIES')}
														</span>
														<span className="inline-flex items-center text-xs text-muted-foreground">
															<Check className="h-3 w-3 text-accent mr-1" />
															{t(plan.apiType)}
														</span>
													</div>
												</button>
											);
											})}
										</div>
									</div>
								)}

								{step === 3 && (
									/* Step 2: Select Calculators */
									<div className="space-y-6">
										<div>
											<h2 className="text-xl font-semibold text-foreground">
												Choose your calculators
											</h2>
											<p className="text-sm text-muted-foreground mt-1">
												Select the calculators you'll need. You can change this
												later.
											</p>
										</div>

										<div className="space-y-3">
											<h3 className="text-accent text-sm font-medium mb-2">
												{t("YOU_CAN_ONLY_SELECT")} {selectedPlanMaxCalculators} {t("CALCULATORS_UP_TO_YOUR_PLAN_LIMIT")}
											</h3>
											{calculatorTypes.items.map((calc) => {
											const isSelected =
												formData.selectedCalculators.includes(calc.id);
											return (
												<button
													key={calc.id}
													type="button"
													onClick={() => handleCalculatorToggle(calc.id)}
													className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
														isSelected
														? "border-accent bg-accent/5"
														: "border-border hover:border-accent/50"
													}`}
													>
													<div
														className={`h-10 w-10 rounded-lg flex items-center justify-center ${
														isSelected
															? "bg-accent text-accent-foreground"
															: "bg-muted text-muted-foreground"
														}`}
													>
														{React.createElement(calculatorIcons[calc.code], { className: "h-5 w-5" })}
													</div>
													<span className="flex-1 font-medium text-foreground">
														{calc.description}
													</span>
													<div
														className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
														isSelected
															? "border-accent bg-accent"
															: "border-border"
														}`}
													>
														{isSelected && (
														<Check className="h-3 w-3 text-accent-foreground" />
														)}
													</div>
												</button>
											);
											})}
										</div>
										<div className="flex items-start gap-3 pt-2">
											<Checkbox
											id="terms"
											checked={formData.agreedToTerms}
											onCheckedChange={(checked) =>
												setFormData({
												...formData,
												agreedToTerms: checked as boolean,
												})
											}
											/>
											<Label
											htmlFor="terms"
											className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
											>
											I agree to the{" "}
											<Link
												href="/terms"
												className="text-accent hover:underline"
											>
												Terms of Service
											</Link>{" "}
											and{" "}
											<Link
												href="/privacy"
												className="text-accent hover:underline"
											>
												Privacy Policy
											</Link>
											</Label>
										</div>
									</div>
								)}

								<div className="flex items-center gap-4 mt-8">
									{step > 1 && (
										<Button
											type="button"
											variant="outline"
											onClick={() => setStep(step - 1)}
											className="bg-transparent"
										>
											Back
										</Button>
									)}
									<Button
										type="submit"
										className="flex-1 gap-2"
										disabled={!canProceed()}
									>
										{step === 3 && user ? "Start Free Trial" : "Continue"}
										<ArrowRight className="h-4 w-4" />
									</Button>
								</div>
							</form>
						)}
					</div>
				</div>

			{/* Right Column - Info */}
			<div className="order-1 lg:order-2 lg:sticky lg:top-8">
				<div className="mb-8">
				<h1 className="text-3xl sm:text-4xl font-semibold text-foreground text-balance leading-tight">
					Get started with{" "}
					<span className="bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
						IShango
					</span>
				</h1>
				<p className="mt-4 text-lg text-muted-foreground leading-relaxed">
					Join thousands of businesses using our financial calculators to
					make smarter decisions across 50+ countries.
				</p>
				</div>

				{/* Benefits */}
				<div className="space-y-4 mb-8">
				{benefits.map((benefit) => (
					<div key={benefit.title} className="flex items-start gap-4">
					<div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
						<benefit.icon className="h-5 w-5 text-accent" />
					</div>
					<div>
						<h3 className="font-medium text-foreground">
						{benefit.title}
						</h3>
						<p className="text-sm text-muted-foreground">
						{benefit.description}
						</p>
					</div>
					</div>
				))}
				</div>

				{/* Testimonial */}
				<div className="bg-card rounded-xl border border-border p-6">
				<p className="text-foreground leading-relaxed">
					"CalcGlobal has transformed how we handle international tax
					calculations. What used to take hours now takes seconds."
				</p>
				<div className="flex items-center gap-3 mt-4">
					<div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent/40 to-teal-300/40 flex items-center justify-center text-sm font-medium text-foreground">
					SK
					</div>
					<div>
					<p className="font-medium text-foreground text-sm">
						Sarah Kim
					</p>
					<p className="text-xs text-muted-foreground">
						CFO at TechCorp Global
					</p>
					</div>
				</div>
				</div>

				{/* Trust indicators */}
				<div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
				<div className="flex items-center gap-1.5">
					<Check className="h-4 w-4 text-accent" />
					<span>No credit card required</span>
				</div>
				<div className="flex items-center gap-1.5">
					<Check className="h-4 w-4 text-accent" />
					<span>14-day free trial</span>
				</div>
				</div>
			</div>
			</div>
		</div>
		</main>
	);
}
