import { Alert, Typography } from '@mui/material';

interface Props {
  result: number | null;
  amount: number;
  from: string;
  to: string;
}

export function ConversionResult({ result, from, to, amount }: Props) {
  if (result === null) return null;

  return (
    <Alert severity="success" variant="outlined">
      <Typography variant="h6">
        Converted Amount:
      </Typography>
      <Typography variant="body1">
        {amount} {from} = {result.toFixed(2)} {to}
      </Typography>
    </Alert>
  );
}








