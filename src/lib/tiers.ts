import { bounties } from "./data";
import { Bounty, BountyTier } from "./types";

export const CARS_PER_TIER = 4;
export const TIER_COUNT = 4;

export interface TierConfig {
  tier: BountyTier;
  label: string;
  rewards: [number, number, number, number];
}

/** Four tiers, four reward values each. Tier 1 totals under 2 SOL. */
export const TIER_CONFIG: TierConfig[] = [
  { tier: 1, label: "Street", rewards: [0.25, 0.35, 0.5, 0.75] },
  { tier: 2, label: "Sport", rewards: [1, 1.25, 1.5, 2] },
  { tier: 3, label: "Super", rewards: [2.5, 3, 3.5, 4] },
  { tier: 4, label: "Hyper", rewards: [5, 6, 8, 10] },
];

export function getTierConfig(tier: BountyTier): TierConfig {
  return TIER_CONFIG.find((t) => t.tier === tier)!;
}

export function getBountiesByTier(tier: BountyTier): Bounty[] {
  return bounties
    .filter((b) => b.tier === tier)
    .sort((a, b) => a.reward - b.reward);
}

export function getTierCompletedCount(tier: BountyTier): number {
  return getBountiesByTier(tier).filter((b) => b.status === "completed").length;
}

export function isTierComplete(tier: BountyTier): boolean {
  const group = getBountiesByTier(tier);
  return group.length === CARS_PER_TIER && group.every((b) => b.status === "completed");
}

export function isTierUnlocked(tier: BountyTier): boolean {
  if (tier === 1) return true;
  return isTierComplete((tier - 1) as BountyTier);
}

export function isBountyUnlocked(bounty: Bounty): boolean {
  return isTierUnlocked(bounty.tier);
}

export function getActiveTier(): BountyTier {
  for (let t = 1; t <= TIER_COUNT; t++) {
    const tier = t as BountyTier;
    if (!isTierComplete(tier)) return tier;
  }
  return TIER_COUNT;
}

export function getUnlockedBounties(): Bounty[] {
  return bounties.filter(isBountyUnlocked);
}

export function getLockedBounties(): Bounty[] {
  return bounties.filter((b) => !isBountyUnlocked(b));
}

export function getMarketStats() {
  const unlocked = getUnlockedBounties().filter((b) => b.status === "open");
  return {
    openCount: unlocked.length,
    totalSol: unlocked.reduce((sum, b) => sum + b.reward, 0),
    topReward: unlocked.length ? Math.max(...unlocked.map((b) => b.reward)) : 0,
    activeTier: getActiveTier(),
  };
}

export function getTierRewardTotal(tier: BountyTier): number {
  return getTierConfig(tier).rewards.reduce((sum, r) => sum + r, 0);
}
