import { ArrowRight } from 'lucide-react'
import heroBg from '../assets/hero-bg.jpg'

export default function HeroWelcomeCard({ brandInfo, onNavigateToAgent }) {
  return (
    <div
      style={{
        borderRadius: '24px',
        padding: '24px 28px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '270px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: `url(${heroBg}) center/cover no-repeat`,
        border: '1px solid rgba(0, 117, 255, 0.35)',
        boxShadow: '0px 20px 50px rgba(0, 0, 0, 0.6), inset 0 0 40px rgba(0, 117, 255, 0.2)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(6, 11, 40, 0.94) 0%, rgba(6, 11, 40, 0.6) 60%, rgba(6, 11, 40, 0.2) 100%)',
          zIndex: 1,
        }}
      />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ color: '#8E9BAC', fontSize: '13px', fontWeight: 600 }}>
          Welcome back,
        </div>
        <h2
          style={{
            margin: '2px 0 8px',
            color: '#FFFFFF',
            fontSize: '26px',
            fontWeight: 800,
            letterSpacing: '-0.5px',
          }}
        >
          {brandInfo.founder}
        </h2>
        <div style={{ color: '#00F5FF', fontSize: '13px', fontWeight: 600 }}>
          4 Autonomous Agents active on {brandInfo.name} (₹32.4L/mo)
        </div>
      </div>

      {/* Visual Quick Metric Pills */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          margin: '16px 0',
        }}
      >
        <div
          onClick={() => onNavigateToAgent('sourcesense')}
          style={{
            padding: '10px 12px',
            borderRadius: '12px',
            background: 'rgba(6, 11, 40, 0.8)',
            border: '1px solid rgba(0, 216, 246, 0.4)',
            cursor: 'pointer',
          }}
        >
          <div style={{ fontSize: '10px', color: '#8E9BAC', textTransform: 'uppercase' }}>Supplier Leakage</div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#00D8F6', fontFamily: 'JetBrains Mono, monospace' }}>
            ₹1.95L/yr
          </div>
        </div>

        <div
          onClick={() => onNavigateToAgent('marginmap')}
          style={{
            padding: '10px 12px',
            borderRadius: '12px',
            background: 'rgba(6, 11, 40, 0.8)',
            border: '1px solid rgba(255, 59, 128, 0.4)',
            cursor: 'pointer',
          }}
        >
          <div style={{ fontSize: '10px', color: '#8E9BAC', textTransform: 'uppercase' }}>Loss-Maker SKU</div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#FF3B80', fontFamily: 'JetBrains Mono, monospace' }}>
            -₹186/unit
          </div>
        </div>

        <div
          onClick={() => onNavigateToAgent('returniq')}
          style={{
            padding: '10px 12px',
            borderRadius: '12px',
            background: 'rgba(6, 11, 40, 0.8)',
            border: '1px solid rgba(255, 181, 71, 0.4)',
            cursor: 'pointer',
          }}
        >
          <div style={{ fontSize: '10px', color: '#8E9BAC', textTransform: 'uppercase' }}>Amazon vs Shopify</div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#FFB547', fontFamily: 'JetBrains Mono, monospace' }}>
            31% vs 4%
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <button
          onClick={() => onNavigateToAgent('sourcesense')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'transparent',
            border: 'none',
            color: '#FFFFFF',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <span>Review Agent Action Directives</span>
          <ArrowRight size={15} style={{ color: '#00F5FF' }} />
        </button>
      </div>
    </div>
  )
}
