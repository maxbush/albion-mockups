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
  google: "https://www.google.com/maps?cid=962086464612808454",
  trustpilot: "https://www.trustpilot.com/review/albion-consult.com",
} as const;

/* ---------- canonical URLs ---------- */

const P = {
  en: {
    home: "/",
    schools: "/private-schools/",
    boarding: "/private-schools/boarding/",
    day: "/private-schools/day-schools/",
    exams: "/private-schools/entrance-exams/",
    guardianship: "/private-schools/guardianship/",
    universities: "/university-admissions/",
    ucas: "/university-admissions/ucas/",
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
    apt: "/assessment/apt/",
    career: "/career-guidance/",
    language: "/language-preparation/",
    prices: "/prices/",
    apply: "/apply/",
    contact: "/contact/",
    about: "/about/",
    mission: "/about/mission/",
    team: "/team/",
    results: "/about/results/",
    cases: "/about/results/",
    reviews: "/reviews/",
      events: "/events/",
    openDay: "/events/open-day/",
    resources: "/resources/",
    guides: "/resources/",
    parentsGuide: "/resources/parents-guide/",
    testsGuide: "/resources/entrance-tests-guide/",
    interviewGuide: "/resources/interview-guide/",
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
    ucas: "/ru/postuplenie-v-universitety/ucas/",
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
    apt: "/ru/akademicheskaya-otsenka/apt/",
    career: "/ru/karernoe-orientirovanie/",
    language: "/ru/yazykovaya-podgotovka/",
    prices: "/ru/tseny/",
    apply: "/ru/anketa/",
    contact: "/ru/kontakty/",
    about: "/ru/o-kompanii/",
    mission: "/ru/o-kompanii/missiya/",
    team: "/ru/komanda/",
    results: "/ru/o-kompanii/rezultaty/",
    cases: "/ru/o-kompanii/rezultaty/",
    reviews: "/ru/otzyvy/",
      events: "/ru/sobytiya/",
    openDay: "/ru/sobytiya/den-otkrytyh-dverey/",
    resources: "/ru/resursy/",
    guides: "/ru/resursy/",
    parentsGuide: "/ru/resursy/gid-dlya-roditeley/",
    testsGuide: "/ru/resursy/gid-po-testam/",
    interviewGuide: "/ru/resursy/gid-po-intervyu/",
    blog: "/ru/blog/",
  },
} as const;

export type PathKey = keyof (typeof P)["en"];

export function path(lang: Locale, key: PathKey): string {
  return P[lang][key];
}

/* ---------- header nav (site structure v2: 8 sections) ---------- */

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
  /** shorter label for the header bar; `label` stays in the dropdown and footer */
  short?: string;
  intro: string;
  href: string;
  /** single link, no dropdown */
  direct?: boolean;
  groups: NavGroup[];
}

