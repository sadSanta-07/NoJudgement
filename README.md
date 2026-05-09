# NoJudgment - AI-Powered English Speaking Practice Platform

<div align="center">

![NoJudgment](https://img.shields.io/badge/NoJudgment-English%20Learning-blueviolet?style=flat-square)
![Status](https://img.shields.io/badge/status-Beta-orange?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Postgres](https://img.shields.io/badge/PostgreSQL-14+-336791?style=flat-square&logo=postgresql)

**Practice English speaking with real people and AI. No judgment. Just growth.**

</div>

---

## 🎯 Project Description

**NoJudgment** is an AI-powered platform that helps non-native English speakers improve their conversational skills through real-time peer matching, intelligent AI coaching, and comprehensive session analytics.

**Core Value Proposition**:
- Practice with real people at your skill level (beginner/intermediate/advanced)
- Get instant AI-powered feedback on your speaking
- Track progress with detailed analytics (fluency, clarity, pronunciation)
- Stay motivated with gamification (points, streaks, leaderboard)
- Safe community with automatic moderation

**Key Technologies**: WebRTC for peer-to-peer calls, Socket.io for real-time matchmaking, Groq AI (Llama 3.1) for session analysis and coaching, Next.js fullstack framework, PostgreSQL database.

---

## 📁 Project Structure

```
nojudgment/
├── app/
│   ├── page.tsx                          # Landing page
│   ├── layout.tsx                        # Root layout
│   ├── api/
│   │   ├── analyze/route.ts              # Groq AI speech analysis
│   │   ├── coach/route.ts                # AI coach multi-turn chat
│   │   ├── match/route.ts                # Session matchmaking
│   │   ├── points/route.ts               # Points & streak system
│   │   ├── leaderboard/route.ts          # Global rankings
│   │   ├── report/route.ts               # User reporting & auto-ban
│   │   ├── dashboard/route.ts            # Aggregated user data
│   │   ├── heatmap/route.ts              # 30-day performance heatmap
│   │   └── auth/[...nextauth]/route.ts   # Google OAuth
│   ├── dashboard/
│   │   ├── page.tsx                      # Main dashboard
│   │   ├── aicoach/page.tsx              # AI coaching interface
│   │   ├── matchmaking/page.tsx          # Queue & matching UI
│   │   ├── leaderboard/page.tsx          # Rankings display
│   │   ├── practice/page.tsx             # Session history
│   │   ├── reports/page.tsx              # Moderation dashboard
│   │   └── settings/page.tsx             # User settings
│   ├── room/[roomId]/page.tsx            # Live WebRTC call room
│   └── post-call/page.tsx                # Session analysis display
├── components/                           # Reusable React components
├── lib/
│   ├── prisma.ts                         # Prisma ORM singleton
│   ├── socket-client.ts                  # Socket.io client factory
│   ├── webrtc.ts                         # WebRTC peer connection class
│   ├── useAudioRecorder.ts               # Audio recording hook
│   └── points.ts                         # Point calculation helpers
├── prisma/
│   ├── schema.prisma                     # Database schema (8 models)
│   └── migrations/                       # Database version history
├── server.js                             # Separate Node.js Socket.io server
└── package.json, tsconfig.json, next.config.ts
```

---

## 📄 Pages & Functionalities

### **Public Pages**

**`/` - Landing Page**
- Hero section with value proposition, feature showcase, CTAs
- Animated UI with Framer Motion, responsive gradients

### **Protected Pages** (Authenticated Users Only)

| Page | Core Functionality |
|------|-------------------|
| **`/dashboard`** | Performance metrics, 30-day trend graphs, recent sessions, weak areas, points/streak display |
| **`/dashboard/aicoach`** | Chat interface with AI coach, 20-message history context, real-time Groq responses |
| **`/dashboard/matchmaking`** | Queue: select level + topic; Socket.io `join_queue` event; waiting status |
| **`/room/[roomId]`** | Live WebRTC audio: mute/unmute, duration timer, live English score (%), transcription capture |
| **`/post-call`** | Session metrics (fluency 0-10, clarity 0-10, filler words, English %), AI feedback, points awarded |
| **`/dashboard/leaderboard`** | Top 50 by points, current user rank, streak counter, total sessions per user |
| **`/dashboard/practice`** | Session history with filters, metrics summary, session replays |
| **`/dashboard/reports`** | Moderation view: submitted reports, reporter/reported info, ban status |
| **`/dashboard/settings`** | Profile management, notification preferences, privacy, account deletion |

---

## 🛠 Tech Stack & Usage

### **Frontend Stack**

| Tech | Version | How It's Used |
|------|---------|--------------|
| **Next.js** | 16.2.4 | App Router, API routes, SSR/SSG optimization, built-in image optimization |
| **React** | 19.2.4 | Component-based UI, hooks (useState, useEffect, useRef), client/server components |
| **TypeScript** | 5.x | Type-safe components, API routes, prevents runtime errors |
| **Tailwind CSS** | 4.x | Responsive utility classes, custom color variables, dark mode |
| **Framer Motion** | 12.38.0 | Landing animations, stagger effects, smooth transitions |
| **Lucide React** | 1.14.0 | Icon library (Mic, Globe, Shield, Star, etc.) |
| **Socket.io Client** | 4.8.3 | Real-time events: `join_queue`, `matched`, WebRTC signaling |

---

### **Backend Stack**

| Tech | Version | How It's Used |
|------|---------|--------------|
| **Next.js API Routes** | 16.2.4 | 9 HTTP endpoints; serverless, auto-scaling on Vercel |
| **NextAuth** | 4.24.14 | Google OAuth 2.0; JWT in HTTP-only cookies; Prisma adapter |
| **Prisma ORM** | 5.22.0 | Type-safe queries, auto-generated client, relationships, ACID transactions |
| **Socket.io Server** | 4.8.3 | Separate Node.js (port 3001); matchmaking queue, WebRTC signaling |
| **Groq SDK** | 1.1.2 | AI inference for `/api/analyze` (speech) and `/api/coach` (conversation) |
| **Llama 3.1 8B** | Instant | LLM: analyzes transcript (fluency/clarity/filler), generates coaching responses |

---

### **Database Stack**

| Component | Technology | Usage |
|-----------|-----------|-------|
| **Primary DB** | PostgreSQL 14+ | Relational data: Users, Sessions, Analyses, Messages, Points, Reports |
| **ORM** | Prisma 5.22.0 | Schema-driven design, auto-migrations, relationship management, transactions |
| **Models** | 8 Prisma models | User, MatchSession, SessionAnalysis, CoachMessage, PointTransaction, Report, Account, Session |

**Key Operations**:
- Point updates with atomic transactions (race condition prevention)
- Streak calculation on daily active check
- Auto-ban when report count ≥ 3
- Chat history query (last 20 messages for context)

---

### **Real-Time Communication Stack**

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Peer Audio** | WebRTC (Browser native) | P2P audio streaming; echo cancellation, noise suppression |
| **Signaling** | Socket.io | Matchmaking queue, WebRTC SDP offer/answer, ICE relay |
| **NAT Traversal** | STUN/TURN | Google STUN (stun.l.google.com:19302); Metered OpenRelay TURN |

**WebRTC Flow**:
1. User joins queue → `join_queue` emitted
2. Backend matches → `matched` event
3. Both users join WebRTC room
4. Caller creates offer, sends via Socket.io
5. Callee receives offer, creates answer
6. ICE candidates exchanged asynchronously
7. Direct P2P audio connection established

---

## 📡 API Endpoints Overview

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/analyze` | POST | Groq AI analyzes transcript; returns fluency, clarity, filler words, English score |
| `/api/coach` | GET/POST | Get chat history or send message to AI coach |
| `/api/match` | POST | Create/join matchmaking session with level + topic |
| `/api/points` | GET/POST | Get points & history or award/deduct with transaction |
| `/api/leaderboard` | GET | Top 50 users by points + current user rank |
| `/api/report` | GET/POST | Submit report or retrieve all reports (admin) |
| `/api/dashboard` | GET | Complete user data: stats, sessions, graphs |
| `/api/heatmap` | GET | 30-day performance heatmap |
| `/api/auth/[...nextauth]` | GET/POST | Google OAuth authentication |

---

## 🎮 Gamification System

**Points**: +10 session, +5 good rating, -10 early exit, -15 non-English (>50%)

**Streak Logic**: Consecutive days increment, gap resets to 1

**Badges**: 3-day 🥉, 7-day 🥈, 30-day 🥇, 100-day 🏆

**Leaderboard**: Ranked by cumulative points (top 50), updated per transaction

---

## 🚀 Quick Start

### **Prerequisites**
Node.js 18+, PostgreSQL 14+, npm/yarn

### **Installation**
```bash
git clone https://github.com/yourusername/nojudgment.git
cd nojudgment
npm install
setup .env file
npm run socket        # Terminal 2: :3001
# Open http://localhost:3000
```

### **Scripts**
```bash
npm run dev                  # Next.js dev server
npm run socket              # Socket.io server
npm run build               # Production build
npm start                   # Production server
npx prisma studio          # Database UI
npx prisma migrate dev      # Create migration
```

---

## 🔐 Security & Performance

✅ **Security**: NextAuth OAuth, HTTP-only JWT, Prisma parameterized queries, role-based access, rate limiting  
✅ **Performance**: Serverless auto-scaling, WebRTC P2P, connection pooling, ACID transactions  
✅ **Reliability**: Session persistence, graceful error handling, automatic rollbacks

---

## 📊 Database Schema

```prisma
User { id, email, name, image, points, streak, isBanned, createdAt }
MatchSession { id, user1Id, user2Id, status, level, topic }
SessionAnalysis { id, userId, fluency, clarity, fillerWords, englishScore, feedback, durationSecs }
CoachMessage { id, userId, role, content, createdAt }
PointTransaction { id, userId, amount, reason, createdAt }
Report { id, reporterId, reportedId, reason, auto-ban at 3+ }
```

---

<div align="center">

**Made with ❤️ to help people speak English with confidence by Arpita, Sahil and Swoasti**

</div>
