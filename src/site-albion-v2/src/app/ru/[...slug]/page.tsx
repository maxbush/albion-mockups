import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentPage from "@/components/content/ContentPage";
import { allPages, pageByUrl, pageForSegments } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return allPages()
    .filter((p) => p.lang === "ru")
    .map((p) => ({ slug: p.url.replace(/^\/ru\//, "").split("/").filter(Boolean) }));
}

type Props = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = pageForSegments("ru", slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.url,
      languages: page.pair ? { "en-GB": page.pair, ru: page.url, "x-default": page.pair } : undefined,
    },
  };
}

export default async function RuContent({ params }: Props) {
  const { slug } = await params;
  const page = pageForSegments("ru", slug);
  if (!page) notFound();
  return <ContentPage page={page} />;
}
