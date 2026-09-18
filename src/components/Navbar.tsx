"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Gift } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-gray-900">Happy</span>
              <span className="text-pink-500">gift</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/campaigns"
              className="text-sm font-medium text-gray-600 hover:text-pink-600 transition-colors"
            >
              Explore
            </Link>
            <Link
              href="/start"
              className="text-sm font-medium text-gray-600 hover:text-pink-600 transition-colors"
            >
              Start a Campaign
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm font-medium text-gray-600 hover:text-pink-600 transition-colors"
            >
              How it Works
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/campaigns"
              className="px-4 py-2 text-sm font-semibold text-pink-600 hover:text-pink-700 transition-colors"
            >
              Explore Campaigns
            </Link>
            <Link
              href="/start"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-pink-500 hover:bg-pink-600 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              Start a Campaign
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-pink-50"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-pink-100 bg-white">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/campaigns"
              className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-pink-50 font-medium"
              onClick={() => setOpen(false)}
            >
              Explore Campaigns
            </Link>
            <Link
              href="/start"
              className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-pink-50 font-medium"
              onClick={() => setOpen(false)}
            >
              Start a Campaign
            </Link>
            <Link
              href="/#how-it-works"
              className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-pink-50 font-medium"
              onClick={() => setOpen(false)}
            >
              How it Works
            </Link>
            <Link
              href="/start"
              className="block w-full text-center px-5 py-2.5 text-sm font-semibold text-white bg-pink-500 rounded-full"
              onClick={() => setOpen(false)}
            >
              Start a Campaign
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
