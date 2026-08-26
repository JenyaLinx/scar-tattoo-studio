export type UserRole = "client" | "admin";

export type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  email: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
};