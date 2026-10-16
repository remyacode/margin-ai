import {
  LayoutDashboard,
  Search,
  MapPin,
  RefreshCw,
  Rocket,
  Boxes,
  Activity,
  Sparkles,
  Zap,
} from 'lucide-react'

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'sourcesense', label: 'SourceSense', icon: Search, badge: '₹1.95L' },
    { id: 'marginmap', label: 'MarginMap', icon: MapPin, badge: '1 Loss' },
    { id: 'returniq', label: 'ReturnIQ', icon: RefreshCw, badge: '31% vs 4%' },
    { id: 'launchradar', label: 'LaunchRadar', icon: Rocket, badge: '2 SKUs' },
    { id: 'skus', label: 'All SKUs Intelligence', icon: Boxes },
    { id: 'feed', label: 'Live Agent Stream', icon: Activity },
    { id: '3d-hero', label: '3D Neural Core', icon: Sparkles },
  ]

  return (
    <aside
      style={{
        width: '260px',
        minWidth: '260px',
        padding: '24px 16px',
        background: 'linear-gradient(180deg, rgba(6, 11, 40, 0.95) 0%, rgba(10, 14, 35, 0.85) 100%)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div>
        {/* Brand Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 12px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0075FF 0%, #00F5FF 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 0 18px rgba(0, 117, 255, 0.5)',
            }}
          >
            <Zap size={22} />
          </div>
          <div>
            <div
              style={{
                fontSize: '16px',
                fontWeight: 800,
                letterSpacing: '0.8px',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              MARGIN <span style={{ color: '#00F5FF' }}>AI</span>
            </div>
            <div style={{ fontSize: '10px', color: '#8E9BAC', letterSpacing: '0.5px' }}>
              Shopify Autonomous Ops
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '14px',
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(0, 117, 255, 0.35) 0%, rgba(0, 81, 179, 0.25) 100%)'
                    : 'transparent',
                  color: isActive ? '#FFFFFF' : '#8E9BAC',
                  border: isActive
                    ? '1px solid rgba(0, 245, 255, 0.35)'
                    : '1px solid transparent',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: isActive ? 700 : 500,
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                  boxShadow: isActive ? '0 4px 16px rgba(0, 117, 255, 0.25)' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '10px',
                      background: isActive
                        ? '#0075FF'
                        : 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isActive ? '#FFFFFF' : '#8E9BAC',
                      boxShadow: isActive ? '0 0 12px rgba(0, 117, 255, 0.6)' : 'none',
                    }}
                  >
                    <Icon size={16} />
                  </div>
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '6px',
                      background: isActive ? '#00F5FF' : 'rgba(255, 255, 255, 0.08)',
                      color: isActive ? '#060B26' : '#8E9BAC',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Vision UI Style Bottom Card ("Need help? / Documentation") */}
      <div
        style={{
          borderRadius: '16px',
          padding: '16px',
          background: 'radial-gradient(ellipse at 80% 20%, rgba(0, 117, 255, 0.25) 0%, rgba(6, 11, 40, 0.9) 80%)',
          border: '1px solid rgba(0, 117, 255, 0.3)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#01B574',
              boxShadow: '0 0 10px #01B574',
            }}
          />
          <span style={{ fontSize: '11px', color: '#01B574', fontWeight: 700, letterSpacing: '0.8px' }}>
            4 AGENTS ACTIVE
          </span>
        </div>

        <div style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>
          Autonomous Copilot
        </div>
        <div style={{ color: '#8E9BAC', fontSize: '11px', lineHeight: 1.4, marginBottom: '12px' }}>
          Google ADK + Gemini 1.5 Flash watching your Shopify and Amazon store margins 24/7.
        </div>

        <button
          onClick={() => setActiveTab('feed')}
          style={{
            width: '100%',
            padding: '8px 12px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #0075FF 0%, #0051B3 100%)',
            border: 'none',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0, 117, 255, 0.4)',
          }}
        >
          View Live Telemetry →
        </button>
      </div>
    </aside>
  )
}
