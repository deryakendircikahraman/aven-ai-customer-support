export interface GuardrailResult {
  isBlocked: boolean;
  category: 'personal_data' | 'legal_advice' | 'financial_advice' | 'toxicity' | 'misuse' | 'none';
  confidence: number; // 0-1
  reason: string;
  suggestedResponse: string;
}

export interface PersonalDataPattern {
  pattern: RegExp;
  type: string;
  confidence: number;
}

export interface LegalAdvicePattern {
  keywords: string[];
  context: string[];
  confidence: number;
}

export interface FinancialAdvicePattern {
  keywords: string[];
  context: string[];
  confidence: number;
}

export interface ToxicityPattern {
  keywords: string[];
  categories: string[];
  confidence: number;
}

// Personal data detection patterns
const personalDataPatterns: PersonalDataPattern[] = [
  {
    pattern: /\b\d{3}-\d{2}-\d{4}\b/g, // SSN
    type: 'social_security_number',
    confidence: 0.95
  },
  {
    pattern: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, // Credit card
    type: 'credit_card_number',
    confidence: 0.9
  },
  {
    pattern: /\b\d{3}[\s-]?\d{2}[\s-]?\d{4}\b/g, // SSN without dashes
    type: 'social_security_number',
    confidence: 0.9
  },
  {
    pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, // Email
    type: 'email_address',
    confidence: 0.8
  },
  {
    pattern: /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g, // IP address
    type: 'ip_address',
    confidence: 0.7
  },
  {
    pattern: /\b\d{3}[\s-]?\d{3}[\s-]?\d{4}\b/g, // Phone number
    type: 'phone_number',
    confidence: 0.8
  },
  {
    pattern: /\b\d{5}[\s-]?\d{4}\b/g, // ZIP+4
    type: 'zip_code',
    confidence: 0.6
  },
  {
    pattern: /\b\d{5}\b/g, // Basic ZIP
    type: 'zip_code',
    confidence: 0.4
  }
];

// Legal advice detection patterns
const legalAdvicePatterns: LegalAdvicePattern[] = [
  {
    keywords: ['sue', 'lawsuit', 'legal action', 'attorney', 'lawyer', 'court', 'judge', 'litigation'],
    context: ['should i', 'can i', 'how to', 'what if', 'advice', 'help'],
    confidence: 0.8
  },
  {
    keywords: ['contract', 'agreement', 'terms', 'liability', 'damages', 'breach'],
    context: ['enforce', 'break', 'violate', 'legal', 'rights'],
    confidence: 0.7
  },
  {
    keywords: ['compliance', 'regulation', 'law', 'statute', 'ordinance'],
    context: ['required', 'mandatory', 'obligation', 'duty'],
    confidence: 0.6
  }
];

// Financial advice detection patterns
const financialAdvicePatterns: FinancialAdvicePattern[] = [
  {
    keywords: ['invest', 'investment', 'stock', 'bond', 'portfolio', 'retirement', '401k', 'ira'],
    context: ['should i', 'best', 'recommend', 'advice', 'strategy'],
    confidence: 0.8
  },
  {
    keywords: ['tax', 'deduction', 'credit', 'refund', 'filing'],
    context: ['how to', 'should i', 'can i claim', 'deduct'],
    confidence: 0.7
  },
  {
    keywords: ['loan', 'mortgage', 'refinance', 'interest rate', 'payment'],
    context: ['should i', 'best', 'recommend', 'advice'],
    confidence: 0.6
  },
  {
    keywords: ['insurance', 'policy', 'coverage', 'premium'],
    context: ['should i', 'need', 'recommend', 'best'],
    confidence: 0.6
  }
];

// Toxicity detection patterns
const toxicityPatterns: ToxicityPattern[] = [
  {
    keywords: ['hate', 'kill', 'die', 'stupid', 'idiot', 'moron', 'fuck', 'shit', 'bitch'],
    categories: ['hate_speech', 'profanity'],
    confidence: 0.8
  },
  {
    keywords: ['scam', 'fraud', 'fake', 'liar', 'cheat', 'steal'],
    categories: ['accusations', 'defamation'],
    confidence: 0.7
  },
  {
    keywords: ['useless', 'worthless', 'terrible', 'awful', 'horrible'],
    categories: ['insults', 'criticism'],
    confidence: 0.6
  }
];

// Misuse detection patterns
const misusePatterns = {
  keywords: ['hack', 'exploit', 'bypass', 'circumvent', 'cheat', 'trick'],
  context: ['system', 'security', 'payment', 'account', 'verification'],
  confidence: 0.8
};

export function detectPersonalData(text: string): GuardrailResult | null {
  
  for (const pattern of personalDataPatterns) {
    const matches = text.match(pattern.pattern);
    if (matches && matches.length > 0) {
      return {
        isBlocked: true,
        category: 'personal_data',
        confidence: pattern.confidence,
        reason: `Detected ${pattern.type}: ${matches[0]}`,
        suggestedResponse: "I cannot process personal information like this. Please remove any personal data and try again. For account-specific questions, please contact our support team directly."
      };
    }
  }
  
  return null;
}

