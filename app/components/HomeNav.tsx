'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const HomeNav = () => {
  const path = usePathname();

  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // near top -> always show
      if (currentScrollY < 20) {
        setShowNav(true);
        lastScrollY = currentScrollY;
        return;
      }

      // scrolling down -> hide
      if (currentScrollY > lastScrollY) {
        setShowNav(false);
      }
      // scrolling up -> show
      else if (currentScrollY < lastScrollY) {
        setShowNav(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-40 w-full flex justify-center transition-transform duration-300 ${
        showNav ? "translate-y-0" : "-translate-y-[120%]"
      }`}
    >
      <div className="my-4 inline-flex rounded-md border border-zinc-800 bg-zinc-900 p-1 shadow-md">
        <Link
          href="/"
          className={`px-4 py-1.5 rounded-sm text-sm transition ${
            path === "/"
              ? "bg-white text-black"
              : "text-zinc-300 hover:text-white"
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