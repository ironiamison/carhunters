import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProcessStrip } from "@/components/ProcessStrip";
import { TierOverview } from "@/components/TierOverview";
import { TierSection } from "@/components/TierSection";
import { BountyTier } from "@/lib/types";

const TIERS: BountyTier[] = [1, 2, 3, 4];

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProcessStrip />

      <section className="py-20 lg:py-28">
        <div className="container-main">
          <div className="mb-14 flex items-end justify-between gap-8">
            <div>
              <p className="eyebrow">Progression</p>
              <h2 className="headline-sm mt-3">Tier system</h2>
              <p className="mt-4 max-w-lg text-sm text-muted">
                Start on Tier 1 — four cars under 2 SOL total. Spot all four to
                unlock the next group of four.
              </p>
            </div>
            <Link
              href="/bounties"
              className="hidden shrink-0 text-xs uppercase tracking-[0.2em] text-muted transition hover:text-white sm:block"
            >
              Full list
            </Link>
          </div>

          <TierOverview />

          <div className="mt-20 space-y-24 lg:mt-28">
            {TIERS.map((tier) => (
              <TierSection key={tier} tier={tier} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
