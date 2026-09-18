import Link from "next/link";
import Image from "next/image";
import { Clock, Heart, Users } from "lucide-react";
import type { Campaign } from "@/lib/data";
import { formatCurrency, calculateProgress } from "@/lib/utils";

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  const progress = calculateProgress(campaign.raised, campaign.goal);

  return (
    <Link
      href={`/campaigns/${campaign.id}`}
      className="group block bg-white rounded-2xl overflow-hidden card-shadow transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={campaign.image}
          alt={campaign.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold bg-white/90 backdrop-blur-sm rounded-full text-gray-700">
          {campaign.category}
        </span>
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-pink-600 transition-colors">
          {campaign.title}
        </h3>
        <p className="mt-1.5 text-sm text-gray-500 line-clamp-2">
          {campaign.description}
        </p>

        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1.5">
            <span className="font-semibold text-pink-600">
              {formatCurrency(campaign.raised)} raised
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

        <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {campaign.daysLeft} days left
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {campaign.supporters}
          </span>
          <Heart className="w-3.5 h-3.5 text-pink-300" />
        </div>
      </div>
    </Link>
  );
}
