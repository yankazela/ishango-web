import { useTranslations } from "next-intl";

export function CountriesSection() {
    const t = useTranslations("Home");
    const countries = [
        { name: t("UNITED_STATES"), code: "US", flag: "🇺🇸" },
        { name: t("UNITED_KINGDOM"), code: "UK", flag: "🇬🇧" },
        { name: t("CANADA"), code: "CA", flag: "🇨🇦" },
        { name: t("GERMANY"), code: "DE", flag: "🇩🇪" },
        { name: t("FRANCE"), code: "FR", flag: "🇫🇷" },
        { name: t("AUSTRALIA"), code: "AU", flag: "🇦🇺" },
        { name: t("JAPAN"), code: "JP", flag: "🇯🇵" },
        { name: t("SOUTH_AFRICA"), code: "ZA", flag: "🇿🇦" },
        { name: t("INDIA"), code: "IN", flag: "🇮🇳" },
        { name: t("SWITZERLAND"), code: "CH", flag: "🇨🇭" },
        { name: t("BRAZIL"), code: "BR", flag: "🇧🇷" },
        { name: t("SPAIN"), code: "ES", flag: "🇪🇸" },
    ];
    
    const stats = [
        { value: "50+", label: t('SECTION3_ITEM1') },
        { value: "99.99%", label: t('SECTION3_ITEM2') },
        { value: "10M+", label: t('SECTION3_ITEM3') },
        { value: "<100ms", label: t('SECTION3_ITEM4') },
    ];
    return (
        <section id="countries" className="py-20 lg:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <p className="text-4xl lg:text-5xl font-semibold text-foreground">
                                {stat.value}
                            </p>
                            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Countries Grid */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-semibold text-foreground text-balance">
                        {t('SECTION3_TITLE')}
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t('SECTION3_DESCRIPTION')}
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {countries.map((country) => (
                    <div
                    key={country.code}
                    className="flex flex-col items-center gap-2 bg-card rounded-xl border border-border p-4 hover:border-accent/50 transition-colors"
                    >
                    <span className="text-3xl" role="img" aria-label={country.name}>
                        {country.flag}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                        {country.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                        {country.code}
                    </span>
                    </div>
                ))}
                </div>

                <p className="mt-8 text-center text-sm text-muted-foreground">
                    {t('SECTION3_ADD')}
                </p>
            </div>
        </section>
    );
}
