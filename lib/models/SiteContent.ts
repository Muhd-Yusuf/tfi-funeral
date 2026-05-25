import mongoose, { Schema, Document } from 'mongoose'

export interface ISiteContent extends Document {
  key: string
  section: string
  title?: string
  subtitle?: string
  body?: string
  image?: string
  metadata?: Record<string, any>
  updatedAt: Date
}

const SiteContentSchema = new Schema<ISiteContent>({
  key: { type: String, required: true, unique: true },
  section: { type: String, required: true },
  title: { type: String },
  subtitle: { type: String },
  body: { type: String },
  image: { type: String },
  metadata: { type: Schema.Types.Mixed },
}, { timestamps: true })

export default mongoose.models.SiteContent || mongoose.model<ISiteContent>('SiteContent', SiteContentSchema)
