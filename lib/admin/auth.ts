import "server-only";

import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "globo-admin-session";
const ADMIN_SESSION_VALUE = "authorized";

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE_NAME)?.value === ADMIN_SESSION_VALUE;
}

export async function createAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, ADMIN_SESSION_VALUE, {
    httpOnly: true,
    maxAge: 60 * 60 * 8,
    path: "/",
    sameSite: "lax",
  });
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
