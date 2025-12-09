// ===========================================
// COMPREHENSIVE REVIEW CONTENT VALIDATION
// ===========================================

// Profanity list - extensive with all variations
const profanityList = [
  // F-word variations
  'fuck', 'fucker', 'fuckers', 'fucked', 'fucking', 'fucks', 'fuckin', 'fuckn',
  'fck', 'fuk', 'fuq', 'phuck', 'phuk', 'f u c k', 'f-u-c-k', 'f.u.c.k',
  'f*ck', 'f**k', 'fu*k', 'fuc*', 'f***', 'fvck', 'fück', 'fμck',
  'fukk', 'fucc', 'fuk', 'effing', 'effin', 'eff', 'mofo', 'motherfucker',
  'motherfucking', 'motherfuckers', 'mfer', 'mf', 'm.f.', 'mthrfckr',
  'motherf', 'muthafucka', 'muthafucker', 'mutha', 'fecker', 'fekker',
  
  // S-word variations
  'shit', 'shits', 'shitty', 'shitter', 'shitting', 'shite', 'shiite',
  'sht', 'sh1t', 'sh!t', 's h i t', 's-h-i-t', 's.h.i.t', 'sh*t', 'sh**',
  'shyt', 'shiznit', 'shiz', 'schit', 'şhit', 'bullshit', 'bullsh1t',
  'bs', 'b.s.', 'horseshit', 'apeshit', 'batshit', 'dipshit', 'dumbshit',
  
  // A-word variations
  'ass', 'asses', 'arse', 'arses', 'asshole', 'assholes', 'asshat', 'asswipe',
  'a$$', 'a$$hole', 'a-hole', 'ahole', 'azz', 'azzhole', '@ss', '@sshole',
  'a s s', 'a.s.s', 'assh0le', 'as$hole', 'arsehole', 'smartass', 'dumbass',
  'fatass', 'jackass', 'kickass', 'badass', 'hardass', 'candyass', 'assclown',
  'assface', 'assmunch', 'assbag', 'butthole', 'buttwipe',
  
  // B-word variations
  'bitch', 'bitches', 'bitchy', 'bitching', 'biotch', 'biatch', 'beyotch',
  'b1tch', 'b!tch', 'btch', 'b i t c h', 'b-i-t-c-h', 'b.i.t.c.h', 'b*tch',
  'b**ch', 'bi+ch', 'sonofabitch', 'sob', 's.o.b.', 'sonuvabitch',
  
  // C-word variations
  'cunt', 'cunts', 'cunty', 'c u n t', 'c-u-n-t', 'c.u.n.t', 'c*nt', 'cvnt',
  'kunt', 'kunts', 'coont', 'cnt',
  
  // D-word variations
  'dick', 'dicks', 'dickhead', 'dickheads', 'dickface', 'dickwad', 'dickweed',
  'd1ck', 'd!ck', 'd i c k', 'd-i-c-k', 'd.i.c.k', 'd*ck', 'dik', 'dck',
  'cock', 'cocks', 'cockhead', 'cocksucker', 'cocksuckers', 'cocksucking',
  'c0ck', 'c o c k', 'c-o-c-k', 'c.o.c.k', 'c*ck', 'cok', 'kok',
  'damn', 'damned', 'damnit', 'dammit', 'goddamn', 'goddamnit', 'goddam',
  'darn', 'dayum',
  
  // P-word variations
  'pussy', 'pussies', 'puss', 'pussys', 'p u s s y', 'p-u-s-s-y', 'p.u.s.s.y',
  'p*ssy', 'pu$$y', 'pvssy', 'pussi', 'pusy', 'prick', 'pricks', 'pr1ck',
  
  // W-word variations
  'whore', 'whores', 'whorish', 'wh0re', 'w h o r e', 'w-h-o-r-e', 'w.h.o.r.e',
  'w*ore', 'hoar', 'hoe', 'hoes', 'ho', 'hooker', 'hookers', 'slut', 'sluts',
  'slutty', 'sl*t', 'slu+', 's l u t', 'skank', 'skanks', 'skanky', 'tramp',
  
  // Bastard variations
  'bastard', 'bastards', 'bstrd', 'b a s t a r d', 'b-a-s-t-a-r-d', 'b*stard',
  'basstard', 'bustard',
  
  // Slurs and hate speech (critical to block)
  'nigger', 'niggers', 'nigga', 'niggas', 'nigg3r', 'n1gger', 'n1gga',
  'n i g g e r', 'n-i-g-g-e-r', 'n.i.g.g.e.r', 'n*gger', 'nig', 'nigg',
  'negro', 'negros', 'coon', 'coons', 'darkie', 'darkies', 'spook',
  
  'fag', 'fags', 'faggot', 'faggots', 'faggy', 'f a g', 'f-a-g', 'f.a.g',
  'f*g', 'f*ggot', 'fa**ot', 'phaggot', 'homo', 'homos', 'dyke', 'dykes',
  'queer', 'queers', 'tranny', 'trannies', 'shemale',
  
  'retard', 'retards', 'retarded', 'r3tard', 'r e t a r d', 'r-e-t-a-r-d',
  'r.e.t.a.r.d', 'r*tard', 'tard', 'tards', 'libtard', 'fucktard',
  
  'spic', 'spics', 'spick', 'spicks', 'wetback', 'wetbacks', 'beaner', 'beaners',
  'chink', 'chinks', 'ch1nk', 'gook', 'gooks', 'jap', 'japs', 'nip', 'nips',
  'paki', 'pakis', 'raghead', 'ragheads', 'towelhead', 'towelheads', 'sandnigger',
  'kike', 'kikes', 'heeb', 'heebs', 'hymie', 'hymies',
  'cracker', 'crackers', 'honky', 'honkies', 'whitey',
  'wop', 'wops', 'dago', 'dagos', 'guinea', 'guineas', 'greaseball',
  
  // Other profanity
  'crap', 'crappy', 'craps', 'cr*p', 'douche', 'douchebag', 'douchebags',
  'douchy', 'd-bag', 'dbag', 'scumbag', 'scumbags', 'scum', 'dirtbag',
  'sleazebag', 'sleazeball', 'turd', 'turds', 'turdface',
  'wanker', 'wankers', 'wank', 'tosser', 'tossers', 'twat', 'twats', 'tw*t',
  'bellend', 'knob', 'knobhead', 'git', 'pillock', 'plonker', 'prat', 'minger',
  'bollocks', 'b0llocks', 'bullocks', 'bloody', 'bugger', 'buggers', 'buggered',
  'choad', 'chode', 'gooch', 'taint', 'nutsack', 'ballsack', 'balls', 'ballz',
  'nads', 'gonads', 'peckerhead', 'pecker', 'schlong', 'dong', 'wiener', 'weiner',
  'boner', 'hardon', 'stiffy', 'jizz', 'jism', 'jizzed', 'cum', 'cumshot',
  'cumming', 'orgasm', 'climax', 'masturbate', 'masturbation', 'wanking',
  'jackoff', 'jerkoff', 'jerking', 'handjob', 'blowjob', 'bj', 'b.j.', 'fellatio',
  'cunnilingus', 'rimjob', 'rimming', 'anal', 'anus', 'buttfuck', 'assfuck',
  'skullfuck', 'titfuck', 'footjob', 'gangbang', 'circlejerk',
  'dildo', 'dildos', 'vibrator', 'buttplug', 'fleshlight',
  'porn', 'porno', 'pornography', 'xxx', 'nsfw', 'nude', 'nudes', 'naked',
  'boob', 'boobs', 'booby', 'boobies', 'tit', 'tits', 'titty', 'titties',
  'breast', 'breasts', 'nipple', 'nipples', 'areola',
  'vagina', 'vaginas', 'vajayjay', 'vag', 'cooch', 'coochie', 'cooter',
  'snatch', 'muff', 'beaver', 'clitoris', 'clit', 'labia',
  'penis', 'penises', 'phallus', 'member', 'manhood', 'johnson', 'willy',
  'testicle', 'testicles', 'teste', 'testes', 'scrotum', 'ballsac',
  'erection', 'erectile', 'impotent', 'viagra', 'cialis',
  
  // Insults
  'idiot', 'idiots', 'idiotic', '1diot', 'imbecile', 'imbeciles', 'moron',
  'morons', 'moronic', 'm0ron', 'stupid', 'stupids', 'dumb', 'dumber', 'dumbest',
  'dumbass', 'dummy', 'dummies', 'loser', 'losers', 'l0ser', 'luser',
  'pathetic', 'worthless', 'useless', 'incompetent', 'brainless', 'braindead',
  'clueless', 'ignorant', 'ignoramus', 'nitwit', 'halfwit', 'dimwit', 'twit',
  'numbskull', 'bonehead', 'blockhead', 'knucklehead', 'meathead', 'airhead',
  'pinhead', 'fathead', 'butthead', 'poophead', 'dunderhead', 'lunkhead',
  'nutjob', 'psycho', 'psychos', 'lunatic', 'lunatics', 'maniac', 'maniacs',
  'sicko', 'sickos', 'weirdo', 'weirdos', 'creep', 'creeps', 'creepy',
  'pervert', 'perverts', 'perv', 'pervs', 'pervy', 'pedo', 'pedophile',
  'freak', 'freaks', 'freaky', 'spaz', 'spazz', 'spastic',
  
  // Crude terms
  'piss', 'pissed', 'pissing', 'pisser', 'pee', 'peeing', 'urinate',
  'fart', 'farts', 'farted', 'farting', 'flatulence', 'gas',
  'poop', 'pooped', 'pooping', 'poopy', 'dookie', 'doodoo', 'caca',
  'defecate', 'defecation', 'excrement', 'feces', 'fecal',
  'vomit', 'vomiting', 'puke', 'puking', 'barf', 'barfing',
  'snot', 'booger', 'boogers', 'phlegm', 'mucus',
]

