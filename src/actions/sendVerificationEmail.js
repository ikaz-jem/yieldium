"use server"

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);


export async function sendVerificationEmail(email, token) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`;

  await resend.emails.send({
    from: 'no-reply@yourdomain.com',
    to: email,
    subject: 'Verify Your Email',
    html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
  });
}
