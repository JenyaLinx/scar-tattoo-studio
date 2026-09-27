import { createClient } from "@/lib/supabase/server";

function isNextDynamicServerError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    error.digest === "DYNAMIC_SERVER_USAGE"
  );
}

export async function getCurrentUser() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Unable to get current user:", error.message);
      return null;
    }

    return user;
  } catch (error) {
    if (isNextDynamicServerError(error)) {
      throw error;
    }

    console.error("Unable to connect to Supabase Auth:", error);
    return null;
  }
}