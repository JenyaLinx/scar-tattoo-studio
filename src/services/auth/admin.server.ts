import { redirect } from "next/navigation";

import { getCurrentUser } from "@/services/auth/auth.server";
import { getProfile } from "@/services/profile/profile.server";

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const profile = await getProfile(user.id);

  if (!profile || profile.role !== "admin") {
    redirect("/");
  }

  return {
    user,
    profile,
  };
}