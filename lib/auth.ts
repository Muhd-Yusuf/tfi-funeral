import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import connectDB from './mongodb'
import Admin from './models/Admin'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        await connectDB()
        const admin = await Admin.findOne({ email: credentials.email })
        if (!admin) return null

        const isValid = await bcrypt.compare(credentials.password, admin.password)
        if (!isValid) return null

        return {
          id: admin._id.toString(),
          email: admin.email,
          name: admin.name,
          role: admin.role,
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: { signIn: '/admin/login' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.role = token.role
        session.user.id = token.sub
      }
      return session
    },
  },
}
