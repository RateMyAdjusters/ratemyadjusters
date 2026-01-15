/**
 * Content Moderation System
 *
 * A modern, precise, and user-friendly moderation system that:
 * - Only flags actual PII/identifiers, not common words
 * - Provides exact issue locations for inline highlighting
 * - Offers severity levels (block, warn, allow)
 * - Suggests fixes and enables one-click remediation
 */

export type IssueSeverity = 'block' | 'warn' | 'info'

export interface ModerationIssue {
  id: string
  type: ModerationIssueType
  severity: IssueSeverity
  title: string
  description: string
  match: string
  startIndex: number
  endIndex: number
  fixSuggestion: string
  quickFixes: QuickFix[]
}

export interface QuickFix {
  label: string
  action: 'redact' | 'remove' | 'replace'
  replacement: string
}

export type ModerationIssueType =
  | 'claim_number'
  | 'policy_number'
  | 'phone'
  | 'email'
  | 'address'
  | 'ssn'
  | 'credit_card'
  | 'profanity'
  | 'threat'
  | 'personal_attack'
  | 'defamation_risk'

export interface ModerationResult {
  isValid: boolean
  issues: ModerationIssue[]
  blockingIssues: ModerationIssue[]
  warningIssues: ModerationIssue[]
}

// ============================================================================
// PATTERN DEFINITIONS
// ============================================================================

/**
 * Claim/Policy Number Detection
 *
 * IMPORTANT: We only flag ACTUAL identifiers, not the word "claim" by itself.
 *
 * Allowed (NOT flagged):
 * - "the claim was denied"
 * - "my claim process was slow"
 * - "claim handling was poor"
 * - "filed a claim"
 *
 * Blocked (flagged):
 * - "Claim # 123456789"
 * - "Claim number: ABC-123456"
 * - "CLM: 9876543"
 * - "claim: 22-123-4567"
 * - "policy # POL-12345"
 * - Long digit strings (6+ digits in sequence)
 */
const claimPolicyIdentifierPatterns = [
  // Explicit claim/policy number markers with actual numbers
  // "claim #123456", "claim # 123456", "claim number 123456", "claim no. 123456"
  /\b(claim|policy|clm|pol)[\s]*[#:]+[\s]*[A-Z0-9][\w\-]{4,}/gi,
  /\b(claim|policy)[\s]+(number|no\.?|num\.?)[\s:]*[A-Z0-9][\w\-]{4,}/gi,

  // Reference numbers with prefixes
  // "ref: ABC123456", "case# 12345"
  /\b(ref|reference|case)[\s]*[#:]+[\s]*[A-Z0-9][\w\-]{4,}/gi,

  // Alphanumeric IDs with separators (common claim number formats)
  // "CLM-2024-123456", "POL-ABC-12345", "22-123-4567"
  /\b[A-Z]{2,4}[\-\/][A-Z0-9]{2,}[\-\/][A-Z0-9]{3,}\b/gi,
  /\b\d{2,4}[\-\/]\d{2,4}[\-\/]\d{3,}\b/g,

  // Long digit sequences (likely identifiers, not dollar amounts or dates)
  // Must be 7+ consecutive digits to avoid false positives
  /\b\d{7,}\b/g,
]

// Phone number patterns
const phonePatterns = [
  // (555) 123-4567, 555-123-4567, 555.123.4567
  /\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}\b/g,
  // +1 555 123 4567
  /\+?1?[\s.\-]?\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}\b/g,
]

// Email patterns
const emailPatterns = [
  /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/gi,
  // Obfuscated: "john at example dot com"
  /[a-zA-Z0-9._%+\-]+\s*[\[\(]?at[\]\)]?\s*[a-zA-Z0-9.\-]+\s*[\[\(]?dot[\]\)]?\s*[a-zA-Z]{2,}/gi,
]

