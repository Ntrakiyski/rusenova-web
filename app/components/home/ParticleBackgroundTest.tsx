import React from 'react'
import ParticleBackground from './ParticleBackground'

export const ParticleBackgroundTest = () => {
  return (
    <div className="w-full h-full">
      <h2 className="text-2xl font-bold mb-4">Particle Background Test</h2>
      <div className="w-full h-96 relative">
        <ParticleBackground
          particleCount={1000}
          connectionDistance={50}
        />
      </div>
    </div>
  )
}

export default ParticleBackgroundTest
