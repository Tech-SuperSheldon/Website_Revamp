"use client";
import { useRouter } from "next/navigation";

export function useOpenDemoBooking() {
  const router = useRouter();
  return () => router.push("/demo"); 
}
