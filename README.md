# Margin AI — Autonomous Multi-Agent Commerce Intelligence

> **Google AI Builder Cup 2026** · Team BizPilot  
> *Autonomous Margin & Profit Intelligence for Independent Indian Shopify Brands doing ₹5L–₹50L/month in Revenue.*

---

## 🎯 What We Are Building

Margin is an AI-powered platform for independent D2C brand owners in India doing ₹5L–₹50L/month. Four autonomous AI agents coordinate in the background using **Google ADK** and **Gemini 1.5** to continuously answer the critical financial questions every founder loses sleep over:

| AI Agent | The Founder Question It Answers | Demo Finding & Financial Impact |
| :--- | :--- | :--- |
| **🔍 SourceSense** | *Am I overpaying suppliers?* | Supplier charges **₹420/unit** vs **₹290 market benchmark** → **₹1.95L/yr leakage** isolated |
| **🗺️ MarginMap** | *Which SKU actually makes money after all fees?* | 1 SKU burns **-₹186/unit (-₹59,520/mo)** on Amazon after referral fees, FBA & returns |
| **🔄 ReturnIQ** | *Why are people returning this product?* | Rose Gold Anklet: **31% return on Amazon** vs **4% on Shopify** (Root cause: FBA packaging crush) |
| **🚀 LaunchRadar** | *What should I invest in next?* | Recommends **2 high-margin, low-return SKUs** (18K PVD Cuban Chain & Celestial Opal Hoops) |

---

## 🏗️ Architecture & Technology Stack

```
[ Shopify & Amazon IN ] ──> [ Google BigQuery (margin_data) ]
                                    │
                                    ▼
       [ Google Cloud Run: ADK Sequential Orchestrator (/run) ]
                                    │
    ┌───────────────────────────────┼───────────────────────────────┐
    ▼                               ▼                               ▼
1. SourceSense                 2. MarginMap                     3. ReturnIQ
(Supplier Arbitrage)      (True Unit Economics)            (Channel Return Discrepancies)
    │                               │                               │
    └───────────────────────┬───────┴───────────────────────────────┘
                            ▼
                     4. LaunchRadar
                 (Product Expansion AI)
                            │
                            ▼
          [ Supabase Realtime (agent_insights) ]
                            │
                            ▼
   [ Vision UI Cinematic React 19 Dashboard (Three.js + Recharts + GSAP) ]
```

### Core Technologies
- **Google ADK (Agent Development Kit)**: Orchestrates the 4 agents in deterministic sequence.
- **Gemini 1.5 (Pro & Flash)**: Reasoning engine providing actionable, plain-English insights with exact rupee calculations.
- **Google BigQuery**: Enterprise data warehouse storing products, orders, supplier quotes, and recommendations.
- **Google Cloud Run**: Containerized microservices deploying each agent and the HTTP orchestrator.
- **Google Secret Manager**: Zero-trust key storage for Gemini and Supabase credentials.
- **Supabase Realtime**: WebSocket telemetry feed for instantaneous dashboard updates without page reloads.
- **React 19 + Vite**: High-performance frontend with Vision UI dark glassmorphism.
- **Three.js + GSAP + Lenis**: 3D neural core geometry and physics-based smooth scrolling.
- **Recharts**: Dual-area GMV vs Real Cash Pocket Margin and Channel Net Profitability charts.

---

## 📂 Repository File Structure

```
margin-ai/
├── .gitignore
├── README.md
├── package-lock.json
│
├── agents/
│   ├── adk_orchestrator/       # Sequential pipeline coordinator & Flask HTTP server
│   │   ├── main.py             # Cloud Run HTTP trigger (/run, /health)
│   │   ├── orchestrator.py     # ADK sequential agent runner
│   │   ├── Dockerfile          # Container specification
│   │   └── requirements.txt
│   ├── source_sense/           # Supplier benchmark and overpayment auditor
│   │   ├── agent.py
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   ├── margin_map/             # True unit economics & fee drag calculator
│   │   ├── agent.py
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   ├── return_iq/              # Cross-channel return discrepancy diagnostic
│   │   ├── agent.py
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   └── launch_radar/           # High-margin SKU expansion recommender
│       ├── agent.py
│       ├── Dockerfile
│       └── requirements.txt
│
├── data/
│   ├── setup_bigquery.py       # BigQuery dataset & table schemas
│   └── seed_data.py            # 15 D2C SKUs, 90-day orders & supplier benchmarks
│
└── dashboard/                  # React 19 + Vite Vision UI frontend
    ├── Dockerfile              # Multi-stage build (node:20 → nginx:alpine)
    ├── cloudbuild.yaml         # Google Cloud Build CI/CD to GCR
    ├── nginx.conf              # Nginx reverse proxy config for SPA routing
    ├── firebase.json           # Firebase Hosting configuration
    ├── vite.config.js
    ├── eslint.config.js
    ├── index.html
    ├── package.json            # React 19, Vite, Three.js, Recharts, GSAP
    └── src/
        ├── App.jsx             # Master dashboard router & tab layout
        ├── index.css           # Vision UI cosmic dark glassmorphism stylesheet
        ├── main.jsx
        ├── assets/             # Bioluminescent hero artwork & logos
        ├── components/
        │   ├── Sidebar.jsx             # Vision UI navigation with agent badges
        │   ├── Header.jsx              # Search, store switcher, live indicators
        │   ├── StatCards.jsx           # 4 KPI metrics (GMV, Net Margin, Leakage, Returns)
        │   ├── HeroWelcomeCard.jsx     # Vision UI bioluminescent hero card
        │   ├── MarginHealthGauge.jsx   # Semi-circle portfolio margin health gauge
        │   ├── CapitalEfficiencyCard.jsx
        │   ├── RevenueChart.jsx        # Dual-area chart (GMV vs Net Margin)
        │   ├── ChannelProfitBarChart.jsx
        │   ├── AgentDeepDive.jsx       # 4 interactive agent workspaces
        │   ├── MarginCards.jsx         # Per-SKU true margin cards & loss-maker warnings
        │   ├── InsightsFeed.jsx        # Supabase Realtime WebSocket telemetry feed
        │   ├── RunButton.jsx           # Pipeline trigger with live status indicators
        │   └── HeroScene.jsx           # 3D Three.js Torus Knot + GSAP + Lenis scroll
        ├── data/
        │   └── mockData.js             # Realistic fallback brand data & findings store
        └── lib/
            └── supabase.js             # Supabase client with graceful fallback
```

---

## 🚀 Quickstart & Local Setup

### 1. Cloud & Data Setup
```bash
# Clone the repository
git clone https://github.com/remyacode/margin-ai.git
cd margin-ai

# Set up BigQuery and seed data
pip install google-cloud-bigquery google-cloud-secret-manager google-generativeai supabase
python data/setup_bigquery.py
python data/seed_data.py
```

### 2. Run the Dashboard
```bash
cd dashboard
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Trigger the Autonomous Agent Pipeline
```bash
# Run locally
python agents/adk_orchestrator/orchestrator.py

# Or hit the Cloud Run HTTP trigger
curl -X POST https://margin-ai-1059250826101.us-central1.run.app/run
```
---

## 🛡️ Security & Privacy
- **No hardcoded secrets**: All API keys are retrieved dynamically via Google Secret Manager or environment variables.
- Production `.env` and `.env.local` files are ignored in `.gitignore`.
