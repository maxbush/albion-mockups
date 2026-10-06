import type { Dictionary } from "./types";

export const en: Dictionary = {
  meta: {
    title: "ALBION — independent education consultancy in Oxford",
    description:
      "ALBION walks international families along the whole British route: school preparation, the British school, GCSE, A-Level or IB, university, master's and MBA.",
  },

  site: {
    nav: [
      {
        id: "about",
        label: "About",
        intro:
          "Who we are, how we work, and why we walk the whole route with a family rather than single applications.",
        groups: [
          {
            items: [
              {
                slug: "mission",
                label: "Mission",
                description:
                  "Why ALBION exists and what we count as good education: not a race up the rankings, but a route that fits one particular child.",
              },
              {
                slug: "team",
                label: "Team",
                description:
                  "The consultants, tutors and guardians who walk families along the route. Combined team experience — 20+ years.",
              },
              {
                slug: "results",
                label: "Results & figures",
                description: "Route and admissions outcomes. This section is filled only with verified data.",
              },
              {
                slug: "testimonials",
                label: "Testimonials",
                description: "Stories from families who walked part of the route — or all of it — with us.",
              },
              {
                slug: "media",
                label: "Media",
                description: "Publications, interviews and talks by the team.",
              },
              {
                slug: "contact",
                label: "Contact",
                description: "How to reach us and where to find us in Oxford.",
              },
            ],
          },
        ],
      },
      {
        id: "admissions",
        label: "Admissions",
        intro:
          "British schools, universities in the UK, Europe and the USA — and onward: master's, MBA under executive education, and doctoral routes.",
        groups: [
          {
            items: [
              {
                slug: "day-schools",
                label: "Day schools",
                stage: "school",
                description:
                  "Choosing a British day school for the child's academic profile and temperament; paperwork and interview preparation.",
              },
              {
                slug: "boarding-schools",
                label: "Boarding schools",
                stage: "school",
                description:
                  "Choosing the boarding school, preparing for entry, settling in, and staying in touch with the school throughout.",
              },
              {
                slug: "uk-universities",
                label: "Universities UK",
                stage: "university",
                description:
                  "UK admissions strategy: choosing the course and the list, applying through UCAS, Personal Statement, interviews.",
              },
              {
                slug: "european-universities",
                label: "Universities Europe",
                stage: "university",
                description:
                  "English-taught programmes at European universities: comparing systems, requirements and deadlines.",
              },
              {
                slug: "us-universities",
                label: "Universities USA",
                stage: "university",
                description:
                  "Applying to American colleges and universities: the list, the essays, the tests, the timelines.",
              },
              {
                slug: "oxbridge",
                label: "Oxbridge",
                stage: "university",
                description:
                  "A dedicated preparation route for Oxford and Cambridge: course and college choice, admissions tests, interviews.",
              },
              {
                slug: "masters",
                label: "Master's",
                stage: "postgrad",
                description: "Choosing a programme and a country, preparing the application, essays and interviews.",
              },
              {
                slug: "doctorate",
                label: "Doctoral studies",
                stage: "postgrad",
                description:
                  "Finding the programme and the supervisor, the research proposal, applying for PhD and DPhil.",
              },
            ],
          },
        ],
      },
      {
        id: "learning",
        label: "Tuition",
        intro:
          "Preparation for entrance exams and admissions tests, academic support at GCSE, A-Level and IB, tutors, intensives and home education.",
        groups: [
          {
            items: [
              {
                slug: "entrance-exams",
                label: "Entrance exams — 11+ / 13+ / 16+",
                stage: "prep",
                description:
                  "Preparation for British school entry points: UKiset, ISEB, CAT4 and school papers — diagnosis, a study plan, exam-format practice.",
              },
              {
                slug: "university-tests",
                label: "University tests — LNAT / TMUA / UCAT / IELTS",
                stage: "university",
                description: "Preparation for admissions and language tests, matched to the chosen course.",
              },
              {
                slug: "gcse",
                label: "GCSE",
                stage: "exams",
                description: "Subject choice and academic support through GCSE — aimed at the right A-Level or IB path.",
              },
              {
                slug: "a-level",
                label: "A-Level",
                stage: "exams",
                description: "Subjects chosen for the future specialisation, tutor support and exam preparation.",
              },
              {
                slug: "ib",
                label: "IB",
                stage: "exams",
                description:
                  "Support across the International Baccalaureate: subject choice, Extended Essay, exam preparation.",
              },
              {
                slug: "home-education",
                label: "Home education",
                stage: "exams",
                description:
                  "An individual programme for children school does not currently suit — leading to British qualifications.",
              },
              {
                slug: "intensive-courses",
                label: "Intensive courses",
                stage: "exams",
                description: "Short, focused courses ahead of exams and entrance assessments.",
              },
              {
                slug: "tutors",
                label: "Tutors",
                stage: "prep",
                description:
                  "Tutors matched by subject and test. Lessons sit inside the shared route rather than alongside it.",
              },
            ],
          },
        ],
      },
      {
        id: "services",
        label: "Services",
        intro:
          "Everything around the studying: guardianship, academic assessment, career guidance, the Personal Statement, summer schools.",
        groups: [
          {
            items: [
              {
                slug: "guardianship",
                label: "Guardianship",
                stage: "school",
                description:
                  "A UK guardian for school and boarding pupils: liaison with the school, exeat weekends and holidays, support for the family at a distance.",
              },
              {
                slug: "academic-assessment",
                label: "Academic assessment",
                stage: "prep",
                description:
                  "The starting point of any route: the child's level, strengths and gaps, and a recommendation for the next step.",
              },
              {
                slug: "career-guidance",
                label: "Career guidance",
                stage: "university",
                description:
                  "Matching interests and abilities to future specialisations — before subjects and universities are chosen.",
              },
              {
                slug: "personal-statement",
                label: "Personal Statement",
                stage: "university",
                description:
                  "Work on the personal statement: from finding the student's own story to the final edit — in the student's own voice.",
              },
              {
                slug: "summer-schools",
                label: "Summer schools",
                stage: "prep",
                description:
                  "Academic and language summer programmes in Britain — a first, gentle acquaintance with British education.",
              },
              {
                slug: "executive-education",
                label: "Executive education — MBA & EMBA",
                stage: "postgrad",
                description: "MBA, EMBA and leadership programmes for people returning to study after a career.",
              },
            ],
          },
        ],
      },
      {
        id: "blog",
        label: "Journal",
        intro: "Events and resources for parents: webinars and meetings, the open day, guides and pricing.",
        groups: [
          {
            title: "Events",
            items: [
              {
                slug: "webinars",
                label: "Webinars & meetings",
                description: "Online webinars and in-person meetings for parents on every stage of the route.",
              },
              {
                slug: "open-day",
                label: "Open day",
                note: "Standing event",
                description:
                  "A standing event: meetings where we show the route from the inside and answer questions in person.",
              },
            ],
          },
          {
            title: "Resources",
            items: [
              {
                slug: "guides",
                label: "Guides",
                description: "Parent guides to the stages of British education.",
              },
              {
                slug: "pricing",
                label: "Pricing",
                description: "The cost of our services and formats of support.",
              },
            ],
          },
        ],
      },
    ],
    stages: [
      {
        id: "prep",
        numeral: "I",
        title: "Preparing for school",
        short: "The first step into British education.",
        text: "An academic assessment, preparation for entrance exams and interviews. We shortlist the schools that suit this particular child — not only the famous ones.",
        links: [
          { section: "services", slug: "academic-assessment" },
          { section: "learning", slug: "entrance-exams" },
          { section: "learning", slug: "tutors" },
          { section: "services", slug: "summer-schools" },
        ],
      },
      {
        id: "school",
        numeral: "II",
        title: "The British school",
        short: "Day school or boarding — and life inside it.",
        text: "Choosing between day and boarding, submitting applications, settling through the first terms. For families abroad — guardianship and a constant line to the school.",
        links: [
          { section: "admissions", slug: "day-schools" },
          { section: "admissions", slug: "boarding-schools" },
          { section: "services", slug: "guardianship" },
        ],
      },
      {
        id: "exams",
        numeral: "III",
        title: "GCSE, A-Level or IB",
        short: "The subjects that open the right doors.",
        text: "Subject choices aimed at the future specialisation, tutor support and intensives before exams. When school is not working — home education leading to British qualifications.",
        links: [
          { section: "learning", slug: "gcse" },
          { section: "learning", slug: "a-level" },
          { section: "learning", slug: "ib" },
          { section: "learning", slug: "intensive-courses" },
          { section: "learning", slug: "home-education" },
        ],
      },
      {
        id: "university",
        numeral: "IV",
        title: "University",
        short: "The UK, Europe, the USA — and Oxbridge.",
        text: "An admissions strategy: the country, the course, the list, the entrance tests, the Personal Statement and the interviews. Career thinking comes before the choice, not after it.",
        links: [
          { section: "admissions", slug: "uk-universities" },
          { section: "admissions", slug: "oxbridge" },
          { section: "admissions", slug: "european-universities" },
          { section: "admissions", slug: "us-universities" },
          { section: "learning", slug: "university-tests" },
          { section: "services", slug: "personal-statement" },
          { section: "services", slug: "career-guidance" },
        ],
      },
      {
        id: "postgrad",
        numeral: "V",
        title: "Master's, MBA and beyond",
        short: "When the first degree is not the finish.",
        text: "Master's programmes, MBA under executive education, and doctoral routes — for those returning to study after a career.",
        links: [
          { section: "admissions", slug: "masters" },
          { section: "admissions", slug: "doctorate" },
          { section: "services", slug: "executive-education" },
        ],
      },
    ],
    stageOptions: [
      { value: "prep", label: "Preparing for school" },
      { value: "school", label: "The British school" },
      { value: "exams", label: "GCSE, A-Level or IB" },
      { value: "university", label: "University" },
      { value: "postgrad", label: "Master's, MBA, doctorate" },
      { value: "unsure", label: "Not sure yet" },
    ],
    destinationOptions: [
      { value: "uk", label: "United Kingdom" },
      { value: "oxbridge", label: "Oxbridge" },
      { value: "europe", label: "Europe" },
      { value: "usa", label: "USA" },
      { value: "undecided", label: "Undecided" },
    ],
  },

  header: {
    navAria: "Main menu",
    mobileNavAria: "Menu",
    cta: "Book a consultation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    openSection: "Open",
    langSwitch: "Language",
    brandAria: "ALBION — home",
    skip: "Skip to content",
  },

  hero: {
    eyebrow: "Oxford · independent education consultancy",
    title1: "The way to university",
    title2: "begins",
    title3: "long before it",
    lead: "We walk international families along the whole British route: school preparation, the British school, GCSE, A-Level or IB, university, master's and MBA.",
    leadMore: "One route and one team — instead of scattered applications.",
    cta1: "Book a consultation",
    cta2: "See the route",
    proofNum: "20+",
    proofText: "years of combined team experience",
    scroll: "Scroll",
    arrival: "Step inside — the route begins here.",
    arrivalSub: "Step inside — the route begins here",
  },

  trust: {
    aria: "Trust and results",
    onGoogle: "on Google",
    stats: [
      { n: "20+", cap: "years of combined team experience" },
      { n: "240+", cap: "offers received" },
      { n: "180+", cap: "families guided" },
    ],
    note: "figures in preparation",
  },

  manifesto: {
    label: "Principle",
    title: "We do not file applications one by one. We hold the whole road in mind —",
    titleEm: "from the first test to the graduation gown.",
    p1: "In British education every decision opens or closes the next. The school decides which subjects are available at GCSE. The A-Level or IB subjects decide which university programmes become real. The university decides which master's or MBA stays within reach.",
    p2: "So we plan the route as a whole and revise it at every stage — together with the family and the child.",
    p3: "You can join at any stage: we start with an academic assessment and with wherever your family stands today.",
  },

  route: {
    label: "The route",
    title: "One trajectory —",
    titleEm: "from the first school to the MBA",
    intro:
      "Each stop is not a separate project but a continuation of the last. We carry forward everything we learn about the child: strengths, pace, interests, results.",
    stagePrefix: "Stage",
    linksAria: "Sections of the {title} stage",
    coda: "You can join at any stage.",
    codaCta: "Discuss your stage",
  },

  method: {
    label: "How we work",
    title: "Calmly, in order,",
    titleEm: "for years ahead",
    lead: "A decision about British education is taken for years ahead — and the cost of a wrong step is high. So there is no haste and no off-the-shelf \"packages\": there is a sequence of steps the family understands at every stage.",
    steps: [
      {
        n: "I",
        title: "Meeting & academic assessment",
        text: "A conversation with the family and an assessment of the child's current level: where they are, what comes easily, where they are drawn.",
      },
      {
        n: "II",
        title: "The route map",
        text: "A written plan years ahead: the stages, the forks, the key exams and the fallback options. The map belongs to the family and is revised as the child grows.",
      },
      {
        n: "III",
        title: "Walking it together",
        text: "Test preparation, tutors, documents, the Personal Statement, interviews — in one pair of hands and at one pace, with no handovers between contractors.",
      },
      {
        n: "IV",
        title: "Admission — and after",
        text: "We stay close after enrolment: settling in, guardianship, revising the route ahead of the next stage.",
      },
    ],
    cta1: "Book a consultation",
    cta2: "Open Academic assessment",
    imgAlt: "Watercolour: a writing desk by a tall college window — an open notebook, a fountain pen, a lamp",
    annot: "weeks 1–4",
  },

  difference: {
    label: "The Albion difference",
    title: "Four commitments",
    titleEm: "we do not bend",
    lead: "An English-speaking team inside the system — not an agency selling it from the outside. These are the things a large consultancy cannot copy.",
    items: [
      {
        n: "I",
        word: "Oxford-based",
        text: "We live and work in Oxford, street by street, registrar by registrar. When a school needs seeing today — or a child needs someone nearby — it happens today.",
      },
      {
        n: "II",
        word: "Independent",
        text: "No commissions from schools and no network quotas: when we say a school fits, it is our opinion — not a placement.",
      },
      {
        n: "III",
        word: "Direct",
        text: "You speak with the people who do the work — no sales desk, no consultant swap after signing. Questions travel without intermediaries.",
      },
      {
        n: "IV",
        word: "Confidential",
        text: "Family matters stay inside the room. Nothing about a child appears in our materials, our talks or our statistics without permission.",
      },
    ],
  },

  directory: {
    label: "Directory",
    title: "If you already know",
    titleEm: "what you're looking for",
    lead: "Every ALBION discipline — from entrance exams to executive education. Each one is part of the same route.",
  },

  offers: {
    label: "Albion · Offers",
    title: "From Oxford",
    titleEm: "to the world",
    lead: "The universities and schools where Albion families study today. The list is in preparation",
    universities: "Universities",
    schools: "Schools",
    world: {
      tags: ["UK", "Europe", "USA", "World"],
      stages: [
        {
          label: "OXFORD",
          sub: "One office, one city — known street by street, register by register.",
        },
        {
          label: "BRITAIN & BEYOND",
          sub: "The system we work from the inside — schools, exam boards, deadlines — and the routes that continue across borders.",
        },
        {
          label: "THE WORLD",
          sub: "Wherever school happens next, the route is already drawn.",
        },
      ],
    },
  },

  team: {
    label: "The team",
    cap: "years of combined experience across the team",
    title: "The people who",
    titleEm: "walk the route",
    lead: "School and university consultants, tutors and guardians work as one team: each knows what came before their stage and what comes after it.",
    leadershipAria: "Leadership team",
    tutorsLabel: "Tutors",
    tutorsAria: "Tutors",
    nameLabel: "Name",
    roleLabel: "Role",
    roles: [
      "Founder · Admissions & Tuition",
      "Co-founder · Head of Guardianship",
      "Academic Director · University Admissions",
      "Head of Business Development",
      "Tutor Recruitment Specialist",
    ],
    tutorRole: "Tutor",
    resultsLabel: "Results & figures",
    admissionsRow: "Admissions across the route's stages",
    familiesRow: "Families we walk with",
    quote: "Words from a family who walked the route with us",
    quoteBy: "Testimonial text and the family's name",
    linkTeam: "Meet the team",
    linkResults: "See results & figures",
    linkTestimonials: "Read testimonials",
  },

  schoolsStrip: {
    aria: "Schools and universities where Albion families study",
  },

  testimonials: {
    label: "Proof",
    num: "20+",
    title: "years of combined experience across British and international education —",
    titleEm: "the only number we publish today.",
    quotes: [
      { text: "Family testimonial — in preparation.", by: "Family, TBC" },
      { text: "School reference — in preparation.", by: "School, TBC" },
    ],
    note: "ALBION publishes figures only when they can be verified in full. Placeholder entries resolve as the practice grows; until then, references are offered in conversation rather than on a page.",
  },

  openDay: {
    label: "Open day",
    badge: "Standing event",
    title: "Step into the quad —",
    titleEm: "see the route from the inside",
    lead: "A meeting for parents: how British education works, how we build a route, and where your family should begin. Questions answered by the consultants in person.",
    details: ["Next date", "Format & venue", "Duration", "Attendance fee"],
    cta: "Register for the open day",
    webinars: "See webinars & meetings",
    resources: "Resources for parents:",
    guides: "Guides",
    pricing: "Pricing",
    imgAlt: "Watercolour: an ajar oak door in a stone arch, a sunlit college quad beyond",
    annot: "open, come in",
  },

  leadMagnet: {
    label: "Guides · free PDF",
    title: "Start with the",
    titleEm: "parent's guide",
    lead: "A calm, honest walk through the British system — schools, exams, timelines — written by the consultants who do the work. No jargon, no sales funnel inside.",
    cover: { series: "Albion · Guides · Vol. I", title1: "A parent's guide to", titleEm: "British schools", pdf: "PDF · free" },
    guides: [
      { n: "01", title: "A parent's guide to British schools", note: "this one" },
      { n: "02", title: "Entrance exams 11+/13+/16+ in 90 days", note: "" },
      { n: "03", title: "The admissions interview, decoded", note: "" },
    ],
    listAria: "Available guides",
    formAria: "Get the guide by email",
    emailLabel: "Email address",
    placeholder: "Your email",
    submit: "Send me the guide",
    fine: "One email with the PDF. No sequence, no pressure.",
  },

  nextStep: {
    label: "What comes next",
    title: "Preparing for",
    titleEm: "the next step.",
    lead: "Personal statements, LNAT, TMUA, UCAT, guardianship, career direction — and after that, master's, MBA under executive education, or doctoral routes. The conversation does not end at the offer.",
    cta: "Discuss the next step",
    caption: "There is no single destination",
  },

  consultation: {
    label: "Consultation",
    title: "Let's begin",
    titleEm: "with a conversation",
    lead: "Tell us where your child is now and where you are looking. We will reply and suggest a time for a first consultation.",
    submit: "Book a consultation",
  },

  contact: {
    rows: [
      { term: "Email" },
      { term: "Telephone" },
      { term: "Office", value: "Oxford, United Kingdom" },
      { term: "Consultation format & fee" },
    ],
  },

  form: {
    name: "Your name",
    email: "Email",
    phone: "Phone or messenger — optional",
    stage: "Route stage — optional",
    chooseStage: "Choose a stage",
    destination: "Destination — optional",
    chooseDestination: "Choose a destination",
    messageConsultation: "A few words about your situation — optional",
    messageOpenDay: "Questions for the meeting — optional",
    company: "Company",
    consentPre: "I agree that ALBION may contact me about this enquiry and process the details provided. Privacy policy",
    sending: "Sending…",
    sendingNote: "Sending your enquiry…",
    requiredNote: "Fields not marked optional are required.",
    successTitle: "Thank you — your enquiry has been received.",
    successBody: "We will be in touch at the contacts you left to arrange a consultation time.",
    successTitleOpenDay: "You are on the guest list.",
    successBodyOpenDay: "We will send an invitation as soon as the date and format are announced.",
    another: "Send another enquiry",
    errors: {
      form: "Unknown enquiry type.",
      parentName: "Please tell us your name.",
      email: "Please check the email address.",
      phone: "Please check the phone or messenger handle.",
      stage: "Please choose a stage from the list.",
      destination: "Please choose a destination from the list.",
      consent: "We need your consent to reply.",
    },
  },

  consultPage: {
    metaTitle: "Consultation",
    metaDescription:
      "Book a consultation with ALBION: tell us where your child is now, and we will suggest a time to talk.",
    crumb: "Consultation",
    eyebrow: "Consultation",
    howLabel: "How it works",
    steps: [
      { n: "I", title: "The enquiry", text: "You briefly tell us where the child is now and what worries you." },
      { n: "II", title: "Getting in touch", text: "We contact you at the details you left and agree a time." },
      {
        n: "III",
        title: "The first consultation",
        text: "We work out where the child stands and which next step of the route is the right one.",
      },
    ],
  },

  sectionPage: {
    homeCrumb: "Home",
    eyebrow: "Section",
    journalNote: "Journal articles",
    journalHint: "in preparation",
  },

  slugPage: {
    homeCrumb: "Home",
    details: {
      contact: ["Email", "Telephone", "Oxford office", "Working hours"],
      pricing: ["First consultation", "Stage-by-stage support", "Formats & packages"],
      team: ["Consultant profiles", "Tutors", "Guardians"],
      results: ["Admissions across the route", "Route outcomes"],
      testimonials: ["Family testimonials"],
      media: ["Publications", "Interviews & talks"],
      webinars: ["Schedule", "Recordings of past meetings"],
      guides: ["Guide list", "How to receive"],
    } as Record<string, string[]>,
    defaultDetails: ["What the support covers", "Formats & timelines", "Fees"],
    stageLabel: "Part of the stage",
    stageKicker: "Place on the route",
    seeRoute: "See the whole route",
    sectionDetails: "Section details",
    sectionHint: "section content in preparation",
    discuss: "We can discuss {item} in the context of your family",
    moreIn: "More in {section}",
    readMore: "In this section",
    openDay: {
      eyebrow: "Events · standing event",
      title1: "Open",
      titleEm: "day",
      coversLabel: "What the meeting covers",
      covers: [
        "How the British system works — from school preparation to the MBA.",
        "How we build the route and where its forks sit.",
        "Consultants' answers to your family's questions.",
      ],
      regLabel: "Registration",
      regTitle: "Register for the next meeting",
      regLead: "Leave your contacts — we will send an invitation once the date is announced. Next date",
      submit: "Register for the open day",
    },
  },

  consultCta: {
    label: "Consultation",
    title: "Let's discuss your family's route",
    lead: "A first consultation to see where the child is now and which next step is the right one. Format & fee",
    cta: "Book a consultation",
  },

  footer: {
    tag: "Independent education consultancy in Oxford for international families: one route from school preparation to the MBA.",
    cta: "Book a consultation",
    email: "Email",
    tel: "Telephone",
    office: "Office",
    officeValue: "Oxford, United Kingdom",
    navAria: "Site sections",
    openDay: "Open day",
    contact: "Contact",
    rights: "© ALBION",
    privacy: "Privacy policy",
    company: "Company details",
  },

  whatsapp: { aria: "Write to ALBION on WhatsApp" },

  tbc: { hint: "details to be confirmed" },

  notFound: {
    label: "Page not found",
    title: "This footpath",
    titleEm: "does not lead to the quad",
    lead: "The page may have moved. Head back to the homepage — the route begins there.",
    cta1: "Back to the homepage",
    cta2: "Book a consultation",
  },
};
