import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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

          <div className="absolute left-6 top-6 lg:left-8 lg:top-8">
            {locked ? (
              <span className="inline-block border border-white/20 bg-black/50 px-3 py-1.5 text-[0.625rem] font-medium uppercase tracking-[0.15em] text-white/80 backdrop-blur-sm">
                Upcoming
              </span>
            ) : (
              <span className="inline-block bg-white px-3 py-1.5 text-[0.625rem] font-medium uppercase tracking-[0.15em] text-black">
                {formatSol(bounty.reward)}
              </span>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
            <p className={cn("eyebrow", locked ? "text-white/50" : "text-white/60")}>
              {bounty.make}
            </p>
            <h3
              className={cn(
                "mt-2 text-3xl font-light tracking-tight lg:text-5xl",
                locked ? "text-white/85" : "text-white"
              )}
            >
              {bounty.model}
            </h3>
            <div className="mt-4 flex items-end justify-between gap-4">
              {locked ? (
                <>
                  <p className="text-sm text-neutral-500">
                    {formatSol(bounty.reward)} · {bounty.location}
                  </p>
                  <p className="text-xs text-dim">
                    Tier {bounty.tier} · Unlocks after Tier {bounty.tier - 1}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm text-neutral-400">
                    {bounty.location}
                    {bounty.yearRange ? ` · ${bounty.yearRange}` : ""}
                  </p>
                  <p className="text-xs text-dim">
                    {completed ? "Completed" : getTimeRemaining(bounty.expiresAt)}
                  </p>
                </>
              )}
            </div>
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

        <div className="absolute left-4 top-4">
          {locked ? (
            <span className="text-[0.625rem] font-medium uppercase tracking-[0.15em] text-white/70">
              Upcoming
            </span>
          ) : (
            <span className="text-xs font-light tabular-nums text-white">
              {formatSol(bounty.reward)}
            </span>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className={cn("eyebrow", locked ? "text-white/45" : "text-white/50")}>
            {bounty.make}
          </p>
          <h3
            className={cn(
              "mt-1 line-clamp-2 text-lg font-light leading-snug tracking-tight",
              locked ? "text-white/85" : "text-white"
            )}
          >
            {bounty.model}
          </h3>
          <div className="mt-3 flex items-center justify-between gap-2">
            {locked ? (
              <p className="text-xs text-neutral-500">
                {formatSol(bounty.reward)} · Tier {bounty.tier}
              </p>
            ) : (
              <>
                <p className="text-xs text-neutral-500">{bounty.location}</p>
                {!completed && (
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-dim transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                )}
              </>
            )}
          </div>
          {locked && (
            <p className="mt-2 text-[0.625rem] text-dim">
              Unlocks after Tier {bounty.tier - 1}
            </p>
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
  if (completed) {
    return <div className="group block">{children}</div>;
  }

  return (
    <Link
      href={`/bounties/${bounty.id}`}
      className={cn("group block", locked && "cursor-default")}
    >
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
        locked && "scale-105 brightness-[0.35] saturate-50"
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
            : "bg-gradient-to-t from-black via-black/20 to-transparent",
          locked && "from-black via-black/50 to-black/20"
        )}
      />
      {!locked && (
        <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/15" />
      )}
      {locked && <div className="absolute inset-0 bg-black/40" />}
    </>
  );
}
