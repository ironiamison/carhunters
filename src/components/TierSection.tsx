import { BountyCard } from "@/components/BountyCard";
import { formatSol } from "@/lib/data";
import {
  CARS_PER_TIER,
  getBountiesByTier,
  getTierCompletedCount,
  getTierConfig,
  getTierRewardTotal,
  isTierUnlocked,
} from "@/lib/tiers";
import { BountyTier } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TierSectionProps {
  tier: BountyTier;
  showLocked?: boolean;
}

export function TierSection({ tier, showLocked = true }: TierSectionProps) {
  const config = getTierConfig(tier);
  const bounties = getBountiesByTier(tier);
  const unlocked = isTierUnlocked(tier);
  const completed = getTierCompletedCount(tier);
  const total = getTierRewardTotal(tier);

  if (!showLocked && !unlocked) return null;

  return (
    <section className={cn(!unlocked && "opacity-60")}>
      <div className="mb-8 flex flex-col gap-4 border-b border-border-subtle pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-4">
            <span className="text-xs tabular-nums text-accent">Tier {tier}</span>
            {!unlocked && (
              <span className="text-[0.625rem] uppercase tracking-[0.15em] text-dim">
                Locked
              </span>
            )}
            {unlocked && completed === CARS_PER_TIER && (
              <span className="text-[0.625rem] uppercase tracking-[0.15em] text-muted">
                Complete
              </span>
            )}
          </div>
          <h2 className="mt-2 text-2xl font-light tracking-tight text-white lg:text-3xl">
            {config.label}
          </h2>
          <p className="mt-2 text-sm text-muted">
            {config.rewards.map(formatSol).join(" · ")} ·{" "}
            {formatSol(total)} pool
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-[0.625rem] uppercase tracking-[0.18em] text-dim">
            Progress
          </p>
          <p className="mt-1 text-lg font-light tabular-nums text-white">
            {completed}/{CARS_PER_TIER}
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {bounties.map((bounty) => (
          <BountyCard
            key={bounty.id}
            bounty={bounty}
            forceLocked={!unlocked}
          />
        ))}
      </div>
    </section>
  );
}
