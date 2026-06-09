"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { XLink } from "@/components/XLink";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/bounties", label: "Bounties" },
  { href: "/how-it-works", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        isHome && !scrolled
          ? "border-b border-white/5 bg-black/30 backdrop-blur-xl"
          : "border-b border-border-subtle bg-black/90 backdrop-blur-xl"
      )}
    >
      <div className="container-main flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-active={
                pathname === link.href || pathname.startsWith(link.href + "/")
                  ? "true"
                  : undefined
              }
              className="nav-link"
            >
              {link.label}
            </Link>
          ))}
          <XLink className="flex items-center" />
        </nav>

        <div className="flex items-center gap-4 lg:hidden">
          <XLink className="flex items-center" />
        <button
          type="button"
          className="text-muted"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border-subtle bg-black px-8 py-8 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="nav-link block py-4"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