// Physical address patterns
const addressPatterns = [
  // Street addresses: 123 Main Street, 456 Oak Ave
  /\d+\s+[A-Za-z]+\s+(street|st|avenue|ave|road|rd|drive|dr|lane|ln|way|court|ct|boulevard|blvd|circle|cir|place|pl|terrace|ter)\b\.?/gi,
  // PO Box
  /p\.?\s*o\.?\s*box\s+\d+/gi,
  // Apartment/Unit numbers when part of address
  /(apt|apartment|unit|suite|ste|#)[\s.]*\d+[A-Z]?\b/gi,
]

// SSN pattern - must be very specific to avoid false positives
const ssnPatterns = [
  // Only match with explicit separators to reduce false positives
  /\b\d{3}[\-\s]\d{2}[\-\s]\d{4}\b/g,
]

// Credit card patterns
const creditCardPatterns = [
  // 16-digit cards with separators
  /\b\d{4}[\s\-]?\d{4}[\s\-]?\d{4}[\s\-]?\d{4}\b/g,
  // Amex (15 digits)
  /\b\d{4}[\s\-]?\d{6}[\s\-]?\d{5}\b/g,
]

// Profanity patterns (with common variations)
const profanityPatterns = [
  /\bf+[u*@]+c+k+/gi,
  /\bs+h+[i1!]+t+/gi,
  /\ba+[s$]+[s$]+h+o+l+e*/gi,
  /\bb+[i1!]+t+c+h+/gi,
  /\bc+u+n+t+/gi,
  /\bd+[i1!]+c+k+(?!ens|inson)/gi, // Avoid matching Dickens, Dickinson
  /\bp+u+s+s+y+/gi,
  /\bw+h+o+r+e+/gi,
  /\bs+l+u+t+/gi,
  /\bb+a+s+t+a+r+d+/gi,
  /\bfagg?ot/gi,
  /\bretard(?:ed)?\b/gi,
  /\bn+[i1!]+g+g+/gi,
  /\bspic\b/gi,
  /\bchink\b/gi,
  /\bkike\b/gi,
  /\bwetback/gi,
  /\btranny/gi,
]

// Threat patterns (block)
const threatPatterns = [
  /\bi('ll|'m going to|will)\s+(find|hunt|kill|hurt|get)\s+(you|them|him|her)/gi,
  /\bwatch\s+your\s+back/gi,
  /\byou('ll)?\s+(will\s+)?pay\s+for/gi,
  /\bhope\s+(you|they|he|she)\s+die/gi,
  /\bdeserves?\s+to\s+die/gi,
  /\bkill\s+(yourself|himself|herself|themselves)/gi,
  /\bdrop\s+dead/gi,
]

// Personal attack patterns (block)
const personalAttackPatterns = [
  /\bpiece\s+of\s+shit/gi,
  /\bhuman\s+garbage/gi,
  /\bwaste\s+of\s+(space|oxygen|life)/gi,
  /\bscum\s+of\s+the\s+earth/gi,
  /\brot\s+in\s+hell/gi,
  /\bburn\s+in\s+hell/gi,
]

// Defamation risk patterns (warn only - don't block)
const defamationRiskPatterns = [
  /\b(is|are|was)\s+a\s+(criminal|crook|thief|fraud|scammer)/gi,
  /\bcommitted\s+(fraud|theft|a\s+crime)/gi,
  /\bshould\s+be\s+in\s+(jail|prison)/gi,
  /\bbelongs?\s+in\s+(jail|prison)/gi,
  /\b(is|are)\s+(corrupt|crooked)/gi,
]

// ============================================================================
// DETECTION FUNCTIONS
// ============================================================================

function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

function findMatches(
  text: string,
  patterns: RegExp[],
  type: ModerationIssueType,
  severity: IssueSeverity,
  title: string,
  description: string,
  fixSuggestion: string,
  quickFixGenerator: (match: string) => QuickFix[]
): ModerationIssue[] {
  const issues: ModerationIssue[] = []
  const seenRanges = new Set<string>()

  for (const pattern of patterns) {
    // Reset lastIndex for global patterns
    pattern.lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = pattern.exec(text)) !== null) {
      const startIndex = match.index
      const endIndex = startIndex + match[0].length
      const rangeKey = `${startIndex}-${endIndex}`

      // Avoid duplicate overlapping matches
      if (seenRanges.has(rangeKey)) continue
      seenRanges.add(rangeKey)

      issues.push({
        id: generateId(),
        type,
        severity,
        title,
        description,
        match: match[0],
        startIndex,
        endIndex,
        fixSuggestion,
        quickFixes: quickFixGenerator(match[0]),
      })
    }
  }

  return issues
}

