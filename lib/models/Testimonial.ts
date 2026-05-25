import mongoose, { Schema, Document } from 'mongoose'

export interface ITestimonial extends Document {
  name: string
  location: string
  text: string
  rating: number
  isActive: boolean
  createdAt: Date
}

const TestimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true },
  location: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema)
