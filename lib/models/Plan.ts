import mongoose, { Schema, Document } from 'mongoose'

export interface IPricing {
  coverAmount: number
  ageGroups: {
    ageRange: string
    premium: number | null
  }[]
}

export interface IPlan extends Document {
  name: string
  slug: string
  category: 'main' | 'extended' | 'after-tears' | 'inkomo' | 'grocery'
  description: string
  icon: string
  pricing: IPricing[]
  features: string[]
  isActive: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

const PricingSchema = new Schema({
  coverAmount: { type: Number, required: true },
  ageGroups: [{
    ageRange: { type: String, required: true },
    premium: { type: Number, default: null },
  }],
})

const PlanSchema = new Schema<IPlan>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, enum: ['main', 'extended', 'after-tears', 'inkomo', 'grocery'], required: true },
  description: { type: String, required: true },
  icon: { type: String, default: '🛡️' },
  pricing: [PricingSchema],
  features: [{ type: String }],
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true })

export default mongoose.models.Plan || mongoose.model<IPlan>('Plan', PlanSchema)
