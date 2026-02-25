"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./const";

export const Header = () => {
  const pathname = usePathname();
  return (
    <div className=" sticky top-0 z-10">
      <nav className="flex justify-around items-center h-14 border-b border-gray-100">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`${
                isActive
                  ? "text-pink-500 font-semibold border-b-2 border-pink-500"
                  : "text-gray-500"
              } pb-1 transition-colors duration-300`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}