"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Star } from "lucide-react";
import Link from "next/link";
import { ExpertListItem } from "@/app/[locale]/experts/store/state";
import { useTranslations } from "next-intl";


export function ExpertCard({ expert }: { expert: ExpertListItem }) {
    const t = useTranslations('Experts');
  return (
    <div className="group [perspective:1000px]">
      <div className="relative w-full aspect-[3/4] transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front Face */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <div className="relative h-full w-full rounded-2xl overflow-hidden border border-border bg-card shadow-sm">
            {/* Image */}
            <div className="relative w-full h-[65%] bg-muted overflow-hidden">
              <Image
                src={expert.image}
                alt={`${expert.name} - ${expert.role}`}
                fill
                className={`object-cover ${expert.type === "company" ? "object-contain p-6" : ""}`}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            </div>

            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center gap-1 mb-1.5">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-medium text-foreground">
                  {expert.rating.toFixed(1)}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-foreground leading-snug text-balance">
                {expert.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {expert.role}
              </p>
              <div className="flex items-center gap-1 mt-2">
                {/* <MapPin className="h-3 w-3 text-accent" />
                <span className="text-xs text-muted-foreground">
                  {expert.country}
                </span> */}
              </div>
              <Button size="sm" className="w-full mt-3 gap-1.5 text-xs" asChild>
                <Link href={`/experts/${expert.id}`}>
                  {t('VIEW_MORE')}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="relative h-full w-full rounded-2xl overflow-hidden border border-accent/40 bg-gradient-to-br from-card via-card to-accent/5 shadow-md flex flex-col">
            {/* Decorative top bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-accent via-teal-400 to-accent" />

            <div className="flex-1 flex flex-col justify-between p-5">
              <div>
                {/* Small avatar */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-accent/30 shrink-0">
                    <Image
                      src={expert.image}
                      alt={expert.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground leading-tight">
                      {expert.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {expert.role}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {expert.description}
                </p>

                {/* Specialties */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {expert.calculators.map((calc) => (
                    <span
                      key={calc}
                      className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-medium text-accent"
                    >
                      {t(calc)}
                    </span>
                  ))}
                </div>
              </div>

              <Button size="sm" className="w-full gap-1.5 text-xs mt-4" asChild>
                <Link href={`/experts/${expert.id}`}>
                  {t('VIEW_FULL_PROFILE')}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
