import mongoose, { Schema, Document } from 'mongoose'

export interface IContact extends Document {
  name: string
  phone: string
  email?: string
  message: string
  planInterest?: string
  status: 'new' | 'contacted' | 'resolved'
  createdAt: Date
}

const ContactSchema = new Schema<IContact>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  message: { type: String, required: true },
  planInterest: { type: String },
  status: { type: String, enum: ['new', 'contacted', 'resolved'], default: 'new' },
}, { timestamps: true })

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema)
