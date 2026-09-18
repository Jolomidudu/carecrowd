import Link from "next/link";
import { Gift, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-yellow-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-gray-900">Happy</span>
                <span className="text-yellow-500">gift</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
              Real people. Big dreams. Together. Start or support crowdfunding
              campaigns for the people and causes that matter.
            </p>
            <p className="mt-4 text-sm text-gray-400 flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> for
              humanity
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/campaigns" className="hover:text-yellow-600">
                  Explore Campaigns
                </Link>
              </li>
              <li>
                <Link href="/start" className="hover:text-yellow-600">
                  Start a Campaign
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-yellow-600">
                  How it Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <a href="#" className="hover:text-yellow-600">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-600">
                  Trust & Safety
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-600">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-yellow-50 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} CareCrowd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-yellow-600">
              Privacy
            </a>
            <a href="#" className="hover:text-yellow-600">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
