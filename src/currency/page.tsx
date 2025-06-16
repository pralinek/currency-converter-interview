'use client';

import { Container, Box } from '@mui/material';
import { CurrencyExchange } from '@/app/components/currency/CurrencyExchange';

export default function CurrencyPage() {
  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box width="100%">
        <CurrencyExchange />
      </Box>
    </Container>
  );
}



