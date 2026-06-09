import Link from "next/link";
import { Logo } from "@/components/Logo";
import { XLink } from "@/components/XLink";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border-subtle">
      <div className="container-main flex flex-col items-start gap-10 py-14 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Logo variant="footer" />
          <p className="mt-4 max-w-xs text-sm text-muted">
            Car spotting bounties. Verified proof. SOL payouts from escrow.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-10">
          <Link href="/bounties" className="nav-link">
            Bounties
          </Link>
          <Link href="/how-it-works" className="nav-link">
            About
          </Link>
          <XLink className="flex items-center" iconClassName="h-[0.9rem] w-[0.9rem]" />
        </div>
      </div>
    </footer>
  );
}
