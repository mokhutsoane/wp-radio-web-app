import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import moment from 'moment';
export const metadata = {
  title: 'Streaming',
};

export default async function NewsComponant({ count, newsData }) {
  let firstTenItems = [];
  if (count === -1) {
    firstTenItems = newsData;
  } else {
    firstTenItems =
      newsData && newsData.length > 0 ? newsData.slice(0, count) : [];
  }

  return (
    <div>
      {firstTenItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {firstTenItems.map((item) => {
            const featuredMedia =
              item._embedded && item._embedded['wp:featuredmedia']
                ? item._embedded['wp:featuredmedia'][0]
                : null;

            const sourceUrl =
              featuredMedia?.media_details?.sizes?.medium?.source_url ||
              (featuredMedia && featuredMedia.source_url) ||
              '/home/logo.png';
            return (
              <Link
                href={`/news/${item.slug}`}
                key={item.id}
                className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
              >
                <div className="">
                  <div className=" pr-3">
                    <Image
                      src={sourceUrl}
                      className="h-40 w-40 rounded-lg object-cover"
                      width={100}
                      height={100}
                      placeholder="blur"
                      blurDataURL="logo.png"
                      alt={item.title.rendered}
                      style={{
                        width: '100%',
                        height: '150px',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  <div>
                    <div className="font-medium text-gray-200 group-hover:text-gray-50">
                      {item.title.rendered}
                    </div>

                    <div className="line-clamp-3 text-sm text-gray-400 group-hover:text-gray-300">
                      {moment(item.date).format('DD MMM YYYY')}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div>
          <p>No News at the moment, Please check again later</p>
        </div>
      )}
    </div>
  );
}
