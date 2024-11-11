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

type NavBarProps = {
  settings: Content.SettingsDocument;
};

export default function NavBar({ settings }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen((menuOpen) => !menuOpen);
  };

  return (
    <nav className="px-4 py-4 md:px-6 md:py-6" aria-label="Main">
      <div>
        <div className="mx-auto flex max-w-7xl justify-between py-2 font-medium md:flex-row md:items-center">
          <Link href="/">
            <LogoText width={229} height={64} />
            <span className="sr-only">the lift nest Home Page</span>
          </Link>
          <button className="z-10 lg:hidden" onClick={toggleMenu}>
            {menuOpen ? (
              <IoClose className="text-6xl text-[#fc5f2f]" />
            ) : (
              <RxHamburgerMenu className="text-6xl text-[#fc5f2f]" />
            )}
          </button>
          <ul className="hidden items-center justify-center gap-3 pt-8 lg:flex">
            {settings.data.navigation.map((item) => {
              if (item.cta_button) {
                return (
                  <li key={item.label}>
                    <ButtonLink field={item.link}>
                      {item.label}
                    </ButtonLink>
                  </li>
                );
              }
              return (
                <li key={item.label}>
                  <PrismicNextLink
                    field={item.link}
                    className="relative inline-flex h-fit min-w-24 justify-center rounded-md border border-blue-100/20 bg-blue-200 px-4 py-2 text-slate-700 outline-none ring-[#fc5f2e] transition-colors hover:border-[#fc5f2e] hover:text-[#fc5f2e] after:hover:bg-opacity-15 focus:ring-2"
                  >
                    {item.label}
                  </PrismicNextLink>
                </li>
              );
            })}
          </ul>
        </div>

        {menuOpen && (
          <ul className="flex w-full flex-col items-center gap-3 pt-8 lg:hidden">
            {settings.data.navigation.map((item) => {
              if (item.cta_button) {
                return (
                  <li key={item.label}>
                    <ButtonLink field={item.link} className="w-44" onClick={() => setMenuOpen(false)}>
                      {item.label}
                    </ButtonLink>
                  </li>
                );
              }
              return (
                <li key={item.label}>
                  <PrismicNextLink
                    field={item.link}
                    className="relative inline-flex h-fit w-44 min-w-24 justify-center rounded-md border border-blue-100/20 bg-blue-200 px-4 py-2 text-slate-700 outline-none ring-[#fc5f2e] transition-colors hover:border-[#fc5f2e] hover:text-[#fc5f2e] after:hover:bg-opacity-15 focus:ring-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </PrismicNextLink>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </nav>
  );
}
