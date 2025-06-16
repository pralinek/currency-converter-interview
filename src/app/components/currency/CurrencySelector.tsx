import { Autocomplete, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type Currency = {
  id: number;
  name: string;
  short_code: string;
};

type Props = {
  name: string;
  label: string;
  currencies: Currency[];
};

export function CurrencySelector({ name, currencies,label }: Props) {
  const { control } = useFormContext();

  // Safely filtered currency options
  const filteredCurrencies = currencies.filter(
    (c): c is Currency => Boolean(c?.short_code && c?.name)
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selectedCurrency = filteredCurrencies.find(
          (c) => c.short_code === field.value
        );

        return (
          <Autocomplete
            options={filteredCurrencies}
            getOptionLabel={(option) => `${option.short_code} – ${option.name}`}
            value={selectedCurrency || null}
            onChange={(_, value) => field.onChange(value?.short_code || '')}
            renderInput={(params) => <TextField {...params} label={label} />}
          />
        );
      }}
    />
  );
}