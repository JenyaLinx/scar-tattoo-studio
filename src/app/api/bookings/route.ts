import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

type CreateBookingBody = {
  artistId: number;
  bookingDate: string;
  bookingTime: string;
  phone: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body =
      (await request.json()) as CreateBookingBody;

    const {
      artistId,
      bookingDate,
      bookingTime,
      phone,
      message,
    } = body;

    if (
      !artistId ||
      !bookingDate ||
      !bookingTime ||
      !phone
    ) {
      return NextResponse.json(
        {
          message:
            "Please complete all required booking fields.",
        },
        {
          status: 400,
        },
      );
    }

    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          message:
            "You must be signed in to book a consultation.",
        },
        {
          status: 401,
        },
      );
    }

    const { data: artist, error: artistError } =
      await supabase
        .from("artists")
        .select(`
          id,
          name,
          specialty
        `)
        .eq("id", artistId)
        .maybeSingle();

    if (artistError || !artist) {
      return NextResponse.json(
        {
          message:
            "Selected artist could not be found.",
        },
        {
          status: 400,
        },
      );
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select(`
        full_name,
        email
      `)
      .eq("id", user.id)
      .maybeSingle();

    const {
      data: booking,
      error: bookingError,
    } = await supabase
      .from("bookings")
      .insert({
        user_id: user.id,
        artist_id: artistId,
        booking_date: bookingDate,
        booking_time: bookingTime,
        phone: phone.trim(),
        message: message?.trim() || null,
        status: "pending",
      })
      .select()
      .single();

    if (bookingError) {
      return NextResponse.json(
        {
          message: bookingError.message,
        },
        {
          status: 500,
        },
      );
    }

    const telegramBotToken =
      process.env.TELEGRAM_BOT_TOKEN;

    const telegramChatId =
      process.env.TELEGRAM_CHAT_ID;

    if (
      telegramBotToken &&
      telegramChatId
    ) {
      const clientName =
        profile?.full_name ||
        user.user_metadata?.full_name ||
        "SCAR Client";

      const clientEmail =
        profile?.email ||
        user.email ||
        "Not provided";

      const telegramMessage = [
        "🖤 NEW SCAR BOOKING",
        "",
        `Client: ${clientName}`,
        `Email: ${clientEmail}`,
        `Phone: ${phone.trim()}`,
        "",
        `Artist: ${artist.name}`,
        `Style: ${artist.specialty}`,
        `Date: ${bookingDate}`,
        `Time: ${bookingTime}`,
        "",
        `Message: ${message?.trim() || "No message"}`,
      ].join("\n");

      try {
        const telegramResponse = await fetch(
          `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              chat_id: telegramChatId,
              text: telegramMessage,
            }),
          },
        );

        if (!telegramResponse.ok) {
          const telegramError =
            await telegramResponse.text();

          console.error(
            "Telegram notification failed:",
            telegramError,
          );
        }
      } catch (telegramError) {
        console.error(
          "Unable to send Telegram notification:",
          telegramError,
        );
      }
    }

    return NextResponse.json({
      booking,
    });
  } catch (error) {
    console.error(
      "Create booking API error:",
      error,
    );

    return NextResponse.json(
      {
        message:
          "Unable to create booking.",
      },
      {
        status: 500,
      },
    );
  }
}