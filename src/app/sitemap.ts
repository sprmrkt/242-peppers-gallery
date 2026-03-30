import { createClient } from "@/prismicio";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient();

  // To do: Make sure the types mapped here match the routes defined in `prismicio.ts`.

  const pages = await client.getAllByType("page");
  const home = await client.getAllByType("home");
  const rooms = await client.getAllByType("room");

  const pageEntries: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/${page.uid}`,
  }));
  const roomEntries: MetadataRoute.Sitemap = rooms.map((room) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/rooms/${room.uid}`,
  }));
  const homeEntries: MetadataRoute.Sitemap = home.map((home) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    lastModified: new Date(home.last_publication_date),
  }));

  return [...homeEntries, ...pageEntries, ...roomEntries];
}

