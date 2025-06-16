import { Alert, Typography } from '@mui/material';

interface Props {
  result: number | null;
  from: string;
  to: string;
}

export function ConversionResult({ result, from, to }: Props) {
  if (result === null) return null;

  return (
    <Alert severity="success" variant="outlined">
      <Typography variant="h6">
        Converted Amount:
      </Typography>
      <Typography variant="body1">
        1 {from} = {result.toFixed(2)} {to}
      </Typography>
    </Alert>
  );
}








