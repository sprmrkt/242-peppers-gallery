import { notFound } from "next/navigation";

import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { defaultSharingImage } from "@/data/sharing";
import { metadata } from "@/app/layout";

type Params = Promise<{ uid: string }>;

/**
 * This page renders a Prismic Document dynamically based on the URL.
 */

export async function generateMetadata(props: { params: Params }) {
  const client = createClient();
  const params = await props.params;
  const uid = params.uid;

  const page = await client.getByUID("room", uid).catch(() => notFound());

  return {
    title: page.data.title + ` | ${metadata.title}`,
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title || undefined,
      images: [
        {
          url: page.data.meta_image.url || defaultSharingImage.url,
          width: defaultSharingImage.width,
          height: defaultSharingImage.height,
          alt: defaultSharingImage.alt,
        },
      ],
    },
  };
}

export default async function Page(props: { params: Params }) {
  const client = createClient();
  const params = await props.params;
  const uid = params.uid;

  const page = await client.getByUID("room", uid).catch(() => notFound());

  return (
    <div>
      <h1 style={{marginTop: "100px"}}>{page.data.title}</h1>
      <p>{page.data.beds}</p>
      <p>{page.data.guests}</p>
      <p>{page.data.bath}</p>
      <SliceZone slices={page.data.slices} components={components} />
    </div>
  );
}

export async function generateStaticParams() {
  const client = createClient();

  /**
   * Query all Documents from the API, except the homepage.
   */
  const pages = await client.getAllByType("room");

  /**
   * Define a path for every Document.
   */
  return pages.map((page) => {
    return { uid: page.uid };
  });
}
