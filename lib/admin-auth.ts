import crypto from "crypto";

export const ADMIN_COOKIE = "llpw_admin_session";

function getExpectedToken() {
  const password = process.env.ADMIN_PASSWORD ?? "";
  return crypto
    .createHash("sha256")
    .update(`${password}:llpw-admin-salt`)
    .digest("hex");
}

export function isValidPassword(password: string) {
  return password === (process.env.ADMIN_PASSWORD ?? "");
}

export function getSessionToken() {
  return getExpectedToken();
}

export function isValidSessionToken(token: string | undefined) {
  return !!token && token === getExpectedToken();
}
