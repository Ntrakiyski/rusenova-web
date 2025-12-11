import React from 'react'
import ParticleBackground from './ParticleBackground'

export const ParticleBackgroundDemo = () => {
  return (
    <div className="relative w-screen h-screen">
      <ParticleBackground
        particleCount={4000}
        connectionDistance={60}
      />
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center select-none p-4">
          <h1 className="text-5xl md:text-7xl lg:text-[80px] font-bold uppercase text-white drop-shadow-[0_0_20px_rgba(0,0,0,1)] leading-none">
            Particle Background
          </h1>
          <p className="mt-2 text-sm md:text-base text-white drop-shadow-[0_0_20px_rgba(0,0,0,1)]">
            Move the cursor to activate the network.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ParticleBackgroundDemo
