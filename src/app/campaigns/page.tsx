import { CampaignCard } from "@/components/CampaignCard";
import { campaigns, categories, getCampaignsByCategory } from "@/lib/data";
import Link from "next/link";
import { Search } from "lucide-react";

export const metadata = {
  title: "Explore Campaigns – CareCrowd",
  description: "Browse and support crowdfunding campaigns on CareCrowd.",
};

type Props = {
  searchParams: Promise<{ category?: string; q?: string }>;
};

export default async function CampaignsPage({ searchParams }: Props) {
  const params = await searchParams;
  const category = params.category || "All";
  const query = params.q?.toLowerCase() || "";

  let filtered = getCampaignsByCategory(category);
  if (query) {
    filtered = filtered.filter(
      (c) =>
        c.title.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.category.toLowerCase().includes(query)
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Explore Campaigns
        </h1>
        <p className="mt-2 text-gray-500">
          Discover real people and causes that need your support
        </p>
      </div>

      {/* Search */}
      <form className="mb-8">
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="search"
            name="q"
            defaultValue={params.q}
            placeholder="Search for campaigns, people or causes..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-yellow-100 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent shadow-sm"
          />
        </div>
      </form>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        <Link
          href="/campaigns"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            category === "All"
              ? "bg-yellow-500 text-white"
              : "bg-white text-gray-600 border border-yellow-100 hover:bg-yellow-50"
          }`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/campaigns?category=${cat.name}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === cat.name
                ? "bg-yellow-500 text-white"
                : "bg-white text-gray-600 border border-yellow-100 hover:bg-yellow-50"
            }`}
          >
            {cat.icon} {cat.name}
          </Link>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No campaigns found.</p>
          <Link
            href="/campaigns"
            className="mt-4 inline-block text-yellow-600 font-semibold hover:underline"
          >
            Clear filters
          </Link>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-6">
            Showing {filtered.length} campaign{filtered.length !== 1 ? "s" : ""}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c) => (
              <CampaignCard key={c.id} campaign={c} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
