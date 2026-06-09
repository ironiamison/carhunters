export type BountyStatus = "open" | "claimed" | "review" | "completed" | "expired";
export type BountyRarity = "common" | "uncommon" | "rare" | "legendary" | "unicorn";
export type BountyCategory =
  | "exotic"
  | "classic"
  | "jdm"
  | "european"
  | "muscle"
  | "supercar"
  | "hypercar"
  | "prototype"
  | "one-off";

export interface BountyRequirements {
  minPhotos: number;
  mustIncludePlate: boolean;
  mustIncludeLocation: boolean;
  mustBeMoving: boolean;
  mustTagOnX: boolean;
  xHandle: string;
  notes?: string;
}

export type BountyTier = 1 | 2 | 3 | 4;

export interface Bounty {
  id: string;
  title: string;
  description: string;
  make: string;
  model: string;
  yearRange?: string;
  color?: string;
  category: BountyCategory;
  rarity: BountyRarity;
  tier: BountyTier;
  reward: number; // SOL
  location: string;
  radiusMiles?: number;
  status: BountyStatus;
  postedBy: string;
  postedByAvatar: string;
  postedAt: string;
  expiresAt: string;
  submissions: number;
  views: number;
  requirements: BountyRequirements;
  tags: string[];
  featured?: boolean;
  imageUrl: string;
}

export interface Spotter {
  id: string;
  username: string;
  avatar: string;
  totalEarned: number;
  spotsCompleted: number;
  reputation: number;
  specialty: BountyCategory;
}

export interface Submission {
  id: string;
  bountyId: string;
  spotterId: string;
  spotterUsername: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  location: string;
  imageUrl: string;
}

export interface PlatformStats {
  activeBounties: number;
  totalPaidOut: number;
  spottersOnline: number;
  spotsThisWeek: number;
}
