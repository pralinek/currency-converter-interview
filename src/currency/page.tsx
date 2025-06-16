'use client'
import Currency from "@/app/types";

import { useCurrencies } from "@/app/hooks/useCurrencies";

export default function CurrencySelector() {
  const { data:currenciesObject, isLoading, error } = useCurrencies();

  

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading currencies</p>;

  const currencies = Object.values(currenciesObject ?? {}) as Currency[];

  return (
    <select>
        {currencies.map((currency:Currency) => (
        <option key={currency.id} value={currency.short_code}>
          {currency.short_code} – {currency.name}
        </option>
      ))}
    </select>
  );
}