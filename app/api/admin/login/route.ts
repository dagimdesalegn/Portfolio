import { NextResponse } from "next/server";
import crypto from "node:crypto";

function token(username: string, password: string) {
  return crypto.createHmac("sha256", process.env.ADMIN_PASSWORD || "admin").update(username).digest("hex") + "." + crypto.createHash("sha256").update(password).digest("hex");
}
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const username = String(body.username || "");
  const password = String(body.password || "");
  if (!username || username !== process.env.ADMIN_USERNAME || !password || password !== process.env.ADMIN_PASSWORD) return NextResponse.json({ ok: false, message: "Invalid credentials." }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set("portfolio_admin", token(username, password), { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 7 });
  return response;
}
