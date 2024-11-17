// ./src/components/LanguageSwitcher.tsx

import { cn } from "@nextui-org/react";
import { PrismicNextLink } from "@prismicio/next";
import { usePathname } from "next/navigation";

interface LanguageSwitcherProps {
  locales: {
    lang: string;
    lang_name: string;
    url: string;
  }[];
  activeLocale: string;
  className?: string;
}

const localeLabels = {
  "en-us": "EN",
  "de-de": "DE",
} as const;

// Define the preferred order
const localeOrder = ["de-de", "en-us"] as const;

export const LanguageSwitcher = ({
  locales,
  activeLocale,
  className,
}: LanguageSwitcherProps) => {
  const pathname = usePathname();
  
  // Sort locales based on predefined order
  const sortedLocales = [...locales].sort(
    (a, b) =>
      localeOrder.indexOf(a.lang as (typeof localeOrder)[number]) -
      localeOrder.indexOf(b.lang as (typeof localeOrder)[number]),
  );

  const getLocalizedPath = (locale: string) => {
    // Remove the language prefix from the current pathname
    const pathWithoutLang = pathname.replace(/^\/(?:en-us|de-de)/, '');
    
    // For default language (de-de), don't add prefix
    if (locale === 'de-de') {
      return pathWithoutLang || '/';
    }
    
    // For other languages, add the prefix
    return `/${locale}${pathWithoutLang}`;
  };

  return (
    <div className={cn(`flex flex-row items-center gap-2`, className)}>
      <ul className="flex flex-row gap-2">
        <li>
          <span aria-hidden={true} className="text-gray-400">
            🌐
          </span>
        </li>
        {sortedLocales.map((locale) => {
          const isCurrentLocale = locale.lang === activeLocale;
          return (
            <li key={locale.lang}>
              <PrismicNextLink
                href={getLocalizedPath(locale.lang)}
                locale={locale.lang}
                aria-label={`Change language to ${locale.lang_name}`}
                aria-current={isCurrentLocale ? "true" : undefined}
                className={`rounded-md px-2 py-1 transition-colors
                  ${
                    isCurrentLocale
                      ? "bg-gray-900 font-medium text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
              >
                {localeLabels[locale.lang as keyof typeof localeLabels] ||
                  locale.lang}
              </PrismicNextLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
