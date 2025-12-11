import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inquiry type configurations
const INQUIRY_CONFIG: Record<string, { 
  priority: string; 
  subject_prefix: string;
  emoji: string;
}> = {
  general: { priority: 'normal', subject_prefix: '💬 General Inquiry', emoji: '💬' },
  press: { priority: 'high', subject_prefix: '📰 Press/Media Inquiry', emoji: '📰' },
  legal: { priority: 'urgent', subject_prefix: '⚖️ LEGAL INQUIRY', emoji: '⚖️' },
  adjuster: { priority: 'normal', subject_prefix: '👤 Adjuster Inquiry', emoji: '👤' },
  partnership: { priority: 'high', subject_prefix: '🤝 Partnership Inquiry', emoji: '🤝' },
  bug: { priority: 'normal', subject_prefix: '🐛 Bug Report', emoji: '🐛' },
  feedback: { priority: 'normal', subject_prefix: '💡 Feedback', emoji: '💡' },
  removal: { priority: 'high', subject_prefix: '🗑️ Removal Request', emoji: '🗑️' },
};

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Sanitize input
function sanitize(input: string | undefined | null): string {
  if (!input) return '';
  return input
    .trim()
    .replace(/<[^>]*>/g, '')
    .substring(0, 5000);
}

// Build HTML email
function buildEmailHTML(data: {
  inquiry_type: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  adjuster_name?: string;
  adjuster_profile_url?: string;
  company_represented?: string;
  legal_capacity?: string;
}): string {
  const config = INQUIRY_CONFIG[data.inquiry_type] || INQUIRY_CONFIG.general;
  const isLegal = data.inquiry_type === 'legal';
  const isAdjuster = data.inquiry_type === 'adjuster' || data.inquiry_type === 'removal';
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Contact</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f4f4f5;">
  <div style="max-width: 600px; margin: 0 auto;">
    
    <div style="background: #0F4C81; border-radius: 12px 12px 0 0; padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">
        ${config.emoji} ${data.inquiry_type.charAt(0).toUpperCase() + data.inquiry_type.slice(1)} Submission
      </h1>
      <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0;">RateMyAdjusters Contact Form</p>
    </div>
    
    ${config.priority === 'urgent' ? '<div style="background: #dc2626; color: white; padding: 12px; text-align: center; font-weight: bold;">⚠️ URGENT</div>' : ''}
    ${config.priority === 'high' ? '<div style="background: #f59e0b; color: white; padding: 10px; text-align: center; font-weight: bold;">⭐ HIGH PRIORITY</div>' : ''}
    
    <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px;">
      
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="margin: 0 0 15px 0; font-size: 16px; color: #374151;">Contact Info</h2>
        <p style="margin: 5px 0;"><strong>Name:</strong> ${data.name || 'Not provided'}</p>
        <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        ${data.phone ? `<p style="margin: 5px 0;"><strong>Phone:</strong> ${data.phone}</p>` : ''}
        <p style="margin: 5px 0;"><strong>Type:</strong> ${data.inquiry_type.toUpperCase()}</p>
      </div>
      
      ${isLegal ? `
      <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="margin: 0 0 15px 0; font-size: 16px; color: #92400e;">⚖️ Legal Info</h2>
        ${data.legal_capacity ? `<p style="margin: 5px 0;"><strong>Acting As:</strong> ${data.legal_capacity}</p>` : ''}
        ${data.company_represented ? `<p style="margin: 5px 0;"><strong>Representing:</strong> ${data.company_represented}</p>` : ''}
      </div>
      ` : ''}
      
      ${isAdjuster ? `
      <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="margin: 0 0 15px 0; font-size: 16px; color: #166534;">👤 Adjuster Info</h2>
        ${data.adjuster_name ? `<p style="margin: 5px 0;"><strong>Name:</strong> ${data.adjuster_name}</p>` : ''}
        ${data.adjuster_profile_url ? `<p style="margin: 5px 0;"><strong>Profile:</strong> <a href="${data.adjuster_profile_url}">${data.adjuster_profile_url}</a></p>` : ''}
      </div>
      ` : ''}
      
      ${data.subject ? `<h3 style="margin: 0 0 10px 0;">Subject: ${data.subject}</h3>` : ''}
      
      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
        <h2 style="margin: 0 0 10px 0; font-size: 14px; color: #6b7280;">MESSAGE</h2>
        <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
      </div>
      
      <div style="margin-top: 20px; text-align: center;">
        <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject || 'Your RateMyAdjusters Inquiry')}" 
           style="display: inline-block; background: #0F4C81; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none;">
          Reply to ${data.name?.split(' ')[0] || 'Sender'}
        </a>
      </div>
      
    </div>
    
    <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 20px;">
      ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET | RateMyAdjusters LLC
    </p>
    
  </div>
</body>
</html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await request.json();
    
    const {
      inquiry_type,
      name,
      email,
      phone,
      subject,
      message,
      adjuster_name,
      adjuster_profile_url,
      company_represented,
      legal_capacity,
      honeypot,
    } = body;

    // Honeypot check
    if (honeypot) {
      return NextResponse.json({ success: true, id: 'ok' });
    }

    // Validate
    if (!inquiry_type || !INQUIRY_CONFIG[inquiry_type]) {
      return NextResponse.json({ success: false, error: 'Invalid inquiry type' }, { status: 400 });
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ success: false, error: 'Valid email required' }, { status: 400 });
    }

    if (!message || message.trim().length < 10) {
      return NextResponse.json({ success: false, error: 'Message too short' }, { status: 400 });
    }

    const config = INQUIRY_CONFIG[inquiry_type];
    
    const emailSubject = subject 
      ? `${config.subject_prefix}: ${sanitize(subject).substring(0, 60)}`
      : config.subject_prefix;

    const { error: emailError } = await resend.emails.send({
      from: 'RateMyAdjusters <onboarding@resend.dev>',
      replyTo: sanitize(email),
      to: ['info@ratemyadjusters.com'],
      subject: emailSubject,
      html: buildEmailHTML({
        inquiry_type,
        name: sanitize(name) || 'Anonymous',
        email: sanitize(email),
        phone: sanitize(phone),
        subject: sanitize(subject),
        message: sanitize(message),
        adjuster_name: sanitize(adjuster_name),
        adjuster_profile_url: sanitize(adjuster_profile_url),
        company_represented: sanitize(company_represented),
        legal_capacity: sanitize(legal_capacity),
      }),
    });

    if (emailError) {
      console.error('Email error:', emailError);
      return NextResponse.json({ success: false, error: 'Failed to send. Try again.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: 'sent', message: 'Thank you!' });

  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong.' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
