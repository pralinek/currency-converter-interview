import { Autocomplete, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type Currency = {
  id: number;
  name: string;
  short_code: string;
};

type Props = {
  name: string;
  currencies: Currency[];
};

export function CurrencySelector({ name, currencies }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          options={currencies}
          getOptionLabel={(option) => `${option.short_code} – ${option.name}`}
          onChange={(_, value) => field.onChange(value?.short_code || "")}
          renderInput={(params) => <TextField {...params} label="Currency" />}
        />
      )}
    />
  );
}