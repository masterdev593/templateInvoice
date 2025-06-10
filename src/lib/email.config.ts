import { Resend } from 'resend';

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export async function sendEmail(to: string, subject: string, reactHTML: any) {
  const { data, error } = await resend.emails.send({
    from: '📊 Invoice - Factura 360 <info@factura360.app>',
    to: to,
    subject: subject,
    react: reactHTML
  });

  if (error) {
    return error;
  }
  return data;
}
