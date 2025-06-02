import { Resend } from "resend";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export async function sendEmail(to: string, subject: string, reactHTML: any) {
  const { data, error } = await resend.emails.send({
    from: "AmitInvoice <info@resend.amitprajapati.co.in>",
    to: to,
    subject: subject,
    react: reactHTML,
  });

  if(error){
    return error
  }
  return data
}
