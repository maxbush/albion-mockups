import type { Metadata } from "next";
import type { ReactNode } from "react";
import LangChrome from "@/components/layout/LangChrome";
import { getDictionary } from "@/lib/i18n";
import { social } from "@/lib/seo";

export const dynamicParams = false;

export function generateMetadata(): Metadata {
  const dict = getDictionary("ru");
  return {
    title: { absolute: dict.meta.title },
    description: dict.meta.description,
    ...social(dict.meta.title, dict.meta.description, "/ru/", "ru"),
    alternates: { canonical: "/ru/", languages: { "en-GB": "/", ru: "/ru/", "x-default": "/" } },
  };
}

export default function RuLayout({ children }: { children: ReactNode }) {
  return <LangChrome lang="ru">{children}</LangChrome>;
}
