import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import { normalizeLocale } from "@/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

type LangParams = { lang: string };

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<LangParams>;
}) {
  const { lang } = await params;
  const locale = normalizeLocale(lang);
  if (!locale) {
    notFound();
  }

  const client = createClient();
  const layout = await client.getSingle("layout", { lang: locale }).catch(() => null);

  return (
    <>
      <Header config={layout?.data ?? null} lang={locale} />
      <main>{children}</main>
      <Footer config={layout?.data ?? null} lang={locale} />
    </>
  );
}
