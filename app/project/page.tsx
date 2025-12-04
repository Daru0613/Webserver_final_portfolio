'use client'

import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import SnowBackground from '../components/SnowBackground'
import { Github, Star, GitFork, ExternalLink, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react'

interface Repo {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string
  updated_at: string
}

// 프로젝트 카드 데이터
interface ProjectCard {
  id: number
  title: string
  description: string
  image: string
}

export default function Page() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showRepos, setShowRepos] = useState(false)

  // GitHub 사용자명
  const githubUsername = 'Daru0613'

  // 프로젝트 카드 (이미지 경로는 /public 폴더에 넣으세요)
  const projectCards: ProjectCard[] = [
    {
      id: 1,
      title: '프로젝트 1',
      description: '첫 번째 프로젝트 설명',
      image: '/project1.jpg' // public 폴더에 이미지를 넣으세요
    },
    {
      id: 2,
      title: '프로젝트 2',
      description: '두 번째 프로젝트 설명',
      image: '/project2.jpg'
    },
    {
      id: 3,
      title: '프로젝트 3',
      description: '세 번째 프로젝트 설명',
      image: '/project3.jpg'
    }
  ]

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`)
        const data = await response.json()
        setRepos(data)
      } catch (error) {
        console.error('Failed to fetch repos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projectCards.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projectCards.length) % projectCards.length)
  }

  const getCardPosition = (index: number) => {
    const diff = (index - currentIndex + projectCards.length) % projectCards.length
    if (diff === 0) return 'center'
    if (diff === 1 || diff === -2) return 'right'
    return 'left'
  }

  return (
    <div className="relative w-full min-h-screen bg-gray-200">
      <Navbar />
      <SnowBackground />
      
      <div className="relative z-10 pt-24 pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl font-bold text-gray-800 text-center mb-16">My Projects</h1>

          {/* 프로젝트 카드 캐러셀 */}
          <div className="relative mb-20">
            <div className="flex items-center justify-center gap-6 px-4">
              {/* 왼쪽 화살표 */}
              <button
                onClick={prevSlide}
                className="w-14 h-14 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 flex-shrink-0"
              >
                <ChevronLeft size={28} className="text-gray-800" />
              </button>

              {/* 카드들 - 3개 나란히 */}
              <div className="flex items-center justify-center gap-12 w-full max-w-6xl">
                {[0, 1, 2].map((offset) => {
                  const index = (currentIndex + offset - 1 + projectCards.length) % projectCards.length
                  const card = projectCards[index]
                  const isCenter = offset === 1
                  
                  return (
                    <div
                      key={`${card.id}-${offset}`}
                      className={`transition-all duration-500 transform ${
                        isCenter
                          ? 'w-[450px] h-[450px] scale-110'
                          : 'w-[400px] h-[400px] scale-95 opacity-70'
                      }`}
                    >
                      <div className="w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 hover:scale-105">
                        <div className="relative w-full h-3/4 bg-gray-300">
                          <img
                            src={card.image}
                            alt={card.title}
                            className="w-full h-full object-cover transition-transform duration-300"
                            onError={(e) => {
                              e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="300"%3E%3Crect fill="%23ddd" width="500" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="30" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3E이미지 없음%3C/text%3E%3C/svg%3E'
                            }}
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">{card.title}</h3>
                          <p className="text-gray-600 text-sm">{card.description}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* 오른쪽 화살표 */}
              <button
                onClick={nextSlide}
                className="w-14 h-14 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 flex-shrink-0"
              >
                <ChevronRight size={28} className="text-gray-800" />
              </button>
            </div>

            {/* 인디케이터 */}
            <div className="flex justify-center gap-2 mt-12">
              {projectCards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 rounded-full transition-all ${
                    index === currentIndex ? 'bg-gray-800 w-8' : 'bg-gray-400 w-3'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* GitHub 레포지토리 섹션 */}
          <div className="mt-20">
            <div className="flex items-center justify-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 text-center">GitHub 레포지토리 목록</h2>
            </div>

            {/* 토글 버튼 */}
            <div className="flex justify-center mb-8">
              <button
                onClick={() => setShowRepos(!showRepos)}
                className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-all shadow-lg hover:shadow-xl"
              >
                <span>{showRepos ? '레포지토리 숨기기' : '레포지토리 보기'}</span>
                {showRepos ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>

            {/* 레포지토리 목록 (토글) */}
            {showRepos && (
              <div className="transition-all duration-500">
                {loading ? (
                  <div className="text-center text-gray-600 text-xl">로딩 중...</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {repos.map((repo) => (
                      <div
                        key={repo.id}
                        className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-t-4 border-gray-700"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <Github size={24} />
                            {repo.name}
                          </h3>
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-800 transition-colors"
                          >
                            <ExternalLink size={20} />
                          </a>
                        </div>

                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {repo.description || '설명이 없습니다.'}
                        </p>

                        {repo.language && (
                          <div className="inline-block px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm mb-4">
                            {repo.language}
                          </div>
                        )}

                        <div className="flex items-center gap-4 text-gray-600 text-sm">
                          <div className="flex items-center gap-1">
                            <Star size={16} />
                            <span>{repo.stargazers_count}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <GitFork size={16} />
                            <span>{repo.forks_count}</span>
                          </div>
                        </div>

                        <div className="text-xs text-gray-400 mt-4">
                          Updated: {new Date(repo.updated_at).toLocaleDateString('ko-KR')}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
