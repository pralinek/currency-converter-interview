import { NextResponse } from 'next/server';
import currencyApi from '@/app/lib/axios';

export async function GET() {
  try {
    const res = await currencyApi.get('/currencies');
    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch currencies' }, { status: 500 });
  }
}