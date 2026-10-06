import { getDictionary, type Locale } from "@/lib/i18n";

export const ENQUIRY_KINDS = ["consultation", "open_day"] as const;
export type EnquiryKind = (typeof ENQUIRY_KINDS)[number];

export type EnquiryField = "parentName" | "email" | "phone" | "stage" | "destination" | "message" | "consent";
export type EnquiryErrors = Partial<Record<EnquiryField | "form", string>>;

export interface EnquiryInput {
  kind: EnquiryKind;
  parentName: string;
  email: string;
  phone: string;
  stage: string;
  destination: string;
  message: string;
  consent: boolean;
}

export type EnquiryMessages = {
  form: string;
  parentName: string;
  email: string;
  phone: string;
  stage: string;
  destination: string;
  consent: string;
};

export function enquiryMessages(lang: Locale): EnquiryMessages {
  return getDictionary(lang).form.errors;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const stageValues = new Set<string>(getDictionary("en").site.stageOptions.map((option) => option.value));
const destinationValues = new Set<string>(getDictionary("en").site.destinationOptions.map((option) => option.value));

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
  const parentName = str(input.parentName, 160);
  const email = str(input.email, 200);
  const phone = str(input.phone, 60);
  const stage = str(input.stage, 40);
  const destination = str(input.destination, 40);
  const message = str(input.message, 2000);
  const consent = input.consent === true;

  if (!kind) errors.form = msgs.form;
  if (parentName.length < 2) errors.parentName = msgs.parentName;
  if (!EMAIL_RE.test(email)) errors.email = msgs.email;
  if (phone && !/^[0-9+()\-\s.@a-zA-Z_]{5,60}$/.test(phone)) errors.phone = msgs.phone;
  if (stage && !stageValues.has(stage)) errors.stage = msgs.stage;
  if (destination && !destinationValues.has(destination)) errors.destination = msgs.destination;
  if (!consent) errors.consent = msgs.consent;

  if (Object.keys(errors).length > 0 || !kind) return { errors, spam };

  return {
    data: { kind, parentName, email, phone, stage, destination, message, consent },
    errors,
    spam,
  };
}
