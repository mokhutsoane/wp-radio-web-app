import React from 'react';
import Tabs from '../../ui/tabs/tabs';
import {API_URL} from '../../lib/config';

export default async function ShowsPage() {
  const res = await fetch(
    `${API_URL}/radio/schedule`,
    { next: { revalidate: 60 } },
  );
  const data = await res.json();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-medium text-amber-300">Schedule</h1>
      </div>
      <div>
        <div>
          <Tabs data={data.schedule} />
        </div>
      </div>
    </div>
  );
}
