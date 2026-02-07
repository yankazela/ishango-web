"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calculator,
  Landmark,
  Home,
  Building2,
  PackageSearch,
  CreditCard,
  TrendingUp,
  Clock,
  ArrowRight,
  Globe2,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  Download,
  Star,
  RefreshCw,
  BarChart3,
  Scale,
  History,
  Lightbulb,
  FileText,
  ChevronRight,
  Search,
} from "lucide-react";

// KPI Stats Data
const stats = [
  {
    name: "Total Calculations",
    value: "1,284",
    change: "+12.5%",
    trend: "up",
    icon: Calculator,
    gradient: "from-teal-500/20 via-teal-400/10 to-emerald-500/5",
    iconBg: "bg-gradient-to-br from-teal-500 to-emerald-500",
  },
  {
    name: "Most Used Calculator",
    value: "Income Tax",
    subValue: "428 calculations",
    icon: Landmark,
    gradient: "from-blue-500/20 via-blue-400/10 to-cyan-500/5",
    iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
  },
  {
    name: "Recent Countries",
    value: "8",
    subValue: "US, UK, DE most used",
    icon: Globe2,
    gradient: "from-amber-500/20 via-orange-400/10 to-yellow-500/5",
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-500",
  },
  {
    name: "Top Compared",
    value: "US vs UK",
    subValue: "32 comparisons",
    icon: Scale,
    gradient: "from-purple-500/20 via-violet-400/10 to-indigo-500/5",
    iconBg: "bg-gradient-to-br from-purple-500 to-indigo-500",
  },
];

// Calculator Cards Data
const calculatorCards = [
  {
    name: "Income Tax Calculator",
    description: "Calculate income tax liability",
    href: "/calculators/income-tax",
    icon: Landmark,
    gradient: "from-teal-500/20 to-emerald-500/10",
    iconBg: "bg-gradient-to-br from-teal-500 to-emerald-600",
    lastCalc: "$18,450 - United States",
  },
  {
    name: "Loan Repayment",
    description: "Calculate loan payments",
    href: "/calculators/loan",
    icon: CreditCard,
    gradient: "from-blue-500/20 to-cyan-500/10",
    iconBg: "bg-gradient-to-br from-blue-500 to-cyan-600",
    lastCalc: "$523/mo - Canada",
  },
  {
    name: "Mortgage Calculator",
    description: "Plan your home purchase",
    href: "/calculators/mortgage",
    icon: Home,
    gradient: "from-orange-500/20 to-amber-500/10",
    iconBg: "bg-gradient-to-br from-orange-500 to-amber-600",
    lastCalc: "£1,842/mo - United Kingdom",
  },
  {
    name: "Corporate Tax",
    description: "Business tax obligations",
    href: "/calculators/corporate-tax",
    icon: Building2,
    gradient: "from-purple-500/20 to-violet-500/10",
    iconBg: "bg-gradient-to-br from-purple-500 to-violet-600",
    lastCalc: "€24,500 - Germany",
  },
  {
    name: "Import Tax & Duties",
    description: "Customs and import fees",
    href: "/calculators/import-tax",
    icon: PackageSearch,
    gradient: "from-emerald-500/20 to-green-500/10",
    iconBg: "bg-gradient-to-br from-emerald-500 to-green-600",
    lastCalc: null,
  },
];

// Countries Data
const countries = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
];

// Recent Calculations Data
const recentCalculations = [
  {
    id: 1,
    type: "Income Tax",
    country: "United States",
    region: "California",
    result: "Tax owed: $18,450",
    date: "2 hours ago",
    icon: Landmark,
  },
  {
    id: 2,
    type: "Mortgage",
    country: "United Kingdom",
    region: "England",
    result: "Monthly: £1,842",
    date: "5 hours ago",
    icon: Home,
  },
  {
    id: 3,
    type: "Corporate Tax",
    country: "Germany",
    region: "Bavaria",
    result: "Tax owed: €24,500",
    date: "1 day ago",
    icon: Building2,
  },
  {
    id: 4,
    type: "Loan",
    country: "Canada",
    region: "Ontario",
    result: "Monthly: $523",
    date: "2 days ago",
    icon: CreditCard,
  },
  {
    id: 5,
    type: "Income Tax",
    country: "Australia",
    region: "New South Wales",
    result: "Tax owed: A$12,800",
    date: "3 days ago",
    icon: Landmark,
  },
];

