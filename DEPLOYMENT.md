# Credence — Deployment Guide

This document explains how to deploy Credence across three services:
- **Frontend** → [Vercel](https://vercel.com)
- **Backend API** → [Render](https://render.com)
- **Database** → [Supabase](https://supabase.com)

> [!IMPORTANT]
> Never commit real API keys, database passwords, or signing credentials.
> All secrets must be set through each service's environment variable dashboard.

---

## Architecture Overview

```
Browser
  │
  ├─ Static assets ──────────────────── Vercel (CDN)
  │                                       │
  └─ /api/* proxy ──────────────────────► Render (Express API)
                                           │
                                           └─ DATABASE_URL ──► Supabase (PostgreSQL)
```

---

## 1. Supabase — Database Setup

### Create a project
1. Go to [supabase.com](https://supabase.com) → New Project.
2. Choose a region close to your Render server (e.g., `us-west-1` for Oregon).
3. Set a strong database password and save it securely.

### Get connection strings
1. Go to **Project Settings → Database → Connection string**.
2. Copy two URLs:
   - **Transaction pooler** (port `6543`) → use as `DATABASE_URL` on Render (runtime queries).
   - **Session pooler** (port `5432`) → use as `DATABASE_URL_DIRECT` for Drizzle migrations.
3. Also copy from **Project Settings → API**:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public key** → `VITE_SUPABASE_ANON_KEY`

### Run migrations
```bash
# Locally, with DATABASE_URL_DIRECT pointing to Supabase Session pooler:
pnpm --filter @workspace/db run push
```

The GitHub Actions `migrate` job also runs this automatically on push to `main`.

---

## 2. Render — Backend API

### Create a Web Service
1. Go to [render.com](https://render.com) → New → Web Service.
2. Connect your GitHub repo (`Credence`).
3. Choose **Node** runtime.

### Settings
| Field | Value |
|---|---|
| Build Command | `pnpm install --frozen-lockfile && pnpm --filter @workspace/api-server run build` |
| Start Command | `node artifacts/api-server/dist/index.js` |
| Health Check Path | `/api/health` |
| Region | Match your Supabase region |

> Alternatively, connect `render.yaml` from the repo root — Render will auto-detect it.

### Environment Variables (set in Render dashboard)
| Variable | Value | Notes |
|---|---|---|
| `DATABASE_URL` | Supabase Transaction pooler URL | Never commit this |
| `NODE_ENV` | `production` | |
| `PORT` | `8080` | |
| `CORS_ORIGIN` | Your Vercel URL (e.g. `https://credence.vercel.app`) | |
| `TINYFISH_API_KEY` | From TinyFish | When configured |
| `OPENAI_API_KEY` | From OpenAI | When configured |
| `CLERK_SECRET_KEY` | From Clerk | When configured |
| `BLOCKCHAIN_SIGNING_KEY` | From wallet | Server-side only, never expose |

### Note on free tier
Render free services spin down after 15 minutes of inactivity. Upgrade to **Starter** for always-on production use.

---

## 3. Vercel — Frontend

### Import project
1. Go to [vercel.com](https://vercel.com) → Add New → Project.
2. Import your GitHub repo (`Credence`).
3. Vercel will detect `vercel.json` from the repo root automatically.

### Build settings (auto-detected from vercel.json)
| Field | Value |
|---|---|
| Framework Preset | Vite |
| Build Command | `pnpm --filter @credence/web run build` |
| Output Directory | `artifacts/credence/dist` |
| Install Command | `pnpm install --frozen-lockfile` |

### Environment Variables (set in Vercel dashboard)
| Variable | Value | Notes |
|---|---|---|
| `VITE_API_BASE_URL` | `https://credence-api.onrender.com` | Your Render service URL |
| `VITE_APP_URL` | `https://credence.vercel.app` | Your Vercel URL |
| `VITE_SUPABASE_URL` | From Supabase Project Settings | Safe for frontend |
| `VITE_SUPABASE_ANON_KEY` | From Supabase Project Settings | Safe for frontend |

> The `/api/*` proxy in `vercel.json` forwards all API requests to Render so the frontend never needs CORS configuration in development.

### Custom domain
1. Vercel Dashboard → Project → Settings → Domains.
2. Add your domain and follow DNS instructions.
3. Update `CORS_ORIGIN` on Render to match your custom domain.

---

## 4. GitHub Actions (CI/CD)

The `.github/workflows/deploy.yml` workflow runs on every push to `main`:
1. **check** — installs dependencies, runs `typecheck`, builds the frontend.
2. **migrate** — runs `drizzle push` against Supabase using `DATABASE_URL_DIRECT`.

Vercel and Render auto-deploy on push to `main` via their GitHub integrations — no extra CI step is needed for deployment.

### Required GitHub Secrets
Add these in **GitHub → Repo → Settings → Secrets → Actions**:
```
VITE_API_BASE_URL
VITE_APP_URL
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
DATABASE_URL_DIRECT     ← Session pooler URL for migrations
```

---

## 5. Local Development

```bash
# 1. Clone and install
git clone https://github.com/your-org/Credence.git
cd Credence
pnpm install

# 2. Copy and fill in environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase URLs and any API keys

# 3. Push DB schema to Supabase (first time)
pnpm --filter @workspace/db run push

# 4. Start the API server
pnpm --filter @workspace/api-server run dev

# 5. In a separate terminal, start the frontend
pnpm --filter @credence/web run dev
```

Frontend: http://localhost:5173  
API: http://localhost:8080

---

## 6. Integration Status

Track which integrations are live vs. simulated here. Update this table as integrations are enabled.

| Integration | Status | Notes |
|---|---|---|
| Supabase DB | ⬜ Not connected | Set `DATABASE_URL` on Render |
| Frontend (Vercel) | ⬜ Not deployed | Import repo in Vercel |
| Backend API (Render) | ⬜ Not deployed | Import repo in Render |
| TinyFish evidence discovery | ⬜ Simulated | Set `TINYFISH_API_KEY` when available |
| AI review (OpenAI) | ⬜ Simulated | Set `OPENAI_API_KEY` when available |
| Blockchain credential anchoring | ⬜ Simulated | Deploy smart contract and set `BLOCKCHAIN_SIGNING_KEY` |
| Clerk authentication | ⬜ Not configured | Set `CLERK_SECRET_KEY` and `VITE_CLERK_PUBLISHABLE_KEY` |
| File storage | ⬜ Not configured | Set storage credentials |

---

*Last updated: 2026-10-24*
