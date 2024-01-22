'use client'
import { useRouter } from "next/router";

export default function GlobalError({ statusCode }: { statusCode: number }) {
  const router = useRouter();

  if (statusCode === 401) {
    // Perform logout logic
    router.push("/login");
  } else {
    return null; // Don't render for other errors
  }
}
