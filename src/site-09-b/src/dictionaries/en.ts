import type { Dictionary } from "./types";

export const en: Dictionary = {
  meta: {
    title: "ALBION — independent education consultancy in Oxford",
    description:
      "ALBION walks international families along the whole British route: school preparation, the British school, GCSE, A-Level or IB, university and master's. Separately — education for adults: MBA and management programmes.",
  },

  site: {
    nav: [
      {
        id: "about",
        label: "About",
        intro: "Who we are, how we work, and why we walk the whole route with a family rather than single applications.",
        groups: [
          {
            items: [
              {
                slug: "mission",
                label: "Mission",
                description: "Why ALBION exists and what we count as good education: not a race up the rankings, but a route that fits one particular child.",
              },
              {
                slug: "team",
                label: "Team",
                description: "The consultants, tutors and guardians who walk families along the route. Combined team experience — 20+ years.",
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
        id: "consulting",
        label: "Consulting",
        intro: "Educational consulting: admissions to British schools and to universities worldwide — from the academic assessment to the application, the interview and life on the ground.",
        groups: [
          {
            title: "British schools",
            items: [
              {
                slug: "academic-assessment",
                label: "Academic assessment & APT",
                description: "The starting point of any route: the child's level, strengths and gaps, and a recommendation for the next step.",
                stage: "prep",
              },
              {
                slug: "boarding-schools",
                label: "Boarding schools",
                description: "Choosing the boarding school, preparing for entry, settling in, and staying in touch with the school throughout.",
                stage: "school",
              },
              {
                slug: "day-schools",
                label: "Day schools",
                description: "Choosing a British day school for the child's academic profile and temperament; paperwork and interview preparation.",
                stage: "school",
              },
              {
                slug: "guardianship",
                label: "Guardianship",
                description: "A UK guardian for school and boarding pupils: liaison with the school, exeat weekends and holidays, support for the family at a distance.",
                stage: "school",
              },
              {
                slug: "career-guidance",
                label: "Career guidance",
                description: "Matching interests and abilities to future specialisations — before subjects and universities are chosen.",
                stage: "university",
              },
            ],
          },
          {
            title: "Universities worldwide",
            items: [
              {
                slug: "uk-universities",
                label: "Universities UK",
                description: "UK admissions strategy: choosing the course and the list, applying through UCAS, Personal Statement, interviews.",
                stage: "university",
              },
              {
                slug: "european-universities",
                label: "Universities Europe",
                description: "English-taught programmes at European universities: comparing systems, requirements and deadlines.",
                stage: "university",
              },
              {
                slug: "us-universities",
                label: "Universities USA",
                description: "Applying to American colleges and universities: the list, the essays, the tests, the timelines.",
                stage: "university",
              },
              {
                slug: "oxbridge",
                label: "Oxbridge",
                description: "A dedicated preparation route for Oxford and Cambridge: course and college choice, admissions tests, interviews.",
                stage: "university",
              },
              {
                slug: "personal-statement",
                label: "Personal Statement",
                description: "Work on the personal statement: from finding the student's own story to the final edit — in the student's own voice.",
                stage: "university",
              },
              {
                slug: "open-day",
                label: "Open days",
                description: "The open days of Oxford and Cambridge colleges and faculties: we plan the visits and set the priorities.",
                stage: "university",
              },
            ],
          },
        ],
      },
      {
        id: "adults",
        label: "For adults",
        intro: "Education for people building a career: master's, doctoral study, MBA and management programmes at leading universities and business schools.",
        groups: [
          {
            items: [
              {
                slug: "masters",
                label: "Master's",
                description: "Choosing a programme and a country, preparing the application, essays and interviews.",
                stage: "postgrad",
              },
              {
                slug: "doctorate",
                label: "Doctoral studies",
                description: "Finding the programme and the supervisor, the research proposal, applying for PhD and DPhil.",
                stage: "postgrad",
              },
              {
                slug: "management-programmes",
                label: "Management programmes",
                description: "Short and modular programmes for executives and entrepreneurs: matched to the goal, the schedule and the format.",
                stage: "postgrad",
              },
              {
                slug: "mba",
                label: "MBA & EMBA",
                description: "Applications to MBA and EMBA programmes at business schools in the UK, the US and Europe. The strategy rests on calibrating the professional profile and understanding what each school looks for.",
                stage: "postgrad",
              },
            ],
          },
        ],
      },
      {
        id: "learning",
        label: "Tuition",
        intro: "Preparation for entrance exams and admissions tests, academic support at GCSE, A-Level and IB, tutors, intensives and home education.",
        groups: [
          {
            items: [
              {
                slug: "entrance-exams",
                label: "Entrance exams — 11+ / 13+ / 16+",
                description: "Preparation for British school entry points: UKiset, ISEB, CAT4 and school papers — diagnosis, a study plan, exam-format practice.",
                stage: "prep",
              },
              {
                slug: "university-tests",
                label: "University tests — LNAT / TMUA / UCAT / IELTS",
                description: "Preparation for admissions and language tests, matched to the chosen course.",
                stage: "university",
              },
              {
                slug: "gcse",
                label: "GCSE & IGCSE",
                description: "Subject choice and academic support through GCSE and IGCSE — aimed at the right A-Level or IB path.",
                stage: "exams",
              },
              {
                slug: "a-level",
                label: "A-Level",
                description: "Subjects chosen for the future specialisation, tutor support and exam preparation.",
                stage: "exams",
              },
              {
                slug: "ib",
                label: "IB",
                description: "Support across the International Baccalaureate: subject choice, Extended Essay, exam preparation.",
                stage: "exams",
              },
              {
                slug: "home-education",
                label: "Home education",
                description: "An individual programme for children school does not currently suit — leading to British qualifications.",
                stage: "exams",
              },
              {
                slug: "intensive-courses",
                label: "Intensive courses",
                description: "Short, focused courses ahead of exams and entrance assessments.",
                stage: "exams",
              },
              {
                slug: "tutors",
                label: "Tutors",
                description: "Tutors matched by subject and test. Lessons sit inside the shared route rather than alongside it.",
                stage: "prep",
              },
            ],
          },
        ],
      },
      {
        id: "camps",
        label: "Camps & languages",
        intro: "Summer camps and language preparation in Britain — the gentlest way to get to know British education.",
        groups: [
          {
            items: [
              {
                slug: "summer-schools",
                label: "Summer camps in the UK",
                description: "Academic and language summer programmes in Britain — a first, gentle acquaintance with British education.",
                stage: "prep",
              },
              {
                slug: "language-preparation",
                label: "Language preparation",
                description: "English tuition in groups or one to one, in language schools and centres in Oxford, London and other cities — for children and adults.",
                stage: "prep",
              },
            ],
          },
        ],
      },
      {
        id: "blog",
        label: "Journal & resources",
        intro: "Articles, events and resources for parents: webinars, guides and pricing.",
        groups: [
          {
            title: "Journal",
            items: [
              {
                slug: "articles",
                label: "Journal articles",
                description: "Answers to the questions parents ask most: exams, timelines, choosing a school, GCSE, A-Level and IB.",
              },
            ],
          },
          {
            title: "Events",
            items: [
              {
                slug: "webinars",
                label: "Webinars & meetings",
                description: "Online webinars and in-person meetings for parents on every stage of the route.",
              },
            ],
          },
          {
            title: "Resources",
            items: [
              {
                slug: "parents-guide",
                label: "Parent's guide",
                description: "A calm walk through the British system: schools, exams, timelines.",
              },
              {
                slug: "tests-guide",
                label: "Entrance tests guide",
                description: "School and university entrance tests: what is taken, when, and how to prepare.",
              },
              {
                slug: "interview-guide",
                label: "Admissions interview guide",
                description: "How the admissions interview works and how to prepare for it.",
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
          {
            section: "consulting",
            slug: "academic-assessment",
          },
          {
            section: "learning",
            slug: "entrance-exams",
          },
          {
            section: "learning",
            slug: "tutors",
          },
          {
            section: "camps",
            slug: "summer-schools",
          },
        ],
      },
      {
        id: "school",
        numeral: "II",
        title: "The British school",
        short: "Day school or boarding — and life inside it.",
        text: "Choosing between day and boarding, submitting applications, settling through the first terms. For families abroad — guardianship and a constant line to the school.",
        links: [
          {
            section: "consulting",
            slug: "day-schools",
          },
          {
            section: "consulting",
            slug: "boarding-schools",
          },
          {
            section: "consulting",
            slug: "guardianship",
          },
        ],
      },
      {
        id: "exams",
        numeral: "III",
        title: "GCSE, A-Level or IB",
        short: "The subjects that open the right doors.",
        text: "Subject choices aimed at the future specialisation, tutor support and intensives before exams. When school is not working — home education leading to British qualifications.",
        links: [
          {
            section: "learning",
            slug: "gcse",
          },
          {
            section: "learning",
            slug: "a-level",
          },
          {
            section: "learning",
            slug: "ib",
          },
          {
            section: "learning",
            slug: "intensive-courses",
          },
          {
            section: "learning",
            slug: "home-education",
          },
        ],
      },
      {
        id: "university",
        numeral: "IV",
        title: "University",
        short: "The UK, Europe, the USA — and Oxbridge.",
        text: "An admissions strategy: the country, the course, the list, the entrance tests, the Personal Statement and the interviews. Career thinking comes before the choice, not after it.",
        links: [
          {
            section: "consulting",
            slug: "uk-universities",
          },
          {
            section: "consulting",
            slug: "oxbridge",
          },
          {
            section: "consulting",
            slug: "european-universities",
          },
          {
            section: "consulting",
            slug: "us-universities",
          },
          {
            section: "learning",
            slug: "university-tests",
          },
          {
            section: "consulting",
            slug: "personal-statement",
          },
          {
            section: "consulting",
            slug: "career-guidance",
          },
          {
            section: "consulting",
            slug: "open-day",
          },
        ],
      },
      {
        id: "postgrad",
        numeral: "V",
        title: "Master's and doctoral study",
        short: "When the first degree is not the finish.",
        text: "Master's programmes and doctoral routes are the next step after university. For those returning to study after a career there is a separate direction: MBA and management programmes.",
        links: [
          {
            section: "adults",
            slug: "masters",
          },
          {
            section: "adults",
            slug: "doctorate",
          },
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
    ctaShort: "Consultation",
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
    lead: "We walk international families along the whole British route: school preparation, the British school, GCSE, A-Level or IB, university and master's.",
    leadMore: "One route and one team — instead of scattered applications.",
    cta1: "Book a consultation",
    cta2: "See the route",
    proofNum: "20+",
    proofText: "years of combined team experience",
    scroll: "Scroll",
    arrival: "Step inside — the route begins here.",
    arrivalSub: "",
  },

  trust: {
    aria: "Trust and results",
    onGoogle: "on Google",
    stats: [
      {
        n: "240+",
        cap: "offers received",
      },
      {
        n: "180+",
        cap: "families guided",
      },
    ],
    cert: "British Council certified consultants",
    note: "figures in preparation",
  },

  manifesto: {
    label: "Principle",
    title: "We do not file applications one by one. We hold the whole road in mind —",
    titleEm: "from the first test to the graduation gown.",
    p1: "In British education every decision opens or closes the next. The school decides which subjects are available at GCSE. The A-Level or IB subjects decide which university programmes become real. The university decides which master's stays within reach.",
    p2: "So we plan the route as a whole and revise it at every stage — together with the family and the child.",
    p3: "You can join at any stage: we start with an academic assessment and with wherever your family stands today.",
  },

  route: {
    label: "The route",
    title: "One trajectory —",
    titleEm: "from the first school to the degree",
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
    imgAlt: "Watercolour: a college cloister with arches, a sunlit quad and a single tree beyond",
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
    lead: "Every ALBION discipline — from entrance exams to programmes for adults. Each one is part of the same route.",
  },

  adults: {
    label: "For adults",
    title: "Education",
    titleEm: "for adults",
    lead: "A separate direction for people building a career: master's, doctoral study, MBA and management programmes at leading universities and business schools.",
    cta: "Discuss a programme",
  },

  offers: {
    label: "Our families",
    title: "Where our families",
    titleEm: "go on to study",
    lead: "The schools and universities where our families study, or have studied. The list is in preparation",
    universities: "Universities",
    schools: "Schools",
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
    linkTutors: "Meet the tutors",
  },

  schoolsStrip: {
    aria: "Schools and universities where Albion families study",
  },

  testimonials: {
    label: "Trusted by families",
    title: "What families",
    titleEm: "say",
    score: "5.0",
    scoreCap: "average rating on Google",
    linkGoogle: "All reviews on Google",
    linkTrustpilot: "Reviews on Trustpilot",
    note: "Excerpts from the original reviews.",
    reviews: [
      {
        text: "Huge thank you to the ALBION team for helping my daughter prepare to get into one of the top 2% schools in the UK, she performed brilliantly and got the offer.",
        by: "Anastasia K.",
        source: "Google",
      },
      {
        text: "After the consultation, we had a much clearer understanding of the education pathways in the UK and the options available to us.",
        by: "Alexandra L.",
        source: "Google",
      },
      {
        text: "Anfisa and her team do an absolutely stellar job!",
        by: "Kseniya O.",
        source: "Google",
      },
      {
        text: "We had a very good experience with the team.",
        by: "Daria S.",
        source: "Google",
      },
    ],
  },

  openDay: {
    label: "Open days",
    title: "Which colleges",
    titleEm: "to see first",
    lead: "Oxford has 32 colleges, and each runs its own admissions office, its own open days and its own calendar; faculties hold subject events of their own. We help the family plan the visits so that a limited number of trips shows what matters most.",
    details: [
      "A visit plan by college and subject",
      "A feel for the academic environment",
      "Time with admissions staff",
      "Mock interviews",
    ],
    cta: "Plan the visits",
    webinars: "See webinars & meetings",
    resources: "For parents:",
    guides: "Parent's guide",
    pricing: "Pricing",
    imgAlt: "Watercolour: an ajar oak door in a stone arch, a sunlit college quad beyond",
    annot: "open, come in",
  },

  leadMagnet: {
    label: "Guides · free PDF",
    title: "Start with the",
    titleEm: "parent's guide",
    lead: "A calm, honest walk through the British system — schools, exams, timelines — written by the consultants who do the work. No jargon, no sales funnel inside.",
    cover: { series: "Albion · Guides · Vol. I", title1: "A parent's guide to", titleEm: "British schools", pdf: "PDF · free", imgAlt: "Watercolour: schoolchildren in uniform on the lawn before a red-brick British school building" },
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
    lead: "Personal statements, LNAT, TMUA, UCAT, guardianship, career direction — and after that, a master's or a doctoral route. The conversation does not end at the offer.",
    cta: "Discuss the next step",
    caption: "There is no single destination",
  },

  consultation: {
    label: "Consultation",
    title: "Let's begin",
    titleEm: "with a conversation",
    lead: "Tell us where your child is now and where you are looking. We will reply and suggest a time for a first consultation.",
    submit: "Book a consultation",
    imgAlt: "Watercolour: a parent and a schoolchild in uniform walking up a path to the open gates of a college",
  },

  contact: {
    rows: [
      {
        key: "email",
        term: "Email",
      },
      {
        key: "phone",
        term: "Telephone",
      },
      {
        key: "office",
        term: "Office",
      },
      {
        key: "format",
        term: "Consultation format & fee",
      },
    ],
  },

  form: {
    step1: {
      kicker: "Step 1 of 2",
      title: "Who is applying",
    },
    step2: {
      kicker: "Step 2 of 2",
      title: "How to reach you",
    },
    audienceLegend: "Who is the education for",
    audienceOptions: [
      {
        value: "child",
        label: "My child",
      },
      {
        value: "self",
        label: "Myself",
      },
    ],
    ageLegend: "Student's age",
    ageOptions: ["7–8", "9–10", "11–13", "14–16", "17–18"],
    stage: "What you are looking for",
    chooseStage: "Choose",
    next: "Continue",
    back: "Back",
    name: "Your name",
    channelLegend: "How would you like us to reach you",
    channelOptions: [
      {
        value: "whatsapp",
        label: "WhatsApp",
      },
      {
        value: "telegram",
        label: "Telegram",
      },
      {
        value: "call",
        label: "Phone call",
      },
      {
        value: "email",
        label: "Email",
      },
    ],
    phone: "Phone or Telegram @handle",
    email: "Email",
    optional: "optional",
    messageConsultation: "A few words about your situation — optional",
    messageOpenDay: "Which courses and colleges interest you — optional",
    company: "Company",
    consentPre: "I agree that ALBION may contact me about this enquiry and process the details provided. Privacy policy",
    sending: "Sending…",
    sendingNote: "Sending your enquiry…",
    requiredNote: "We will reach you the way you chose.",
    successTitle: "Thank you — your enquiry has been received.",
    successBody: "We will be in touch at the contacts you left to arrange a consultation time.",
    successTitleOpenDay: "Enquiry received.",
    successBodyOpenDay: "We will be in touch to talk through which colleges to visit, and when.",
    another: "Send another enquiry",
    errors: {
      form: "Unknown enquiry type.",
      audience: "Please say who the education is for.",
      age: "Please choose the student's age.",
      stage: "Please choose what you are looking for.",
      parentName: "Please tell us your name.",
      channel: "Please choose how we should reach you.",
      phone: "Please check the phone or messenger handle.",
      email: "Please check the email address.",
      contact: "Please leave a phone number or handle for the channel you chose.",
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
      "parents-guide": ["What the guide covers", "How to receive the PDF"],
      "tests-guide": ["What the guide covers", "How to receive the PDF"],
      "interview-guide": ["What the guide covers", "How to receive the PDF"],
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
      eyebrow: "Consulting · universities",
      title1: "Open",
      titleEm: "days",
      coversLabel: "What is included",
      covers: [
        "A visit plan: which colleges and faculties to see first.",
        "A feel for a college's academic environment and its subject events.",
        "Time with admissions staff.",
        "Mock interviews: how the interview works and what to expect from it.",
      ],
      regLabel: "Enquiry",
      regTitle: "Plan the visits",
      regLead: "Tell us which course or subject interests you — we will prepare a visit plan.",
      submit: "Plan the visits",
    },
    tutors: {
      rosterLabel: "The roster",
      rosterAria: "ALBION tutors",
      subjectLabel: "Subject",
      note: "The roster flexes to each family's brief: shown here is part of the team — the full list and profiles are",
      boxTitle: "We match the tutor to the brief",
      boxLead: "Subject, level and format decide the fit — profiles and recommendations are",
    },
  },

  consultCta: {
    label: "Consultation",
    title: "Let's discuss your family's route",
    lead: "A first consultation to see where the child is now and which next step is the right one. Format & fee",
    cta: "Book a consultation",
  },

  footer: {
    tag: "Independent education consultancy in Oxford for international families: one route from school preparation to university and beyond.",
    cta: "Book a consultation",
    email: "Email",
    tel: "Telephone",
    office: "Office",
    follow: "Follow us",
    navAria: "Site sections",
    openDay: "Open days",
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
