import fs from "fs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Read your drafts.json (make sure it's at the project root)
    const data = fs.readFileSync("drafts.json", "utf-8");
    const drafts = JSON.parse(data);
    return NextResponse.json(drafts);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not load drafts" }, { status: 500 });
  }
}
