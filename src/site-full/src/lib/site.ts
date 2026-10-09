import { getDictionary, type Locale } from "./i18n";

/** Contact facts taken from the live albion-consult.com site. */
export const CONTACT = {
  email: "info@albionconsult.co.uk",
  phone: "+44 1865 236391",
  phoneHref: "tel:+441865236391",
  address: "New Barclay House, 234 Botley Road, Oxford OX2 0HP",
} as const;

export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/albionconsult/" },
  { label: "YouTube", href: "https://www.youtube.com/@ALBION_consult" },
  { label: "Facebook", href: "https://www.facebook.com/albionconsult" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/albionconsult" },
  { label: "Telegram", href: "https://t.me/albionedu" },
] as const;

export const REVIEW_LINKS = {
  google: "https://www.google.com/maps/search/?api=1&query=ALBION+234+Botley+Road+Oxford",
  trustpilot: "https://www.trustpilot.com/review/albion-consult.com",
} as const;

/* ---------- canonical URLs (wave1 taxonomy) ---------- */

const P = {
  en: {
    home: "/",
    schools: "/private-schools/",
    boarding: "/private-schools/boarding/",
    day: "/private-schools/day-schools/",
    exams: "/private-schools/entrance-exams/",
    guardianship: "/private-schools/guardianship/",
    universities: "/university-admissions/",
    oxbridge: "/university-admissions/oxbridge/",
    masters: "/university-admissions/masters/",
    statement: "/university-admissions/personal-statement/",
    admissionsTests: "/university-admissions/admissions-tests/",
    europe: "/university-admissions/europe/",
    usa: "/university-admissions/usa/",
    phd: "/university-admissions/phd/",
    exec: "/executive-education/",
    mba: "/executive-education/mba/",
    said: "/executive-education/mba/oxford-said/",
    emba: "/executive-education/mba/oxford-executive-mba/",
    management: "/executive-education/management-programmes/",
    tutors: "/tutors/",
    gcse: "/tutors/gcse/",
    alevel: "/tutors/a-level/",
    ib: "/tutors/ib/",
    revision: "/tutors/revision-courses/",
    easter: "/tutors/revision-courses/easter/",
    homeschooling: "/tutors/homeschooling/",
    summer: "/summer-schools/",
    summerOxford: "/summer-schools/oxford/",
    assessment: "/assessment/",
    career: "/career-guidance/",
    language: "/language-preparation/",
    prices: "/prices/",
    apply: "/apply/",
    contact: "/contact/",
    about: "/about/",
    team: "/team/",
    cases: "/cases/",
    reviews: "/reviews/",
    events: "/events/",
    openDay: "/events/open-day/",
    guides: "/guides/",
    blog: "/blog/",
  },
  ru: {
    home: "/ru/",
    schools: "/ru/chastnye-shkoly/",
    boarding: "/ru/chastnye-shkoly/pansiony/",
    day: "/ru/chastnye-shkoly/dnevnye-shkoly/",
    exams: "/ru/chastnye-shkoly/vstupitelnye-ekzameny/",
    guardianship: "/ru/chastnye-shkoly/opeka/",
    universities: "/ru/postuplenie-v-universitety/",
    oxbridge: "/ru/postuplenie-v-universitety/oksbridzh/",
    masters: "/ru/postuplenie-v-universitety/magistratura/",
    statement: "/ru/postuplenie-v-universitety/motivatsionnoe-pismo/",
    admissionsTests: "/ru/postuplenie-v-universitety/ekzameny/",
    europe: "/ru/postuplenie-v-universitety/evropa/",
    usa: "/ru/postuplenie-v-universitety/ssha/",
    phd: "/ru/postuplenie-v-universitety/doktorantura/",
    exec: "/ru/executive-obrazovanie/",
    mba: "/ru/executive-obrazovanie/mba/",
    said: "/ru/executive-obrazovanie/mba/oksford-said/",
    emba: "/ru/executive-obrazovanie/mba/oksford-emba/",
    management: "/ru/executive-obrazovanie/upravlencheskie-programmy/",
    tutors: "/ru/repetitory/",
    gcse: "/ru/repetitory/gcse/",
    alevel: "/ru/repetitory/a-level/",
    ib: "/ru/repetitory/ib/",
    revision: "/ru/repetitory/intensivy/",
    easter: "/ru/repetitory/intensivy/paskha/",
    homeschooling: "/ru/domashnee-obuchenie/",
    summer: "/ru/letnie-shkoly/",
    summerOxford: "/ru/letnie-shkoly/oksford/",
    assessment: "/ru/akademicheskaya-otsenka/",
    career: "/ru/karernoe-orientirovanie/",
    language: "/ru/yazykovaya-podgotovka/",
    prices: "/ru/tseny/",
    apply: "/ru/anketa/",
    contact: "/ru/kontakty/",
    about: "/ru/o-kompanii/",
    team: "/ru/komanda/",
    cases: "/ru/kejsy/",
    reviews: "/ru/otzyvy/",
    events: "/ru/sobytiya/",
    openDay: "/ru/sobytiya/den-otkrytyh-dverey/",
    guides: "/ru/gidy/",
    blog: "/ru/blog/",
  },
} as const;

