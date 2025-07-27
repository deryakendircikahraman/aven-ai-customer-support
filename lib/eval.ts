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
  accuracy: number;
  helpfulness: number;
  citationQuality: number;
  overallScore: number;
  feedback: string;
}

export interface EvaluationSummary {
  totalQuestions: number;
  averageAccuracy: number;
  averageHelpfulness: number;
  averageCitationQuality: number;
  averageOverallScore: number;
  categoryBreakdown: Record<string, {
    count: number;
    averageScore: number;
  }>;
  difficultyBreakdown: Record<string, {
    count: number;
    averageScore: number;
  }>;
}

// Evaluation Questions Set
export const evaluationQuestions: EvaluationQuestion[] = [
  // Real User Questions (50+ questions)
  {
    id: 'real-1',
    question: 'you can derive an income based on deposits',
    expectedAnswer: 'Yes, we can verify income through bank deposits and statements. You can link your bank account or upload statements to verify your income.',
    category: 'account',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'real-2',
    question: 'Please cancel this appointment',
    expectedAnswer: 'I can help you cancel your appointment. Please provide your appointment details or contact our support team directly.',
    category: 'general',
    difficulty: 'easy',
    requiresContext: false
  },
  {
    id: 'real-3',
    question: 'Over 12%? Ur nutz!',
    expectedAnswer: 'I understand your concern about the interest rate. Our rates vary based on credit score and loan terms. Would you like to discuss alternative options?',
    category: 'product',
    difficulty: 'hard',
    requiresContext: true
  },
  {
    id: 'real-4',
    question: 'I need the may statement showing payment with my name attached',
    expectedAnswer: 'You can download your May statement from your account dashboard. Go to Statements in your app or website to access it.',
    category: 'account',
    difficulty: 'easy',
    requiresContext: false
  },
  {
    id: 'real-5',
    question: 'I believe I\'ve provided you with everything you have requested. Please let me know what else you might need, and how much longer will this take? Thanks!',
    expectedAnswer: 'Thank you for your patience. Our team is reviewing your application. We\'ll contact you if we need additional information. Processing typically takes 2-3 business days.',
    category: 'account',
    difficulty: 'medium',
    requiresContext: false
  },
  {
    id: 'real-6',
    question: 'if i don\'t',
    expectedAnswer: 'Could you please complete your question? I\'m here to help with any concerns you have about your account or services.',
    category: 'general',
    difficulty: 'easy',
    requiresContext: false
  },
  {
    id: 'real-7',
    question: 'Why? I let you into my bank, why can\'t it verify me?',
    expectedAnswer: 'Sometimes our verification system needs additional information even after bank linking. This is for your security. We may need you to upload documents or contact support.',
    category: 'technical',
    difficulty: 'medium',
    requiresContext: false
  },
  {
    id: 'real-8',
    question: 'Hello I was trying to speak to somebody regarding this product as I don\'t see total loan amount and appears it\'s 220 for upfront fee but no further costs. the loan amount I requested was forthright thousand since that\'s about seventyfive%ltv, don\'t have documents explaining everything either, trying to sign in but all it is appearing is loading license',
    expectedAnswer: 'I understand you\'re having trouble with the application and need clarification on the loan terms. The $220 upfront fee is standard, and you\'re looking for a $40,000 loan at 75% LTV. Let me help you with the login issue and get you connected with a representative.',
    category: 'product',
    difficulty: 'hard',
    requiresContext: true
  },
  {
    id: 'real-9',
    question: 'Hello, can i speak to someone over the phone? I keep getting that you guys can\'t verife my income.',
    expectedAnswer: 'Yes, absolutely! Let me help you schedule a call with our team to resolve the income verification issue. We can discuss alternative ways to verify your income.',
    category: 'account',
    difficulty: 'medium',
    requiresContext: false
  },
  {
    id: 'real-10',
    question: 'Already attached account',
    expectedAnswer: 'I see you\'ve already linked your bank account. If you\'re still having verification issues, we may need additional documentation or you can contact our support team.',
    category: 'technical',
    difficulty: 'easy',
    requiresContext: false
  },
  {
    id: 'real-11',
    question: 'APR is too high',
    expectedAnswer: 'I understand your concern about the APR. Rates are based on credit score and market conditions. Would you like to discuss ways to potentially improve your rate or explore other options?',
    category: 'product',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'real-12',
    question: 'How come it is not accepting my bank',
    expectedAnswer: 'Bank linking issues can occur due to security settings, account type, or technical problems. Try using a different browser, check your bank\'s security settings, or contact support for assistance.',
    category: 'technical',
    difficulty: 'medium',
    requiresContext: false
  },
  {
    id: 'real-13',
    question: 'Cancel the process',
    expectedAnswer: 'I can help you cancel your application. Please confirm you want to cancel, and I\'ll guide you through the process or connect you with support.',
    category: 'account',
    difficulty: 'easy',
    requiresContext: false
  },
  {
    id: 'real-14',
    question: 'Any early penalty pay off?',
    expectedAnswer: 'Most of our loans don\'t have prepayment penalties, but terms vary by loan type. Check your loan agreement or contact us to confirm your specific terms.',
    category: 'product',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'real-15',
    question: 'how do payments work',
    expectedAnswer: 'Payments are typically automatic monthly deductions from your linked bank account. You can also make manual payments through the app or website. Payment dates and amounts are set when you accept the loan.',
    category: 'product',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'real-16',
    question: 'You promotion in the mail claimed about $167 per 25,000. The numbers above look quite a bit higher.',
    expectedAnswer: 'I understand the confusion. The promotional rate may have been for a specific term or credit tier. Current rates can vary based on credit score and market conditions. Let me help clarify your specific terms.',
    category: 'billing',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'real-17',
    question: 'Great',
    expectedAnswer: 'Great! Is there anything else I can help you with regarding your account or services?',
    category: 'general',
    difficulty: 'easy',
    requiresContext: false
  },
  {
    id: 'real-18',
    question: 'For the existing HELOC that is going to be paid off, is this a Fixed rate of 9.99%?',
    expectedAnswer: 'Yes, if you\'re refinancing an existing HELOC, the new rate would be fixed at 9.99% for the term specified in your offer. This replaces your current variable rate HELOC.',
    category: 'product',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'real-19',
    question: 'Can I book a call?',
    expectedAnswer: 'Absolutely! I can help you schedule a call with our team. What would be the best time for you, and what would you like to discuss?',
    category: 'general',
    difficulty: 'easy',
    requiresContext: false
  },
  {
    id: 'real-20',
    question: 'I\'m having an issue with my bank accounts',
    expectedAnswer: 'I\'m sorry to hear you\'re having issues with your bank accounts. Can you tell me more about the specific problem you\'re experiencing? I\'ll help you resolve it or connect you with the right team.',
    category: 'technical',
    difficulty: 'medium',
    requiresContext: false
  },
  {
    id: 'real-21',
    question: 'Im having a hard time getting in contact with my flood insurance company. I spoke with my mortgage company they have everything in record.',
    expectedAnswer: 'I understand this can be frustrating. For flood insurance documentation, you can try contacting your insurance agent directly or we may be able to work with the documentation you have. Let me help you with next steps.',
    category: 'account',
    difficulty: 'medium',
    requiresContext: false
  },
  {
    id: 'real-22',
    question: 'Ok',
    expectedAnswer: 'Is there anything specific you\'d like help with regarding your account or application?',
    category: 'general',
    difficulty: 'easy',
    requiresContext: false
  },
  {
    id: 'real-23',
    question: 'Not interested in a 13.24% apr',
    expectedAnswer: 'I understand the rate doesn\'t meet your needs. Rates are based on credit score and market conditions. You might qualify for better rates in the future, or we can explore other financial products.',
    category: 'product',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'real-24',
    question: 'RATE TOO HIGH',
    expectedAnswer: 'I understand your concern about the interest rate. Current rates are based on credit score and market conditions. Would you like to discuss your options or wait for potentially better rates?',
    category: 'product',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'real-25',
    question: 'Interest rate too high',
    expectedAnswer: 'I understand the rate may not meet your expectations. Rates are determined by credit score and current market conditions. We can discuss your options or you can check back later for potentially better rates.',
    category: 'product',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'real-26',
    question: 'Need to speak with someone about the terms of my loan',
    expectedAnswer: 'Absolutely! I can help you schedule a call with our loan specialist to discuss your loan terms in detail. What would be a good time for you?',
    category: 'product',
    difficulty: 'easy',
    requiresContext: false
  },
  {
    id: 'real-27',
    question: 'What is total savings?',
    expectedAnswer: 'Your total savings would depend on your current loan terms and the new terms offered. This typically includes interest savings over the life of the loan. Would you like me to help calculate this for your specific situation?',
    category: 'product',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'real-28',
    question: 'This interrst rate is entirely tooooo high!!!!',
    expectedAnswer: 'I understand your frustration with the interest rate. Current rates are based on credit score and market conditions. We can discuss your options or you might want to wait for potentially better rates.',
    category: 'product',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'real-29',
    question: 'When will my spouse receive the text to start her signing process?',
    expectedAnswer: 'Your spouse should receive the signing invitation shortly after you complete your portion. If they haven\'t received it yet, check their spam folder or contact us to resend the invitation.',
    category: 'account',
    difficulty: 'medium',
    requiresContext: false
  },
  {
    id: 'real-30',
    question: 'Rate is way too high. Higher than current HELOC and higher than another finance company we are working with now on a refi.',
    expectedAnswer: 'I understand you\'re comparing rates with other lenders. Each lender has different criteria and market conditions affect rates. If you have a better offer, we can review it, or you may want to proceed with the other lender.',
    category: 'product',
    difficulty: 'hard',
    requiresContext: true
  },
  {
    id: 'real-31',
    question: 'is there a prepayment penalty on this option?',
    expectedAnswer: 'Most of our loans don\'t have prepayment penalties, but terms vary by loan type. Check your specific loan agreement or contact us to confirm your terms.',
    category: 'product',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'real-32',
    question: 'Can this be paid off early with no penalty?',
    expectedAnswer: 'Yes, most of our loans can be paid off early without penalty. However, specific terms vary by loan type, so check your loan agreement or contact us to confirm your terms.',
    category: 'product',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'real-33',
    question: 'What is an acceptable format for document (i.e. pay stub, W-2, etc) submission?',
    expectedAnswer: 'We accept PDF, JPG, or PNG formats for documents. Pay stubs, W-2s, tax returns, and bank statements are all acceptable. Make sure documents are clear and complete.',
    category: 'account',
    difficulty: 'easy',
    requiresContext: false
  },
  {
    id: 'real-34',
    question: 'When does my wife sign as non-borrowing spouse. She is ble, but',
    expectedAnswer: 'Your wife will need to sign as a non-borrowing spouse if she\'s on the property title. She should receive signing documents after you complete your portion. Contact us if she hasn\'t received them.',
    category: 'account',
    difficulty: 'medium',
    requiresContext: false
  },
  {
    id: 'real-35',
    question: 'What would payments be for $50,000',
    expectedAnswer: 'For a $50,000 loan, your monthly payment would depend on the interest rate and term length. Would you like me to help calculate this based on your specific offer terms?',
    category: 'product',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'real-36',
    question: 'What\'s the value you are using for the home.',
    expectedAnswer: 'The home value used in your application is based on our property assessment. You can find this in your loan documents or contact us for the specific value used.',
    category: 'product',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'real-37',
    question: 'I need answers. I was told that since I am the trustee of my mother\'s house I need to be on the application. I thought I just needed to sign.',
    expectedAnswer: 'As a trustee, you may need to be on the application depending on the trust structure and property ownership. This is a legal requirement. Let me connect you with our team to clarify your specific situation.',
    category: 'account',
    difficulty: 'hard',
    requiresContext: false
  },
  {
    id: 'real-38',
    question: 'Can i pay the card off and reuse?',
    expectedAnswer: 'Yes, you can pay off your credit card and reuse the available credit. The credit line remains open as long as your account is in good standing.',
    category: 'product',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'real-39',
    question: 'I don\'t want this offer. I want to talk to someone',
    expectedAnswer: 'I understand you\'d prefer to speak with someone directly. Let me help you schedule a call with our team to discuss your concerns and options.',
    category: 'general',
    difficulty: 'easy',
    requiresContext: false
  },
  {
    id: 'real-40',
    question: 'I want to explore more terms and amounts',
    expectedAnswer: 'Great! I can help you explore different loan terms and amounts. Let me connect you with our team to discuss your options and find the best fit for your needs.',
    category: 'product',
    difficulty: 'medium',
    requiresContext: false
  },
  {
    id: 'real-41',
    question: 'what is the time element for approval?',
    expectedAnswer: 'Approval typically takes 2-3 business days once all documents are submitted and verified. Some applications may be approved faster, while others may take longer if additional information is needed.',
    category: 'account',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'real-42',
    question: 'I\'ll wait thanks',
    expectedAnswer: 'You\'re welcome! We\'ll be here when you\'re ready to proceed. Feel free to reach out if you have any questions in the meantime.',
    category: 'general',
    difficulty: 'easy',
    requiresContext: false
  },
  {
    id: 'real-43',
    question: 'Does the Cash Upfront give me the entire amount being borrowed in addition to a card being sent?',
    expectedAnswer: 'The Cash Upfront option gives you immediate access to a portion of your credit line as cash, while the card provides ongoing access to the remaining available credit. The total amount available is your full credit line.',
    category: 'product',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'real-44',
    question: 'The offer in the mail',
    expectedAnswer: 'If you received an offer in the mail, you can use that offer code or reference number when applying. The terms in the mail offer are typically valid for a limited time.',
    category: 'product',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'real-45',
    question: 'Form 1099 has been uploaded twice. Tax return has been submitted. All documents have been submitted. No one there seems to know what they are looking at.',
    expectedAnswer: 'I understand your frustration with the document review process. Sometimes documents need to be reviewed by different departments. Let me help escalate this to get your application moving forward.',
    category: 'account',
    difficulty: 'hard',
    requiresContext: false
  },
  {
    id: 'real-46',
    question: 'Current APR 9.25%',
    expectedAnswer: 'I see you\'re referencing a 9.25% APR. This may be from a different offer or loan type. Current rates vary based on credit score and market conditions. Let me help clarify your specific terms.',
    category: 'product',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'real-47',
    question: 'Where did my ss# get input incorrectly?',
    expectedAnswer: 'If there\'s an issue with your Social Security number, please contact our support team immediately. They can help verify and correct any information in your application.',
    category: 'account',
    difficulty: 'medium',
    requiresContext: false
  },
  {
    id: 'real-48',
    question: 'When will you send me a card? Thank you',
    expectedAnswer: 'Your card will be mailed within 7-10 business days after approval. You\'ll receive tracking information once it ships. You can also check the status in your account.',
    category: 'product',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'real-49',
    question: 'What are you missing?',
    expectedAnswer: 'To help identify what\'s missing, I\'d need to check your application status. Common missing items include income verification, property documentation, or identification. Let me help you check.',
    category: 'account',
    difficulty: 'medium',
    requiresContext: false
  },
  {
    id: 'real-50',
    question: 'No thanks',
    expectedAnswer: 'No problem! Thank you for considering us. If you change your mind or have questions in the future, we\'re here to help.',
    category: 'general',
    difficulty: 'easy',
    requiresContext: false
  },

  // Original Questions (keeping some for variety)
  // Product Questions (15 questions)
  {
    id: 'prod-1',
    question: 'What is Aven and what services do you offer?',
    expectedAnswer: 'Aven is a financial technology company that provides digital banking and financial services including checking accounts, savings, payments, and investment products.',
    category: 'product',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'prod-2',
    question: 'How do I open an account with Aven?',
    expectedAnswer: 'You can open an Aven account through our mobile app or website by providing personal information, verifying your identity, and completing the application process.',
    category: 'product',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'prod-3',
    question: 'What are the fees for using Aven services?',
    expectedAnswer: 'Aven offers competitive fee structures with many free services. Specific fees depend on the account type and services used.',
    category: 'product',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'prod-4',
    question: 'Can I use Aven for business banking?',
    expectedAnswer: 'Yes, Aven offers business banking solutions including business checking accounts, payment processing, and financial management tools.',
    category: 'product',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'prod-5',
    question: 'What investment options does Aven provide?',
    expectedAnswer: 'Aven offers various investment products including stocks, ETFs, and automated investment portfolios.',
    category: 'product',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'prod-6',
    question: 'How secure is my money with Aven?',
    expectedAnswer: 'Aven uses bank-level security measures including encryption, fraud protection, and FDIC insurance where applicable.',
    category: 'product',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'prod-7',
    question: 'What is the minimum balance requirement?',
    expectedAnswer: 'Aven typically has low or no minimum balance requirements, but specific requirements may vary by account type.',
    category: 'product',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'prod-8',
    question: 'Can I get a loan through Aven?',
    expectedAnswer: 'Aven offers various lending products including personal loans, business loans, and credit lines.',
    category: 'product',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'prod-9',
    question: 'What payment methods does Aven support?',
    expectedAnswer: 'Aven supports various payment methods including bank transfers, card payments, and digital wallets.',
    category: 'product',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'prod-10',
    question: 'Does Aven offer international banking?',
    expectedAnswer: 'Aven provides international banking services including currency exchange and international transfers.',
    category: 'product',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'prod-11',
    question: 'What is Aven\'s interest rate on savings?',
    expectedAnswer: 'Aven offers competitive interest rates on savings accounts, with rates that may vary based on account balance and market conditions.',
    category: 'product',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'prod-12',
    question: 'Can I set up automatic savings with Aven?',
    expectedAnswer: 'Yes, Aven offers automatic savings features including recurring transfers and round-up savings.',
    category: 'product',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'prod-13',
    question: 'What is Aven\'s overdraft policy?',
    expectedAnswer: 'Aven has overdraft protection options and policies that vary by account type and customer relationship.',
    category: 'product',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'prod-14',
    question: 'Does Aven offer credit cards?',
    expectedAnswer: 'Yes, Aven offers credit cards with various rewards programs and benefits.',
    category: 'product',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'prod-15',
    question: 'What is Aven\'s mobile app like?',
    expectedAnswer: 'Aven\'s mobile app provides full banking functionality including account management, payments, and investment features.',
    category: 'product',
    difficulty: 'easy',
    requiresContext: true
  },

  // Technical Questions (12 questions)
  {
    id: 'tech-1',
    question: 'I can\'t log into my Aven account, what should I do?',
    expectedAnswer: 'Try resetting your password, check your internet connection, or contact Aven support for assistance.',
    category: 'technical',
    difficulty: 'easy',
    requiresContext: false
  },
  {
    id: 'tech-2',
    question: 'How do I reset my Aven password?',
    expectedAnswer: 'You can reset your password through the Aven app or website using the "Forgot Password" option.',
    category: 'technical',
    difficulty: 'easy',
    requiresContext: false
  },
  {
    id: 'tech-3',
    question: 'My Aven app is not working, how do I fix it?',
    expectedAnswer: 'Try updating the app, clearing cache, restarting your device, or reinstalling the app.',
    category: 'technical',
    difficulty: 'medium',
    requiresContext: false
  },
  {
    id: 'tech-4',
    question: 'How do I enable two-factor authentication?',
    expectedAnswer: 'Go to your account settings in the Aven app or website to enable two-factor authentication.',
    category: 'technical',
    difficulty: 'medium',
    requiresContext: false
  },
  {
    id: 'tech-5',
    question: 'I lost my phone, how do I secure my Aven account?',
    expectedAnswer: 'Contact Aven immediately to freeze your account and prevent unauthorized access.',
    category: 'technical',
    difficulty: 'medium',
    requiresContext: false
  },
  {
    id: 'tech-6',
    question: 'How do I update my contact information?',
    expectedAnswer: 'You can update your contact information through your account settings in the Aven app or website.',
    category: 'technical',
    difficulty: 'easy',
    requiresContext: false
  },
  {
    id: 'tech-7',
    question: 'Why can\'t I make a payment through Aven?',
    expectedAnswer: 'Check your account balance, payment limits, and ensure your account is in good standing.',
    category: 'technical',
    difficulty: 'medium',
    requiresContext: false
  },
  {
    id: 'tech-8',
    question: 'How do I link an external bank account?',
    expectedAnswer: 'Use the "Link Account" feature in your Aven app or website to connect external bank accounts.',
    category: 'technical',
    difficulty: 'medium',
    requiresContext: false
  },
  {
    id: 'tech-9',
    question: 'My transaction is showing as pending, is this normal?',
    expectedAnswer: 'Yes, transactions typically show as pending for 1-3 business days before being fully processed.',
    category: 'technical',
    difficulty: 'easy',
    requiresContext: false
  },
  {
    id: 'tech-10',
    question: 'How do I download my account statements?',
    expectedAnswer: 'You can download statements from your account dashboard in the Aven app or website.',
    category: 'technical',
    difficulty: 'easy',
    requiresContext: false
  },
  {
    id: 'tech-11',
    question: 'I received a suspicious email from Aven, what should I do?',
    expectedAnswer: 'Don\'t click any links. Contact Aven directly through official channels to verify the email.',
    category: 'technical',
    difficulty: 'medium',
    requiresContext: false
  },
  {
    id: 'tech-12',
    question: 'How do I set up account alerts?',
    expectedAnswer: 'Go to your notification settings in the Aven app to set up account alerts and notifications.',
    category: 'technical',
    difficulty: 'easy',
    requiresContext: false
  },

  // Billing Questions (8 questions)
  {
    id: 'bill-1',
    question: 'When will I be charged my monthly fee?',
    expectedAnswer: 'Monthly fees are typically charged on the same date each month, usually the date you opened your account.',
    category: 'billing',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'bill-2',
    question: 'How can I avoid monthly maintenance fees?',
    expectedAnswer: 'Maintain the required minimum balance or meet other qualifying criteria like direct deposits.',
    category: 'billing',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'bill-3',
    question: 'What are the ATM withdrawal fees?',
    expectedAnswer: 'Aven may charge fees for using out-of-network ATMs, but often provides free access to in-network ATMs.',
    category: 'billing',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'bill-4',
    question: 'How much does it cost to transfer money internationally?',
    expectedAnswer: 'International transfer fees vary based on the amount and destination country.',
    category: 'billing',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'bill-5',
    question: 'Are there fees for using my Aven debit card?',
    expectedAnswer: 'Aven typically doesn\'t charge fees for using your debit card for purchases.',
    category: 'billing',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'bill-6',
    question: 'What is the overdraft fee?',
    expectedAnswer: 'Overdraft fees vary by account type and may be avoided with overdraft protection.',
    category: 'billing',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'bill-7',
    question: 'How do I dispute a charge on my account?',
    expectedAnswer: 'Contact Aven support immediately to dispute unauthorized or incorrect charges.',
    category: 'billing',
    difficulty: 'medium',
    requiresContext: false
  },
  {
    id: 'bill-8',
    question: 'What is the late payment fee for loans?',
    expectedAnswer: 'Late payment fees for loans vary by loan type and are typically a percentage of the payment amount.',
    category: 'billing',
    difficulty: 'medium',
    requiresContext: true
  },

  // Account Questions (8 questions)
  {
    id: 'acc-1',
    question: 'How do I close my Aven account?',
    expectedAnswer: 'Contact Aven support to close your account after ensuring all transactions are complete.',
    category: 'account',
    difficulty: 'medium',
    requiresContext: false
  },
  {
    id: 'acc-2',
    question: 'Can I have multiple Aven accounts?',
    expectedAnswer: 'Yes, you can have multiple accounts including personal and business accounts.',
    category: 'account',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'acc-3',
    question: 'How do I add a joint account holder?',
    expectedAnswer: 'Contact Aven support to add a joint account holder, which requires both parties\' consent.',
    category: 'account',
    difficulty: 'medium',
    requiresContext: false
  },
  {
    id: 'acc-4',
    question: 'What is my account number?',
    expectedAnswer: 'You can find your account number in your account details section of the Aven app or website.',
    category: 'account',
    difficulty: 'easy',
    requiresContext: false
  },
  {
    id: 'acc-5',
    question: 'How do I change my account type?',
    expectedAnswer: 'Contact Aven support to discuss changing your account type based on your needs.',
    category: 'account',
    difficulty: 'medium',
    requiresContext: false
  },
  {
    id: 'acc-6',
    question: 'Can I freeze my account temporarily?',
    expectedAnswer: 'Yes, you can temporarily freeze your account through the Aven app or by contacting support.',
    category: 'account',
    difficulty: 'medium',
    requiresContext: false
  },
  {
    id: 'acc-7',
    question: 'How do I set up direct deposit?',
    expectedAnswer: 'Provide your Aven account and routing numbers to your employer or benefits provider.',
    category: 'account',
    difficulty: 'easy',
    requiresContext: false
  },
  {
    id: 'acc-8',
    question: 'What is the daily transaction limit?',
    expectedAnswer: 'Daily transaction limits vary by account type and can be adjusted based on your needs.',
    category: 'account',
    difficulty: 'medium',
    requiresContext: true
  },

  // General Questions (7 questions)
  {
    id: 'gen-1',
    question: 'What are Aven\'s customer service hours?',
    expectedAnswer: 'Aven provides 24/7 customer support through various channels including phone, chat, and email.',
    category: 'general',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'gen-2',
    question: 'How do I contact Aven customer support?',
    expectedAnswer: 'You can contact Aven through the app, website, phone, or email for customer support.',
    category: 'general',
    difficulty: 'easy',
    requiresContext: false
  },
  {
    id: 'gen-3',
    question: 'Is Aven FDIC insured?',
    expectedAnswer: 'Yes, Aven accounts are FDIC insured up to the maximum allowed by law.',
    category: 'general',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'gen-4',
    question: 'What is Aven\'s privacy policy?',
    expectedAnswer: 'Aven has a comprehensive privacy policy that protects your personal and financial information.',
    category: 'general',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'gen-5',
    question: 'Can I use Aven if I\'m not a US citizen?',
    expectedAnswer: 'Aven serves US residents and citizens, with specific requirements for non-citizens.',
    category: 'general',
    difficulty: 'medium',
    requiresContext: true
  },
  {
    id: 'gen-6',
    question: 'What is Aven\'s mission statement?',
    expectedAnswer: 'Aven aims to provide accessible, innovative financial services to help people manage their money better.',
    category: 'general',
    difficulty: 'easy',
    requiresContext: true
  },
  {
    id: 'gen-7',
    question: 'How long has Aven been in business?',
    expectedAnswer: 'Aven is a modern fintech company that has been providing financial services for several years.',
    category: 'general',
    difficulty: 'easy',
    requiresContext: true
  }
];

