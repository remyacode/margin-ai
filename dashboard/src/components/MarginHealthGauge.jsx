import { ShieldCheck } from 'lucide-react'

export default function MarginHealthGauge() {
  const score = 92

  return (
    <div
      style={{
        borderRadius: '24px',
        padding: '24px',
        background: 'linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0px 20px 50px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
      }}
    >
      <div>
        <div style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 700 }}>
          Margin Protection Rate
        </div>
        <div style={{ color: '#8E9BAC', fontSize: '12px', marginTop: '2px' }}>
          Across all active SKU channels
        </div>
      </div>

      {/* Semi-circle SVG Arc Gauge (Vision UI style) */}
      <div style={{ position: 'relative', width: '100%', height: '140px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
        <svg viewBox="0 0 200 120" style={{ width: '190px', overflow: 'visible' }}>
          {/* Background track */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Active progress arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="url(#gauge-grad)"
            strokeWidth="14"
            strokeDasharray="251.2"
            strokeDashoffset={251.2 * (1 - score / 100)}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease' }}
          />
          <defs>
            <linearGradient id="gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0075FF" />
              <stop offset="60%" stopColor="#00F5FF" />
              <stop offset="100%" stopColor="#01B574" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Indicator Badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0075FF 0%, #00F5FF 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(0, 245, 255, 0.5)',
              marginBottom: '4px',
            }}
          >
            <ShieldCheck size={22} color="#060B26" />
          </div>
        </div>
      </div>

      {/* Bottom readout */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <span style={{ fontSize: '11px', color: '#8E9BAC' }}>0%</span>
        <div style={{ textAlign: 'center' }}>
          <span
            style={{
              fontSize: '22px',
              fontWeight: 800,
              color: '#FFFFFF',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            {score}%
          </span>
          <div style={{ fontSize: '10px', color: '#01B574', fontWeight: 600 }}>
            Audit grade: Excellent
          </div>
        </div>
        <span style={{ fontSize: '11px', color: '#8E9BAC' }}>100%</span>
      </div>
    </div>
  )
}
