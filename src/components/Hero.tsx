import Image from "next/image";
import Link from "next/link";
import { formatSol } from "@/lib/data";
import {
  getActiveTier,
  getBountiesByTier,
  getMarketStats,
  getTierConfig,
  isBountyUnlocked,
} from "@/lib/tiers";

export function Hero() {
  const stats = getMarketStats();
  const activeTier = getActiveTier();
  const tierConfig = getTierConfig(activeTier);
  const liveBounties = getBountiesByTier(activeTier)
    .filter((b) => isBountyUnlocked(b) && b.status === "open")
    .slice(0, 4);

  return (
    <section className="relative min-h-[100svh]">
      <Image
        src="/cars/hero.jpg"
        alt="McLaren F1"
        fill
        priority
        className="object-cover object-[center_35%]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/10 to-black" />

      <div className="absolute inset-0 flex flex-col justify-between pb-0 pt-16">
        <div className="container-main flex flex-1 flex-col justify-end pb-16 lg:pb-20">
          <p className="eyebrow text-white/60">
            Tier {activeTier} · {tierConfig.label}
          </p>
          <h1 className="headline mt-5 max-w-4xl">
            Spot rare cars.
            <br />
            <span className="text-white/90">Unlock the next tier.</span>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-neutral-400">
            Four tiers. Four cars each. Complete every car in a tier to unlock
            the next group. Rewards scale in SOL.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/10 pt-8">
            <Stat label="Active tier" value={`${activeTier} / 4`} />
            <Stat label="Tier pool" value={formatSol(stats.totalSol)} />
            <Stat label="Top reward" value={formatSol(stats.topReward)} />
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link href="/bounties" className="btn btn-solid">
              View bounties
            </Link>
            <Link
              href="/how-it-works"
              className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400 transition hover:text-white"
            >
              How tiers work
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 bg-black/50 backdrop-blur-md">
          <div className="container-main flex items-center gap-6 py-4">
            <span className="shrink-0 text-[0.625rem] font-medium uppercase tracking-[0.2em] text-accent">
              Tier {activeTier}
            </span>
            <div className="scrollbar-hide flex gap-8 overflow-x-auto">
              {liveBounties.map((bounty) => (
                <Link
                  key={bounty.id}
                  href={`/bounties/${bounty.id}`}
                  className="group flex shrink-0 items-center gap-4"
                >
                  <span className="text-xs text-neutral-400 transition group-hover:text-white">
                    {bounty.make} {bounty.model}
                  </span>
                  <span className="text-xs tabular-nums text-white">
                    {formatSol(bounty.reward)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[0.625rem] uppercase tracking-[0.18em] text-dim">{label}</p>
      <p className="mt-1 text-lg font-light tabular-nums text-white">{value}</p>
    </div>
  );
}
