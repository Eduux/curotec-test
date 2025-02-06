"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const nav = [
    {
      href: "/posts",
      title: "Posts",
    },
    {
      href: "/ecommerce",
      title: "E-commerce",
    },
  ];

  return (
    <nav
      className="flex items-center justify-center gap-x-4 mb-8"
      aria-label="Main Navigation"
    >
      {nav.map((n) => (
        <Link
          key={n.href}
          href={n.href}
          className={`border-b focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
            pathname === n.href ? "border-black" : ""
          }`}
          aria-current={pathname === n.href ? "page" : undefined}
        >
          {n.title}
        </Link>
      ))}
    </nav>
  );
}
