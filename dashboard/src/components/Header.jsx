import { useState } from 'react'
import { Search, Store, Sparkles } from 'lucide-react'

export default function Header({ activeTab, onRunAudit }) {
  const [searchValue, setSearchValue] = useState('')

  const titles = {
    overview: 'Autonomous Commerce Overview',
    sourcesense: 'SourceSense — Supplier Price Arbitrage',
    marginmap: 'MarginMap — True Unit Economics',
    returniq: 'ReturnIQ — Channel Return Discrepancies',
    launchradar: 'LaunchRadar — Product Expansion AI',
    skus: 'All SKUs Intelligence & Unit Economics',
    feed: 'Real-Time Autonomous Agent Stream',
    '3d-hero': '3D Neural Architecture',
  }

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 28px',
        marginBottom: '20px',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'rgba(6, 11, 40, 0.75)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#8E9BAC' }}>
          <span>Pages</span>
          <span>/</span>
          <span style={{ color: '#FFFFFF', textTransform: 'capitalize' }}>{activeTab}</span>
        </div>
        <h1
          style={{
            margin: '2px 0 0',
            fontSize: '18px',
            fontWeight: 800,
            color: '#FFFFFF',
            letterSpacing: '-0.3px',
          }}
        >
          {titles[activeTab] || 'Dashboard'}
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Store Switcher Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 14px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            fontSize: '12px',
            color: '#FFFFFF',
          }}
        >
          <Store size={15} style={{ color: '#00F5FF' }} />
          <div>
            <span style={{ fontWeight: 700 }}>Aura Luxe Demi-Fine</span>{' '}
            <span style={{ color: '#8E9BAC', fontSize: '11px' }}>(₹32.4L/mo)</span>
          </div>
        </div>

        {/* Vision UI Glass Search Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 14px',
            borderRadius: '12px',
            background: 'rgba(15, 23, 42, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            width: '260px',
          }}
        >
          <Search size={14} style={{ color: '#8E9BAC' }} />
          <input
            type="text"
            placeholder="Ask AI: Why is Amazon margin low?"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#FFFFFF',
              fontSize: '12px',
              width: '100%',
            }}
          />
        </div>

        {/* Overnight Audit Quick Trigger */}
        <button
          onClick={onRunAudit}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #0075FF 0%, #7551FF 100%)',
            border: '1px solid rgba(0, 245, 255, 0.4)',
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0, 117, 255, 0.35)',
            transition: 'all 0.2s ease',
          }}
        >
          <Sparkles size={14} />
          <span>Run AI Audit</span>
        </button>

        {/* Status indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '20px',
            background: 'rgba(1, 181, 116, 0.12)',
            border: '1px solid rgba(1, 181, 116, 0.3)',
            color: '#01B574',
            fontSize: '11px',
            fontWeight: 700,
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#01B574',
              boxShadow: '0 0 8px #01B574',
            }}
          />
          Live Realtime
        </div>
      </div>
    </header>
  )
}