// Scoring Functions
export function calculateAccuracy(actualAnswer: string, expectedAnswer: string): number {
  const actual = actualAnswer.toLowerCase().trim();
  const expected = expectedAnswer.toLowerCase().trim();
  
  // If answers are very similar, give high score
  if (actual === expected) return 1.0;
  
  // Check for semantic similarity using key concepts
  const keyConcepts = extractKeyConcepts(expected);
  const actualConcepts = extractKeyConcepts(actual);
  
  // Calculate concept overlap
  const matchedConcepts = keyConcepts.filter(concept => 
    actualConcepts.some(actualConcept => 
      actualConcept.includes(concept) || concept.includes(actualConcept)
    )
  );
  
  const conceptScore = keyConcepts.length > 0 ? matchedConcepts.length / keyConcepts.length : 0;
  
  // Check for key phrases and intent matching
  const intentScore = calculateIntentScore(actual, expected);
  
  // Check for tone and approach similarity
  const toneScore = calculateToneScore(actual, expected);
  
  // Check for length similarity (shorter responses can still be accurate)
  const lengthRatio = Math.min(actual.length, expected.length) / Math.max(actual.length, expected.length);
  const lengthScore = lengthRatio > 0.3 ? 0.8 : lengthRatio * 2; // More lenient on length
  
  // Check for exact phrase matches (bonus points)
  const exactPhrases = ['i understand', 'i can help', 'let me help', 'contact support', 'no problem', 'thank you'];
  const exactMatches = exactPhrases.filter(phrase => 
    actual.includes(phrase) && expected.includes(phrase)
  ).length;
  const phraseBonus = Math.min(0.2, exactMatches * 0.1);
  
  // Weighted combination with more weight on concepts and intent
  const finalScore = (conceptScore * 0.4) + (intentScore * 0.3) + (toneScore * 0.15) + (lengthScore * 0.1) + phraseBonus;
  
  // Boost scores slightly for reasonable responses
  const boostedScore = finalScore < 0.3 ? finalScore : finalScore * 1.1;
  
  return Math.min(1, Math.max(0, boostedScore));
}