const NAV: Record<Locale, NavSection[]> = {
  en: [
    {
      id: "about",
      label: "About us",
      short: "About",
      href: P.en.about,
      intro: "An Oxford-based consultancy since 2010: one team for the whole route.",
      groups: [
        {
          items: [
            { label: "Mission", href: P.en.mission, description: "Why ALBION exists and how it works." },
            { label: "Team", href: P.en.team, description: "Consultants, tutors and guardians." },
            { label: "Results and figures", href: P.en.results, description: "What the numbers mean and where to read the stories." },
            { label: "Client reviews", href: P.en.reviews, description: "From our public Google profile." },
            { label: "Contact", href: P.en.contact, description: "Office in Oxford, phone, email." },
          ],
        },
      ],
    },
    {
      id: "consulting",
      label: "Educational consulting",
      short: "Consulting",
      href: P.en.schools,
      intro: "Admission to British schools and to universities worldwide: assessment, selection, applications, guardianship.",
      groups: [
        {
          title: "British schools",
          items: [
            { label: "Admission to British schools", href: P.en.schools, description: "The whole route, from assessment to guardianship." },
            { label: "Academic assessment", href: P.en.assessment, description: "Where the child stands and which route is realistic." },
            { label: "APT", href: P.en.apt, description: "Academic Profiling Test: a standardised age score." },
            { label: "Boarding schools", href: P.en.boarding, description: "Selection and admission, end to end." },
            { label: "Day schools", href: P.en.day, description: "For families living in or moving to the UK." },
            { label: "Guardianship", href: P.en.guardianship, description: "AEGIS-standard guardianship." },
            { label: "Career guidance", href: P.en.career, description: "Interests and subjects, before the choice." },
          ],
        },
        {
          title: "Universities worldwide",
          items: [
            { label: "Admission to world universities", href: P.en.universities, description: "UCAS, Oxbridge, Europe, the USA." },
            { label: "British universities", href: P.en.ucas, description: "UCAS: deadlines, reference, offers." },
            { label: "European universities", href: P.en.europe, description: "English-taught programmes in Europe." },
            { label: "American universities", href: P.en.usa, description: "US colleges: lists, essays, deadlines." },
            { label: "Oxbridge", href: P.en.oxbridge, description: "College choice, admissions tests, interviews." },
            { label: "Personal statement", href: P.en.statement, description: "The essay that carries the application." },
            { label: "Open Day", href: P.en.openDay, description: "Visiting Oxford colleges with a plan." },
          ],
        },
      ],
    },
    {
      id: "adults",
      label: "Education for adults",
      short: "Adults",
      href: P.en.exec,
      intro: "Master's, doctoral and executive programmes: for those who build a career.",
      groups: [
        {
          items: [
            { label: "Master's degrees", href: P.en.masters, description: "Taught master's and research programmes." },
            { label: "PhD", href: P.en.phd, description: "Doctoral applications and supervision." },
            { label: "Management programmes", href: P.en.management, description: "Diplomas and executive courses." },
          ],
        },
        {
          title: "MBA",
          items: [
            { label: "MBA admissions", href: P.en.mba, description: "Strategy, essays and interviews." },
            { label: "Oxford Said MBA", href: P.en.said, description: "How the application is read, the essays, the interview." },
            { label: "Oxford Executive MBA", href: P.en.emba, description: "The executive format at Said." },
          ],
        },
      ],
    },
    {
      id: "tuition",
      label: "Tuition",
      href: P.en.tutors,
      intro: "Subject tutors and test preparation, online and in person.",
      groups: [
        {
          title: "Test preparation",
          items: [
            { label: "Tests for schools", href: P.en.exams, description: "UKiset, ISEB, CAT4 and school papers." },
            { label: "Tests for universities", href: P.en.admissionsTests, description: "LNAT, TMUA, UCAT and more." },
          ],
        },
        {
          title: "Subjects",
          items: [
            { label: "GCSE and IGCSE", href: P.en.gcse, description: "Core subjects with measurable progress." },
            { label: "A-Level", href: P.en.alevel, description: "Subject depth for strong grades." },
            { label: "IB", href: P.en.ib, description: "IB Diploma support." },
            { label: "Homeschooling", href: P.en.homeschooling, description: "A full programme with specialist tutors." },
          ],
        },
        {
          title: "Courses and tutors",
          items: [
            { label: "Intensive courses", href: P.en.revision, description: "Short focused courses before exams." },
            { label: "Tutors", href: P.en.tutors, description: "Who teaches and how the level is chosen." },
          ],
        },
      ],
    },
    {
      id: "summer",
      label: "Summer camps and language programmes",
      short: "Summer",
      href: P.en.summer,
      intro: "Language preparation and summer programmes in the UK for children and teenagers.",
      groups: [
        {
          items: [
            { label: "Language preparation", href: P.en.language, description: "Exams and language schools." },
            { label: "Summer camps in the UK", href: P.en.summer, description: "Programmes across the UK by age and goal." },
            { label: "Summer in Oxford", href: P.en.summerOxford, description: "Summer programmes in Oxford." },
          ],
        },
      ],
    },
    { id: "blog", label: "Blog", href: P.en.blog, direct: true, intro: "", groups: [] },
    { id: "events", label: "Events", href: P.en.events, direct: true, intro: "", groups: [] },
    {
      id: "resources",
      label: "Resources",
      href: P.en.resources,
      intro: "Guides for parents and applicants: schools, tests, interviews.",
      groups: [
        {
          items: [
            { label: "Parents' guide", href: P.en.parentsGuide, description: "How the British school system works." },
            { label: "Entrance tests guide", href: P.en.testsGuide, description: "What each test measures and who takes it." },
            { label: "Interview guide", href: P.en.interviewGuide, description: "School and Oxbridge interviews." },
          ],
        },
      ],
    },
  ],
  ru: [
    {
      id: "about",
      label: "О нас",
      href: P.ru.about,
      intro: "Консалтинговая компания из Оксфорда с 2010 года: одна команда на весь путь.",
      groups: [
        {
          items: [
            { label: "Миссия", href: P.ru.mission, description: "Зачем существует ALBION и как работает." },
            { label: "Команда", href: P.ru.team, description: "Консультанты, тьюторы и опекуны." },
            { label: "Цифры и результаты", href: P.ru.results, description: "Что значат цифры и где читать истории." },
            { label: "Отзывы клиентов", href: P.ru.reviews, description: "С публичного профиля Google." },
            { label: "Контакт", href: P.ru.contact, description: "Офис в Оксфорде, телефон, почта." },
          ],
        },
      ],
    },
    {
      id: "consulting",
      label: "Образовательный консалтинг",
      short: "Консалтинг",
      href: P.ru.schools,
      intro: "Поступление в британские школы и в университеты мира: оценка, подбор, заявки, опека.",
      groups: [
        {
          title: "Британские школы",
          items: [
            { label: "Поступление в британские школы", href: P.ru.schools, description: "Весь путь: от оценки до опеки." },
            { label: "Академическая оценка", href: P.ru.assessment, description: "Где ребёнок сейчас и какой путь реалистичен." },
            { label: "APT", href: P.ru.apt, description: "Academic Profiling Test: стандартный возрастной балл." },
            { label: "Школы-пансионы", href: P.ru.boarding, description: "Подбор и поступление под ключ." },
            { label: "Дневные школы", href: P.ru.day, description: "Для семей, которые живут в UK или переезжают." },
            { label: "Опекунство", href: P.ru.guardianship, description: "Опека по стандарту AEGIS." },
            { label: "Карьерное ориентирование", href: P.ru.career, description: "Интересы и предметы до выбора." },
          ],
        },
        {
          title: "Университеты мира",
          items: [
            { label: "Поступление в мировые университеты", href: P.ru.universities, description: "UCAS, Оксбридж, Европа, США." },
            { label: "Британские университеты", href: P.ru.ucas, description: "UCAS: дедлайны, рекомендация, офферы." },
            { label: "Европейские университеты", href: P.ru.europe, description: "Программы на английском в Европе." },
            { label: "Американские университеты", href: P.ru.usa, description: "Колледжи США: список, эссе, дедлайны." },
            { label: "Оксбридж", href: P.ru.oxbridge, description: "Выбор колледжа, тесты, интервью." },
            { label: "Personal Statement", href: P.ru.statement, description: "Эссе, на котором держится заявка." },
            { label: "День открытых дверей", href: P.ru.openDay, description: "Визит в колледжи Оксфорда по плану." },
          ],
        },
      ],
    },
    {
      id: "adults",
      label: "Образование для взрослых",
      short: "Взрослым",
      href: P.ru.exec,
      intro: "Магистратура, докторантура и executive-программы: для тех, кто строит карьеру.",
      groups: [
        {
          items: [
            { label: "Магистратура", href: P.ru.masters, description: "Taught и research-программы." },
            { label: "Докторантура", href: P.ru.phd, description: "PhD и научное руководство." },
            { label: "Управленческие программы", href: P.ru.management, description: "Дипломы и executive-курсы." },
          ],
        },
        {
          title: "MBA",
          items: [
            { label: "Поступление на MBA", href: P.ru.mba, description: "Стратегия, эссе и интервью." },
            { label: "Oxford Saïd MBA", href: P.ru.said, description: "Как читают заявку, эссе, интервью." },
            { label: "Oxford Executive MBA", href: P.ru.emba, description: "Executive-формат Saïd." },
          ],
        },
      ],
    },
    {
      id: "tuition",
      label: "Обучение",
      href: P.ru.tutors,
      intro: "Предметные тьюторы и подготовка к тестам: онлайн и очно.",
      groups: [
        {
          title: "Подготовка к тестам",
          items: [
            { label: "Тесты в школы", href: P.ru.exams, description: "UKiset, ISEB, CAT4 и экзамены школ." },
            { label: "Тесты в университеты", href: P.ru.admissionsTests, description: "LNAT, TMUA, UCAT и другие." },
          ],
        },
        {
          title: "Предметы",
          items: [
            { label: "GCSE и IGCSE", href: P.ru.gcse, description: "Основные предметы с измеримым прогрессом." },
            { label: "A-Level", href: P.ru.alevel, description: "Глубина по предметам для высоких оценок." },
            { label: "IB", href: P.ru.ib, description: "Поддержка IB Diploma." },
            { label: "Домашнее обучение", href: P.ru.homeschooling, description: "Полная программа с тьюторами." },
          ],
        },
        {
          title: "Курсы и тьюторы",
          items: [
            { label: "Интенсивные курсы", href: P.ru.revision, description: "Короткие курсы перед экзаменами." },
            { label: "Тьюторы", href: P.ru.tutors, description: "Кто преподаёт и как выбирают уровень." },
          ],
        },
      ],
    },
    {
      id: "summer",
      label: "Летние лагеря и языковые программы",
      short: "Лагеря и язык",
      href: P.ru.summer,
      intro: "Языковая подготовка и летние программы Великобритании для детей и подростков.",
      groups: [
        {
          items: [
            { label: "Языковая подготовка", href: P.ru.language, description: "Экзамены и языковые школы." },
            { label: "Летние лагеря Великобритании", href: P.ru.summer, description: "Программы по возрасту и цели." },
            { label: "Лето в Оксфорде", href: P.ru.summerOxford, description: "Летние программы в Оксфорде." },
          ],
        },
      ],
    },
    { id: "blog", label: "Блог", href: P.ru.blog, direct: true, intro: "", groups: [] },
    { id: "events", label: "Мероприятия", href: P.ru.events, direct: true, intro: "", groups: [] },
    {
      id: "resources",
      label: "Ресурсы",
      href: P.ru.resources,
      intro: "Гиды для родителей и абитуриентов: школы, тесты, интервью.",
      groups: [
        {
          items: [
            { label: "Гид для родителей", href: P.ru.parentsGuide, description: "Как устроена британская школьная система." },
            { label: "Гид по вступительным тестам", href: P.ru.testsGuide, description: "Что проверяет каждый тест и кто его сдаёт." },
            { label: "Гид по вступительному интервью", href: P.ru.interviewGuide, description: "Интервью в школу и в Оксбридж." },
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
    prep: [
      { href: P.en.assessment, label: "Academic assessment" },
      { href: P.en.apt, label: "APT" },
    ],
    school: [
      { href: P.en.boarding, label: "Boarding schools" },
      { href: P.en.day, label: "Day schools" },
      { href: P.en.exams, label: "Tests for schools" },
    ],
    exams: [
      { href: P.en.tutors, label: "Tutors: GCSE, A-Level, IB" },
      { href: P.en.guardianship, label: "Guardianship" },
    ],
    university: [
      { href: P.en.universities, label: "University admissions" },
      { href: P.en.ucas, label: "UCAS" },
      { href: P.en.oxbridge, label: "Oxbridge" },
      { href: P.en.admissionsTests, label: "Tests for universities" },
    ],
    postgrad: [
      { href: P.en.masters, label: "Master's degrees" },
      { href: P.en.mba, label: "MBA" },
      { href: P.en.management, label: "Management programmes" },
    ],
  },
  ru: {
    prep: [
      { href: P.ru.assessment, label: "Академическая оценка" },
      { href: P.ru.apt, label: "APT" },
    ],
    school: [
      { href: P.ru.boarding, label: "Школы-пансионы" },
      { href: P.ru.day, label: "Дневные школы" },
      { href: P.ru.exams, label: "Тесты в школы" },
    ],
    exams: [
      { href: P.ru.tutors, label: "Тьюторы: GCSE, A-Level, IB" },
      { href: P.ru.guardianship, label: "Опекунство" },
    ],
    university: [
      { href: P.ru.universities, label: "Поступление в вузы" },
      { href: P.ru.ucas, label: "UCAS" },
      { href: P.ru.oxbridge, label: "Оксбридж" },
      { href: P.ru.admissionsTests, label: "Тесты в университеты" },
    ],
    postgrad: [
      { href: P.ru.masters, label: "Магистратура" },
      { href: P.ru.mba, label: "MBA" },
      { href: P.ru.management, label: "Управленческие программы" },
    ],
  },
};

export function stageLinks(lang: Locale, id: StageId) {
  return STAGE_LINKS[lang][id] ?? [];
}

export const getStages = (lang: Locale) => getDictionary(lang).site.stages;
export const getStageOptions = (lang: Locale) => getDictionary(lang).site.stageOptions;
export const getDestinationOptions = (lang: Locale) => getDictionary(lang).site.destinationOptions;
