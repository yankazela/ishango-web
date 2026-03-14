"use client";

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from 'next-intl';
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale, Info, Calendar, Users, Home, Briefcase, Landmark, ArrowRight } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RootState } from "@/store/rootStore";
import { fetchCalculatorsStart, resetResult, calculateInheritanceTax } from "@/app/[locale]/calculators/inheritance-tax/store/slice";
import { formatCurrency } from "@/lib/utils";

const taxYears = ["2026", "2025", "2024", "2023", "2022"];

type InheritanceBracket = {
  min: number;
  max: number;
  rate: number;
};

type RelationshipExemption = {
  spouse: number;
  child: number;
  grandchild: number;
  sibling: number;
  other: number;
};

type CountryInheritanceData = {
  code: string;
  name: string;
  currency: string;
  symbol: string;
  brackets: Record<string, InheritanceBracket[]>;
  exemptions: Record<string, RelationshipExemption>;
  residenceRelief: Record<string, number>;
  hasInheritanceTax: boolean;
  notes: string;
};



const assetTypes = [
  { value: "property", label: "PRIMARY_RESIDENCE", icon: Home },
  { value: "other_property", label: "OTHER_PROPERTY", icon: Home },
  { value: "investments", label: "INVESTMENTS_SAVINGS", icon: Briefcase },
  { value: "business", label: "BUSINESS_ASSETS", icon: Landmark },
  { value: "other", label: "OTHER_ASSETS", icon: Briefcase },
];

