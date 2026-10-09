import type { Metadata } from "next";
import type { ReactNode } from "react";
import LangChrome from "@/components/layout/LangChrome";
import { getDictionary } from "@/lib/i18n";

export const dynamicParams = false;

export function generateMetadata(): Metadata {
  const dict = getDictionary("en");
  return {
    title: { absolute: dict.meta.title },
    description: dict.meta.description,
    alternates: { canonical: "/", languages: { "en-GB": "/", ru: "/ru/", "x-default": "/" } },
  };
}

export default function EnLayout({ children }: { children: ReactNode }) {
  return <LangChrome lang="en">{children}</LangChrome>;
}
