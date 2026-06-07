'use client'

import { Canvas } from '@react-three/fiber'
import { Preload, AdaptiveDpr, PerformanceMonitor } from '@react-three/drei'
import { Suspense, useState } from 'react'
import { NodeGraph } from './NodeGraph'
import { ParticleField } from './ParticleField'
import { PostProcessing } from './PostProcessing'

export default function SceneContainer() {
  const [degraded, setDegraded] = useState(false)

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 9], fov: 55, near: 0.1, far: 80 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      style={{ width: '100%', height: '100%' }}
    >
      <PerformanceMonitor
        onDecline={() => setDegraded(true)}
        onIncline={() => setDegraded(false)}
        flipflops={3}
      >
        <AdaptiveDpr pixelated />
      </PerformanceMonitor>

      <color attach="background" args={['#02020a']} />
      <fog attach="fog" args={['#02020a', 14, 28]} />

      <ambientLight intensity={0.12} />
      <pointLight position={[6, 6, 4]} intensity={1.2} color="#6366f1" />
      <pointLight position={[-6, -4, -3]} intensity={0.7} color="#06b6d4" />
      <pointLight position={[0, 10, 2]} intensity={0.4} color="#8b5cf6" />
      <pointLight position={[0, 0, 0]} intensity={0.15} color="#ffffff" />

      <Suspense fallback={null}>
        <ParticleField degraded={degraded} />
        <NodeGraph />
        {!degraded && <PostProcessing />}
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
