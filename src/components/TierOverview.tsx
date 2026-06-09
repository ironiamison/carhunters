import { formatSol } from "@/lib/data";
import {
  CARS_PER_TIER,
  getTierCompletedCount,
  getTierRewardTotal,
  isTierComplete,
  isTierUnlocked,
  TIER_CONFIG,
} from "@/lib/tiers";
import { cn } from "@/lib/utils";

export function TierOverview() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {TIER_CONFIG.map((config) => {
        const unlocked = isTierUnlocked(config.tier);
        const complete = isTierComplete(config.tier);
        const completed = getTierCompletedCount(config.tier);
        const total = getTierRewardTotal(config.tier);

        return (
          <div
            key={config.tier}
            className={cn(
              "border p-5 transition",
              unlocked
                ? "border-border bg-surface"
                : "border-border-subtle bg-black",
              complete && "border-white/20"
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs tabular-nums text-accent">
                Tier {config.tier}
              </span>
              {!unlocked && (
                <span className="text-[0.625rem] uppercase tracking-[0.15em] text-dim">
                  Locked
                </span>
              )}
              {complete && (
                <span className="text-[0.625rem] uppercase tracking-[0.15em] text-muted">
                  Done
                </span>
              )}
            </div>
            <p className="mt-3 text-lg font-light text-white">{config.label}</p>
            <p className="mt-1 text-xs text-muted">{formatSol(total)} pool</p>
            <div className="mt-4 flex gap-1">
              {Array.from({ length: CARS_PER_TIER }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 flex-1",
                    i < completed ? "bg-white" : "bg-white/15"
                  )}
                />
              ))}
            </div>
            <p className="mt-2 text-[0.625rem] text-dim">
              {unlocked
                ? `${completed}/${CARS_PER_TIER} spotted`
                : `Unlocks after Tier ${config.tier - 1}`}
            </p>
          </div>
        );
      })}
    </div>
  );
}
