"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { levelLabel, subjectLabel, TUTOR_COPY, type Tutor } from "@/lib/tutors";
import TutorCard from "./TutorCard";

function Chips({
  label,
  value,
  options,
  onChange,
  anyLabel,
}: {
  label: string;
  value: string;
  options: { key: string; label: string }[];
  onChange: (v: string) => void;
  anyLabel: string;
}) {
  return (
    <div role="group" aria-label={label}>
      <p className="label">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {[{ key: "all", label: anyLabel }, ...options].map((o) => (
          <button
            key={o.key}
            type="button"
            aria-pressed={value === o.key}
            onClick={() => onChange(o.key)}
            className={`border px-3.5 py-1.5 text-[14px] transition-colors ${
              value === o.key ? "border-ink-2 bg-ink-2 text-cream" : "border-ink-2/25 text-ink-2/80 hover:border-ink-2/60"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Subject by level filter over the full list. Rendered only where there are enough tutors for it to be useful. */
export default function TutorFilter({ tutors, lang }: { tutors: Tutor[]; lang: Locale }) {
  const copy = TUTOR_COPY[lang];
  const [subject, setSubject] = useState("all");
  const [level, setLevel] = useState("all");

  const subjects = useMemo(() => [...new Set(tutors.flatMap((t) => t.subjects))], [tutors]);
  const levels = useMemo(() => [...new Set(tutors.flatMap((t) => t.levels))], [tutors]);
  const list = tutors.filter(
    (t) => (subject === "all" || t.subjects.includes(subject)) && (level === "all" || t.levels.includes(level)),
  );
  const showFilters = tutors.length >= 4 && (subjects.length > 1 || levels.length > 1);

  return (
    <div>
      {showFilters && (
        <div className="grid gap-8 border-b border-ink-2/12 pb-8 sm:grid-cols-2">
          {subjects.length > 1 && (
            <Chips
              label={copy.subject}
              value={subject}
              anyLabel={copy.any}
              onChange={setSubject}
              options={subjects.map((s) => ({ key: s, label: subjectLabel(s, lang) }))}
            />
          )}
          {levels.length > 1 && (
            <Chips
              label={copy.level}
              value={level}
              anyLabel={copy.any}
              onChange={setLevel}
              options={levels.map((l) => ({ key: l, label: levelLabel(l, lang) }))}
            />
          )}
        </div>
      )}
      {showFilters && (
        <p className="mt-5 text-[13px] text-ink-2/60" aria-live="polite">
          {copy.shown.replace("{n}", String(list.length)).replace("{m}", String(tutors.length))}
        </p>
      )}
      {list.length ? (
        <ul className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {list.map((t) => (
            <TutorCard key={t.slug} tutor={t} lang={lang} />
          ))}
        </ul>
      ) : (
        <p className="mt-8 text-[16px] text-ink-2/70">{copy.empty}</p>
      )}
    </div>
  );
}
