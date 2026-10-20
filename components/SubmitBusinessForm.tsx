"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig, showDevNotices } from "@/lib/config";
import { categoryLabels } from "@/lib/labels";
import type { BusinessCategory } from "@/lib/types";

const categories = Object.keys(categoryLabels) as BusinessCategory[];

interface FormState {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  island: string;
  category: BusinessCategory | "";
  description: string;
  website: string;
  onMwakete: "yes" | "no" | "";
  permission: boolean;
  agreeTerms: boolean;
}

const initialState: FormState = {
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  island: "",
  category: "",
  description: "",
  website: "",
  onMwakete: "",
  permission: false,
  agreeTerms: false,
};

function buildMailtoHref(form: FormState): string {
  const subject = `Business listing submission: ${form.businessName || "(no name given)"}`;
  const lines = [
    `Business name: ${form.businessName}`,
    `Contact person: ${form.contactName}`,
    `Email: ${form.email}`,
    `Phone: ${form.phone || "(not provided)"}`,
    `Island / location: ${form.island}`,
    `Category: ${form.category ? categoryLabels[form.category] : ""}`,
    `Website or social media: ${form.website || "(not provided)"}`,
    `Also listed on Mwakete: ${form.onMwakete || "(not answered)"}`,
    "",
    "Description:",
    form.description,
    "",
    `Permission to publish supplied information: ${form.permission ? "Yes" : "No"}`,
    `Agrees to submission terms and privacy notice: ${form.agreeTerms ? "Yes" : "No"}`,
  ];
  const body = lines.join("\n");
  return `mailto:${siteConfig.submissionEmail}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

export default function SubmitBusinessForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [touched, setTouched] = useState(false);

  const requiredFilled =
    form.businessName.trim() &&
    form.contactName.trim() &&
    form.email.trim() &&
    form.island.trim() &&
    form.category &&
    form.description.trim() &&
    form.permission &&
    form.agreeTerms;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <div>
      {showDevNotices && siteConfig.submissionEmailIsPlaceholder && (
        <div className="mb-6 rounded-xl border border-coral/30 bg-coral/5 p-4 text-sm text-charcoal/85">
          <p className="font-semibold text-coral">Setup note (development placeholder)</p>
          <p className="mt-1">
            The submission email address is a placeholder (
            <code>{siteConfig.submissionEmail}</code>). Replace it in
            <code> lib/config.ts</code> with a real, monitored inbox before
            launch.
          </p>
        </div>
      )}

      <div className="rounded-xl border border-grey/15 bg-sand/40 p-4 text-sm text-charcoal/80">
        <p>
          <strong>How this works:</strong> completing this form opens your
          email application with a pre-filled message to our team. Nothing
          is submitted until you actually send that email — this site does
          not store or transmit your details on its own.
        </p>
      </div>

      <form
        className="mt-6 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          setTouched(true);
          if (!requiredFilled) return;
          window.location.href = buildMailtoHref(form);
        }}
      >
        <Field label="Business name" required>
          <input
            required
            type="text"
            value={form.businessName}
            onChange={(e) => update("businessName", e.target.value)}
            className="w-full rounded-lg border border-grey/35 px-3.5 py-2.5 text-sm focus:border-lagoon focus:outline-none"
          />
        </Field>

        <Field label="Contact person's name" required>
          <input
            required
            type="text"
            value={form.contactName}
            onChange={(e) => update("contactName", e.target.value)}
            className="w-full rounded-lg border border-grey/35 px-3.5 py-2.5 text-sm focus:border-lagoon focus:outline-none"
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Email address" required>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full rounded-lg border border-grey/35 px-3.5 py-2.5 text-sm focus:border-lagoon focus:outline-none"
            />
          </Field>
          <Field label="Phone number (optional)">
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="w-full rounded-lg border border-grey/35 px-3.5 py-2.5 text-sm focus:border-lagoon focus:outline-none"
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Island or location" required>
            <input
              required
              type="text"
              value={form.island}
              onChange={(e) => update("island", e.target.value)}
              className="w-full rounded-lg border border-grey/35 px-3.5 py-2.5 text-sm focus:border-lagoon focus:outline-none"
            />
          </Field>
          <Field label="Business category" required>
            <select
              required
              value={form.category}
              onChange={(e) => update("category", e.target.value as BusinessCategory)}
              className="w-full rounded-lg border border-grey/35 px-3.5 py-2.5 text-sm focus:border-lagoon focus:outline-none"
            >
              <option value="" disabled>
                Choose a category
              </option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {categoryLabels[c]}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Description" required>
          <textarea
            required
            rows={5}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            className="w-full rounded-lg border border-grey/35 px-3.5 py-2.5 text-sm focus:border-lagoon focus:outline-none"
          />
        </Field>

        <Field label="Website or social media URL">
          <input
            type="url"
            value={form.website}
            onChange={(e) => update("website", e.target.value)}
            className="w-full rounded-lg border border-grey/35 px-3.5 py-2.5 text-sm focus:border-lagoon focus:outline-none"
            placeholder="https://"
          />
        </Field>

        <fieldset>
          <legend className="text-sm font-semibold text-charcoal">
            Is this business also listed on Mwakete.com?
          </legend>
          <div className="mt-2 flex gap-6">
            {(["yes", "no"] as const).map((opt) => (
              <label key={opt} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="onMwakete"
                  checked={form.onMwakete === opt}
                  onChange={() => update("onMwakete", opt)}
                />
                {opt === "yes" ? "Yes" : "No"}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="flex items-start gap-3 text-sm text-charcoal/85">
          <input
            type="checkbox"
            required
            checked={form.permission}
            onChange={(e) => update("permission", e.target.checked)}
            className="mt-1"
          />
          I confirm I have permission to submit this information and for it
          to be published on Discover Kiribati.
        </label>

        <label className="flex items-start gap-3 text-sm text-charcoal/85">
          <input
            type="checkbox"
            required
            checked={form.agreeTerms}
            onChange={(e) => update("agreeTerms", e.target.checked)}
            className="mt-1"
          />
          I agree to the{" "}
          <Link href="/listing-policy" className="font-medium text-lagoon no-underline hover:text-ocean">
            Listing Policy
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="font-medium text-lagoon no-underline hover:text-ocean">
            Privacy Policy
          </Link>
          .
        </label>

        <p className="text-xs text-grey">
          Submitting this form does not guarantee publication, verification,
          ranking, or any commercial result.
        </p>

        {touched && !requiredFilled && (
          <p className="text-sm font-medium text-coral" role="alert">
            Please fill in all required fields and agree to both checkboxes
            before continuing.
          </p>
        )}

        <button
          type="submit"
          className="rounded-full bg-ocean px-6 py-3 text-sm font-semibold text-warm-white hover:bg-lagoon"
        >
          Open email to submit
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-charcoal">
        {label}
        {required && <span className="text-coral"> *</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
