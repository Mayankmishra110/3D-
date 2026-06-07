'use client'

import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export function PostProcessing() {
  return (
    <EffectComposer>
      {/* Existing effects — keep these */}
      <Bloom
        luminanceThreshold={0.1}
        luminanceSmoothing={0.9}
        intensity={0.4}
        mipmapBlur
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={[0.0005, 0.0005] as any}
        radialModulation={false}
        modulationOffset={0}
      />

      {/* ─── NEW: Cinematic depth & grain ─── */}
      <Vignette
        eskil={false}
        offset={0.15}       // how far from edges the vignette starts
        darkness={0.9}      // 0 = no vignette, 1 = full black edges
        blendFunction={BlendFunction.NORMAL}
      />
      <Noise
        opacity={0.025}     // very subtle — just enough for texture
        blendFunction={BlendFunction.SCREEN}
      />
    </EffectComposer>
  )
}
