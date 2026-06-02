"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/70 backdrop-blur-md border-b border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
              Duracalc
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink href="/" currentPath={pathname}>Home</NavLink>
              <NavLink href="/basic-calculator" currentPath={pathname}>Basic</NavLink>
              <NavLink href="/emi-calculator" currentPath={pathname}>EMI</NavLink>
              <NavLink href="/percentage-calculator" currentPath={pathname}>Percentage</NavLink>
            </div>
          </div>
          {/* Mobile menu button could go here, but for now we keep it simple */}
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, currentPath, children }: { href: string; currentPath: string; children: React.ReactNode }) {
  const isActive = currentPath === href || (href !== "/" && currentPath?.startsWith(href));
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? "bg-zinc-800 text-white"
          : "text-zinc-300 hover:bg-zinc-800/50 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}
