export interface EvaluationQuestion {
  id: string;
  question: string;
  expectedAnswer: string;
  category: 'product' | 'technical' | 'billing' | 'account' | 'general';
  difficulty: 'easy' | 'medium' | 'hard';
  requiresContext: boolean;
}

export interface EvaluationResult {
  questionId: string;
  question: string;
  expectedAnswer: string;
  actualAnswer: string;
  accuracy: number; // 0-1
  helpfulness: number; // 0-1
  citationQuality: number; // 0-1
  overallScore: number; // 0-1
  feedback: string;
}

export interface EvaluationSummary {
  totalQuestions: number;
  averageAccuracy: number;
  averageHelpfulness: number;
  averageCitationQuality: number;
  averageOverallScore: number;
  categoryBreakdown: Record<string, { count: number; averageScore: number }>;
  difficultyBreakdown: Record<string, { count: number; averageScore: number }>;
}

export const evaluationQuestions: EvaluationQuestion[] = [
  // Product Questions
  {
    id: 'prod-1',
    question: 'What is Aven and what does it do?',
    expectedAnswer: 'Aven is a financial technology platform that provides credit lines and payment solutions for businesses.',
    category: 'product',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'prod-2',
    question: 'How does Aven\'s credit line work?',
    expectedAnswer: 'Aven provides revolving credit lines that businesses can draw from and repay as needed.',
    category: 'product',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'prod-3',
    question: 'What are the benefits of using Aven?',
    expectedAnswer: 'Benefits include flexible credit access, quick funding, transparent pricing, and integration with business tools.',
    category: 'product',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'prod-4',
    question: 'Can I use Aven for personal expenses?',
    expectedAnswer: 'No, Aven is designed for business use only, not personal expenses.',
    category: 'product',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'prod-5',
    question: 'What types of businesses can use Aven?',
    expectedAnswer: 'Aven serves various business types including e-commerce, SaaS, and service-based businesses.',
    category: 'product',
    difficulty: 'medium',
    requiresContext: true
  },

  // Technical Questions
  {
    id: 'tech-1',
    question: 'How do I integrate Aven with my existing systems?',
    expectedAnswer: 'Aven offers API integration, webhooks, and plugins for popular platforms.',
    category: 'technical',
    difficulty: 'hard',
    requiresContext: true
  },
  {
    id: 'tech-2',
    question: 'What APIs does Aven provide?',
    expectedAnswer: 'Aven provides APIs for credit line management, payment processing, and account information.',
    category: 'technical',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'tech-3',
    question: 'How secure is my data with Aven?',
    expectedAnswer: 'Aven uses bank-level security, encryption, and compliance with financial regulations.',
    category: 'technical',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'tech-4',
    question: 'Can I export my transaction data?',
    expectedAnswer: 'Yes, you can export transaction data through the dashboard or API.',
    category: 'technical',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'tech-5',
    question: 'What happens if the API is down?',
    expectedAnswer: 'Aven has high availability with backup systems and status monitoring.',
    category: 'technical',
    difficulty: 'medium',
    requiresContext: true
  },

  // Billing Questions
  {
    id: 'bill-1',
    question: 'How much does Aven cost?',
    expectedAnswer: 'Aven charges a percentage fee on credit line usage, with transparent pricing and no hidden fees.',
    category: 'billing',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'bill-2',
    question: 'Are there any setup fees?',
    expectedAnswer: 'No setup fees, only charges on actual credit line usage.',
    category: 'billing',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'bill-3',
    question: 'When do I get charged?',
    expectedAnswer: 'You are charged based on your credit line usage, typically monthly or per transaction.',
    category: 'billing',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'bill-4',
    question: 'Can I get a refund?',
    expectedAnswer: 'Refund policies depend on the specific situation and terms of service.',
    category: 'billing',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'bill-5',
    question: 'Do you offer volume discounts?',
    expectedAnswer: 'Yes, Aven offers volume discounts for high-usage customers.',
    category: 'billing',
    difficulty: 'medium',
    requiresContext: true
  },

  // Account Questions
  {
    id: 'acc-1',
    question: 'How do I create an Aven account?',
    expectedAnswer: 'Visit Aven\'s website and complete the business verification process.',
    category: 'account',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'acc-2',
    question: 'What documents do I need to sign up?',
    expectedAnswer: 'Business verification documents, bank statements, and identification.',
    category: 'account',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'acc-3',
    question: 'How long does approval take?',
    expectedAnswer: 'Approval typically takes 1-3 business days after document submission.',
    category: 'account',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'acc-4',
    question: 'Can I have multiple users on my account?',
    expectedAnswer: 'Yes, you can add team members with different permission levels.',
    category: 'account',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'acc-5',
    question: 'How do I close my Aven account?',
    expectedAnswer: 'Contact support to close your account after settling any outstanding balances.',
    category: 'account',
    difficulty: 'medium',
    requiresContext: true
  },

  // General Questions
  {
    id: 'gen-1',
    question: 'What is Aven\'s customer support phone number?',
    expectedAnswer: 'Contact information is available on Aven\'s website or through the dashboard.',
    category: 'general',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'gen-2',
    question: 'Where is Aven headquartered?',
    expectedAnswer: 'Aven is headquartered in the United States.',
    category: 'general',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'gen-3',
    question: 'Is Aven available internationally?',
    expectedAnswer: 'Aven currently serves businesses in the United States.',
    category: 'general',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'gen-4',
    question: 'What are Aven\'s business hours?',
    expectedAnswer: 'Aven provides 24/7 support through various channels.',
    category: 'general',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'gen-5',
    question: 'Can I schedule a demo of Aven?',
    expectedAnswer: 'Yes, you can schedule a demo through the website or by contacting sales.',
    category: 'general',
    difficulty: 'easy',
    requiresContext: true
  },

  // Additional Product Questions
  {
    id: 'prod-6',
    question: 'What is the maximum credit line I can get?',
    expectedAnswer: 'Credit limits vary based on business performance and are determined during the approval process.',
    category: 'product',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'prod-7',
    question: 'How quickly can I access funds?',
    expectedAnswer: 'Funds are typically available within minutes of approval.',
    category: 'product',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'prod-8',
    question: 'Can I use Aven for payroll?',
    expectedAnswer: 'Aven is designed for business operations, not payroll processing.',
    category: 'product',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'prod-9',
    question: 'Does Aven offer insurance?',
    expectedAnswer: 'Aven focuses on credit and payment solutions, not insurance products.',
    category: 'product',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'prod-10',
    question: 'What payment methods does Aven accept?',
    expectedAnswer: 'Aven accepts various payment methods including bank transfers and cards.',
    category: 'product',
    difficulty: 'easy',
    requiresContext: true
  },

  // Additional Technical Questions
  {
    id: 'tech-6',
    question: 'How do webhooks work with Aven?',
    expectedAnswer: 'Webhooks notify your system of events like payments and account changes.',
    category: 'technical',
    difficulty: 'hard',
    requiresContext: true
  },
  {
    id: 'tech-7',
    question: 'What programming languages are supported?',
    expectedAnswer: 'Aven\'s API supports multiple programming languages including JavaScript, Python, and Ruby.',
    category: 'technical',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'tech-8',
    question: 'Is there a mobile app?',
    expectedAnswer: 'Aven provides mobile apps for iOS and Android.',
    category: 'technical',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'tech-9',
    question: 'How do I reset my password?',
    expectedAnswer: 'Use the password reset link on the login page or contact support.',
    category: 'technical',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'tech-10',
    question: 'Can I use two-factor authentication?',
    expectedAnswer: 'Yes, Aven supports two-factor authentication for enhanced security.',
    category: 'technical',
    difficulty: 'medium',
    requiresContext: true
  },

  // Additional Billing Questions
  {
    id: 'bill-6',
    question: 'What is the interest rate on Aven credit lines?',
    expectedAnswer: 'Interest rates vary based on creditworthiness and are disclosed during approval.',
    category: 'billing',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'bill-7',
    question: 'Are there late payment fees?',
    expectedAnswer: 'Late payment fees may apply as outlined in the terms of service.',
    category: 'billing',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'bill-8',
    question: 'Can I pay off my balance early?',
    expectedAnswer: 'Yes, you can pay off your balance early without prepayment penalties.',
    category: 'billing',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'bill-9',
    question: 'How do I view my billing history?',
    expectedAnswer: 'Billing history is available in your dashboard under the billing section.',
    category: 'billing',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'bill-10',
    question: 'Do you offer payment plans?',
    expectedAnswer: 'Payment terms are flexible and based on your credit line agreement.',
    category: 'billing',
    difficulty: 'medium',
    requiresContext: true
  },

  // Additional Account Questions
  {
    id: 'acc-6',
    question: 'What happens if my business information changes?',
    expectedAnswer: 'Update your business information through the dashboard or contact support.',
    category: 'account',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'acc-7',
    question: 'Can I transfer my account to another business?',
    expectedAnswer: 'Account transfers require approval and may need new verification.',
    category: 'account',
    difficulty: 'hard',
    requiresContext: true
  },
  {
    id: 'acc-8',
    question: 'How do I update my contact information?',
    expectedAnswer: 'Update contact information through your account settings in the dashboard.',
    category: 'account',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'acc-9',
    question: 'What is the minimum age to use Aven?',
    expectedAnswer: 'You must be 18 or older to use Aven services.',
    category: 'account',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'acc-10',
    question: 'Can I have multiple business accounts?',
    expectedAnswer: 'Yes, you can have multiple business accounts with separate verification.',
    category: 'account',
    difficulty: 'medium',
    requiresContext: true
  },

  // Additional General Questions
  {
    id: 'gen-6',
    question: 'Does Aven offer training or onboarding?',
    expectedAnswer: 'Yes, Aven provides onboarding support and training resources.',
    category: 'general',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'gen-7',
    question: 'What is Aven\'s privacy policy?',
    expectedAnswer: 'Aven\'s privacy policy is available on the website and outlines data protection practices.',
    category: 'general',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'gen-8',
    question: 'Can I leave a review for Aven?',
    expectedAnswer: 'Yes, you can leave reviews on various platforms or contact support with feedback.',
    category: 'general',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'gen-9',
    question: 'What is Aven\'s mission?',
    expectedAnswer: 'Aven\'s mission is to provide accessible financial solutions for businesses.',
    category: 'general',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'gen-10',
    question: 'How can I become an Aven partner?',
    expectedAnswer: 'Contact Aven\'s partnership team through the website for partnership opportunities.',
    category: 'general',
    difficulty: 'medium',
    requiresContext: true
  }
];

