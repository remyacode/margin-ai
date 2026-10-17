import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import StatCards from './components/StatCards'
import HeroWelcomeCard from './components/HeroWelcomeCard'
import MarginHealthGauge from './components/MarginHealthGauge'
import CapitalEfficiencyCard from './components/CapitalEfficiencyCard'
import RevenueChart from './components/RevenueChart'
import ChannelProfitBarChart from './components/ChannelProfitBarChart'
import RunButton from './components/RunButton'
import AgentDeepDive from './components/AgentDeepDive'
import MarginCards from './components/MarginCards'
import InsightsFeed from './components/InsightsFeed'
import HeroScene from './components/HeroScene'

import {
  BRAND_INFO,
  REVENUE_MARGIN_DATA,
  CHANNEL_PROFIT_DATA,
  FOUR_AGENTS,
} from './data/mockData'

export default function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [showNotificationToast, setShowNotificationToast] = useState(false)

  const handleRunAudit = () => {
    setShowNotificationToast(true)
    setTimeout(() => setShowNotificationToast(false), 4000)
  }

  const handleTabChange = (tab) => {
    if (tab === '3d-hero') {
      window.history.pushState({ intro: true }, '', '/')
      setShowIntro(true)
    } else {
      window.history.pushState({ tab }, '', `/${tab}`)
      setActiveTab(tab)
    }
  }

  useEffect(() => {
    const handlePopState = (e) => {
      if (e.state?.tab) setActiveTab(e.state.tab)
      else if (e.state?.intro) setShowIntro(true)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const handleNavigateToAgent = (agentKey) => {
    const tab = agentKey.toLowerCase()
    window.history.pushState({ tab }, '', `/${tab}`)
    setActiveTab(tab)
  }

  // Launch 3D Animation first
  if (showIntro) {
    return (
      <HeroScene
        onEnterDashboard={() => { window.history.pushState({ tab: 'overview' }, '', '/overview'); setShowIntro(false) }}
        onSelectAgent={(agentName) => {
          const t = agentName.toLowerCase(); window.history.pushState({ tab: t }, '', `/${t}`); setActiveTab(t); setShowIntro(false)
        }}
      />
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#060B26',
        color: '#FFFFFF',
        position: 'relative',
      }}
    >
      {/* Toast notification */}
      {showNotificationToast && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 9999,
            padding: '16px 22px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(0, 117, 255, 0.95) 0%, rgba(10, 14, 35, 0.95) 100%)',
            border: '1px solid #00F5FF',
            boxShadow: '0 10px 40px rgba(0, 245, 255, 0.4)',
            backdropFilter: 'blur(16px)',
            color: '#FFFFFF',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            animation: 'pulseGlow 2s infinite',
          }}
        >
          <span style={{ fontSize: '18px' }}>⚡</span>
          <div>
            <div style={{ fontWeight: 800, color: '#00F5FF' }}>Overnight Audit Triggered</div>
            <div style={{ color: '#CDD6F4', fontSize: '11px' }}>
              All 4 agents are re-evaluating BigQuery orders & supplier benchmarks.
            </div>
          </div>
        </div>
      )}

      {/* Vision UI Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Main Content Area */}
      <main
        style={{
          flex: 1,
          padding: '0 32px 60px',
          maxWidth: '1600px',
          margin: '0 auto',
          width: 'calc(100% - 260px)',
          overflowY: 'auto',
        }}
      >
        <Header activeTab={activeTab} onRunAudit={handleRunAudit} />

        {/* ─── TAB 1: MASTER OVERVIEW (Matches Vision UI Reference) ─── */}
        {activeTab === 'overview' && (
          <>
            {/* Top Stat Cards */}
            <StatCards brandInfo={BRAND_INFO} />

            {/* Hero + Guage + Efficiency Row (Vision UI Middle Row) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(420px, 1.8fr) minmax(260px, 1.1fr) minmax(280px, 1.1fr)',
                gap: '24px',
                marginBottom: '24px',
              }}
            >
              <HeroWelcomeCard
                brandInfo={BRAND_INFO}
                onNavigateToAgent={handleNavigateToAgent}
              />
              <MarginHealthGauge />
              <CapitalEfficiencyCard brandInfo={BRAND_INFO} />
            </div>

            {/* Charts Row (Vision UI Bottom Charts) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(500px, 2fr) minmax(320px, 1.2fr)',
                gap: '24px',
                marginBottom: '24px',
              }}
            >
              <RevenueChart data={REVENUE_MARGIN_DATA} />
              <ChannelProfitBarChart channelData={CHANNEL_PROFIT_DATA} />
            </div>

            {/* One-Click Orchestrator Pipeline Trigger */}
            <RunButton onPipelineComplete={() => {}} />

            {/* 4 Dedicated AI Agents Deep Dive */}
            <AgentDeepDive agents={FOUR_AGENTS} onOpenNegotiationModal={() => {}} initialAgent={activeTab} />

            {/* Live Insights Feed */}
            <InsightsFeed />
          </>
        )}

        {/* ─── INDIVIDUAL AGENT WORKSPACES ─── */}
        {(activeTab === 'sourcesense' ||
          activeTab === 'marginmap' ||
          activeTab === 'returniq' ||
          activeTab === 'launchradar') && (
          <div>
            <AgentDeepDive agents={FOUR_AGENTS} onOpenNegotiationModal={() => {}} initialAgent={activeTab} />
            <InsightsFeed />
          </div>
        )}

        {/* ─── TAB: ALL SKUs INTELLIGENCE ─── */}
        {activeTab === 'skus' && (
          <div>
            <MarginCards />
          </div>
        )}

        {/* ─── TAB: LIVE TELEMETRY STREAM ─── */}
        {activeTab === 'feed' && (
          <div>
            <RunButton onPipelineComplete={() => {}} />
            <InsightsFeed />
          </div>
        )}

        {/* ─── TAB: 3D THREE.JS EXPERIENCE ─── */}
        {activeTab === '3d-hero' && (
          <div>
            <HeroScene
              onEnterDashboard={() => setActiveTab('overview')}
              onSelectAgent={(agent) => setActiveTab(agent.toLowerCase())}
            />
          </div>
        )}
      </main>
    </div>
  )
}