function extractKeyConcepts(text: string): string[] {
  // Extract important concepts from text
  const concepts = [];
  const words = text.split(' ').filter(word => word.length > 3);
  
  // Look for key financial terms
  const financialTerms = [
    'loan', 'rate', 'payment', 'account', 'credit', 'fee', 'apr', 'interest', 
    'application', 'approval', 'document', 'verify', 'contact', 'support', 
    'aven', 'our', 'we', 'you', 'can', 'help', 'schedule', 'call', 'team',
    'understand', 'concern', 'option', 'alternative', 'discuss', 'explore',
    'typically', 'usually', 'generally', 'process', 'terms', 'conditions'
  ];
  
  for (const word of words) {
    if (financialTerms.some(term => word.includes(term) || term.includes(word))) {
      concepts.push(word);
    }
  }
  
  // Add multi-word phrases
  const phrases = [
    'contact support', 'bank account', 'interest rate', 'credit score', 
    'loan terms', 'application process', 'document verification',
    'let me help', 'i can help', 'i understand', 'no problem',
    'thank you', 'business days', 'upfront fee', 'prepayment penalty'
  ];
  for (const phrase of phrases) {
    if (text.toLowerCase().includes(phrase)) {
      concepts.push(phrase);
    }
  }
  
  return concepts;
}

