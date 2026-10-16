import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

export default function ChannelProfitBarChart({ channelData }) {
  const customBarTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload
      return (
        <div
          style={{
            background: 'rgba(6, 11, 40, 0.95)',
            border: '1px solid rgba(0, 245, 255, 0.4)',
            borderRadius: '10px',
            padding: '10px 14px',
            color: '#FFFFFF',
            fontSize: '12px',
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: '4px' }}>{d.channel}</div>
          <div style={{ color: '#00F5FF', fontFamily: 'JetBrains Mono, monospace' }}>
            True Net Margin: {d.marginPct}%
          </div>
          <div style={{ color: '#8E9BAC', fontSize: '11px' }}>
            Return Rate: {d.returnRate} · GMV Share: {d.gmvShare}
          </div>
        </div>
      )
    }
    return null
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        {/* Bar chart canvas */}
        <div
          style={{
            height: '180px',
            background: 'linear-gradient(180deg, rgba(11, 20, 55, 0.6) 0%, rgba(6, 11, 40, 0.8) 100%)',
            borderRadius: '16px',
            padding: '12px',
            marginBottom: '16px',
            border: '1px solid rgba(255, 255, 255, 0.04)',
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={channelData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <XAxis dataKey="channel" hide />
              <YAxis
                stroke="#6A788F"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip content={customBarTooltip} />
              <Bar dataKey="marginPct" radius={[6, 6, 0, 0]} barSize={26}>
                {channelData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.marginPct < 15
                        ? '#FF3B80'
                        : entry.marginPct > 30
                        ? '#00F5FF'
                        : '#0075FF'
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Title */}
        <div style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 700 }}>
          Channel Real Profitability
        </div>
        <div style={{ color: '#01B574', fontSize: '13px', fontWeight: 600, marginTop: '2px' }}>
          Shopify DTC yields 3x higher pocket margin than Amazon
        </div>
      </div>

      {/* 4 Bottom metrics (Vision UI style) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          marginTop: '16px',
        }}
      >
        {channelData.map((ch) => (
          <div
            key={ch.channel}
            style={{
              padding: '10px 12px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', color: '#8E9BAC', fontWeight: 600 }}>
                {ch.channel.split(' ')[0]}
              </span>
              <span
                style={{
                  fontSize: '10px',
                  color: ch.marginPct < 15 ? '#FF3B80' : '#01B574',
                  fontWeight: 700,
                }}
              >
                {ch.returnRate} ret
              </span>
            </div>
            <div
              style={{
                fontSize: '18px',
                fontWeight: 800,
                color: '#FFFFFF',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {ch.marginPct}%
            </div>
            <div style={{ fontSize: '10px', color: '#6A788F' }}>
              {ch.gmvShare} of GMV
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
