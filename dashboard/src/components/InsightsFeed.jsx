// File: dashboard/src/components/InsightsFeed.jsx
// What this does: Live-updating feed of AI agent insights.
// Connects to Supabase Realtime when credentials exist, with simulated real-time stream fallback.
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { INITIAL_INSIGHTS } from '../data/mockData'
import { Activity, Sparkles, CheckCircle2 } from 'lucide-react'

const AGENT_COLORS = {
  MarginMap: '#E94560',
  SourceSense: '#00D8F6',
  ReturnIQ: '#FFD166',
  LaunchRadar: '#06D6A0',
}

export default function InsightsFeed() {
  const [insights, setInsights] = useState(INITIAL_INSIGHTS)
  const [filterAgent, setFilterAgent] = useState('ALL')
  const [actionNotice, setActionNotice] = useState(null)

  useEffect(() => {
    // 1. Load existing insights from Supabase if available
    if (supabase) {
      supabase
        .from('agent_insights')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20)
        .then(({ data }) => {
          if (data && data.length > 0) {
            setInsights(data)
          }
        })
        .catch(err => console.log('Using default feed:', err))

      // 2. Subscribe to real-time updates via postgres_changes
      const channel = supabase
        .channel('insights-live')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'agent_insights' },
          ({ new: newInsight }) => {
            setInsights((prev) => [newInsight, ...prev].slice(0, 30))
          }
        )
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }
  }, [])

  const handleSimulateNewInsight = () => {
    const agents = ['SourceSense', 'MarginMap', 'ReturnIQ', 'LaunchRadar']
    const pick = agents[Math.floor(Math.random() * agents.length)]

    const newSimulated = {
      id: 'sim-' + Date.now(),
      agent_name: pick,
      agent_badge: 'LIVE AUDIT',
      insight:
        pick === 'SourceSense'
          ? 'New quote from "Okhla Packaging" audited: ₹310/unit vs ₹290 benchmark (+₹20 variance).'
          : pick === 'MarginMap'
          ? 'SKU-RG-02 recalculated with updated Bluedart fuel surcharge: true net margin holds at 39.4%.'
          : pick === 'ReturnIQ'
          ? 'Amazon customer review clustered: 4 buyers mentioned ring box clasp spring popped during courier transit.'
          : 'LaunchRadar trend scan: "18k Waterproof Huggies" search volume jumped +34% in Bangalore & Mumbai.',
      financial_impact:
        pick === 'SourceSense'
          ? '₹30,000/yr potential optimization'
          : pick === 'MarginMap'
          ? '+₹12,400 monthly profit protected'
          : pick === 'ReturnIQ'
          ? 'Packaging fix preserves ₹18,000 revenue'
          : 'Projected ₹1.8L monthly incremental revenue',
      action: 'Click to review telemetry & execute recommended policy',
      created_at: new Date().toISOString(),
    }

    setInsights((prev) => [newSimulated, ...prev])
  }

  const handleExecuteAction = (insight) => {
    setActionNotice(`Executing action for ${insight.agent_name}: "${insight.action}"`)
    setTimeout(() => setActionNotice(null), 3000)
  }

  const filtered = filterAgent === 'ALL'
    ? insights
    : insights.filter((item) => item.agent_name === filterAgent)

  return (
    <div
      style={{
        borderRadius: '24px',
        padding: '28px',
        background: 'linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0px 20px 50px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Header and Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={18} color="#00F5FF" />
            <h2 style={{ color: '#FFFFFF', margin: 0, fontSize: '20px', fontWeight: 800 }}>
              Live AI Agent Activity
            </h2>
          </div>
          <p style={{ color: '#8E9BAC', fontSize: '12px', marginTop: '4px' }}>
            Live data · updates every few seconds
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {['ALL', 'SourceSense', 'MarginMap', 'ReturnIQ', 'LaunchRadar'].map((agent) => (
            <button
              key={agent}
              onClick={() => setFilterAgent(agent)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                background: filterAgent === agent ? '#0075FF' : 'rgba(255, 255, 255, 0.04)',
                color: filterAgent === agent ? '#FFFFFF' : '#8E9BAC',
                border: filterAgent === agent ? '1px solid #00F5FF' : '1px solid rgba(255, 255, 255, 0.08)',
                transition: 'all 0.2s ease',
              }}
            >
              {agent}
            </button>
          ))}

          <button
            onClick={handleSimulateNewInsight}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '8px',
              background: 'rgba(0, 245, 255, 0.15)',
              border: '1px solid rgba(0, 245, 255, 0.4)',
              color: '#00F5FF',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <Sparkles size={13} />
            <span>Simulate Telemetry Event</span>
          </button>
        </div>
      </div>

      {actionNotice && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: '12px',
            background: 'rgba(1, 181, 116, 0.15)',
            border: '1px solid rgba(1, 181, 116, 0.4)',
            color: '#01B574',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px',
          }}
        >
          <CheckCircle2 size={16} />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Feed List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filtered.map((insight) => {
          const agentCol = AGENT_COLORS[insight.agent_name] || '#0075FF'

          return (
            <div
              key={insight.id}
              style={{
                borderLeft: `4px solid ${agentCol}`,
                padding: '16px 20px',
                background: 'linear-gradient(90deg, rgba(15, 23, 42, 0.8) 0%, rgba(6, 11, 40, 0.7) 100%)',
                borderRadius: '0 16px 16px 0',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderLeftColor: agentCol,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      fontWeight: 800,
                      color: agentCol,
                      fontSize: '13px',
                      letterSpacing: '0.8px',
                    }}
                  >
                    ● {insight.agent_name}
                  </span>
                  {insight.sku_id && (
                    <span
                      style={{
                        fontSize: '11px',
                        color: '#8E9BAC',
                        background: 'rgba(255, 255, 255, 0.06)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontFamily: 'JetBrains Mono, monospace',
                      }}
                    >
                      {insight.sku_id}
                    </span>
                  )}
                </div>

                <span style={{ fontSize: '11px', color: '#6A788F' }}>
                  {insight.created_at ? new Date(insight.created_at).toLocaleTimeString() : 'Just now'}
                </span>
              </div>

              <p
                style={{
                  margin: '4px 0 10px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  lineHeight: 1.5,
                  fontWeight: 500,
                }}
              >
                {insight.insight}
              </p>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '8px',
                  paddingTop: '8px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                }}
              >
                <div style={{ fontSize: '12px', color: '#CDD6F4', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#00F5FF', fontWeight: 700 }}>
                    💰 {insight.financial_impact}
                  </span>
                  {insight.action && (
                    <span style={{ color: '#8E9BAC' }}>
                      · ⚡ {insight.action}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleExecuteAction(insight)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '6px',
                    background: `${agentCol}22`,
                    border: `1px solid ${agentCol}66`,
                    color: agentCol,
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Execute Action →
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}