import {
  CustomerProfile,
  LoanEvaluation,
  DSRCalculation,
  DocumentRequirement,
  MockCRBResponse,
  LoanRecommendation,
  BankingProcessFlow,
} from "./bankingTypes";

// DSR thresholds by customer type (following GHB practices)
const DSR_THRESHOLDS = {
  regular_employee: 0.4, // 40% - Traditional 1:3 ratio
  freelance: 0.35, // 35% - More conservative for irregular income
  welfare_customer: 0.4, // 40% - Based on 80% of net income
} as const;

// Banking process flows for different customer types
export const BANKING_PROCESS_FLOWS: Record<
  CustomerProfile["customerType"],
  BankingProcessFlow
> = {
  regular_employee: {
    customerType: "regular_employee",
    steps: [
      {
        id: "initial_assessment",
        name: "ประเมินเบื้องต้น",
        description: "ตรวจสอบคุณสมบัติเบื้องต้นและคำนวณ DSR",
        requiredDocuments: ["national_id", "income_proof"],
        evaluationCriteria: ["รายได้สุทธิ", "ภาระหนี้เดิม", "DSR ไม่เกิน 40%"],
        automatedCheck: true,
        timeframe: "5 นาที",
      },
      {
        id: "document_verification",
        name: "ตรวจสอบเอกสาร",
        description: "ยืนยันเอกสารและข้อมูลที่ส่งมา",
        requiredDocuments: ["bank_statement", "employment_cert"],
        evaluationCriteria: ["ความถูกต้องของเอกสาร", "ความสอดคล้องของข้อมูล"],
        automatedCheck: false,
        timeframe: "1-2 วันทำการ",
      },
      {
        id: "credit_check",
        name: "ตรวจสอบเครดิต",
        description: "ตรวจสอบประวัติเครดิตจาก CRB",
        requiredDocuments: [],
        evaluationCriteria: [
          "คะแนนเครดิต",
          "ประวัติการผิดนัดชำระ",
          "จำนวนบัญชีเครดิต",
        ],
        automatedCheck: true,
        timeframe: "1 วันทำการ",
      },
      {
        id: "auw_review",
        name: "การพิจารณาโดย AUW",
        description: "ระบบประเมินอัตโนมัติ (Automated Underwriting)",
        requiredDocuments: [],
        evaluationCriteria: ["คะแนนรวม", "ความเสี่ยง", "นโยบายสินเชื่อ"],
        automatedCheck: true,
        timeframe: "1 วันทำการ",
      },
      {
        id: "final_approval",
        name: "อนุมัติขั้นสุดท้าย",
        description: "ผู้มีอำนาจอนุมัติพิจารณาขั้นสุดท้าย",
        requiredDocuments: [],
        evaluationCriteria: ["ผลการประเมินรวม", "วงเงินและเงื่อนไข"],
        automatedCheck: false,
        timeframe: "1-2 วันทำการ",
      },
    ],
  },
  freelance: {
    customerType: "freelance",
    steps: [
      {
        id: "income_assessment",
        name: "ประเมินรายได้ย้อนหลัง",
        description: "วิเคราะห์รายได้ช่วง 6-12 เดือนที่ผ่านมา",
        requiredDocuments: ["national_id", "bank_statement", "tax_return"],
        evaluationCriteria: [
          "รายได้เฉลี่ย",
          "ความสม่ำเสมอของรายได้",
          "แนวโน้มรายได้",
        ],
        automatedCheck: true,
        timeframe: "10 นาที",
      },
      {
        id: "alternative_data_review",
        name: "ตรวจสอบข้อมูลทางเลือก",
        description: "ประเมินพฤติกรรมการเงินจาก���้อมูลอื่น",
        requiredDocuments: ["utility_bill"],
        evaluationCriteria: [
          "การชำระบิล",
          "ประวัติการออม",
          "กิจกรรมทางการเงิน",
        ],
        automatedCheck: true,
        timeframe: "5 นาที",
      },
      {
        id: "enhanced_verification",
        name: "ตรวจสอบเพิ่มเติม",
        description: "ยืนยันข้อมูลรายได้และความสามารถในการชำระ",
        requiredDocuments: [],
        evaluationCriteria: ["การยืนยันรายได้", "ความมั่นคงของอาชีพ"],
        automatedCheck: false,
        timeframe: "2-3 วันทำการ",
      },
      {
        id: "risk_assessment",
        name: "ประเมินความเสี่ยง",
        description: "วิเคราะห์ความเสี่ยงสำหรับอาชีพอิสระ",
        requiredDocuments: [],
        evaluationCriteria: ["ความผันผวนของรายได้", "ปัจจัยเสี่ยงภายนอก"],
        automatedCheck: true,
        timeframe: "1 วันทำการ",
      },
      {
        id: "manual_review",
        name: "พิจารณาด้วยตนเอง",
        description: "เจ้าหน้าที่พิจารณากรณีพิเศษ",
        requiredDocuments: [],
        evaluationCriteria: ["บริบทโดยรวม", "ศักยภาพการชำระ"],
        automatedCheck: false,
        timeframe: "2-3 วันทำการ",
      },
    ],
  },
  welfare_customer: {
    customerType: "welfare_customer",
    steps: [
      {
        id: "welfare_verification",
        name: "ยืนยันสถานะสวัสดิการ",
        description: "ตรวจสอบการเป็นลูกค้าสวัสดิการของธนาคาร",
        requiredDocuments: ["national_id", "employment_cert"],
        evaluationCriteria: ["สถานะลูกค้าสวัสดิการ", "หน่วยงานสังกัด"],
        automatedCheck: true,
        timeframe: "5 นาที",
      },
      {
        id: "income_calculation",
        name: "คำนวณรายได้สุทธิ",
        description: "ใช้รายได้สุทธิ 80% ของเงินเดือน",
        requiredDocuments: ["income_proof"],
        evaluationCriteria: ["���งินเดือนขั้นต้น", "รายได้สุทธิ 80%"],
        automatedCheck: true,
        timeframe: "2 นาที",
      },
      {
        id: "simplified_assessment",
        name: "การประเมินแบบง่าย",
        description: "ใช้เกณฑ์ประเมินพิเศษสำหรับลูกค้าสวัสดิการ",
        requiredDocuments: [],
        evaluationCriteria: ["DSR บนพื้นฐาน 80%", "ความมั่นคงของงาน"],
        automatedCheck: true,
        timeframe: "5 นาที",
      },
      {
        id: "fast_track_approval",
        name: "อนุมัติด่วน",
        description: "กระบวนการอนุมัติเร่งด่วนสำหรับลูกค้าสวัสดิการ",
        requiredDocuments: [],
        evaluationCriteria: ["เกณฑ์พื้นฐาน", "นโยบายสวัสดิการ"],
        automatedCheck: true,
        timeframe: "1 วันทำการ",
      },
    ],
  },
};

