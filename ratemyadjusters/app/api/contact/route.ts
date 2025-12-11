import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import crypto from 'crypto';

// Initialize clients
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role for server-side
);

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting: 5 submissions per hour per IP
const RATE_LIMIT = 5;
const RATE_WINDOW_HOURS = 1;

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

// Hash IP for privacy
function hashIP(ip: string): string {
  return crypto.createHash('sha256').update(ip + process.env.IP_SALT || 'rma-salt').digest('hex');
}

// Check rate limit
async function checkRateLimit(ipHash: string): Promise<{ allowed: boolean; remaining: number }> {
  const windowStart = new Date(Date.now() - RATE_WINDOW_HOURS * 60 * 60 * 1000);
  
  const { data, error } = await supabase
    .from('contact_rate_limits')
    .select('submission_count')
    .eq('ip_hash', ipHash)
    .gte('window_start', windowStart.toISOString())
    .single();

  if (error || !data) {
    // No recent submissions, allow
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }

  const remaining = RATE_LIMIT - data.submission_count;
  return { allowed: remaining > 0, remaining: Math.max(0, remaining - 1) };
}

// Update rate limit counter
async function updateRateLimit(ipHash: string): Promise<void> {
  const windowStart = new Date(Date.now() - RATE_WINDOW_HOURS * 60 * 60 * 1000);
  
  // Try to update existing record
  const { data: existing } = await supabase
    .from('contact_rate_limits')
    .select('id, submission_count')
    .eq('ip_hash', ipHash)
    .gte('window_start', windowStart.toISOString())
    .single();

  if (existing) {
    await supabase
      .from('contact_rate_limits')
      .update({ submission_count: existing.submission_count + 1 })
      .eq('id', existing.id);
  } else {
    await supabase
      .from('contact_rate_limits')
      .insert({ ip_hash: ipHash, submission_count: 1, window_start: new Date().toISOString() });
  }
}

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
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .substring(0, 5000); // Limit length
}

