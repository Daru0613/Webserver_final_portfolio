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

    return NextResponse.json({ success: true, data: entry }, { status: 201 })
  } catch (error) {
    console.error('Error creating guestbook entry:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create entry' },
      { status: 500 }
    )
  }
}
