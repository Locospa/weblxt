import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";

type AdminSessionPayload = {
  username: string;
  role: "admin";
};

function getJwtSecret() {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("Falta AUTH_SECRET en .env.local");
  }

  return new TextEncoder().encode(secret);
}

export async function createAdminSession(username: string) {
  const secret = getJwtSecret();

  const token = await new SignJWT({
    username,
    role: "admin",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function verifyAdminSessionToken(token?: string) {
  if (!token) return null;

  try {
    const secret = getJwtSecret();
    const { payload } = await jwtVerify(token, secret);

    return payload as unknown as AdminSessionPayload;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  return verifyAdminSessionToken(token);
}