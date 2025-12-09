/**
 * Review Content Validation
 * 
 * Validates review text for inappropriate content before submission.
 * Returns clear, user-friendly messages that explain what needs to be fixed.
 */

export interface ValidationResult {
  isValid: boolean
  error?: string
  failedCheck?: string
}

// Profanity list with common variations and leetspeak
const profanityPatterns = [
  // Core profanity with variations
  /\bf+[u*@]+c+k+/gi,
  /\bs+h+[i1!]+t+/gi,
  /\ba+[s$]+[s$]+h+o+l+e*/gi,
  /\bb+[i1!]+t+c+h+/gi,
  /\bc+u+n+t+/gi,
  /\bd+[i1!]+c+k+/gi,
  /\bc+o+c+k+/gi,
  /\bp+u+s+s+y+/gi,
  /\bd+a+m+n+/gi,
  /\bh+e+l+l+\b/gi,
  /\bp+[i1!]+s+s+/gi,
  /\bw+h+o+r+e+/gi,
  /\bs+l+u+t+/gi,
  /\bb+a+s+t+a+r+d+/gi,
  /\bcrap+/gi,
  /\bfag+/gi,
  /\bdyke/gi,
  /\bretard/gi,
  /\bn+[i1!]+g+g+/gi,
  /\bspic\b/gi,
  /\bchink\b/gi,
  /\bkike\b/gi,
  /\bwetback/gi,
  /\btranny/gi,
  // Obfuscated versions
  /f[\s\-_.]*u[\s\-_.]*c[\s\-_.]*k/gi,
  /s[\s\-_.]*h[\s\-_.]*i[\s\-_.]*t/gi,
  /a[\s\-_.]*s[\s\-_.]*s/gi,
  /b[\s\-_.]*i[\s\-_.]*t[\s\-_.]*c[\s\-_.]*h/gi,
]

