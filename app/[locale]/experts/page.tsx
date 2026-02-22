"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ExpertCard } from "@/components/expert-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  Landmark,
  Building2,
  Home,
  PackageSearch,
  Search,
  Users,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';
import { fetchExpertsStart } from "@/app/[locale]/experts/store/slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import { Button } from "@/components/ui/button";

export default function ExpertsPage() {
    const t = useTranslations('Experts');
    const locale = useLocale();
    const dispatch = useDispatch();
    const { experts } = useSelector((state: RootState) => state.experts);

    
    const [selectedCalculator, setSelectedCalculator] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    
    useEffect(() => {
        if (selectedCountry) {
            dispatch(fetchExpertsStart({ countryCode: selectedCountry }));
        }
    }, [selectedCountry]);

    const calculatorTypes = [
        { id: "all", name: "All Calculators", icon: Calculator },
        { id: "loan", name: `${t('LOAN')}`, icon: Calculator },
        { id: "income-tax", name: `${t('INCOME_TAX')}`, icon: Landmark },
        { id: "corporate-tax", name: `${t('CORPORATE_TAX')}`, icon: Building2 },
        { id: "mortgage", name: `${t('MORTGAGE')}`, icon: Home },
        { id: "import-tax", name: `${t('IMPORT_TAX_DUTIES')}`, icon: PackageSearch },
    ];

    const countries = [
        { code: "us", name: `${t('UNITED_STATES')}` },
        { code: "gb", name: `${t('UNITED_KINGDOM')}` },
        { code: "ca", name: `${t('CANADA')}` },
        { code: "au", name: `${t('AUSTRALIA')}` },
        { code: "de", name: `${t('GERMANY')}` },
        { code: "fr", name: `${t('FRANCE')}` },
        { code: "jp", name: `${t('JAPAN')}` },
        { code: "za", name: `${t('SOUTH_AFRICA')}` },
    ];

    // const filteredExperts = useMemo(() => {
    //     return experts.filter((expert) => {
    //     const matchesCalculator =
    //         selectedCalculator === "all" ||
    //         expert.calculators.some(
    //         (c) => c.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-") === selectedCalculator
    //         );
    //     const matchesSearch =
    //         searchQuery === "" ||
    //         expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //         expert.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //         expert.role.toLowerCase().includes(searchQuery.toLowerCase());
    //     return matchesCalculator && matchesSearch;
    //     });
    // }, [selectedCalculator, searchQuery]);

    return (
        <>
            <Header />
            <main className="relative pt-32 pb-20 min-h-screen overflow-hidden">
                {/* Background gradients */}
                <div className="absolute inset-0 -z-10">
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-accent/20 via-accent/5 to-transparent blur-3xl" />
                <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-teal-400/15 via-emerald-300/5 to-transparent blur-3xl" />
                <div className="absolute bottom-0 left-1/3 w-[600px] h-[300px] rounded-full bg-gradient-to-t from-accent/10 to-transparent blur-3xl" />
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm text-accent mb-6">
                    <Users className="h-4 w-4" />
                    {t('TOP_BADGE')}
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground text-balance">
                    {t('TITLE1')}{" "}
                    <span className="bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
                        {t('TITLE2')}
                    </span>
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        {t('DESCRIPTION')}
                    </p>
                    <Button size="lg" className="gap-2 px-8 mt-4">
                        <Link href={`/${locale}/experts/join`}>{t('JOIN_EXPERTS')}</Link>
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={t('SEARCH_PLACEHOLDER')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    <Select
                        value={selectedCountry}
                        onValueChange={setSelectedCountry}
                    >
                        <SelectTrigger className="w-full sm:w-64">
                            <SelectValue placeholder="Filter by country" />
                        </SelectTrigger>
                        <SelectContent>
                            {countries.map((country) => (
                                <SelectItem key={country.code} value={country.code}>
                                    <span className="flex items-center gap-2">
                                        {country.name}
                                    </span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select 
                        value={selectedCalculator}
                        onValueChange={setSelectedCalculator}
                    >
                        <SelectTrigger className="w-full sm:w-64">
                            <SelectValue placeholder="Filter by calculator" />
                        </SelectTrigger>
                        <SelectContent>
                            {calculatorTypes.map((calc) => (
                                <SelectItem key={calc.id} value={calc.id}>
                                    <span className="flex items-center gap-2">
                                        <calc.icon className="h-4 w-4 text-muted-foreground" />
                                        {calc.name}
                                    </span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Badge variant="secondary" className="shrink-0 py-2 px-4 text-sm justify-center">
                    {experts.data?.length}{" "}
                    {experts.data?.length === 1 ? t('EXPERT') : t('EXPERTS')}
                    </Badge>
                </div>

                {/* Expert Grid */}
                {experts.data && experts.data.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {experts?.data?.map((expert) => (
                        <ExpertCard key={expert.id} expert={expert} />
                    ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                        <Users className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                        {t('NO_EXPERTS_FOUND')}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                        {t('NO_FOUND_DESC')}
                    </p>
                    </div>
                )}
                </div>
            </main>
            <Footer />
        </>
    );
}
