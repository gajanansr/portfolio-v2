"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ route, label }: { route: string; label: string }) => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <Link
      href={route}
      className={`px-4 py-2 text-sm font-medium ease-in-out rounded-full transition-all cursor-pointer ${
        isActive(route)
          ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
          : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-900/5 dark:hover:bg-white/10"
      }`}
    >
      {label}
    </Link>
  );
};

export default NavLink;