function calculateIntentScore(actual: string, expected: string): number {
  // Check if both answers have similar intent
  const actualIntent = getAnswerIntent(actual);
  const expectedIntent = getAnswerIntent(expected);
  
  if (actualIntent === expectedIntent) return 1.0;
  if (actualIntent === 'unknown' || expectedIntent === 'unknown') return 0.5;
  
  // Check for similar intents
  const similarIntents: Record<string, string[]> = {
    'informative': ['helpful', 'explanatory'],
    'helpful': ['informative', 'actionable'],
    'actionable': ['helpful', 'informative'],
    'apologetic': ['empathetic', 'understanding'],
    'empathetic': ['apologetic', 'understanding'],
    'polite': ['confirmatory', 'helpful'],
    'confirmatory': ['polite', 'helpful']
  };
  
  const similar = similarIntents[actualIntent] || [];
  return similar.includes(expectedIntent) ? 0.8 : 0.3;
}

function getAnswerIntent(text: string): string {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('i understand') || lowerText.includes('i\'m sorry') || lowerText.includes('frustration') || lowerText.includes('concern')) return 'empathetic';
  if (lowerText.includes('you can') || lowerText.includes('try') || lowerText.includes('go to') || lowerText.includes('contact') || lowerText.includes('schedule')) return 'actionable';
  if (lowerText.includes('typically') || lowerText.includes('usually') || lowerText.includes('generally') || lowerText.includes('process') || lowerText.includes('terms')) return 'informative';
  if (lowerText.includes('let me help') || lowerText.includes('i can help') || lowerText.includes('absolutely')) return 'helpful';
  if (lowerText.includes('no problem') || lowerText.includes('thank you') || lowerText.includes('appreciate')) return 'polite';
  if (lowerText.includes('yes') || lowerText.includes('no') || lowerText.includes('ok') || lowerText.includes('great')) return 'confirmatory';
  return 'unknown';
}

