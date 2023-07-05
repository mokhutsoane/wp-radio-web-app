import React from 'react';
import Image from 'next/image';
import { API_URL } from '#/lib/config';

function removeHTMLTags(text, limit) {
  const plainText = text.replace(/<[^>]+>/g, '');
  return plainText.slice(0, limit);
}
export async function generateMetadata({ params }) {
  const newsRes = await fetch(`${API_URL}/radio/shows/?show=${params.slug}`, {
    next: { revalidate: 60 },
  });

  const item = await newsRes.json();
  const post = item.shows[0];
  const plainText = removeHTMLTags(post.description, 160);

  const sourceUrl = post.avatar_url || '/home/logo.png';
  return {
    title: post.name,
    description: plainText,

    alternates: {
      canonical: `/shows/${params.slug}`,
    },
    icons: {
      icon: sourceUrl,
      shortcut: sourceUrl,
      apple: sourceUrl,
      other: {
        rel: 'apple-touch-icon-precomposed',
        url: sourceUrl,
      },
    },
    openGraph: {
      images: [sourceUrl],
    },
  };
}

export async function generateStaticParams() {
  const posts = await fetch(`${API_URL}/radio/shows/`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());

  return posts.shows.map((post) => ({
    slug: post.slug,
  }));
}

export default async function page({ params }) {
  const newsRes = await fetch(`${API_URL}/radio/shows/?show=${params.slug}`, {
    next: { revalidate: 60 },
  });
  const item = await newsRes.json();
  const post = item.shows[0];

  const sourceUrl = post.avatar_url || '/home/logo.png';
  return (
    <div className="space-y-9">
      <h1 className="text-xl"> {post.name}</h1>

      <div className="h-90 w-80 rounded-lg">
        <div className="relative z-10 mx-auto max-w-screen-xl px-0 md:px-0 md:text-center">
          <Image
            src={sourceUrl}
            className="h-40 w-40 rounded-lg object-cover"
            width={100}
            height={100}
            placeholder="blur"
            blurDataURL="logo.png"
            alt={post.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>

      <div
        className="mt-4"
        dangerouslySetInnerHTML={{
          __html: post.description,
        }}
      ></div>
    </div>
  );
}