export function InheritanceTaxCalculator() {
  const dispatch = useDispatch();
  const t = useTranslations("InheritanceTaxCalculator");
  const [selectedCountry, setSelectedCountry] = useState("UK");
  const [taxYear, setTaxYear] = useState("2025");
  const [assetType, setAssetType] = useState("property");

  const { form, results  } = useSelector((state: RootState) => state.inheritanceTaxCalculator);
  const [formInputs, setFormInputs] = useState<{ [key: string]: any }>({});


	useEffect(() => {
		dispatch(fetchCalculatorsStart({ year: taxYear }));
	}, [dispatch, taxYear]);

	useEffect(() => {
		if (form.countryCalculators.length > 0) {
			setSelectedCountry(form.countryCalculators[0].code);
			setFormInputs({
				countryCode: form.countryCalculators[0].code.toLocaleLowerCase(),
				year: taxYear,
			});
		}
	}, [form.countryCalculators, taxYear]);

	const forCountry = useMemo(() => {
		return form.countryCalculators.find((c) => c.code === selectedCountry);
	}, [form.countryCalculators, selectedCountry]);

	const handleSetTaxYear = (year: string) => {
		setTaxYear(year);
		setFormInputs({});
	};

	const handleChangeCountry = (countryCode: string) => {
		setSelectedCountry(countryCode);
		setFormInputs({
			countryCode: countryCode.toLocaleLowerCase(),
			year: taxYear
		});
		dispatch(resetResult());
	}

	const handleInputChange = (name: string, value: any) => {
		setFormInputs((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const canSubmit = useMemo(() => {
		if (!forCountry) return false;
		for (const field of forCountry.formInputs) {
			if (field.required && !formInputs[field.name]) {
				return false;
			}
		}
		return true;
	}, [forCountry, formInputs]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
			if (!canSubmit) return;

		const { countryCode, year, ...details } = formInputs;
		
		dispatch(calculateInheritanceTax({
			countryCode: formInputs.countryCode,
			year,
			details
		}));
	};


	return (
		<div className="grid lg:grid-cols-2 gap-8">
			{/* Calculator Form */}
			<Card className="border-border bg-card">
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-xl">
						<Scale className="h-5 w-5 text-accent" />
						Calculate Inheritance Tax
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Country and Tax Year Selection */}
					<div className="grid grid-cols-2 gap-4">
						{/* Country Selection */}
						<div className="space-y-2">
							<Label htmlFor="country">{t('COUNTRY')}</Label>
							<Select value={selectedCountry} onValueChange={handleChangeCountry} name="countryCode">
							<SelectTrigger id="country" className="w-full">
								<SelectValue placeholder={t('SELECT_COUNTRY')} />
							</SelectTrigger>
							<SelectContent>
								{form.countryCalculators.map((c) => (
								<SelectItem key={c.code} value={c.code}>
									{t(c.name)} ({c.currency})
								</SelectItem>
								))}
							</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
						<Label htmlFor="tax-year">{t('TAX_YEAR')}</Label>
						<Select value={taxYear} onValueChange={handleSetTaxYear} name="year">
							<SelectTrigger id="tax-year" className="w-full">
							<Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
							<SelectValue placeholder={t('SELECT_YEAR')} />
							</SelectTrigger>
							<SelectContent>
							{taxYears.map((year) => (
								<SelectItem key={year} value={year}>
								{year}
								</SelectItem>
							))}
							</SelectContent>
						</Select>
						</div>
					</div>

					{/* Relationship to Deceased */}
					{forCountry?.formInputs.map((field) => (
						<div className="space-y-2">
							<Label>{t(field.label)}</Label>
							<div className="relative">
								{field.isCurrency && (
								<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
									{forCountry.currencySymbol}
								</span>
							)}
							{(field.type === "number" || field.type === "text") && (
								<Input
									id={field.name}
									type={field.type}
									value={formInputs[field.name] || ''}
									onChange={(e) => handleInputChange(field.name, e.target.value)}
									className={field.isCurrency ? "pl-7" : "pl-3"}
								/>
							)}
							{(field.type === "select" && field.label !== "RELATIONSHIP") &&	(
								<Select value={formInputs[field.name] || ''} onValueChange={(value) => handleInputChange(field.name, value)}>
									<SelectTrigger id={field.name} className="w-full">
										<SelectValue  />
									</SelectTrigger>
									<SelectContent>
										{field.options?.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												<div className="flex items-center gap-2">
												{t(option.label)}
												</div>
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
							{field.label === "RELATIONSHIP" && (
								<RadioGroup
									value={formInputs[field.name] || ''}
									onValueChange={(value) => handleInputChange(field.name, value)}
									className="grid grid-cols-2 gap-2"
								>
									{field?.options?.map((rel) => (
										<div key={rel.value}>
										<RadioGroupItem
											value={rel.value}
											id={rel.value}
											className="peer sr-only"
										/>
										<Label
											htmlFor={rel.value}
											className="flex items-center gap-2 rounded-lg border-2 border-muted bg-popover p-3 hover:bg-accent/5 hover:text-accent-foreground peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-accent/10 cursor-pointer text-sm"
										>
											<Users className="h-4 w-4 text-muted-foreground" />
											{t(rel.label)}
										</Label>
										</div>
									))}
								</RadioGroup>
							)}
							</div>
						</div>
					))}
					{/* Asset Type */}
					<div className="space-y-2">
						<Label htmlFor="asset-type">{t('ASSET_TYPE')}</Label>
						<Select value={assetType} onValueChange={setAssetType}>
							<SelectTrigger id="asset-type" className="w-full">
								<SelectValue placeholder={t('SELECT_ASSET_TYPE')} />
							</SelectTrigger>
							<SelectContent>
								{assetTypes.map((type) => (
								<SelectItem key={type.value} value={type.value}>
									<div className="flex items-center gap-2">
									<type.icon className="h-4 w-4" />
									{t(type.label)}
									</div>
								</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<Button className="w-full" size="lg" disabled={!canSubmit} onClick={handleSubmit}>
						{t('CALCULATE')}
						<ArrowRight className="ml-2 h-4 w-4" />
					</Button>
				</CardContent>
			</Card>

			{/* Results */}
			<div className="space-y-6">
				{/* Main Result Card */}
				<Card
					className={`border-2 ${!results.data || results.data?.inheritanceTax === 0 ? "border-emerald-500/50 bg-gradient-to-br from-emerald-500/5 to-transparent" : "border-amber-500/50 bg-gradient-to-br from-amber-500/5 to-transparent"}`}
				>
					<CardContent className="p-6">
						<div className="text-center">
						<p className="text-sm text-muted-foreground mb-1">
							Estimated Inheritance Tax
						</p>
						<p
							className={`text-4xl font-bold ${!results.data || results.data?.inheritanceTax === 0 ? "text-emerald-600" : "text-amber-600"}`}
						>
							{forCountry ? forCountry.currencySymbol : ''}
							{results.data ? results.data.inheritanceTax.toLocaleString(undefined, {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							}) : '0'}
						</p>
						<Badge
							variant="secondary"
							className={`mt-2 ${!results.data || results.data?.inheritanceTax === 0 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
						>
							{results.data ? results.data.effectiveRate.toFixed(1) : '0'}% Effective Rate
						</Badge>
						</div>
					</CardContent>
				</Card>

				{/* Net Inheritance */}
				<Card>
					<CardContent className="p-6">
						<div className="text-center mb-4">
							<p className="text-sm text-muted-foreground mb-1">
								Net Inheritance Received
							</p>
							<p className="text-3xl font-bold text-foreground">
								{forCountry ? forCountry.currencySymbol : ''}
								{results.data ? ((formInputs['estateValue'] || 0) - results.data.inheritanceTax).toLocaleString(undefined, {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								}) : '0'}
							</p>
						</div>
						<div className="space-y-3 pt-4 border-t border-border">
							<div className="flex justify-between text-sm">
								<span className="text-muted-foreground">
									{t('ESTATE_VALUE')}
								</span>
								<span className="font-medium">
									{formatCurrency(formInputs['estateValue'] || 0, forCountry?.currencySymbol)}
								</span>
							</div>
							<div className="flex justify-between text-sm">
								<span className="text-muted-foreground">
									{t('TAXABLE_ESTATE')}
								</span>
								<span className="font-medium">
									{formatCurrency(results.data ? results.data.taxableEstate : 0, forCountry?.currencySymbol)}
								</span>
							</div>
                        </div>
					</CardContent>
				</Card>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Tax by Bracket</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.data && results.data.breakdowns ? (
                results.data.breakdowns.map((bracket, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-mono text-xs">
                        {(bracket.rate * 100).toFixed(2)}%
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {forCountry ? forCountry.currencySymbol : ''}{bracket.from.toLocaleString()} - {forCountry ? forCountry.currencySymbol : ''}{bracket.to ? bracket.to.toLocaleString() : 'and above'}
                      </span>
                    </div>
                    <span className="font-medium text-foreground">
                      {forCountry ? forCountry.currencySymbol : ''}
                      {bracket.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center">
                    No tax due, all brackets are tax-free.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

				{/* Visual Breakdown */}
				<Card>
				<CardHeader className="pb-4">
					<CardTitle className="text-lg">Estate Distribution</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
					<div className="h-6 rounded-full overflow-hidden bg-muted flex">
						<div
						className="h-full bg-emerald-500 transition-all"
						style={{
							width: `${results.data ? (((formInputs['estateValue'] || 1)- results.data.inheritanceTax) / (formInputs['estateValue'] || 1) * 100).toFixed(2) : 100}%`,
						}}
						/>
						<div
						className="h-full bg-amber-500 transition-all"
						style={{
							width: `${results.data && results.data.inheritanceTax > 0 ? (results.data ? ((results.data.inheritanceTax / (formInputs['estateValue'] || 1)) * 100).toFixed(2) : 0) : 0}%`,
						}}
						/>
					</div>
					<div className="flex justify-between text-sm">
						<div className="flex items-center gap-2">
							<div className="h-3 w-3 rounded-full bg-gradient-to-r from-accent to-teal-400" />
								<span className="text-muted-foreground">
									{t('NET_INHERITANCE')} {(results.data ? (((formInputs['estateValue'] || 1)- results.data.inheritanceTax) / (formInputs['estateValue'] || 1) * 100).toFixed(2) : '100')}%
								</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="h-3 w-3 rounded-full bg-gradient-to-r from-rose-400 to-rose-500" />
								<span className="text-muted-foreground">
									{t('TAX')} ({results.data ? (results.data.inheritanceTax / (formInputs['estateValue'] || 1) * 100).toFixed(2) : '0'}%)
								</span>
							</div>
						</div>
					</div>
				</CardContent>
				</Card>
			</div>
		</div>
	);
}
