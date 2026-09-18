import { NextRequest, NextResponse } from "next/server";
import { campaigns } from "@/lib/data";

// In-memory store for demo (resets on server restart)
const store = [...campaigns];
let nextId = campaigns.length + 1;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const q = searchParams.get("q")?.toLowerCase();

  let result = store;

  if (category && category !== "All") {
    result = result.filter((c) => c.category === category);
  }

  if (q) {
    result = result.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      category,
      goal,
      description,
      longDescription,
      creatorName,
      location,
    } = body;

    if (!title || !goal || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newCampaign = {
      id: String(nextId++),
      title,
      description,
      longDescription: longDescription || description,
      image:
        "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80",
      category: category || "Other",
      raised: 0,
      goal: Number(goal),
      daysLeft: 30,
      supporters: 0,
      creator: {
        name: creatorName || "Anonymous",
        avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
        location: location || "Unknown",
      },
    };

    store.unshift(newCampaign);

    return NextResponse.json(newCampaign, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
