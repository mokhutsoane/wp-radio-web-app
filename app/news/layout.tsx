import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  
  title: 'Breaking News from SA, Africa and Around the World',
  description: 'Top stories and news highlights from around South Africa, Africa and across the globe as they happen. Read and Listen the latest local and International news on Mohodi FM today.',

   alternates: {
    canonical: '/news',
   
  },
openGraph: {
    title: 'Breaking News from SA, Africa and Around the World',
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
