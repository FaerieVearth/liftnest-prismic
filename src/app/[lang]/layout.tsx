import { PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "@/prismicio";
import "../../app/globals.css";
import { DM_Sans } from "next/font/google";
import { Lora } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getLocales } from "../utils/getLocales";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
});

export default async function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const client = createClient();
  const home = await client.getByUID("page", "home", { lang });
  const locales = await getLocales(home, client);
  return (
    <html lang="en" className={`${lora.variable}`}>
      <body className="bg-[#FBF8EF] text-[#111410] min-h-screen flex flex-col justify-between">
        <Header locales={locales} activeLocale={lang} />
        {children}
        <Footer activeLocale={lang} />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
