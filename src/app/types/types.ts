export interface Currency {
    id: number;
    name: string;
    short_code: string;
    code: string;
    precision: number;
  }

  export type FormValues = {
    fromCurrency: string;
    toCurrency: string;
    amount: number;
  };