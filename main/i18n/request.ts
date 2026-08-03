import { getRequestConfig } from 'next-intl/server';

const locales = ['en', 'ru', 'ka'] as const;
const defaultLocale = 'en' as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  const resolvedLocale = locale && locales.includes(locale as (typeof locales)[number])
    ? locale
    : defaultLocale;

  return {
    locale: resolvedLocale,
    messages: (await import(`./messages/${resolvedLocale}.json`)).default,
  };
});
