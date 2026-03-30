import type { Metadata } from "next";
import { PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "@/prismicio";
import Layout from "@/components/layout/Layout/Layout";
import { notFound } from "next/navigation";
import "@/styles/index.scss";
// import { GoogleTagManager } from "@next/third-parties/google";

import { anconaEx, tfArrow } from "@/utils/fontLoader";
// See: https://nextjs.org/docs/app/getting-started/fonts#local-fonts

export const metadata: Metadata = {
  title: "Peppers Gallery Hotel",
  description: "Boutique Heritage Hotel in Canberra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/*<GoogleTagManager gtmId="GTM-XYZ" />*/}
      <body
        className={`${tfArrow.className} ${anconaEx.className}`}
      >
        <InnerLayout>
          {children}
        </InnerLayout>
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}

async function InnerLayout({ children }: { children: React.ReactNode }) {
  const client = createClient();
  const layoutData = await client.getSingle("layout").catch((error) => {
    notFound();
  });

  return (
    <Layout layoutData={layoutData.data}>
      {children}
    </Layout>
  );
}
