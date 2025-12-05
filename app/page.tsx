'use client'

import React, { useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import { Instagram, Github, BookOpen } from 'lucide-react'

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
    <div className="relative w-full h-screen bg-gray-200 overflow-hidden">
      <Navbar />
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      <div className="absolute inset-0 flex items-center justify-center gap-65 px-[8%] z-10">
        {/* 왼쪽 영역 */}
        <div className="flex-shrink-0 w-[40%] max-w-[600px]">
          {/* 소개 문구 (배경 없이) */}
          <div className="mb-6">
            <h1 className="text-[clamp(2rem,5vw,4.5rem)] font-bold text-gray-800 mb-4 leading-tight">
              Hello, I'm <br />
              Kim Seojin
            </h1>
            <h2 className="text-[clamp(1.5rem,3.5vw,3rem)] font-semibold text-gray-700 mb-6">
              92212764
            </h2>
            <p className="text-[clamp(1.2rem,2.5vw,1.875rem)] text-gray-600 mb-3">
              정보보호학전공
            </p>
          </div>

          {/* 직사각형 박스 (버튼들) */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-6 md:p-8 w-full">
            <div className="flex justify-around items-center gap-4 md:gap-6">
              {/* Instagram 버튼 */}
              <a
                href="https://www.instagram.com/_seojin_613/?next=%2F"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 md:gap-3 hover:scale-110 transition-transform"
              >
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center shadow-lg">
                  <Instagram
                    className="text-white"
                    size={window.innerWidth < 768 ? 32 : 48}
                  />
                </div>
                <span className="text-sm md:text-base text-gray-700 font-medium">
                  Instagram
                </span>
              </a>

              {/* GitHub 버튼 */}
              <a
                href="https://github.com/Daru0613"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 md:gap-3 hover:scale-110 transition-transform"
              >
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gray-800 flex items-center justify-center shadow-lg">
                  <Github
                    className="text-white"
                    size={window.innerWidth < 768 ? 32 : 48}
                  />
                </div>
                <span className="text-sm md:text-base text-gray-700 font-medium">
                  GitHub
                </span>
              </a>

              {/* Blog 버튼 */}
              <a
                href="https://blog.naver.com/nafi6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 md:gap-3 hover:scale-110 transition-transform"
              >
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
                  <BookOpen
                    className="text-white"
                    size={window.innerWidth < 768 ? 32 : 48}
                  />
                </div>
                <span className="text-sm md:text-base text-gray-700 font-medium">
                  Blog
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* 오른쪽 회전하는 프로필 */}
        <div className="flex-shrink-0 w-[40%] max-w-[480px] aspect-square">
          <div className="relative w-full h-full">
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
    </div>
  )
}
