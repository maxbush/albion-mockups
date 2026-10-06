"use client";

import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Tbc } from "@/components/ui/Tbc";
import { getDictionary, type Locale } from "@/lib/i18n";
import { validateEnquiry, type EnquiryErrors, type EnquiryField, type EnquiryKind } from "@/lib/enquiry";
import { getDestinationOptions, getStageOptions } from "@/lib/site";

type Status = "idle" | "sending" | "done";

const FIELD_ORDER: EnquiryField[] = ["parentName", "email", "phone", "stage", "destination", "message", "consent"];

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
  const stageOptions = getStageOptions(lang);
  const destinationOptions = getDestinationOptions(lang);
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const id = (name: string) => `${uid}-${name}`;
  const errorId = (name: EnquiryField) => id(`${name}-error`);
  const describedBy = (name: EnquiryField) => (errors[name] ? errorId(name) : undefined);

  const focusFirstError = (errs: EnquiryErrors) => {
    const first = FIELD_ORDER.find((field) => errs[field]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    const payload = {
      kind,
      parentName: String(fd.get("parentName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      stage: String(fd.get("stage") ?? ""),
      destination: String(fd.get("destination") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      company: String(fd.get("company") ?? ""),
    };

    const check = validateEnquiry(payload, t.errors);
    if (!check.data && !check.spam) {
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

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      className="grid gap-6"
      aria-describedby={errors.form ? id("form-error") : undefined}
    >
      <div className="grid gap-6 sm:grid-cols-2">
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
        <Field htmlFor={id("email")} label={t.email} error={errors.email} errorId={errorId("email")}>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            className="field-control"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
          />
        </Field>
      </div>

      <Field
        htmlFor={id("phone")}
        label={t.phone}
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

      <div className={`grid gap-6 ${kind === "consultation" ? "sm:grid-cols-2" : ""}`}>
        <Field htmlFor={id("stage")} label={t.stage} error={errors.stage} errorId={errorId("stage")}>
          <select
            id={id("stage")}
            name="stage"
            defaultValue=""
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
        {kind === "consultation" && (
          <Field
            htmlFor={id("destination")}
            label={t.destination}
            error={errors.destination}
            errorId={errorId("destination")}
          >
            <select
              id={id("destination")}
              name="destination"
              defaultValue=""
              className="field-control"
              aria-invalid={Boolean(errors.destination)}
              aria-describedby={describedBy("destination")}
            >
              <option value="">{t.chooseDestination}</option>
              {destinationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
        )}
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
          rows={4}
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
        <p className="text-[13px] text-ink-2/70" aria-live="polite">
          {status === "sending" ? t.sendingNote : t.requiredNote}
        </p>
      </div>
    </form>
  );
}
