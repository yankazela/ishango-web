"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
    Scale,
    Plus,
    X,
    Calendar,
    TrendingDown,
    Landmark,
    Building2,
    CreditCard,
    Home,
    PackageSearch,
    ArrowRight,
    ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { GetCalCountriesResponse, InputField } from "@/app/[locale]/calculators/types";
import { EbaseUrls } from "@/services/requests/types";
import { RootState } from "@/store/rootStore";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";

const BASE_URL = EbaseUrls.ISHANGO_BE;

const CALCULATOR_TYPES = [
    { value: "income-tax", label: "Income Tax", icon: Landmark, endpoint: "/calculators/process-income-tax/private" },
    { value: "corporate-tax", label: "Corporate Tax", icon: Building2, endpoint: "/calculators/process-corporate-tax" },
    { value: "capital-gains", label: "Capital Gains Tax", icon: CreditCard, endpoint: "/calculators/process-capital-gains-tax" },
    { value: "mortgage", label: "Mortgage", icon: Home, endpoint: "/calculators/process-mortgage" },
    { value: "inheritance-tax", label: "Inheritance Tax", icon: PackageSearch, endpoint: "/calculators/process-inheritance-tax" },
] as const;

type CalcTypeValue = (typeof CALCULATOR_TYPES)[number]["value"];

const TAX_YEARS = ["2026", "2025", "2024", "2023", "2022"];

interface ColumnResult {
    [key: string]: number | string;
}

interface Column {
    id: string;
    countryCode: string;
    countryData: GetCalCountriesResponse | null;
    formInputs: { [key: string]: any };
    result: ColumnResult | null;
    loading: boolean;
    error: string | null;
}

