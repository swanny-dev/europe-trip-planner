# Free Hosted Version

This app is ready for a free Vercel + Supabase deployment.

## 1. Supabase

Create a free Supabase project, open the SQL editor, and run `supabase.sql`.

Copy these values:

- Project URL
- Service role key

## 2. Vercel

Create/import the project in Vercel from this folder or from a GitHub repo.

Set these environment variables:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `TRIP_ID` = `europe-2027`

Deploy.

## Share Links

- Ruairi: `https://your-vercel-url.vercel.app/?role=ruairi`
- Maggie: `https://your-vercel-url.vercel.app/?role=maggie`

The Maggie link locks the planner into Maggie voting mode.
