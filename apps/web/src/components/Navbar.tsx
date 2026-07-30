"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFFFFF]/70 backdrop-blur-md border-b border-[#E5E7EB]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-[#2563EB] to-blue-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
              Duracalc
            </Link>
          </div>
          <div className="hidden md:block flex-1">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink href="/" currentPath={pathname}>Home</NavLink>
              <NavLink href="/basic-calculator" currentPath={pathname}>Basic</NavLink>
              <NavLink href="/emi-calculator" currentPath={pathname}>EMI</NavLink>
              <NavLink href="/percentage-calculator" currentPath={pathname}>Percentage</NavLink>
            </div>
          </div>
          <div className="flex items-center ml-auto">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert('Mobile app download link will be available soon!');
              }}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-all bg-[#2563EB] rounded-full hover:shadow-[0_0_15px_rgba(37,99,235,0.5)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 focus:ring-offset-white"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Get App
            </a>
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
          ? "bg-[#E5E7EB] text-[#2563EB]"
          : "text-gray-600 hover:bg-gray-100 hover:text-[#2563EB]"
      }`}
    >
      {children}
    </Link>
  );
}
