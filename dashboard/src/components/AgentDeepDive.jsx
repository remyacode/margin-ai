import { useState } from 'react'
import {
  Search,
  MapPin,
  RefreshCw,
  Rocket,
  Copy,
  Check,
} from 'lucide-react'

export default function AgentDeepDive({ agents }) {
  const [selectedAgent, setSelectedAgent] = useState('SourceSense')
  const [copiedScript, setCopiedScript] = useState(false)
  const [appliedPackagingFix, setAppliedPackagingFix] = useState(false)
  const [pausedAmazonSku, setPausedAmazonSku] = useState(false)

  const agentList = [
    { id: 'SourceSense', name: 'SourceSense', icon: Search, color: '#00D8F6', tag: 'SUPPLIER ARBITRAGE' },
    { id: 'MarginMap', name: 'MarginMap', icon: MapPin, color: '#FF3B80', tag: 'TRUE UNIT ECONOMICS' },
    { id: 'ReturnIQ', name: 'ReturnIQ', icon: RefreshCw, color: '#FFB547', tag: 'CHANNEL RETURN GAP' },
    { id: 'LaunchRadar', name: 'LaunchRadar', icon: Rocket, color: '#01B574', tag: 'GROWTH & EXPANSION' },
  ]

  const current = agents[selectedAgent] || agents['SourceSense']

  const handleCopyScript = () => {
    navigator.clipboard.writeText(current.details?.suggestedScript || '')
    setCopiedScript(true)
    setTimeout(() => setCopiedScript(false), 2500)
  }

  return (
    <div
      style={{
        borderRadius: '24px',
        padding: '24px',
        background: 'linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0px 20px 50px rgba(0, 0, 0, 0.5)',
        marginBottom: '24px',
      }}
    >
      {/* Header and Agent Selector Tabs */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          paddingBottom: '16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          marginBottom: '20px',
        }}
      >
        <div>
          <div style={{ fontSize: '11px', color: '#8E9BAC', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Autonomous AI Workspaces
          </div>
          <h2 style={{ color: '#FFFFFF', margin: 0, fontSize: '18px', fontWeight: 800 }}>
            {current.question}
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {agentList.map((a) => {
            const Icon = a.icon
            const isSelected = selectedAgent === a.id
            return (
              <button
                key={a.id}
                onClick={() => setSelectedAgent(a.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  background: isSelected ? `${a.color}22` : 'rgba(255, 255, 255, 0.03)',
                  border: isSelected ? `1px solid ${a.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                  color: isSelected ? '#FFFFFF' : '#8E9BAC',
                  fontSize: '12px',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  boxShadow: isSelected ? `0 0 12px ${a.color}44` : 'none',
                }}
              >
                <Icon size={14} color={isSelected ? a.color : '#8E9BAC'} />
                <span>{a.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ─── CASE 1: SOURCESENSE (Visual Comparison Bars) ─── */}
      {selectedAgent === 'SourceSense' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {/* Visual Price Comparison */}
          <div style={{ padding: '18px', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>Price Audit vs. Market Benchmark</span>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#FF3B80', background: 'rgba(255,59,128,0.15)', padding: '2px 8px', borderRadius: '6px' }}>
                -₹1.95L / yr Leakage
              </span>
            </div>

            {/* Price Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ color: '#8E9BAC' }}>Apex PolyPack (Current)</span>
                  <span style={{ color: '#FF3B80', fontWeight: 800, fontFamily: 'JetBrains Mono, monospace' }}>₹420/unit</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '100%', height: '100%', background: '#FF3B80', borderRadius: '4px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ color: '#8E9BAC' }}>Morbi Benchmark (Fair Rate)</span>
                  <span style={{ color: '#01B574', fontWeight: 800, fontFamily: 'JetBrains Mono, monospace' }}>₹290/unit</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '69%', height: '100%', background: '#01B574', borderRadius: '4px' }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '10px', borderRadius: '10px' }}>
                <div style={{ fontSize: '10px', color: '#8E9BAC' }}>OVERPAY PER UNIT</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#FF3B80', fontFamily: 'JetBrains Mono, monospace' }}>+₹130</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '10px', borderRadius: '10px' }}>
                <div style={{ fontSize: '10px', color: '#8E9BAC' }}>ANNUAL VOLUME</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', fontFamily: 'JetBrains Mono, monospace' }}>15,000 units</div>
              </div>
            </div>
          </div>

          {/* Alternatives & Action */}
          <div style={{ padding: '18px', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>
                3 Pre-Vetted Alternative Suppliers
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                {[
                  { name: 'Kuber Packaging (Morbi)', rate: '₹285', moq: '2.5k', score: '4.8 ★' },
                  { name: 'Vibrant Printcraft (Bhiwandi)', rate: '₹292', moq: '1.5k', score: '4.9 ★' },
                  { name: 'Surat EcoBox Hub', rate: '₹290', moq: '3k', score: '4.7 ★' },
                ].map((s) => (
                  <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', fontSize: '12px' }}>
                    <span style={{ color: '#CDD6F4' }}>{s.name}</span>
                    <span style={{ color: '#01B574', fontWeight: 800, fontFamily: 'JetBrains Mono, monospace' }}>
                      {s.rate}/unit · <span style={{ color: '#FFB547' }}>{s.score}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleCopyScript}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '10px',
                background: copiedScript ? '#01B574' : 'linear-gradient(135deg, #0075FF 0%, #0052B3 100%)',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              {copiedScript ? <Check size={14} /> : <Copy size={14} />}
              <span>{copiedScript ? 'WhatsApp Script Copied!' : 'Copy Pre-Drafted Negotiation Script'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ─── CASE 2: MARGINMAP (Visual Waterfall Chips) ─── */}
      {selectedAgent === 'MarginMap' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {/* Waterfall Unit Economics Chips */}
          <div style={{ padding: '18px', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>Silver Toe Ring (4-pack)</span>
                <div style={{ fontSize: '11px', color: '#FF3B80' }}>● Amazon FBA Prime (SKU007)</div>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#FF3B80', background: 'rgba(255,59,128,0.15)', padding: '2px 8px', borderRadius: '6px' }}>
                ⚠️ LOSS MAKER
              </span>
            </div>

            {/* Horizontal Waterfall Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
              {[
                { label: 'Sale', val: '+₹399', col: '#01B574' },
                { label: 'COGS', val: '-₹320', col: '#8E9BAC' },
                { label: 'Amazon 18%', val: '-₹72', col: '#FF3B80' },
                { label: 'Shipping', val: '-₹60', col: '#8E9BAC' },
                { label: '22% Returns', val: '-₹85', col: '#FF3B80' },
                { label: 'Net Profit', val: '-₹138/unit', col: '#FF3B80', highlight: true },
              ].map((c) => (
                <div
                  key={c.label}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '8px',
                    background: c.highlight ? 'rgba(255,59,128,0.2)' : 'rgba(255,255,255,0.04)',
                    border: c.highlight ? '1px solid #FF3B80' : '1px solid rgba(255,255,255,0.06)',
                    fontSize: '11px',
                  }}
                >
                  <span style={{ color: '#8E9BAC' }}>{c.label}: </span>
                  <span style={{ color: c.col, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>{c.val}</span>
                </div>
              ))}
            </div>

            <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,59,128,0.1)', color: '#FF889B', fontSize: '12px', fontWeight: 600 }}>
              Burn rate: -₹18,140/mo in cash while generating reported sales!
            </div>
          </div>

          {/* Side by side comparison */}
          <div style={{ padding: '18px', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px' }}>
                Channel Profit Comparison
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(255,59,128,0.1)', border: '1px solid rgba(255,59,128,0.25)' }}>
                  <div style={{ fontSize: '10px', color: '#8E9BAC' }}>AMAZON FBA</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#FF3B80', fontFamily: 'JetBrains Mono, monospace' }}>-14.2%</div>
                  <div style={{ fontSize: '10px', color: '#8E9BAC' }}>Losing cash</div>
                </div>
                <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(1,181,116,0.1)', border: '1px solid rgba(1,181,116,0.25)' }}>
                  <div style={{ fontSize: '10px', color: '#8E9BAC' }}>SHOPIFY DTC</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#01B574', fontFamily: 'JetBrains Mono, monospace' }}>+39.8%</div>
                  <div style={{ fontSize: '10px', color: '#01B574' }}>Clean profit</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setPausedAmazonSku(!pausedAmazonSku)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '10px',
                background: pausedAmazonSku ? '#01B574' : '#FF3B80',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {pausedAmazonSku ? '✓ Amazon Delisting Directive Sent' : 'Delist SKU from Amazon → Shift to Shopify Exclusive'}
            </button>
          </div>
        </div>
      )}

      {/* ─── CASE 3: RETURNIQ (Visual Return Gauges) ─── */}
      {selectedAgent === 'ReturnIQ' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '18px', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px' }}>
              Rose Gold Anklet: Return Discrepancy
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
              <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(255,59,128,0.1)', border: '1px solid rgba(255,59,128,0.25)' }}>
                <div style={{ fontSize: '10px', color: '#8E9BAC' }}>AMAZON RETURN</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#FF3B80', fontFamily: 'JetBrains Mono, monospace' }}>31.0%</div>
                <div style={{ fontSize: '10px', color: '#FF889B' }}>₹84,200/mo reverse cost</div>
              </div>
              <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(1,181,116,0.1)', border: '1px solid rgba(1,181,116,0.25)' }}>
                <div style={{ fontSize: '10px', color: '#8E9BAC' }}>SHOPIFY RETURN</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#01B574', fontFamily: 'JetBrains Mono, monospace' }}>4.1%</div>
                <div style={{ fontSize: '10px', color: '#01B574' }}>Controlled</div>
              </div>
            </div>

            {/* Root Cause Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span style={{ color: '#CDD6F4' }}>Clasp damaged in FBA chutes</span>
                <span style={{ color: '#FFB547', fontWeight: 700 }}>64%</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '64%', height: '100%', background: '#FFB547' }} />
              </div>
            </div>
          </div>

          <div style={{ padding: '18px', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
                Packaging Fix & Revenue Recovery
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '10px', color: '#8E9BAC' }}>UPGRADE COST</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#00F5FF', fontFamily: 'JetBrains Mono, monospace' }}>+₹14/unit</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '10px', color: '#8E9BAC' }}>NET SAVINGS</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#01B574', fontFamily: 'JetBrains Mono, monospace' }}>₹68,000/mo</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setAppliedPackagingFix(!appliedPackagingFix)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '10px',
                background: appliedPackagingFix ? '#01B574' : 'linear-gradient(135deg, #FFB547 0%, #D4881A 100%)',
                border: 'none',
                color: appliedPackagingFix ? '#FFFFFF' : '#060B26',
                fontSize: '12px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              {appliedPackagingFix ? '✓ Rigid Pouch Spec Approved' : 'Apply Rigid Pouch Packaging Fix (+₹14)'}
            </button>
          </div>
        </div>
      )}

      {/* ─── CASE 4: LAUNCHRADAR (Visual Product Cards) ─── */}
      {selectedAgent === 'LaunchRadar' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {[
            {
              name: '18K PVD Cuban Link Chain',
              margin: '74.7%',
              ret: '<2.4%',
              moq: '250 units',
              cap: '₹1.2L',
              payback: '18 days',
            },
            {
              name: 'Celestial Opal Huggie Hoops',
              margin: '75.6%',
              ret: '<1.8%',
              moq: '350 units',
              cap: '₹1.19L',
              payback: '22 days',
            },
          ].map((item, i) => (
            <div
              key={item.name}
              style={{
                padding: '16px',
                borderRadius: '14px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(1, 181, 116, 0.35)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#01B574', background: 'rgba(1,181,116,0.15)', padding: '2px 6px', borderRadius: '4px' }}>
                  BET #{i + 1}
                </span>
                <span style={{ fontSize: '11px', color: '#8E9BAC' }}>Payback: {item.payback}</span>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>
                {item.name}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '8px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '9px', color: '#8E9BAC' }}>MARGIN</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#01B574', fontFamily: 'JetBrains Mono, monospace' }}>{item.margin}</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '8px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '9px', color: '#8E9BAC' }}>RETURN</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#00F5FF', fontFamily: 'JetBrains Mono, monospace' }}>{item.ret}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
