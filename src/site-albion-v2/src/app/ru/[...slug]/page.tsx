import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentPage from "@/components/content/ContentPage";
import TutorProfile from "@/components/tutors/TutorProfile";
import { allPages, pageByUrl, pageForSegments } from "@/lib/content";
import { tutorForSegments, tutorSegments, tutorUrl } from "@/lib/tutors";

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...allPages()
      .filter((p) => p.lang === "ru")
      .map((p) => ({ slug: p.url.replace(/^\/ru\//, "").split("/").filter(Boolean) })),
    // Профили тьюторов: пока нет файлов с согласием, страниц нет.
    ...tutorSegments("ru").map((slug) => ({ slug })),
  ];
}

type Props = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tutor = tutorForSegments("ru", slug);
  if (tutor) {
    return {
      title: `${tutor.name.ru}, ${tutor.title.ru} | ALBION Oxford`,
      description: tutor.bio.ru.slice(0, 155),
      alternates: {
        canonical: tutorUrl("ru", tutor.slug),
        languages: { "en-GB": tutorUrl("en", tutor.slug), ru: tutorUrl("ru", tutor.slug), "x-default": tutorUrl("en", tutor.slug) },
      },
    };
  }
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
  const tutor = tutorForSegments("ru", slug);
  if (tutor) return <TutorProfile tutor={tutor} lang="ru" />;
  const page = pageForSegments("ru", slug);
  if (!page) notFound();
  return <ContentPage page={page} />;
}
