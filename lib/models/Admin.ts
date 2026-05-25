import mongoose, { Schema, Document } from 'mongoose'

export interface IAdmin extends Document {
  email: string
  password: string
  name: string
  role: 'admin' | 'agent'
  createdAt: Date
}

const AdminSchema = new Schema<IAdmin>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['admin', 'agent'], default: 'admin' },
}, { timestamps: true })

export default mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema)
