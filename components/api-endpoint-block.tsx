"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Copy,
  Check,
  Lock,
  Terminal,
} from "lucide-react";
import type { Endpoint, HttpMethod } from "@/lib/api-endpoints"
import { BASE_URL } from "@/lib/api-endpoints";

const methodStyles: Record<
  HttpMethod,
  { bg: string; text: string; border: string }
> = {
  GET: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-700",
    border: "border-emerald-500/20",
  },
  POST: {
    bg: "bg-blue-500/10",
    text: "text-blue-700",
    border: "border-blue-500/20",
  },
  PUT: {
    bg: "bg-amber-500/10",
    text: "text-amber-700",
    border: "border-amber-500/20",
  },
  PATCH: {
    bg: "bg-orange-500/10",
    text: "text-orange-700",
    border: "border-orange-500/20",
  },
  DELETE: {
    bg: "bg-red-500/10",
    text: "text-red-700",
    border: "border-red-500/20",
  },
};

function CodeBlock({
  code,
  language,
  title,
}: {
  code: string;
  language: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between bg-muted/50 px-4 py-2 border-b border-border">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-mono">
            {language}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-7 w-7 p-0"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-600" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>
      <pre className="p-4 overflow-x-auto bg-foreground/[0.03]">
        <code className="text-sm font-mono text-foreground/80 leading-relaxed">
          {code}
        </code>
      </pre>
    </div>
  );
}

function buildCurlExample(endpoint: Endpoint): string {
  let curl = `curl -X ${endpoint.method}`;
  curl += ` \\\n  "${BASE_URL}${endpoint.path}"`;

  if (endpoint.auth) {
    curl += ` \\\n  -H "Authorization: Bearer YOUR_API_KEY"`;
  }

  if (endpoint.headers) {
    for (const h of endpoint.headers) {
      curl += ` \\\n  -H "${h.key}: ${h.value}"`;
    }
  }

  if (endpoint.body) {
    curl += ` \\\n  -d '${endpoint.body}'`;
  }

  return curl;
}

export function ApiEndpointBlock({ endpoint }: { endpoint: Endpoint }) {
  const [isOpen, setIsOpen] = useState(false);
  const style = methodStyles[endpoint.method];

  return (
    <div
      className={`rounded-xl border bg-card text-card-foreground transition-all ${isOpen ? "shadow-md ring-1 ring-border" : "hover:shadow-sm"}`}
    >
      <button
        type="button"
        className="w-full text-left p-4 flex items-center gap-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Badge
          variant="outline"
          className={`${style.bg} ${style.text} ${style.border} font-mono text-xs font-bold px-2.5 py-1 shrink-0`}
        >
          {endpoint.method}
        </Badge>

        <code className="text-sm font-mono text-foreground/80 truncate flex-1">
          {endpoint.path.split("/").map((seg, i) => {
            if (seg.startsWith(":")) {
              return (
                <span key={i}>
                  {i > 0 && "/"}
                  <span className="text-accent font-semibold">
                    {seg}
                  </span>
                </span>
              );
            }
            return (
              <span key={i}>
                {i > 0 && "/"}
                {seg}
              </span>
            );
          })}
        </code>

        <div className="flex items-center gap-2 shrink-0">
          {endpoint.auth && (
            <Badge
              variant="outline"
              className="bg-amber-500/10 text-amber-700 border-amber-500/20 text-xs gap-1"
            >
              <Lock className="h-3 w-3" />
              Auth
            </Badge>
          )}
          <span className="text-sm text-muted-foreground hidden sm:inline">
            {endpoint.name}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {isOpen && (
          <div className="border-t border-border px-4 pb-4 pt-4 space-y-5">
            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {endpoint.description}
            </p>

            {/* Path Parameters */}
            {endpoint.pathParams && endpoint.pathParams.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Path Parameters
                </h4>
                <div className="rounded-lg border border-border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 border-b border-border">
                        <th className="text-left px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Name
                        </th>
                        <th className="text-left px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Example
                        </th>
                        <th className="text-left px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {endpoint.pathParams.map((param) => (
                        <tr
                          key={param.key}
                          className="border-b border-border last:border-b-0"
                        >
                          <td className="px-4 py-2.5">
                            <code className="text-accent font-mono text-xs font-semibold bg-accent/10 px-1.5 py-0.5 rounded">
                              {param.key}
                            </code>
                          </td>
                          <td className="px-4 py-2.5">
                            <code className="font-mono text-xs text-foreground/70">
                              {param.example}
                            </code>
                          </td>
                          <td className="px-4 py-2.5 text-muted-foreground text-xs hidden sm:table-cell">
                            {param.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Headers */}
            {endpoint.headers && endpoint.headers.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Headers
                </h4>
                <div className="rounded-lg border border-border overflow-hidden">
                  <table className="w-full text-sm">
                    <tbody>
                      {endpoint.auth && (
                        <tr className="border-b border-border">
                          <td className="px-4 py-2.5">
                            <code className="font-mono text-xs">
                              Authorization
                            </code>
                          </td>
                          <td className="px-4 py-2.5">
                            <code className="font-mono text-xs text-foreground/70">
                              Bearer YOUR_API_KEY
                            </code>
                          </td>
                        </tr>
                      )}
                      {endpoint.headers.map((h) => (
                        <tr
                          key={h.key}
                          className="border-b border-border last:border-b-0"
                        >
                          <td className="px-4 py-2.5">
                            <code className="font-mono text-xs">{h.key}</code>
                          </td>
                          <td className="px-4 py-2.5">
                            <code className="font-mono text-xs text-foreground/70">
                              {h.value}
                            </code>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Request Body */}
            {endpoint.body && (
              <CodeBlock
                code={endpoint.body}
                language="json"
                title="Request Body"
              />
            )}

            {/* Response Example */}
            {endpoint.responseExample && (
              <CodeBlock
                code={endpoint.responseExample}
                language="json"
                title="Response Example"
              />
            )}

            {/* cURL */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  cURL Example
                </h4>
              </div>
              <CodeBlock
                code={buildCurlExample(endpoint)}
                language="bash"
                title="cURL"
              />
            </div>
          </div>
      )}
    </div>
  );
}
