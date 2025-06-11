// Banking-specific types for GHB Credit Builder
export interface CustomerProfile {
  id: string;
  customerType: "regular_employee" | "freelance" | "welfare_customer";
  nationalId: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  // Employment details
  employmentDetails: {
    type: "regular_employee" | "freelance" | "welfare_customer";
    organization?: string; // For welfare customers
    monthlyIncome: number;
    netIncome?: number; // For welfare customers (80% of gross)
    incomeDocuments: string[]; // Types of documents provided
    yearsOfWork: number;
  };
  // Financial information
  financialInfo: {
    monthlyExpenses: number;
    existingDebts: number;
    savingsAccount: boolean;
    bankStatement: boolean;
    currentDSR: number; // Debt Service Ratio
  };
  // Credit information
  creditInfo: {
    crbScore?: number; // Credit Bureau Score
    hasDefaultHistory: boolean;
    hasLoanHistory: boolean;
    paymentHistory: "excellent" | "good" | "fair" | "poor";
  };
  // Alternative data
  alternativeData: {
    utilityPayments: boolean;
    phonePayments: boolean;
    savingsHistory: boolean;
    eCommerceActivity: boolean;
    socialMediaPresence: boolean;
  };
}

export interface LoanApplication {
  id: string;
  customerId: string;
  applicationDate: Date;
  status:
    | "draft"
    | "submitted"
    | "under_review"
    | "auw_review"
    | "cpc_review"
    | "approved"
    | "rejected";
  loanDetails: {
    amount: number;
    purpose: "housing" | "business" | "education" | "emergency" | "refinance";
    termMonths: number;
    collateralValue?: number; // For secured loans
    ltv?: number; // Loan to Value ratio
  };
  evaluation: LoanEvaluation;
  documents: DocumentRequirement[];
  currentStep: ApplicationStep;
}

export interface LoanEvaluation {
  dsr: number; // Debt Service Ratio
  affordability: {
    maxLoanAmount: number;
    recommendedAmount: number;
    monthlyPaymentCapacity: number;
  };
  riskAssessment: {
    level: "low" | "medium" | "high";
    factors: string[];
    mitigatingFactors: string[];
  };
  creditScoring: {
    traditionalScore?: number;
    alternativeScore: number;
    finalScore: number;
    explanation: string[];
  };
  approvalProbability: number;
  recommendedTerms: {
    interestRate: number;
    termMonths: number;
    monthlyPayment: number;
    totalPayment: number;
  } | null;
}

export interface DocumentRequirement {
  type:
    | "national_id"
    | "income_proof"
    | "bank_statement"
    | "tax_return"
    | "utility_bill"
    | "employment_cert";
  required: boolean;
  status: "not_submitted" | "submitted" | "verified" | "rejected";
  description: string;
  alternatives?: string[]; // Alternative documents accepted
}

export interface ApplicationStep {
  current: number;
  total: number;
  steps: {
    id: number;
    name: string;
    description: string;
    status: "pending" | "in_progress" | "completed" | "skipped";
    estimatedTime?: string;
  }[];
}

export interface BankingProcessFlow {
  customerType: CustomerProfile["customerType"];
  steps: {
    id: string;
    name: string;
    description: string;
    requiredDocuments: DocumentRequirement["type"][];
    evaluationCriteria: string[];
    automatedCheck: boolean;
    timeframe: string;
  }[];
}

export interface DSRCalculation {
  monthlyIncome: number;
  monthlyExpenses: number;
  existingDebts: number;
  proposedPayment: number;
  dsr: number;
  maxAllowableDSR: number;
  customerType: CustomerProfile["customerType"];
  recommendation: "approve" | "conditional" | "reject";
  explanation: string;
}

export interface MockCRBResponse {
  score: number;
  grade: "A" | "B" | "C" | "D" | "No Record";
  defaultHistory: boolean;
  accountHistory: string[];
  riskFactors: string[];
  positiveFactors: string[];
}

export interface LoanRecommendation {
  type: "approval" | "conditional_approval" | "rejection" | "reapply_later";
  reasons: string[];
  suggestedActions: {
    action: string;
    impact: string;
    timeframe: string;
  }[];
  alternativeProducts?: {
    name: string;
    description: string;
    amount: number;
    terms: string;
  }[];
}

// Banking calculation utilities interface
export interface BankingCalculator {
  calculateDSR: (
    income: number,
    expenses: number,
    newPayment: number,
  ) => DSRCalculation;
  calculateAffordability: (
    profile: CustomerProfile,
  ) => LoanEvaluation["affordability"];
  calculateAlternativeScore: (
    data: CustomerProfile["alternativeData"],
  ) => number;
  determineDocumentRequirements: (
    customerType: CustomerProfile["customerType"],
    loanAmount: number,
  ) => DocumentRequirement[];
  evaluateLoanApplication: (
    profile: CustomerProfile,
    loanAmount: number,
  ) => LoanEvaluation;
}
