'use client';

import { FormProvider } from "@/app/components/currency/FormProvider";
import Input from "@/app/components/currency/Input";
import { CurrencySelector } from "@/app/components/currency/CurrencySelector";
import { Button } from "@mui/material";
import { useCurrencies } from "@/app/hooks/useCurrencies";

export function CurrencyExchange() {
  const { data: currenciesObject, isLoading, error } = useCurrencies();

  console.log('check', currenciesObject)

  const currencies = Object.values(currenciesObject ?? {}) as {
    id: number;
    name: string;
    short_code: string;
  }[];

  const handleSubmit = (data: any) => {
    console.log("Submitted:", data);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <FormProvider
      defaultValues={{
        currency: '',
        amount: 0,
      }}
      onSubmit={handleSubmit}
    >
      <CurrencySelector name="currency" currencies={currencies} />
      <Input name="amount" />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </FormProvider>
  );
}








