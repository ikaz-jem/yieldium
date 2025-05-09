// lib/sendVerificationEmail.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email, token) {
  const verificationUrl = `https://yieldium/verification?token=${token}`;

   const { data, error } =  await resend.emails.send({
    from: 'acme <onboarding@resend.dev>',
    to: ['echchebabzakariae@gmail.com'],
    subject: 'Verify Your Email',
    html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p> <br/> <p>Your Code</p> <br/>  <h1 className='text-red-500'>"${token}"</h1> `,
  });

 
}
