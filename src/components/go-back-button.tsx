"use client";

import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
    >
      <span className="text-lg mr-2">←</span> Go Back
    </button>
  );
}
