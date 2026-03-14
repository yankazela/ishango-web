"use client";

import { useState, useEffect, useMemo } from "react";
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
import { Landmark, ArrowRight, Calendar, TrendingDown, Check } from "lucide-react";
import { RootState } from "@/store/rootStore";
import { calculateIncomeTax, fetchCalculatorsStart, resetResult } from "@/app/[locale]/calculators/income-tax/store/slice";

export function IncomeTaxCalculator() {

    const dispatch = useDispatch();
    const t = useTranslations('IncomeTaxCalculator');
	const { form, result  } = useSelector((state: RootState) => state.incomeTaxCalculator);
    const taxYears = ["2026", "2025", "2024", "2023", "2022"];
    const [taxYear, setTaxYear] = useState("2025");

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

    const [selectedCountry, setSelectedCountry] = useState("US");
    const [formInputs, setFormInputs] = useState<{ [key: string]: any }>({});

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
        
        dispatch(calculateIncomeTax({ inputs: formInputs }));
    };


    return (
        <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <Card className="border-border bg-card">
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Landmark className="h-5 w-5 text-accent" />
                    {t("CALCULATOR_TITLE")}
                </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
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
                {forCountry?.withProvincial && (
                    <div className="space-y-2">
                        <Label htmlFor="province">{t('PROVINCE')}</Label>
                        <Select value={formInputs.provinceCode || ''} onValueChange={(value) => handleInputChange('provinceCode', value)} name="provinceCode">
                        <SelectTrigger id="province" className="w-full">
                            <SelectValue placeholder={t('SELECT_PROVINCE')} />
                        </SelectTrigger>
                        <SelectContent>
                            {forCountry.provinces.map((province) => (
                            <SelectItem key={province.code} value={province.code}>
                                {province.name}
                            </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    </div>
                )}

                {/* Annual Income */}
                {forCountry?.formInputs.map((field) => (
                    <div key={field.name} className="space-y-2">
                        <Label htmlFor="income">{t(field.label)} {field.isCurrency ? `(${forCountry.currency})` : ''}</Label>
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
                            {field.type === "boolean" && (
                                <div className="flex items-center gap-4">
                                    <button
                                        type="button"
                                        onClick={() => handleInputChange(field.name, true)}
                                        className="flex items-center gap-2"
                                    >
                                        <div
                                            className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                                                formInputs[field.name] === true
                                                ? "border-accent bg-accent"
                                                : "border-border"
                                            }`}
                                        >
                                            {formInputs[field.name] === true && (
                                                <Check className="h-3 w-3 text-accent-foreground" />
                                            )}
                                        </div>
                                        <span className="text-sm font-medium text-foreground">Yes</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleInputChange(field.name, false)}
                                        className="flex items-center gap-2"
                                    >
                                        <div
                                            className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                                                formInputs[field.name] === false
                                                ? "border-accent bg-accent"
                                                : "border-border"
                                            }`}
                                        >
                                            {formInputs[field.name] === false && (
                                                <Check className="h-3 w-3 text-accent-foreground" />
                                            )}
                                        </div>
                                        <span className="text-sm font-medium text-foreground">No</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {/* Standard Deduction Info */}
                {/* {country.standardDeduction > 0 && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/10 text-sm">
                    <Info className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <p className="text-muted-foreground">
                        Standard deduction of{" "}
                        <span className="font-medium text-foreground">
                        {country.symbol}
                        {country.standardDeduction.toLocaleString()}
                        </span>{" "}
                        applied automatically for {country.name}.
                    </p>
                    </div>
                )} */}

                <Button className="w-full" size="lg" disabled={!canSubmit} onClick={handleSubmit}>
                    {t('CALCULATE')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-4">
                <Card className="border-border bg-gradient-to-br from-card to-accent/5">
                    <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground mb-1">{t('TOTAL_TAX')}</p>
                    <p className="text-2xl font-semibold text-foreground">
                        {forCountry ? forCountry.currencySymbol : ''}{result.data ? result.data.incomeTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0'}
                    </p>
                    <Badge variant="secondary" className="mt-2">
                        {(result.data ? (result.data.incomeTax / result.data.grossIncome * 100).toFixed(2) : '0')}% {t('EFFECTIVE_TAX_RATE')}
                    </Badge>
                    </CardContent>
                </Card>

                <Card className="border-border bg-gradient-to-br from-card to-teal-500/5">
                    <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground mb-1">{t('NET_INCOME')}</p>
                    <p className="text-2xl font-semibold text-accent">
                        {forCountry ? forCountry.currencySymbol : ''}{result.data ? result.data.netIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0'}
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                        <TrendingDown className="h-4 w-4" />
                        {forCountry ? forCountry.currencySymbol : ''}
                        {(result.data ? (result.data.netIncome / 12).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0')}
                        / {t('MONTH')}
                    </div>
                    </CardContent>
                </Card>
                </div>

                {/* Tax Breakdown */}
                <Card className="border-border">
                    <CardHeader>
                        <CardTitle className="text-lg">{t('TAX_BRACKET_BREAKDOWN')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {result.data && result.data.taxBracketBreakdown ? (
                                result.data.taxBracketBreakdown.map((bracket, index) => (
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50" key={index}>
                                        <div>
                                            <p className="text-sm font-medium text-foreground">
                                            {forCountry ? forCountry.currencySymbol : ''}{bracket.from.toLocaleString()} - {forCountry ? forCountry.currencySymbol : ''}{bracket.to ? bracket.to.toLocaleString() : 'and above'}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {bracket.rate}% {t('TAX_RATE')}
                                            </p>
                                        </div>
                                        <p className="font-medium text-foreground">
                                            {forCountry ? forCountry.currencySymbol : ''}{bracket.taxOnAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground text-center py-4">
                                    {t('ENTER_INCOME')}
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Visual Breakdown */}
                <Card className="border-border">
                    <CardHeader>
                        <CardTitle className="text-lg">{t('INCOME_DISTRIBUTION')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                        <div className="h-4 rounded-full bg-muted overflow-hidden flex">
                            <div
                            className="h-full bg-gradient-to-r from-accent to-teal-400 transition-all duration-500"
                            style={{
                                width: `${100 - 0}%`,
                            }}
                            />
                            <div
                            className="h-full bg-gradient-to-r from-rose-400 to-rose-500 transition-all duration-500"
                            style={{
                                width: `${0}%`,
                            }}
                            />
                        </div>
                        <div className="flex justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-gradient-to-r from-accent to-teal-400" />
                                    <span className="text-muted-foreground">
                                        {t('TAKE_HOME')} {(result.data ? ((result.data.grossIncome - result.data.incomeTax) / result.data.grossIncome * 100).toFixed(2) : '0')}%
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-gradient-to-r from-rose-400 to-rose-500" />
                                    <span className="text-muted-foreground">
                                        {t('TAX')} ({result.data ? (result.data.incomeTax / result.data.grossIncome * 100).toFixed(2) : '0'}%)
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