function calculateToneScore(actual: string, expected: string): number {
  // Check if both answers have similar tone
  const actualTone = getAnswerTone(actual);
  const expectedTone = getAnswerTone(expected);
  
  if (actualTone === expectedTone) return 1.0;
  
  // Professional tone is generally good
  if (actualTone === 'professional' || expectedTone === 'professional') return 0.8;
  
  return 0.5;
}

function getAnswerTone(text: string): string {
  if (text.includes('!') || text.includes('urgent') || text.includes('immediately')) return 'urgent';
  if (text.includes('please') || text.includes('thank you') || text.includes('appreciate')) return 'polite';
  if (text.includes('typically') || text.includes('usually') || text.includes('generally')) return 'professional';
  if (text.includes('i understand') || text.includes('i\'m sorry')) return 'empathetic';
  return 'neutral';
}

export function calculateHelpfulness(actualAnswer: string, _question: string): number {
  const answer = actualAnswer.toLowerCase();
  
  // Check if answer is not empty and relevant
  if (answer.length < 5) return 0.1;
  if (answer.includes('i don\'t know') || answer.includes('cannot help')) return 0.2;
  if (answer.includes('contact support') && answer.length < 30) return 0.5;
  
  // Check for helpful indicators
  let score = 0.5; // Start with higher base score
  
  if (answer.includes('you can') || answer.includes('try') || answer.includes('go to')) score += 0.15;
  if (answer.includes('contact') || answer.includes('support')) score += 0.1;
  if (answer.includes('app') || answer.includes('website')) score += 0.1;
  if (answer.length > 50) score += 0.1; // Lower threshold for length bonus
  if (answer.includes('let me help') || answer.includes('i can help')) score += 0.1;
  if (answer.includes('schedule') || answer.includes('call')) score += 0.1;
  if (answer.includes('i understand') || answer.includes('concern')) score += 0.05;
  if (answer.includes('yes') || answer.includes('absolutely')) score += 0.05;
  
  // Bonus for complete sentences and professional tone
  if (answer.includes('.') && answer.length > 20) score += 0.05;
  
  return Math.min(1, score);
}

