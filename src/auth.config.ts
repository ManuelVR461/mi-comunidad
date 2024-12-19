import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from 'next-auth/providers/credentials';
import prisma from "@/libs/prisma/prisma";
import { user_role } from "@prisma/client"
import bcryptjs from "bcryptjs";
import { z } from "zod";

// Esquema para validar las credenciales
const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authOptions: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  providers: [
    Credentials({
      name: "CredentialsSignin",
      credentials: {
        email: { label: "Correo electrónico", type: "email", placeholder: "correo@ejemplo.com" },
        password: { label: "Contraseña", type: "password", placeholder: "******" },
      },
      async authorize(credentials) {
        try {
            // Validaciones iniciales
            if (!credentials?.email || !credentials?.password) {
                throw new Error("Credenciales vacías");
            }

            const parsedCredentials = credentialsSchema.safeParse(credentials);
            if (!parsedCredentials.success) {
                throw new Error("Credenciales inválidas");
            }

            console.log(parsedCredentials.data);
            const { email, password } = parsedCredentials.data;

            // Buscar usuario en la base de datos
            const user = await prisma.user.findUnique({
                where: { email: email.toLowerCase() },
            });
            if (!user) {
                throw new Error("Usuario no encontrado");
            }

            // Comparar contraseñas
            const isPasswordValid = await bcryptjs.compare(
                password, 
                user.password || ''
            );
            if (!isPasswordValid) {
                throw new Error("Contraseña incorrecta");
            }

            // Retornar datos del usuario
            return {
                id: user.id,
                email: user.email,
                image: user.image,
                role: user.role
            };
        } catch (error) {
            console.log(error);
            console.error("Error en la autenticación");
            return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          role: token.role as user_role,
          image: token.image as string,
          emailVerified: token?.emailVerified as Date,
        }
      }
      return session
    }
  },
  events: {
    async signIn(message) {
      console.log('Inicio de sesión exitoso', message.user.email)
    }
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 horas
  },
};

export const { signIn, signOut, auth, handlers } = NextAuth(authOptions);
