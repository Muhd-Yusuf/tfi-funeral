import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { plansData } from '../lib/plans-data'

// ---------- Models (inline to avoid path alias issues with ts-node) ----------

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['admin', 'agent'], default: 'admin' },
}, { timestamps: true })

const PricingSchema = new mongoose.Schema({
  coverAmount: { type: Number, required: true },
  ageGroups: [{
    ageRange: { type: String, required: true },
    premium: { type: Number, default: null },
  }],
})

const PlanSchema = new mongoose.Schema({
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

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

const SiteContentSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  section: { type: String, required: true },
  title: { type: String },
  subtitle: { type: String },
  body: { type: String },
  image: { type: String },
  metadata: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true })

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema)
const Plan = mongoose.models.Plan || mongoose.model('Plan', PlanSchema)
const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema)
const FAQ = mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema)
const SiteContent = mongoose.models.SiteContent || mongoose.model('SiteContent', SiteContentSchema)

// ---------- Seed Data ----------

const testimonials = [
  {
    name: 'Thandi Nkosi',
    location: 'Soweto, Gauteng',
    text: 'TFI made the claims process so easy during our time of grief. Within 48 hours everything was sorted. I recommend them to everyone in my community.',
    rating: 5,
    isActive: true,
  },
  {
    name: 'Sipho Dlamini',
    location: 'Durban, KwaZulu-Natal',
    text: 'Affordable premiums and excellent service. My whole family is covered under the family plan, giving us peace of mind knowing we are protected.',
    rating: 5,
    isActive: true,
  },
  {
    name: 'Nomsa Mahlangu',
    location: 'Pretoria, Gauteng',
    text: 'I joined TFI three years ago and when my mother passed, they handled everything professionally. The extended family plan is a blessing for large families.',
    rating: 5,
    isActive: true,
  },
]

const faqs = [
  {
    question: 'Is there a waiting period before I can claim?',
    answer: 'Yes, there is a standard 6-month waiting period for natural causes. Accidental death is covered immediately from date of joining. During the waiting period, premiums paid will be refunded in the event of a natural death claim.',
    order: 1,
    isActive: true,
  },
  {
    question: 'How do I submit a claim?',
    answer: 'Claims can be submitted by calling our office, visiting in person, or via WhatsApp. You will need the death certificate, ID document of the deceased, your policy number, and banking details for payout. Claims are processed within 48 hours of receiving all required documents.',
    order: 2,
    isActive: true,
  },
  {
    question: 'Can I add more family members to my plan later?',
    answer: 'Yes, you can add additional family members at any time. Simply contact our office or your agent to update your plan. The added members will have their own 6-month waiting period from the date they are added to the policy.',
    order: 3,
    isActive: true,
  },
  {
    question: 'Do I need a medical examination to join?',
    answer: 'No, TFI Burial Society does not require any medical examination or health questionnaire to join. All you need is a valid South African ID and to be between the ages of 18 and 85.',
    order: 4,
    isActive: true,
  },
  {
    question: 'Who underwrites the TFI funeral plans?',
    answer: 'Our funeral plans are underwritten by Old Mutual and RMA (Rand Mutual Assurance), two of South Africa\'s most trusted and established insurance providers. This guarantees that your claims will always be paid.',
    order: 5,
    isActive: true,
  },
]

const siteContentData = [
  {
    key: 'hero',
    section: 'home',
    title: 'Protect Your Family With Affordable Funeral Cover',
    subtitle: 'Plans from R39/month',
    body: 'TFI Burial Society offers comprehensive funeral plans from R5,000 to R30,000 cover. Individual, couple, family, and extended family options available. Underwritten by Old Mutual & RMA.',
  },
  {
    key: 'about',
    section: 'about',
    title: 'About TFI Burial Society',
    subtitle: 'Trusted by thousands of South African families',
    body: 'TFI Burial Society has been providing affordable funeral cover to South African families for years. We understand the financial burden that comes with losing a loved one, and our mission is to ensure that no family has to face that burden alone. Our plans are designed to be flexible, affordable, and comprehensive, covering individuals, couples, families, and extended family members.',
  },
  {
    key: 'company-info',
    section: 'footer',
    title: 'TFI Burial Society',
    body: 'Affordable funeral cover for South African families. Underwritten by Old Mutual & RMA.',
    metadata: {
      phone: '010 880 3"; // placeholder',
      email: 'info@tfifuneral.co.za',
      address: 'Johannesburg, South Africa',
      whatsapp: '+27600000000',
    },
  },
]

// ---------- Main Seed Function ----------

async function seed() {
  const MONGODB_URI = process.env.MONGODB_URI

  if (!MONGODB_URI) {
    console.error('ERROR: MONGODB_URI environment variable is not set.')
    console.error('Set it before running: export MONGODB_URI="mongodb+srv://..."')
    process.exit(1)
  }

  console.log('Connecting to MongoDB...')
  await mongoose.connect(MONGODB_URI)
  console.log('Connected to MongoDB successfully.\n')

  // --- Admin User ---
  console.log('--- Seeding Admin User ---')
  const existingAdmin = await Admin.findOne({ email: 'admin@tfifuneral.co.za' })
  if (existingAdmin) {
    console.log('Admin user already exists, skipping.')
  } else {
    const hashedPassword = await bcrypt.hash('changeme123', 12)
    await Admin.create({
      email: 'admin@tfifuneral.co.za',
      password: hashedPassword,
      name: 'TFI Admin',
      role: 'admin',
    })
    console.log('Admin user created: admin@tfifuneral.co.za')
  }

  // --- Plans ---
  console.log('\n--- Seeding Plans ---')
  const planEntries = Object.values(plansData)
  let planOrder = 0
  for (const plan of planEntries) {
    const existing = await Plan.findOne({ slug: plan.slug })
    if (existing) {
      console.log(`Plan "${plan.name}" already exists, skipping.`)
    } else {
      await Plan.create({
        name: plan.name,
        slug: plan.slug,
        category: plan.category,
        description: plan.description,
        icon: plan.icon,
        pricing: plan.pricing,
        features: plan.features,
        isActive: true,
        order: planOrder,
      })
      console.log(`Plan created: ${plan.name}`)
    }
    planOrder++
  }

  // --- Testimonials ---
  console.log('\n--- Seeding Testimonials ---')
  const existingTestimonials = await Testimonial.countDocuments()
  if (existingTestimonials > 0) {
    console.log(`${existingTestimonials} testimonials already exist, skipping.`)
  } else {
    await Testimonial.insertMany(testimonials)
    console.log(`${testimonials.length} testimonials created.`)
  }

  // --- FAQs ---
  console.log('\n--- Seeding FAQs ---')
  const existingFAQs = await FAQ.countDocuments()
  if (existingFAQs > 0) {
    console.log(`${existingFAQs} FAQs already exist, skipping.`)
  } else {
    await FAQ.insertMany(faqs)
    console.log(`${faqs.length} FAQs created.`)
  }

  // --- Site Content ---
  console.log('\n--- Seeding Site Content ---')
  for (const content of siteContentData) {
    const existing = await SiteContent.findOne({ key: content.key })
    if (existing) {
      console.log(`Site content "${content.key}" already exists, skipping.`)
    } else {
      await SiteContent.create(content)
      console.log(`Site content created: ${content.key}`)
    }
  }

  console.log('\n--- Seed complete! ---')
  await mongoose.disconnect()
  console.log('Disconnected from MongoDB.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
