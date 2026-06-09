"use client";

import { useMemo, useState } from "react";
import { BountyCard } from "@/components/BountyCard";
import { TierOverview } from "@/components/TierOverview";
import { TierSection } from "@/components/TierSection";
import { bounties, categoryLabels } from "@/lib/data";
import { getActiveTier, getBountiesByTier, isBountyUnlocked, isTierUnlocked } from "@/lib/tiers";
import { BountyCategory, BountyTier } from "@/lib/types";
import { cn } from "@/lib/utils";

const TIERS: BountyTier[] = [1, 2, 3, 4];

export default function BountiesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<BountyCategory | "all">("all");
  const activeTier = getActiveTier();

  const matchingIds = useMemo(() => {
    let result = [...bounties];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.make.toLowerCase().includes(q) ||
          b.model.toLowerCase().includes(q) ||
          b.location.toLowerCase().includes(q)
      );
    }

    if (category !== "all") {
      result = result.filter((b) => b.category === category);
    }

    return new Set(result.map((b) => b.id));
  }, [search, category]);

  const categories = Object.keys(categoryLabels) as BountyCategory[];
  const hasFilters = search !== "" || category !== "all";
  const anyMatch = bounties.some((b) => matchingIds.has(b.id));

  return (
    <div className="pt-16">
      <div className="container-main border-b border-border-subtle py-20 lg:py-24">
        <p className="eyebrow">Marketplace</p>
        <h1 className="headline-sm mt-4 max-w-2xl">Bounties</h1>
        <p className="mt-4 text-sm text-muted">
          Tier {activeTier} active · 4 tiers · 4 cars per tier · unlock in groups
        </p>
      </div>

      <div className="container-main py-16 lg:py-20">
        <div className="flex flex-col gap-8 border-b border-border-subtle pb-10 lg:flex-row lg:items-end lg:justify-between">
          <input
            type="text"
            placeholder="Search make, model, city"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md border-b border-border bg-transparent py-3 text-sm text-white outline-none placeholder:text-dim focus:border-white/30 lg:flex-1"
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          <FilterChip
            active={category === "all"}
            onClick={() => setCategory("all")}
            label="All"
          />
          {categories.map((cat) => (
            <FilterChip
              key={cat}
              active={category === cat}
              onClick={() => setCategory(category === cat ? "all" : cat)}
              label={categoryLabels[cat]}
            />
          ))}
        </div>

        {!hasFilters && (
          <div className="mt-16">
            <TierOverview />
          </div>
        )}

        <div className="mt-16 space-y-24">
          {hasFilters
            ? TIERS.map((tier) => (
                <FilteredTierGrid
                  key={tier}
                  tier={tier}
                  matchingIds={matchingIds}
                />
              ))
            : TIERS.map((tier) => <TierSection key={tier} tier={tier} />)}
        </div>

        {hasFilters && !anyMatch && (
          <p className="mt-24 text-center text-sm text-muted">No matches.</p>
        )}
      </div>
    </div>
  );
}

function FilteredTierGrid({
  tier,
  matchingIds,
}: {
  tier: BountyTier;
  matchingIds: Set<string>;
}) {
  const tierBounties = getBountiesByTier(tier).filter((b) => matchingIds.has(b.id));
  if (tierBounties.length === 0) return null;

  const unlocked = isTierUnlocked(tier);

  return (
    <section>
      <p className="eyebrow mb-6">Tier {tier}</p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {tierBounties.map((bounty) => (
          <BountyCard
            key={bounty.id}
            bounty={bounty}
            forceLocked={!unlocked || !isBountyUnlocked(bounty)}
          />
        ))}
      </div>
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "text-xs uppercase tracking-[0.15em] transition",
        active ? "text-white" : "text-dim hover:text-muted"
      )}
    >
      {label}
    </button>
  );
}
