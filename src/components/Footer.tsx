import Link from "next/link";
import { Logo } from "@/components/Logo";

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
        <div className="flex gap-10">
          <Link href="/bounties" className="nav-link">
            Bounties
          </Link>
          <Link href="/create" className="nav-link">
            Post
          </Link>
          <Link href="/how-it-works" className="nav-link">
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}
