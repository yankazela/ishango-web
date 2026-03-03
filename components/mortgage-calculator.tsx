"use client";

import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from 'next-intl';
import { Home, TrendingUp, Calendar, Percent, ArrowRight, Check } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RootState } from "@/store/rootStore";
import { fetchCalculatorsStart, calculateMortgage, resetResult } from "@/app/[locale]/calculators/mortgage/store/slice";
import { Button } from "./ui/button";

const formatCurrency = (value: number, symbol: string | undefined) => {
    return `${symbol}${ value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export function MortgageCalculator() {
    const t = useTranslations('MortgageCalculator');
    const dispatch = useDispatch();
    const { form, result  } = useSelector((state: RootState) => state.mortgageCalculator);
    const [taxYear, setTaxYear] = useState("2025");
    const [loanTerm, setLoanTerm] = useState("20");
    const loanTerms = [10, 15, 20, 25, 30];
    
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

    const [selectedCountry, setSelectedCountry] = useState("");
    const [formInputs, setFormInputs] = useState<{ [key: string]: any }>({});

    const forCountry = useMemo(() => {
        return form.countryCalculators.find((c) => c.code === selectedCountry);
    }, [form.countryCalculators, selectedCountry]);

    const handleChangeCountry = (countryCode: string) => {
        setSelectedCountry(countryCode);
        setFormInputs({
            countryCode: countryCode.toLocaleLowerCase(),
            year: taxYear,
        });
        dispatch(resetResult());
    }

    const handleInputChange = (name: string, value: any) => {
        const transformedValue = typeof value === 'string' && !isNaN(Number(value)) && value.trim() !== '' 
            ? Number(value) 
            : value;
        setFormInputs((prev) => ({
            ...prev,
            [name]: transformedValue,
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

        const isPrimaryResidence = true;
        const isFirstTimeBuyer = true;
        const paymentFrequency = "MONTHLY";
        const amortizationYears = parseInt(loanTerm);
        const loanDurationYears = parseInt(loanTerm);

        
        dispatch(calculateMortgage({
            countryCode,
            year,
            details: { 
                ...details,
                isPrimaryResidence,
                isFirstTimeBuyer,
                paymentFrequency,
                amortizationYears,
                loanDurationYears
            }
        }));
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <Card className="border-border bg-card">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                        <Home className="h-5 w-5 text-accent" />
                        {t('CALCULATOR_TITLE')}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
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

                    {/* Dynamic fields */}
                    {forCountry?.formInputs.map((field) => (
                        field.label !== "LOAN_DURATION" ? (
                        <div className="space-y-3" key={field.name}>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="down-payment">{t(field.label)}</Label>
                                {field.slider && (
                                    <Badge variant="outline" className="font-mono">
                                        <Percent className="h-3 w-3 mr-1" />
                                        {field.label === 'DOWN_PAYMENT' ? `${((formInputs[field.name] || 0) / (formInputs['propertyPrice'] || 1) * 100).toFixed(0)}%` : `${formInputs[field.name] || 0}%`}
                                    </Badge>
                                )}
                            </div>
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
                                        value={formInputs[field.name] || ""}
                                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                                        className="pl-8"
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
                            {field.slider && (
                                <>
                                    <Slider
                                        value={[formInputs[field.name] ? (field.label === 'DOWN_PAYMENT' ? (Number(formInputs[field.name]) / (formInputs['propertyPrice'] || 1)) * 100 : Number(formInputs[field.name])) : 0]}
                                        onValueChange={(value) => {
                                            if (field.label === 'DOWN_PAYMENT') {
                                                const newValue = (value[0] / 100) * (formInputs['propertyPrice'] || 0);
                                                handleInputChange(field.name, Math.round(newValue));
                                            } else {
                                                handleInputChange(field.name, value[0]);
                                            }
                                        }}
                                        max={field.slider.max}
                                        min={field.slider.min}
                                        step={field.slider.step}
                                        className="w-full"
                                    />
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>{field.slider.min}%</span>
                                        <span>{field.slider.max}%</span>
                                    </div>
                                </>
                            )}
                        </div>
                    ) :(
                        <div className="space-y-2" key={field.name}>
                            <Label htmlFor="loan-term">Loan Term</Label>
                            <Select value={loanTerm} onValueChange={(value) => { handleInputChange(field.name, value); setLoanTerm(value);}} name={field.name}>
                                <SelectTrigger id="loan-term" className="w-full">
                                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <SelectValue placeholder="Select term" />
                                </SelectTrigger>
                                <SelectContent>
                                    {loanTerms.map((term) => (
                                        <SelectItem key={term} value={term.toString()}>
                                            {term} {t('YEARS')}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )
                    ))}

                    <Button className="w-full" size="lg" disabled={!canSubmit} onClick={handleSubmit}>
                        {t('CALCULATE_MORTGAGE')}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardContent>
            </Card>

            {/* Results Panel */}
            <div className="space-y-6">
                {/* Monthly Payment Card */}
                <Card className="border-border bg-gradient-to-br from-card via-card to-accent/5">
                    <CardContent className="pt-6">
                        <div className="text-center mb-6">
                            <p className="text-sm text-muted-foreground mb-1">
                                {t('ESTIMATED_MONTHLY_PAYMENT')}
                            </p>
                            <p className="text-4xl sm:text-5xl font-bold text-foreground">
                                {result.data ? formatCurrency(result.data.monthlyPayment, forCountry?.currencySymbol) : (`${forCountry?.currencySymbol}0.00`)}
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                                {t('LOAN_AMOUNT')}: {result.data ? formatCurrency(result.data.loanAmount, forCountry?.currencySymbol) : (`${forCountry?.currencySymbol}0.00`)}
                            </p>
                        </div>
                        {/* Payment Breakdown */}
                        <div className="space-y-3 pt-4 border-t border-border">
                            {result.data ? (
                                Object.entries(result.data.otherFees).map(([key, fee]) => (
                                    <div key={key} className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">
                                            {t(fee.label)}
                                        </span>
                                        <span className="font-medium">
                                            {formatCurrency(fee.value, forCountry?.currencySymbol)}
                                        </span>
                                    </div>
                                ))
                            ) : null}
                        </div>
                    </CardContent>
                </Card>

                {/* Loan Summary */}
                <Card className="border-border bg-card">
                    <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-2 text-lg">
                        <TrendingUp className="h-4 w-4 text-accent" />
                        {t('LOAN_SUMMARY')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground mb-1">
                                {t('TOTAL_PAYMENTS', { count: parseInt(loanTerm) * 12 })}
                            </p>
                            <p className="text-lg font-semibold">
                            {result.data ? formatCurrency(result.data.totalPaid, forCountry?.currencySymbol) : (`${forCountry?.currencySymbol}0.00`)}
                            </p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground mb-1">
                                {t('TOTAL_INTEREST')}
                            </p>
                            <p className="text-lg font-semibold text-accent">
                                {result.data ? formatCurrency(result.data.totalInterestPaid, forCountry?.currencySymbol) : (`${forCountry?.currencySymbol}0.00`)}
                            </p>
                        </div>
                        </div>

                        {/* Principal vs Interest Bar */}
                        <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{t('PRINCIPAL')} ({result.data ? (result.data.totalPaid / (result.data.totalPaid + result.data.totalInterestPaid) * 100).toFixed(1) : "0"}%)</span>
                            <span>{t('INTEREST')} ({result.data ? (result.data.totalInterestPaid / (result.data.totalPaid + result.data.totalInterestPaid) * 100).toFixed(1) : "0"}%)</span>
                        </div>
                        {result.data && (
                            <div className="h-4 rounded-full bg-muted overflow-hidden flex">
                                <div
                                className="bg-foreground transition-all duration-500"
                                    style={{ width: `${(result.data.totalPaid / (result.data.totalPaid + result.data.totalInterestPaid)) * 100}%` }}
                                />
                                <div
                                className="bg-accent transition-all duration-500"
                                    style={{ width: `${(result.data.totalInterestPaid / (result.data.totalPaid + result.data.totalInterestPaid)) * 100}%` }}
                                />
                            </div>
                        )}
                        </div>
                    </CardContent>
                </Card>

                {/* Amortization Preview */}
                <Card className="border-border bg-card">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg">{t('AMORTIZATION_SCHEDULE')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                        <div className="grid grid-cols-4 gap-2 text-xs font-medium text-muted-foreground pb-2 border-b border-border sticky top-0 bg-card">
                            <span>{t('YEAR')}</span>
                            <span>{t('PRINCIPAL')}</span>
                            <span>{t('INTEREST')}</span>
                            <span>{t('BALANCE')}</span>
                        </div>
                        {result.data ? (
                            result.data.amortizationSchedule.slice(0, 10).map((row) => (
                                <div
                                key={row.year}
                                className="grid grid-cols-4 gap-2 text-sm py-2 border-b border-border/50"
                                >
                                <span className="font-medium">{row.year}</span>
                                <span>{formatCurrency(row.principal, forCountry?.currencySymbol)}</span>
                                <span className="text-accent">
                                    {formatCurrency(row.interest, forCountry?.currencySymbol)}
                                </span>
                                <span className="text-muted-foreground">
                                    {formatCurrency(row.balance, forCountry?.currencySymbol)}
                                </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground text-center py-4">
                                {t('NO_DATA_DISPLAY')}
                            </p>
                        )}
                        {result.data && result.data.amortizationSchedule.length > 10 && (
                            <p className="text-xs text-muted-foreground text-center pt-2">
                            {t('MORE_YEARS', { count: result.data.amortizationSchedule.length - 10 })}
                            </p>
                        )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
