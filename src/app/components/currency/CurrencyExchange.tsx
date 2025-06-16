'use client';

import { FormProvider } from "@/app/components/currency/FormProvider";
import Input from "@/app/components/currency/Input";
import { CurrencySelector } from "@/app/components/currency/CurrencySelector";
import { Button } from "@mui/material";
import { useCurrencies } from "@/app/hooks/useCurrencies";
import currencyApi from "@/app/lib/axios";
import { FormValues } from "@/app/types";
import { useState } from "react";
import { ConversionResult } from "./ConversionResult";



export function CurrencyExchange() {
const [result, setResult] = useState({from: 'PLN', to: 'USD', result:0, amount: 1})

  const { data: currenciesObject, isLoading, error } = useCurrencies();

  console.log('check', currenciesObject)

  const currencies = Object.values(currenciesObject ?? {}) as {
    id: number;
    name: string;
    short_code: string;
  }[];

  const handleSubmit = async (data: FormValues) => {
    console.log('data', data)
    try {
      const res = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to convert currency');
      }
  
      const resultData = await res.json();
      console.log('resultData', resultData)
      setResult({
        from: data.fromCurrency,
        to: data.toCurrency,
        result: resultData.result,
        amount: data.amount

      })
      console.log('Converted value:', resultData.result);
    } catch (error) {
      console.error('Conversion error:', error);
      alert('Currency conversion failed. Please try again later.');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <FormProvider
      defaultValues={{
        fromCurrency: 'PLN',
        toCurrency: 'USD',
        amount: 0,
      }}
      onSubmit={handleSubmit}
    >
      <CurrencySelector name="fromCurrency" currencies={currencies} label="From"/>
      <CurrencySelector name="toCurrency" currencies={currencies} label="To" />
      <Input name="amount" />
      <ConversionResult from={result.from} to={result.to} result={result.result} amount={result.amount}></ConversionResult>
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </FormProvider>
  );
}








