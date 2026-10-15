import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentPage from "@/components/content/ContentPage";
import TutorProfile from "@/components/tutors/TutorProfile";
import { allPages, pageByUrl, pageForSegments } from "@/lib/content";
import { social } from "@/lib/seo";
import { tutorForSegments, tutorSegments, tutorUrl } from "@/lib/tutors";

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...allPages()
      .filter((p) => p.lang === "en")
      .map((p) => ({ slug: p.url.split("/").filter(Boolean) })),
    // Tutor profiles: none until tutor files with consent exist.
    ...tutorSegments("en").map((slug) => ({ slug })),
  ];
}

type Props = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tutor = tutorForSegments("en", slug);
  if (tutor) {
    return {
      title: `${tutor.name.en}, ${tutor.title.en} | ALBION Oxford`,
      description: tutor.bio.en.slice(0, 155),
      alternates: {
        canonical: tutorUrl("en", tutor.slug),
        languages: { "en-GB": tutorUrl("en", tutor.slug), ru: tutorUrl("ru", tutor.slug), "x-default": tutorUrl("en", tutor.slug) },
      },
    };
  }
  const page = pageForSegments("en", slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    ...social(page.title, page.description, page.url, "en"),
    alternates: {
      canonical: page.url,
      languages: page.pair ? { "en-GB": page.url, ru: page.pair, "x-default": page.url } : undefined,
    },
  };
}

export default async function EnContent({ params }: Props) {
  const { slug } = await params;
  const tutor = tutorForSegments("en", slug);
  if (tutor) return <TutorProfile tutor={tutor} lang="en" />;
  const page = pageForSegments("en", slug);
  if (!page) notFound();
  return <ContentPage page={page} />;
}
