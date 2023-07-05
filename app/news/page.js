import React from "react";
import NewsComponant from "./news-componant";
import { API_URL } from "../../lib/config";
export default async function NewsPage() {
  const newsRes = await fetch(`${API_URL}/wp/v2/posts/?per_page=100&_embed`, {
    next: { revalidate: 60 },
  });
  const newsData = await newsRes.json();
  return (
    <div className="space-y-9">
      <div className="flex justify-between">
        <h2 className="text-xl font-medium text-amber-300">Latest News</h2>
      </div>

      <NewsComponant newsData={newsData} />
    </div>
  );
}
