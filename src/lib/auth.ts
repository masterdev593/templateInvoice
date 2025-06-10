import { MongoDBAdapter } from '@auth/mongodb-adapter';
import NextAuth, { DefaultSession } from 'next-auth';
import client from './mongodb-client';
import Resend from 'next-auth/providers/resend';
import { sendVerificationRequest } from './authSendRequest';
// Extend the NextAuth session to include additional user properties

declare module 'next-auth' {
  interface Session {
    user: {
      firstName: string;
      lastName: string;
      currency: string;
    } & DefaultSession['user'];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    Resend({
      server: '',
      from: '📊 Factura 360 <info@factura360.app>',
      sendVerificationRequest,
      
    })
  ],
  /*   providers: [
    Resend({
      from: '📊 Factura 360 <info@factura360.app>' //"Generate-Invoice <onboarding@resend.dev>"
    })
  ], */
  pages: {
    error: '/unauthorized',
    verifyRequest: '/verify-email',
    signIn: '/login'
  }
});
