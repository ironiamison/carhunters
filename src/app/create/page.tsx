"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { categoryLabels } from "@/lib/data";

const fieldClass =
  "w-full border-b border-border bg-transparent py-3 text-sm text-white outline-none placeholder:text-dim focus:border-white/30";

export default function CreateBountyPage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center pt-16">
        <div className="container-main text-center">
          <p className="eyebrow">Confirmed</p>
          <h1 className="mt-4 text-3xl font-light text-white">Bounty posted</h1>
          <Link href="/bounties" className="btn btn-solid mt-10 inline-flex">
            View bounties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <div className="container-main border-b border-border-subtle py-16 lg:py-20">
        <Link
          href="/bounties"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </Link>
        <h1 className="headline-sm mt-8 max-w-lg">Post bounty</h1>
      </div>

      <form
        className="container-main max-w-lg space-y-10 py-16 lg:py-20"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <Field label="Title">
          <input type="text" required className={fieldClass} />
        </Field>
        <div className="grid gap-10 sm:grid-cols-2">
          <Field label="Make">
            <input type="text" required className={fieldClass} />
          </Field>
          <Field label="Model">
            <input type="text" required className={fieldClass} />
          </Field>
        </div>
        <Field label="Category">
          <select required className={fieldClass}>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Description">
          <textarea required rows={4} className={`${fieldClass} resize-none`} />
        </Field>
        <div className="grid gap-10 sm:grid-cols-2">
          <Field label="Location">
            <input type="text" required className={fieldClass} />
          </Field>
          <Field label="Reward (SOL)">
            <input type="number" required min={0.1} step={0.1} className={fieldClass} />
          </Field>
        </div>
        <button type="submit" className="btn btn-solid w-full">
          Lock reward
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <div className="mt-3">{children}</div>
    </label>
  );
}
