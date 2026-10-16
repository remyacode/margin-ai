import { MoreHorizontal } from 'lucide-react'

export default function CapitalEfficiencyCard({ brandInfo }) {
  const score = 9.4
  const radius = 48
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (circumference * 0.94)

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 700 }}>
            Capital Efficiency Index
          </div>
          <div style={{ color: '#8E9BAC', fontSize: '12px', marginTop: '2px' }}>
            Leakage vs. Recovery Score
          </div>
        </div>
        <button
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            borderRadius: '8px',
            color: '#8E9BAC',
            padding: '6px',
            cursor: 'pointer',
          }}
        >
          <MoreHorizontal size={16} />
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '16px',
        }}
      >
        {/* Left side breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div
            style={{
              padding: '10px 14px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <div style={{ color: '#8E9BAC', fontSize: '11px', textTransform: 'uppercase' }}>
              Identified Leakage
            </div>
            <div
              style={{
                color: '#FF3B80',
                fontSize: '16px',
                fontWeight: 700,
                fontFamily: 'JetBrains Mono, monospace',
                marginTop: '2px',
              }}
            >
              {brandInfo.leakageIdentified}
            </div>
          </div>

          <div
            style={{
              padding: '10px 14px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <div style={{ color: '#8E9BAC', fontSize: '11px', textTransform: 'uppercase' }}>
              Prevented YTD
            </div>
            <div
              style={{
                color: '#01B574',
                fontSize: '16px',
                fontWeight: 700,
                fontFamily: 'JetBrains Mono, monospace',
                marginTop: '2px',
              }}
            >
              {brandInfo.leakagePreventedYtd}
            </div>
          </div>
        </div>

        {/* Right side circular SVG meter */}
        <div style={{ position: 'relative', width: '130px', height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="130" height="130" viewBox="0 0 130 130">
            <circle
              cx="65"
              cy="65"
              r={radius}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="65"
              cy="65"
              r={radius}
              stroke="url(#circle-grad)"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 65 65)"
              style={{ filter: 'drop-shadow(0 0 8px #00F5FF)' }}
            />
            <defs>
              <linearGradient id="circle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0075FF" />
                <stop offset="100%" stopColor="#00F5FF" />
              </linearGradient>
            </defs>
          </svg>

          <div
            style={{
              position: 'absolute',
              textAlign: 'center',
            }}
          >
            <div style={{ color: '#8E9BAC', fontSize: '9px', fontWeight: 600, letterSpacing: '1px' }}>
              EFFICIENCY
            </div>
            <div
              style={{
                color: '#FFFFFF',
                fontSize: '22px',
                fontWeight: 800,
                fontFamily: 'JetBrains Mono, monospace',
                lineHeight: 1.1,
              }}
            >
              {score}
            </div>
            <div style={{ color: '#01B574', fontSize: '9px', fontWeight: 700 }}>
              Top 5% D2C
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
