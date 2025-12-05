'use client'

import React from 'react'
import Navbar from '../components/Navbar'
import SnowBackground from '../components/SnowBackground'

export default function Page() {
  const teamMembers = [
    {
      name: '김서진',
      role: '92212764',
      image: '/kimseojin1.png',
      bgColor: 'bg-gray-100',
      portfolioUrl: 'https://your-portfolio-url.com',
      githubUrl: 'https://github.com/Daru0613',
    },
    {
      name: '박한빈',
      role: '92212867',
      image: '/parkhanbin.png',
      bgColor: 'bg-gray-200',
      portfolioUrl: '#',
      githubUrl: 'https://github.com/han122400',
    },
    {
      name: '이지훈',
      role: '92213031',
      image: '/leejihun.png',
      bgColor: 'bg-gray-300',
      portfolioUrl: '#',
      githubUrl: 'https://github.com/LEEJIHUN6844',
    },
    {
      name: '윤주혁',
      role: '92410847',
      image: '/younjuhyeok.png',
      bgColor: 'bg-gray-250',
      portfolioUrl: '#',
      githubUrl: 'https://github.com/Juhyeok0603',
    },
  ]

  return (
    <div className="relative w-full min-h-screen bg-gray-200">
      <Navbar />
      <SnowBackground />

      <div className="relative z-10 pt-32 pb-20 px-8">
        <h1 className="text-5xl font-bold text-gray-800 text-center mb-20">
          철야의 코딩
        </h1>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="group relative">
              {/* 카드 */}
              <a
                href={member.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`block relative ${member.bgColor}/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer`}
              >
                {/* 상단 텍스트 영역 */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    {member.name}
                  </h2>
                  <p className="text-sm text-gray-600 font-medium">
                    {member.role}
                  </p>
                </div>

                {/* 프로필 이미지 (둥근 형태) */}
                <div className="relative w-full aspect-3/4 rounded-2xl overflow-hidden bg-gray-700 mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23666"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23fff" font-size="20"%3ENo Image%3C/text%3E%3C/svg%3E'
                    }}
                  />
                </div>

                {/* 하단 버튼 */}
                <div className="text-center">
                  <span
                    onClick={(e) => {
                      e.preventDefault()
                      window.open(member.portfolioUrl, '_blank')
                    }}
                    className="inline-block bg-gray-800 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg cursor-pointer"
                  >
                    개인 포트폴리오 보기
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* 추가 정보 섹션 */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
              Team Project: Security News
            </h2>

            {/* 프로젝트 썸네일 */}
            <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
              <img
                src="/project-thumbnail.png"
                alt="Project Thumbnail"
                className="w-full h-80 object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect width="800" height="400" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23666" font-size="24"%3EProject Thumbnail%3C/text%3E%3C/svg%3E'
                }}
              />
            </div>

            <p className="text-gray-700 text-center leading-relaxed mb-8">
              네이버 검색 API를 활용한 보안 뉴스 검색, 필터링 웹 사이트 입니다.
              <br />
              supabase를 이용한 회원가입, 로그인, 북마크, 토론 기능을
              제공합니다.
            </p>

            {/* 버튼 영역 */}
            <div className="flex gap-4 justify-center">
              <a
                href="https://github.com/your-repo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub Repository
              </a>
              <a
                href="https://your-project-site.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                Visit Website
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
