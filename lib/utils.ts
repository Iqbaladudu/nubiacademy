import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toIDRFormat(price?: number) {
  return (
    price &&
    price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    })
  );
}

export function splitName(fullName: string) {
  // Split the full name into an array of words
  const nameParts = fullName.trim().split(/\s+/)

  // If there's only one name, treat it as both first and last
  if (nameParts.length === 1) {
    return {
      firstName: nameParts[0],
      lastName: '',
    }
  }

  // Otherwise, the first element is the first name, and the rest are the last name
  return {
    firstName: nameParts[0],
    lastName: nameParts.slice(1).join(' '),
  }
}