# 🚀 Janesh Krishna R — Portfolio Website

A **production-ready, full-stack neo-brutalism portfolio** with live coding stats, hidden admin login, like/view counters, and a complete admin dashboard.

---

## 🎨 Design

**Neo-Brutalism** — Bold borders, harsh shadows, bright flat colors (Yellow `#FFE500`, Pink `#FF3CAC`, Blue `#2D6CDF`), JetBrains Mono + Space Grotesk + Bebas Neue typography.

---

## 📁 Project Structure

```
portfolio/
├── client/          ← React (Vite) + Tailwind CSS v4
└── server/          ← Node.js + Express + MongoDB
```

---

## ⚙️ Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS v4, Framer Motion |
| Backend | Node.js, Express 5 |
| Database | MongoDB Atlas (Mongoose) |
| Images | Cloudinary |
| Auth | JWT (8h expiry) |
| Deployment | Vercel (client) + Render (server) |

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
# Install client deps
cd client && npm install

# Install server deps
cd ../server && npm install
```

### 2. Configure Environment Variables

**Server** — copy `.env.example` → `.env` and fill in:

```bash
cp server/.env.example server/.env
```

Required values:
- `MONGODB_URI` — MongoDB Atlas connection string
- `JWT_SECRET` — any long random string
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — from Cloudinary dashboard

**Client** — copy `.env.example` → `.env`:

```bash
cp client/.env.example client/.env
```

Set `VITE_API_URL=http://localhost:5000` for local dev.

### 3. Run Dev Servers

Open **two terminals**:

```bash
# Terminal 1 — Backend
cd server
npm run dev

# Terminal 2 — Frontend
cd client
npm run dev
```

Visit `http://localhost:5173`

---

## 🔐 Hidden Admin Login

**No button anywhere** — the login is invisible.

Go to the **Contact section** → fill in:
- **Email**: `admin@gmail.com`
- **Message**: `-pass`

Hit send → you'll be redirected to `/admin`.

---

## 🛠 Admin Dashboard (`/admin`)

- **Projects**: Add, Edit, Delete with Cloudinary image upload
- **Certificates**: Add, Delete with Cloudinary image upload
- **Stats**: View total likes and page views

---

## 📊 Live Coding Stats

| Platform | Source |
|---|---|
| **LeetCode** | Unofficial GraphQL API |
| **GitHub** | GitHub REST API (add `GITHUB_TOKEN` in `.env` to increase rate limit) |
| **CodeChef** | HTML scraping (may be blocked by anti-bot; profile link shown as fallback) |

---

## 🌐 Deployment

### Backend → Render

1. Push `server/` to a GitHub repo
2. Go to [render.com](https://render.com) → New Web Service
3. Connect repo, set **Build Command**: `npm install`, **Start Command**: `npm start`
4. Add all env vars from `.env.example`

### Frontend → Vercel

1. Push `client/` to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → Import Project
3. **Framework preset**: Vite
4. Add env var: `VITE_API_URL=https://your-render-url.onrender.com`
5. Deploy!

### After Deploying Backend

Update `server/src/index.js` CORS:
```js
origin: ['https://your-vercel-app.vercel.app']
```

---

## 📡 API Reference

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/admin/login` | ❌ | Hidden admin login |
| GET | `/projects` | ❌ | List all projects |
| POST | `/projects` | ✅ | Create project + image |
| PUT | `/projects/:id` | ✅ | Update project |
| DELETE | `/projects/:id` | ✅ | Delete project |
| GET | `/certificates` | ❌ | List certificates |
| POST | `/certificates` | ✅ | Create certificate |
| DELETE | `/certificates/:id` | ✅ | Delete certificate |
| GET | `/stats/view` | ❌ | Get view count |
| POST | `/stats/view` | ❌ | Increment view count |
| GET | `/stats/like` | ❌ | Get like count |
| POST | `/stats/like` | ❌ | Toggle like (by IP) |
| GET | `/stats/like/status` | ❌ | Check if IP has liked |
| GET | `/coding/leetcode` | ❌ | LeetCode stats |
| GET | `/coding/github` | ❌ | GitHub stats |
| GET | `/coding/codechef` | ❌ | CodeChef stats |
| GET | `/health` | ❌ | Health check |

---

## 🎯 Features Checklist

- [x] Hero with animated marquee + stat boxes
- [x] About, Skills, Projects, Certificates sections
- [x] Live LeetCode / GitHub / CodeChef stats
- [x] Experience timeline (alternating left-right)
- [x] Achievements grid with hover rotate
- [x] Contact form with **hidden admin trigger**
- [x] ❤️ Like button (IP-based, persisted in MongoDB)
- [x] 👁️ View counter (persisted in MongoDB)
- [x] Admin dashboard — Projects CRUD + Certificates CRUD
- [x] Cloudinary image upload
- [x] JWT protected admin routes
- [x] Mobile responsive
- [x] Loading skeletons
- [x] Framer Motion animations
- [x] Neo-brutalism design system
- [x] SEO meta tags
- [x] Certificates iframe embed from existing portfolio

---

