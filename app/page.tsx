'use client'

import React, { useEffect, useRef } from 'react'
import Navbar from './components/Navbar'

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // 도트 배열
    const dots: { x: number; y: number; speed: number; size: number }[] = []
    const dotCount = 100

    // 도트 초기화
    for (let i = 0; i < dotCount; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 2 + 1,
        size: Math.random() * 3 + 1,
      })
    }

    // 애니메이션
    function animate() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      dots.forEach((dot) => {
        // 도트 그리기
        ctx.fillStyle = 'rgba(100, 100, 100, 0.6)'
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
        ctx.fill()

        // 도트 이동
        dot.y += dot.speed

        // 화면 아래로 나가면 위로 리셋
        if (dot.y > canvas.height) {
          dot.y = -10
          dot.x = Math.random() * canvas.width
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    // 윈도우 리사이즈 처리
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="relative w-full h-screen bg-gray-200">
      <Navbar />
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-gray-800">Portfolio</h1>
      </div>

      {/* 오른쪽 회전하는 프로필 */}
      <div className="absolute right-20 top-1/2 -translate-y-1/2 z-10">
        <div className="relative w-80 h-80">
          {/* 회전하는 테두리 1 */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gray-600 animate-spin-slow"></div>

          {/* 회전하는 테두리 2 (반대 방향) */}
          <div className="absolute inset-1 rounded-full border-4 border-transparent border-b-gray-500 animate-spin-slow-reverse"></div>

          {/* 프로필 이미지 */}
          <div className="absolute inset-2 rounded-full overflow-hidden bg-white">
            <img
              src="/kimseojin1.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
