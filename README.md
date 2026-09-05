# SCAR Tattoo Studio

A modern full-stack tattoo studio website built with Next.js, TypeScript, Supabase, and Vercel.

SCAR Tattoo Studio combines a premium editorial design with a complete consultation booking system, artist portfolios, client accounts, reviews, gallery management, and a protected admin dashboard.

![SCAR Tattoo Studio](./public/images/readme/hero.jpg)

## About the Project

SCAR Tattoo Studio is a responsive web application designed for a modern tattoo studio.

The project focuses on combining a strong visual identity with real functionality. Visitors can explore artists and their work, browse the studio gallery, purchase gift cards, create an account, request a consultation, track bookings, and leave reviews.

The studio team has a separate admin area for managing bookings, artists, reviews, users, and gallery content.

---

## Design

The interface was created with a premium editorial and luxury-inspired visual direction.

### Design highlights

- Minimal editorial layout
- Large expressive serif typography
- Warm neutral colour palette
- Photography-focused composition
- Light and dark themes
- Responsive mobile-first design
- Clean navigation and content hierarchy
- Smooth hover states and transitions
- Consistent design across public, client, and admin areas

The website is fully responsive and designed for desktop, tablet, and mobile devices.

---

## Consultation Booking

Clients can request a consultation directly through the website by selecting an artist, preferred date and time, phone number, and adding details about their tattoo idea.

![SCAR Tattoo Studio Booking](./public/images/readme/booking.jpg)

After a consultation request is submitted:

1. The authenticated request is processed server-side.
2. The booking is stored in Supabase.
3. A Telegram notification is sent to the studio.
4. The booking appears in the client's **My Bookings** area.
5. The booking becomes available in the **Admin Bookings** dashboard.

The studio can then update the booking status to pending, confirmed, or cancelled.

---

## Gift Cards

The website also includes a dedicated Gift Cards experience that follows the same visual identity as the rest of the studio.

![SCAR Tattoo Studio Gift Cards](./public/images/readme/giftcard.jpg)

---

## Features

### Public Website

- Responsive homepage
- Light and dark theme
- Tattoo artist directory
- Individual artist profiles
- Artist biographies and specialties
- Artist portfolio galleries
- Public tattoo gallery
- Artist ratings and reviews
- Gift Cards
- About page
- Contact page
- Social media links
- Responsive navigation

### Client Account

Authenticated clients can:

- Create an account
- Sign in and sign out
- Manage their profile
- Request a tattoo consultation
- View their bookings
- View all bookings in one place
- Filter bookings by Upcoming, Past, and Cancelled
- Track booking status
- Leave reviews for artists

### Reviews & Ratings

- 1–5 star rating system
- Average artist rating
- Ratings displayed on artist cards
- Public approved reviews
- Authenticated review submission
- Review moderation before publication
- Direct navigation from artist rating to reviews

### Gallery

- Public tattoo gallery
- Artist-specific portfolios
- Images stored with Supabase Storage
- Admin image upload
- Admin image deletion
- File type validation
- File size validation
- Uploaded work automatically connected to the selected artist

### Admin Dashboard

The protected admin area allows authorised administrators to:

- View consultation requests
- Manage booking statuses
- View past and cancelled bookings
- Manage tattoo artists
- Edit artist information
- Manage artist portfolios
- Upload gallery images
- Delete gallery images
- Moderate client reviews
- Manage users
- Promote users to admin
- Remove admin access

---

## Telegram Booking Notifications

New consultation requests automatically trigger a Telegram notification for the studio.

The notification system runs server-side, keeping the Telegram Bot Token private.

Telegram is used only as a notification layer. If a Telegram notification fails, the client's booking can still be stored in the booking system.

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- CSS Modules

### Backend & Database

- Supabase
- PostgreSQL
- Supabase Authentication
- Supabase Storage
- Row Level Security

### Forms & Data

- TanStack Query
- React Hook Form
- Zod
- react-hot-toast

### Integrations & Deployment

- Telegram Bot API
- Vercel
- GitHub

---

## Authentication & Security

The application includes authentication and role-based access control.

Security features include:

- Supabase Authentication
- Supabase Row Level Security
- Protected client routes
- Protected admin routes
- Role-based admin access
- Server-side booking creation
- Server-only Telegram credentials
- Environment variables excluded from Git
- User-specific booking access
- Admin-only content management

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

Production environment variables are configured separately in Vercel.

> Never commit `.env.local`, API tokens, or production secrets to GitHub.

---

## Getting Started

Clone the repository and install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

## Production Build

Create a production build with:

```bash
npm run build
```

The project is configured for deployment with Vercel.

---

## Project Structure

```text
src/
├── app/
│   ├── admin/
│   ├── api/
│   ├── artists/
│   ├── booking/
│   ├── gallery/
│   ├── gift-cards/
│   ├── my-bookings/
│   ├── profile/
│   ├── sign-in/
│   └── sign-up/
├── components/
├── lib/
├── services/
└── types/

public/
└── images/
```

---

## Deployment

The application is deployed on Vercel and connected to GitHub for continuous deployment.

Production secrets are stored securely using Vercel Environment Variables rather than inside the repository.

---

## Project Status

**Production-ready MVP**

The core studio experience, authentication, booking system, Telegram notifications, reviews, artist management, gallery management, client account, and admin dashboard are implemented and working.
