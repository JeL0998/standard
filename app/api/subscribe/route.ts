import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    // TODO: rate limit + save; here, just echo
    if (!email || typeof email !== "string") throw new Error("invalid");
    return Response.json({ status: "ok", data: { email }, errors: null });
  } catch {
    return Response.json({ status: "error", data: null, errors: ["invalid"] }, { status: 400 });
  }
}
