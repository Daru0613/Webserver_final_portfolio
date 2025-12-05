import mongoose from 'mongoose'

const GuestbookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  dateTime: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Guestbook ||
  mongoose.model('Guestbook', GuestbookSchema)
