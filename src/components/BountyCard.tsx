import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";
import { formatSol, getTimeRemaining } from "@/lib/data";
import { isBountyUnlocked } from "@/lib/tiers";
import { Bounty } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BountyCardProps {
  bounty: Bounty;
  featured?: boolean;
  forceLocked?: boolean;
}

export function BountyCard({ bounty, featured, forceLocked }: BountyCardProps) {
  const locked = forceLocked ?? !isBountyUnlocked(bounty);
  const completed = bounty.status === "completed";

  if (featured) {
    return (
      <CardShell bounty={bounty} locked={locked} completed={completed}>
        <div className="relative aspect-[16/9] overflow-hidden bg-neutral-950">
          <CardImage bounty={bounty} featured locked={locked} />
          <CardOverlay featured locked={locked} />

          {!locked && (
            <div className="absolute left-6 top-6 lg:left-8 lg:top-8">
              <span className="inline-block bg-white px-3 py-1.5 text-[0.625rem] font-medium uppercase tracking-[0.15em] text-black">
                {formatSol(bounty.reward)}
              </span>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
            {locked ? (
              <LockedLabel tier={bounty.tier} />
            ) : (
              <>
                <p className="eyebrow text-white/60">{bounty.make}</p>
                <h3 className="mt-2 text-3xl font-light tracking-tight text-white lg:text-5xl">
                  {bounty.model}
                </h3>
                <div className="mt-4 flex items-end justify-between gap-4">
                  <p className="text-sm text-neutral-400">
                    {bounty.location}
                    {bounty.yearRange ? ` · ${bounty.yearRange}` : ""}
                  </p>
                  <p className="text-xs text-dim">
                    {completed ? "Completed" : getTimeRemaining(bounty.expiresAt)}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </CardShell>
    );
  }

  return (
    <CardShell bounty={bounty} locked={locked} completed={completed}>
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-950">
        <CardImage bounty={bounty} locked={locked} />
        <CardOverlay locked={locked} />

        {!locked && (
          <div className="absolute left-4 top-4">
            <span className="text-xs font-light tabular-nums text-white">
              {formatSol(bounty.reward)}
            </span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-5">
          {locked ? (
            <LockedLabel tier={bounty.tier} compact />
          ) : (
            <>
              <p className="eyebrow text-white/50">{bounty.make}</p>
              <h3 className="mt-1 line-clamp-2 text-lg font-light leading-snug tracking-tight text-white">
                {bounty.model}
              </h3>
              <div className="mt-3 flex items-center justify-between gap-2">
                <p className="text-xs text-neutral-500">{bounty.location}</p>
                {!completed && (
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-dim transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </CardShell>
  );
}

function CardShell({
  bounty,
  locked,
  completed,
  children,
}: {
  bounty: Bounty;
  locked: boolean;
  completed: boolean;
  children: React.ReactNode;
}) {
  const className = cn("group block", locked && "pointer-events-none");

  if (locked || completed) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Link href={`/bounties/${bounty.id}`} className={className}>
      {children}
    </Link>
  );
}

function CardImage({
  bounty,
  featured,
  locked,
}: {
  bounty: Bounty;
  featured?: boolean;
  locked: boolean;
}) {
  return (
    <Image
      src={bounty.imageUrl}
      alt={`${bounty.make} ${bounty.model}`}
      fill
      className={cn(
        "object-cover",
        !locked && "card-image",
        locked && "scale-105 blur-sm brightness-50 grayscale"
      )}
      sizes={
        featured
          ? "(max-width: 768px) 100vw, 1320px"
          : "(max-width: 768px) 100vw, 420px"
      }
      priority={featured}
    />
  );
}

function CardOverlay({ featured, locked }: { featured?: boolean; locked: boolean }) {
  return (
    <>
      <div
        className={cn(
          "absolute inset-0",
          featured
            ? "bg-gradient-to-t from-black via-black/25 to-transparent"
            : "bg-gradient-to-t from-black via-black/20 to-transparent"
        )}
      />
      {!locked && (
        <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/15" />
      )}
      {locked && <div className="absolute inset-0 bg-black/60" />}
    </>
  );
}

function LockedLabel({ tier, compact }: { tier: number; compact?: boolean }) {
  return (
    <div className={cn("flex items-center gap-3", compact && "flex-col items-start gap-2")}>
      <Lock className={cn("text-white/70", compact ? "h-4 w-4" : "h-5 w-5")} />
      <div>
        <p className={cn("font-light text-white", compact ? "text-sm" : "text-lg")}>
          Locked
        </p>
        <p className="text-xs text-neutral-500">
          Complete Tier {tier - 1} to unlock
        </p>
      </div>
    </div>
  );
}