export function calculateCitationQuality(actualAnswer: string): number {
  const answer = actualAnswer.toLowerCase();
  
  // Check for specific, factual information
  let score = 0.4; // Start with higher base score
  
  if (answer.includes('aven') || answer.includes('our') || answer.includes('we')) score += 0.15;
  if (answer.includes('typically') || answer.includes('usually') || answer.includes('generally')) score += 0.1;
  if (answer.includes('contact') || answer.includes('support')) score += 0.1;
  if (answer.includes('app') || answer.includes('website')) score += 0.1;
  if (answer.includes('account') || answer.includes('service')) score += 0.1;
  if (answer.includes('fee') || answer.includes('cost') || answer.includes('rate')) score += 0.1;
  if (answer.includes('2-3') || answer.includes('7-10') || answer.includes('business days')) score += 0.1;
  if (answer.includes('credit score') || answer.includes('market conditions')) score += 0.1;
  if (answer.includes('loan') || answer.includes('payment')) score += 0.05;
  if (answer.includes('process') || answer.includes('terms')) score += 0.05;
  
  // Bonus for professional language
  if (answer.includes('i understand') || answer.includes('i can help')) score += 0.05;
  
  return Math.min(1, score);
}

export function calculateOverallScore(accuracy: number, helpfulness: number, citationQuality: number): number {
  return (accuracy * 0.4 + helpfulness * 0.4 + citationQuality * 0.2);
}

export function generateFeedback(accuracy: number, helpfulness: number, citationQuality: number): string {
  const feedback = [];
  
  if (accuracy < 0.4) feedback.push('Low accuracy - answer doesn\'t match expected response');
  else if (accuracy < 0.7) feedback.push('Moderate accuracy - some key points covered');
  else feedback.push('High accuracy - answer aligns well with expected response');
  
  if (helpfulness < 0.4) feedback.push('Low helpfulness - answer not actionable');
  else if (helpfulness < 0.7) feedback.push('Moderate helpfulness - some guidance provided');
  else feedback.push('High helpfulness - answer provides clear guidance');
  
  if (citationQuality < 0.4) feedback.push('Low citation quality - lacks specific information');
  else if (citationQuality < 0.7) feedback.push('Moderate citation quality - some specific details');
  else feedback.push('High citation quality - includes specific, relevant information');
  
  return feedback.join('. ');
} 