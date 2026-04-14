import { createClient } from "@/prismicio";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient();

  // To do: Make sure the types mapped here match the routes defined in `prismicio.ts`.

  const pages = await client.getAllByType("page");
  const home = await client.getAllByType("home");
  const roomsListing = await client.getAllByType("rooms_listing");
  const rooms = await client.getAllByType("room");

  const pageEntries: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${process.env.URL}/${page.uid}`,
    lastModified: new Date(page.last_publication_date),
  }));
  const roomsListingEntries: MetadataRoute.Sitemap = roomsListing.map((roomsListing) => ({
    url: `${process.env.URL}/rooms`,
    lastModified: new Date(roomsListing.last_publication_date),
  }));
  const roomEntries: MetadataRoute.Sitemap = rooms.map((room) => ({
    url: `${process.env.URL}/rooms/${room.uid}`,
    lastModified: new Date(room.last_publication_date),
  }));
  const homeEntries: MetadataRoute.Sitemap = home.map((home) => ({
    url: `${process.env.URL}`,
    lastModified: new Date(home.last_publication_date),
  }));

  return [...homeEntries, ...pageEntries, ...roomsListingEntries, ...roomEntries];
}