export function detectLegalAdvice(text: string): GuardrailResult | null {
  const lowerText = text.toLowerCase();
  
  for (const pattern of legalAdvicePatterns) {
    const hasKeywords = pattern.keywords.some(keyword => lowerText.includes(keyword));
    const hasContext = pattern.context.some(context => lowerText.includes(context));
    
    if (hasKeywords && hasContext) {
      return {
        isBlocked: true,
        category: 'legal_advice',
        confidence: pattern.confidence,
        reason: `Potential legal advice request detected`,
        suggestedResponse: "I cannot provide legal advice. For legal matters, please consult with a qualified attorney. I can help with general information about our services and policies."
      };
    }
  }
  
  return null;
}

export function detectFinancialAdvice(text: string): GuardrailResult | null {
  const lowerText = text.toLowerCase();
  
  for (const pattern of financialAdvicePatterns) {
    const hasKeywords = pattern.keywords.some(keyword => lowerText.includes(keyword));
    const hasContext = pattern.context.some(context => lowerText.includes(context));
    
    if (hasKeywords && hasContext) {
      return {
        isBlocked: true,
        category: 'financial_advice',
        confidence: pattern.confidence,
        reason: `Potential financial advice request detected`,
        suggestedResponse: "I cannot provide personalized financial advice. For investment, tax, or financial planning advice, please consult with a qualified financial advisor or tax professional."
      };
    }
  }
  
  return null;
}

export function detectToxicity(text: string): GuardrailResult | null {
  const lowerText = text.toLowerCase();
  
  for (const pattern of toxicityPatterns) {
    const hasKeywords = pattern.keywords.some(keyword => lowerText.includes(keyword));
    
    if (hasKeywords) {
      return {
        isBlocked: true,
        category: 'toxicity',
        confidence: pattern.confidence,
        reason: `Toxic language detected: ${pattern.categories.join(', ')}`,
        suggestedResponse: "I'm here to help with Aven-related questions in a respectful manner. Please rephrase your question without inappropriate language."
      };
    }
  }
  
  return null;
}

export function detectMisuse(text: string): GuardrailResult | null {
  const lowerText = text.toLowerCase();
  
  const hasKeywords = misusePatterns.keywords.some(keyword => lowerText.includes(keyword));
  const hasContext = misusePatterns.context.some(context => lowerText.includes(context));
  
  if (hasKeywords && hasContext) {
    return {
      isBlocked: true,
      category: 'misuse',
      confidence: misusePatterns.confidence,
      reason: `Potential system misuse detected`,
      suggestedResponse: "I cannot assist with attempts to circumvent our systems or security measures. Please contact support if you're experiencing legitimate technical issues."
    };
  }
  
  return null;
}

export function applyGuardrails(text: string): GuardrailResult {
  // Check for personal data first (highest priority)
  const personalDataResult = detectPersonalData(text);
  if (personalDataResult) return personalDataResult;
  
  // Check for legal advice
  const legalAdviceResult = detectLegalAdvice(text);
  if (legalAdviceResult) return legalAdviceResult;
  
  // Check for financial advice
  const financialAdviceResult = detectFinancialAdvice(text);
  if (financialAdviceResult) return financialAdviceResult;
  
  // Check for toxicity
  const toxicityResult = detectToxicity(text);
  if (toxicityResult) return toxicityResult;
  
  // Check for misuse
  const misuseResult = detectMisuse(text);
  if (misuseResult) return misuseResult;
  
  // No issues detected
  return {
    isBlocked: false,
    category: 'none',
    confidence: 1.0,
    reason: 'No guardrail violations detected',
    suggestedResponse: ''
  };
}

export function sanitizeText(text: string): string {
  // Remove or mask personal data patterns
  let sanitized = text;
  
  // Mask SSNs
  sanitized = sanitized.replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[SSN]');
  sanitized = sanitized.replace(/\b\d{3}[\s-]?\d{2}[\s-]?\d{4}\b/g, '[SSN]');
  
  // Mask credit card numbers
  sanitized = sanitized.replace(/\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, '[CARD]');
  
  // Mask phone numbers
  sanitized = sanitized.replace(/\b\d{3}[\s-]?\d{3}[\s-]?\d{4}\b/g, '[PHONE]');
  
  // Mask email addresses
  sanitized = sanitized.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL]');
  
  return sanitized;
}

export function getGuardrailStats(): {
  totalPatterns: number;
  personalDataPatterns: number;
  legalAdvicePatterns: number;
  financialAdvicePatterns: number;
  toxicityPatterns: number;
} {
  return {
    totalPatterns: personalDataPatterns.length + legalAdvicePatterns.length + financialAdvicePatterns.length + toxicityPatterns.length,
    personalDataPatterns: personalDataPatterns.length,
    legalAdvicePatterns: legalAdvicePatterns.length,
    financialAdvicePatterns: financialAdvicePatterns.length,
    toxicityPatterns: toxicityPatterns.length
  };
} 