export type PathKey = keyof (typeof P)["en"];

export function path(lang: Locale, key: PathKey): string {
  return P[lang][key];
}

/* ---------- header nav (SILO taxonomy) ---------- */

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  note?: string;
}
export interface NavGroup {
  title?: string;
  items: NavItem[];
}
export interface NavSection {
  id: string;
  label: string;
  intro: string;
  href: string;
  groups: NavGroup[];
}

const NAV: Record<Locale, NavSection[]> = {
  en: [
    {
      id: "schools",
      label: "Schools",
      href: P.en.schools,
      intro: "Independent schools in Britain: boarding and day, entry points 7+/11+/13+/16+, guardianship.",
      groups: [
        {
          items: [
            { label: "Boarding schools", href: P.en.boarding, description: "Selection and admission to UK boarding schools, end to end." },
            { label: "Day schools", href: P.en.day, description: "Day schools in London and the counties, for relocating families." },
            { label: "Entrance exams 11+/13+/16+", href: P.en.exams, description: "UKiset, ISEB, CAT4 and school papers — diagnostics first." },
            { label: "Guardianship", href: P.en.guardianship, description: "AEGIS-standard guardianship for pupils in the UK." },
          ],
        },
        {
          title: "First step",
          items: [
            { label: "Academic assessment", href: P.en.assessment, description: "Where the child stands and which route is realistic." },
          ],
        },
      ],
    },
    {
      id: "universities",
      label: "Universities",
      href: P.en.universities,
      intro: "UCAS strategy, Oxbridge, master's and admissions tests — plus Europe, the USA and PhD.",
      groups: [
        {
          items: [
            { label: "Oxbridge", href: P.en.oxbridge, description: "College choice, admissions tests, interviews." },
            { label: "Master's degrees", href: P.en.masters, description: "Taught master's and research programmes." },
            { label: "Personal statement", href: P.en.statement, description: "The UCAS essay that carries your application." },
            { label: "Admissions tests", href: P.en.admissionsTests, description: "LNAT, TMUA, UCAT, MAT and more." },
          ],
        },
        {
          title: "Beyond the UK",
          items: [
            { label: "Europe", href: P.en.europe, description: "English-taught programmes across Europe." },
            { label: "USA", href: P.en.usa, description: "US colleges: lists, essays, deadlines." },
            { label: "PhD", href: P.en.phd, description: "Doctoral applications and supervision." },
            { label: "Career guidance", href: P.en.career, description: "Match interests to subjects before choosing." },
          ],
        },
      ],
    },
    {
      id: "tutors",
      label: "Tutors",
      href: P.en.tutors,
      intro: "Oxford tutors for GCSE, A-Level and IB — online and in person.",
      groups: [
        {
          items: [
            { label: "GCSE / IGCSE", href: P.en.gcse, description: "Core subjects with measurable progress." },
            { label: "A-Level", href: P.en.alevel, description: "Subject depth for strong grades." },
            { label: "IB", href: P.en.ib, description: "IB Diploma support across subjects." },
            { label: "Homeschooling", href: P.en.homeschooling, description: "A full programme with Oxford tutors." },
          ],
        },
        {
          title: "Intensive",
          items: [
            { label: "Revision courses", href: P.en.revision, description: "Short focused courses before exams." },
            { label: "Easter revision", href: P.en.easter, description: "The pre-exam sprint in Oxford." },
          ],
        },
      ],
    },
    {
      id: "adults",
      label: "For adults",
      href: P.en.exec,
      intro: "Executive education in Oxford: MBA, EMBA and management programmes.",
      groups: [
        {
          items: [
            { label: "MBA admissions", href: P.en.mba, description: "Strategy, essays and interviews for top schools." },
            { label: "Oxford Saïd MBA", href: P.en.said, description: "Requirements, essays and deadlines." },
            { label: "Oxford EMBA", href: P.en.emba, description: "The executive format at Saïd." },
            { label: "Management programmes", href: P.en.management, description: "Diplomas and executive courses." },
          ],
        },
      ],
    },
    {
      id: "summer",
      label: "Summer",
      href: P.en.summer,
      intro: "Summer schools in the UK and Oxford for children and teenagers.",
      groups: [
        {
          items: [
            { label: "Summer schools", href: P.en.summer, description: "Programmes across the UK by age and goal." },
            { label: "Oxford summer", href: P.en.summerOxford, description: "Summer programmes in Oxford colleges." },
            { label: "Language preparation", href: P.en.language, description: "Language schools in Oxford and London." },
          ],
        },
      ],
    },
    {
      id: "about",
      label: "About",
      href: P.en.about,
      intro: "An Oxford-based consultancy since 2010 — one team for the whole route.",
      groups: [
        {
          items: [
            { label: "Team", href: P.en.team, description: "Consultants, tutors and guardians." },
            { label: "Cases", href: P.en.cases, description: "Admission stories, anonymised." },
            { label: "Reviews", href: P.en.reviews, description: "From our public Google profile." },
            { label: "Guides", href: P.en.guides, description: "Free PDF guides for parents." },
            { label: "Events & open days", href: P.en.events, description: "Webinars and meetings in Oxford." },
            { label: "Prices", href: P.en.prices, description: "How our fees work." },
            { label: "Blog", href: P.en.blog, description: "Guides on schools, exams, admissions." },
            { label: "Contact", href: P.en.contact, description: "Office in Oxford, phone, messengers." },
          ],
        },
      ],
    },
  ],
  ru: [
    {
      id: "schools",
      label: "Школы",
      href: P.ru.schools,
      intro: "Частные школы Великобритании: пансионы и дневные, точки входа 7+/11+/13+/16+, опека.",
      groups: [
        {
          items: [
            { label: "Школы-пансионы", href: P.ru.boarding, description: "Подбор пансиона и поступление под ключ." },
            { label: "Дневные школы", href: P.ru.day, description: "Дневные школы Лондона и графств для переезда." },
            { label: "Экзамены 11+/13+/16+", href: P.ru.exams, description: "UKiset, ISEB, CAT4 и экзамены школ." },
            { label: "Опека", href: P.ru.guardianship, description: "Опекунство по стандарту AEGIS." },
          ],
        },
        {
          title: "Первый шаг",
          items: [
            { label: "Академическая оценка", href: P.ru.assessment, description: "Честная картина уровня и реальные варианты." },
          ],
        },
      ],
    },
    {
      id: "universities",
      label: "Университеты",
      href: P.ru.universities,
      intro: "Стратегия UCAS, Оксбридж, магистратура и тесты — плюс Европа, США и докторантура.",
      groups: [
        {
          items: [
            { label: "Оксбридж", href: P.ru.oxbridge, description: "Выбор колледжа, тесты, интервью." },
            { label: "Магистратура", href: P.ru.masters, description: "Программы master's и исследовательские." },
            { label: "Мотивационное письмо", href: P.ru.statement, description: "Personal statement, который работает." },
            { label: "Тесты вузов", href: P.ru.admissionsTests, description: "LNAT, TMUA, UCAT, MAT и другие." },
          ],
        },
        {
          title: "За пределами UK",
          items: [
            { label: "Европа", href: P.ru.europe, description: "Англоязычные программы в Европе." },
            { label: "США", href: P.ru.usa, description: "Колледжи США: список, эссе, дедлайны." },
            { label: "Докторантура", href: P.ru.phd, description: "PhD и научное руководство." },
            { label: "Карьерное ориентирование", href: P.ru.career, description: "Интересы и способности — до выбора предметов." },
          ],
        },
      ],
    },
    {
      id: "tutors",
      label: "Тьюторы",
      href: P.ru.tutors,
      intro: "Оксфордские тьюторы по GCSE, A-Level и IB — онлайн и очно.",
      groups: [
        {
          items: [
            { label: "GCSE / IGCSE", href: P.ru.gcse, description: "Основные предметы с измеримым прогрессом." },
            { label: "A-Level", href: P.ru.alevel, description: "Глубина по предметам для высоких баллов." },
            { label: "IB", href: P.ru.ib, description: "Поддержка IB Diploma по предметам." },
            { label: "Домашнее обучение", href: P.ru.homeschooling, description: "Полная программа с тьюторами Оксфорда." },
          ],
        },
        {
          title: "Интенсивы",
          items: [
            { label: "Курсы подготовки", href: P.ru.revision, description: "Короткие курсы перед экзаменами." },
            { label: "Пасхальный интенсив", href: P.ru.easter, description: "Финальный спринт в Оксфорде." },
          ],
        },
      ],
    },
    {
      id: "adults",
      label: "Взрослым",
      href: P.ru.exec,
      intro: "Образование для взрослых в Оксфорде: MBA, EMBA и управленческие программы.",
      groups: [
        {
          items: [
            { label: "Поступление на MBA", href: P.ru.mba, description: "Стратегия, эссе и интервью для топ-школ." },
            { label: "Oxford Saïd MBA", href: P.ru.said, description: "Требования, эссе и дедлайны." },
            { label: "Oxford EMBA", href: P.ru.emba, description: "Executive-формат Saïd." },
            { label: "Управленческие программы", href: P.ru.management, description: "Дипломы и executive-курсы." },
          ],
        },
      ],
    },
    {
      id: "summer",
      label: "Летние школы",
      href: P.ru.summer,
      intro: "Летние школы Великобритании и Оксфорда для детей и подростков.",
      groups: [
        {
          items: [
            { label: "Летние школы", href: P.ru.summer, description: "Программы по возрасту и целям." },
            { label: "Летний Оксфорд", href: P.ru.summerOxford, description: "Летние программы в колледжах Оксфорда." },
            { label: "Языковая подготовка", href: P.ru.language, description: "Языковые школы Оксфорда и Лондона." },
          ],
        },
      ],
    },
    {
      id: "about",
      label: "О компании",
      href: P.ru.about,
      intro: "Оксфордский консалтинг с 2010 года — одна команда на весь путь.",
      groups: [
        {
          items: [
            { label: "Команда", href: P.ru.team, description: "Консультанты, тьюторы и опекуны." },
            { label: "Кейсы", href: P.ru.cases, description: "Истории поступлений, обезличенные." },
            { label: "Отзывы", href: P.ru.reviews, description: "Из публичного профиля Google." },
            { label: "Гайды", href: P.ru.guides, description: "Бесплатные PDF для родителей." },
            { label: "События и open day", href: P.ru.events, description: "Вебинары и встречи в Оксфорде." },
            { label: "Цены", href: P.ru.prices, description: "Как устроена стоимость услуг." },
            { label: "Блог", href: P.ru.blog, description: "Гайды по школам, экзаменам, поступлению." },
            { label: "Контакты", href: P.ru.contact, description: "Офис в Оксфорде, телефон, мессенджеры." },
          ],
        },
      ],
    },
  ],
};

