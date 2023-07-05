import React from 'react';
import BackButton from '../back-button'

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-9">
     <BackButton/>

      <div>{children}</div>
         <BackButton/>
    </div>
  );
}