// Build beautiful HTML email
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
  page_source?: string;
  submission_id: string;
}): string {
  const config = INQUIRY_CONFIG[data.inquiry_type] || INQUIRY_CONFIG.general;
  const isLegal = data.inquiry_type === 'legal';
  const isAdjuster = data.inquiry_type === 'adjuster';
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #0F4C81 0%, #1a5c96 100%); border-radius: 12px 12px 0 0; padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">
        ${config.emoji} New ${data.inquiry_type.charAt(0).toUpperCase() + data.inquiry_type.slice(1)} Submission
      </h1>
      <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0; font-size: 14px;">
        RateMyAdjusters Contact Form
      </p>
    </div>
    
    <!-- Priority Badge -->
    ${config.priority === 'urgent' ? `
    <div style="background: #dc2626; color: white; padding: 12px; text-align: center; font-weight: 600; font-size: 14px;">
      ⚠️ URGENT - REQUIRES IMMEDIATE ATTENTION
    </div>
    ` : config.priority === 'high' ? `
    <div style="background: #f59e0b; color: white; padding: 10px; text-align: center; font-weight: 600; font-size: 13px;">
      ⭐ HIGH PRIORITY
    </div>
    ` : ''}
    
    <!-- Main Content -->
    <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
      
      <!-- Contact Info Card -->
      <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 24px; border-left: 4px solid #0F4C81;">
        <h2 style="margin: 0 0 16px 0; font-size: 16px; color: #374151; font-weight: 600;">Contact Information</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 100px;">Name:</td>
            <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 500;">${sanitize(data.name) || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email:</td>
            <td style="padding: 8px 0;">
              <a href="mailto:${sanitize(data.email)}" style="color: #0F4C81; text-decoration: none; font-size: 14px; font-weight: 500;">${sanitize(data.email)}</a>
            </td>
          </tr>
          ${data.phone ? `
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Phone:</td>
            <td style="padding: 8px 0;">
              <a href="tel:${sanitize(data.phone)}" style="color: #0F4C81; text-decoration: none; font-size: 14px; font-weight: 500;">${sanitize(data.phone)}</a>
            </td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Type:</td>
            <td style="padding: 8px 0; color: #111827; font-size: 14px;">
              <span style="background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 500;">
                ${data.inquiry_type.toUpperCase()}
              </span>
            </td>
          </tr>
        </table>
      </div>
      
      ${isLegal ? `
      <!-- Legal Details -->
      <div style="background: #fef3c7; border-radius: 8px; padding: 20px; margin-bottom: 24px; border-left: 4px solid #f59e0b;">
        <h2 style="margin: 0 0 16px 0; font-size: 16px; color: #92400e; font-weight: 600;">⚖️ Legal Information</h2>
        <table style="width: 100%; border-collapse: collapse;">
          ${data.legal_capacity ? `
          <tr>
            <td style="padding: 8px 0; color: #92400e; font-size: 14px; width: 140px;">Acting As:</td>
            <td style="padding: 8px 0; color: #78350f; font-size: 14px; font-weight: 500;">${sanitize(data.legal_capacity)}</td>
          </tr>
          ` : ''}
          ${data.company_represented ? `
          <tr>
            <td style="padding: 8px 0; color: #92400e; font-size: 14px;">Representing:</td>
            <td style="padding: 8px 0; color: #78350f; font-size: 14px; font-weight: 500;">${sanitize(data.company_represented)}</td>
          </tr>
          ` : ''}
        </table>
      </div>
      ` : ''}
      
      ${isAdjuster ? `
      <!-- Adjuster Details -->
      <div style="background: #f0fdf4; border-radius: 8px; padding: 20px; margin-bottom: 24px; border-left: 4px solid #22c55e;">
        <h2 style="margin: 0 0 16px 0; font-size: 16px; color: #166534; font-weight: 600;">👤 Adjuster Information</h2>
        <table style="width: 100%; border-collapse: collapse;">
          ${data.adjuster_name ? `
          <tr>
            <td style="padding: 8px 0; color: #166534; font-size: 14px; width: 140px;">Adjuster Name:</td>
            <td style="padding: 8px 0; color: #14532d; font-size: 14px; font-weight: 500;">${sanitize(data.adjuster_name)}</td>
          </tr>
          ` : ''}
          ${data.adjuster_profile_url ? `
          <tr>
            <td style="padding: 8px 0; color: #166534; font-size: 14px;">Profile URL:</td>
            <td style="padding: 8px 0;">
              <a href="${sanitize(data.adjuster_profile_url)}" style="color: #15803d; text-decoration: none; font-size: 14px; word-break: break-all;">${sanitize(data.adjuster_profile_url)}</a>
            </td>
          </tr>
          ` : ''}
        </table>
      </div>
      ` : ''}
      
      <!-- Subject -->
      ${data.subject ? `
      <div style="margin-bottom: 24px;">
        <h2 style="margin: 0 0 8px 0; font-size: 14px; color: #6b7280; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Subject</h2>
        <p style="margin: 0; font-size: 18px; color: #111827; font-weight: 600;">${sanitize(data.subject)}</p>
      </div>
      ` : ''}
      
      <!-- Message -->
      <div style="margin-bottom: 24px;">
        <h2 style="margin: 0 0 12px 0; font-size: 14px; color: #6b7280; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Message</h2>
        <div style="background: #f9fafb; border-radius: 8px; padding: 20px; border: 1px solid #e5e7eb;">
          <p style="margin: 0; font-size: 15px; color: #374151; white-space: pre-wrap; word-break: break-word;">${sanitize(data.message)}</p>
        </div>
      </div>
      
      <!-- Quick Actions -->
      <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; text-align: center;">
        <a href="mailto:${sanitize(data.email)}?subject=Re: ${encodeURIComponent(data.subject || 'Your RateMyAdjusters Inquiry')}" 
           style="display: inline-block; background: #0F4C81; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 14px; margin-right: 10px;">
          ↩️ Reply to ${sanitize(data.name)?.split(' ')[0] || 'Sender'}
        </a>
        ${data.adjuster_profile_url ? `
        <a href="${sanitize(data.adjuster_profile_url)}" 
           style="display: inline-block; background: #f3f4f6; color: #374151; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 14px;">
          👤 View Profile
        </a>
        ` : ''}
      </div>
      
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
      <p style="margin: 0 0 8px 0;">
        Submission ID: <code style="background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-family: monospace;">${data.submission_id}</code>
      </p>
      <p style="margin: 0 0 8px 0;">
        Source: ${data.page_source || 'Contact Page'} • ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET
      </p>
      <p style="margin: 0;">
        RateMyAdjusters LLC • <a href="https://ratemyadjusters.com" style="color: #9ca3af;">ratemyadjusters.com</a>
      </p>
    </div>
    
  </div>
</body>
</html>
  `;
}

// Build plain text version
function buildEmailText(data: {
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
  page_source?: string;
  submission_id: string;
}): string {
  const config = INQUIRY_CONFIG[data.inquiry_type] || INQUIRY_CONFIG.general;
  
  let text = `
${config.subject_prefix}
${'='.repeat(50)}

CONTACT INFORMATION
-------------------
Name: ${data.name || 'Not provided'}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Inquiry Type: ${data.inquiry_type.toUpperCase()}
Priority: ${config.priority.toUpperCase()}
`;

  if (data.inquiry_type === 'legal') {
    text += `
LEGAL INFORMATION
-----------------
Acting As: ${data.legal_capacity || 'Not specified'}
Representing: ${data.company_represented || 'Not specified'}
`;
  }

  if (data.inquiry_type === 'adjuster') {
    text += `
ADJUSTER INFORMATION
--------------------
Adjuster Name: ${data.adjuster_name || 'Not specified'}
Profile URL: ${data.adjuster_profile_url || 'Not specified'}
`;
  }

  if (data.subject) {
    text += `
SUBJECT
-------
${data.subject}
`;
  }

  text += `
MESSAGE
-------
${data.message}

${'='.repeat(50)}
Submission ID: ${data.submission_id}
Source: ${data.page_source || 'Contact Page'}
Time: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET

Reply directly to this email to respond to ${data.name || 'the sender'}.
`;

  return text;
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor?.split(',')[0] || request.headers.get('x-real-ip') || 'unknown';
    const ipHash = hashIP(ip);
    
    // Check rate limit
    const { allowed, remaining } = await checkRateLimit(ipHash);
    if (!allowed) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many submissions. Please try again later.',
          code: 'RATE_LIMITED'
        },
        { status: 429, headers: { 'X-RateLimit-Remaining': '0' } }
      );
    }

    // Parse request body
    const body = await request.json();
    
    // Validate required fields
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
      page_source,
      honeypot, // Hidden field for spam detection
    } = body;

    // Honeypot check (spam bots fill hidden fields)
    if (honeypot) {
      // Silently reject but return success to confuse bots
      return NextResponse.json({ success: true, id: 'spam-blocked' });
    }

    // Validate inquiry type
    if (!inquiry_type || !INQUIRY_CONFIG[inquiry_type]) {
      return NextResponse.json(
        { success: false, error: 'Invalid inquiry type' },
        { status: 400 }
      );
    }

    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    // Validate message
    if (!message || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'Message must be at least 10 characters' },
        { status: 400 }
      );
    }

    // Generate submission ID
    const submission_id = crypto.randomUUID();
    const config = INQUIRY_CONFIG[inquiry_type];

    // Store in Supabase first (backup)
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        id: submission_id,
        inquiry_type: sanitize(inquiry_type),
        subject: sanitize(subject),
        name: sanitize(name),
        email: sanitize(email),
        phone: sanitize(phone),
        message: sanitize(message),
        adjuster_name: sanitize(adjuster_name),
        adjuster_profile_url: sanitize(adjuster_profile_url),
        company_represented: sanitize(company_represented),
        legal_capacity: sanitize(legal_capacity),
        ip_hash: ipHash,
        user_agent: request.headers.get('user-agent'),
        referrer: request.headers.get('referer'),
        page_source: sanitize(page_source),
        priority: config.priority,
      });

    if (dbError) {
      console.error('Database error:', dbError);
      // Continue even if DB fails - email is more important
    }

    // Build email content
    const emailData = {
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
      page_source: sanitize(page_source),
      submission_id,
    };

    // Build email subject
    const emailSubject = subject 
      ? `${config.subject_prefix}: ${sanitize(subject).substring(0, 60)}`
      : config.subject_prefix;

    // Send email via Resend
    const { data: emailResult, error: emailError } = await resend.emails.send({
      from: 'RateMyAdjusters <noreply@ratemyadjusters.com>',
      replyTo: sanitize(email), // Allow direct reply to sender
      to: ['info@ratemyadjusters.com'],
      subject: emailSubject,
      html: buildEmailHTML(emailData),
      text: buildEmailText(emailData),
      tags: [
        { name: 'inquiry_type', value: inquiry_type },
        { name: 'priority', value: config.priority },
      ],
    });

    if (emailError) {
      console.error('Email error:', emailError);
      // Still return success if DB worked - we have the submission
      if (!dbError) {
        return NextResponse.json({ 
          success: true, 
          id: submission_id,
          warning: 'Submission saved but email notification failed'
        });
      }
      return NextResponse.json(
        { success: false, error: 'Failed to process submission. Please try again.' },
        { status: 500 }
      );
    }

    // Update rate limit
    await updateRateLimit(ipHash);

    // Success!
    return NextResponse.json(
      { 
        success: true, 
        id: submission_id,
        message: 'Thank you for your submission. We will review it shortly.'
      },
      { headers: { 'X-RateLimit-Remaining': remaining.toString() } }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS (if needed)
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
