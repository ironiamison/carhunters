import { BountyRequirements } from "@/lib/types";

export function RequirementsList({ req }: { req: BountyRequirements }) {
  return (
    <ul className="mt-5 space-y-2.5 text-sm text-neutral-400">
      <li>{req.minPhotos} photos minimum</li>
      {req.mustIncludeLocation && <li>Geo-tagged location</li>}
      {req.mustIncludePlate && <li>License plate visible</li>}
      {req.mustTagOnX && (
        <li>
          Tag{" "}
          <a
            href={`https://x.com/${req.xHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition hover:text-accent"
          >
            @{req.xHandle}
          </a>{" "}
          on X with your submission
        </li>
      )}
    </ul>
  );
}
