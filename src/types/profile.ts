export type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  email: string | null;
  role: "admin" | "client";
  created_at: string;
  updated_at: string;
};