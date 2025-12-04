'use client'

import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import SnowBackground from '../components/SnowBackground'
import { Github, Star, GitFork, ExternalLink } from 'lucide-react'

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

export default function Page() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)

  // GitHub 사용자명
  const githubUsername = 'Daru0613'

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=10`)
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

  return (
    <div className="relative w-full min-h-screen bg-gray-200">
      <Navbar />
      <SnowBackground />
      
      <div className="relative z-10 pt-24 pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl font-bold text-gray-800 text-center mb-4">My Projects</h1>
          <p className="text-xl text-gray-600 text-center mb-16">GitHub 레포지토리 목록</p>

          {loading ? (
            <div className="text-center text-gray-600 text-xl">로딩 중...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo) => (
                <div
                  key={repo.id}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-t-4 border-gray-700"
                >
                  {/* 레포 이름 */}
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

                  {/* 설명 */}
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {repo.description || '설명이 없습니다.'}
                  </p>

                  {/* 언어 */}
                  {repo.language && (
                    <div className="inline-block px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm mb-4">
                      {repo.language}
                    </div>
                  )}

                  {/* 통계 */}
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

                  {/* 업데이트 날짜 */}
                  <div className="text-xs text-gray-400 mt-4">
                    Updated: {new Date(repo.updated_at).toLocaleDateString('ko-KR')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
