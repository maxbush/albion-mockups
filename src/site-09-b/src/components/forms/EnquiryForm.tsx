"use client";

import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Tbc } from "@/components/ui/Tbc";
import { getDictionary, type Locale } from "@/lib/i18n";
import { validateEnquiry, type EnquiryErrors, type EnquiryField, type EnquiryKind } from "@/lib/enquiry";
import { getStageOptions } from "@/lib/site";

type Status = "idle" | "sending" | "done";

const FIELD_ORDER: EnquiryField[] = ["audience", "age", "stage", "parentName", "channel", "phone", "email", "message", "consent"];
const STEP1_FIELDS: EnquiryField[] = ["audience", "age", "stage"];

function Field({
  htmlFor,
  label,
  error,
  errorId,
  children,
}: {
  htmlFor: string;
  label: string;
  error?: string;
  errorId: string;
  children: ReactNode;
}) {
  return (
    <div className="field">
      <label htmlFor={htmlFor} className="field-label">
        {label}
      </label>
      {children}
      {error && (
        <p id={errorId} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

function Choices({
  legend,
  name,
  options,
  value,
  onChange,
  error,
  errorId,
}: {
  legend: string;
  name: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  errorId: string;
}) {
  return (
    <fieldset className="field" aria-describedby={error ? errorId : undefined}>
      <legend className="field-label">{legend}</legend>
      <div className="choice-group" role="radiogroup">
        {options.map((option) => (
          <label className="choice" key={option.value}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} className="field-error">
          {error}
        </p>
      )}
    </fieldset>
  );
}

/**
 * Two-step enquiry: (1) who is applying — audience, age, goal; (2) how to reach the family.
 * An open-day request skips step 1. This is the opening of the full screening questionnaire.
 */
export default function EnquiryForm({
  lang,
  kind,
  submitLabel,
}: {
  lang: Locale;
  kind: EnquiryKind;
  submitLabel: string;
}) {
  const t = getDictionary(lang).form;
  const allStages = getStageOptions(lang);
  const uid = useId();
  const twoStep = kind === "consultation";
  const [status, setStatus] = useState<Status>("idle");
  const [step, setStep] = useState<1 | 2>(twoStep ? 1 : 2);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [audience, setAudience] = useState("");
  const [age, setAge] = useState("");
  const [stage, setStage] = useState("");
  const [channel, setChannel] = useState("whatsapp");
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const id = (name: string) => `${uid}-${name}`;
  const errorId = (name: EnquiryField) => id(`${name}-error`);
  const describedBy = (name: EnquiryField) => (errors[name] ? errorId(name) : undefined);

  const stageOptions =
    audience === "self"
      ? allStages.filter((o) => o.value === "postgrad" || o.value === "unsure")
      : audience === "child"
        ? allStages.filter((o) => o.value !== "postgrad")
        : allStages;

  const focusFirstError = (errs: EnquiryErrors) => {
    const first = FIELD_ORDER.find((field) => errs[field]);
    if (!first) return;
    const form = formRef.current;
    const target =
      form?.querySelector<HTMLElement>(`[name="${first}"]:not([type="radio"])`) ??
      form?.querySelector<HTMLElement>(`input[name="${first}"]`);
    target?.focus();
  };

  function readPayload() {
    const fd = new FormData(formRef.current ?? undefined);
    return {
      kind,
      audience,
      age: audience === "child" ? age : "",
      stage,
      parentName: String(fd.get("parentName") ?? ""),
      channel,
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      company: String(fd.get("company") ?? ""),
    };
  }

  function goToStep2() {
    const check = validateEnquiry({ ...readPayload(), parentName: "xx", channel: "email", email: "a@b.co", consent: true }, t.errors);
    const stepErrors: EnquiryErrors = {};
    for (const field of STEP1_FIELDS) if (check.errors[field]) stepErrors[field] = check.errors[field];
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      focusFirstError(stepErrors);
      return;
    }
    setErrors({});
    setStep(2);
    requestAnimationFrame(() => titleRef.current?.focus());
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 1) {
      goToStep2();
      return;
    }
    const form = event.currentTarget;
    const payload = readPayload();

    const check = validateEnquiry(payload, t.errors);
    if (!check.data && !check.spam) {
      // If something from step 1 is missing, send the user back to it.
      if (twoStep && STEP1_FIELDS.some((field) => check.errors[field])) {
        setErrors(check.errors);
        setStep(1);
        requestAnimationFrame(() => focusFirstError(check.errors));
        return;
      }
      setErrors(check.errors);
      focusFirstError(check.errors);
      return;
    }

    setErrors({});
    setStatus("sending");
    try {
      // Static demo build: no backend — simulate a successful submission.
      await new Promise((resolve) => setTimeout(resolve, 600));
      form.reset();
      setAudience("");
      setAge("");
      setStage("");
      setChannel("whatsapp");
      setStep(twoStep ? 1 : 2);
      setStatus("done");
      requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="py-4">
        <span aria-hidden="true" className="block h-px w-14 bg-brass" />
        <p className="mt-6 font-display text-[clamp(1.8rem,1.3rem+1.4vw,2.6rem)] leading-[1.1] font-light">
          {kind === "open_day" ? t.successTitleOpenDay : t.successTitle}
        </p>
        <p className="mt-4 max-w-[44ch] text-[16px] leading-[1.7] text-ink-2/80">
          {kind === "open_day" ? t.successBodyOpenDay : t.successBody}
        </p>
        <button type="button" className="btn btn-ghost mt-8" onClick={() => setStatus("idle")}>
          {t.another}
        </button>
      </div>
    );
  }

  const emailOptional = channel !== "email";
  const phoneOptional = channel === "email";

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      className="grid gap-7"
      aria-describedby={errors.form ? id("form-error") : undefined}
    >
      {twoStep && (
        <div className="flex items-baseline justify-between gap-4 border-b border-ink-2/15 pb-5">
          <p ref={titleRef} tabIndex={-1} className="font-display text-[clamp(1.5rem,1.2rem+1vw,2rem)] leading-[1.1] font-light outline-none">
            {step === 1 ? t.step1.title : t.step2.title}
          </p>
          <p className="text-[12px] font-semibold tracking-[0.16em] text-ink-2/60 uppercase" aria-live="polite">
            {step === 1 ? t.step1.kicker : t.step2.kicker}
          </p>
        </div>
      )}

      {step === 1 && twoStep && (
        <>
          <Choices
            legend={t.audienceLegend}
            name="audience"
            options={t.audienceOptions}
            value={audience}
            onChange={(value) => {
              setAudience(value);
              if (value !== "child") setAge("");
              setStage("");
            }}
            error={errors.audience}
            errorId={errorId("audience")}
          />

          {audience === "child" && (
            <Choices
              legend={t.ageLegend}
              name="age"
              options={t.ageOptions.map((option) => ({ value: option, label: option }))}
              value={age}
              onChange={setAge}
              error={errors.age}
              errorId={errorId("age")}
            />
          )}

          {audience && (
            <Field htmlFor={id("stage")} label={t.stage} error={errors.stage} errorId={errorId("stage")}>
              <select
                id={id("stage")}
                name="stage"
                value={stage}
                onChange={(event) => setStage(event.target.value)}
                className="field-control"
                aria-invalid={Boolean(errors.stage)}
                aria-describedby={describedBy("stage")}
              >
                <option value="">{t.chooseStage}</option>
                {stageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>
          )}

          <div>
            <button type="submit" className="btn btn-brass">
              {t.next}
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <Field htmlFor={id("parentName")} label={t.name} error={errors.parentName} errorId={errorId("parentName")}>
            <input
              id={id("parentName")}
              name="parentName"
              autoComplete="name"
              required
              className="field-control"
              aria-invalid={Boolean(errors.parentName)}
              aria-describedby={describedBy("parentName")}
            />
          </Field>

          <Choices
            legend={t.channelLegend}
            name="channel"
            options={t.channelOptions}
            value={channel}
            onChange={setChannel}
            error={errors.channel}
            errorId={errorId("channel")}
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              htmlFor={id("phone")}
              label={phoneOptional ? `${t.phone} — ${t.optional}` : t.phone}
              error={errors.phone}
              errorId={errorId("phone")}
            >
              <input
                id={id("phone")}
                name="phone"
                type="tel"
                autoComplete="tel"
                className="field-control"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={describedBy("phone")}
              />
            </Field>
            <Field
              htmlFor={id("email")}
              label={emailOptional ? `${t.email} — ${t.optional}` : t.email}
              error={errors.email}
              errorId={errorId("email")}
            >
              <input
                id={id("email")}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                className="field-control"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={describedBy("email")}
              />
            </Field>
          </div>

          <Field
            htmlFor={id("message")}
            label={kind === "open_day" ? t.messageOpenDay : t.messageConsultation}
            error={errors.message}
            errorId={errorId("message")}
          >
            <textarea
              id={id("message")}
              name="message"
              rows={3}
              maxLength={2000}
              className="field-control"
              aria-describedby={describedBy("message")}
            />
          </Field>

          {/* Honeypot for bots */}
          <div aria-hidden="true" className="hidden">
            <label>
              {t.company}
              <input name="company" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <div>
            <label className="check" htmlFor={id("consent")}>
              <input
                id={id("consent")}
                type="checkbox"
                name="consent"
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={describedBy("consent")}
              />
              <span>
                {t.consentPre} <Tbc lang={lang} />
              </span>
            </label>
            {errors.consent && (
              <p id={errorId("consent")} className="field-error mt-2">
                {errors.consent}
              </p>
            )}
          </div>

          {errors.form && (
            <p id={id("form-error")} role="alert" className="field-error">
              {errors.form}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <button type="submit" className="btn btn-brass" disabled={status === "sending"}>
              {status === "sending" ? t.sending : submitLabel}
            </button>
            {twoStep && (
              <button
                type="button"
                className="link-hair link-hair-soft text-[15px]"
                onClick={() => {
                  setErrors({});
                  setStep(1);
                }}
              >
                {t.back}
              </button>
            )}
            <p className="text-[13px] text-ink-2/70" aria-live="polite">
              {status === "sending" ? t.sendingNote : t.requiredNote}
            </p>
          </div>
        </>
      )}
    </form>
  );
}
