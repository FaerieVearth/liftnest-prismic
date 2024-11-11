import { Metadata } from "next";

import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";
import { getLocales } from "@/app/utils/getLocales";
// This component renders your homepage.
//
// Use Next's generateMetadata function to render page metadata.
//
// Use the SliceZone to render the content of the page.

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID("page", "home", { lang });

  return {
    title: prismic.asText(home.data.title),
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: home.data.meta_image.url ?? "" }],
    },
  };
}

export default async function Index({
  params: { lang },
}: {
  params: { lang: string };
}) {
  // The client queries content from the Prismic API
  const client = createClient();
  const home = await client.getByUID("page", "home", { lang });
  const locales = await getLocales(home, client);
  return (
    <>
      <LanguageSwitcher locales={locales} activeLocale={lang} />
      <SliceZone slices={home.data.slices} components={components} />
    </>
  );
}
