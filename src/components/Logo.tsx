import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "header" | "footer";
}

export function Logo({ className, variant = "header" }: LogoProps) {
  const height = variant === "header" ? 26 : 22;

  return (
    <Link href="/" className={cn("relative block shrink-0", className)}>
      <Image
        src="/logo.png"
        alt="Carhunters"
        width={875}
        height={81}
        priority={variant === "header"}
        style={{ height, width: "auto" }}
        className="object-contain object-left"
      />
    </Link>
  );
}
