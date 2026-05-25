import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import connectDB from '@/lib/mongodb'
import Admin from '@/lib/models/Admin'
import Plan from '@/lib/models/Plan'
import Testimonial from '@/lib/models/Testimonial'
import FAQ from '@/lib/models/FAQ'
import SiteContent from '@/lib/models/SiteContent'
import { plansData } from '@/lib/plans-data'

export async function POST() {
  try {
    await connectDB()

    // Create default admin user
    const existingAdmin = await Admin.findOne({ email: 'admin@tfifuneral.co.za' })
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('changeme123', 12)
      await Admin.create({
        email: 'admin@tfifuneral.co.za',
        password: hashedPassword,
        name: 'TFI Admin',
        role: 'admin',
      })
    }

    // Seed plans data (upsert - adds new plans, updates existing)
    let planCount = 0
    const planEntries = Object.entries(plansData)
    for (let i = 0; i < planEntries.length; i++) {
      const [, plan] = planEntries[i]
      await Plan.findOneAndUpdate(
        { slug: plan.slug },
        {
          name: plan.name,
          slug: plan.slug,
          category: plan.category,
          description: plan.description,
          icon: plan.icon,
          features: plan.features,
          pricing: plan.pricing,
          isActive: true,
          order: i,
        },
        { upsert: true, new: true }
      )
      planCount++
    }

    // Seed testimonials
    const existingTestimonials = await Testimonial.countDocuments()
    if (existingTestimonials === 0) {
      await Testimonial.insertMany([
        { name: 'Thabo Molefe', location: 'Johannesburg, Gauteng', text: 'The claims process was incredibly smooth during our time of need. TFI processed everything within 24 hours and the team was so supportive.', rating: 5, isActive: true },
        { name: 'Nomsa Zulu', location: 'Durban, KZN', text: 'Very affordable for the whole family. I have peace of mind knowing my parents and children are all covered under one plan.', rating: 5, isActive: true },
        { name: 'Sipho Phiri', location: 'Cape Town, WC', text: 'Excellent service from my agent. They explained everything clearly and helped me choose the right plan for my budget.', rating: 5, isActive: true },
        { name: 'Lerato Ndlovu', location: 'Pretoria, Gauteng', text: 'I have been with TFI for 3 years now. The premiums are fair and the service is reliable. Highly recommended to anyone looking for funeral cover.', rating: 5, isActive: true },
      ])
    }

    // Seed FAQ
    const existingFAQ = await FAQ.countDocuments()
    if (existingFAQ === 0) {
      await FAQ.insertMany([
        { question: 'What is the waiting period?', answer: 'There is a 6-month waiting period for natural causes. Accidental death is covered immediately from the date of policy activation.', order: 0, isActive: true },
        { question: 'How do I make a claim?', answer: 'Contact your agent or our head office at 045 838 1171. You will need certified copies of the death certificate, ID of the deceased, and the policyholder banking details. Claims are processed within 48 hours.', order: 1, isActive: true },
        { question: 'Can I add family members later?', answer: 'Yes! You can upgrade your plan or add additional family members at any time. New members will be subject to the standard waiting period.', order: 2, isActive: true },
        { question: 'Is a medical examination required?', answer: 'No medical examination is required. You simply need to complete the application form and provide your ID document.', order: 3, isActive: true },
        { question: 'Who underwrites this policy?', answer: 'Our funeral policies are underwritten by Old Mutual and RMA, two of South Africa\'s most trusted insurance providers.', order: 4, isActive: true },
        { question: 'How do I pay my premiums?', answer: 'Premiums can be paid via debit order, EFT, or cash at selected retail outlets. Your agent will assist you with setting up your preferred payment method.', order: 5, isActive: true },
      ])
    }

    // Seed site content
    const existingContent = await SiteContent.countDocuments()
    if (existingContent === 0) {
      await SiteContent.insertMany([
        { key: 'hero', section: 'hero', title: 'Affordable Funeral Cover for You and Your Family', subtitle: 'Flexible funeral plans from TFI Burial Society with cover options for individuals, spouses, children, and extended family members.', body: '' },
        { key: 'about', section: 'about', title: 'About TFI Burial Society', subtitle: 'Dignified funeral cover since establishment', body: 'TFI Burial Society (PTY) Ltd, marketed by Dignify Funeral Solutions, provides affordable and reliable funeral cover plans for individuals and families across South Africa. Our mission is to ensure that every family can give their loved ones a dignified farewell without financial burden. We are underwritten by Old Mutual and RMA.' },
        { key: 'company-info', section: 'company', title: 'TFI Burial Society', subtitle: 'Marketed by Dignify Funeral Solutions', body: '', metadata: { fspNumber: '50841', phone: '0458381171', whatsapp: '0730278136', email: 'dignifyfuneralsolutions@gmail.com', facebook: 'https://facebook.com/DignifyFuneralSolutions', partners: 'Old Mutual, RMA', disclaimer: 'TFI Brokers (Pty) Ltd is a juristic representative operating under House of Administration (Pty) Ltd, an authorised Financial Services Provider (FSP No. 50841). Terms & Conditions Apply.' } },
      ])
    }

    return NextResponse.json({
      message: 'Database seeded successfully',
      admin: 'admin@tfifuneral.co.za',
      plans: planCount,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Seed failed: ' + error.message },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Send a POST request to seed the database',
    endpoint: '/api/seed',
  })
}
