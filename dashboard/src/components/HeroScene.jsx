// File: dashboard/src/components/HeroScene.jsx
// Visual-first 3D Neural Core with Three.js, gyroscopic orbital rings, and floating particle field.
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ArrowRight, Zap } from 'lucide-react'

export default function HeroScene({ onEnterDashboard, onSelectAgent }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x060b26, 0.04)

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 7.0

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // 1. Central Hero Knot
    const knotGeo = new THREE.TorusKnotGeometry(1.6, 0.4, 240, 40, 2, 3)
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x0075ff,
      metalness: 0.9,
      roughness: 0.15,
    })
    const knotMesh = new THREE.Mesh(knotGeo, knotMat)
    scene.add(knotMesh)

    // Wireframe glow
    const haloGeo = new THREE.TorusKnotGeometry(1.63, 0.42, 100, 20, 2, 3)
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    })
    const haloMesh = new THREE.Mesh(haloGeo, haloMat)
    scene.add(haloMesh)

    // 2. Gyroscopic Rings
    const createRing = (radius, tube, color, rotX, rotY) => {
      const geo = new THREE.TorusGeometry(radius, tube, 16, 100)
      const mat = new THREE.MeshStandardMaterial({
        color,
        metalness: 0.8,
        roughness: 0.2,
        emissive: color,
        emissiveIntensity: 0.4,
      })
      const ring = new THREE.Mesh(geo, mat)
      ring.rotation.x = rotX
      ring.rotation.y = rotY
      scene.add(ring)
      return ring
    }

    const ring1 = createRing(3.2, 0.025, 0x00f5ff, Math.PI / 3, 0)
    const ring2 = createRing(3.8, 0.025, 0x7551ff, -Math.PI / 4, Math.PI / 6)
    const ring3 = createRing(4.3, 0.02, 0xff3b80, Math.PI / 6, Math.PI / 3)

    // 3. 4 Orbiting Agent Nodes
    const agentConfigs = [
      { color: 0x00d8f6, dist: 3.2, speed: 0.015, offset: 0 },
      { color: 0xff3b80, dist: 3.8, speed: -0.012, offset: Math.PI / 2 },
      { color: 0xffb547, dist: 4.3, speed: 0.018, offset: Math.PI },
      { color: 0x01b574, dist: 3.5, speed: -0.014, offset: (3 * Math.PI) / 2 },
    ]

    const agentNodes = agentConfigs.map((cfg) => {
      const geo = new THREE.SphereGeometry(0.22, 24, 24)
      const mat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.color,
        emissiveIntensity: 0.9,
      })
      const sphere = new THREE.Mesh(geo, mat)
      scene.add(sphere)
      const light = new THREE.PointLight(cfg.color, 2, 7)
      scene.add(light)
      return { mesh: sphere, light, cfg, angle: cfg.offset }
    })

    // 4. Starfield Particles
    const particleCount = 1000
    const particleGeo = new THREE.BufferGeometry()
    const posArray = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 30
      posArray[i + 1] = (Math.random() - 0.5) * 30
      posArray[i + 2] = (Math.random() - 0.5) * 30
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x00f5ff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    })
    const particleMesh = new THREE.Points(particleGeo, particleMat)
    scene.add(particleMesh)

    // 5. Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.4)
    const p1 = new THREE.PointLight(0x0075ff, 4, 30)
    p1.position.set(5, 5, 5)
    const p2 = new THREE.PointLight(0x7551ff, 3, 30)
    p2.position.set(-5, -3, 3)
    scene.add(ambient, p1, p2)

    // Mouse parallax
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const onMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove)

    gsap.from(knotMesh.scale, { x: 0.1, y: 0.1, z: 0.1, duration: 2, ease: 'power3.out' })

    let animId
    const clock = new THREE.Clock()
    const animate = () => {
      animId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      targetX += (mouseX * 0.7 - targetX) * 0.05
      targetY += (mouseY * 0.7 - targetY) * 0.05
      camera.position.x = targetX * 1.2
      camera.position.y = targetY * 1.2
      camera.lookAt(0, 0, 0)

      knotMesh.rotation.x = elapsed * 0.35
      knotMesh.rotation.y = elapsed * 0.45
      haloMesh.rotation.x = elapsed * 0.35
      haloMesh.rotation.y = elapsed * 0.45

      ring1.rotation.z += 0.005
      ring2.rotation.z -= 0.004
      ring3.rotation.x += 0.006

      agentNodes.forEach((node) => {
        node.angle += node.cfg.speed
        const x = Math.cos(node.angle) * node.cfg.dist
        const y = Math.sin(node.angle * 1.2) * (node.cfg.dist * 0.35)
        const z = Math.sin(node.angle) * node.cfg.dist
        node.mesh.position.set(x, y, z)
        node.light.position.set(x, y, z)
      })

      particleMesh.rotation.y = elapsed * 0.02
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(animId)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      knotGeo.dispose()
      knotMat.dispose()
      particleGeo.dispose()
      particleMat.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: '#060B26',
        overflow: 'hidden',
      }}
    >
      <div ref={mountRef} style={{ position: 'absolute', inset: 0, zIndex: 1 }} />

      {/* Cyber Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(0, 117, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 117, 255, 0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Top Navbar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '24px 36px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #0075FF 0%, #00F5FF 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(0, 245, 255, 0.5)',
            }}
          >
            <Zap size={20} color="#FFFFFF" />
          </div>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.8px' }}>
            MARGIN<span style={{ color: '#00F5FF' }}>.AI</span>
          </span>
        </div>

        <button
          onClick={onEnterDashboard}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 22px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #0075FF 0%, #004DB3 100%)',
            border: '1px solid rgba(0, 245, 255, 0.5)',
            color: '#FFFFFF',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(0, 117, 255, 0.5)',
          }}
        >
          <span>Open Dashboard</span>
          <ArrowRight size={15} />
        </button>
      </div>

      {/* Center UI - Visual & Metric focused */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 10,
          pointerEvents: 'none',
          width: '90%',
          maxWidth: '680px',
        }}
      >
        <h1
          style={{
            fontSize: '56px',
            fontWeight: 900,
            margin: '0 0 10px',
            letterSpacing: '-1px',
            background: 'linear-gradient(135deg, #FFFFFF 30%, #A0C4FF 70%, #00F5FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 10px 40px rgba(0, 117, 255, 0.6)',
          }}
        >
          AUTONOMOUS MARGIN AI
        </h1>

        <div
          style={{
            display: 'inline-flex',
            gap: '12px',
            marginBottom: '28px',
          }}
        >
          <span style={{ padding: '6px 14px', borderRadius: '20px', background: 'rgba(0,117,255,0.2)', border: '1px solid rgba(0,245,255,0.3)', color: '#00F5FF', fontSize: '12px', fontWeight: 700 }}>
            Shopify ₹5L–₹50L/mo
          </span>
          <span style={{ padding: '6px 14px', borderRadius: '20px', background: 'rgba(1,181,116,0.2)', border: '1px solid rgba(1,181,116,0.3)', color: '#01B574', fontSize: '12px', fontWeight: 700 }}>
            ● 4 Agents Live
          </span>
        </div>

        {/* 4 Visual Metric Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px',
            pointerEvents: 'auto',
          }}
        >
          {[
            { name: 'SourceSense', val: '₹1.95L', tag: 'Leakage', col: '#00D8F6' },
            { name: 'MarginMap', val: '-₹186', tag: 'Loss/SKU', col: '#FF3B80' },
            { name: 'ReturnIQ', val: '31% vs 4%', tag: 'Return Gap', col: '#FFB547' },
            { name: 'LaunchRadar', val: '2 SKUs', tag: 'Growth', col: '#01B574' },
          ].map((item) => (
            <div
              key={item.name}
              onClick={() => {
                if (onSelectAgent) onSelectAgent(item.name)
                onEnterDashboard()
              }}
              style={{
                padding: '14px 10px',
                borderRadius: '16px',
                background: 'rgba(6, 11, 40, 0.85)',
                border: `1px solid ${item.col}55`,
                boxShadow: `0 8px 24px rgba(0,0,0,0.5), 0 0 12px ${item.col}22`,
                backdropFilter: 'blur(16px)',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.col, margin: '0 auto 6px', boxShadow: `0 0 8px ${item.col}` }} />
              <div style={{ fontSize: '11px', color: '#8E9BAC', fontWeight: 600 }}>{item.name}</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', fontFamily: 'JetBrains Mono, monospace', margin: '2px 0' }}>
                {item.val}
              </div>
              <div style={{ fontSize: '10px', color: item.col, fontWeight: 700 }}>{item.tag}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