// Personal attack patterns
const attackPatterns = [
  // Job/firing threats
  /should\s+(be\s+)?fire[d]?/gi,
  /needs?\s+to\s+(be\s+)?fire[d]?/gi,
  /get\s+(them|him|her)\s+fire[d]?/gi,
  /deserves?\s+to\s+(be\s+)?(fire[d]?|terminate[d]?)/gi,
  // Death/harm wishes
  /hope\s+(you|they|he|she)\s+die/gi,
  /deserve[s]?\s+to\s+die/gi,
  /drop\s+dead/gi,
  /better\s+off\s+dead/gi,
  /kill\s+(yourself|himself|herself|themselves)/gi,
  /go\s+kill/gi,
  // Violence
  /i('ll|will)\s+find\s+you/gi,
  /watch\s+your\s+back/gi,
  /you('ll)?\s+pay\s+for/gi,
  /physical\s+harm/gi,
  /beat\s+(you|the\s+crap|the\s+shit)/gi,
  // Hell/damnation
  /rot\s+in\s+hell/gi,
  /burn\s+in\s+hell/gi,
  /go\s+to\s+hell/gi,
  // Degrading
  /piece\s+of\s+shit/gi,
  /waste\s+of\s+space/gi,
  /human\s+garbage/gi,
  /worthless\s+(piece|human|person)/gi,
  /scum\s+of\s+the\s+earth/gi,
  /worst\s+person/gi,
  /everyone\s+hates\s+(you|them)/gi,
  /nobody\s+likes\s+(you|them)/gi,
  // Criminal accusations without evidence
  /should\s+be\s+in\s+jail/gi,
  /belongs?\s+in\s+prison/gi,
  // Extreme characterizations
  /evil\s+person/gi,
  /sociopath/gi,
  /psychopath/gi,
  /predator/gi,
  /monster/gi,
]

// Contact information patterns
const phonePatterns = [
  /\(?\d{3}\)?[\s\-.]?\d{3}[\s\-.]?\d{4}/g,
  /\+?1?[\s\-.]?\(?\d{3}\)?[\s\-.]?\d{3}[\s\-.]?\d{4}/g,
  /\d{3}[\s\-.]?\d{4}/g,
]

const emailPatterns = [
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  /[a-zA-Z0-9._%+-]+\s*[\[\(]?at[\]\)]?\s*[a-zA-Z0-9.-]+\s*[\[\(]?dot[\]\)]?\s*[a-zA-Z]{2,}/gi,
]

const addressPatterns = [
  /\d+\s+[a-zA-Z]+\s+(street|st|avenue|ave|road|rd|drive|dr|lane|ln|way|court|ct|boulevard|blvd|circle|cir)\b/gi,
  /p\.?\s*o\.?\s*box\s+\d+/gi,
  /(apt|apartment|unit|suite|ste)[\s.#]*\d+/gi,
]

// Sensitive data patterns
const ssnPatterns = [
  /\d{3}[\s\-.]?\d{2}[\s\-.]?\d{4}/g,
]

const financialPatterns = [
  /\d{4}[\s\-.]?\d{4}[\s\-.]?\d{4}[\s\-.]?\d{4}/g, // Credit card
  /\d{4}[\s\-.]?\d{4}[\s\-.]?\d{4}[\s\-.]?\d{3}/g, // Amex
  /(account|routing|acct)[\s#:]*\d{6,}/gi,
]

const policyPatterns = [
  /(policy|claim)[\s#:]*[a-zA-Z0-9\-]{6,}/gi,
]

/**
 * Normalize text to catch leetspeak and obfuscation
 */
function normalizeText(text: string): string {
  return text
    .replace(/0/g, 'o')
    .replace(/1/g, 'i')
    .replace(/3/g, 'e')
    .replace(/4/g, 'a')
    .replace(/5/g, 's')
    .replace(/7/g, 't')
    .replace(/8/g, 'b')
    .replace(/@/g, 'a')
    .replace(/\$/g, 's')
    .replace(/\*/g, '')
    .replace(/[_\-\.]/g, '')
}

/**
 * Check text against pattern array
 */
function matchesPatterns(text: string, patterns: RegExp[]): boolean {
  const normalizedText = normalizeText(text)
  return patterns.some(pattern => {
    pattern.lastIndex = 0
    return pattern.test(text) || pattern.test(normalizedText)
  })
}

/**
 * Main validation function
 * Returns user-friendly messages that make clear it's a content issue they can fix
 */
export function validateReviewContent(text: string): ValidationResult {
  // Check for profanity
  if (matchesPatterns(text, profanityPatterns)) {
    return {
      isValid: false,
      error: "Your review contains language that doesn't meet our community guidelines. Please remove any profanity or inappropriate words, then try submitting again.",
      failedCheck: 'profanity'
    }
  }

  // Check for personal attacks
  if (matchesPatterns(text, attackPatterns)) {
    return {
      isValid: false,
      error: "Your review contains language that could be seen as a personal attack or threat. Please revise to focus on your claim experience rather than the individual, then try again.",
      failedCheck: 'attack'
    }
  }

  // Check for phone numbers
  if (matchesPatterns(text, phonePatterns)) {
    return {
      isValid: false,
      error: "Your review appears to contain a phone number. To protect everyone's privacy, please remove any phone numbers and try again.",
      failedCheck: 'phone'
    }
  }

  // Check for email addresses
  if (matchesPatterns(text, emailPatterns)) {
    return {
      isValid: false,
      error: "Your review appears to contain an email address. To protect privacy, please remove any email addresses and try again.",
      failedCheck: 'email'
    }
  }

  // Check for physical addresses
  if (matchesPatterns(text, addressPatterns)) {
    return {
      isValid: false,
      error: "Your review appears to contain a physical address. To protect privacy, please remove any addresses and try again.",
      failedCheck: 'address'
    }
  }

  // Check for SSN
  if (matchesPatterns(text, ssnPatterns)) {
    return {
      isValid: false,
      error: "Your review may contain a Social Security Number or similar ID. Please remove this sensitive information for your protection, then try again.",
      failedCheck: 'ssn'
    }
  }

  // Check for financial info
  if (matchesPatterns(text, financialPatterns)) {
    return {
      isValid: false,
      error: "Your review appears to contain financial account information. Please remove any card or account numbers to protect your security, then try again.",
      failedCheck: 'financial'
    }
  }

  // Check for policy/claim numbers
  if (matchesPatterns(text, policyPatterns)) {
    return {
      isValid: false,
      error: "Your review contains what looks like a policy or claim number. To protect your privacy, please remove these identifiers and try again.",
      failedCheck: 'policy'
    }
  }

  return { isValid: true }
}

/**
 * Optional: Sanitize text by replacing bad content
 * (Not currently used - we reject instead of auto-fix)
 */
export function sanitizeReviewContent(text: string): string {
  let sanitized = text

  // Replace profanity with asterisks
  profanityPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, (match) => '*'.repeat(match.length))
  })

  // Remove contact info
  phonePatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '[phone removed]')
  })
  emailPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '[email removed]')
  })

  return sanitized
}
