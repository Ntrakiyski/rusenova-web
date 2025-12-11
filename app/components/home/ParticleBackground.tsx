import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

export interface ParticleBackgroundProps {
  particleCount?: number
  lineColor?: number
  particleColor?: number
  pulseColor?: number
  connectionDistance?: number
  className?: string
  height?: string | number
  width?: string | number
  particleOpacity?: number
  rotationSpeedX?: number
  rotationSpeedY?: number
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  particleCount = 5000,
  lineColor = 0x302D2D,
  particleColor = 0xffffff,
  pulseColor = 0xff00ff,
  connectionDistance = 80,
  className = '',
  height = '100%',
  width = '100%',
  particleOpacity = 1.0,
  rotationSpeedX = 0.0009,
  rotationSpeedY = 0.0009,
}) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current || rendererRef.current) return

    // Calculate container dimensions first
    const containerWidth = containerRef.current?.clientWidth || window.innerWidth
    const containerHeight = containerRef.current?.clientHeight || window.innerHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      60,
      containerWidth / containerHeight,
      1,
      1000
    )
    camera.position.z = 250

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    
    renderer.setSize(containerWidth, containerHeight)
    renderer.setClearColor(0x252222, 1) // Set dark background #252222 with full opacity
    mountRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Build particles
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = Math.random() * 800 - 400
      positions[i * 3 + 1] = Math.random() * 800 - 400
      positions[i * 3 + 2] = Math.random() * 800 - 400
      const c = new THREE.Color(particleColor)
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const pts = new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        sizeAttenuation: true,
        opacity: particleOpacity,
      })
    )
    scene.add(pts)

    // Build lines
    const linePos: number[] = []
    const pArr = geo.attributes.position.array as Float32Array
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = pArr[i * 3] - pArr[j * 3]
        const dy = pArr[i * 3 + 1] - pArr[j * 3 + 1]
        const dz = pArr[i * 3 + 2] - pArr[j * 3 + 2]
        if (Math.hypot(dx, dy, dz) < connectionDistance) {
          linePos.push(
            pArr[i * 3],
            pArr[i * 3 + 1],
            pArr[i * 3 + 2],
            pArr[j * 3],
            pArr[j * 3 + 1],
            pArr[j * 3 + 2]
          )
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(linePos), 3)
    )

    const lines = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({ color: lineColor, transparent: true, opacity: 0.05 })
    )
    scene.add(lines)

    // Mouse pulse vector
    const mouse = new THREE.Vector2(-100, -100)
    const onMouseMove = (e: MouseEvent) => {
      const rect = mountRef.current!.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }

    mountRef.current.addEventListener('mousemove', onMouseMove)

    // Resize handler
    const onResize = () => {
      const containerWidth = containerRef.current?.clientWidth || window.innerWidth
      const containerHeight = containerRef.current?.clientHeight || window.innerHeight
      camera.aspect = containerWidth / containerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerWidth, containerHeight)
    }

    window.addEventListener('resize', onResize)

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)
      scene.rotation.y += rotationSpeedY
      scene.rotation.x += rotationSpeedX

      // Pulse effect
      const mv = new THREE.Vector3(mouse.x, mouse.y, 0.5)
        .unproject(camera)
        .sub(camera.position)
        .normalize()

      const dist = -camera.position.z / mv.z
      const ptr = camera.position.clone().add(mv.multiplyScalar(dist))

      const colArr = geo.attributes.color.array as Float32Array
      const base = new THREE.Color(particleColor)
      const pulseClr = new THREE.Color(pulseColor)

      for (let i = 0; i < particleCount; i++) {
        const dx = pArr[i * 3] - ptr.x
        const dy = pArr[i * 3 + 1] - ptr.y
        const t = Math.max(0, 1 - Math.hypot(dx, dy) / 100)
        const mix = base.clone().lerp(pulseClr, t)
        const curr = new THREE.Color().fromArray(colArr, i * 3)
        curr.lerp(mix, 0.1).toArray(colArr, i * 3)
      }

      geo.attributes.color.needsUpdate = true
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      const mountElement = mountRef.current;
      mountElement?.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      if (rendererRef.current) {
        rendererRef.current.dispose()
        const canvasEl = mountElement?.querySelector('canvas')
        if (canvasEl) mountElement!.removeChild(canvasEl)
        rendererRef.current = null
      }
    }
  }, [
    particleCount,
    lineColor,
    particleColor,
    pulseColor,
    connectionDistance,
    particleOpacity,
    height,
    width,
    rotationSpeedX,
    rotationSpeedY,
  ])

  return (
    <div
      ref={containerRef}
      data-testid="particle-container"
      className={`relative overflow-hidden bg-black ${className}`}
      style={{ 
        width: typeof width === 'number' ? `${width}px` : width, 
        height: typeof height === 'number' ? `${height}px` : height 
      }}
    >
      <div ref={mountRef} className="absolute inset-0 w-full h-full z-0" />
    </div>
  )
}

export default ParticleBackground
