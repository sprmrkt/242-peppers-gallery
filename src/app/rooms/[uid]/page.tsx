import { notFound } from "next/navigation";

import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { defaultSharingImage } from "@/data/sharing";
import { metadata } from "@/app/layout";
import RoomsHeader from "@/components/layout/RoomsHeader/RoomsHeader";
import RoomPage from "@/pages/RoomPage/RoomPage";

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
    metadataBase: new URL(process.env.URL ?? "https://peppersgallery.com.au"),
    alternates: {
      canonical: page?.url ?? null,
    }
  };
}

export default async function Page(props: { params: Params }) {
  const client = createClient();
  const params = await props.params;
  const uid = params.uid;

  const page = await client.getByUID("room", uid).catch(() => notFound());
  const listingPage = await client.getSingle("rooms_listing").catch(() => notFound());

  return (
    <div>
      <RoomsHeader title={listingPage.data.title} description={listingPage.data.description} isPage={true}/>
      <RoomPage page={page}/>
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