function formatCurrency(value: number, symbol?: string) {
    return `${symbol ?? ""}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function createColumn(id: string): Column {
    return { id, countryCode: "", countryData: null, formInputs: {}, result: null, loading: false, error: null };
}

export default function ComparisonPage() {
    const t = useTranslations("DashboardPage");
    const [calcType, setCalcType] = useState<CalcTypeValue>("income-tax");
    const [taxYear, setTaxYear] = useState("2025");
    const [countries, setCountries] = useState<GetCalCountriesResponse[]>([]);
    const [countriesLoading, setCountriesLoading] = useState(false);
    const [columns, setColumns] = useState<Column[]>([createColumn("col-1"), createColumn("col-2")]);
    const { calculators } = useSelector((state: RootState) => state.dashboard);

    // fetch country list when calcType or taxYear changes
    useEffect(() => {
        setCountriesLoading(true);
        setColumns((prev) => prev.map((c) => ({ ...c, countryData: null, formInputs: {}, result: null })));
        axios
            .get(`${BASE_URL}/countries/calculators/${calcType}/${taxYear}`)
            .then((res) => setCountries(res.data))
            .catch(() => setCountries([]))
            .finally(() => setCountriesLoading(false));
    }, [calcType, taxYear]);

    const calcConfig = CALCULATOR_TYPES.find((c) => c.value === calcType)!;

    const updateColumn = useCallback((id: string, patch: Partial<Column>) => {
        setColumns((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
    }, []);

    const handleSelectCountry = (id: string, code: string) => {
        const countryData = countries.find((c) => c.code === code) ?? null;
        updateColumn(id, {
            countryCode: code,
            countryData,
            formInputs: { countryCode: code.toLowerCase(), year: taxYear },
            result: null,
            error: null,
        });
    };

    const handleInputChange = (id: string, name: string, value: any) => {
        setColumns((prev) =>
            prev.map((c) => (c.id === id ? { ...c, formInputs: { ...c.formInputs, [name]: value }, result: null } : c))
        );
    };

    const handleCalculate = async (id: string) => {
        const col = columns.find((c) => c.id === id);
        if (!col) return;
        updateColumn(id, { loading: true, error: null, result: null });
        try {
            const res = await axios.post(`${BASE_URL}${calcConfig.endpoint}`, col.formInputs, {
                headers: { "Content-Type": "application/json" },
            });
            updateColumn(id, { loading: false, result: res.data });
        } catch (e: any) {
            updateColumn(id, {
                loading: false,
                error: e?.response?.data?.message ?? "Calculation failed.",
            });
        }
    };

    const handleAddColumn = () => {
        if (columns.length >= 4) return;
        setColumns((prev) => [...prev, createColumn(`col-${Date.now()}`)]);
    };

    const handleRemoveColumn = (id: string) => {
        setColumns((prev) => prev.filter((c) => c.id !== id));
    };

    // Collect all result keys across columns for the comparison table
    const resultKeys = Array.from(
        new Set(columns.flatMap((c) => (c.result ? Object.keys(c.result).filter((k) => typeof c.result![k] === "number") : [])))
    );

    const formatKey = (key: string) =>
        key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Badge variant="secondary" className="mb-3 gap-2 px-3 py-1">
                        <Scale className="h-3.5 w-3.5" />
                        Comparison
                    </Badge>
                    <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                        Compare tax results across countries
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                        Select a calculator type and tax year, then configure up to four country columns to see results side by side.
                    </p>
                </div>

                {/* Global controls */}
                <Card className="mb-8 border-border/70 bg-card/80">
                    <CardContent className="pt-6">
                        <div className="flex flex-wrap gap-4">
                            <div className="space-y-1.5">
                                <Label>Calculator type</Label>
                                <Select value={calcType} onValueChange={(v) => setCalcType(v as CalcTypeValue)}>
                                    <SelectTrigger className="w-48">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {calculators.data?.map((ct) => {
                                            const icon = CALCULATOR_TYPES.find((c) => c.value === ct.code.toLocaleLowerCase())?.icon;
                                            const Icon = icon;
                                            return (
                                            <SelectItem key={ct.id} value={ct.code}>
                                                <div className="flex items-center gap-2">
                                                    {Icon && <Icon className="h-4 w-4" />}
                                                    {t(ct.code)}
                                                </div>
                                            </SelectItem>
                                        )})}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1.5">
                                <Label>Tax year</Label>
                                <Select value={taxYear} onValueChange={(v) => { setTaxYear(v); setColumns((prev) => prev.map((c) => ({ ...c, formInputs: c.countryCode ? { countryCode: c.countryCode.toLowerCase(), year: v } : {}, result: null }))); }}>
                                    <SelectTrigger className="w-32">
                                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {TAX_YEARS.map((y) => (
                                            <SelectItem key={y} value={y}>{y}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Columns */}
                <div className={`grid gap-4 mb-8 ${columns.length === 1 ? "grid-cols-1 max-w-sm" : columns.length === 2 ? "grid-cols-1 md:grid-cols-2" : columns.length === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2 xl:grid-cols-4"}`}>
                    {columns.map((col) => (
                        <Card key={col.id} className="border-border/70 bg-card/80 flex flex-col">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                        Country
                                    </CardTitle>
                                    {columns.length > 2 && (
                                        <button
                                            onClick={() => handleRemoveColumn(col.id)}
                                            className="text-muted-foreground hover:text-destructive transition-colors"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                                {countriesLoading ? (
                                    <Skeleton className="h-9 w-full" />
                                ) : (
                                    <Select value={col.countryCode} onValueChange={(v) => handleSelectCountry(col.id, v)}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select country…" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {countries.map((c) => (
                                                <SelectItem key={c.code} value={c.code}>
                                                    {t(c.name)} ({c.currency})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            </CardHeader>

                            {col.countryData && (
                                <CardContent className="flex flex-col gap-4 flex-1">
                                    {/* Province selector */}
                                    {col.countryData.withProvincial && (
                                        <div className="space-y-1.5">
                                            <Label>Province / State</Label>
                                            <Select
                                                value={col.formInputs.provinceCode ?? ""}
                                                onValueChange={(v) => handleInputChange(col.id, "provinceCode", v)}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select province…" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {col.countryData.provinces.map((p) => (
                                                        <SelectItem key={p.code} value={p.code}>{p.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}

                                    {/* Dynamic form fields */}
                                    {col.countryData.formInputs.map((field: InputField) => (
                                        <div key={field.name} className="space-y-1.5">
                                            <Label>
                                                {field.label}{field.isCurrency ? ` (${col.countryData!.currency})` : ""}
                                            </Label>
                                            <div className="relative">
                                                {field.isCurrency && (
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                                                        {col.countryData!.currencySymbol}
                                                    </span>
                                                )}
                                                {(field.type === "number" || field.type === "text") && (
                                                    <Input
                                                        type={field.type}
                                                        value={col.formInputs[field.name] ?? ""}
                                                        onChange={(e) => handleInputChange(col.id, field.name, e.target.value)}
                                                        className={field.isCurrency ? "" : "pl-3"}
                                                        style={field.isCurrency ? { paddingLeft: `${1.75 + (col.countryData!.currencySymbol.length - 1) * 0.5}rem` } : undefined}
                                                    />
                                                )}
                                                {field.type === "select" && field.options && (
                                                    <Select
                                                        value={col.formInputs[field.name] ?? ""}
                                                        onValueChange={(v) => handleInputChange(col.id, field.name, v)}
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select…" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {field.options.map((opt) => (
                                                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                                {field.type === "boolean" && (
                                                    <div className="flex gap-4">
                                                        {[true, false].map((v) => (
                                                            <button
                                                                key={String(v)}
                                                                type="button"
                                                                onClick={() => handleInputChange(col.id, field.name, v)}
                                                                className="flex items-center gap-2"
                                                            >
                                                                <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${col.formInputs[field.name] === v ? "border-accent bg-accent" : "border-border"}`} />
                                                                <span className="text-sm">{v ? "Yes" : "No"}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    <Button
                                        className="w-full mt-auto"
                                        size="sm"
                                        disabled={col.loading}
                                        onClick={() => handleCalculate(col.id)}
                                    >
                                        {col.loading ? "Calculating…" : "Calculate"}
                                        <ArrowRight className="ml-2 h-3.5 w-3.5" />
                                    </Button>

                                    {col.error && (
                                        <p className="text-xs text-destructive">{col.error}</p>
                                    )}

                                    {/* Inline result summary */}
                                    {col.result && (
                                        <div className="pt-3 border-t border-border space-y-2">
                                            {resultKeys.map((key) => {
                                                const val = col.result![key];
                                                if (typeof val !== "number") return null;
                                                return (
                                                    <div key={key} className="flex justify-between text-sm">
                                                        <span className="text-muted-foreground">{formatKey(key)}</span>
                                                        <span className="font-medium text-foreground">
                                                            {formatCurrency(val, col.countryData?.currencySymbol)}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </CardContent>
                            )}

                            {!col.countryData && !countriesLoading && (
                                <CardContent>
                                    <p className="text-sm text-muted-foreground text-center py-4">
                                        Select a country to configure inputs.
                                    </p>
                                </CardContent>
                            )}
                        </Card>
                    ))}

                    {/* Add column button */}
                    {columns.length < 4 && (
                        <button
                            onClick={handleAddColumn}
                            className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border text-muted-foreground hover:border-accent hover:text-accent transition-colors min-h-[200px]"
                        >
                            <Plus className="h-6 w-6" />
                            <span className="text-sm font-medium">Add country</span>
                        </button>
                    )}
                </div>

                {/* Comparison table */}
                {resultKeys.length > 0 && (
                    <Card className="border-border/70">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Scale className="h-5 w-5 text-accent" />
                                Side-by-side comparison
                            </CardTitle>
                            <CardDescription>
                                Results across all calculated countries for {taxYear}.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-border">
                                            <th className="text-left py-3 pr-6 text-muted-foreground font-medium">Metric</th>
                                            {columns.map((col) =>
                                                col.result ? (
                                                    <th key={col.id} className="text-right py-3 px-4 font-semibold text-foreground min-w-[140px]">
                                                        <div>{col.countryData?.name ?? col.countryCode}</div>
                                                        <div className="text-xs font-normal text-muted-foreground">{col.countryData?.currency}</div>
                                                    </th>
                                                ) : null
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {resultKeys.map((key, i) => {
                                            // Find column with highest value to highlight
                                            const values = columns
                                                .filter((c) => c.result)
                                                .map((c) => ({ id: c.id, val: (c.result![key] as number) ?? 0 }));
                                            const minId = values.reduce((a, b) => (a.val <= b.val ? a : b), values[0])?.id;

                                            return (
                                                <tr key={key} className={`border-b border-border/50 ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                                                    <td className="py-3 pr-6 text-muted-foreground">{formatKey(key)}</td>
                                                    {columns.map((col) =>
                                                        col.result ? (
                                                            <td key={col.id} className={`text-right py-3 px-4 font-medium tabular-nums ${col.id === minId && key.toLowerCase().includes("tax") ? "text-emerald-600" : "text-foreground"}`}>
                                                                {typeof col.result[key] === "number"
                                                                    ? formatCurrency(col.result[key] as number, col.countryData?.currencySymbol)
                                                                    : String(col.result[key])}
                                                            </td>
                                                        ) : null
                                                    )}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
