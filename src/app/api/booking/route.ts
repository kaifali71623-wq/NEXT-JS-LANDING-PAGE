import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      company,
      website,
      challenge,
      fitScore,
      fitBand,
      preferredDate,
      preferredTime,
      timezone,
    } = body;

    // Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: "Name and email are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid email." },
        { status: 400 }
      );
    }

    const booking = await db.booking.create({
      data: {
        name: String(name).slice(0, 200),
        email: String(email).slice(0, 300),
        company: company ? String(company).slice(0, 200) : null,
        website: website ? String(website).slice(0, 500) : null,
        challenge: challenge ? String(challenge).slice(0, 2000) : null,
        fitScore: typeof fitScore === "number" ? fitScore : null,
        fitBand: fitBand ? String(fitBand).slice(0, 50) : null,
        preferredDate: preferredDate ? String(preferredDate).slice(0, 50) : null,
        preferredTime: preferredTime ? String(preferredTime).slice(0, 50) : null,
        timezone: timezone ? String(timezone).slice(0, 100) : null,
        status: "pending",
      },
    });

    return NextResponse.json({ ok: true, id: booking.id });
  } catch (err) {
    console.error("Booking creation failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong while booking. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await db.booking.count();
    return NextResponse.json({ ok: true, total: count });
  } catch (err) {
    console.error("Booking fetch failed:", err);
    return NextResponse.json({ ok: true, total: 0 });
  }
}
