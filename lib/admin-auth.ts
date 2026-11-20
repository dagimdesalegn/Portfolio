import crypto from "node:crypto";
import { cookies } from "next/headers";
export function isAdmin() {
  const username = process.env.ADMIN_USERNAME || "";
  const password = process.env.ADMIN_PASSWORD || "";
  const expected = crypto.createHmac("sha256", password || "admin").update(username).digest("hex") + "." + crypto.createHash("sha256").update(password).digest("hex");
  return cookies().get("portfolio_admin")?.value === expected && !!username && !!password;
}
