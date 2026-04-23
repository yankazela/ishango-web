"use client"
import { useEffect } from "react";
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
import { useSession } from '@clerk/react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserDetails } from "./store/slice";

const dashboardTiles = [
	{
		title: "API Keys",
		description:
			"Create, rotate, and revoke production or sandbox keys for your calculator API integrations.",
		icon: KeyRound,
		badge: "Core",
		action: "Manage keys",
		href: "/dashboard/settings",
		details: ["Live key", "Sandbox key", "Last rotated 12 days ago"],
	},
	{
		title: "Usage & Limits",
		description:
			"Track monthly API calls, error rates, and remaining request capacity across environments.",
		icon: BarChart3,
		badge: "Recommended",
		action: "View analytics",
		href: "/dashboard/history",
		details: ["18,420 requests this month", "99.94% success rate", "81,580 requests remaining"],
	},
	{
		title: "Recent Activity",
		description:
			"Review calculator requests, generated comparisons, and recent configuration updates from your workspace.",
		icon: History,
		badge: "Operations",
		action: "Open activity",
		href: "/dashboard/history",
		details: ["Last request 4 minutes ago", "7 saved calculations", "2 shared exports this week"],
	},
	{
		title: "Support & Docs",
		description:
			"Quick access to integration guides, API examples, and expert help when you need implementation support.",
		icon: LifeBuoy,
		badge: "Help",
		action: "Read docs",
		href: "/docs",
		details: ["API reference", "Sample requests", "Priority support"],
	},
];

export default function DashboardPage() {
  const dispatch = useDispatch();
	const { userDetails } = useSelector((state: RootState) => state.dashboard);
	const { session } = useSession();

	useEffect(() => {
		if (session?.user.emailAddresses?.[0]?.emailAddress) {
			dispatch(fetchUserDetails({ email: session.user.emailAddresses[0].emailAddress }));
		}
	}, [dispatch, session?.user?.emailAddresses]);

	return (
		<div className="min-h-screen bg-background">
			<div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
				<div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
					<div>
						<Badge variant="secondary" className="mb-3 gap-2 px-3 py-1">
							<ShieldCheck className="h-3.5 w-3.5" />
							Developer dashboard
						</Badge>
						<h1 className="text-3xl font-semibold tracking-tight text-foreground">
							Manage your Ishango Engine workspace
						</h1>
						<p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
							Use the sidebar to navigate your workspace and the tiles below to
							manage API access, monitor usage, review recent activity, and get
							implementation support.
						</p>
					</div>

					<div className="flex flex-wrap gap-3">
						<Button asChild variant="outline">
							<Link href="/docs">Open documentation</Link>
						</Button>
						<Button asChild>
							<Link href="/dashboard/settings">Create API key</Link>
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
									Requests this month
								</p>
								<p className="text-2xl font-semibold">18,420</p>
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
									Active keys
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
									Last sync
								</p>
								<p className="text-2xl font-semibold">4 min ago</p>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
					{dashboardTiles.map((tile) => (
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
						<CardTitle>Quick API key preview</CardTitle>
						<CardDescription>
							Keep this value private. Rotate it immediately if it has been
							exposed.
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
						<div className="rounded-lg border border-dashed border-border bg-muted/40 px-4 py-3 font-mono text-sm text-foreground">
							ish_live_xxxx_xxxx_xxxx_8F2K
						</div>
						<div className="flex gap-3">
							<Button variant="outline">
								<Copy className="mr-2 h-4 w-4" />
								Copy key
							</Button>
							<Button asChild>
								<Link href="/dashboard/settings">Rotate key</Link>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
