"use client";

import { useId, useState, type ChangeEvent, type FormEvent } from "react";
import { Icon } from "@/components/icons/Icon";
import { Button } from "@/components/ui/Button";

type Fields = { first_name: string; last_name: string; email: string; message: string };
const EMPTY: Fields = { first_name: "", last_name: "", email: "", message: "" };

const field =
  "neu-inset w-full rounded-ctl px-4 text-[0.9375rem] text-ink-900 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-800 aria-[invalid=true]:border-red-700/60";

/** Same fields and success/error handling as the live contact form. */
export function ContactForm() {
  const id = useId();
  const [values, setValues] = useState<Fields>(EMPTY);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof Fields, string>>>({});

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    setFieldErrors((f) => ({ ...f, [e.target.name]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setSent(true);
        setValues(EMPTY);
      } else if (data.errors) {
        const mapped: Partial<Record<keyof Fields, string>> = {};
        for (const [k, v] of Object.entries(data.errors as Record<string, unknown>)) mapped[k as keyof Fields] = Array.isArray(v) ? String(v[0]) : String(v);
        setFieldErrors(mapped);
        setError(data.message || Object.values(mapped)[0] || "Something went wrong. Please try again.");
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div role="status" className="flex flex-col items-start py-10">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest-950 text-gold-400">
          <Icon name="shield-check" size={22} />
        </span>
        <h3 className="t-h3 mt-6">Message Sent!</h3>
        <p className="mt-3 text-stone-600">Thank you for reaching out. We&rsquo;ll get back to you shortly.</p>
        <button type="button" onClick={() => setSent(false)} className="mt-6 min-h-11 text-sm underline underline-offset-4">
          Send another message
        </button>
      </div>
    );
  }

  const input = (name: keyof Fields, label: string, type = "text", autoComplete?: string) => (
    <div>
      <label htmlFor={`${id}-${name}`} className="t-label mb-2 block text-stone-600">
        {label}
      </label>
      <input
        id={`${id}-${name}`}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        value={values[name]}
        onChange={onChange}
        aria-invalid={Boolean(fieldErrors[name])}
        aria-describedby={fieldErrors[name] ? `${id}-${name}-err` : undefined}
        className={`${field} h-12`}
      />
      {fieldErrors[name] && (
        <p id={`${id}-${name}-err`} className="mt-2 text-sm text-red-800">
          {fieldErrors[name]}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error && (
        <p role="alert" className="border-l-2 border-red-800 bg-red-50 px-4 py-3 text-sm text-red-900">
          {error}
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        {input("first_name", "First Name", "text", "given-name")}
        {input("last_name", "Last Name", "text", "family-name")}
      </div>
      {input("email", "Email", "email", "email")}
      <div>
        <label htmlFor={`${id}-message`} className="t-label mb-2 block text-stone-600">
          Message
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          required
          rows={6}
          value={values.message}
          onChange={onChange}
          aria-invalid={Boolean(fieldErrors.message)}
          className={`${field} resize-y py-3`}
        />
        {fieldErrors.message && <p className="mt-2 text-sm text-red-800">{fieldErrors.message}</p>}
      </div>
      <Button type="submit" disabled={sending} arrow={!sending} className="w-full sm:w-auto">
        {sending ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
