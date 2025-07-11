"use client";

import { useState, useEffect } from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";

import { FormProvider } from "@/app/components/currency/FormProvider";
import Input from "@/app/components/currency/Input";
import { CurrencySelector } from "@/app/components/currency/CurrencySelector";
import { useCurrencies } from "@/app/hooks/useCurrencies";
import { FormValues } from "@/app/types";
import { ConversionResult } from "./ConversionResult";

export function CurrencyExchange() {
  const [result, setResult] = useState({
    from: "PLN",
    to: "USD",
    result: 0,
    amount: 1,
  });

  const { data: currenciesObject, isLoading, error } = useCurrencies();

  const currencies = Object.values(currenciesObject ?? {}) as {
    id: number;
    name: string;
    short_code: string;
  }[];

  const handleSubmit = async (data: FormValues) => {
    try {
      const res = await fetch("/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to convert currency");
      }

      const resultData = await res.json();
      setResult({
        from: data.fromCurrency,
        to: data.toCurrency,
        result: resultData.result,
        amount: data.amount,
      });
    } catch (error) {
      console.error("Conversion error:", error);
      alert("Currency conversion failed. Please try again later.");
    }
  };

  useEffect(() => {
    handleSubmit({
      fromCurrency: result.from,
      toCurrency: result.to,
      amount: 1,
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
      <FormProvider
        defaultValues={{
          fromCurrency: "PLN",
          toCurrency: "USD",
          amount: 1,
        }}
        onSubmit={handleSubmit}
      >
        <Stack spacing={3}>
          <Typography variant="h5" fontWeight="bold">
            Currency Converter
          </Typography>

          <Box display="flex" gap={2} flexWrap="wrap">
            <Box flex="1">
              <Input name="amount" label="Amount" aria-label="amount-to-convert-from" />
            </Box>
            <Box flex="3" minWidth={120}>
              <CurrencySelector
               aria-labelledby="from-currency"
                name="fromCurrency"
                currencies={currencies}
                label="From"
              />
            </Box>
          </Box>

          <Box mt={2}>
            <CurrencySelector
             aria-labelledby="to-currency"
              name="toCurrency"
              currencies={currencies}
              label="To"
            />
          </Box>

          <Box aria-live="polite" role="status" sx={{ mt: 2 }}>
            <ConversionResult
              from={result.from}
              to={result.to}
              result={result.result}
              amount={result.amount}
            />
          </Box>

          <Box display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained">
              Convert
            </Button>
          </Box>
        </Stack>
      </FormProvider>
    </Paper>
  );
}
