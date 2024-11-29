"use server";

import { cookies } from "next/headers";

export async function setCookies(token: string) {
  const cookieStore = await cookies();

  cookieStore.set("accessToken", `Bearer ${token}`);
}

export async function removeCookies() {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");
}