export const getNav = (lang: Locale): NavSection[] => NAV[lang];

/* ---------- route stages (homepage) ---------- */

export type StageId = "prep" | "school" | "exams" | "university" | "postgrad";

export interface Stage {
  id: StageId;
  numeral: string;
  title: string;
  short: string;
  text: string;
  links?: Array<{ href: string; label: string }>;
}

const STAGE_LINKS: Record<Locale, Record<StageId, { href: string; label: string }[]>> = {
  en: {
    prep: [{ href: P.en.assessment, label: "Academic assessment" }],
    school: [
      { href: P.en.boarding, label: "Boarding schools" },
      { href: P.en.day, label: "Day schools" },
    ],
    exams: [{ href: P.en.exams, label: "Entrance exams" }],
    university: [
      { href: P.en.universities, label: "University admissions" },
      { href: P.en.oxbridge, label: "Oxbridge" },
    ],
    postgrad: [
      { href: P.en.masters, label: "Master's degrees" },
      { href: P.en.mba, label: "MBA" },
    ],
  },
  ru: {
    prep: [{ href: P.ru.assessment, label: "Академическая оценка" }],
    school: [
      { href: P.ru.boarding, label: "Школы-пансионы" },
      { href: P.ru.day, label: "Дневные школы" },
    ],
    exams: [{ href: P.ru.exams, label: "Вступительные экзамены" }],
    university: [
      { href: P.ru.universities, label: "Поступление в вузы" },
      { href: P.ru.oxbridge, label: "Оксбридж" },
    ],
    postgrad: [
      { href: P.ru.masters, label: "Магистратура" },
      { href: P.ru.mba, label: "MBA" },
    ],
  },
};

export function stageLinks(lang: Locale, id: StageId) {
  return STAGE_LINKS[lang][id] ?? [];
}

export const getStages = (lang: Locale) => getDictionary(lang).site.stages;
export const getStageOptions = (lang: Locale) => getDictionary(lang).site.stageOptions;
export const getDestinationOptions = (lang: Locale) => getDictionary(lang).site.destinationOptions;
