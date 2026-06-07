'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleFieldProps {
  degraded: boolean
}

export function ParticleField({ degraded }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const count = degraded ? 1200 : 2800

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    const baseWhite = new THREE.Color('#ffffff')
    const tintIndigo = new THREE.Color('#6366f1')
    const tintCyan = new THREE.Color('#06b6d4')

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2 + Math.random() * 16

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)

      const rand = Math.random()
      let color: THREE.Color
      if (rand < 0.75) {
        color = baseWhite
      } else if (rand < 0.90) {
        color = tintIndigo
      } else {
        color = tintCyan
      }

      col[i * 3] = color.r
      col[i * 3 + 1] = color.g
      col[i * 3 + 2] = color.b
    }

    return { positions: pos, colors: col }
  }, [count])

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += delta * 0.012
    pointsRef.current.rotation.x += delta * 0.004
  })

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.35}
        toneMapped={false}
        depthWrite={false}
      />
    </points>
  )
}