function redactDigits(text: string): string {
  return text.replace(/\d/g, 'X')
}

function removeToken(text: string): string {
  return ''
}

// ============================================================================
// MAIN MODERATION FUNCTION
// ============================================================================

export function moderateContent(text: string): ModerationResult {
  const issues: ModerationIssue[] = []

  // Check for claim/policy numbers (BLOCK)
  issues.push(...findMatches(
    text,
    claimPolicyIdentifierPatterns,
    'claim_number',
    'block',
    'Possible claim/policy number',
    'This looks like a claim or policy identifier. Remove numbers to protect your privacy.',
    'Remove the number portion, keep your description.',
    (match) => [
      { label: 'Redact digits', action: 'replace', replacement: redactDigits(match) },
      { label: 'Remove entirely', action: 'remove', replacement: '' },
      { label: 'Replace with generic', action: 'replace', replacement: '[claim number removed]' },
    ]
  ))

  // Check for phone numbers (BLOCK)
  issues.push(...findMatches(
    text,
    phonePatterns,
    'phone',
    'block',
    'Phone number detected',
    'Remove phone numbers to protect privacy.',
    'Delete the phone number from your review.',
    (match) => [
      { label: 'Remove number', action: 'remove', replacement: '' },
      { label: 'Redact digits', action: 'replace', replacement: redactDigits(match) },
    ]
  ))

  // Check for email addresses (BLOCK)
  issues.push(...findMatches(
    text,
    emailPatterns,
    'email',
    'block',
    'Email address detected',
    'Remove email addresses to protect privacy.',
    'Delete the email address from your review.',
    (match) => [
      { label: 'Remove email', action: 'remove', replacement: '' },
      { label: 'Replace with generic', action: 'replace', replacement: '[email removed]' },
    ]
  ))

  // Check for physical addresses (BLOCK)
  issues.push(...findMatches(
    text,
    addressPatterns,
    'address',
    'block',
    'Physical address detected',
    'Remove addresses to protect privacy. You can mention the city instead.',
    'Remove the specific address, mention only the city/area if needed.',
    (match) => [
      { label: 'Remove address', action: 'remove', replacement: '' },
    ]
  ))

  // Check for SSN (BLOCK)
  issues.push(...findMatches(
    text,
    ssnPatterns,
    'ssn',
    'block',
    'Possible SSN detected',
    'Never share Social Security Numbers online.',
    'Remove the SSN immediately.',
    (match) => [
      { label: 'Remove', action: 'remove', replacement: '' },
    ]
  ))

  // Check for credit cards (BLOCK)
  issues.push(...findMatches(
    text,
    creditCardPatterns,
    'credit_card',
    'block',
    'Possible credit card number',
    'Never share credit card numbers in reviews.',
    'Remove the card number immediately.',
    (match) => [
      { label: 'Remove', action: 'remove', replacement: '' },
    ]
  ))

  // Check for profanity (BLOCK)
  issues.push(...findMatches(
    text,
    profanityPatterns,
    'profanity',
    'block',
    'Inappropriate language',
    'Please express your frustration without profanity.',
    'Rephrase without the offensive word.',
    (match) => [
      { label: 'Remove word', action: 'remove', replacement: '' },
      { label: 'Censor', action: 'replace', replacement: '*'.repeat(match.length) },
    ]
  ))

  // Check for threats (BLOCK)
  issues.push(...findMatches(
    text,
    threatPatterns,
    'threat',
    'block',
    'Threatening language',
    'Threats are not allowed. Focus on describing your experience.',
    'Remove the threatening statement.',
    (match) => [
      { label: 'Remove', action: 'remove', replacement: '' },
    ]
  ))

  // Check for personal attacks (BLOCK)
  issues.push(...findMatches(
    text,
    personalAttackPatterns,
    'personal_attack',
    'block',
    'Personal attack detected',
    'Focus on your experience, not personal insults.',
    'Describe what happened instead of attacking the person.',
    (match) => [
      { label: 'Remove', action: 'remove', replacement: '' },
    ]
  ))

  // Check for defamation risk (WARN - do not block)
  issues.push(...findMatches(
    text,
    defamationRiskPatterns,
    'defamation_risk',
    'warn',
    'Potential defamation risk',
    'Stating allegations as fact could be considered defamation. Consider rephrasing.',
    'Use phrases like "I believe" or "In my opinion" and describe what happened.',
    (match) => [
      { label: 'Keep as-is', action: 'replace', replacement: match },
      { label: 'Add "I believe"', action: 'replace', replacement: `I believe ${match.toLowerCase()}` },
    ]
  ))

  // Sort issues by position in text
  issues.sort((a, b) => a.startIndex - b.startIndex)

  // Remove overlapping issues (keep the first/most specific one)
  const filteredIssues = issues.filter((issue, index) => {
    for (let i = 0; i < index; i++) {
      const prev = issues[i]
      // Check for overlap
      if (issue.startIndex < prev.endIndex && issue.endIndex > prev.startIndex) {
        return false
      }
    }
    return true
  })

  const blockingIssues = filteredIssues.filter(i => i.severity === 'block')
  const warningIssues = filteredIssues.filter(i => i.severity === 'warn')

  return {
    isValid: blockingIssues.length === 0,
    issues: filteredIssues,
    blockingIssues,
    warningIssues,
  }
}

