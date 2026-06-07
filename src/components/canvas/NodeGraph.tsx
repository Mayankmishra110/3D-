'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { lerp } from '@/lib/utils'
import type { NodeDatum } from '@/types'

const NODE_COUNT = 52
const MAX_DIST = 2.4
const COLORS = [
  new THREE.Color('#6366f1'),
  new THREE.Color('#06b6d4'),
  new THREE.Color('#8b5cf6'),
]
const HOVER_COLOR = new THREE.Color('#ffffff')
const dummy = new THREE.Object3D()

export function NodeGraph() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const lineGeoRef = useRef<THREE.BufferGeometry>(null)
  const hoveredRef = useRef<number | null>(null)

  const { nodes, connections } = useMemo(() => {
    const generatedNodes: NodeDatum[] = []
    const spherical = new THREE.Spherical()

    for (let i = 0; i < NODE_COUNT; i++) {
      const radius = 0.5 + Math.random() * 2.3
      spherical.set(
        radius,
        Math.acos(2 * Math.random() - 1),
        Math.random() * Math.PI * 2
      )

      const rand = Math.random()
      let colorIndex: 0 | 1 | 2
      if (rand < 0.55) colorIndex = 0
      else if (rand < 0.80) colorIndex = 1
      else colorIndex = 2

      generatedNodes.push({
        orbitRadius: radius,
        orbitSpeed: 0.08 + Math.random() * 0.27,
        phase: Math.random() * Math.PI * 2,
        yAmplitude: 0.2 + Math.random() * 0.6,
        colorIndex,
      })
    }

    const initialPositions: THREE.Vector3[] = generatedNodes.map((node) => {
      const angle = node.phase
      const r = node.orbitRadius
      const x = r * Math.cos(angle)
      const y = Math.sin(node.phase * 1.3) * node.yAmplitude
      const z = r * Math.sin(angle) * 0.65
      return new THREE.Vector3(x, y, z)
    })

    const connectionPairs: [number, number][] = []
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (initialPositions[i].distanceTo(initialPositions[j]) < MAX_DIST) {
          connectionPairs.push([i, j])
        }
      }
    }

    return { nodes: generatedNodes, connections: connectionPairs }
  }, [])

  useFrame(({ clock, camera, pointer }) => {
    if (!meshRef.current || !lineGeoRef.current) return

    const t = clock.getElapsedTime()
    const positions: THREE.Vector3[] = []

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      const angle = node.phase + t * node.orbitSpeed
      const r = node.orbitRadius
      const x = r * Math.cos(angle) + Math.sin(t * 0.28 + node.phase) * 0.25
      const y = Math.sin(t * 0.42 + node.phase * 1.3) * node.yAmplitude
      const z = r * Math.sin(angle) * 0.65 + Math.cos(t * 0.2 + node.phase) * 0.2

      const isHovered = i === hoveredRef.current
      dummy.position.set(x, y, z)
      dummy.scale.setScalar(isHovered ? 2.2 : 1.0 + Math.sin(t * 1.5 + node.phase) * 0.05)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)

      const col = isHovered ? HOVER_COLOR : COLORS[node.colorIndex]
      meshRef.current.setColorAt(i, col)

      positions.push(new THREE.Vector3(x, y, z))
    }

    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true
    }

    const lineVerts: number[] = []
    for (let c = 0; c < connections.length; c++) {
      const [i, j] = connections[c]
      const a = positions[i]
      const b = positions[j]
      const dist = a.distanceTo(b)
      if (dist < MAX_DIST * 1.3) {
        lineVerts.push(a.x, a.y, a.z, b.x, b.y, b.z)
      }
    }

    const attr = new THREE.BufferAttribute(new Float32Array(lineVerts), 3)
    lineGeoRef.current.setAttribute('position', attr)
    lineGeoRef.current.computeBoundingSphere()

    camera.position.x = lerp(camera.position.x, pointer.x * 1.8, 0.025)
    camera.position.y = lerp(camera.position.y, pointer.y * 1.0 + 0.5, 0.025)
    camera.lookAt(0, 0, 0)
  })

  return (
    <group>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, NODE_COUNT]}
        frustumCulled={false}
        onPointerMove={(e) => {
          e.stopPropagation()
          hoveredRef.current = e.instanceId ?? null
        }}
        onPointerLeave={() => {
          hoveredRef.current = null
        }}
      >
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshStandardMaterial
          roughness={0.15}
          metalness={0.9}
          emissive="#6366f1"
          emissiveIntensity={2.0}
          toneMapped={false}
        />
      </instancedMesh>

      <lineSegments ref={linesRef} frustumCulled={false}>
        <bufferGeometry ref={lineGeoRef} />
        <lineBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.18}
          toneMapped={false}
        />
      </lineSegments>
    </group>
  )
}
