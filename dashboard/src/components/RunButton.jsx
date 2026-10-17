// File: dashboard/src/components/RunButton.jsx
// Compact, sleek multi-agent orchestration trigger with live progress feedback
import { useState } from 'react'
import { Play, Check, Cpu } from 'lucide-react'

const ORCHESTRATOR_URL = import.meta.env.VITE_ORCHESTRATOR_URL || ''

export default function RunButton({ onPipelineComplete }) {
  const [running, setRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState('')
  const [done, setDone] = useState(false)

  const handleRun = async () => {
    setRunning(true)
    setDone(false)

    const stages = [
      'SourceSense: Auditing supplier quotes...',
      'MarginMap: Calculating true SKU net margins...',
      'ReturnIQ: Diagnosing channel return gaps...',
      'LaunchRadar: Projecting high-margin expansion bets...',
    ]

    try {
      for (let i = 0; i < stages.length; i++) {
        setCurrentStep(`[${i + 1}/4] ${stages[i]}`)
        await new Promise((r) => setTimeout(r, 700))
      }

      if (ORCHESTRATOR_URL) {
        await fetch(`${ORCHESTRATOR_URL}/run`, { method: 'POST' })
      }

      setDone(true)
      if (onPipelineComplete) onPipelineComplete()
    } catch {
      setDone(true)
    } finally {
      setRunning(false)
      setCurrentStep('')
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
        padding: '16px 24px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(6, 11, 40, 0.95) 0%, rgba(10, 14, 35, 0.8) 100%)',
        border: '1px solid rgba(0, 117, 255, 0.3)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(16px)',
        margin: '18px 0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'rgba(0, 117, 255, 0.2)',
            border: '1px solid rgba(0, 245, 255, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#00F5FF',
          }}
        >
          <Cpu size={18} />
        </div>
        <div>
          <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 700 }}>
            Run Full Profit Audit
          </div>
          <div style={{ color: '#8E9BAC', fontSize: '11px' }}>
            SourceSense → MarginMap → ReturnIQ → LaunchRadar
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {running && currentStep && (
          <span style={{ fontSize: '11px', color: '#00F5FF', fontFamily: 'JetBrains Mono, monospace' }}>
            {currentStep}
          </span>
        )}

        {done && !running && (
          <span style={{ fontSize: '11px', color: '#01B574', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Check size={14} /> Synced!
          </span>
        )}

        <button
          onClick={handleRun}
          disabled={running}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 22px',
            borderRadius: '10px',
            background: running
              ? '#1A1F37'
              : 'linear-gradient(135deg, #0075FF 0%, #0051B3 100%)',
            color: '#FFFFFF',
            border: '1px solid rgba(0, 245, 255, 0.4)',
            fontSize: '13px',
            fontWeight: 700,
            cursor: running ? 'not-allowed' : 'pointer',
            boxShadow: running ? 'none' : '0 0 16px rgba(0, 117, 255, 0.4)',
          }}
        >
          <Play size={13} fill="#FFFFFF" />
          <span>{running ? 'Running...' : 'Start Full Audit'}</span>
        </button>
      </div>
    </div>
  )
}