// Calculate DSR based on customer type
export function calculateDSR(
  customerType: CustomerProfile["customerType"],
  monthlyIncome: number,
  monthlyExpenses: number,
  existingDebts: number,
  proposedPayment: number,
): DSRCalculation {
  let effectiveIncome = monthlyIncome;

  // For welfare customers, use 80% of income
  if (customerType === "welfare_customer") {
    effectiveIncome = monthlyIncome * 0.8;
  }

  const totalDebtPayments = existingDebts + proposedPayment;
  const dsr = totalDebtPayments / effectiveIncome;
  const maxAllowableDSR = DSR_THRESHOLDS[customerType];

  let recommendation: "approve" | "conditional" | "reject";
  let explanation: string;

  if (dsr <= maxAllowableDSR * 0.8) {
    recommendation = "approve";
    explanation = `DSR ${(dsr * 100).toFixed(1)}% อยู่ในเกณฑ์ดี ต่ำกว่าขีดจำกัด ${(maxAllowableDSR * 100).toFixed(0)}%`;
  } else if (dsr <= maxAllowableDSR) {
    recommendation = "conditional";
    explanation = `DSR ${(dsr * 100).toFixed(1)}% ผ่านเกณฑ์ แต่ใกล้ขีดจำกัด อาจต้องพิจารณาเงื่อนไขเพิ่มเติม`;
  } else {
    recommendation = "reject";
    explanation = `DSR ${(dsr * 100).toFixed(1)}% เกินขีดจำกัด ${(maxAllowableDSR * 100).toFixed(0)}% สำหรับ${getCustomerTypeLabel(customerType)}`;
  }

  return {
    monthlyIncome: effectiveIncome,
    monthlyExpenses,
    existingDebts,
    proposedPayment,
    dsr,
    maxAllowableDSR,
    customerType,
    recommendation,
    explanation,
  };
}

