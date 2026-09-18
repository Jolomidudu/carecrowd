# HappyGift 🎁

A modern crowdfunding web app inspired by GoFundMe — **Real people. Big dreams. Together.**

Built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

![HappyGift](https://img.shields.io/badge/Next.js-15-black?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square)

## Features

- 🏠 Beautiful landing page matching the HappyGift design
- 🔍 Browse & search campaigns by category
- 📄 Campaign detail pages with progress, creator info, and donation flow
- ➕ Multi-step “Start a Campaign” form
- 💝 Interactive donation modal (demo – no real payments)
- 📱 Fully responsive design
- 🔌 API routes for campaigns & donations (in-memory for demo)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm / yarn / pnpm

### Install & Run

```bash
cd happygift
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start development server |
| `npm run build`| Production build         |
| `npm start`    | Start production server  |
| `npm run lint` | Run ESLint               |

## Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── campaigns/
│   │   ├── page.tsx             # Campaign list + filters
│   │   └── [id]/page.tsx        # Campaign detail
│   ├── start/page.tsx           # Create campaign form
│   ├── api/
│   │   ├── campaigns/route.ts   # GET/POST campaigns
│   │   └── donations/route.ts   # POST donations
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── CampaignCard.tsx
│   └── DonateButton.tsx
└── lib/
    ├── data.ts                  # Mock campaigns + helpers
    └── utils.ts                 # cn, formatCurrency, etc.
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Language**: TypeScript
- **Data**: In-memory mock data (easy to swap for Prisma + Postgres, Supabase, etc.)

## Next Steps (Production)

1. Add a real database (Prisma + PostgreSQL or Supabase)
2. Integrate Stripe / Paystack / Flutterwave for payments
3. Add authentication (NextAuth / Clerk)
4. Image uploads (Uploadthing / Cloudinary)
5. Email notifications
6. Admin dashboard

## License

MIT — feel free to use and extend.
