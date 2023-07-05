import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  
  title: 'Contact Us | Limpopo Community Radio Stations',
  description: ' Mohodi Community Radio – found in 1995 – broadcasts on the 98.8 MHz FM stereo frequency from the Mohodi township outside Polokwane to Tzaneen; Mokopane; Ngoako; Ramalepe; Sekakeng; Fatima; Madikana; Maponto; Broekman; Brussels; Lisa; Mogwadi; Makgado; Louis Trichardt; Potgietersrus; Duiwelskloof; Dendron; and Makgolong.',

   alternates: {
    canonical: '/contact',
   
  },
openGraph: {
    title: 'Contact Us | Limpopo Community Radio Stations',
  },

};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="space-y-9">
            <h1 className="text-xl font-medium text-gray-400/80">Contact Us</h1>

      <div>{children}</div>
    </div>
  );
}
