import TodaySchedule from "./shows/today";
import OnAir from "./shows/on_air";
import NewsComponant from "./news/news-componant";
import { API_URL } from "../lib/config";
import Link from "next/link";
import ContactRow from "../ui/contact/contact-row";
export default async function Page() {
  const res = await fetch(`${API_URL}/radio/broadcast`, {
    next: { revalidate: 1 },
  });

  const data = await res.json();

  const scheduleRes = await fetch(`${API_URL}/radio/schedule`, {
    next: { revalidate: 60 },
  });
  const scheduleData = await scheduleRes.json();

  const newsRes = await fetch(`${API_URL}/wp/v2/posts/?per_page=100&_embed`, {
    next: { revalidate: 60 },
  });
  const newsData = await newsRes.json();

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-medium text-gray-300">
        Welcome to Mohodi Community Radio, 98.8 MHz FM
      </h1>

      <OnAir data={data} />

      <div className=" rounded-lg p-px shadow-lg shadow-black/20">
        <div className="rounded-lg bg-black p-3.5 lg:p-6">
          <ContactRow />
        </div>
      </div>

      <div className="flex">
        <div className="h-14 grow">
          <h2 className="text-xl font-medium text-amber-300">Today Schedule</h2>
        </div>
        <Link href={`/shows`} className="h-14 grow-0">
          <p className="text-md">View All</p>
        </Link>
      </div>
      <TodaySchedule schedule={scheduleData.schedule} />

      <hr className="" />
      <h2 className="text-xl font-medium text-amber-300">Latest News</h2>
      <NewsComponant count={6} newsData={newsData}></NewsComponant>
    </div>
  );
}
