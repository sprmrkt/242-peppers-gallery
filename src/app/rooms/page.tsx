import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import { defaultSharingImage } from "@/data/sharing";
import { metadata } from "@/app/layout";
import PrismicCardForDocs from "@/components/general/Card/PrismicCardForDocs";
import RoomsHeader from "@/components/layout/RoomsHeader/RoomsHeader";
import RoomsGrid from "@/components/layout/RoomsGrid/RoomsGrid";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("rooms_listing").catch(() => notFound());

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

export default async function Home() {
  //  Create a Prismic client
  const client = createClient();

  //  Look for the page
  //  If it doesn't exist, return a 404
  const pages = await client.getAllByType("room");
  const listingPage = await client.getSingle("rooms_listing").catch(() => notFound());

  return (
    <div>
      <RoomsHeader title={listingPage.data.title} description={listingPage.data.description} />
      <RoomsGrid rooms={pages} />
    </div>
  );
}
