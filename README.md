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
├── data/
│   ├── setup_bigquery.py       # BigQuery dataset & table schemas
│   └── seed_data.py            # 15 D2C SKUs, 90-day orders & supplier benchmarks
├── dashboard/                  # React 19 + Vite Vision UI frontend
│   ├── src/
│   │   ├── assets/             # Bioluminescent hero artwork & logos
│   │   ├── components/
│   │   │   ├── Sidebar.jsx             # Vision UI navigation & Copilot status
│   │   │   ├── Header.jsx              # Search, store switcher, live indicators
│   │   │   ├── StatCards.jsx           # 4 top KPI metrics (GMV, Net Margin, Leakage, Returns)
│   │   │   ├── HeroWelcomeCard.jsx     # Vision UI bioluminescent jellyfish hero card
│   │   │   ├── MarginHealthGauge.jsx   # Semi-circle satisfaction/protection gauge (92%)
│   │   │   ├── CapitalEfficiencyCard.jsx# Circular progress index (9.4 / 10)
│   │   │   ├── RevenueChart.jsx        # Dual glowing AreaChart (GMV vs Net Margin)
│   │   │   ├── ChannelProfitBarChart.jsx# Channel profitability vertical BarChart
│   │   │   ├── AgentDeepDive.jsx       # 4 Interactive Agent Workspaces & Action Triggers
│   │   │   ├── MarginCards.jsx         # All SKUs ranked with loss-maker warnings
│   │   │   ├── InsightsFeed.jsx        # Real-time WebSocket agent telemetry stream
│   │   │   ├── RunButton.jsx           # Pipeline trigger with progressive feedback
│   │   │   └── HeroScene.jsx           # 3D Three.js Torus Knot + GSAP + Lenis scroll
│   │   ├── data/mockData.js            # Realistic brand data & findings store
│   │   ├── lib/supabase.js             # Supabase client with graceful fallback
│   │   ├── App.jsx                     # Master application
│   │   └── index.css                   # Vision UI dark glassmorphism stylesheet
│   └── firebase.json           # Firebase Hosting configuration
└── README.md
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
curl -X POST https://margin-orchestrator-xxxx.a.run.app/run
```

---

## 🎬 3-Minute Demo Script

- **0:00 – 0:20 | Introduction**: Open the dashboard URL. *"This is Margin — an AI intelligence platform for independent brand owners doing ₹5L–₹50L/month. In the next 3 minutes, I'll show you how it tells a brand owner exactly where they are losing money and what to do about it."*
- **0:20 – 0:40 | The Problem & Agents**: Show the hero screen and the 4 active agents. *"Independent founders lose sleep over four questions: supplier overcharges, true SKU net margins after platform fees, channel returns, and what to launch next. Margin runs 4 background agents coordinated by Google ADK with Gemini 1.5 at the core."*
- **0:40 – 1:00 | Trigger Pipeline**: Click **"Run Margin Analysis"**. Show real-time progressive orchestration through all 4 agents.
- **1:00 – 1:30 | MarginMap Finding**: Switch to **Margin Intelligence / All SKUs**. *"MarginMap calculated true net pocket margin after raw COGS, Amazon's 18% fee, FBA pick/pack, and returns. Notice the Silver Toe Ring — it appears to generate revenue, but actually burns -₹186 on every order."*
- **1:30 – 2:00 | SourceSense Finding**: Show the **SourceSense workspace**. *"SourceSense audited our packaging supplier against Morbi and Bhiwandi market benchmarks. Apex is charging ₹420/unit vs the ₹290 market median — that's ₹1.95 Lakh lost every year. With one click, the founder gets a pre-drafted negotiation WhatsApp citing market data."*
- **2:00 – 2:30 | ReturnIQ Finding**: Show the **ReturnIQ workspace**. *"ReturnIQ analyzed 142 customer reviews and uncovered that the Rose Gold Anklet returns at 31% on Amazon but only 4% on Shopify. The root cause is Amazon's automated chute sorting crushing polybag clasps, whereas Shopify orders ship in rigid boxes. Upgrading FBA packaging saves ₹84,000/month."*
- **2:30 – 3:00 | LaunchRadar Finding**: Show the **LaunchRadar recommendations**. *"LaunchRadar identified two high-margin, low-return products to invest in next: 18K PVD Cuban Chains and Celestial Opal Hoops. This is enterprise-grade commerce intelligence made accessible to every small brand."*

---

## 🛡️ Security & Privacy
- **No hardcoded secrets**: All API keys are retrieved dynamically via Google Secret Manager or environment variables.
- Production `.env` and `.env.local` files are ignored in `.gitignore`.
