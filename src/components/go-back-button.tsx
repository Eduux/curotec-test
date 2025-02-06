"use client";

import { useRouter } from "next/navigation";
import Button from "./button";

export default function GoBackButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()}>
      <span className="text-lg mr-2">←</span> Go Back
    </Button>
  );
}
