"use client";

import React from "react";
import LogoText from "@/app/components/LogoText";
import Link from "next/link";
import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import ButtonLink from "@/app/components/ButtonLink";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";

type NavBarProps = {
  settings: Content.SettingsDocument;
  locales: any;
  activeLocale: string;
};

export default function NavBar({
  settings,
  locales,
  activeLocale,
}: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen((menuOpen) => !menuOpen);
  };

  return (
    <nav className="px-4 py-4 md:px-6 md:py-6" aria-label="Main">
      <div>
        <div className="mx-auto flex max-w-[1400px] justify-between py-2 font-medium md:flex-row md:items-center">
          <Link href="/">
            <LogoText width={229} height={64} color="black" />
            <span className="sr-only">the lift nest Home Page</span>
          </Link>
          <div className="flex items-center gap-8">
            <ul className="hidden items-center justify-center gap-3 lg:flex">
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
                      className="relative inline-flex h-fit min-w-24 justify-center rounded-md px-4 py-2 text-black outline-none transition-colors hover:bg-[#393939] hover:text-white"
                    >
                      {item.label}
                    </PrismicNextLink>
                  </li>
                );
              })}
            </ul>
            <LanguageSwitcher
              locales={locales}
              activeLocale={activeLocale}
              className="hidden lg:block"
            />
            <button className="z-10 lg:hidden" onClick={toggleMenu}>
              {menuOpen ? (
                <IoClose className="text-6xl text-[#393939]" />
              ) : (
                <RxHamburgerMenu className="text-6xl text-[#393939]" />
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-[#FBF8EF]">
            <div className="mx-auto max-w-[1400px] px-6 py-6">
              <LogoText width={229} height={64} color="black" />
              <button
                className="absolute right-4 top-4 md:right-6 md:top-6"
                onClick={() => setMenuOpen(false)}
              >
                <IoClose className="text-4xl text-black" />
              </button>
            </div>
            <div className="flex h-full flex-col items-center justify-start pt-16">
              <ul className="flex w-full flex-col items-center gap-4">
                {settings.data.navigation.map((item) => {
                  if (item.cta_button) {
                    return (
                      <li key={item.label}>
                        <ButtonLink
                          field={item.link}
                          className="w-44"
                          onClick={() => setMenuOpen(false)}
                        >
                          {item.label}
                        </ButtonLink>
                      </li>
                    );
                  }
                  return (
                    <li key={item.label}>
                      <PrismicNextLink
                        field={item.link}
                        className="relative inline-flex h-fit w-44 min-w-24 justify-center rounded-md border border-[#393939] px-4 py-2 text-[#393939] outline-none ring-[#393939] transition-colors hover:border-[#393939] hover:text-[#393939] after:hover:bg-opacity-15 focus:ring-2"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </PrismicNextLink>
                    </li>
                  );
                })}
                <LanguageSwitcher
                  locales={locales}
                  activeLocale={activeLocale}
                />
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
