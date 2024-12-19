import { DefaultSession } from 'next-auth';


declare module 'next-auth' {
  interface User {
    id: string
    role: UserRole
    email: string
    name?: string
    image?: string
    emailVerified?:Date
  }
  
  interface Session {
    user: User & DefaultSession['user'];
  } 
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: UserRole
    email: string
    name?: string
    image?: string
    emailVerified?:Date
  }
}