import NavBar from "@/app/[lang]/components/NavBar";
import { createClient } from "@/prismicio";

export default async function Header({ locales, activeLocale }: { locales: any, activeLocale: string }) {
  const client = createClient();
  const settings = await client.getSingle("settings", { lang: activeLocale });

  return (
    <header>
      <NavBar settings={settings} locales={locales} activeLocale={activeLocale} />
    </header>
  );
}