// Calculate affordability based on customer profile
export function calculateAffordability(
  profile: CustomerProfile,
): LoanEvaluation["affordability"] {
  const { employmentDetails, financialInfo } = profile;
  let effectiveIncome = employmentDetails.monthlyIncome;

  if (profile.customerType === "welfare_customer") {
    effectiveIncome =
      employmentDetails.netIncome || employmentDetails.monthlyIncome * 0.8;
  }

  const maxDSR = DSR_THRESHOLDS[profile.customerType];
  const availableForDebt = effectiveIncome * maxDSR;
  const currentDebtPayments = financialInfo.existingDebts;
  const maxMonthlyPayment = availableForDebt - currentDebtPayments;

  // Calculate max loan amount based on standard interest rates and terms
  const assumedInterestRate = 0.08; // 8% annual
  const assumedTermMonths = 60; // 5 years
  const monthlyRate = assumedInterestRate / 12;

  let maxLoanAmount = 0;
  if (maxMonthlyPayment > 0) {
    maxLoanAmount =
      maxMonthlyPayment *
      ((1 - Math.pow(1 + monthlyRate, -assumedTermMonths)) / monthlyRate);
  }

  const recommendedAmount = maxLoanAmount * 0.8; // Conservative approach

  return {
    maxLoanAmount: Math.floor(maxLoanAmount),
    recommendedAmount: Math.floor(recommendedAmount),
    monthlyPaymentCapacity: Math.floor(maxMonthlyPayment),
  };
}

// Calculate alternative credit score
export function calculateAlternativeScore(
  data: CustomerProfile["alternativeData"],
): number {
  let score = 0;

  if (data.utilityPayments) score += 15;
  if (data.phonePayments) score += 12;
  if (data.savingsHistory) score += 20;
  if (data.eCommerceActivity) score += 8;
  if (data.socialMediaPresence) score += 5;

  return Math.min(score, 60); // Max 60 points from alternative data
}

// Mock Credit Bureau check
export function mockCRBCheck(nationalId: string): MockCRBResponse {
  // Simulate different credit profiles based on ID patterns
  const lastDigit = parseInt(nationalId.slice(-1));

  if (lastDigit <= 2) {
    return {
      score: 750,
      grade: "A",
      defaultHistory: false,
      accountHistory: ["บัตรเครดิต 2 ปี", "สินเชื่อรถยนต์ 1 ปี"],
      riskFactors: [],
      positiveFactors: ["ไม่เคยผิดนัดชำระ", "ใช้เครดิตอย่างระมัดระวัง"],
    };
  } else if (lastDigit <= 5) {
    return {
      score: 650,
      grade: "B",
      defaultHistory: false,
      accountHistory: ["บัตรเครดิต 1 ปี"],
      riskFactors: ["ใช้เครดิตใกล้วงเงิน"],
      positiveFactors: ["ชำระตรงเวลา"],
    };
  } else if (lastDigit <= 7) {
    return {
      score: 550,
      grade: "C",
      defaultHistory: true,
      accountHistory: ["บัตรเครดิต 6 เดือน"],
      riskFactors: ["เคยผิดนัดชำระ 1 ครั้ง", "รายได้ไม่สม่ำเสมอ"],
      positiveFactors: ["ปรับปรุงพฤติกรรมการชำระ"],
    };
  } else {
    return {
      score: 0,
      grade: "No Record",
      defaultHistory: false,
      accountHistory: [],
      riskFactors: ["ไม่มีประวัติเครดิต"],
      positiveFactors: ["ลูกค้าใหม่", "โอกาสสร้างเครดิต"],
    };
  }
}

