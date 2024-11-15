import { createClient } from "@/prismicio";
import LogoText from "@/app/components/LogoText";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  return (
    <footer className="flex flex-col items-center justify-between gap-6 border-t bg-[#383D2A] border-slate-600 px-8 py-7 md:flex-row">
      <Link href="/">
        <LogoText width={229} height={64} color="white" />
        <span className="sr-only">the lift nest Home Page</span>
      </Link>
      <nav aria-label="Footer">
        <ul className="flex gap-6">
          {settings.data.navigation.map((item) => (
            <li key={item.label}>
              <PrismicNextLink
                field={item.link}
                className="inline-flex min-h-11 items-center text-white hover:underline"
              >
                {item.label}
              </PrismicNextLink>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
