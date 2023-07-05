import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  
  title: 'Daily Schedule | Limpopo Community Radio Stations',
  description: 'Sports-mad, a fashion fundi or a trend setter? Want to chill with some great music and good friends? Our radio shows have got something for everyone.',

   alternates: {
    canonical: '/shows',
   
  },
openGraph: {
    title: 'Daily Schedule | Limpopo Community Radio Stations',
  },

};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="space-y-9">
      <div>{children}</div>
    </div>
  );
}
