import type { Dictionary } from "./types";

export const en: Dictionary = {
  meta: {
    title: "British Education Consultancy in Oxford | ALBION Oxford",
    description:
      "Oxford consultancy for UK school and university admissions, Oxbridge, tutoring, MBA and executive study. In British education since 2010. Start with a short form.",
  },

  site: {
    stages: [
      {
        id: "prep",
        numeral: "I",
        title: "Assessment and route",
        short: "Where the child stands, and what is realistic.",
        text: "An online assessment with ALBION teachers, past papers included, shows how a child compares with British peers and where the gaps are. The result is a route with entry points, not a wish list.",
      },
      {
        id: "school",
        numeral: "II",
        title: "School",
        short: "Boarding or day.",
        text: "A shortlist of boarding and day schools, with reasons given for every name on it. Entrance exams at 7+, 8+, 11+, 13+ and 16+, and interview practice.",
      },
      {
        id: "exams",
        numeral: "III",
        title: "Preparation and guardianship",
        short: "GCSE, A-Level, IB and a representative in the UK.",
        text: "Tutors take pupils through GCSE, A-Level and IB. Guardianship, in which ALBION acts as the parents' representative in the UK, goes mainly to pupils whose entry the team handled, and places are few.",
      },
      {
        id: "university",
        numeral: "IV",
        title: "University",
        short: "UCAS, Oxbridge, the USA and Europe.",
        text: "The university is a tool, chosen for what the student wants to do next.",
      },
      {
        id: "postgrad",
        numeral: "V",
        title: "Master's, MBA, executive",
        short: "The next step for adults.",
        text: "For graduates and working professionals choosing what comes next: master's degrees and doctorates, MBA programmes and management courses.",
      },
    ],
    stageOptions: [
      { value: "prep", label: "Assessment and route" },
      { value: "school", label: "School" },
      { value: "exams", label: "Preparation: GCSE, A-Level, IB" },
      { value: "university", label: "University" },
      { value: "postgrad", label: "Master's, MBA, executive" },
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
    brandAria: "ALBION, home",
    skip: "Skip to content",
  },

  hero: {
    eyebrow: "Oxford · education consultancy since 2010",
    title1: "British education,",
    title2: "from choosing a school",
    title3: "to the MBA",
    lead: "An Oxford consultancy that helps families apply to independent schools and universities, arranges the tutoring that goes with them, and advises adults on master's degrees, MBAs and executive programmes.",
    leadMore: "One route and one team, instead of applications scattered across agents.",
    cta1: "Describe your situation",
    cta2: "See the route",
    proofNum: "96%",
    proofText: "of pupils are placed at the school they chose",
    scroll: "Scroll",
    arrival: "The route begins here.",
    arrivalSub: "",
    imgAlt: "Watercolour: an Oxford quad with its gatehouse tower in morning haze",
  },

  trust: {
    aria: "Trust and results",
    onGoogle: "on Google",
    stats: [
      {
        n: "since 2010",
        cap: "in British education",
      },
      {
        n: "3,000+",
        cap: "hours of lessons a year",
      },
    ],
  },

  manifesto: {
    label: "Principle",
    title: "Each decision shapes the next.",
    titleEm: "So the route is planned as a whole.",
    p1: "The school decides which subjects are on offer, the subjects narrow the choice of university, and the university decides what comes after. We plan the whole sequence.",
    p2: "The order is the same at every stage. The academic profile, the requirements of the school or programme and the longer-term goal come first, then a timetable of actions.",
    p3: "The fallback is built early, since a single offer is not a plan.",
  },

  route: {
    label: "The route",
    title: "One road,",
    titleEm: "five stages",
    intro:
      "Each stage builds on the last, so what is learnt about the child early on is not lost later.",
    stagePrefix: "Stage",
    linksAria: "Sections of the {title} stage",
    coda: "You can join at any stage.",
    codaCta: "Discuss your stage",
  },

  method: {
    label: "How the work runs",
    title: "Analysis first,",
    titleEm: "then a plan",
    lead: "The work runs in four steps, and the family can see them from the start. Fees are published: a university consultation with a written report starts at £350 and a full programme at £6,000, depending on the destination and the number of phases.",
    steps: [
      {
        n: "I",
        title: "Academic assessment",
        text: "An online assessment with our teachers, past papers included, shows where the child stands against British peers, where the gaps are and what is realistic.",
      },
      {
        n: "II",
        title: "A plan with dates",
        text: "The assessment becomes a timetable: stages, exams, documents and a fallback. Each shortlist arrives with reasons for every name on it.",
      },
      {
        n: "III",
        title: "Preparation and documents",
        text: "Tutors from the same company prepare the child for ISEB, UKiset, CAT4, LNAT, TARA, TMUA and interviews, so a change to the school list reaches the lesson plan at once. The same team works on the application documents: the personal statement or motivation letter and, where needed, a portfolio.",
      },
      {
        n: "IV",
        title: "The decision",
        text: "When offers arrive, they are compared before the family replies to any school. Schools and universities decide who is admitted, so a place cannot be promised.",
      },
    ],
    cta1: "Describe your situation in the form",
    cta2: "Fees and what each phase includes",
    imgAlt: "Watercolour: a college cloister with arches, a sunlit quad and a single tree beyond",
  },

  difference: {
    label: "How ALBION differs",
    title: "Four commitments",
    titleEm: "we do not bend",
    lead: "We work inside the British system, not selling it from the outside.",
    items: [
      {
        n: "I",
        word: "Oxford-based",
        text: "We work from Oxford and know the British education system from the inside. The address and telephone number are on the contact page.",
      },
      {
        n: "II",
        word: "Independent",
        text: "Schools and universities pay us nothing and there are no commissions. When we say a school fits, it is our opinion, not a paid recommendation.",
      },
      {
        n: "III",
        word: "One team",
        text: "Consultants, tutors and guardians work inside one company. A child is not passed from contractor to contractor, and decisions at each stage rest on what came before.",
      },
      {
        n: "IV",
        word: "Honest about chances",
        text: "We do not promise a place: the school or university decides. Fees are published and the limits of the service are stated up front.",
      },
    ],
  },

  adults: {
    label: "For adults",
    title: "Education",
    titleEm: "for adults",
    lead: "Master's degrees, doctorates, MBAs and management programmes. We review the candidate's profile and prepare the documents and the interview; the admissions committee makes the decision.",
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
    cap: "tutors across time zones",
    title: "Who does",
    titleEm: "the work",
    lead: "Two co-founders, an academic director, a director of development and the specialist who selects every tutor personally. Full profiles are on the team page.",
    leadershipAria: "Leadership team",
    tutorsLabel: "Tutors",
    tutorsAria: "Tutors",
    nameLabel: "Name",
    roleLabel: "Role",
    roles: [
      "Co-founder · MSc Oxon",
      "Co-founder · Guardianship",
      "Academic Director",
      "Director of Development",
      "Tutor selection",
    ],
    tutorRole: "Tutor",
    resultsLabel: "The numbers",
    results: [
      { n: "100%", cap: "of clients receive an offer from at least one Russell Group university" },
      { n: "3 in 4", cap: "of ALBION's candidates are invited to an Oxbridge interview" },
      { n: "10+", cap: "adult clients completed Saïd (Oxford) programmes in the past year" },
    ],
    linkTeam: "Meet the team",
    linkResults: "Figures and results",
    linkTestimonials: "Reviews",
    linkTutors: "About the tutors",
  },

  testimonials: {
    label: "Client reviews",
    title: "What families",
    titleEm: "say",
    score: "5.0",
    scoreCap: "rating on Google",
    linkGoogle: "Reviews on Google",
    linkReviews: "About these reviews",
    note: "Excerpts from reviews on our public Google profile.",
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
    lead: "Oxford has 32 undergraduate colleges. Each has its own admissions committee, its own open days and its own timetable, and departments run subject events separately. No family can see everything, so the question is which to visit first. A separate page explains the two formats: a planning service for visits, and an ALBION event in Oxford.",
    details: [
      "A sense of a college's academic environment",
      "Time with admissions staff",
      "Demonstration interviews",
      "Subject events run by departments",
    ],
    cta: "Read about both formats",
    events: "All events",
    resources: "Worth reading:",
    guideParents: "Parents' guide",
    guideInterview: "Interview guide",
    imgAlt: "Watercolour: an ajar oak door in a stone arch, a sunlit college quad beyond",
  },

  resources: {
    label: "Resources",
    title: "Three guides",
    titleEm: "for families",
    lead: "Each guide is an article you can read on the site. They explain how the process works. Dates and requirements change, so confirm them with the school, the university or the test provider.",
    imgAlt: "Watercolour: schoolchildren in uniform on the lawn before a red-brick British school building",
    listAria: "Guides",
    cards: [
      {
        n: "01",
        title: "Parents' guide",
        text: "Prep and senior schools, boarding and day, entry points at 7+, 11+, 13+ and 16+, and the route from assessment to guardianship.",
        key: "parentsGuide",
      },
      {
        n: "02",
        title: "Entrance tests guide",
        text: "What the ISEB Pre-Test, CAT4, UKiset and Common Entrance are for, and which university tests belong to which course.",
        key: "testsGuide",
      },
      {
        n: "03",
        title: "Interview guide",
        text: "What school interviewers listen for, and how the Oxford and Cambridge interview differs.",
        key: "interviewGuide",
      },
    ],
    hub: "All resources",
  },

  nextStep: {
    label: "What comes next",
    title: "After",
    titleEm: "the offer",
    lead: "An offer can be conditional on final grades, so the work does not end with the letter of admission. After a first degree the conversation can turn to a master's, a doctorate or an MBA.",
    cta: "Discuss the next step in the form",
    caption: "Each stage leads into the next",
  },

  consultation: {
    label: "Consultation",
    title: "How the conversation",
    titleEm: "begins",
    lead: "Tell us who is applying, where to and by when. We will get in touch and suggest a time for an initial consultation, where you agree which stage to start from.",
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
        term: "Consultation format and fee",
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
    messageConsultation: "A few words about your situation (optional)",
    messageOpenDay: "Which courses and colleges interest you (optional)",
    company: "Company",
    consentPre: "I agree that ALBION may contact me about this enquiry and process the details provided. Privacy policy",
    sending: "Sending…",
    sendingNote: "Sending your enquiry…",
    requiredNote: "We will reach you the way you chose.",
    successTitle: "Thank you, your enquiry has been received.",
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
      pricing: ["First consultation", "Stage-by-stage support", "Formats and packages"],
      team: ["Consultant profiles", "Tutors", "Guardians"],
      results: ["Admissions across the route", "Route outcomes"],
      testimonials: ["Family testimonials"],
      media: ["Publications", "Interviews and talks"],
      webinars: ["Schedule", "Recordings of past meetings"],
      "parents-guide": ["What the guide covers", "Where to read it"],
      "tests-guide": ["What the guide covers", "Where to read it"],
      "interview-guide": ["What the guide covers", "Where to read it"],
    } as Record<string, string[]>,
    defaultDetails: ["What the support covers", "Formats and timelines", "Fees"],
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
        "Demonstration interviews: how the interview works and what to expect from it.",
      ],
      regLabel: "Enquiry",
      regTitle: "Plan the visits",
      regLead: "Tell us which course or subject interests you, and we will prepare a visit plan.",
      submit: "Plan the visits",
    },
    tutors: {
      rosterLabel: "The roster",
      rosterAria: "ALBION tutors",
      subjectLabel: "Subject",
      note: "The roster flexes to each family's brief: shown here is part of the team, and the full list and profiles are on the team page.",
      boxTitle: "We match the tutor to the brief",
      boxLead: "Subject, level and format decide the fit, and the profile and recommendations follow.",
    },
  },

  consultCta: {
    label: "Consultation",
    title: "Let's discuss your family's route",
    lead: "A first consultation to see where the child is now and which next step is the right one.",
    cta: "Book a consultation",
  },

  footer: {
    tag: "Education consultancy in Oxford for families and adult clients: British schools, universities, MBA and executive programmes. In British education since 2010.",
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
    lead: "The page may have moved. Head back to the homepage, where the route begins.",
    cta1: "Back to the homepage",
    cta2: "Book a consultation",
  },
};
