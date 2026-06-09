"use client";

import Link from "next/link";
import {
  Camera,
  ChevronDown,
  MapPin,
  ShieldCheck,
  Unlock,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { formatSol } from "@/lib/data";
import { getTierRewardTotal, TIER_CONFIG } from "@/lib/tiers";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    num: "01",
    title: "Pick an open bounty",
    body: "Browse the active tier. Each bounty names a specific make, model, and area. Only unlocked tiers are live.",
    icon: MapPin,
  },
  {
    num: "02",
    title: "Find the car in the wild",
    body: "Track down the exact vehicle on public roads. Dealer lots, museums, and stock photos do not count.",
    icon: Camera,
  },
  {
    num: "03",
    title: "Submit verified proof",
    body: "Upload clear photos with geo-tagged location data. Meet the bounty requirements — plate, motion, photo count.",
    icon: ShieldCheck,
  },
  {
    num: "04",
    title: "Get approved, get paid",
    body: "We verify the spot matches the bounty. Approved submissions are paid in SOL straight from escrow.",
    icon: Wallet,
  },
  {
    num: "05",
    title: "Unlock the next tier",
    body: "Complete all four cars in a tier and the next group of four opens for everyone. Four tiers, escalating rewards.",
    icon: Unlock,
  },
];

const FAQ = [
  {
    q: "What are the bounty tiers?",
    a: "Four tiers — Street, Sport, Super, and Hyper. Each tier has four cars with fixed SOL values. Tier 1 pools under 2 SOL total. Rewards scale up through Tier 4.",
  },
  {
    q: "How do tiers unlock?",
    a: "Tier 1 is open at launch. When all four cars in a tier are completed by the community, the next tier unlocks. Progress is shared — one group unlocks for everyone.",
  },
  {
    q: "How often do new cars drop?",
    a: "New bounties are added when a tier cycle completes or when the community clears the active group. The live tier is always visible on the homepage.",
  },
  {
    q: "What counts as a valid spot?",
    a: "The car must match the bounty spec, be on public roads, and include real photos with location metadata. Rendered images, dealer inventory, and museum displays are rejected.",
  },
  {
    q: "How do I get paid?",
    a: "Rewards are held in escrow when a bounty is posted. Once your submission is approved, SOL is released to your wallet. No approval, no payout.",
  },
];

const TIER_STYLES = [
  "border-white/25 text-white",
  "border-white/50 text-white",
  "border-accent/70 text-accent",
  "border-accent text-accent",
];

export function HowItWorksContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="hiw-panel">
      <p className="hiw-eyebrow">How Carhunters works</p>

      <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
        Spot rare cars.
        <br />
        <span className="text-accent">Earn SOL.</span>
      </h1>

      <p className="mt-6 max-w-lg text-sm leading-relaxed text-neutral-400">
        Bounties for specific vehicles. Find the car, submit verified proof with
        location data, and collect SOL from escrow. Work through four tiers — four
        cars each — to unlock higher rewards.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {TIER_CONFIG.map((tier, i) => (
          <div
            key={tier.tier}
            className={cn(
              "rounded-lg border bg-white/[0.03] px-4 py-5 text-center",
              TIER_STYLES[i]
            )}
          >
            <p className="text-[0.625rem] font-medium uppercase tracking-[0.18em] opacity-80">
              Tier {tier.tier}
            </p>
            <p className="mt-2 text-sm font-semibold">{tier.label}</p>
            <p className="mt-3 text-lg font-semibold tabular-nums">
              {formatSol(getTierRewardTotal(tier.tier))}
            </p>
            <p className="mt-1 text-[0.625rem] text-neutral-500">pool</p>
          </div>
        ))}
      </div>

      <div className="mt-14">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const isLast = i === STEPS.length - 1;

          return (
            <div key={step.num} className="hiw-step">
              {!isLast && <div className="hiw-step-line" aria-hidden />}
              <div className="hiw-step-icon">
                <Icon className="h-4 w-4 text-accent" strokeWidth={1.75} />
              </div>
              <div className="pb-10">
                <p className="text-sm font-semibold text-accent">
                  {step.num}{" "}
                  <span className="text-white">{step.title}</span>
                </p>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-400">
                  {step.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 border-t border-border-subtle pt-12">
        <p className="hiw-eyebrow">Frequently asked</p>

        <div className="mt-6 space-y-3">
          {FAQ.map((item, i) => {
            const open = openFaq === i;

            return (
              <div
                key={item.q}
                className={cn(
                  "rounded-lg border bg-white/[0.02] transition-colors",
                  open ? "border-accent/50" : "border-border"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium text-white">{item.q}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-muted transition-transform",
                      open && "rotate-180 text-accent"
                    )}
                  />
                </button>
                {open && (
                  <p className="border-t border-border-subtle px-5 py-4 text-sm leading-relaxed text-neutral-400">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Link href="/bounties" className="btn btn-solid mt-12 inline-flex">
        View bounties
      </Link>
    </div>
  );
}
