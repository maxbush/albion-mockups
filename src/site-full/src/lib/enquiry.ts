import { getDictionary, type Locale } from "@/lib/i18n";

export const ENQUIRY_KINDS = ["consultation", "open_day"] as const;
export type EnquiryKind = (typeof ENQUIRY_KINDS)[number];

export type EnquiryField =
  | "audience"
  | "age"
  | "stage"
  | "parentName"
  | "channel"
  | "phone"
  | "email"
  | "contact"
  | "message"
  | "consent";
export type EnquiryErrors = Partial<Record<EnquiryField | "form", string>>;

/**
 * First two steps of the screening questionnaire: who is applying (audience, age, goal),
 * then how to reach the family (preferred channel + at least the contact that channel needs).
 */
export interface EnquiryInput {
  kind: EnquiryKind;
  audience: string;
  age: string;
  stage: string;
  parentName: string;
  channel: string;
  phone: string;
  email: string;
  message: string;
  consent: boolean;
}

export type EnquiryMessages = {
  form: string;
  audience: string;
  age: string;
  stage: string;
  parentName: string;
  channel: string;
  phone: string;
  email: string;
  contact: string;
  consent: string;
};

export function enquiryMessages(lang: Locale): EnquiryMessages {
  return getDictionary(lang).form.errors;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9+()\-\s.@a-zA-Z_]{5,60}$/;
const en = getDictionary("en");
const audienceValues = new Set<string>(en.form.audienceOptions.map((o) => o.value));
const ageValues = new Set<string>(en.form.ageOptions);
const stageValues = new Set<string>(en.site.stageOptions.map((o) => o.value));
const channelValues = new Set<string>(en.form.channelOptions.map((o) => o.value));

function str(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Shared by the form (client) and the API route (server). */
export function validateEnquiry(
  raw: unknown,
  msgs: EnquiryMessages = enquiryMessages("en"),
): { data?: EnquiryInput; errors: EnquiryErrors; spam: boolean } {
  const input = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const errors: EnquiryErrors = {};

  // Honeypot: real people never fill the hidden "company" field.
  const spam = str(input.company, 200).length > 0;

  const kind = ENQUIRY_KINDS.includes(input.kind as EnquiryKind) ? (input.kind as EnquiryKind) : null;
  const audience = str(input.audience, 20);
  const age = str(input.age, 20);
  const stage = str(input.stage, 40);
  const parentName = str(input.parentName, 160);
  const channel = str(input.channel, 20);
  const phone = str(input.phone, 60);
  const email = str(input.email, 200);
  const message = str(input.message, 2000);
  const consent = input.consent === true;

  if (!kind) errors.form = msgs.form;

  // Step 1 is mandatory for a consultation and optional context for an open-day enquiry.
  if (kind === "consultation") {
    if (!audienceValues.has(audience)) errors.audience = msgs.audience;
    else if (audience === "child" && !ageValues.has(age)) errors.age = msgs.age;
    if (!stageValues.has(stage)) errors.stage = msgs.stage;
  } else {
    if (audience && !audienceValues.has(audience)) errors.audience = msgs.audience;
    if (age && !ageValues.has(age)) errors.age = msgs.age;
    if (stage && !stageValues.has(stage)) errors.stage = msgs.stage;
  }

  if (parentName.length < 2) errors.parentName = msgs.parentName;
  if (!channelValues.has(channel)) errors.channel = msgs.channel;

  if (channel === "email") {
    if (!EMAIL_RE.test(email)) errors.email = msgs.email;
  } else if (channelValues.has(channel)) {
    if (!phone) errors.phone = msgs.contact;
    else if (!PHONE_RE.test(phone)) errors.phone = msgs.phone;
    if (email && !EMAIL_RE.test(email)) errors.email = msgs.email;
  }
  if (channel === "email" && phone && !PHONE_RE.test(phone)) errors.phone = msgs.phone;

  if (!consent) errors.consent = msgs.consent;

  if (Object.keys(errors).length > 0 || !kind) return { errors, spam };

  return {
    data: { kind, audience, age, stage, parentName, channel, phone, email, message, consent },
    errors,
    spam,
  };
}
