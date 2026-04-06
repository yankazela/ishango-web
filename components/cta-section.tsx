import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  const t = useTranslations("Home");
  return (
		<section className="py-20 lg:py-32">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="relative overflow-hidden rounded-3xl bg-foreground px-8 py-16 sm:px-16 sm:py-24 text-center">
					<h2 className="text-3xl sm:text-4xl font-semibold text-background text-balance">
						{t("SECTION5_TITLE1")}
						<br />
						{t("SECTION5_TITLE2")}
					</h2>
					<p className="mt-4 text-lg text-background/70 max-w-xl mx-auto">
						{t("SECTION5_DESCRIPTION")}
					</p>
					<div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
						<Button
							size="lg"
							className="gap-2 bg-background text-foreground hover:bg-background/90"
						>
							{t("GET_STARTED_FREE")}
							<ArrowRight className="h-4 w-4" />
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="border-background/30 text-background hover:bg-background/10 bg-transparent"
						>
							{t("TALK_TO_SALES")}
						</Button>
					</div>

					<p className="mt-6 text-sm text-background/50">
						{t("SECTION5_FOOTER")}
					</p>
				</div>
			</div>
		</section>
  );
}
