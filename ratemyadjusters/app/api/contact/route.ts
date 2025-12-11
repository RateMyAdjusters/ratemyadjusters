import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend('re_4hBnjfJZ_LxvWqGLKCbuvoFHt3o3Ect1W');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { inquiry_type, name, email, message, subject, honeypot } = body;

    if (honeypot) return NextResponse.json({ success: true });
    if (!email || !message) return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 });

    const { error } = await resend.emails.send({
      from: 'RateMyAdjusters <onboarding@resend.dev>',
      replyTo: email,
      to: 'info@ratemyadjusters.com',
      subject: `[${inquiry_type || 'Contact'}] ${subject || 'New Message'}`,
      html: `<h2>New Contact Form</h2><p><b>From:</b> ${name || 'Anonymous'} (${email})</p><p><b>Type:</b> ${inquiry_type}</p><p><b>Message:</b></p><p>${message}</p>`,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ success: false, error: 'Email failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: 'sent' });
  } catch (e) {
    console.error('Error:', e);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({});
}
