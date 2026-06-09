import { cn } from "@/lib/utils";

const X_URL = "https://x.com/carhunterssol";

interface XLinkProps {
  className?: string;
  iconClassName?: string;
}

export function XLink({ className, iconClassName }: XLinkProps) {
  return (
    <a
      href={X_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Carhunters on X"
      className={cn(
        "text-muted transition hover:text-white",
        className
      )}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className={cn("h-4 w-4 fill-current", iconClassName)}
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    </a>
  );
}
