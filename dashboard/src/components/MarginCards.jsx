// File: dashboard/src/components/MarginCards.jsx
// What this does: Shows all SKUs ranked by margin health.
// Flags money-losing SKUs (red card = margin below 10% or negative after fees + returns).
// Green = healthy positive margin.
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const FALLBACK_SKUS = [
  {
    id: 'sku-7',
    sku_id: 'SKU007',
    sku_name: 'Silver Toe Ring (Pack of 4)',
    channel: 'Amazon FBA',
    true_net_margin_pct: -14.2,
    revenue_30d: 127680,
    cost_total: 145820,
    profit_30d: -18140,
    returns_pct: 28.5,
  },
  {
    id: 'sku-1',
    sku_id: 'SKU001',
    sku_name: 'Rose Gold Anklet',
    channel: 'Amazon FBA',
    true_net_margin_pct: 8.4,
    revenue_30d: 327590,
    cost_total: 300072,
    profit_30d: 27518,
    returns_pct: 31.0,
  },
  {
    id: 'sku-2',
    sku_id: 'SKU002',
    sku_name: 'Rose Gold Anklet',
    channel: 'Shopify Direct',
    true_net_margin_pct: 39.8,
    revenue_30d: 284620,
    cost_total: 171341,
    profit_30d: 113279,
    returns_pct: 4.1,
  },
  {
    id: 'sku-3',
    sku_id: 'SKU003',
    sku_name: 'Brass Oxidised Ring',
    channel: 'Amazon FBA',
    true_net_margin_pct: 12.6,
    revenue_30d: 184500,
    cost_total: 161253,
    profit_30d: 23247,
    returns_pct: 9.2,
  },
  {
    id: 'sku-4',
    sku_id: 'SKU004',
    sku_name: 'Brass Oxidised Ring',
    channel: 'Shopify Direct',
    true_net_margin_pct: 44.5,
    revenue_30d: 215000,
    cost_total: 119325,
    profit_30d: 95675,
    returns_pct: 3.8,
  },
  {
    id: 'sku-8',
    sku_id: 'SKU008',
    sku_name: 'Temple Earrings Gold',
    channel: 'Shopify Direct',
    true_net_margin_pct: 48.2,
    revenue_30d: 347710,
    cost_total: 180113,
    profit_30d: 167597,
    returns_pct: 2.1,
  },
  {
    id: 'sku-5',
    sku_id: 'SKU005',
    sku_name: 'Kundan Necklace Set',
    channel: 'Amazon FBA',
    true_net_margin_pct: 21.4,
    revenue_30d: 379810,
    cost_total: 298530,
    profit_30d: 81280,
    returns_pct: 8.6,
  },
  {
    id: 'sku-6',
    sku_id: 'SKU006',
    sku_name: 'Kundan Necklace Set',
    channel: 'Shopify Direct',
    true_net_margin_pct: 41.5,
    revenue_30d: 322830,
    cost_total: 188855,
    profit_30d: 133975,
    returns_pct: 4.4,
  },
]