// Determine required documents
export function determineDocumentRequirements(
  customerType: CustomerProfile["customerType"],
  loanAmount: number,
): DocumentRequirement[] {
  const baseDocuments: DocumentRequirement[] = [
    {
      type: "national_id",
      required: true,
      status: "not_submitted",
      description: "สำเนาบัตรประชาชน",
      alternatives: [],
    },
  ];

  if (customerType === "regular_employee") {
    baseDocuments.push(
      {
        type: "income_proof",
        required: true,
        status: "not_submitted",
        description: "สลิปเงินเดือน 3 เดือนล่าสุด",
        alternatives: ["หนังสือรับรองเงินเดือน"],
      },
      {
        type: "bank_statement",
        required: loanAmount > 200000,
        status: "not_submitted",
        description: "Statement บัญชีเงินฝาก 6 เดือน",
        alternatives: [],
      },
    );
  } else if (customerType === "freelance") {
    baseDocuments.push(
      {
        type: "tax_return",
        required: true,
        status: "not_submitted",
        description: "ภ.ง.ด. 30 หรือ ภ.พ. 30",
        alternatives: ["หนังสือรับรองรายได้จากผู้ว่าจ้าง"],
      },
      {
        type: "bank_statement",
        required: true,
        status: "not_submitted",
        description: "Statement บัญชีเงินฝาก 12 เดือน",
        alternatives: [],
      },
      {
        type: "utility_bill",
        required: true,
        status: "not_submitted",
        description: "ใบเสร็จค่าสา��ารณูปโภค 3 เดือน",
        alternatives: ["ใบเสร็จค่าโทรศัพท์"],
      },
    );
  } else if (customerType === "welfare_customer") {
    baseDocuments.push(
      {
        type: "employment_cert",
        required: true,
        status: "not_submitted",
        description: "หนังสือรับรองการทำงาน",
        alternatives: [],
      },
      {
        type: "income_proof",
        required: true,
        status: "not_submitted",
        description: "สลิปเงินเดือน 1 เดือนล่าสุด",
        alternatives: [],
      },
    );
  }

  return baseDocuments;
}

