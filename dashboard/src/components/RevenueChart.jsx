import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { TrendingUp } from 'lucide-react'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div
        style={{
          background: 'rgba(6, 11, 40, 0.95)',
          border: '1px solid rgba(0, 245, 255, 0.4)',
          borderRadius: '12px',
          padding: '12px 16px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7), 0 0 15px rgba(0, 117, 255, 0.3)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '13px', marginBottom: '6px' }}>
          {label} 2026 Performance
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', fontFamily: 'JetBrains Mono, monospace' }}>
          <div style={{ color: '#00F5FF' }}>
            ● Gross Revenue: ₹{data.gmv} Lakh
          </div>
          <div style={{ color: '#01B574' }}>
            ● Real Net Profit: ₹{data.netProfit} Lakh ({data.marginPct}%)
          </div>
          <div style={{ color: '#8E9BAC', fontSize: '11px', marginTop: '4px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '4px' }}>
            COGS: ₹{data.cogs}L · Ads: ₹{data.adSpend}L
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default function RevenueChart({ data }) {
  return (
    <div
      style={{
        borderRadius: '24px',
        padding: '24px',
        background: 'linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0px 20px 50px rgba(0, 0, 0, 0.5)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <div style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: 700 }}>
            Gross Sales vs. Real Pocket Margin
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', color: '#01B574', fontSize: '13px', fontWeight: 600 }}>
            <TrendingUp size={14} />
            <span>(+14.2%) more revenue than last quarter</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#8E9BAC' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0075FF', boxShadow: '0 0 8px #0075FF' }} />
            <span>Gross GMV (₹ Lakhs)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#8E9BAC' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00F5FF', boxShadow: '0 0 8px #00F5FF' }} />
            <span>Real Net Profit</span>
          </div>
        </div>
      </div>

      <div style={{ height: '280px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="gmvGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0075FF" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#0075FF" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00F5FF" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#00F5FF" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#6A788F"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.08)' }}
            />
            <YAxis
              stroke="#6A788F"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `₹${v}L`}
            />
            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="gmv"
              stroke="#0075FF"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#gmvGrad)"
              style={{ filter: 'drop-shadow(0 0 8px rgba(0, 117, 255, 0.6))' }}
            />
            <Area
              type="monotone"
              dataKey="netProfit"
              stroke="#00F5FF"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#profitGrad)"
              style={{ filter: 'drop-shadow(0 0 10px rgba(0, 245, 255, 0.7))' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
