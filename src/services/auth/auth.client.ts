import { createClient } from "@/lib/supabase/client";

type SignUpData = {
  fullName: string;
  email: string;
  password: string;
};

type SignInData = {
  email: string;
  password: string;
};

export async function signUp({
  fullName,
  email,
  password,
}: SignUpData) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signIn({
  email,
  password,
}: SignInData) {
  const supabase = createClient();

  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signOut() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}