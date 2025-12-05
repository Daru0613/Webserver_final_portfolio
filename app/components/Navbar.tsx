'use client'

import React from 'react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="flex items-center justify-between px-8 py-4">
        {/* 왼쪽 로고 */}
        <Link
          href="/"
          className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors"
        >
          Portfolio
        </Link>

        {/* 가운데 메뉴 */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-8">
          <Link
            href="/"
            className="text-gray-800 hover:text-gray-600 transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-gray-800 hover:text-gray-600 transition-colors font-medium"
          >
            About
          </Link>
          <Link
            href="/project"
            className="text-gray-800 hover:text-gray-600 transition-colors font-medium"
          >
            Project
          </Link>
          <Link
            href="/team"
            className="text-gray-800 hover:text-gray-600 transition-colors font-medium"
          >
            Team
          </Link>
          <Link
            href="/guestbook"
            className="text-gray-800 hover:text-gray-600 transition-colors font-medium"
          >
            Guestbook
          </Link>
        </div>
      </div>
    </nav>
  )
}
