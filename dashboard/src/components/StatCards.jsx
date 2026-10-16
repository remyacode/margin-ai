import { Wallet, TrendingUp, AlertTriangle, PackageCheck } from 'lucide-react'

export default function StatCards({ brandInfo }) {
  const stats = [
    {
      id: 'rev',
      title: "Monthly Gross Revenue",
      value: brandInfo.monthlyRevenue,
      change: brandInfo.growthMom,
      isPositive: true,
      sublabel: "vs ₹28.4L last month",
      icon: Wallet,
      glowColor: '#0075FF',
    },
    {
      id: 'margin',
      title: "True Net Pocket Margin",
      value: brandInfo.netMargin,
      change: brandInfo.netMarginDelta,
      isPositive: true,
      sublabel: "after all fees & returns",
      icon: TrendingUp,
      glowColor: '#00F5FF',
    },
    {
      id: 'leakage',
      title: "Preventable Leakage",
      value: brandInfo.leakageIdentified,
      change: "1 Supplier Alert",
      isPositive: false,
      sublabel: "₹130/unit overcharge",
      icon: AlertTriangle,
      glowColor: '#FF3B80',
    },
    {
      id: 'returns',
      title: "Blended Return Rate",
      value: brandInfo.blendedReturnRate,
      change: brandInfo.returnRateDelta,
      isPositive: true,
      sublabel: "Shopify 4% · Amazon 28%",
      icon: PackageCheck,
      glowColor: '#01B574',
    },
  ]

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: '20px',
        marginBottom: '24px',
      }}
    >
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.id}
            style={{
              padding: '18px 20px',
              borderRadius: '20px',
              background: 'linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0px 20px 50px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'transform 0.2s ease, border-color 0.2s ease',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#8E9BAC',
                  textTransform: 'uppercase',
                  letterSpacing: '0.6px',
                  marginBottom: '6px',
                }}
              >
                {stat.title}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span
                  style={{
                    fontSize: '22px',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: stat.isPositive ? '#01B574' : '#FF3B80',
                  }}
                >
                  {stat.change}
                </span>
              </div>
              <div style={{ fontSize: '11px', color: '#6A788F', marginTop: '4px' }}>
                {stat.sublabel}
              </div>
            </div>

            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                background: `radial-gradient(circle at 30% 30%, ${stat.glowColor} 0%, #060B26 100%)`,
                border: `1px solid ${stat.glowColor}88`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: `0 0 16px ${stat.glowColor}66`,
              }}
            >
              <Icon size={20} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
