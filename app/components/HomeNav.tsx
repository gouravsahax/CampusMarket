'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const HomeNav = () => {
  const path = usePathname();

  return (
    <div className="my-4">
      <div className="inline-flex rounded-md border border-zinc-800 bg-zinc-900 p-1">
        <Link
          href="/"
          className={`px-4 py-1.5 rounded-sm text-sm transition ${
            path === "/" ? "bg-white text-black" : "text-zinc-300 hover:text-white"
          }`}
        >
          Feed
        </Link>

        <Link
          href="/following"
          className={`px-4 py-1.5 rounded-sm text-sm transition ${
            path === "/following"
              ? "bg-white text-black"
              : "text-zinc-300 hover:text-white"
          }`}
        >
          Following
        </Link>
      </div>
    </div>
  );
};

export default HomeNav;