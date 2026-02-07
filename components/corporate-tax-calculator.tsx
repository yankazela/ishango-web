"use client";

import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { Building2, Percent, ArrowRight } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { RootState } from "@/store/rootStore";


const formatCurrency = (value: number, symbol?: string) =>
  `${symbol}${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export function CorporateTaxCalculator() {
  const t = useTranslations("CorporateTaxCalculator");
  const dispatch = useDispatch();

  const [taxYear, setTaxYear] = useState("2025");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [formInputs, setFormInputs] = useState<Record<string, any>>({});

  /* ---------------- Fetch calculators ---------------- */

  
  /* ---------------- Handlers ---------------- */

  

  const handleInputChange = (name: string, value: any) => {
    const parsed =
      typeof value === "string" && !isNaN(Number(value)) && value !== ""
        ? Number(value)
        : value;

    setFormInputs((prev) => ({
      ...prev,
      [name]: parsed,
    }));
  };

  

  /* ---------------- UI ---------------- */

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-accent" />
            {t("CALCULATOR_TITLE")}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Country */}
          <div className="space-y-2">
            <Label>{t("COUNTRY")}</Label>
            <Select
              value={selectedCountry}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("SELECT_COUNTRY")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="US">
                  {t("UNITED_STATES")}
                </SelectItem>
                <SelectItem value="CA">
                  {t("CANADA")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Dynamic fields */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>{t("FIELD")}</Label>
                  <Badge variant="outline">
                    <Percent className="h-3 w-3 mr-1" />
                    %
                  </Badge>
              </div>

              <Input
                type="text"
              />
            </div>

          <Button
            className="w-full"
            size="lg"
            
          >
            {t("CALCULATE_TAX")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle>{t("RESULTS")}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {t("TOTAL_TAX_PAYABLE")}
            </p>
            <p className="text-4xl font-bold">
              $0.00
            </p>
          </div>

            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between text-sm">
                <span>{t("TAXABLE_PROFIT")}</span>
                <span>
                  $899
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t("EFFECTIVE_RATE")}</span>
                <span>45%</span>
              </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