function MarginCard({ sku }) {
  const isUnhealthy = sku.true_net_margin_pct < 10
  const isNegative = sku.true_net_margin_pct < 0

  const cardBg = isNegative
    ? 'linear-gradient(135deg, rgba(233, 69, 96, 0.16) 0%, rgba(15, 23, 42, 0.75) 100%)'
    : isUnhealthy
    ? 'linear-gradient(135deg, rgba(255, 181, 71, 0.14) 0%, rgba(15, 23, 42, 0.75) 100%)'
    : 'linear-gradient(135deg, rgba(6, 214, 160, 0.12) 0%, rgba(15, 23, 42, 0.75) 100%)'

  const accentCol = isNegative ? '#FF3B80' : isUnhealthy ? '#FFB547' : '#01B574'
  const badgeText = isNegative
    ? '⚠️ LOSING MONEY'
    : isUnhealthy
    ? '⚡ HIGH DRAG (<10%)'
    : '✓ HEALTHY MARGIN'

  return (
    <div
      style={{
        background: cardBg,
        borderRadius: '16px',
        padding: '20px',
        border: `1px solid ${accentCol}44`,
        boxShadow: `0 10px 30px rgba(0, 0, 0, 0.4), 0 0 15px ${accentCol}22`,
        backdropFilter: 'blur(12px)',
        position: 'relative',
        transition: 'all 0.25s ease',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span
          style={{
            color: accentCol,
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '1.5px',
            padding: '3px 8px',
            borderRadius: '6px',
            background: `${accentCol}22`,
            border: `1px solid ${accentCol}44`,
          }}
        >
          {badgeText}
        </span>
        <span
          style={{
            fontSize: '11px',
            color: '#8E9BAC',
            fontFamily: 'JetBrains Mono, monospace',
          }}
        >
          {sku.sku_id}
        </span>
      </div>

      <h3 style={{ color: '#FFFFFF', margin: '8px 0 4px', fontSize: '16px', fontWeight: 700 }}>
        {sku.sku_name}
      </h3>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <span
          style={{
            fontSize: '12px',
            color: sku.channel.includes('Amazon') ? '#FFA41C' : '#95BF47',
            fontWeight: 600,
          }}
        >
          ● {sku.channel}
        </span>
        {sku.returns_pct && (
          <span style={{ fontSize: '11px', color: '#8E9BAC' }}>
            ({sku.returns_pct}% return rate)
          </span>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '10px', borderRadius: '10px' }}>
          <div style={{ color: '#8E9BAC', fontSize: '10px', fontWeight: 600, letterSpacing: '0.8px' }}>
            TRUE NET MARGIN
          </div>
          <div
            style={{
              color: accentCol,
              fontSize: '22px',
              fontWeight: 800,
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            {sku.true_net_margin_pct.toFixed(1)}%
          </div>
        </div>

        <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '10px', borderRadius: '10px' }}>
          <div style={{ color: '#8E9BAC', fontSize: '10px', fontWeight: 600, letterSpacing: '0.8px' }}>
            NET PROFIT (30D)
          </div>
          <div
            style={{
              color: isNegative ? '#FF3B80' : '#FFFFFF',
              fontSize: '18px',
              fontWeight: 700,
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            ₹{sku.profit_30d?.toLocaleString('en-IN') || '—'}
          </div>
        </div>

        <div style={{ background: 'rgba(0, 0, 0, 0.15)', padding: '8px', borderRadius: '8px' }}>
          <div style={{ color: '#8E9BAC', fontSize: '10px' }}>REVENUE</div>
          <div style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>
            ₹{sku.revenue_30d?.toLocaleString('en-IN') || '—'}
          </div>
        </div>

        <div style={{ background: 'rgba(0, 0, 0, 0.15)', padding: '8px', borderRadius: '8px' }}>
          <div style={{ color: '#8E9BAC', fontSize: '10px' }}>TOTAL COST</div>
          <div style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>
            ₹{sku.cost_total?.toLocaleString('en-IN') || '—'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MarginCards() {
  const [skus, setSkus] = useState(FALLBACK_SKUS)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (supabase) {
      supabase
        .from('sku_margins')
        .select('*')
        .order('true_net_margin_pct', { ascending: true })
        .then(({ data }) => {
          if (data && data.length > 0) {
            setSkus(data)
          }
        })
        .catch(err => console.log('Using default margin data:', err))
    }
  }, [])

  const filtered = skus.filter(s => {
    if (filter === 'losing') return s.true_net_margin_pct < 10
    if (filter === 'healthy') return s.true_net_margin_pct >= 20
    if (filter === 'amazon') return s.channel?.toLowerCase().includes('amazon')
    if (filter === 'shopify') return s.channel?.toLowerCase().includes('shopify')
    return true
  })

  return (
    <div style={{ padding: '24px 0' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        <div>
          <h2 style={{ color: '#FFFFFF', margin: 0, fontSize: '20px', fontWeight: 700 }}>
            SKU Unit Economics & Margin Intelligence
          </h2>
          <p style={{ color: '#8E9BAC', fontSize: '13px', marginTop: '4px' }}>
            Calculated after raw COGS, Amazon referral fees, FBA pick & pack, and channel return penalty
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All SKUs' },
            { id: 'losing', label: '⚠️ Losing / Sub-10%' },
            { id: 'healthy', label: '✓ Healthy (>20%)' },
            { id: 'amazon', label: 'Amazon FBA' },
            { id: 'shopify', label: 'Shopify Direct' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                background: filter === tab.id ? '#0075FF' : 'rgba(255, 255, 255, 0.05)',
                color: filter === tab.id ? '#FFFFFF' : '#8E9BAC',
                border: filter === tab.id ? '1px solid #00F5FF' : '1px solid rgba(255, 255, 255, 0.08)',
                transition: 'all 0.2s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: '18px',
        }}
      >
        {filtered.map(sku => (
          <MarginCard key={sku.id || sku.sku_id} sku={sku} />
        ))}
      </div>
    </div>
  )
}
