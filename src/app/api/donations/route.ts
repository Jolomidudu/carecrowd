import { NextRequest, NextResponse } from "next/server";

// Simple in-memory donations log for demo
const donations: Array<{
  id: string;
  campaignId: string;
  amount: number;
  name: string;
  message: string;
  createdAt: string;
}> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { campaignId, amount, name, message } = body;

    if (!campaignId || !amount || amount < 1) {
      return NextResponse.json(
        { error: "Invalid donation data" },
        { status: 400 }
      );
    }

    const donation = {
      id: `don_${Date.now()}`,
      campaignId,
      amount: Number(amount),
      name: name || "Anonymous",
      message: message || "",
      createdAt: new Date().toISOString(),
    };

    donations.push(donation);

    // In a real app you would:
    // 1. Process payment via Stripe / Paystack / Flutterwave
    // 2. Update campaign.raised in the database
    // 3. Send confirmation email

    return NextResponse.json({
      success: true,
      donation,
      message: "Thank you for your generous gift!",
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json(donations);
}
