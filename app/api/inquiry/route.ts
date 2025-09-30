import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    return Response.json({ status: "ok", data: payload, errors: null });
  } catch {
    return Response.json(
      { status: "error", data: null, errors: ["invalid"] },
      { status: 400 }
    );
  }
}
