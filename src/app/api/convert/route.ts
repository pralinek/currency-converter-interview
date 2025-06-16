import { NextRequest, NextResponse } from 'next/server';
import currencyApi from '@/app/lib/axios';

export async function POST(req: NextRequest) {
  try {
    const { fromCurrency, toCurrency, amount } = await req.json();


    const response = await currencyApi.get('/convert', {
      params: {
        from: fromCurrency,
        to: toCurrency,
        amount:amount,
      },
    });

    const { value } = response.data;

    return NextResponse.json({ result: value });
  } catch (error: any) {
    console.error('API conversion error:', error?.message || error);
    return NextResponse.json(
      { error: 'Conversion failed. Please try again.' },
      { status: 500 }
    );
  }
}