// Notifications Data
const notifications = [
  {
    id: 1,
    title: "US Tax Brackets Updated",
    description: "2026 federal income tax brackets have been updated.",
    type: "law",
    date: "Today",
  },
  {
    id: 2,
    title: "New Calculator Available",
    description: "Salary Comparison calculator is now live!",
    type: "feature",
    date: "Yesterday",
  },
  {
    id: 3,
    title: "UK Interest Rates Changed",
    description: "Bank of England updated base rate to 4.25%.",
    type: "law",
    date: "3 days ago",
  },
];

// Saved Calculations Data
const savedCalculations = [
  { id: 1, name: "My US Income Tax 2026", type: "Income Tax", country: "US" },
  { id: 2, name: "London Mortgage Plan", type: "Mortgage", country: "UK" },
  { id: 3, name: "Business Tax DE", type: "Corporate Tax", country: "DE" },
];

export default function DashboardPage() {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [compareCountryA, setCompareCountryA] = useState("US");
  const [compareCountryB, setCompareCountryB] = useState("UK");

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header with Search and Notifications */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Welcome back, John
          </h1>
          <p className="text-muted-foreground mt-1">
            Here&apos;s an overview of your financial calculations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search calculations..."
              className="pl-9 w-64"
            />
          </div>
          <Button variant="outline" size="icon" className="relative bg-transparent">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent text-[10px] text-accent-foreground flex items-center justify-center">
              3
            </span>
          </Button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card
            key={stat.name}
            className={`relative overflow-hidden bg-gradient-to-br ${stat.gradient} border-0 shadow-sm hover:shadow-md transition-all`}
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-white/30 to-transparent blur-2xl" />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            <CardContent className="p-5 relative">
              <div className="flex items-start justify-between">
                <div
                  className={`h-11 w-11 rounded-xl ${stat.iconBg} flex items-center justify-center shadow-lg`}
                >
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                {stat.change && (
                  <Badge
                    variant="secondary"
                    className={
                      stat.trend === "up"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    )}
                    {stat.change}
                  </Badge>
                )}
              </div>
              <div className="mt-4">
                <p className="text-2xl font-semibold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
                {stat.subValue && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.subValue}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Country & Region Selector */}
      <Card className="bg-gradient-to-r from-accent/5 via-transparent to-teal-500/5 border-accent/20">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Globe2 className="h-5 w-5 text-accent" />
              <span className="font-medium text-foreground">
                Global Selector
              </span>
            </div>
            <div className="flex flex-1 flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Label htmlFor="country" className="sr-only">
                  Country
                </Label>
                <Select
                  value={selectedCountry}
                  onValueChange={setSelectedCountry}
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        <span className="flex items-center gap-2">
                          <span>{c.flag}</span>
                          <span>{c.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Label htmlFor="region" className="sr-only">
                  Region
                </Label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger id="region">
                    <SelectValue placeholder="Select Region/State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ca">California</SelectItem>
                    <SelectItem value="ny">New York</SelectItem>
                    <SelectItem value="tx">Texas</SelectItem>
                    <SelectItem value="fl">Florida</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="gap-2">
                Apply to All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calculator Quick Access */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Calculator Quick Access
          </h2>
          <Button variant="ghost" size="sm" className="gap-1 bg-transparent">
            View All
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {calculatorCards.map((calc) => (
            <Link key={calc.name} href={calc.href}>
              <Card
                className={`group h-full hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br ${calc.gradient} border-0 overflow-hidden relative`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/20 to-transparent rounded-bl-full" />
                <CardContent className="p-5 relative">
                  <div
                    className={`h-12 w-12 rounded-xl ${calc.iconBg} flex items-center justify-center shadow-lg mb-4`}
                  >
                    <calc.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-medium text-foreground group-hover:text-accent transition-colors">
                    {calc.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {calc.description}
                  </p>
                  {calc.lastCalc && (
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <History className="h-3 w-3" />
                        {calc.lastCalc}
                      </p>
                    </div>
                  )}
                  <Button
                    size="sm"
                    className="mt-4 w-full gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Start
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Calculations Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  Recent Calculations
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                    <Download className="h-3 w-3" />
                    Export
                  </Button>
                  <Button variant="ghost" size="sm" className="bg-transparent">
                    View All
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Country / Region</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentCalculations.map((calc) => (
                    <TableRow key={calc.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                            <calc.icon className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <span className="font-medium">{calc.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{calc.country}</p>
                          <p className="text-xs text-muted-foreground">
                            {calc.region}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{calc.result}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {calc.date}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 bg-transparent">
                            <RefreshCw className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 bg-transparent">
                            <Scale className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Comparison Panel */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Scale className="h-4 w-4 text-muted-foreground" />
                Quick Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Country A
                  </Label>
                  <Select
                    value={compareCountryA}
                    onValueChange={setCompareCountryA}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((c) => (
                        <SelectItem key={c.code} value={c.code}>
                          {c.flag} {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Country B
                  </Label>
                  <Select
                    value={compareCountryB}
                    onValueChange={setCompareCountryB}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((c) => (
                        <SelectItem key={c.code} value={c.code}>
                          {c.flag} {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Comparison Visualization */}
              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Before Tax</span>
                    <span className="font-medium">$75,000</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">
                      After Tax (US)
                    </span>
                    <span className="font-medium text-teal-600">$56,550</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"
                      style={{ width: "75%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">
                      After Tax (UK)
                    </span>
                    <span className="font-medium text-purple-600">$52,800</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full"
                      style={{ width: "70%" }}
                    />
                  </div>
                </div>
              </div>

              <Button className="w-full gap-2">
                <BarChart3 className="h-4 w-4" />
                Full Comparison
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  Notifications
                </CardTitle>
                <Badge variant="secondary">3 new</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                >
                  <div
                    className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                      notif.type === "law"
                        ? "bg-amber-100 text-amber-600"
                        : "bg-accent/20 text-accent"
                    }`}
                  >
                    {notif.type === "law" ? (
                      <FileText className="h-4 w-4" />
                    ) : (
                      <Lightbulb className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {notif.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {notif.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notif.date}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Row: Tips & Saved */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tips & Insights */}
        <Card className="bg-gradient-to-br from-accent/10 via-teal-500/5 to-emerald-500/5 border-accent/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-accent/20 to-transparent rounded-bl-full blur-2xl" />
          <CardContent className="p-6 relative">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-accent to-teal-600 flex items-center justify-center shadow-lg shrink-0">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  Optimization Insight
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Based on your calculations, you could save approximately{" "}
                  <span className="font-semibold text-accent">$3,750/year</span>{" "}
                  by relocating from California to Texas due to the absence of
                  state income tax.
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <Button size="sm" className="gap-1">
                    See Details
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Saved / Favorites */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Star className="h-4 w-4 text-muted-foreground" />
                Saved Calculations
              </CardTitle>
              <Button variant="ghost" size="sm" className="bg-transparent">
                Manage
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {savedCalculations.map((saved) => (
              <div
                key={saved.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-accent/50 hover:bg-muted/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {saved.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {saved.type} - {saved.country}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity bg-transparent"
                >
                  Open
                </Button>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2 gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Export All as PDF
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
