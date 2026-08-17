import { createClient } from "@/lib/supabase/client";

type UpdateProfileData = {
  fullName: string;
  phone: string;
};

export async function updateProfile({
  fullName,
  phone,
}: UpdateProfileData) {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You are not signed in.");
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      full_name: fullName.trim(),
      phone: phone.trim() || null,
    })
    .eq("id", user.id);

  if (profileError) {
    throw new Error(profileError.message);
  }

  const { error: authError } =
    await supabase.auth.updateUser({
      data: {
        full_name: fullName.trim(),
      },
    });

  if (authError) {
    throw new Error(authError.message);
  }
}