import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.getSession();

    if (error) {
      return NextResponse.json(
        {
          connected: false,
          message: error.message,
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json({
      connected: true,
      message: "Supabase connection is working.",
    });
  } catch {
    return NextResponse.json(
      {
        connected: false,
        message: "Unable to connect to Supabase.",
      },
      {
        status: 500,
      },
    );
  }
}