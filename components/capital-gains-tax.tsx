"use client";

import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
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
import { TrendingUp, Info, Calendar, DollarSign, ArrowRight } from "lucide-react";
import { RootState } from "@/store/rootStore";
import { calculateCapitalGainsTax, fetchCalculatorsStart, resetResult } from "../app/[locale]/calculators/capital-gains-tax/store/slice";
import { formatCurrency } from "@/lib/utils";


export function CapitalGainsCalculator() {
    const t = useTranslations("CapitalGainsTaxCalculator");
    const dispatch = useDispatch();
    
    const [taxYear, setTaxYear] = useState("2025");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [formInputs, setFormInputs] = useState<Record<string, any>>({});
    const [assetType, setAssetType] = useState("stocks");
    const { form, results  } = useSelector((state: RootState) => state.capitalGainsTaxCalculator);
    const taxYears = ["2026", "2025", "2024", "2023", "2022"];
    
    const assetTypes = [
      { value: "stocks", label: t("STOCKS_AND_ETF") },
      { value: "crypto", label: t("CRYPTOCURRENCY") },
      { value: "real_estate", label: t("REAL_ESTATE") },
      { value: "collectibles", label: t("COLLECTIBLES_AND_ART") },
      { value: "other", label: t("OTHER_ASSETS") },
    ];

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
            year: taxYear,
            isSmallBusiness: null
        });
        dispatch(resetResult());
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
        
        dispatch(calculateCapitalGainsTax({
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
            <TrendingUp className="h-5 w-5 text-accent" />
            {t('CALCULATE_CAPITAL_GAINS_TAX')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Country and Tax Year Selection */}
            <div className="grid grid-cols-2 gap-4">
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
                    <Select value={taxYear} onValueChange={handleSetTaxYear}>
                        <SelectTrigger id="tax-year" className="w-full">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <SelectValue placeholder="Select year" />
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
                        {type.label}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>

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

      {/* Results */}
      <div className="space-y-6">
        {/* Main Result Card */}
        <Card
          className={`border-2 ${(results.data?.taxableGain || 0) - (results.data?.totalTax || 0) >= 0 ? "border-emerald-500/50 bg-gradient-to-br from-emerald-500/5 to-transparent" : "border-red-500/50 bg-gradient-to-br from-red-500/5 to-transparent"}`}
        >
            <CardContent className="p-6">
                <div className="text-center mb-4">
                    <p className="text-sm text-muted-foreground mb-1">
                        {"Total Earnings After Tax"}
                    </p>
                    <p
                        className={`text-4xl font-bold ${(results.data?.taxableGain || 0) - (results.data?.totalTax || 0) >= 0 ? "text-emerald-600" : "text-red-600"}`}
                    >
                        {(results.data?.taxableGain || 0) - (results.data?.totalTax || 0) >= 0 ? "+" : ""}
                        {forCountry?.currencySymbol}
                        {Math.abs((results.data?.taxableGain || 0) - (results.data?.totalTax || 0)).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </p>
                    <Badge
                        variant="secondary"
                        className={`mt-2 ${formInputs['holdingPeriodMonths'] && formInputs['holdingPeriodMonths'] >= 12 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
                    >
                        {formInputs['holdingPeriodMonths'] ? (formInputs['holdingPeriodMonths'] >= 12 ? "Long-term" : "Short-term") : "Normal-term"} Gain
                    </Badge>
                </div>
                <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                            {t('TOTAL_GAIN_LOSS')}
                        </span>
                        <span className={`font-medium ${(results.data?.taxableGain &&  results.data?.taxableGain >= 0) ? "text-emerald-600" : "text-red-600"}`}>
                            {formatCurrency(results.data?.taxableGain || 0, forCountry?.currencySymbol)}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                            {t('CAPITAL_GAINS_TAX')}
                        </span>
                        <span className={`font-medium ${(results.data?.capitalGainTax &&  results.data?.capitalGainTax >= 0) ? "text-emerald-600" : "text-red-600"}`}>
                            {formatCurrency(results.data?.capitalGainTax || 0, forCountry?.currencySymbol)}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                            {t('SOCIAL_CONTRIBUTIONS')}
                        </span>
                        <span className="font-medium">
                            {formatCurrency(results.data?.socialContributions || 0, forCountry?.currencySymbol)}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                            {t('NET_INVESTMENT_INCOME_TAX')}
                        </span>
                        <span className="font-medium">
                            {formatCurrency(results.data?.netInvestmentIncomeTax || 0, forCountry?.currencySymbol)}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                            {t('TOTAL_OWED')}
                        </span>
                        <span className={`text-xl font-bold text-foreground ${(results.data?.totalTax &&  results.data?.totalTax >= 0) ? "text-emerald-600" : "text-red-600"}`}>
                            {formatCurrency(results.data?.totalTax || 0, forCountry?.currencySymbol)}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>

        {/* Tax Breakdown */}
        <Card>
            <CardHeader className="pb-4">
                <CardTitle className="text-lg">{t('TAX_BREAKDOWN')}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {results.data && results.data.breakdowns ? (
                        results.data.breakdowns.map((bracket, index) => (
                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50" key={index}>
                                <div>
                                    <p className="text-sm font-medium text-foreground">
                                    {t(`BRACKET_${index + 1}`)}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {bracket.rate}% {t('TAX_RATE')}
                                    </p>
                                </div>
                                <p className="font-medium text-foreground">
                                    {forCountry ? forCountry.currencySymbol : ''}{bracket.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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

        {/* Net Proceeds */}
        <Card className="bg-gradient-to-br from-accent/10 via-card to-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('NET_PROCEEDS')}</p>
                <p className="text-sm text-muted-foreground">
                  ({t('SALE_PRICE')} - {t('TAX')})
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-foreground">
                  {forCountry?.currencySymbol}
                  {(results.data?.taxableGain || 0).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>

            {/* Visual Bar */}
            <div className="mt-4">
              <div className="h-3 bg-muted rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-emerald-500"
                  style={{
                    width: `${results.data?.taxableGain && results.data?.taxableGain  > 0 ? ((results.data?.taxableGain - (results.data?.totalTax || 0)) / results.data?.taxableGain) * 100 : 0}%`,
                  }}
                />
                <div
                  className="h-full bg-red-400"
                  style={{
                    width: `${results.data?.totalTax && results.data?.totalTax > 0 ? ((results.data?.totalTax || 0) / results.data?.taxableGain) * 100 : 0}%`,
                  }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>
                  {t('NET')}: {results.data?.taxableGain && results.data?.taxableGain > 0 ? (((results.data?.taxableGain - (results.data?.totalTax || 0)) / results.data?.taxableGain) * 100).toFixed(1) : 0}%
                </span>
                <span>
                  {t('TAX')}: {results.data?.totalTax && results.data?.totalTax > 0 ? (((results.data?.totalTax || 0) / results.data?.taxableGain) * 100).toFixed(1) : 0}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
