'use client'

import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import SnowBackground from '../components/SnowBackground'

interface GuestbookEntry {
  _id?: string
  name: string
  content: string
  dateTime: string
}

export default function Page() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([])
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  // 방명록 목록 불러오기
  const fetchEntries = async () => {
    try {
      const response = await fetch('/api/guestbook')
      const result = await response.json()
      if (result.success) {
        setEntries(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch entries:', error)
    }
  }

  // 컴포넌트 마운트 시 방명록 불러오기
  useEffect(() => {
    fetchEntries()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && content.trim()) {
      setLoading(true)

      const now = new Date()
      const dateTimeString = `${now.toLocaleDateString(
        'ko-KR'
      )} ${now.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
      })}`

      try {
        const response = await fetch('/api/guestbook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name.trim(),
            content: content.trim(),
            dateTime: dateTimeString,
          }),
        })

        const result = await response.json()

        if (result.success) {
          setName('')
          setContent('')
          // 목록 새로고침
          await fetchEntries()
        } else {
          alert('방명록 작성에 실패했습니다.')
        }
      } catch (error) {
        console.error('Failed to submit entry:', error)
        alert('방명록 작성에 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="relative w-full min-h-screen bg-gray-200">
      <Navbar />
      <SnowBackground />

      <div className="relative z-10 pt-32 pb-20 px-8 flex flex-col items-center">
        <h1 className="text-5xl font-bold text-gray-800 text-center mb-16">
          방명록
        </h1>

        {/* 중앙에 큰 액자 */}
        <div className="relative flex flex-col items-center mb-12">
          {/* 못 */}
          <div className="w-4 h-4 bg-gray-600 rounded-full shadow-lg mb-0 relative z-10"></div>

          {/* 양쪽에서 사선으로 내려오는 실 */}
          <svg
            className="absolute top-4 left-1/2 -translate-x-1/2"
            width="900"
            height="80"
            style={{ pointerEvents: 'none' }}
          >
            {/* 왼쪽 실 */}
            <line
              x1="450"
              y1="0"
              x2="50"
              y2="80"
              stroke="#9CA3AF"
              strokeWidth="2"
            />
            {/* 오른쪽 실 */}
            <line
              x1="450"
              y1="0"
              x2="850"
              y2="80"
              stroke="#9CA3AF"
              strokeWidth="2"
            />
          </svg>

          {/* 큰 액자 */}
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl border-[12px] border-gray-700 w-[900px] min-h-[500px] p-10 mt-20">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center border-b-4 border-gray-300 pb-4">
              방명록
            </h2>

            {/* 방명록 내용들 */}
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
              {entries.length === 0 ? (
                <p className="text-center text-gray-500 text-lg py-10">
                  첫 번째 방명록을 남겨주세요!
                </p>
              ) : (
                entries.map((entry) => (
                  <div
                    key={entry._id}
                    className="flex items-start gap-4 py-3 border-b border-gray-200 last:border-0"
                  >
                    <div className="min-w-[120px] font-bold text-gray-800 text-lg">
                      {entry.name}
                    </div>
                    <div className="w-px h-auto bg-gray-300"></div>
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed">
                        {entry.content}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {entry.dateTime}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* 입력 폼 (액자 아래) */}
        <div className="w-[600px]">
          <form
            onSubmit={handleSubmit}
            className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-xl border-4 border-gray-600"
          >
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2 text-lg"
              >
                이름
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-700 transition-colors"
                placeholder="이름을 입력하세요"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="content"
                className="block text-gray-700 font-semibold mb-2 text-lg"
              >
                내용
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-700 transition-colors resize-none"
                placeholder="내용을 입력하세요"
                rows={4}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-800 text-white font-semibold py-3 rounded-lg hover:bg-gray-700 transition-colors text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? '작성 중...' : '작성하기'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
