import React from 'react'
import { render, screen } from '@testing-library/react'
import ParticleBackground from './ParticleBackground'

describe('ParticleBackground', () => {
  it('should render with default props', () => {
    render(<ParticleBackground />)
    const container = screen.getByTestId('particle-container')
    expect(container).toBeInTheDocument()
    expect(container).toHaveStyle('height: 100%')
    expect(container).toHaveStyle('width: 100%')
  })

  it('should render with custom height and width', () => {
    render(<ParticleBackground height="500px" width="800px" />)
    const container = screen.getByTestId('particle-container')
    expect(container).toHaveStyle('height: 500px')
    expect(container).toHaveStyle('width: 800px')
  })

  it('should render with numeric height and width', () => {
    render(<ParticleBackground height={500} width={800} />)
    const container = screen.getByTestId('particle-container')
    expect(container).toHaveStyle('height: 500px')
    expect(container).toHaveStyle('width: 800px')
  })
})
