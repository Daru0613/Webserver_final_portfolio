import React from 'react'
import Navbar from '../components/Navbar'
import SnowBackground from '../components/SnowBackground'

export default function Page() {
  return (
    <div className="relative w-full min-h-screen bg-gray-200">
      <Navbar />
      <SnowBackground />
    </div>
  )
}
