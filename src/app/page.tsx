import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Users,
  Shield,
  Zap,
  ArrowRight,
  Gift,
  Search,
} from "lucide-react";
import { CampaignCard } from "@/components/CampaignCard";
import {
  getFeaturedCampaign,
  getPopularCampaigns,
  categories,
} from "@/lib/data";
import { formatCurrency, calculateProgress } from "@/lib/utils";

export default function HomePage() {
  const featured = getFeaturedCampaign();
  const popular = getPopularCampaigns(3);
  const progress = calculateProgress(featured.raised, featured.goal);

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-100 text-pink-700 text-sm font-medium mb-6">
                <Gift className="w-4 h-4" />
                Give · Support · Celebrate
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
                Real people.
                <br />
                Big dreams.
                <br />
                <span className="text-pink-500">Together.</span>
              </h1>

              <p className="mt-6 text-lg text-gray-600 max-w-lg leading-relaxed">
                Start or support crowdfunding campaigns for the people and
                causes that matter. Because every gift makes a difference.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/campaigns"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full shadow-lg shadow-pink-200 transition-all hover:shadow-xl hover:-translate-y-0.5"
                >
                  Explore Campaigns
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/start"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-pink-50 text-pink-600 font-semibold rounded-full border-2 border-pink-200 transition-all"
                >
                  <Gift className="w-4 h-4" />
                  Start a Campaign
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Heart, label: "Support Real People" },
                  { icon: Users, label: "Fund Big Dreams" },
                  { icon: Shield, label: "Safe & Secure" },
                  { icon: Zap, label: "Fast & Easy" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center text-center gap-2 p-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-pink-500" />
                    </div>
                    <span className="text-xs font-medium text-gray-600">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured campaign card */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-4 bg-gradient-to-br from-pink-200 to-rose-100 rounded-[2.5rem] blur-xl opacity-60" />
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-pink-100">
                  <div className="relative h-56">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      className="object-cover"
                      priority
                      sizes="400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-xs font-semibold uppercase tracking-wider opacity-90">
                        Make a Difference
                      </span>
                      <h2 className="text-xl font-bold mt-1 line-clamp-2">
                        {featured.title}
                      </h2>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {featured.description}
                    </p>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-bold text-pink-600">
                          {formatCurrency(featured.raised)} raised
                        </span>
                        <span className="text-gray-400">{progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    <Link
                      href={`/campaigns/${featured.id}`}
                      className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl transition-colors"
                    >
                      Support Now
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Campaigns */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Popular Campaigns
              </h2>
              <p className="mt-1 text-gray-500">
                Causes people are supporting right now
              </p>
            </div>
            <Link
              href="/campaigns"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-pink-600 hover:text-pink-700"
            >
              See all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popular.map((c) => (
              <CampaignCard key={c.id} campaign={c} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/campaigns"
              className="inline-flex items-center gap-1 text-sm font-semibold text-pink-600"
            >
              See all campaigns
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2">
            Browse by Category
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Find a cause that speaks to you
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/campaigns?category=${cat.name}`}
                className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl card-shadow hover:-translate-y-1 transition-all"
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="font-semibold text-gray-800">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2">
            How CareCrowd Works
          </h2>
          <p className="text-center text-gray-500 mb-12">
            Three simple steps to make a difference
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create or Discover",
                desc: "Start your own campaign in minutes or browse thousands of real stories.",
              },
              {
                step: "02",
                title: "Share & Support",
                desc: "Share with friends and family. Donate securely with just a few clicks.",
              },
              {
                step: "03",
                title: "Celebrate Impact",
                desc: "Watch the progress, thank supporters, and celebrate every gift.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100"
              >
                <span className="text-4xl font-bold text-pink-200">
                  {item.step}
                </span>
                <h3 className="mt-2 text-xl font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Ready to make someone&apos;s day?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Join thousands of people who are turning dreams into reality.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/start"
              className="inline-flex items-center gap-2 px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full shadow-lg shadow-pink-200 transition-all"
            >
              Start a Campaign
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/campaigns"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-pink-600 font-semibold rounded-full border-2 border-pink-200 hover:bg-pink-50 transition-all"
            >
              <Search className="w-5 h-5" />
              Explore Campaigns
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
