"use client";

import React from "react";
import LogoText from "@/app/components/LogoText";
import Link from "next/link";
import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import ButtonLink from "@/app/components/ButtonLink";

type NavBarProps = {
  settings: Content.SettingsDocument;
};

export default function NavBar({ settings }: NavBarProps) {
  return (
    <nav className="px-4 py-4 md:px-6 md:py-6" aria-label="Main">
      <div className="mx-auto flex max-w-7xl flex-col justify-between py-2 font-medium md:flex-row md:items-center">
        <Link href="/">
          <LogoText width={229} height={64} />
          <span className="sr-only">the lift nest Home Page</span>
        </Link>
        <ul className="flex gap-4">
          {settings.data.navigation.map((item) => {
            if (item.cta_button) {
              return (
                <li key={item.label}>
                  <ButtonLink field={item.link}>{item.label}</ButtonLink>
                </li>
              );
            }
            return (
              <li key={item.label}>
                <PrismicNextLink
                  field={item.link}
                  className="relative inline-flex h-fit min-w-24 justify-center rounded-md border border-blue-100/20 bg-blue-200/10 px-4 py-2 text-slate-700 outline-none ring-[#fc5f2e] transition-colors hover:border-[#fc5f2e] hover:text-[#fc5f2e] after:hover:bg-opacity-15 focus:ring-2"
                >
                  {item.label}
                </PrismicNextLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
