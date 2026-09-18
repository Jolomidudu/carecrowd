export type Campaign = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  category: "Education" | "Health" | "Animals" | "Personal" | "Other";
  raised: number;
  goal: number;
  daysLeft: number;
  supporters: number;
  creator: {
    name: string;
    avatar: string;
    location: string;
  };
  featured?: boolean;
};

export const categories = [
  { name: "Education", icon: "🎓", color: "bg-blue-100 text-blue-700" },
  { name: "Health", icon: "❤️", color: "bg-red-100 text-red-700" },
  { name: "Animals", icon: "🐾", color: "bg-amber-100 text-amber-700" },
  { name: "Personal", icon: "👤", color: "bg-purple-100 text-purple-700" },
  { name: "Other", icon: "✨", color: "bg-gray-100 text-gray-700" },
] as const;

export const campaigns: Campaign[] = [
  {
    id: "1",
    title: "Help Aisha Get Back to School",
    description:
      "Give Aisha the chance to continue her education and build a brighter future.",
    longDescription:
      "Aisha is a bright and determined 10-year-old with big dreams. Her family can't afford her school fees, but with your support, she can continue her education and achieve her goals. Every contribution helps cover tuition, books, uniforms, and transportation so Aisha can stay in school and chase her dream of becoming a doctor one day.",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
    category: "Education",
    raised: 3240,
    goal: 5000,
    daysLeft: 12,
    supporters: 198,
    creator: {
      name: "Grace Okafor",
      avatar: "https://i.pravatar.cc/150?u=grace",
      location: "Lagos, Nigeria",
    },
    featured: true,
  },
  {
    id: "2",
    title: "Save Bella's Vet Bills",
    description:
      "Bella the golden retriever needs urgent surgery. Help us cover the medical costs.",
    longDescription:
      "Bella is a loving 5-year-old golden retriever who recently developed a serious hip condition. The recommended surgery costs $5,000 and her family is struggling to cover it. Your donation will go directly toward veterinary bills, medication, and post-op care so Bella can run and play again.",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80",
    category: "Animals",
    raised: 1850,
    goal: 5000,
    daysLeft: 20,
    supporters: 87,
    creator: {
      name: "Sarah Mitchell",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      location: "Austin, TX",
    },
  },
  {
    id: "3",
    title: "Dream Trip for My Mom",
    description:
      "Help me send my mom on the trip of a lifetime after years of hard work.",
    longDescription:
      "My mom has spent the last 30 years working double shifts to raise three kids alone. She has never taken a real vacation. I want to surprise her with a trip to the mountains she has always dreamed of. Funds will cover flights, lodging, and a few special experiences.",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    category: "Personal",
    raised: 5600,
    goal: 7200,
    daysLeft: 15,
    supporters: 312,
    creator: {
      name: "James Rivera",
      avatar: "https://i.pravatar.cc/150?u=james",
      location: "Chicago, IL",
    },
  },
  {
    id: "4",
    title: "Medical Fund for Little Kai",
    description:
      "Kai needs specialized treatment for a rare condition. Every dollar helps.",
    longDescription:
      "Kai is only 4 years old and was recently diagnosed with a rare genetic disorder. The treatment plan is expensive and insurance only covers a portion. We need community support to give Kai the best chance at a healthy childhood.",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
    category: "Health",
    raised: 12400,
    goal: 25000,
    daysLeft: 28,
    supporters: 456,
    creator: {
      name: "Elena Park",
      avatar: "https://i.pravatar.cc/150?u=elena",
      location: "Seattle, WA",
    },
  },
  {
    id: "5",
    title: "Rebuild After the Flood",
    description:
      "Our family lost everything in the recent floods. Help us start over.",
    longDescription:
      "The floods destroyed our home and most of our belongings. We are currently staying with relatives while we try to rebuild. Your support will help with temporary housing, replacing essentials, and beginning repairs so we can return home.",
    image:
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80",
    category: "Other",
    raised: 8900,
    goal: 15000,
    daysLeft: 18,
    supporters: 203,
    creator: {
      name: "Marcus Thompson",
      avatar: "https://i.pravatar.cc/150?u=marcus",
      location: "New Orleans, LA",
    },
  },
  {
    id: "6",
    title: "College Fund for First-Gen Student",
    description:
      "Help a first-generation student pursue higher education and break the cycle.",
    longDescription:
      "I am the first in my family to attend college. Scholarships cover tuition but not books, housing, or living expenses. Your contribution will help me focus on studies instead of working multiple jobs.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    category: "Education",
    raised: 4100,
    goal: 8000,
    daysLeft: 45,
    supporters: 156,
    creator: {
      name: "Amina Hassan",
      avatar: "https://i.pravatar.cc/150?u=amina",
      location: "Minneapolis, MN",
    },
  },
];

export function getCampaignById(id: string): Campaign | undefined {
  return campaigns.find((c) => c.id === id);
}

export function getFeaturedCampaign(): Campaign {
  return campaigns.find((c) => c.featured) || campaigns[0];
}

export function getPopularCampaigns(limit = 6): Campaign[] {
  return [...campaigns].sort((a, b) => b.supporters - a.supporters).slice(0, limit);
}

export function getCampaignsByCategory(category: string): Campaign[] {
  if (!category || category === "All") return campaigns;
  return campaigns.filter((c) => c.category === category);
}
