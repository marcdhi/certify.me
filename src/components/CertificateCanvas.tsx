'use client'

import { useEffect, useRef } from 'react'

interface TextConfig {
  x: number
  y: number
  fontSize: number
  color: string
  align: CanvasTextAlign
  fontFamily: string
}

interface TextElement {
  text: string
  config: Partial<TextConfig>
}

interface CertificateCanvasProps {
  name: string
  textElements?: TextElement[]
}

const defaultConfig: TextConfig = {
  x: 400, // center of canvas (800/2)
  y: 287, // center of canvas (600/2)
  fontSize: 48,
  color: '#000000',
  align: 'center',
  fontFamily: 'CustomFont'
}

export default function CertificateCanvas({ 
  name, 
  textElements = []
}: CertificateCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // const config = { ...defaultConfig, ...textElements.reduce((acc, { config }) => ({ ...acc, ...config }), {})}

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 800
    canvas.height = 600

    const img = new Image()
    img.src = '/certificate-template.png'
    
    img.onload = () => {
      // Draw background
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      
      // Draw name with default config
      const nameConfig = { ...defaultConfig }
      ctx.fillStyle = nameConfig.color
      ctx.textAlign = nameConfig.align
      ctx.textBaseline = 'middle'
      ctx.font = `${nameConfig.fontSize}px ${nameConfig.fontFamily}`
      ctx.fillText(name, nameConfig.x, nameConfig.y)
      
      // Draw additional text elements
      textElements.forEach(({ text, config }) => {
        const elementConfig = { ...defaultConfig, ...config }
        ctx.fillStyle = elementConfig.color
        ctx.textAlign = elementConfig.align
        ctx.textBaseline = 'middle'
        ctx.font = `${elementConfig.fontSize}px ${elementConfig.fontFamily}`
        ctx.fillText(text, elementConfig.x, elementConfig.y)
      })
    }
  }, [name, textElements])

  return (
    <canvas 
      ref={canvasRef}
      id="certificateCanvas"
      className="w-full h-auto"
    />
  )
} 