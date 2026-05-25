import mongoose, { Schema, Document } from 'mongoose'

export interface IQuote extends Document {
  name: string
  phone: string
  email?: string
  planType: string
  coverAmount: number
  ageGroup: string
  numberOfMembers?: number
  status: 'pending' | 'contacted' | 'converted' | 'closed'
  notes?: string
  createdAt: Date
}

const QuoteSchema = new Schema<IQuote>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  planType: { type: String, required: true },
  coverAmount: { type: Number, required: true },
  ageGroup: { type: String, required: true },
  numberOfMembers: { type: Number },
  status: { type: String, enum: ['pending', 'contacted', 'converted', 'closed'], default: 'pending' },
  notes: { type: String },
}, { timestamps: true })

export default mongoose.models.Quote || mongoose.model<IQuote>('Quote', QuoteSchema)
