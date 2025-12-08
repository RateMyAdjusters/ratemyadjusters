import { NextRequest, NextResponse } from 'next/server'

// ⚠️ SET YOUR EMAIL - Add to .env.local: ADMIN_EMAIL=your@email.com
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@ratemyadjusters.com'

// This uses Resend, but you can swap for any email service
// Add to .env.local: RESEND_API_KEY=re_xxxxxxxxxxxx
const RESEND_API_KEY = process.env.RESEND_API_KEY

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { adjusterName, adjusterState, adjusterSlug, email, phone } = body

    // If Resend is configured, send email
    if (RESEND_API_KEY) {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'RateMyAdjusters <notifications@ratemyadjusters.com>',
          to: ADMIN_EMAIL,
          subject: `CLAIM REQUEST — ${adjusterName}, ${adjusterState}`,
          html: `
            <h2>New Profile Claim Request</h2>
            <p><strong>Adjuster:</strong> ${adjusterName}</p>
            <p><strong>State:</strong> ${adjusterState}</p>
            <p><strong>Profile:</strong> <a href="https://ratemyadjusters.com/adjuster/${adjusterSlug}">View Profile</a></p>
            <hr />
            <p><strong>Claimant Email:</strong> ${email}</p>
            <p><strong>Claimant Phone:</strong> ${phone}</p>
            <hr />
            <h3>To Approve:</h3>
            <ol>
              <li>Verify the email domain looks legitimate</li>
              <li>Optionally email them a verification question</li>
              <li>In Supabase, update the adjuster record:
                <ul>
                  <li><code>profile_claimed = true</code></li>
                  <li><code>claimed_by_email = ${email}</code></li>
                </ul>
              </li>
              <li>Reply to let them know they're approved</li>
            </ol>
          `,
          text: `
CLAIM REQUEST — ${adjusterName}, ${adjusterState}

Adjuster: ${adjusterName}
State: ${adjusterState}
Profile: https://ratemyadjusters.com/adjuster/${adjusterSlug}

Claimant Email: ${email}
Claimant Phone: ${phone}

To Approve:
1. Verify the email domain looks legitimate
2. In Supabase, set profile_claimed = true
3. Reply to let them know they're approved
          `,
        }),
      })

      if (!emailResponse.ok) {
        console.error('Resend error:', await emailResponse.text())
      }
    } else {
      // No email service configured - just log it
      console.log('=== CLAIM REQUEST ===')
      console.log(`Adjuster: ${adjusterName} (${adjusterState})`)
      console.log(`Email: ${email}`)
      console.log(`Phone: ${phone}`)
      console.log(`Profile: https://ratemyadjusters.com/adjuster/${adjusterSlug}`)
      console.log('=====================')
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Claim notification error:', error)
    return NextResponse.json({ success: false, error: 'Failed to process' }, { status: 500 })
  }
}