// Main loan evaluation function
export function evaluateLoanApplication(
  profile: CustomerProfile,
  loanAmount: number,
): LoanEvaluation {
  const affordability = calculateAffordability(profile);
  const alternativeScore = calculateAlternativeScore(profile.alternativeData);
  const crbResult = mockCRBCheck(profile.nationalId);

  // Calculate proposed monthly payment (simplified)
  const interestRate = 0.08;
  const termMonths = 60;
  const monthlyRate = interestRate / 12;
  const monthlyPayment =
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) /
    (Math.pow(1 + monthlyRate, termMonths) - 1);

  const dsrResult = calculateDSR(
    profile.customerType,
    profile.employmentDetails.monthlyIncome,
    profile.financialInfo.monthlyExpenses,
    profile.financialInfo.existingDebts,
    monthlyPayment,
  );

  // Calculate final credit score
  let traditionalScore = crbResult.score;
  let finalScore = traditionalScore;

  if (traditionalScore === 0) {
    // No traditional credit history, rely more on alternative data
    finalScore = 400 + alternativeScore; // Base score + alternative data
  } else {
    finalScore = Math.min(traditionalScore + alternativeScore * 0.3, 850);
  }

  // Determine approval probability
  let approvalProbability = 0;
  const riskFactors: string[] = [];
  const mitigatingFactors: string[] = [];

  // DSR factor (40% weight)
  if (dsrResult.recommendation === "approve") {
    approvalProbability += 40;
    mitigatingFactors.push("อัตราส่วนหนี้ต่อรายได้อยู่ในเกณฑ์ดี");
  } else if (dsrResult.recommendation === "conditional") {
    approvalProbability += 25;
    riskFactors.push("อัตราส่วนหนี้ต่อรายได้ค่อนข้างสูง");
  } else {
    riskFactors.push("อัตราส่วนหนี้ต่อรายได้เกินเกณฑ์");
  }

  // Credit score factor (35% weight)
  if (finalScore >= 700) {
    approvalProbability += 35;
    mitigatingFactors.push("คะแนนเครดิตดี");
  } else if (finalScore >= 600) {
    approvalProbability += 25;
  } else if (finalScore >= 500) {
    approvalProbability += 15;
    riskFactors.push("คะแนนเครดิตต่ำ");
  } else {
    approvalProbability += 5;
    riskFactors.push("คะแนนเครดิตต่ำมาก");
  }

  // Employment stability factor (25% weight)
  if (profile.employmentDetails.yearsOfWork >= 2) {
    approvalProbability += 25;
    mitigatingFactors.push("มีความมั่นคงในการทำงาน");
  } else if (profile.employmentDetails.yearsOfWork >= 1) {
    approvalProbability += 15;
  } else {
    approvalProbability += 5;
    riskFactors.push("ระยะเวลาการทำงานสั้น");
  }

  // Alternative data bonus
  if (alternativeScore > 30) {
    approvalProbability += 10;
    mitigatingFactors.push("มีข้อมูลทางเลือกที่ดี");
  }

  approvalProbability = Math.min(Math.max(approvalProbability, 0), 100);

  let recommendedTerms = null;
  if (approvalProbability >= 60 && loanAmount <= affordability.maxLoanAmount) {
    recommendedTerms = {
      interestRate: calculateInterestRate(finalScore, profile.customerType),
      termMonths,
      monthlyPayment: Math.floor(monthlyPayment),
      totalPayment: Math.floor(monthlyPayment * termMonths),
    };
  }

  return {
    dsr: dsrResult.dsr,
    affordability,
    riskAssessment: {
      level:
        approvalProbability >= 70
          ? "low"
          : approvalProbability >= 40
            ? "medium"
            : "high",
      factors: riskFactors,
      mitigatingFactors,
    },
    creditScoring: {
      traditionalScore: traditionalScore > 0 ? traditionalScore : undefined,
      alternativeScore,
      finalScore,
      explanation: [
        traditionalScore > 0
          ? `คะแนนเครดิตดั้งเดิม: ${traditionalScore}`
          : "ไม่มีประวัติเครดิต",
        `คะแนนจากข้อมูลทางเลือก: ${alternativeScore}`,
        `คะแนนรวม: ${finalScore}`,
      ],
    },
    approvalProbability,
    recommendedTerms,
  };
}

// Calculate interest rate based on credit score and customer type
function calculateInterestRate(
  creditScore: number,
  customerType: CustomerProfile["customerType"],
): number {
  let baseRate = 8.0; // Base rate 8%

  // Adjust based on customer type
  if (customerType === "welfare_customer") {
    baseRate = 6.5; // Special rate for welfare customers
  } else if (customerType === "freelance") {
    baseRate = 9.0; // Higher rate for freelancers
  }

  // Adjust based on credit score
  if (creditScore >= 750) {
    return baseRate - 1.0;
  } else if (creditScore >= 700) {
    return baseRate - 0.5;
  } else if (creditScore >= 650) {
    return baseRate;
  } else if (creditScore >= 600) {
    return baseRate + 0.5;
  } else {
    return baseRate + 1.5;
  }
}

