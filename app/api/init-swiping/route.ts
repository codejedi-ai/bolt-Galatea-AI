import { NextResponse } from "next/server"
import { getAllCompanions } from "@/lib/companions"

export async function GET() {
  try {
    const companions = await getAllCompanions()

    // If no companions exist, return an empty array
    // The frontend will handle this case
    return NextResponse.json(companions)
  } catch (error) {
    console.error("Error fetching companions:", error)
    return NextResponse.json({ error: "Failed to fetch companions" }, { status: 500 })
  }
}