export function calculateAccuracy(expected: string, actual: string): number {
  const expectedWords = expected.toLowerCase().split(/\s+/);
  const actualWords = actual.toLowerCase().split(/\s+/);
  
  const commonWords = expectedWords.filter(word => actualWords.includes(word));
  return commonWords.length / expectedWords.length;
}

export function calculateHelpfulness(actual: string): number {
  // Check for helpful indicators
  const helpfulIndicators = [
    'i don\'t know',
    'i cannot',
    'i\'m not sure',
    'contact support',
    'please contact',
    'unfortunately',
    'sorry'
  ];
  
  const hasUnhelpfulResponse = helpfulIndicators.some(indicator => 
    actual.toLowerCase().includes(indicator)
  );
  
  if (hasUnhelpfulResponse) return 0.3;
  
  // Check for helpful indicators
  const positiveIndicators = [
    'yes',
    'no',
    'here\'s how',
    'you can',
    'steps to',
    'process',
    'available',
    'support'
  ];
  
  const helpfulCount = positiveIndicators.filter(indicator => 
    actual.toLowerCase().includes(indicator)
  ).length;
  
  return Math.min(0.3 + (helpfulCount * 0.1), 1.0);
}

export function calculateCitationQuality(actual: string): number {
  // Check for citation indicators
  const citationIndicators = [
    'according to',
    'as stated in',
    'per our',
    'based on',
    'documentation',
    'terms of service',
    'policy'
  ];
  
  const hasCitations = citationIndicators.some(indicator => 
    actual.toLowerCase().includes(indicator)
  );
  
  if (hasCitations) return 0.8;
  
  // Check for vague responses
  const vagueIndicators = [
    'generally',
    'typically',
    'usually',
    'may',
    'might',
    'could'
  ];
  
  const hasVagueLanguage = vagueIndicators.some(indicator => 
    actual.toLowerCase().includes(indicator)
  );
  
  return hasVagueLanguage ? 0.4 : 0.6;
}

