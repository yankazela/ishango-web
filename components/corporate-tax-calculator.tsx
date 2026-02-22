"use client";

import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { Building2, Percent, ArrowRight, Calendar, Check } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store/rootStore";
import { calculateCorporateTax, fetchCalculatorsStart } from "../app/[locale]/calculators/corporate-tax/store/slice";


const formatCurrency = (value: number, symbol?: string) =>
  `${symbol}${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export function CorporateTaxCalculator() {
    const t = useTranslations("CorporateTaxCalculator");
    const dispatch = useDispatch();

    const [taxYear, setTaxYear] = useState("2025");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [formInputs, setFormInputs] = useState<Record<string, any>>({});
    const [showProvincial, setShowProvincial] = useState(false);
    const { form, results  } = useSelector((state: RootState) => state.corporateTaxCalculator);
    const taxYears = ["2026", "2025", "2024", "2023", "2022"];

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

    const result = useMemo(() => {
        if (!results.data) return null;
        if (showProvincial && results.data.provincialTax) {
            return results.data.provincialTax;
        }
        return results.data.federalTax;
    }, [results.data, showProvincial]);
    
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
            year: taxYear,
            isSmallBusiness: null
        });
    }

    const handleInputChange = (name: string, value: any) => {
        const parsed =
        typeof value === "string" && !isNaN(Number(value)) && value !== ""
            ? Number(value)
            : value;

        setFormInputs((prev) => ({
        ...prev,
        [name]: parsed,
        }));
    };

    const canSubmit = useMemo(() => {
        if (!forCountry) return false;
        for (const field of forCountry.formInputs) {
            if (formInputs[field.name] === false) return true; // allow submission if boolean field is explicitly false
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
        
        dispatch(calculateCorporateTax({
            countryCode: formInputs.countryCode,
            provinceCode: formInputs.provinceCode,
            year,
            details
        }));
    };


    return (
        <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            {/* Toggle for Provincial/Federal */}
            {forCountry?.withProvincial && (
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border col-span-2">
                    <div className="flex items-center gap-3">
                        <Label htmlFor="provincial-toggle" className="text-sm font-medium cursor-pointer">
                            {showProvincial ? t("PROVINCIAL_RESULTS") : t("FEDERAL_RESULTS")}
                        </Label>
                    </div>
                    <Switch
                        id="provincial-toggle"
                        checked={showProvincial}
                        onCheckedChange={setShowProvincial}
                    />
                </div>
            )}
            <div className="space-y-4">
            <Card className="border-border bg-card">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-accent" />
                        {t("CALCULATOR_TITLE")}
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Country */}
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
                    {/* dynamic fields */}
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

                    <Button
                        className="w-full mt-10"
                        size="lg"
                        disabled={!canSubmit}
                        onClick={handleSubmit}
                    >
                        {t("CALCULATE_TAX")}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardContent>
            </Card>
            </div>

            {/* Results */}
            <div className="space-y-6">
                {/* Summary Cards */}
                <Card className="border-border bg-gradient-to-br from-card to-accent/5">
                    <CardHeader>
                        <CardTitle>{t("RESULTS")}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">
                            {t("TOTAL_TAX_PAYABLE")}
                            </p>
                            <p className="text-4xl font-bold">
                                {forCountry ? formatCurrency(result ? result.corporateTax : 0, forCountry.currencySymbol) : '-'}
                            </p>
                        </div>

                        <div className="space-y-2 border-t pt-4">
                        <div className="flex justify-between text-sm">
                            <span>{t("TAXABLE_PROFIT")}</span>
                            <span>
                                {forCountry ? formatCurrency(formInputs['taxableIncome'] ?? 0, forCountry.currencySymbol) : '-'}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>{t("EFFECTIVE_RATE")}</span>
                            <span>{result ? (result.effectiveTaxRate).toFixed(2) : '0'}%</span>
                        </div>
                        </div>
                    </CardContent>
                </Card>
                {/* Tax Breakdown */}
                <Card className="border-border">
                    <CardHeader>
                        <CardTitle className="text-lg">{t('TAX_BRACKET_BREAKDOWN')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {result && result.breakdowns ? (
                                result.breakdowns.map((bracket, index) => (
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50" key={index}>
                                        <div>
                                            <p className="text-sm font-medium text-foreground">
                                                {!forCountry ? '': forCountry.currencySymbol}{bracket.from.toLocaleString()} - {!forCountry || bracket.to === 'Above' ? '' : forCountry.currencySymbol}{bracket.to !== 'Above' ? bracket.to.toLocaleString() : 'Above'}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {bracket.rate}% {t('TAX_RATE')}
                                            </p>
                                        </div>
                                        <p className="font-medium text-foreground">
                                            {forCountry ? forCountry.currencySymbol : ''}
                                            {bracket.from !== 'Above' ? parseFloat(bracket.from).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'Above'}
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
                                            {t('TAKE_HOME')} {(result ? (((formInputs['taxableIncome'] ?? 0) - result.corporateTax) / (formInputs['taxableIncome'] ?? 1) * 100).toFixed(2) : '0')}%

                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full bg-gradient-to-r from-rose-400 to-rose-500" />
                                        <span className="text-muted-foreground">
                                            {t('TAX')} ({result ? (result.corporateTax / (formInputs['taxableIncome'] ?? 1) * 100).toFixed(2) : '0'}%)
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
