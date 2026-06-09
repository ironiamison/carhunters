import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Lock } from "lucide-react";
import {
  formatSol,
  formatRelativeTime,
  getBountyById,
  getTimeRemaining,
  statusConfig,
} from "@/lib/data";
import { getTierConfig, isBountyUnlocked } from "@/lib/tiers";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BountyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const bounty = getBountyById(id);
  if (!bounty) notFound();

  const locked = !isBountyUnlocked(bounty);
  const status = statusConfig[bounty.status];
  const req = bounty.requirements;
  const tierConfig = getTierConfig(bounty.tier);

  return (
    <div className="pt-16">
      <div className="relative h-[55vh] min-h-[400px] max-h-[640px]">
        <Image
          src={bounty.imageUrl}
          alt={`${bounty.make} ${bounty.model}`}
          fill
          priority
          className={`object-cover ${locked ? "blur-sm brightness-50 grayscale" : ""}`}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20" />
        {locked && <div className="absolute inset-0 bg-black/50" />}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container-main pb-10">
            <p className="eyebrow text-white/60">
              Tier {bounty.tier} · {tierConfig.label}
            </p>
            {locked ? (
              <div className="mt-4 flex items-center gap-3">
                <Lock className="h-6 w-6 text-white/70" />
                <h1 className="headline-sm">Locked</h1>
              </div>
            ) : (
              <>
                <p className="eyebrow mt-2 text-white/60">{bounty.make}</p>
                <h1 className="headline-sm mt-2 max-w-3xl">{bounty.model}</h1>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container-main pb-24 lg:pb-32">
        <Link
          href="/bounties"
          className="inline-flex items-center gap-2 pt-8 text-xs uppercase tracking-[0.15em] text-muted transition hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All bounties
        </Link>

        {locked ? (
          <div className="mt-10 max-w-lg">
            <p className="text-sm leading-relaxed text-neutral-400">
              This bounty is part of Tier {bounty.tier}. Complete all four cars in
              Tier {bounty.tier - 1} to unlock this group.
            </p>
            <p className="mt-6 text-sm text-muted">
              Reward when unlocked: {formatSol(bounty.reward)}
            </p>
            <Link href="/bounties" className="btn btn-outline mt-10 inline-flex">
              View active tier
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-16 lg:grid-cols-[1fr_300px] lg:gap-20">
            <div>
              <p className="text-sm text-muted">
                {status.label}
                {bounty.yearRange ? ` · ${bounty.yearRange}` : ""}
                {bounty.color ? ` · ${bounty.color}` : ""}
              </p>

              <p className="mt-10 max-w-xl text-sm leading-[1.85] text-neutral-400">
                {bounty.description}
              </p>

              <dl className="mt-12 grid gap-8 border-t border-border-subtle pt-10 sm:grid-cols-3">
                <div>
                  <dt className="eyebrow">Location</dt>
                  <dd className="mt-2 text-sm text-white">{bounty.location}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Expires</dt>
                  <dd className="mt-2 text-sm text-white">
                    {getTimeRemaining(bounty.expiresAt)}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Submissions</dt>
                  <dd className="mt-2 text-sm text-white">{bounty.submissions}</dd>
                </div>
              </dl>

              <div className="mt-12 border-t border-border-subtle pt-10">
                <p className="eyebrow">Requirements</p>
                <ul className="mt-5 space-y-2.5 text-sm text-neutral-400">
                  <li>{req.minPhotos}+ photos</li>
                  {req.mustIncludeLocation && <li>Geo-tagged location</li>}
                  {req.mustIncludePlate && <li>License plate visible</li>}
                  {req.mustBeMoving && <li>Car in motion</li>}
                </ul>
                {req.notes && (
                  <p className="mt-6 text-sm text-muted">{req.notes}</p>
                )}
              </div>
            </div>

            <div>
              <div className="sticky top-24 border border-border bg-surface p-8">
                <p className="eyebrow">Reward</p>
                <p className="mt-3 text-4xl font-light tabular-nums text-white">
                  {formatSol(bounty.reward)}
                </p>
                <p className="mt-2 text-xs text-dim">Held in escrow</p>
                {bounty.status === "open" && (
                  <button type="button" className="btn btn-solid mt-8 w-full">
                    Submit spot
                  </button>
                )}
                <p className="mt-8 border-t border-border-subtle pt-6 text-xs text-dim">
                  @{bounty.postedBy} · {formatRelativeTime(bounty.postedAt)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
