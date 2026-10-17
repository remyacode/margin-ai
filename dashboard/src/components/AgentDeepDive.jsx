import { useState, useEffect, useRef } from 'react'
import { Search, MapPin, RefreshCw, Rocket, ChevronDown, X } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function AgentDeepDive({ agents, initialAgent }) {
  const [selectedAgent, setSelectedAgent] = useState('SourceSense')
  const [insights, setInsights] = useState({})
  const [selectedSku, setSelectedSku] = useState({})
  const [loading, setLoading] = useState(true)
  const [appliedAction, setAppliedAction] = useState({})
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef(null)

  const agentList = [
    { id: 'SourceSense', name: 'SourceSense', icon: Search, color: '#00D8F6' },
    { id: 'MarginMap', name: 'MarginMap', icon: MapPin, color: '#FF3B80' },
    { id: 'ReturnIQ', name: 'ReturnIQ', icon: RefreshCw, color: '#FFB547' },
    { id: 'LaunchRadar', name: 'LaunchRadar', icon: Rocket, color: '#01B574' },
  ]

  const agentQuestions = {
    SourceSense: 'Am I overpaying suppliers?',
    MarginMap: 'Which SKU actually makes money after all fees?',
    ReturnIQ: 'Why are people returning this product?',
    LaunchRadar: 'What should I invest in next?',
  }

  useEffect(() => {
    const map = { sourcesense: 'SourceSense', marginmap: 'MarginMap', returniq: 'ReturnIQ', launchradar: 'LaunchRadar' }
    if (initialAgent) setSelectedAgent(map[initialAgent] || initialAgent)
    setDropdownOpen(false)
    setSearchQuery('')
  }, [initialAgent])

  useEffect(() => {
    async function fetchInsights() {
      setLoading(true)
      if (!supabase) { setLoading(false); return }
      const [insightsRes, skuRes] = await Promise.all([
        supabase.from("agent_insights").select("*").order("created_at", { ascending: false }),
        supabase.from("sku_margins").select("sku_id,sku_name")
      ])
      const skuNameMap = {}
      if (skuRes.data) skuRes.data.forEach(s => { skuNameMap[s.sku_id] = s.sku_name })
      if (!insightsRes.error && insightsRes.data) {
        const grouped = {}
        insightsRes.data.forEach(row => {
          const enriched = { ...row, product_name: skuNameMap[row.sku_id] || "" }
          if (!grouped[row.agent_name]) grouped[row.agent_name] = []
          grouped[row.agent_name].push(enriched)
        })
        setInsights(grouped)
        const initSku = {}
        Object.keys(grouped).forEach(agent => { initSku[agent] = grouped[agent][0]?.sku_id || "" })
        setSelectedSku(initSku)
      }
      setLoading(false)




















    }
    fetchInsights()
  }, [])

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
        setSearchQuery('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentAgentData = insights[selectedAgent] || []
  const currentSkuId = selectedSku[selectedAgent]
  const currentRow = currentAgentData.find(r => r.sku_id === currentSkuId) || currentAgentData[0]
  const agentColor = agentList.find(a => a.id === selectedAgent)?.color || '#00D8F6'

  const filteredSkus = currentAgentData.filter(row =>
    row.sku_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (row.product_name || row.insight || "").toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div style={{
      borderRadius: '24px', padding: '24px',
      background: 'linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      boxShadow: '0px 20px 50px rgba(0, 0, 0, 0.5)',
      marginBottom: '24px',
    }}>

      {/* Agent Tabs */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '12px', paddingBottom: '16px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)', marginBottom: '20px',
      }}>
        <div>
          <div style={{ fontSize: '11px', color: '#8E9BAC', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Your AI Profit Assistants
          </div>
          <h2 style={{ color: '#FFFFFF', margin: 0, fontSize: '18px', fontWeight: 800 }}>
            {agentQuestions[selectedAgent]}
          </h2>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {agentList.map((a) => {
            const Icon = a.icon
            const isSelected = selectedAgent === a.id
            return (
              <button key={a.id} onClick={() => { setSelectedAgent(a.id); setDropdownOpen(false); setSearchQuery('') }} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 14px', borderRadius: '10px',
                background: isSelected ? `${a.color}22` : 'rgba(255,255,255,0.03)',
                border: isSelected ? `1px solid ${a.color}` : '1px solid rgba(255,255,255,0.08)',
                color: isSelected ? '#FFFFFF' : '#8E9BAC',
                fontSize: '12px', fontWeight: isSelected ? 700 : 500, cursor: 'pointer',
                boxShadow: isSelected ? `0 0 12px ${a.color}44` : 'none',
              }}>
                <Icon size={14} color={isSelected ? a.color : '#8E9BAC'} />
                <span>{a.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Searchable Product Dropdown */}
      {currentAgentData.length > 0 && (
        <div style={{ marginBottom: '20px', position: 'relative' }} ref={dropdownRef}>
          <div style={{ fontSize: '11px', color: '#8E9BAC', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Select Product / SKU ({currentAgentData.length} flagged)
          </div>

          {/* Trigger */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              width: '100%', maxWidth: '420px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 14px', borderRadius: '10px', cursor: 'pointer',
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${agentColor}55`,
              color: '#FFFFFF', fontSize: '13px', fontWeight: 600,
            }}
          >
            <span>{currentRow ? `${currentRow.sku_id}${currentRow.product_name ? ' — ' + currentRow.product_name : ''}` : 'Select a product...'}</span>
            <ChevronDown size={14} color={agentColor} style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div style={{
              position: 'absolute', top: '100%', left: 0,
              width: '420px', zIndex: 100,
              background: '#0D1235',
              border: `1px solid ${agentColor}44`,
              borderRadius: '12px', marginTop: '4px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
              overflow: 'hidden',
            }}>
              {/* Search input */}
              <div style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Search size={13} color='#8E9BAC' />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder='Search by SKU or keyword...'
                  style={{
                    flex: 1, background: 'transparent', border: 'none', outline: 'none',
                    color: '#FFFFFF', fontSize: '12px',
                  }}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <X size={13} color='#8E9BAC' />
                  </button>
                )}
              </div>

              {/* Results */}
              <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
                {filteredSkus.length === 0 && (
                  <div style={{ padding: '16px', color: '#8E9BAC', fontSize: '12px', textAlign: 'center' }}>No products match</div>
                )}
                {filteredSkus.map(row => (
                  <button
                    key={row.sku_id}
                    onClick={() => { setSelectedSku(prev => ({ ...prev, [selectedAgent]: row.sku_id })); setDropdownOpen(false); setSearchQuery('') }}
                    style={{
                      width: '100%', textAlign: 'left', padding: '10px 14px',
                      background: row.sku_id === currentSkuId ? `${agentColor}15` : 'transparent',
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      border: 'none', cursor: 'pointer',
                      borderLeft: row.sku_id === currentSkuId ? `3px solid ${agentColor}` : '3px solid transparent',
                    }}
                  >
                    <div style={{ fontSize: '12px', fontWeight: 700, color: row.sku_id === currentSkuId ? agentColor : '#FFFFFF', marginBottom: '2px' }}>
                      {row.sku_id}{row.product_name ? ` — ${row.product_name}` : ""}
                    </div>
                    <div style={{ fontSize: '11px', color: '#8E9BAC', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '360px' }}>
                      {row.insight.slice(0, 80)}...
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Insight Content */}
      {loading && <div style={{ color: '#8E9BAC', fontSize: '14px', padding: '20px 0' }}>Loading AI insights...</div>}

      {!loading && !currentRow && <div style={{ color: '#8E9BAC', fontSize: '14px', padding: '20px 0' }}>No findings for this agent yet.</div>}

      {!loading && currentRow && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>

          {/* Insight card */}
          <div style={{ padding: '18px', borderRadius: '16px', background: 'rgba(255,255,255,0.02)', border: `1px solid ${agentColor}33` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#FFFFFF", marginBottom: "4px" }}>{currentRow.sku_id}{currentRow.product_name ? ` — ${currentRow.product_name}` : ""}</div>
                <div style={{ fontSize: '11px', color: agentColor }}>● {selectedAgent} Analysis</div>
              </div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: agentColor, background: `${agentColor}22`, padding: '2px 8px', borderRadius: '6px' }}>
                {Math.round(currentRow.confidence_pct || 0)}% confidence
              </div>
            </div>

            <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(0,0,0,0.25)', border: `1px solid ${agentColor}22`, marginBottom: '12px' }}>
              <div style={{ fontSize: '12px', color: '#CDD6F4', lineHeight: '1.7' }}>{currentRow.insight}</div>
            </div>

            <div style={{ padding: '10px 14px', borderRadius: '10px', background: `${agentColor}11`, border: `1px solid ${agentColor}33` }}>
              <div style={{ fontSize: '10px', color: '#8E9BAC', marginBottom: '4px' }}>FINANCIAL IMPACT</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: agentColor, fontFamily: 'JetBrains Mono, monospace' }}>
                {currentRow.financial_impact}
              </div>
            </div>
          </div>

          {/* Action card */}
          <div style={{ padding: '18px', borderRadius: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px' }}>Recommended Action</div>
              <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(0,0,0,0.25)', marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', color: '#CDD6F4', lineHeight: '1.7' }}>{currentRow.action}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '10px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '10px', color: '#8E9BAC' }}>AGENT</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: agentColor }}>{currentRow.agent_name}</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '10px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '10px', color: '#8E9BAC' }}>RUN AT</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#CDD6F4' }}>
                    {new Date(currentRow.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setAppliedAction(prev => ({ ...prev, [currentRow.id]: !prev[currentRow.id] }))}
              style={{
                width: '100%', padding: '10px', borderRadius: '10px',
                background: appliedAction[currentRow.id] ? '#01B574' : `linear-gradient(135deg, ${agentColor} 0%, ${agentColor}99 100%)`,
                border: 'none', color: '#FFFFFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer',
              }}
            >
              {appliedAction[currentRow.id] ? '✓ Action Approved' : 'Execute Action →'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
