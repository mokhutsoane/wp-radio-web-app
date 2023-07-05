import React from 'react';
import Image from 'next/image';
import { API_URL } from '../../../lib/config';

function removeHTMLTags(text, limit) {
  const plainText = text.replace(/<[^>]+>/g, '');
  return plainText.slice(0, limit);
}
export async function generateMetadata({ params }) {
  const newsRes = await fetch(
    `${API_URL}/wp/v2/posts?slug=${params.slug}&_embed`,
    { next: { revalidate: 60 } },
  );

  const item = await newsRes.json();
  const post = item[0];
  const plainText = removeHTMLTags(post.content.rendered, 160);

  const featuredMedia =
    post._embedded && post._embedded['wp:featuredmedia']
      ? post._embedded['wp:featuredmedia'][0]
      : null;

  const sourceUrl =
    featuredMedia?.media_details?.sizes?.medium?.source_url ||
    (featuredMedia && featuredMedia.source_url) ||
    '/home/logo.png';
  return {
    title: post.title.rendered,
    description: plainText,

    alternates: {
      canonical: `/news/${params.slug}`,
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
  const posts = await fetch(`${API_URL}/wp/v2/posts`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function page({ params }) {
  const newsRes = await fetch(
    `${API_URL}/wp/v2/posts?slug=${params.slug}&_embed`,
    { next: { revalidate: 60 } },
  );
  const item = await newsRes.json();
  const post = item[0];
  const featuredMedia =
    post._embedded && post._embedded['wp:featuredmedia']
      ? post._embedded['wp:featuredmedia'][0]
      : null;

  const sourceUrl =
    featuredMedia?.media_details?.sizes?.medium?.source_url ||
    (featuredMedia && featuredMedia.source_url) ||
    '/home/logo.png';
  return (
    <div className="space-y-9">
      <h1 className="text-xl"> {post.title.rendered}</h1>

      <div className="h-90 w-80 rounded-lg">
        <div className="relative z-10 mx-auto max-w-screen-xl px-0 md:px-0 md:text-center">
          <Image
            src={sourceUrl}
            className="h-40 w-40 rounded-lg object-cover"
            width={100}
            height={100}
            placeholder="blur"
            blurDataURL="logo.png"
            alt={post.title.rendered}
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
          __html: post.content.rendered,
        }}
      ></div>
    </div>
  );
}
