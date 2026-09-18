import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Users,
  Share2,
  Heart,
  MapPin,
} from "lucide-react";
import { getCampaignById, campaigns } from "@/lib/data";
import { formatCurrency, calculateProgress } from "@/lib/utils";
import { DonateButton } from "@/components/DonateButton";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return campaigns.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const campaign = getCampaignById(id);
  if (!campaign) return { title: "Campaign Not Found" };
  return {
    title: `${campaign.title} – CareCrowd`,
    description: campaign.description,
  };
}

export default async function CampaignDetailPage({ params }: Props) {
  const { id } = await params;
  const campaign = getCampaignById(id);
  if (!campaign) notFound();

  const progress = calculateProgress(campaign.raised, campaign.goal);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/campaigns"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-pink-600 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to campaigns
      </Link>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Main content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="relative aspect-video rounded-2xl overflow-hidden">
            <Image
              src={campaign.image}
              alt={campaign.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-pink-100 text-pink-700 rounded-full">
              {campaign.category}
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
              {campaign.title}
            </h1>
            <p className="mt-3 text-lg text-gray-600">{campaign.description}</p>
          </div>

          <div className="prose prose-pink max-w-none">
            <h2 className="text-xl font-bold text-gray-900">About the campaign</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {campaign.longDescription}
            </p>
          </div>

          {/* Creator */}
          <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-pink-100">
            <Image
              src={campaign.creator.avatar}
              alt={campaign.creator.name}
              width={56}
              height={56}
              className="rounded-full"
            />
            <div>
              <p className="text-sm text-gray-500">Campaign by</p>
              <p className="font-semibold text-gray-900">
                {campaign.creator.name}
              </p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {campaign.creator.location}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 bg-white rounded-2xl border border-pink-100 p-6 shadow-lg shadow-pink-50">
            <div className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-2xl font-bold text-pink-600">
                  {formatCurrency(campaign.raised)}
                </span>
                <span className="text-sm text-gray-400">
                  of {formatCurrency(campaign.goal)}
                </span>
              </div>
              <div className="progress-bar mb-2">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm font-medium text-gray-500">{progress}% funded</p>
            </div>

            <div className="flex gap-4 text-sm text-gray-500 mb-6">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {campaign.daysLeft} days left
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                {campaign.supporters} supporters
              </span>
            </div>

            <DonateButton campaignId={campaign.id} />

            <div className="mt-4 flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-pink-100 text-sm font-medium text-gray-600 hover:bg-pink-50 transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button className="flex items-center justify-center w-11 h-11 rounded-xl border border-pink-100 text-pink-500 hover:bg-pink-50 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <p className="mt-6 text-xs text-center text-gray-400">
              CareCrowd guarantees secure payments. 100% of your donation goes
              to the campaign (minus standard processing fees).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
