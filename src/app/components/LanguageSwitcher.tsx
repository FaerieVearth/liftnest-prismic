// ./src/components/LanguageSwitcher.tsx

import { PrismicNextLink } from '@prismicio/next';

interface LanguageSwitcherProps {
  locales: {
    lang: string;
    lang_name: string;
    url: string;
  }[];
  activeLocale: string;
}

const localeLabels = {
  'en-us': 'EN',
  'de-de': 'DE',
} as const;

// Define the preferred order
const localeOrder = ['de-de', 'en-us'] as const;

export const LanguageSwitcher = ({ locales, activeLocale }: LanguageSwitcherProps) => {
  // Sort locales based on predefined order
  const sortedLocales = [...locales].sort((a, b) => 
    localeOrder.indexOf(a.lang as typeof localeOrder[number]) - 
    localeOrder.indexOf(b.lang as typeof localeOrder[number])
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span aria-hidden={true} className="text-gray-400">🌐</span>
      <ul className="flex flex-wrap gap-2">
        {sortedLocales.map((locale) => {
          const isCurrentLocale = locale.lang === activeLocale;
          return (
            <li key={locale.lang}>
              <PrismicNextLink
                href={locale.url}
                locale={locale.lang}
                aria-label={`Change language to ${locale.lang_name}`}
                aria-current={isCurrentLocale ? 'true' : undefined}
                className={`px-2 py-1 rounded-md transition-colors
                  ${isCurrentLocale
                    ? 'bg-gray-900 text-white font-medium'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
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