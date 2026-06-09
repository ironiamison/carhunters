import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function bountyImage(id: string): string {
  return `/cars/${id}.jpg`;
}
