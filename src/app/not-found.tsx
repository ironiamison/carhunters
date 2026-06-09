import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center pt-16">
      <h1 className="text-2xl font-light text-white">Not found</h1>
      <Link href="/bounties" className="btn btn-solid mt-8">
        Bounties
      </Link>
    </div>
  );
}
