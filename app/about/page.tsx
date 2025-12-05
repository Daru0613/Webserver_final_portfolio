'use client'

import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import SnowBackground from '../components/SnowBackground'
import { ChevronDown } from 'lucide-react'

export default function Page() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // 페이지 맨 바닥에 도달하면 인디케이터 숨김
      if (scrollPosition >= documentHeight - 50) {
        setShowScrollIndicator(false)
      } else {
        setShowScrollIndicator(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const childNodes = [
    { id: 1, label: '학번', content: '92212764', angle: 0 },
    { id: 2, label: '전공', content: '정보보호학전공', angle: 60 },
    { id: 3, label: '전화번호', content: '010-7124-6930', angle: 120 },
    { id: 4, label: 'MBTI', content: 'ENTJ', angle: 180 },
    { id: 5, label: '이메일', content: 'nafi6@naver.com', angle: 240 },
    { id: 6, label: '생년월일', content: '2003-06-13', angle: 300 },
  ]

  const timeline = [
    {
      year: '2022',
      period: '2022 - Present',
      title: '중부대학교 입학',
      subtitle: '정보보호학전공',
      details: ['학업 시작', '프로그래밍 입문'],
    },
    {
      year: '2023',
      period: '2023 - 2024',
      title: '휴학 후 군 복무',
      subtitle: '수도군단 1175공병단 155공병대대',
      details: ['EHCT팀 근무'],
    },
    {
      year: '2025',
      period: '2025 - 1학기',
      title: '복학 및 멋쟁이사자 13기',
      subtitle: '13기 아기사자로 입부',
      details: ['스터디 및 아이디어톤 참여'],
    },
    {
      year: '2025',
      period: '2025 - 여름학기',
      title: '멋쟁이사자처럼 해커톤 참가',
      subtitle: 'GoAIyang',
      details: ['감정 분석 AI 기반 여행지 추천 플랫폼'],
    },
    {
      year: '2025',
      period: '2025 - 2학기',
      title: '2학기 학업 진행',
      subtitle: '개인 프로젝트, 자격증 취득',
      details: ['로그인 자동화 프로그램 개발', '네트워크관리사 2급 취득'],
    },
  ]

  return (
    <div className="relative w-full bg-gray-200">
      <Navbar />
      <SnowBackground />

      {/* 마인드맵 섹션 */}
      <div className="relative z-10 pt-24 flex justify-center items-start min-h-screen">
        <div className="relative w-[1000px] h-[700px]">
          {/* 중앙 노드 (내 이름) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-44 h-44 rounded-full bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-white font-bold text-3xl shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center border-4 border-white/50"
            >
              김서진
            </button>
          </div>

          {/* 자식 노드들 */}
          {childNodes.map((node) => {
            const radius = 300
            const angleRad = (node.angle * Math.PI) / 180
            const x = Math.cos(angleRad) * radius
            const y = Math.sin(angleRad) * radius

            return (
              <div key={node.id}>
                {/* 자식 노드 */}
                <div
                  className={`absolute transition-all duration-700 ease-out ${
                    isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}
                  style={{
                    left: isExpanded ? `calc(50% + ${x}px)` : '50%',
                    top: isExpanded ? `calc(50% + ${y}px)` : '50%',
                    transform: 'translate(-50%, -50%)',
                    transitionDelay: isExpanded ? `${node.id * 100}ms` : '0ms',
                  }}
                >
                  <div className="group relative">
                    <div className="w-36 h-36 rounded-full bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 flex flex-col items-center justify-center border-3 border-gray-700 cursor-pointer">
                      <div className="text-sm font-bold text-gray-800">
                        {node.label}
                      </div>
                      <div className="text-xs text-gray-600 mt-1 px-3 text-center">
                        {node.content}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {/* 안내 텍스트 */}
          {!isExpanded && (
            <div className="absolute left-1/2 top-[70%] -translate-x-1/2 text-gray-700 text-base font-semibold animate-bounce">
              클릭하여 정보 보기
            </div>
          )}
        </div>
      </div>

      {/* 스크롤 다운 인디케이터 */}
      {showScrollIndicator && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <ChevronDown className="text-gray-700" size={40} strokeWidth={3} />
        </div>
      )}

      {/* 추가 콘텐츠 영역 (스크롤 가능하도록) */}
      <div className="relative z-10 py-20">
        <div className="w-full max-w-5xl mx-auto px-8">
          <h2 className="text-6xl font-bold text-gray-800 text-center mb-20">
            Education
          </h2>

          <div className="relative">
            {/* 중앙 세로 라인 */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-400 -translate-x-1/2"></div>

            {/* 타임라인 아이템들 */}
            {timeline.map((item, index) => (
              <div key={index} className="relative mb-32 last:mb-0">
                {/* 중앙 점 */}
                <div className="absolute left-1/2 top-8 w-6 h-6 bg-gray-800 rounded-full -translate-x-1/2 border-4 border-white shadow-lg z-10"></div>

                {/* 왼쪽/오른쪽 교차 배치 */}
                <div
                  className={`flex ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div
                    className={`w-[45%] ${
                      index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'
                    }`}
                  >
                    {/* 연도 표시 (큰 글씨) */}
                    <div className="text-gray-400 text-lg mb-2">
                      {item.period}
                    </div>

                    {/* 카드 */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-l-4 border-gray-700">
                      <h3 className="text-3xl font-bold text-gray-800 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xl text-gray-600 mb-4">
                        {item.subtitle}
                      </p>
                      <ul className="space-y-2">
                        {item.details.map((detail, i) => (
                          <li
                            key={i}
                            className="text-gray-500 flex items-center gap-2"
                          >
                            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
