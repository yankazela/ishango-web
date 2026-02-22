"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ApiEndpointBlock } from "@/components/api-endpoint-block";
import { endpointGroups, BASE_URL } from "@/lib/api-endpoints";
import {
  Search,
  BookOpen,
  Key,
  Globe2,
  Zap,
  Copy,
  Check,
  ArrowRight,
  Calculator,
  ExternalLink,
  Lock,
} from "lucide-react";

export default function ApiDocsPage() {
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [copiedBase, setCopiedBase] = useState(false);

  const handleCopyBase = () => {
    navigator.clipboard.writeText(BASE_URL);
    setCopiedBase(true);
    setTimeout(() => setCopiedBase(false), 2000);
  };

  const filteredGroups = endpointGroups
    .map((group) => ({
      ...group,
      endpoints: group.endpoints.filter(
        (ep) =>
          ep.name.toLowerCase().includes(search.toLowerCase()) ||
          ep.path.toLowerCase().includes(search.toLowerCase()) ||
          ep.description.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter(
      (group) =>
        group.endpoints.length > 0 &&
        (!activeGroup || group.name === activeGroup)
    );

  const totalEndpoints = endpointGroups.reduce(
    (acc, g) => acc + g.endpoints.length,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:block fixed top-16 left-0 bottom-0 w-64 border-r border-border bg-card overflow-y-auto">
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Getting Started
              </h3>
              <nav className="space-y-1">
                <button
                  type="button"
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md text-foreground hover:bg-muted transition-colors text-left"
                  onClick={() => {
                    setActiveGroup(null);
                    document.getElementById("introduction")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  Introduction
                </button>
                <button
                  type="button"
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md text-foreground hover:bg-muted transition-colors text-left"
                  onClick={() => {
                    setActiveGroup(null);
                    document.getElementById("authentication")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <Key className="h-4 w-4 text-muted-foreground" />
                  Authentication
                </button>
                <button
                  type="button"
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md text-foreground hover:bg-muted transition-colors text-left"
                  onClick={() => {
                    setActiveGroup(null);
                    document.getElementById("base-url")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <Globe2 className="h-4 w-4 text-muted-foreground" />
                  Base URL
                </button>
                <button
                  type="button"
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md text-foreground hover:bg-muted transition-colors text-left"
                  onClick={() => {
                    setActiveGroup(null);
                    document.getElementById("rate-limits")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <Zap className="h-4 w-4 text-muted-foreground" />
                  Rate Limits
                </button>
              </nav>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                API Reference
              </h3>
              <nav className="space-y-1">
                <button
                  type="button"
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors text-left ${
                    activeGroup === null
                      ? "bg-accent/10 text-accent font-medium"
                      : "text-foreground hover:bg-muted"
                  }`}
                  onClick={() => {
                    setActiveGroup(null);
                    document.getElementById("endpoints")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  All Endpoints
                  <Badge variant="secondary" className="text-xs h-5 px-1.5">
                    {totalEndpoints}
                  </Badge>
                </button>
                {endpointGroups.map((group) => (
                  <button
                    key={group.name}
                    type="button"
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors text-left ${
                      activeGroup === group.name
                        ? "bg-accent/10 text-accent font-medium"
                        : "text-foreground hover:bg-muted"
                    }`}
                    onClick={() => {
                      setActiveGroup(
                        activeGroup === group.name ? null : group.name
                      );
                      document.getElementById("endpoints")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {group.name}
                    <Badge
                      variant="secondary"
                      className="text-xs h-5 px-1.5"
                    >
                      {group.endpoints.length}
                    </Badge>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
            {/* Hero */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <Badge
                  variant="outline"
                  className="bg-accent/10 text-accent border-accent/20 gap-1"
                >
                  <Calculator className="h-3 w-3" />
                  ishango-calc-api
                </Badge>
                <Badge variant="outline" className="text-xs">
                  v1
                </Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight text-balance">
                API{" "}
                <span className="bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
                  Documentation
                </span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Integrate CalcGlobal financial calculators into your
                applications with our RESTful API. Process income tax, mortgage,
                and corporate tax calculations for 50+ countries.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <Button asChild>
                  <Link href="/get-started">
                    Get API Key
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" asChild className="bg-transparent">
                  <a
                    href="https://github.com/calcglobal/api-examples"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Examples
                  </a>
                </Button>
              </div>
            </div>

            {/* Introduction */}
            <section id="introduction" className="mb-12 scroll-mt-24">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Introduction
              </h2>
              <Card>
                <CardContent className="p-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    The CalcGlobal API is built on{" "}
                    <span className="text-foreground font-medium">
                      REST principles
                    </span>
                    . It accepts JSON-encoded request bodies, returns
                    JSON-encoded responses, and uses standard HTTP response codes
                    and verbs.
                  </p>
                  <p>
                    All API endpoints are versioned under{" "}
                    <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-foreground">
                      /api/v1/
                    </code>{" "}
                    to ensure backward compatibility. The API is generated from
                    NestJS controllers and follows OpenAPI conventions.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                        <Globe2 className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">
                          50+ Countries
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Global coverage
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="h-9 w-9 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                        <Zap className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">
                          {"<"} 100ms
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Response time
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="h-9 w-9 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                        <Key className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">
                          99.99%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Uptime SLA
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Authentication */}
            <section id="authentication" className="mb-12 scroll-mt-24">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Authentication
              </h2>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Public endpoints (listing calculators, countries) do not
                    require authentication. Private endpoints and subscription
                    management require a{" "}
                    <span className="text-foreground font-medium">
                      Bearer token
                    </span>{" "}
                    in the Authorization header.
                  </p>
                  <div className="rounded-lg border border-border overflow-hidden">
                    <div className="bg-muted/50 px-4 py-2 border-b border-border">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Authorization Header
                      </span>
                    </div>
                    <pre className="p-4 bg-foreground/[0.03]">
                      <code className="text-sm font-mono text-foreground/80">
                        {`Authorization: Bearer YOUR_API_KEY`}
                      </code>
                    </pre>
                  </div>
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 text-sm">
                    <Lock className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                    <p className="text-muted-foreground">
                      Endpoints marked with the{" "}
                      <Badge
                        variant="outline"
                        className="bg-amber-500/10 text-amber-700 border-amber-500/20 text-xs mx-0.5"
                      >
                        <Lock className="h-3 w-3 mr-0.5" />
                        Auth
                      </Badge>{" "}
                      badge require a valid API key. Get your key from the{" "}
                      <Link
                        href="/dashboard"
                        className="text-accent underline underline-offset-2"
                      >
                        dashboard
                      </Link>
                      .
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Base URL */}
            <section id="base-url" className="mb-12 scroll-mt-24">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Base URL
              </h2>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    All API requests should be made to the following base URL.
                    The global prefix{" "}
                    <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-foreground">
                      /api/v1
                    </code>{" "}
                    is required for all endpoints.
                  </p>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border">
                    <code className="text-sm font-mono text-foreground flex-1">
                      {BASE_URL}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 shrink-0"
                      onClick={handleCopyBase}
                    >
                      {copiedBase ? (
                        <Check className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <Copy className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Rate Limits */}
            <section id="rate-limits" className="mb-12 scroll-mt-24">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Rate Limits
              </h2>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Rate limits depend on your subscription plan. Exceeding your
                    limit returns a{" "}
                    <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-foreground">
                      429 Too Many Requests
                    </code>{" "}
                    response with a{" "}
                    <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-foreground">
                      Retry-After
                    </code>{" "}
                    header.
                  </p>
                  <div className="rounded-lg border border-border overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/50 border-b border-border">
                          <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Plan
                          </th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Requests / min
                          </th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Calculations / mo
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border">
                          <td className="px-4 py-3 font-medium text-foreground">
                            Starter
                          </td>
                          <td className="px-4 py-3 text-muted-foreground font-mono">
                            60
                          </td>
                          <td className="px-4 py-3 text-muted-foreground font-mono">
                            500
                          </td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="px-4 py-3 font-medium text-foreground">
                            Professional
                          </td>
                          <td className="px-4 py-3 text-muted-foreground font-mono">
                            300
                          </td>
                          <td className="px-4 py-3 text-muted-foreground font-mono">
                            5,000
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium text-foreground">
                            Enterprise
                          </td>
                          <td className="px-4 py-3 text-muted-foreground font-mono">
                            Unlimited
                          </td>
                          <td className="px-4 py-3 text-muted-foreground font-mono">
                            Custom
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Endpoints */}
            <section id="endpoints" className="scroll-mt-24">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  API Endpoints
                </h2>
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search endpoints..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Mobile Group Filter */}
              <div className="flex gap-2 flex-wrap mb-6 lg:hidden">
                <Button
                  variant={activeGroup === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveGroup(null)}
                  className={activeGroup === null ? "" : "bg-transparent"}
                >
                  All
                </Button>
                {endpointGroups.map((group) => (
                  <Button
                    key={group.name}
                    variant={
                      activeGroup === group.name ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      setActiveGroup(
                        activeGroup === group.name ? null : group.name
                      )
                    }
                    className={activeGroup === group.name ? "" : "bg-transparent"}
                  >
                    {group.name}
                  </Button>
                ))}
              </div>

              {/* Endpoint Groups */}
              <div className="space-y-10">
                {filteredGroups.map((group) => (
                  <div key={group.name} id={`group-${group.name.toLowerCase().replace(/\s+/g, "-")}`}>
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-foreground">
                        {group.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {group.description}
                      </p>
                    </div>
                    <div className="space-y-3">
                      {group.endpoints.map((endpoint) => (
                        <ApiEndpointBlock
                          key={`${endpoint.method}-${endpoint.path}`}
                          endpoint={endpoint}
                        />
                      ))}
                    </div>
                  </div>
                ))}

                {filteredGroups.length === 0 && (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Search className="h-10 w-10 text-muted-foreground/40 mx-auto mb-4" />
                      <p className="text-muted-foreground font-medium">
                        No endpoints found
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Try adjusting your search or filter.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
