export type NavLeaf = { label: string; href: string };
export type NavNode = { label: string; href?: string; children?: NavLeaf[] };

/**
 * Information architecture for ALBION Consult — structure agreed with the
 * client 23.09: MBA lives inside Executive Education (not after Master's);
 * school testing pages framed as entrance exams 11+/13+/16+ (UKiset/ISEB are
 * test names inside, not the product).
 */
export const NAV: NavNode[] = [
  {
    label: "About",
    children: [
      { label: "Mission", href: "/#difference" },
      { label: "Team", href: "/#people" },
      { label: "Results & numbers", href: "/#proof" },
      { label: "Testimonials", href: "/#proof" },
      { label: "Media", href: "/#journal" },
      { label: "Contact", href: "/#consult" },
    ],
  },
  {
    label: "Admissions",
    children: [
      { label: "Day schools", href: "/private-schools/day" },
      { label: "Boarding schools", href: "/private-schools/boarding" },
      { label: "Entrance exams — 11+ / 13+ / 16+", href: "/admissions/entrance-exams" },
      { label: "Universities UK", href: "/universities/uk" },
      { label: "Universities Europe", href: "/universities/europe" },
      { label: "Universities USA", href: "/universities/usa" },
      { label: "Oxbridge", href: "/universities/oxbridge" },
      { label: "Master's", href: "/universities/masters" },
      { label: "Doctoral studies", href: "/universities/doctoral" },
    ],
  },
  {
    label: "Tuition",
    children: [
      { label: "Entrance exam prep — 11+ / 13+ / 16+", href: "/tuition/entrance-exams" },
      { label: "University tests — LNAT / TMUA / UCAT / IELTS", href: "/tuition/university-tests" },
      { label: "GCSE", href: "/tuition/gcse" },
      { label: "A-Level", href: "/tuition/a-level" },
      { label: "IB", href: "/tuition/ib" },
      { label: "Home education", href: "/tuition/home-education" },
      { label: "Intensive courses", href: "/tuition/intensive-courses" },
      { label: "Tutors", href: "/tutors" },
    ],
  },
  {
    label: "Services",
    children: [
      { label: "Guardianship", href: "/services/guardianship" },
      { label: "Academic assessment", href: "/services/academic-assessment" },
      { label: "Career guidance", href: "/services/career-guidance" },
      { label: "Personal Statement", href: "/services/personal-statement" },
      { label: "Summer schools", href: "/summer-schools" },
      { label: "Executive education — MBA & EMBA", href: "/executive-education" },
    ],
  },
  { label: "Journal", href: "/#journal" },
  {
    label: "Events",
    children: [
      { label: "Webinars & meetings", href: "/events/webinars-meetings" },
      { label: "Open day", href: "/events/open-day" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Guides", href: "/#guides" },
      { label: "Pricing", href: "/resources/pricing" },
    ],
  },
];

export const SLUG_TITLES: Record<string, string> = {};
for (const node of NAV) {
  for (const child of node.children ?? []) {
    const slug = child.href.replace(/^\//, "");
    if (slug.startsWith("#") || slug.includes("/#")) continue;
    SLUG_TITLES[slug] = child.label;
  }
}

export const JOURNAL_TITLES: Record<string, string> = {
  "journal/entrance-exams-11-13-16": "Entrance exams 11+, 13+, 16+: what schools actually test",
  "journal/iseb-ukiset-cat4-cem": "ISEB, UKiset, CAT4, CEM — what actually differs",
  "journal/choosing-a-private-school": "How to choose a British private school",
  "journal/boarding-or-day": "Boarding or day: deciding honestly",
  "journal/a-level-or-ib": "A-Level or IB: choosing a curriculum",
  "journal/oxbridge-interview": "The Oxbridge interview, demystified",
  "journal/oxford-acceptance-rates": "Oxford acceptance rates, read carefully",
  "journal/ucas-personal-statement": "UCAS deadlines & the personal statement",
};

export function titleForSlug(slug: string[]): string {
  const key = slug.join("/");
  if (JOURNAL_TITLES[key]) return JOURNAL_TITLES[key];
  if (SLUG_TITLES[key]) return SLUG_TITLES[key];
  const top = NAV.find((n) => n.label.toLowerCase().replace(/\s+/g, "-") === key);
  if (top) return top.label;
  return key.replace(/[-/]/g, " ");
}