// Generate recommendations based on evaluation
export function generateRecommendations(
  evaluation: LoanEvaluation,
  profile: CustomerProfile,
  requestedAmount: number,
): LoanRecommendation {
  const { approvalProbability, affordability, riskAssessment } = evaluation;

  if (
    approvalProbability >= 70 &&
    requestedAmount <= affordability.maxLoanAmount
  ) {
    return {
      type: "approval",
      reasons: [
        "คุณสมบัติผ่านเกณฑ์ประเมิน",
        "อัตราส่วนหนี้ต่อรายได้เหมาะสม",
        "คะแนนเครดิตอยู่ในเกณฑ์ดี",
      ],
      suggestedActions: [
        {
          action: "เตรียมเอกสารที่จำเป็น",
          impact: "เร่งกระบวนการอนุมัติ",
          timeframe: "1-2 วัน",
        },
        {
          action: "ยืนยันข้อมูลการติดต่อ",
          impact: "ได้รับข่าวสารอย่างรวดเร็ว",
          timeframe: "ทันที",
        },
      ],
    };
  } else if (approvalProbability >= 40) {
    return {
      type: "conditional_approval",
      reasons: [
        "คุณสมบัติผ่านเกณฑ์เบื้องต้น",
        "อาจต้องพิจารณาเงื่อนไขเพิ่มเติม",
      ],
      suggestedActions: [
        {
          action:
            requestedAmount > affordability.recommendedAmount
              ? "ลดจำนวนเงินกู้"
              : "เพิ่มหลักประกัน",
          impact: "เพิ่มโอกาสอนุมัติ",
          timeframe: "1 สัปดาห์",
        },
        {
          action: "ปรับปรุงคะแนนเครดิต",
          impact: "ได้เงื่อนไขที่ดีกว่า",
          timeframe: "3-6 เดือน",
        },
      ],
      alternativeProducts:
        requestedAmount > affordability.recommendedAmount
          ? [
              {
                name: "สินเชื่อส่วนบุคคล",
                description: "วงเงินที่เหมาะสมกับรายได้",
                amount: affordability.recommendedAmount,
                terms: "อัตราดอกเบี้ยเริ่มต้น 8.5%",
              },
            ]
          : undefined,
    };
  } else {
    return {
      type: "rejection",
      reasons: riskAssessment.factors,
      suggestedActions: [
        {
          action: "เพิ่มรายได้หรือลดรายจ่าย",
          impact: "ปรับปรุงอัตราส่วนหนี้ต่อรายได้",
          timeframe: "3-6 เดือน",
        },
        {
          action: "สร้างประวัติเครดิตที่ดี",
          impact: "เพิ่มโอกาสอนุมัติในอนาคต",
          timeframe: "6-12 เดือน",
        },
        {
          action: "ลดภาระหนี้เดิม",
          impact: "เพิ่มความสามารถในการชำระ",
          timeframe: "1-3 เดือน",
        },
      ],
      alternativeProducts: [
        {
          name: "บัตรเครดิต",
          description: "เริ่มสร้างประวัติเครดิต",
          amount: 10000,
          terms: "วงเงินเริ่มต้น",
        },
        {
          name: "สินเชื่อหมุนเวียน",
          description: "ใช้เป็นเงินทุนหมุนเวียน",
          amount: 50000,
          terms: "มีหลักประกัน",
        },
      ],
    };
  }
}

// Helper function to get customer type label in Thai
export function getCustomerTypeLabel(
  customerType: CustomerProfile["customerType"],
): string {
  switch (customerType) {
    case "regular_employee":
      return "พนักงานประจำ";
    case "freelance":
      return "อาชีพอิสระ/ฟรีแลนซ์";
    case "welfare_customer":
      return "ลูกค้าสวัสดิการ";
    default:
      return "ลูกค้า";
  }
}
