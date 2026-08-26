"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/services/auth/admin.server";
import type { UserRole } from "@/types/profile";

export async function updateUserRole(
  userId: string,
  role: UserRole,
) {
  const { user } = await requireAdmin();

  if (user.id === userId && role !== "admin") {
    throw new Error(
      "You cannot remove your own administrator access.",
    );
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update({
      role,
    })
    .eq("id", userId);

  if (error) {
    throw new Error(
      `Failed to update user role: ${error.message}`,
    );
  }

  revalidatePath("/admin/users");
  revalidatePath("/admin");
}