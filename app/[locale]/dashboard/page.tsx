"use client"
import { useEffect } from "react";
import { useTranslations, useLocale } from 'next-intl';
import Link from "next/link";
import {
	KeyRound,
	BarChart3,
	History,
	LifeBuoy,
	ArrowRight,
	Copy,
	ShieldCheck,
	Clock3,
	Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store/rootStore";
import { useSession, useUser } from '@clerk/react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useSelector, useDispatch } from "react-redux";
import { fetchCalculators, fetchUserDetails } from "./store/slice";

const dashboardTiles = (local: string, t: any) => [
	{
		title: t("API_KEYS"),
		description: t("API_KEYS_DESCRIPTION"),
		icon: KeyRound,
		badge: t("CORE"),
		action: t("MANAGE_KEYS"),
		href: `/${local}/dashboard/api-keys`,
		details: [t("LIVE_KEY"), t("SANDBOX_KEY"), t("LAST_ROTATED")],
	},
	{
		title: t("USAGE_LIMITS"),
		description: t("USAGE_LIMITS_DESCRIPTION"),
		icon: BarChart3,
		badge: t("RECOMMENDED"),
		action: t("VIEW_ANALYTICS"),
		href: `/${local}/dashboard/history`,
		details: [t("REQUESTS_THIS_MONTH"), t("SUCCESS_RATE"), t("REQUESTS_REMAINING")],
	},
	{
		title: t("RECENT_ACTIVITY"),
		description: t("RECENT_ACTIVITY_DESCRIPTION"),
		icon: History,
		badge: t("OPERATIONS"),
		action: t("OPEN_ACTIVITY"),
		href: `/${local}/dashboard/history`,
		details: [t("LAST_REQUEST"), t("SAVED_CALCULATIONS"), t("SHARED_EXPORTS")],
	},
	{
		title: t("SUPPORT_DOCS"),
		description: t("SUPPORT_DOCS_DESCRIPTION"),
		icon: LifeBuoy,
		badge: t("HELP"),
		action: t("READ_DOCS"),
		href: `/${local}/docs`,
		details: [t("API_REFERENCE"), t("SAMPLE_REQUESTS"), t("PRIORITY_SUPPORT")],
	},
];

export default function DashboardPage() {
	const t = useTranslations("DashboardPage");
 	const dispatch = useDispatch();
	const { userDetails } = useSelector((state: RootState) => state.dashboard);
	const { session } = useSession();
	const { user } = useUser();
	const locale = useLocale();

	useEffect(() => {
		dispatch(fetchCalculators());
		const storedEmail = sessionStorage.getItem("userEmail");
		if (storedEmail) {
			dispatch(fetchUserDetails({ email: storedEmail }));
		} else if (session?.user.emailAddresses?.[0]?.emailAddress) {
			dispatch(fetchUserDetails({ email: session.user.emailAddresses[0].emailAddress }));
		} else if (user?.emailAddresses?.[0]?.emailAddress) {
			dispatch(fetchUserDetails({ email: user.emailAddresses[0].emailAddress }));
		} else {
			console.warn("No email address found for the user.");
		}
		
	}, [dispatch, session?.user?.emailAddresses, user?.emailAddresses]);

	return (
		<div className="min-h-screen bg-background">
			<div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
				<div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
					<div>
						<Badge variant="secondary" className="mb-3 gap-2 px-3 py-1">
							<ShieldCheck className="h-3.5 w-3.5" />
							{t("DEVELOPER_DASHBOARD")}
						</Badge>
						<h1 className="text-3xl font-semibold tracking-tight text-foreground">
							{t("MANAGE_WORKSPACE")}
						</h1>
						<p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
							{t("WORKSPACE_DESC")}
						</p>
					</div>

					<div className="flex flex-wrap gap-3">
						<Button asChild variant="outline">
							<Link href={`/${locale}/docs`}>{t("OPEN_DOCUMENTATION")}</Link>
						</Button>
						<Button asChild>
							<Link href={`/${locale}/dashboard/api-keys`}>{t("CREATE_API_KEY")}</Link>
						</Button>
					</div>
				</div>

				<div className="mb-8 grid gap-4 md:grid-cols-3">
					<Card className="border-border/70 bg-card/80">
						<CardContent className="flex items-center gap-4 pt-6">
							<div className="rounded-xl bg-accent/10 p-3 text-accent">
								<Zap className="h-5 w-5" />
							</div>
							<div>
								<p className="text-xs uppercase tracking-wide text-muted-foreground">
									{t("REQUESTS_THIS_MONTH")}
								</p>
								<p className="text-2xl font-semibold">{userDetails?.data?.apiKeys[0]?.remainingThisMonth || 0}</p>
							</div>
						</CardContent>
					</Card>
					<Card className="border-border/70 bg-card/80">
						<CardContent className="flex items-center gap-4 pt-6">
							<div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-600">
								<KeyRound className="h-5 w-5" />
							</div>
							<div>
								<p className="text-xs uppercase tracking-wide text-muted-foreground">
									{t("ACTIVE_KEYS")}
								</p>
								<p className="text-2xl font-semibold">{userDetails?.data?.apiKeys.filter((key) => key.isActive).length || 0}</p>
							</div>
						</CardContent>
					</Card>
					<Card className="border-border/70 bg-card/80">
						<CardContent className="flex items-center gap-4 pt-6">
							<div className="rounded-xl bg-blue-500/10 p-3 text-blue-600">
								<Clock3 className="h-5 w-5" />
							</div>
							<div>
								<p className="text-xs uppercase tracking-wide text-muted-foreground">
									{t("LAST_SYNC")}
								</p>
								<p className="text-2xl font-semibold">4 min ago</p>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
					{dashboardTiles(locale, t).map((tile) => (
						<Card key={tile.title} className="border-border/70 bg-card/80 backdrop-blur">
							<CardHeader className="space-y-4">
								<div className="flex items-start justify-between gap-3">
									<div className="rounded-2xl bg-muted p-3 text-foreground">
										<tile.icon className="h-5 w-5" />
									</div>
									<Badge variant="outline">{tile.badge}</Badge>
								</div>
								<div>
									<CardTitle>{tile.title}</CardTitle>
									<CardDescription className="mt-2 min-h-20 leading-6">
										{tile.description}
									</CardDescription>
								</div>
							</CardHeader>
							<CardContent>
								<ul className="mb-6 space-y-2 text-sm text-muted-foreground">
									{tile.details.map((detail) => (
										<li key={detail} className="flex items-center gap-2">
											<span className="h-1.5 w-1.5 rounded-full bg-accent" />
											<span>{detail}</span>
										</li>
									))}
								</ul>

								<Button asChild variant="outline" className="w-full justify-between">
									<Link href={tile.href}>
										{tile.action}
										<ArrowRight className="h-4 w-4" />
									</Link>
								</Button>
							</CardContent>
						</Card>
					))}
				</div>

				<Card className="mt-8 border-border/70 bg-card/80">
					<CardHeader>
						<CardTitle>{t("QUICK_API_PREVIEW")}</CardTitle>
						<CardDescription>
							{t("KEEP_THIS_VALUE_PRIVATE")}
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
						<div className="rounded-lg border border-dashed border-border bg-muted/40 px-4 py-3 font-mono text-sm text-foreground">
							ish_live_xxxx_xxxx_xxxx_8F2K
						</div>
						<div className="flex gap-3">
							<Button variant="outline">
								<Copy className="mr-2 h-4 w-4" />
								{t("COPY_KEY")}
							</Button>
							<Button asChild>
								<Link href="/dashboard/settings">{t("ROTATE_KEY")}</Link>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}


