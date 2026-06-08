"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
import {
  Calculator,
  Landmark,
  Building2,
  Home,
  PackageSearch,
  ArrowRight,
  ArrowLeft,
  Check,
  Upload,
  User,
  Building,
  X,
  Globe,
  ShieldCheck,
  BadgeCheck,
  Mail,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import { createExpertStart, fetchCountriesStart } from "../store/slice";
import { CountryWithCalculatorsItem } from "../store/state";
import { DIAL_CODES, formatPhoneNumber, extractDigits } from "@/lib/dial-codes";
import { Textarea } from "@/components/ui/textarea";

const icons: { [key: string]: React.ComponentType } = {
    'INHERITANCE_TAX': Calculator,
    'INCOME_TAX': Landmark,
    'CORPORATE_TAX': Building2,
    'MORTGAGE': Home,
    'CAPITAL_GAINS': PackageSearch,
};

const steps = [
    { number: 1, label: "Personal Info" },
    { number: 2, label: "Expertise" },
    { number: 3, label: "Confirmation" },
];


export default function JoinAsExpertPage() {
    const t = useTranslations('Experts');
    const locale = useLocale();
    const dispatch = useDispatch();
    const { countries } = useSelector((state: RootState) => state.experts);

    const [step, setStep] = useState(1);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        dispatch(fetchCountriesStart());
    }, [dispatch]);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        phoneDigits: "",
        dialCode: "+1",
        dialIso: "US",
        bio: "",
        expertType: "" as "individual" | "company" | "",
        role: "",
    });
    const [phoneError, setPhoneError] = useState<string | null>(null);
    const [showErrors, setShowErrors] = useState(false);

    const [countryExpertise, setCountryExpertise] = useState<CountryWithCalculatorsItem[]>(
        []
    );
    const [selectedAddCountry, setSelectedAddCountry] = useState("");

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB.');
                return;
            }
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setProfilePictureFile(file);
        }
    };

    const removeProfilePicture = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(null);
        setProfilePictureFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const addCountry = (countryId: string) => {
        const country = countries.data.find((c) => c.id === countryId);
        if (
            countryId &&
            country &&
            !countryExpertise.some((ce) => ce.id === countryId)
        ) {
            setCountryExpertise((prev) => [
                ...prev,
                { ...country, calculators: [] },
            ]);
            setSelectedAddCountry("");
        }
    };

    const removeCountry = (countryId: string) => {
        setCountryExpertise((prev) =>
            prev.filter((ce) => ce.id !== countryId)
        );
    };

    const toggleCalculator = (countryId: string, calcId: string) => {
        const country = countries.data.find((c) => c.id === countryId);
        const calc = country?.calculators.find((c) => c.id === calcId);
        setCountryExpertise((prev) =>
            prev.map((ce) => {
                if (ce.id !== countryId) return ce;
                const has = ce.calculators.find((c) => c.id === calcId);
                return {
                ...ce,
                calculators: has
                    ? ce.calculators.filter((c) => c.id !== calcId)
                    : [...ce.calculators, { id: calcId, name: calc?.name || "" }],
                };
            })
        );
    };

    const canProceed = () => {
        if (step === 1) {
        return (
            formData.fullName &&
            formData.email &&
            formData.phoneDigits &&
            formData.expertType &&
            formData.role &&
            formData.bio &&
            profilePictureFile
        );
        }
        if (step === 2) {
        return (
            countryExpertise.length > 0 &&
            countryExpertise.every((ce) => ce.calculators.length > 0)
        );
        }
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (step === 1 && !canProceed()) {
            setShowErrors(true);
            return;
        }
        setShowErrors(false);
        if (step === 2) {
            const calculators = countryExpertise.map((ce) => ce).map((c) => c.calculators);
            const calcIds = calculators.reduce((acc, curr) => [...acc, ...curr.map((c) => c.id)], [] as string[]);
            const payload = {
                name: formData.fullName,
                email: formData.email,
                phone: formData.dialCode + formData.phoneDigits,
                bio: formData.bio,
                profilePicture: profilePictureFile!,
                role: formData.role,
                rating: 0,
                expertType: formData.expertType === "individual" ? "INDIVIDUAL" : "COMPANY",
                calculatorCountryIds: calcIds,
            };

            dispatch(createExpertStart(payload as any));
        }
        if (step < 3) {
            setStep(step + 1);
        } 

    };

    const availableCountries = countries.data.filter(
        (c) => !countryExpertise.some((ce) => ce.id === c.id)
    );

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
                    <div className="h-8 w-8 rounded-lg bg-foreground flex items-center justify-center">
                    <Calculator className="h-5 w-5 text-background" />
                    </div>
                    <span className="text-xl font-semibold text-foreground">
                        Ishango Engine
                    </span>
                </Link>
                <Link
                    href="/experts"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    {t('BACK_TO_EXPERTS')}
                </Link>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
                {/* Left Column - Form */}
                <div className="lg:col-span-3 order-2 lg:order-1">
                    <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
                    {/* Progress Steps */}
                    <div className="flex items-center gap-2 mb-10">
                        {steps.map((s, i) => (
                        <div key={s.number} className="flex items-center gap-2">
                            <div className="flex items-center gap-2">
                            <div
                                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                                step > s.number
                                    ? "bg-accent text-accent-foreground"
                                    : step === s.number
                                    ? "bg-foreground text-background"
                                    : "bg-muted text-muted-foreground"
                                }`}
                            >
                                {step > s.number ? (
                                <Check className="h-4 w-4" />
                                ) : (
                                s.number
                                )}
                            </div>
                            <span
                                className={`text-sm hidden sm:inline ${
                                step === s.number
                                    ? "font-medium text-foreground"
                                    : "text-muted-foreground"
                                }`}
                            >
                                {s.label}
                            </span>
                            </div>
                            {i < steps.length - 1 && (
                            <div
                                className={`h-0.5 w-6 sm:w-10 ${
                                step > s.number ? "bg-accent" : "bg-border"
                                }`}
                            />
                            )}
                        </div>
                        ))}
                    </div>

                    {/* Step 3 - Confirmation */}
                    {step === 3 ? (
                        <div className="text-center py-12">
                        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-accent/20 to-teal-400/20 flex items-center justify-center mx-auto mb-6">
                            <div className="h-14 w-14 rounded-full bg-accent flex items-center justify-center">
                            <Check className="h-7 w-7 text-accent-foreground" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-semibold text-foreground mb-3">
                            {t('APPLICATION_RECEIVED')}
                        </h2>
                        <p className="text-muted-foreground max-w-md mx-auto leading-relaxed mb-2">
                            {t('APPLICATION_RECEIVED_DESC')}
                        </p>
                        <p className="text-muted-foreground max-w-md mx-auto leading-relaxed mb-8">
                            {t('CONTACT_AT')}{" "}
                            <span className="font-medium text-foreground">
                            {formData.email}
                            </span>{" "}
                            {t('SHORTLY')}
                        </p>

                        <div className="bg-muted/50 rounded-xl p-6 max-w-sm mx-auto mb-8">
                            <h3 className="text-sm font-semibold text-foreground mb-4">
                                {t('WHAT_HAAPENS_NEXT')}
                            </h3>
                            <div className="space-y-4 text-left">
                            {[
                                {
                                    icon: Mail,
                                    title: t('NEXT_STEP1'),
                                    desc: t('NEXT_STEP1_DESC'),
                                },
                                {
                                    icon: ShieldCheck,
                                    title: t('NEXT_STEP2'),
                                    desc: t('NEXT_STEP2_DESC'),
                                },
                                {
                                    icon: BadgeCheck,
                                    title: t('NEXT_STEP3'),
                                    desc: t('NEXT_STEP3_DESC'),
                                },
                            ].map((item) => (
                                <div key={item.title} className="flex items-start gap-3">
                                <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <item.icon className="h-4 w-4 text-accent" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">
                                        {item.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {item.desc}
                                    </p>
                                </div>
                                </div>
                            ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button asChild>
                                <Link href={`/${locale}/experts`}>{t('BROWSE_EXPERTS')}</Link>
                            </Button>
                            <Button variant="outline" asChild className="bg-transparent">
                                <Link href={`/${locale}`}>{t('BACK_TO_HOME')}</Link>
                            </Button>
                        </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                        {/* Step 1 - Personal Info */}
                        {step === 1 && (
                            <div className="space-y-6">
                            <div>
                                <h2 className="text-xl font-semibold text-foreground">
                                    {t('TELL_US_ABOUT_YOURSELF')}
                                </h2>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {t('PROVIDE_YOUR_DETAILS')}
                                </p>
                            </div>

                            {/* Profile Picture */}
                            <div className="space-y-2">
                                <Label>{t('PROFILE_PICTURE')} <span className="text-destructive">*</span></Label>
                                <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div
                                        className={`relative h-20 w-20 rounded-full border-2 border-dashed bg-muted flex items-center justify-center cursor-pointer overflow-hidden transition-colors ${
                                            !profilePictureFile
                                                ? "border-destructive/50 hover:border-destructive"
                                                : "border-accent hover:border-accent/80"
                                        }`}
                                        onClick={() => fileInputRef.current?.click()}
                                        onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ")
                                            fileInputRef.current?.click();
                                        }}
                                        role="button"
                                        tabIndex={0}
                                        aria-label="Upload profile picture"
                                    >
                                        {previewUrl ? (
                                        <Image
                                            src={previewUrl}
                                            alt={t('PROFILE_PREVIEW')}
                                            fill
                                            className="object-cover"
                                        />
                                        ) : (
                                        <Upload className="h-6 w-6 text-muted-foreground" />
                                        )}
                                    </div>
                                    {previewUrl && (
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeProfilePicture();
                                            }}
                                            className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90 transition-colors"
                                            aria-label="Remove profile picture"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    )}
                                </div>
                                <div>
                                    <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="bg-transparent"
                                    onClick={() => fileInputRef.current?.click()}
                                    >
                                    {previewUrl ? t('CHANGE_PHOTO') : t('UPLOAD_PHOTO')}
                                    </Button>
                                    <p className="text-xs text-muted-foreground mt-1">
                                    JPG, PNG. Max 5MB.
                                    </p>
                                    {showErrors && !profilePictureFile && (
                                        <p className="text-xs text-destructive mt-1">
                                        {t('PROFILE_PICTURE_REQUIRED')}
                                        </p>
                                    )}
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />
                                </div>
                            </div>

                            {/* Full Name */}
                            <div className="space-y-2">
                                <Label htmlFor="fullName">
                                {t('FULL_NAME_COMPANY_NAME')} <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                id="fullName"
                                placeholder="e.g. James Mitchell or Apex Financial Group"
                                value={formData.fullName}
                                onChange={(e) =>
                                        setFormData({
                                        ...formData,
                                        fullName: e.target.value,
                                    })
                                }
                                className={showErrors && !formData.fullName ? "border-destructive" : ""}
                                />
                                {showErrors && !formData.fullName && (
                                    <p className="text-xs text-destructive">{t('FIELD_REQUIRED')}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email">{t('EMAIL_ADDRESS')} <span className="text-destructive">*</span></Label>
                                <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                className={showErrors && !formData.email ? "border-destructive" : ""}
                                />
                                {showErrors && !formData.email && (
                                    <p className="text-xs text-destructive">{t('FIELD_REQUIRED')}</p>
                                )}
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <Label htmlFor="phone">{t('PHONE_NUMBER')} <span className="text-destructive">*</span></Label>
                                <div className="flex gap-2">
                                <Select
                                    value={formData.dialIso}
                                    onValueChange={(iso) => {
                                        const dial = DIAL_CODES.find((d) => d.iso === iso);
                                        if (!dial) return;
                                        setFormData({
                                            ...formData,
                                            dialCode: dial.code,
                                            dialIso: iso,
                                            phone: formatPhoneNumber(formData.phoneDigits, dial.code),
                                        });
                                    }}
                                >
                                    <SelectTrigger className="w-32 shrink-0">
                                    <SelectValue placeholder="+1" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    {DIAL_CODES.map((dial) => (
                                        <SelectItem key={dial.iso} value={dial.iso}>
                                        {dial.code} {dial.name}
                                        </SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="(555) 123-4567"
                                    value={formData.phone}
                                    onChange={(e) => {
                                        const digits = extractDigits(e.target.value);
                                        const masked = formatPhoneNumber(digits, formData.dialCode);
                                        setPhoneError(null);
                                        setFormData({ ...formData, phoneDigits: digits, phone: masked });
                                    }}
                                    onBlur={() => {
                                        if (!formData.phoneDigits) setPhoneError(t('PHONE_REQUIRED'));
                                    }}
                                    className={`flex-1 ${phoneError ? "border-destructive" : ""}`}
                                />
                                </div>
                                {(phoneError || (showErrors && !formData.phoneDigits)) && (
                                    <p className="text-xs text-destructive">{phoneError ?? t('PHONE_REQUIRED')}</p>
                                )}
                            </div>

                            {/* Expert Type */}
                            <div className="space-y-2">
                                <Label>{t('EXPERT_TYPE')} <span className="text-destructive">*</span></Label>
                                <div className="grid grid-cols-2 gap-3">
                                {[
                                    {
                                        id: "individual" as const,
                                        label: t('INDIVIDUAL'),
                                        icon: User,
                                        desc: t('FREELANCE_OR_INDEPENDENT_EXPERT'),
                                    },
                                    {
                                        id: "company" as const,
                                        label: t('COMPANY'),
                                        icon: Building,
                                        desc: t('COMPANY'),
                                    },
                                ].map((type) => (
                                    <button
                                    key={type.id}
                                    type="button"
                                    onClick={() =>
                                        setFormData({
                                        ...formData,
                                        expertType: type.id,
                                        })
                                    }
                                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all text-center ${
                                        formData.expertType === type.id
                                        ? "border-accent bg-accent/5"
                                        : "border-border hover:border-accent/50"
                                    }`}
                                    >
                                    <div
                                        className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                                        formData.expertType === type.id
                                            ? "bg-accent text-accent-foreground"
                                            : "bg-muted text-muted-foreground"
                                        }`}
                                    >
                                        <type.icon className="h-5 w-5" />
                                    </div>
                                    <span className="text-sm font-medium text-foreground">
                                        {type.label}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {type.desc}
                                    </span>
                                    </button>
                                ))}
                                </div>
                                {showErrors && !formData.expertType && (
                                    <p className="text-xs text-destructive">{t('FIELD_REQUIRED')}</p>
                                )}
                            </div>

                            {/* Role */}
                            <div className="space-y-2">
                                <Label htmlFor="role">{t('ROLE')} <span className="text-destructive">*</span></Label>
                                <Input
                                id="role"
                                placeholder={t('ROLE_PLACEHOLDER')}
                                value={formData.role}
                                onChange={(e) =>
                                    setFormData({ ...formData, role: e.target.value })
                                }
                                className={showErrors && !formData.role ? "border-destructive" : ""}
                                />
                                {showErrors && !formData.role && (
                                    <p className="text-xs text-destructive">{t('FIELD_REQUIRED')}</p>
                                )}
                            </div>

                            {/* Bio */}
                            <div className="space-y-2">
                                <Label htmlFor="bio">{t('BIO')} <span className="text-destructive">*</span></Label>
                                <Textarea
                                id="bio"
                                placeholder={t('BIO_PLACEHOLDER')}
                                value={formData.bio}
                                onChange={(e) =>
                                    setFormData({ ...formData, bio: e.target.value })
                                }
                                rows={4}
                                className={`resize-none ${showErrors && !formData.bio ? "border-destructive" : ""}`}
                                />
                                {showErrors && !formData.bio && (
                                    <p className="text-xs text-destructive">{t('FIELD_REQUIRED')}</p>
                                )}
                            </div>
                            </div>
                        )}

                        {/* Step 2 - Countries & Calculator Expertise */}
                        {step === 2 && (
                            <div className="space-y-6">
                            <div>
                                <h2 className="text-xl font-semibold text-foreground">
                                    {t('YOUR_EXPERTISE')}
                                </h2>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {t('SELECT_YOUR_EXPERTISE')}
                                </p>
                            </div>

                            {/* Add Country */}
                            <div className="space-y-2">
                                <Label>{t('ADD_COUNTRY')}</Label>
                                <div className="flex gap-2">
                                <Select
                                    value={selectedAddCountry}
                                    onValueChange={setSelectedAddCountry}
                                >
                                    <SelectTrigger className="flex-1">
                                    <SelectValue placeholder={t('SELECT_COUNTRY_TOADD')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                    {availableCountries.map((country) => (
                                        <SelectItem key={country.id} value={country.id}>
                                            {t(country.name)}
                                        </SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                                <Button
                                    type="button"
                                    onClick={() => addCountry(selectedAddCountry)}
                                    disabled={!selectedAddCountry}
                                >
                                    {t('ADD')}
                                </Button>
                                </div>
                            </div>

                            {/* Country Expertise List */}
                            {countryExpertise.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center rounded-xl border border-dashed border-border">
                                <Globe className="h-10 w-10 text-muted-foreground mb-3" />
                                <p className="text-sm font-medium text-foreground">
                                    {t('NO_COUNTRY_SELECTED')}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                                    {t('SELECT_COUNTRY_FROM_DROPDOWN')}
                                </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                {countryExpertise.map((ce) => (
                                    <div
                                    key={ce.id}
                                    className="rounded-xl border border-border p-4"
                                    >
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-sm font-semibold text-foreground">
                                        {t(ce.name)}
                                        </h3>
                                        <button
                                            type="button"
                                            onClick={() => removeCountry(ce.id)}
                                            className="h-6 w-6 rounded-full bg-muted flex items-center justify-center hover:bg-destructive/10 transition-colors"
                                            aria-label={`Remove ${t(ce.name)}`}
                                        >
                                            <X className="h-3 w-3 text-muted-foreground" />
                                        </button>
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-3">
                                        {t('SELECT_CALCULATORS')}
                                        {t(ce.name)}:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {countries.data.find((c) => c.id === ce.id)?.calculators.map((calc) => {
                                            const isSelected = ce.calculators.some(
                                                (c) => c.id === calc.id
                                            );
                                            const CalcInfo = icons[calc.name];
                                            return (
                                                <button
                                                    key={calc.id}
                                                    type="button"
                                                    onClick={() =>
                                                        toggleCalculator(ce.id, calc.id)
                                                    }
                                                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                                                        isSelected
                                                        ? "bg-accent text-accent-foreground"
                                                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                                                    }`}
                                                    >
                                                        <CalcInfo />
                                                        {t(calc.name)}
                                                    {isSelected && (
                                                        <Check className="h-3 w-3" />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {ce.calculators.length === 0 && (
                                        <p className="text-xs text-destructive mt-2">
                                            {t('SELECT_AT_LEAST_ONE_CALCULATOR')}
                                        </p>
                                    )}
                                    </div>
                                ))}
                                </div>
                            )}
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                            {step > 1 ? (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setStep(step - 1)}
                                    className="gap-2"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    {t('BACK')}
                                </Button>
                            ) : (
                            <div />
                            )}
                            <Button
                                type="submit"
                                disabled={step !== 1 && !canProceed()}
                                className="gap-2"
                            >
                                {step === 2 ? t('SUBMIT_APPLICATION') : t('CONTINUE')}
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                        </form>
                    )}
                    </div>
                </div>

                {/* Right Column - Benefits */}
                <div className="lg:col-span-2 order-1 lg:order-2">
                    <div className="sticky top-8 space-y-8">
                    <div>
                        <h1 className="text-3xl font-semibold text-foreground text-balance leading-tight">
                            {t('JOIN_AS_EXPERT')}
                        <span className="bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
                            {t('VERIFIED_EXPERT')}
                        </span>
                        </h1>
                        <p className="mt-3 text-muted-foreground leading-relaxed">
                            {t('DESCRIPTION_RIGHT')}
                        </p>
                    </div>

                    <div className="space-y-4">
                        {[
                        {
                            icon: Globe,
                            title: t('BENEFIT1_TITLE'),
                            desc: t('BENEFIT1_DESC'),
                        },
                        {
                            icon: BadgeCheck,
                            title: t('BENEFIT2_TITLE'),
                            desc: t('BENEFIT2_DESC'),
                        },
                        {
                            icon: ShieldCheck,
                            title: t('BENEFIT3_TITLE'),
                            desc: t('BENEFIT3_DESC'),
                        },
                        ].map((benefit) => (
                        <div
                            key={benefit.title}
                            className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border"
                        >
                            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                            <benefit.icon className="h-5 w-5 text-accent" />
                            </div>
                            <div>
                            <h3 className="text-sm font-semibold text-foreground">
                                {benefit.title}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                {benefit.desc}
                            </p>
                            </div>
                        </div>
                        ))}
                    </div>

                    <div className="p-5 rounded-xl bg-gradient-to-br from-foreground to-foreground/90 text-background">
                        <p className="text-sm font-medium leading-relaxed">
                            "{t('TESTIMONIAL_QUOTE')}"
                        </p>
                        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-background/20">
                        <div className="h-9 w-9 rounded-full bg-background/20 flex items-center justify-center">
                            <User className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Edward Pemberton</p>
                            <p className="text-xs text-background/70">
                                {t('TESTIMONIAL_ROLE')}
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </main>
        );
}
