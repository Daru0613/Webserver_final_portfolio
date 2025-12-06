import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Guestbook from '@/models/Guestbook'

// GET - 방명록 목록 조회
export async function GET() {
  try {
    await dbConnect()
    const entries = await Guestbook.find({}).sort({ createdAt: -1 })
    return NextResponse.json({ success: true, data: entries })
  } catch (error) {
    console.error('Error fetching guestbook entries:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch entries' },
      { status: 500 }
    )
  }
}

// POST - 방명록 작성
export async function POST(request: Request) {
  try {
    await dbConnect()
    const body = await request.json()
    const { name, content, dateTime } = body

    if (!name || !content || !dateTime) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const entry = await Guestbook.create({
      name,
      content,
      dateTime,
    })

    // ✅ 여기서 우분투 로그 서버로 전송
    try {
      await fetch('http://192.168.234.130:4000/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'guestbook_create',
          path: '/api/guestbook',
          name,
          contentLength: content.length,
          dateTime,
        }),
      })
    } catch (e) {
      // 로그 서버 죽어 있어도 메인 기능은 안 터지게
      console.error('Log server error:', e)
    }

    return NextResponse.json({ success: true, data: entry }, { status: 201 })
  } catch (error) {
    console.error('Error creating guestbook entry:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create entry' },
      { status: 500 }
    )
  }
}