export function evaluateAnswer(
  question: EvaluationQuestion,
  actualAnswer: string
): EvaluationResult {
  const accuracy = calculateAccuracy(question.expectedAnswer, actualAnswer);
  const helpfulness = calculateHelpfulness(actualAnswer);
  const citationQuality = calculateCitationQuality(actualAnswer);
  const overallScore = (accuracy + helpfulness + citationQuality) / 3;
  
  let feedback = '';
  if (accuracy < 0.5) feedback += 'Low accuracy - answer doesn\'t match expected response. ';
  if (helpfulness < 0.5) feedback += 'Low helpfulness - response is not actionable. ';
  if (citationQuality < 0.5) feedback += 'Low citation quality - lacks specific references. ';
  
  if (feedback === '') feedback = 'Good response across all metrics.';
  
  return {
    questionId: question.id,
    question: question.question,
    expectedAnswer: question.expectedAnswer,
    actualAnswer,
    accuracy,
    helpfulness,
    citationQuality,
    overallScore,
    feedback
  };
}

export function generateEvaluationSummary(results: EvaluationResult[]): EvaluationSummary {
  const totalQuestions = results.length;
  const averageAccuracy = results.reduce((sum, r) => sum + r.accuracy, 0) / totalQuestions;
  const averageHelpfulness = results.reduce((sum, r) => sum + r.helpfulness, 0) / totalQuestions;
  const averageCitationQuality = results.reduce((sum, r) => sum + r.citationQuality, 0) / totalQuestions;
  const averageOverallScore = results.reduce((sum, r) => sum + r.overallScore, 0) / totalQuestions;
  
  // Category breakdown
  const categoryBreakdown: Record<string, { count: number; averageScore: number }> = {};
  const categoryScores: Record<string, number[]> = {};
  
  results.forEach(result => {
    const question = evaluationQuestions.find(q => q.id === result.questionId);
    if (question) {
      if (!categoryScores[question.category]) {
        categoryScores[question.category] = [];
      }
      categoryScores[question.category].push(result.overallScore);
    }
  });
  
  Object.entries(categoryScores).forEach(([category, scores]) => {
    categoryBreakdown[category] = {
      count: scores.length,
      averageScore: scores.reduce((sum, score) => sum + score, 0) / scores.length
    };
  });
  
  // Difficulty breakdown
  const difficultyBreakdown: Record<string, { count: number; averageScore: number }> = {};
  const difficultyScores: Record<string, number[]> = {};
  
  results.forEach(result => {
    const question = evaluationQuestions.find(q => q.id === result.questionId);
    if (question) {
      if (!difficultyScores[question.difficulty]) {
        difficultyScores[question.difficulty] = [];
      }
      difficultyScores[question.difficulty].push(result.overallScore);
    }
  });
  
  Object.entries(difficultyScores).forEach(([difficulty, scores]) => {
    difficultyBreakdown[difficulty] = {
      count: scores.length,
      averageScore: scores.reduce((sum, score) => sum + score, 0) / scores.length
    };
  });
  
  return {
    totalQuestions,
    averageAccuracy,
    averageHelpfulness,
    averageCitationQuality,
    averageOverallScore,
    categoryBreakdown,
    difficultyBreakdown
  };
} 