/**
 * Apply a quick fix to the text
 */
export function applyQuickFix(
  text: string,
  issue: ModerationIssue,
  fix: QuickFix
): string {
  const before = text.substring(0, issue.startIndex)
  const after = text.substring(issue.endIndex)
  return before + fix.replacement + after
}

/**
 * Get safe rewrite suggestions for defamation risk phrases
 */
export function getSafeRewriteSuggestion(match: string): string {
  const lower = match.toLowerCase()

  if (lower.includes('committed fraud')) {
    return 'I believe the handling of my claim was improper'
  }
  if (lower.includes('criminal') || lower.includes('crook')) {
    return 'exhibited unprofessional behavior'
  }
  if (lower.includes('should be in jail') || lower.includes('belongs in jail')) {
    return 'should face consequences for their actions'
  }
  if (lower.includes('corrupt') || lower.includes('crooked')) {
    return 'may have acted improperly'
  }
  if (lower.includes('scammer') || lower.includes('fraud')) {
    return 'behaved in what I consider an unethical manner'
  }

  return `In my experience, ${match.toLowerCase()}`
}

/**
 * Analytics event types
 */
export type ModerationAnalyticsEvent =
  | 'moderation_triggered'
  | 'moderation_resolved'
  | 'submission_abandoned_after_moderation'
  | 'quick_fix_used'
  | 'preview_shown'
  | 'preview_fix_applied'

export interface ModerationAnalyticsPayload {
  event: ModerationAnalyticsEvent
  issueType?: ModerationIssueType
  severity?: IssueSeverity
  textLength?: number
  issueCount?: number
  fixType?: string
  timestamp: number
}

/**
 * Track moderation analytics
 */
export function trackModerationEvent(
  event: ModerationAnalyticsEvent,
  data?: Partial<Omit<ModerationAnalyticsPayload, 'event' | 'timestamp'>>
): ModerationAnalyticsPayload {
  const payload: ModerationAnalyticsPayload = {
    event,
    timestamp: Date.now(),
    ...data,
  }

  // Log to console in development
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('[Moderation Analytics]', payload)
  }

  // In production, this would send to analytics service
  // Example: window.gtag?.('event', event, data)

  return payload
}
