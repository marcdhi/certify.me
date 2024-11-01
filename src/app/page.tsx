'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CertificateCanvas from '@/components/CertificateCanvas'

export default function Home() {
  const [name, setName] = useState('')
  const [generatedCertificate, setGeneratedCertificate] = useState<string | null>(null)

  const handleGenerate = () => {
    if (!name.trim()) return
    const canvas = document.getElementById('certificateCanvas') as HTMLCanvasElement
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png')
      setGeneratedCertificate(dataUrl)
    }
  }

  const handleDownload = () => {
    if (!generatedCertificate) return
    
    const link = document.createElement('a')
    link.download = `${name}-certificate.png`
    link.href = generatedCertificate
    link.click()
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#60a5fa] to-[#3b82f6]">
            Silicon Maze&apos;24
          </h1>
          <h2 className="text-2xl text-gray-300">Get your certificates here!</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 bg-[#1e293b]/50 p-8 rounded-xl backdrop-blur-sm border border-[#60a5fa]/20 h-fit">
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Your Name</label>
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-[#0f172a] border-[#60a5fa]/20 text-white focus:border-[#60a5fa] focus:ring-1 focus:ring-[#60a5fa]"
              />
            </div>
            
            <div className="flex flex-col gap-4">
              <Button 
                onClick={handleGenerate}
                className="w-full bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] text-white hover:opacity-90 transition-all duration-200"
                disabled={!name.trim()}
              >
                Generate Certificate
              </Button>
              
              {generatedCertificate && (
                <Button 
                  onClick={handleDownload}
                  className="w-full border-2 border-[#60a5fa] text-[#60a5fa] hover:bg-[#60a5fa]/10 transition-all duration-200"
                  variant="outline"
                >
                  Download
                </Button>
              )}
            </div>
          </div>

          <div className="relative border border-[#60a5fa]/20 rounded-xl overflow-hidden shadow-lg shadow-[#60a5fa]/10">
            <CertificateCanvas 
              name={name}
            />
          </div>
        </div>

        <footer className="text-center space-y-2 mt-8">
          <p className="text-gray-300">
            Thank you for participating in Silicon Maze&apos;24!
          </p>
          <p className="text-[#60a5fa] font-medium">
            Congratulations on your remarkable achievement! 🎉
          </p>
        </footer>
      </div>
    </main>
  )
} 