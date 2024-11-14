import NavBar from "@/app/components/NavBar";
import { createClient } from "@/prismicio";

export default async function Header({ locales, activeLocale }: { locales: any, activeLocale: string }) {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <header>
      <NavBar settings={settings} locales={locales} activeLocale={activeLocale} />
    </header>
  );
}