// Personal attack patterns - extensive
const attackPatterns = [
  // Firing/job threats
  /should (be |get )?(fired|terminated|let go|sacked|canned|axed)/i,
  /needs? to (be |get )?(fired|terminated|let go|sacked|canned|axed)/i,
  /deserve[s]? to (be |get )?(fired|terminated|let go|sacked|canned|axed)/i,
  /hope[s]? (you|they|he|she|this person) (get[s]?|is|are) (fired|terminated|let go|sacked)/i,
  /fire (this|that|the) (person|guy|man|woman|idiot|moron|adjuster)/i,
  /get (this|that|the) (person|guy|man|woman|idiot|moron|adjuster) fired/i,
  
  // Death wishes
  /deserve[s]? to die/i,
  /should (just )?die/i,
  /hope[s]? (you|they|he|she|this person) die[s]?/i,
  /go die/i,
  /drop dead/i,
  /wish (you|they|he|she) (were|was|would be) dead/i,
  /better off dead/i,
  /world.*(better|nicer).*(without|if).*(dead|gone|died)/i,
  
  // Violence threats
  /i('ll| will| wanna| want to| gonna| going to) (find|get|hurt|harm|injure|attack|assault|beat|hit|punch|kick|slap|strangle|choke|stab|shoot|murder|kill)/i,
  /(find|get|hurt|harm|injure|attack|assault|beat|hit|punch|kick|slap|strangle|choke|stab|shoot|murder|kill) (you|them|him|her|this person)/i,
  /come (find|get|after)/i,
  /watch your back/i,
  /you('ll| will) (pay|regret|suffer|be sorry)/i,
  /make (you|them|him|her) (pay|regret|suffer)/i,
  /physical harm/i,
  /bodily harm/i,
  
  // Suicide suggestions
  /kill (yourself|yourselves|himself|herself|themselves)/i,
  /go kill/i,
  /commit suicide/i,
  /end (your|their|his|her) life/i,
  /off yourself/i,
  /hang yourself/i,
  /slit (your|their) wrists?/i,
  /jump off a/i,
  
  // Hell/damnation
  /rot in hell/i,
  /burn in hell/i,
  /go to hell/i,
  /hope[s]? (you|they|he|she) (rot|burn)[s]? in hell/i,
  /see you in hell/i,
  /straight to hell/i,
  /damned to hell/i,
  /eternal damnation/i,
  
  // Degrading phrases
  /piece of (shit|crap|garbage|trash|filth|scum|work)/i,
  /waste of (space|air|oxygen|skin|life|time|human)/i,
  /excuse for a (human|person|man|woman|adjuster)/i,
  /sorry excuse/i,
  /absolute (scum|trash|garbage|filth|disgrace)/i,
  /human (garbage|trash|filth|scum|waste)/i,
  /utter (failure|disgrace|disappointment)/i,
  /total (failure|disgrace|disappointment|waste)/i,
  /complete (failure|disgrace|disappointment|waste|moron|idiot)/i,
  
  // Worst person phrases
  /worst (person|human|being|adjuster|man|woman|guy|individual) (i('ve)?|we('ve)?|ever)/i,
  /most (horrible|terrible|awful|disgusting|vile|despicable|deplorable) (person|human|being|adjuster)/i,
  /never met (a |anyone )?(worse|more horrible|more terrible|more disgusting)/i,
  /lowest of the low/i,
  /bottom of the barrel/i,
  /scum of the earth/i,
  /dregs of society/i,
  
  // Character assassination
  /everyone (knows|says|thinks) (you|they|he|she) (are|is|suck)/i,
  /nobody likes (you|them|him|her)/i,
  /no one (likes|trusts|respects) (you|them|him|her)/i,
  /everyone hates (you|them|him|her)/i,
  /universally (hated|despised|loathed)/i,
  
  // Family attacks
  /your (mom|mother|dad|father|family|wife|husband|kids?|children|son|daughter)/i,
  /hope[s]? (your|their|his|her) (family|kids?|children|wife|husband|mother|father)/i,
  
  // Criminal accusations (without evidence)
  /(probably|definitely|clearly|obviously) (a |)(criminal|crook|thief|fraud|con ?man|con ?artist|scammer)/i,
  /should be (in jail|arrested|locked up|imprisoned|behind bars)/i,
  /belong[s]? in (jail|prison)/i,
  /hope[s]? (you|they|he|she) (go|goes|get|gets) (to jail|arrested|locked up)/i,
  
  // Extreme negative characterizations
  /evil (person|human|being|man|woman)/i,
  /pure evil/i,
  /monster/i,
  /devil/i,
  /satan/i,
  /antichrist/i,
  /demon/i,
  /sociopath/i,
  /psychopath/i,
  /narcissist/i,
  /predator/i,
  
  // Discrimination accusations
  /racist/i,
  /sexist/i,
  /bigot/i,
  /nazi/i,
  /fascist/i,
  /communist/i,
  /terrorist/i,
  
  // Crude descriptions
  /ugly (as |)(sin|hell|fuck|shit)/i,
  /fat (as |)(hell|fuck|shit|pig)/i,
  /disgusting (looking|person|human)/i,
  /makes? me (sick|vomit|puke|nauseous)/i,
]

// Contact info patterns - comprehensive
const phonePatterns = [
  // Standard formats
  /(\+?1[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/,
  // With extensions
  /(\+?1[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}\s*(x|ext|extension)\.?\s*\d+/i,
  // International
  /\+\d{1,3}[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
  // Written out
  /\b(call|text|phone|dial|reach)( me| us| them)?( at)?[:\s]+[\d\s\-\(\)\.]+/i,
  // Spelled out numbers
  /(one|two|three|four|five|six|seven|eight|nine|zero)[\s\-]*(one|two|three|four|five|six|seven|eight|nine|zero)[\s\-]*(one|two|three|four|five|six|seven|eight|nine|zero)/i,
]

const emailPatterns = [
  // Standard email
  /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/,
  // Obfuscated
  /[a-zA-Z0-9._%+\-]+\s*[\[\(\{]?\s*(at|@)\s*[\]\)\}]?\s*[a-zA-Z0-9.\-]+\s*[\[\(\{]?\s*(dot|\.)\s*[\]\)\}]?\s*[a-zA-Z]{2,}/i,
  // Written out
  /\b(email|e-mail|contact|reach|write)( me| us| them)?( at)?[:\s]+[a-zA-Z0-9._%+\-]+/i,
]

const addressPatterns = [
  // Street addresses
  /\d{1,5}\s+[\w\s]+\s+(street|st|avenue|ave|road|rd|boulevard|blvd|drive|dr|lane|ln|way|court|ct|circle|cir|place|pl|terrace|ter|parkway|pkwy|highway|hwy|freeway|fwy)\.?(\s+(apt|apartment|suite|ste|unit|#)\s*\.?\s*\d+)?/i,
  // PO Boxes
  /p\.?\s*o\.?\s*box\s+\d+/i,
  // Apartment/Unit only
  /(apt|apartment|suite|ste|unit|#)\s*\.?\s*\d+[a-z]?\b/i,
]

// Zip codes - but be careful not to block years or other 5-digit numbers in context
const zipPatterns = [
  // US ZIP codes (5 digit or 5+4)
  /\b\d{5}(-\d{4})?\b/,
]

// Social Security Number patterns (should NEVER be in reviews)
const ssnPatterns = [
  /\b\d{3}[-.\s]?\d{2}[-.\s]?\d{4}\b/,
  /\bssn[:\s]*\d{3}[-.\s]?\d{2}[-.\s]?\d{4}\b/i,
  /social security[:\s]*\d{3}[-.\s]?\d{2}[-.\s]?\d{4}/i,
]

// Policy/Claim numbers (sometimes sensitive)
const policyPatterns = [
  /\b(policy|claim|case)[\s#:]*[a-z0-9\-]{6,}/i,
]

// Credit card patterns (should NEVER be in reviews)
const ccPatterns = [
  /\b\d{4}[-.\s]?\d{4}[-.\s]?\d{4}[-.\s]?\d{4}\b/,
  /\b\d{15,16}\b/,
]

// Bank account patterns
const bankPatterns = [
  /\b(account|routing)[\s#:]*\d{6,}\b/i,
  /\biban[:\s]*[a-z]{2}\d{2}[a-z0-9]{4,}/i,
]

export interface ValidationResult {
  isValid: boolean
  error: string | null
  failedCheck: 'profanity' | 'attack' | 'phone' | 'email' | 'address' | 'ssn' | 'policy' | 'financial' | null
}

export function validateReviewContent(text: string): ValidationResult {
  const lowerText = text.toLowerCase()
  
  // ===========================================
  // CHECK FOR PROFANITY
  // ===========================================
  for (const word of profanityList) {
    // Escape special regex characters in the word
    const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`\\b${escapedWord}\\b`, 'i')
    if (regex.test(lowerText)) {
      return {
        isValid: false,
        error: 'Your review contains inappropriate language. Please remove profanity and resubmit.',
        failedCheck: 'profanity'
      }
    }
  }
  
  // Also check for letter substitutions and obfuscation
  const obfuscatedText = lowerText
    .replace(/0/g, 'o')
    .replace(/1/g, 'i')
    .replace(/3/g, 'e')
    .replace(/4/g, 'a')
    .replace(/5/g, 's')
    .replace(/7/g, 't')
    .replace(/8/g, 'b')
    .replace(/@/g, 'a')
    .replace(/\$/g, 's')
    .replace(/\!/g, 'i')
    .replace(/\*/g, '')
    .replace(/\-/g, '')
    .replace(/\./g, '')
    .replace(/\s+/g, '')
  
  // Check core profanity in obfuscated version
  const coreProfanity = ['fuck', 'shit', 'cunt', 'nigger', 'faggot', 'retard']
  for (const word of coreProfanity) {
    if (obfuscatedText.includes(word)) {
      return {
        isValid: false,
        error: 'Your review contains inappropriate language. Please remove profanity and resubmit.',
        failedCheck: 'profanity'
      }
    }
  }
  
  // ===========================================
  // CHECK FOR PERSONAL ATTACKS
  // ===========================================
  for (const pattern of attackPatterns) {
    if (pattern.test(text)) {
      return {
        isValid: false,
        error: 'Your review contains language that violates our guidelines. Please focus on your claim experience rather than personal attacks.',
        failedCheck: 'attack'
      }
    }
  }
  
  // ===========================================
  // CHECK FOR SSN (most critical)
  // ===========================================
  for (const pattern of ssnPatterns) {
    if (pattern.test(text)) {
      return {
        isValid: false,
        error: 'Please remove any Social Security Numbers from your review to protect privacy.',
        failedCheck: 'ssn'
      }
    }
  }
  
  // ===========================================
  // CHECK FOR FINANCIAL INFO
  // ===========================================
  for (const pattern of ccPatterns) {
    if (pattern.test(text)) {
      return {
        isValid: false,
        error: 'Please remove any credit card or financial account numbers from your review.',
        failedCheck: 'financial'
      }
    }
  }
  
  for (const pattern of bankPatterns) {
    if (pattern.test(text)) {
      return {
        isValid: false,
        error: 'Please remove any bank account or routing numbers from your review.',
        failedCheck: 'financial'
      }
    }
  }
  
  // ===========================================
  // CHECK FOR PHONE NUMBERS
  // ===========================================
  for (const pattern of phonePatterns) {
    if (pattern.test(text)) {
      return {
        isValid: false,
        error: 'Please remove phone numbers from your review to protect privacy.',
        failedCheck: 'phone'
      }
    }
  }
  
  // ===========================================
  // CHECK FOR EMAIL ADDRESSES
  // ===========================================
  for (const pattern of emailPatterns) {
    if (pattern.test(text)) {
      return {
        isValid: false,
        error: 'Please remove email addresses from your review to protect privacy.',
        failedCheck: 'email'
      }
    }
  }
  
  // ===========================================
  // CHECK FOR PHYSICAL ADDRESSES
  // ===========================================
  for (const pattern of addressPatterns) {
    if (pattern.test(text)) {
      return {
        isValid: false,
        error: 'Please remove physical addresses from your review to protect privacy.',
        failedCheck: 'address'
      }
    }
  }
  
  // Check for zip codes (but only if they look like addresses)
  // We're more lenient here since 5-digit numbers can be legitimate (years, amounts, etc.)
  const hasAddressContext = /(live|lives|lived|address|located|location|house|home|property|street|road|city|state)/i.test(text)
  if (hasAddressContext) {
    for (const pattern of zipPatterns) {
      if (pattern.test(text)) {
        return {
          isValid: false,
          error: 'Please remove zip codes from your review to protect privacy.',
          failedCheck: 'address'
        }
      }
    }
  }
  
  // ===========================================
  // CHECK FOR POLICY/CLAIM NUMBERS
  // ===========================================
  for (const pattern of policyPatterns) {
    if (pattern.test(text)) {
      return {
        isValid: false,
        error: 'Please remove policy or claim numbers from your review to protect privacy.',
        failedCheck: 'policy'
      }
    }
  }
  
  // ===========================================
  // ALL CHECKS PASSED
  // ===========================================
  return {
    isValid: true,
    error: null,
    failedCheck: null
  }
}

// Helper function to sanitize text (optional - use if you want to auto-fix instead of reject)
export function sanitizeReviewContent(text: string): string {
  let sanitized = text
  
  // Replace profanity with asterisks
  for (const word of profanityList) {
    const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`\\b${escapedWord}\\b`, 'gi')
    sanitized = sanitized.replace(regex, '*'.repeat(word.length))
  }
  
  // Remove phone numbers
  for (const pattern of phonePatterns) {
    sanitized = sanitized.replace(pattern, '[phone removed]')
  }
  
  // Remove emails
  for (const pattern of emailPatterns) {
    sanitized = sanitized.replace(pattern, '[email removed]')
  }
  
  return sanitized
}
