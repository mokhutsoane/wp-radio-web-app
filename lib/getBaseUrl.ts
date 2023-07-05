import { cache } from 'react';

export const getBaseUrl = cache(() =>
  process.env.VERCEL_URL
    ? `https://mohodifm.co.za/home`
    : `http://localhost:${process.env.PORT ?? 3000}`,
);
