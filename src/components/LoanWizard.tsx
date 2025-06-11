import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Briefcase,
  Users,
  CreditCard,
  Home,
  GraduationCap,
  AlertTriangle,
  User,
  Building,
  Smartphone,
  Zap,
  PiggyBank,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  Calendar,
  Clock,
  Shield,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Info,
  FileText,
  Calculator,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CustomerProfile,
  LoanApplication,
  LoanEvaluation,
  LoanRecommendation,
} from "@/lib/bankingTypes";
import {
  calculateDSR,
  evaluateLoanApplication,
  generateRecommendations,
  determineDocumentRequirements,
  getCustomerTypeLabel,
  BANKING_PROCESS_FLOWS,
} from "@/lib/bankingCalculations";

interface LoanWizardProps {
  onComplete?: (application: LoanApplication) => void;
}

type WizardStep =
  | "customer_type"
  | "personal_info"
  | "employment"
  | "financial"
  | "loan_details"
  | "alternative_data"
  | "evaluation"
  | "results";

const LoanWizard: React.FC<LoanWizardProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<WizardStep>("customer_type");
  const [profile, setProfile] = useState<Partial<CustomerProfile>>({
    alternativeData: {
      utilityPayments: false,
      phonePayments: false,
      savingsHistory: false,
      eCommerceActivity: false,
      socialMediaPresence: false,
    },
  });
  const [loanAmount, setLoanAmount] = useState<number>(300000);
  const [loanPurpose, setLoanPurpose] = useState<string>("");
  const [evaluation, setEvaluation] = useState<LoanEvaluation | null>(null);
  const [recommendation, setRecommendation] =
    useState<LoanRecommendation | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const steps: { key: WizardStep; label: string; description: string }[] = [
    {
      key: "customer_type",
      label: "ประเภทลูกค้า",
      description: "เลือกประเภทของคุณ",
    },
    {
      key: "personal_info",
      label: "ข้อมูลส่วนตัว",
      description: "กรอกข้อมูลพื้นฐาน",
    },
    { key: "employment", label: "การทำงาน", description: "รายละเอียดการทำงาน" },
    { key: "financial", label: "การเงิน", description: "ข้อมูลทางการเงิน" },
    {
      key: "loan_details",
      label: "รายละเอียดสินเชื่อ",
      description: "จำนวนและวัตถุประสงค์",
    },
    {
      key: "alternative_data",
      label: "ข้อมูลเพิ่มเติม",
      description: "เพิ่มคะแนนเครดิต",
    },
    { key: "evaluation", label: "ประเมินผล", description: "วิเคราะห์ข้อมูล" },
    { key: "results", label: "ผลลัพธ์", description: "ผลการประเมิน" },
  ];

  const currentStepIndex = steps.findIndex((step) => step.key === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const customerTypes = [
    {
      type: "regular_employee" as const,
      icon: Briefcase,
      title: "พนักงานประจำ",
      description: "มีเง���นเดือนประจำ มีสลิปเงินเดือน",
      features: [
        "ใช้เกณฑ์ DSR 1:3",
        "ประเมินจากเงินเดือนสุทธิ",
        "กระบวนการอนุมัติมาตรฐาน",
      ],
      color: "bg-blue-500",
    },
    {
      type: "freelance" as const,
      icon: User,
      title: "อาชีพอิสระ/ฟรีแลนซ์",
      description: "ทำงานอิสระ รายได้ไม่คงที่",
      features: [
        "ใช้รายได้ย้อนหลัง 6-12 เดือน",
        "ต้องมี ภ.พ.30 หรือ Bank Statement",
        "ประเมินจากข้อมูลทางเลือก",
      ],
      color: "bg-purple-500",
    },
    {
      type: "welfare_customer" as const,
      icon: Building,
      title: "ลูกค้าสวัสดิการ",
      description: "พนักงานหน่วยงานที่ธนาคารให้สวัสดิการ",
      features: ["ใช้รายได้สุทธิ 80%", "ดอกเบี้ยพิเศษ", "กระบวนการอนุมัติด่วน"],
      color: "bg-green-500",
    },
  ];

  const loanPurposes = [
    {
      value: "housing",
      label: "ที่อยู่อาศัย",
      icon: Home,
      description: "ซื้อบ้าน คอนโด หรือที่ดิน",
    },
    {
      value: "business",
      label: "ธุรกิจ",
      icon: Briefcase,
      description: "เงินทุนประกอบธุรกิจ",
    },
    {
      value: "education",
      label: "การศึกษา",
      icon: GraduationCap,
      description: "ค่าเล่าเรียน หรือพัฒนาทักษะ",
    },
    {
      value: "emergency",
      label: "เหตุฉุกเฉิน",
      icon: AlertTriangle,
      description: "ค่ารักษาพยาบาล หรือเหตุจำเป็น",
    },
  ];

  const alternativeDataOptions = [
    {
      key: "utilityPayments" as keyof CustomerProfile["alternativeData"],
      label: "ชำระค่าสาธารณูปโภคตรงเวลา",
      description: "ค่าน้ำ ค่าไฟ ค่าแก๊ส",
      icon: Zap,
      points: 15,
    },
    {
      key: "phonePayments" as keyof CustomerProfile["alternativeData"],
      label: "ชำระค่าโทรศัพท์ตรงเวลา",
      description: "โทรศัพท์มือถือ อินเทอร์เน็ต",
      icon: Smartphone,
      points: 12,
    },
    {
      key: "savingsHistory" as keyof CustomerProfile["alternativeData"],
      label: "มีประวัติการออมเงิน",
      description: "ออมเงินสม่ำเสมอ 6 เดือนขึ้นไป",
      icon: PiggyBank,
      points: 20,
    },
    {
      key: "eCommerceActivity" as keyof CustomerProfile["alternativeData"],
      label: "ใช้บริการ E-Commerce",
      description: "ซื้อขายออนไลน์ ใช้ E-Payment",
      icon: CreditCard,
      points: 8,
    },
  ];

  const handleNext = () => {
    const currentIndex = steps.findIndex((step) => step.key === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].key);
    }
  };

  const handlePrevious = () => {
    const currentIndex = steps.findIndex((step) => step.key === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].key);
    }
  };

  const handleEvaluation = async () => {
    if (
      !profile.customerType ||
      !profile.employmentDetails ||
      !profile.financialInfo
    ) {
      return;
    }

    setIsProcessing(true);
    setCurrentStep("evaluation");

    // Simulate processing time for realistic experience
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const completeProfile: CustomerProfile = {
      id: Date.now().toString(),
      customerType: profile.customerType,
      nationalId: profile.nationalId || "",
      phoneNumber: profile.phoneNumber || "",
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      employmentDetails: profile.employmentDetails,
      financialInfo: profile.financialInfo,
      creditInfo: {
        hasDefaultHistory: false,
        hasLoanHistory: false,
        paymentHistory: "good",
      },
      alternativeData: profile.alternativeData!,
    };

    const evaluationResult = evaluateLoanApplication(
      completeProfile,
      loanAmount,
    );
    const recommendationResult = generateRecommendations(
      evaluationResult,
      completeProfile,
      loanAmount,
    );

    setEvaluation(evaluationResult);
    setRecommendation(recommendationResult);
    setIsProcessing(false);
    setCurrentStep("results");
  };

  const canProceed = () => {
    switch (currentStep) {
      case "customer_type":
        return !!profile.customerType;
      case "personal_info":
        return !!(
          profile.nationalId &&
          profile.phoneNumber &&
          profile.firstName &&
          profile.lastName
        );
      case "employment":
        return !!(
          profile.employmentDetails?.monthlyIncome &&
          profile.employmentDetails?.yearsOfWork
        );
      case "financial":
        return !!(profile.financialInfo?.monthlyExpenses !== undefined);
      case "loan_details":
        return !!(loanAmount && loanPurpose);
      default:
        return true;
    }
  };

  const renderCustomerTypeStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-ghb-dark thai-text mb-2">
          เลือกประเภทลูกค้าที่ตรงกับคุณ
        </h2>
        <p className="text-ghb-gray thai-text">
          ประเภทลูกค้าจะกำหนดวิธีการประเมินและเกณฑ์การพิจารณา
        </p>
      </div>

      <div className="space-y-4">
        {customerTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.type}
              onClick={() =>
                setProfile((prev) => ({ ...prev, customerType: type.type }))
              }
              className={cn(
                "w-full p-6 rounded-xl border-2 transition-all duration-200 text-left",
                profile.customerType === type.type
                  ? "border-ghb-primary bg-ghb-primary/5 shadow-lg"
                  : "border-gray-200 hover:border-ghb-primary/50 hover:shadow-md",
              )}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`w-12 h-12 ${type.color} rounded-xl flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-ghb-dark thai-text mb-1">
                    {type.title}
                  </h3>
                  <p className="text-sm text-ghb-gray thai-text mb-3">
                    {type.description}
                  </p>
                  <div className="space-y-1">
                    {type.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle2 className="w-3 h-3 text-green-500 mr-2" />
                        <span className="text-xs text-ghb-gray thai-text">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {profile.customerType && (
        <Card className="border-l-4 border-l-blue-500 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 thai-text">
                  กระบวนการสำหรับ{getCustomerTypeLabel(profile.customerType)}
                </h3>
                <div className="mt-2 space-y-1">
                  {BANKING_PROCESS_FLOWS[profile.customerType].steps
                    .slice(0, 3)
                    .map((step, index) => (
                      <div
                        key={index}
                        className="text-sm text-blue-700 thai-text"
                      >
                        {index + 1}. {step.name} ({step.timeframe})
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderPersonalInfoStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-ghb-dark thai-text mb-2">
          ข้อมูลส่วนตัว
        </h2>
        <p className="text-ghb-gray thai-text">
          กรอกข้อมูลส่วนตัวเพื่อใช้ในการประเมิน
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="nationalId" className="text-ghb-dark thai-text">
            หมายเลขบัตรประชาชน
          </Label>
          <Input
            id="nationalId"
            type="text"
            placeholder="1234567890123"
            value={profile.nationalId || ""}
            onChange={(e) =>
              setProfile((prev) => ({
                ...prev,
                nationalId: e.target.value.replace(/\D/g, "").slice(0, 13),
              }))
            }
            className="h-12 text-lg"
            maxLength={13}
          />
        </div>

        <div>
          <Label htmlFor="phoneNumber" className="text-ghb-dark thai-text">
            หมายเลขโทรศัพท์
          </Label>
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="0812345678"
            value={profile.phoneNumber || ""}
            onChange={(e) =>
              setProfile((prev) => ({
                ...prev,
                phoneNumber: e.target.value.replace(/\D/g, "").slice(0, 10),
              }))
            }
            className="h-12 text-lg"
            maxLength={10}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-ghb-dark thai-text">
              ชื่อ
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="สมชาย"
              value={profile.firstName || ""}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, firstName: e.target.value }))
              }
              className="h-12"
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-ghb-dark thai-text">
              นามสกุล
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder="ใจดี"
              value={profile.lastName || ""}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, lastName: e.target.value }))
              }
              className="h-12"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmploymentStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-ghb-dark thai-text mb-2">
          ข้อมูลการทำงาน
        </h2>
        <p className="text-ghb-gray thai-text">
          {profile.customerType === "welfare_customer"
            ? "ข้อมูลเงินเดือนและหน่วยงาน"
            : profile.customerType === "freelance"
              ? "รายได้เฉลี่ยต่อเดือนจากการทำงาน"
              : "รายได้ประจำจากการทำงาน"}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="monthlyIncome" className="text-ghb-dark thai-text">
            {profile.customerType === "welfare_customer"
              ? "เงินเดือนขั้นต้น (บาท)"
              : profile.customerType === "freelance"
                ? "รายได้เฉลี่ยต่อเดือน (บาท)"
                : "เงินเดือนสุทธิ (บาท)"}
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-ghb-gray">฿</span>
            <Input
              id="monthlyIncome"
              type="number"
              placeholder="25000"
              value={profile.employmentDetails?.monthlyIncome || ""}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  employmentDetails: {
                    ...prev.employmentDetails,
                    type: prev.customerType!,
                    monthlyIncome: parseInt(e.target.value) || 0,
                    incomeDocuments: [],
                    yearsOfWork: prev.employmentDetails?.yearsOfWork || 1,
                  },
                }))
              }
              className="pl-8 h-12 text-lg"
            />
          </div>
          {profile.customerType === "welfare_customer" && (
            <p className="text-sm text-ghb-gray thai-text mt-1">
              ���ะใช้ 80% ของจำนวนนี้ในการคำนวณ (฿
              {(
                (profile.employmentDetails?.monthlyIncome || 0) * 0.8
              ).toLocaleString()}
              )
            </p>
          )}
        </div>

        {profile.customerType === "welfare_customer" && (
          <div>
            <Label htmlFor="organization" className="text-ghb-dark thai-text">
              หน่วยงาน/องค์กรที่สังกัด
            </Label>
            <Input
              id="organization"
              type="text"
              placeholder="กรุงไทย / บริษัทในเครือ"
              value={profile.employmentDetails?.organization || ""}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  employmentDetails: {
                    ...prev.employmentDetails!,
                    organization: e.target.value,
                  },
                }))
              }
              className="h-12"
            />
          </div>
        )}

        <div>
          <Label htmlFor="yearsOfWork" className="text-ghb-dark thai-text">
            อายุการทำงาน (ปี)
          </Label>
          <Input
            id="yearsOfWork"
            type="number"
            placeholder="2"
            value={profile.employmentDetails?.yearsOfWork || ""}
            onChange={(e) =>
              setProfile((prev) => ({
                ...prev,
                employmentDetails: {
                  ...prev.employmentDetails!,
                  yearsOfWork: parseInt(e.target.value) || 0,
                },
              }))
            }
            className="h-12"
            min="0"
            max="50"
          />
        </div>
      </div>

      {profile.customerType && (
        <Card className="border-l-4 border-l-orange-500 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <FileText className="w-5 h-5 text-orange-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-orange-900 thai-text">
                  เอกสารที่ต้องเตรียม
                </h3>
                <div className="mt-2 space-y-1">
                  {determineDocumentRequirements(
                    profile.customerType,
                    loanAmount,
                  )
                    .filter((doc) => doc.type !== "national_id")
                    .slice(0, 3)
                    .map((doc, index) => (
                      <div
                        key={index}
                        className="text-sm text-orange-700 thai-text"
                      >
                        • {doc.description}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderFinancialStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-ghb-dark thai-text mb-2">
          ข้อมูลทางการเงิน
        </h2>
        <p className="text-ghb-gray thai-text">รายจ่ายและภาระหนี้ปัจจุบัน</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="monthlyExpenses" className="text-ghb-dark thai-text">
            รายจ่ายต่อเดือน (บาท)
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-ghb-gray">฿</span>
            <Input
              id="monthlyExpenses"
              type="number"
              placeholder="15000"
              value={profile.financialInfo?.monthlyExpenses || ""}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  financialInfo: {
                    ...prev.financialInfo,
                    monthlyExpenses: parseInt(e.target.value) || 0,
                    existingDebts: prev.financialInfo?.existingDebts || 0,
                    savingsAccount: prev.financialInfo?.savingsAccount || false,
                    bankStatement: prev.financialInfo?.bankStatement || false,
                    currentDSR: 0,
                  },
                }))
              }
              className="pl-8 h-12 text-lg"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="existingDebts" className="text-ghb-dark thai-text">
            ภาระหนี้ที่ต้องชำระต่อเดือน (บาท)
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-ghb-gray">฿</span>
            <Input
              id="existingDebts"
              type="number"
              placeholder="5000"
              value={profile.financialInfo?.existingDebts || ""}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  financialInfo: {
                    ...prev.financialInfo!,
                    existingDebts: parseInt(e.target.value) || 0,
                  },
                }))
              }
              className="pl-8 h-12 text-lg"
            />
          </div>
          <p className="text-sm text-ghb-gray thai-text mt-1">
            รวมบัตรเครดิต สินเชื่อรถ สินเชื่อบ้าน และหนี้อื่นๆ
          </p>
        </div>
      </div>

      {profile.employmentDetails?.monthlyIncome &&
        profile.financialInfo?.monthlyExpenses !== undefined && (
          <Card className="bg-ghb-light/50">
            <CardHeader>
              <CardTitle className="text-ghb-dark thai-text text-lg">
                ภาพรวมทางการเงิน
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-lg font-bold text-green-600">
                    ฿{profile.employmentDetails.monthlyIncome.toLocaleString()}
                  </div>
                  <div className="text-sm text-ghb-gray thai-text">
                    รายได้ต่อเดือน
                  </div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-lg font-bold text-red-600">
                    ฿
                    {(
                      profile.financialInfo.monthlyExpenses +
                      (profile.financialInfo.existingDebts || 0)
                    ).toLocaleString()}
                  </div>
                  <div className="text-sm text-ghb-gray thai-text">
                    รายจ่ายรว���
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <div className="text-2xl font-bold text-ghb-primary">
                  ฿
                  {(
                    profile.employmentDetails.monthlyIncome -
                    profile.financialInfo.monthlyExpenses -
                    (profile.financialInfo.existingDebts || 0)
                  ).toLocaleString()}
                </div>
                <div className="text-sm text-ghb-gray thai-text">
                  เงินเหลือต่อเดือน
                </div>
              </div>
            </CardContent>
          </Card>
        )}
    </div>
  );

  const renderLoanDetailsStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-ghb-dark thai-text mb-2">
          รายละเอียดสินเชื่อ
        </h2>
        <p className="text-ghb-gray thai-text">
          จำนวนเงินและวัตถุประสงค์การกู้
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-ghb-dark thai-text">
            จำนวนเงินที่ต้องการกู้
          </Label>
          <div className="mt-2 text-center">
            <div className="text-3xl font-bold text-ghb-primary mb-2">
              ฿{loanAmount.toLocaleString()}
            </div>
            <input
              type="range"
              min="50000"
              max="1000000"
              step="10000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-ghb-gray mt-2">
              <span>฿50,000</span>
              <span>฿1,000,000</span>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-ghb-dark thai-text">วัตถุประสงค์การกู้</Label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {loanPurposes.map((purpose) => {
              const Icon = purpose.icon;
              return (
                <button
                  key={purpose.value}
                  onClick={() => setLoanPurpose(purpose.value)}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all duration-200 text-left",
                    loanPurpose === purpose.value
                      ? "border-ghb-primary bg-ghb-primary/5"
                      : "border-gray-200 hover:border-ghb-primary/50",
                  )}
                >
                  <Icon className="w-8 h-8 text-ghb-primary mb-2" />
                  <h3 className="font-semibold text-ghb-dark thai-text text-sm">
                    {purpose.label}
                  </h3>
                  <p className="text-xs text-ghb-gray thai-text mt-1">
                    {purpose.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {profile.employmentDetails?.monthlyIncome && (
        <Card className="border-l-4 border-l-purple-500 bg-purple-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Calculator className="w-5 h-5 text-purple-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-purple-900 thai-text">
                  ประมาณการค่างวดรายเดือน
                </h3>
                <div className="mt-2">
                  <div className="text-lg font-bold text-purple-900">
                    ฿
                    {Math.floor(
                      (((loanAmount * 0.08) / 12) *
                        Math.pow(1 + 0.08 / 12, 60)) /
                        (Math.pow(1 + 0.08 / 12, 60) - 1),
                    ).toLocaleString()}
                  </div>
                  <div className="text-sm text-purple-700 thai-text">
                    (ระยะเวลา 5 ปี อัตราดอกเบี้ย 8% ต่อปี)
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderAlternativeDataStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-ghb-dark thai-text mb-2">
          ข้อมูลเพิ่มเติมเพื่อเพิ่มคะแนน
        </h2>
        <p className="text-ghb-gray thai-text">
          ข้อมูลเหล่านี้จะช่วยเพิ่มโอกาสการอนุมัติของคุณ
        </p>
      </div>

      <div className="space-y-4">
        {alternativeDataOptions.map((option) => {
          const Icon = option.icon;
          const isChecked = profile.alternativeData?.[option.key] || false;

          return (
            <button
              key={option.key}
              onClick={() =>
                setProfile((prev) => ({
                  ...prev,
                  alternativeData: {
                    ...prev.alternativeData!,
                    [option.key]: !prev.alternativeData![option.key],
                  },
                }))
              }
              className={cn(
                "w-full p-4 rounded-xl border-2 transition-all duration-200 text-left",
                isChecked
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-green-300",
              )}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    isChecked ? "bg-green-500" : "bg-gray-100",
                  )}
                >
                  <Icon
                    className={cn(
                      "w-6 h-6",
                      isChecked ? "text-white" : "text-gray-400",
                    )}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-ghb-dark thai-text">
                    {option.label}
                  </h3>
                  <p className="text-sm text-ghb-gray thai-text">
                    {option.description}
                  </p>
                </div>
                <div className="text-right">
                  <Badge
                    className={cn(
                      "text-xs",
                      isChecked
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-gray-100 text-gray-500 border-gray-200",
                    )}
                  >
                    +{option.points} คะแนน
                  </Badge>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <Card className="bg-gradient-to-r from-ghb-primary/5 to-ghb-accent/5">
        <CardContent className="p-4">
          <div className="text-center">
            <h3 className="font-semibold text-ghb-dark thai-text mb-2">
              คะแนนเพิ่มเติมของคุณ
            </h3>
            <div className="text-2xl font-bold text-ghb-primary">
              +
              {alternativeDataOptions
                .filter((option) => profile.alternativeData?.[option.key])
                .reduce((sum, option) => sum + option.points, 0)}{" "}
              คะแนน
            </div>
            <p className="text-sm text-ghb-gray thai-text mt-1">
              จากข้อมูลทางเลือก
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderEvaluationStep = () => (
    <div className="space-y-6 text-center">
      <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-pulse">
        <Calculator className="w-10 h-10 text-white" />
      </div>

      <div>
        <h2 className="text-xl font-bold text-ghb-dark thai-text mb-2">
          กำลังประเมินข้อมูลของคุณ
        </h2>
        <p className="text-ghb-gray thai-text mb-6">
          ระบบกำลังวิเคราะห์ข้อมูลตามกระบวนการของธนาคาร
        </p>
      </div>

      <div className="space-y-4">
        {BANKING_PROCESS_FLOWS[profile.customerType!]?.steps
          .slice(0, 4)
          .map((step, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-white rounded-lg border"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    index < 2
                      ? "bg-green-500"
                      : index === 2
                        ? "bg-blue-500"
                        : "bg-gray-300",
                  )}
                >
                  {index < 2 ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : index === 2 ? (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  ) : (
                    <Clock className="w-4 h-4 text-gray-500" />
                  )}
                </div>
                <div className="text-left">
                  <div className="font-medium text-ghb-dark thai-text text-sm">
                    {step.name}
                  </div>
                  <div className="text-xs text-ghb-gray thai-text">
                    {step.timeframe}
                  </div>
                </div>
              </div>
              <Badge
                variant={
                  index < 2 ? "default" : index === 2 ? "secondary" : "outline"
                }
                className="text-xs"
              >
                {index < 2
                  ? "เสร็จสิ้น"
                  : index === 2
                    ? "กำลังดำเนินการ"
                    : "รอดำเนินการ"}
              </Badge>
            </div>
          ))}
      </div>
    </div>
  );

  const renderResultsStep = () => {
    if (!evaluation || !recommendation) return null;

    const getApprovalColor = (probability: number) => {
      if (probability >= 70) return "text-green-600";
      if (probability >= 40) return "text-yellow-600";
      return "text-red-600";
    };

    const getApprovalBadgeColor = (probability: number) => {
      if (probability >= 70)
        return "bg-green-100 text-green-700 border-green-200";
      if (probability >= 40)
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      return "bg-red-100 text-red-700 border-red-200";
    };

    return (
      <div className="space-y-6">
        {/* Main Result */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-white to-ghb-light/30">
          <CardContent className="p-6">
            <div className="text-center">
              <div
                className={cn(
                  "text-4xl font-bold mb-2",
                  getApprovalColor(evaluation.approvalProbability),
                )}
              >
                {evaluation.approvalProbability}%
              </div>
              <h2 className="text-xl font-bold text-ghb-dark thai-text mb-2">
                โอกาสการอนุมัติ
              </h2>
              <Badge
                className={getApprovalBadgeColor(
                  evaluation.approvalProbability,
                )}
              >
                {recommendation.type === "approval"
                  ? "มีโอกาสอนุมัติสูง"
                  : recommendation.type === "conditional_approval"
                    ? "อนุมัติแบบมีเงื่อนไข"
                    : "ต้องปรับปรุงข้อมูล"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Terms */}
        {evaluation.recommendedTerms && (
          <Card>
            <CardHeader>
              <CardTitle className="text-ghb-dark thai-text">
                เงื่อนไขสินเชื่อที่แนะนำ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg text-center">
                  <DollarSign className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                  <div className="font-bold text-ghb-dark">
                    ฿
                    {evaluation.affordability.recommendedAmount.toLocaleString()}
                  </div>
                  <div className="text-xs text-ghb-gray thai-text">
                    จำนวนที่แนะนำ
                  </div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg text-center">
                  <TrendingUp className="w-5 h-5 text-green-500 mx-auto mb-1" />
                  <div className="font-bold text-ghb-dark">
                    {evaluation.recommendedTerms.interestRate}%
                  </div>
                  <div className="text-xs text-ghb-gray thai-text">
                    อัตราดอกเบี้ย
                  </div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg text-center">
                  <Calendar className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                  <div className="font-bold text-ghb-dark">
                    ฿
                    {evaluation.recommendedTerms.monthlyPayment.toLocaleString()}
                  </div>
                  <div className="text-xs text-ghb-gray thai-text">
                    ผ่อนต่อเดือน
                  </div>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg text-center">
                  <Clock className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                  <div className="font-bold text-ghb-dark">
                    {evaluation.recommendedTerms.termMonths} เดือน
                  </div>
                  <div className="text-xs text-ghb-gray thai-text">
                    ระยะเวลา
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Explanation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-ghb-dark thai-text">
              การวิเคราะห์โดยละเอียด
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-ghb-dark thai-text mb-2">
                อัตราส่วนหนี้ต่อรายได้ (DSR)
              </h4>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold">
                  {(evaluation.dsr * 100).toFixed(1)}%
                </div>
                <p className="text-sm text-ghb-gray thai-text">
                  {evaluation.dsr <= 0.4
                    ? `ผ่านเกณฑ์ (ต่ำกว่า 40% สำหรับ${getCustomerTypeLabel(profile.customerType!)})`
                    : `เกินเกณฑ์ (มากกว่า 40% สำหรับ${getCustomerTypeLabel(profile.customerType!)})`}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-ghb-dark thai-text mb-2">
                คะแนนเครดิต
              </h4>
              <div className="space-y-2">
                {evaluation.creditScoring.explanation.map((item, index) => (
                  <div key={index} className="text-sm text-ghb-gray thai-text">
                    • {item}
                  </div>
                ))}
              </div>
            </div>

            {evaluation.riskAssessment.mitigatingFactors.length > 0 && (
              <div>
                <h4 className="font-semibold text-green-700 thai-text mb-2">
                  จุดแข็ง
                </h4>
                <div className="space-y-1">
                  {evaluation.riskAssessment.mitigatingFactors.map(
                    (factor, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm text-ghb-gray thai-text">
                          {factor}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {evaluation.riskAssessment.factors.length > 0 && (
              <div>
                <h4 className="font-semibold text-red-700 thai-text mb-2">
                  จุดที่ควรปรับปรุง
                </h4>
                <div className="space-y-1">
                  {evaluation.riskAssessment.factors.map((factor, index) => (
                    <div key={index} className="flex items-center">
                      <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                      <span className="text-sm text-ghb-gray thai-text">
                        {factor}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-ghb-dark thai-text">คำแนะนำ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendation.suggestedActions.map((action, index) => (
                <div key={index} className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 thai-text text-sm">
                    {action.action}
                  </h4>
                  <p className="text-sm text-blue-700 thai-text">
                    {action.impact} (ระยะเวลา: {action.timeframe})
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="flex-1 h-12 thai-text"
            onClick={() => setCurrentStep("customer_type")}
          >
            คำนวณใหม่
          </Button>
          <Button
            className="flex-1 h-12 bg-gradient-primary text-white thai-text"
            onClick={() => navigate("/document-upload")}
          >
            {recommendation.type === "approval" ||
            recommendation.type === "conditional_approval"
              ? "เตรียมเอกสาร"
              : "เรียนรู้เพิ่มเติม"}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ghb-light/30 via-white to-ghb-accent/5 pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-bold text-ghb-dark thai-text">
              จำลองการขอสินเชื่อ
            </h1>
            <Badge variant="outline" className="text-xs">
              ขั้นตอน {currentStepIndex + 1}/{steps.length}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="mt-2 text-center">
            <div className="text-sm font-medium text-ghb-dark thai-text">
              {steps[currentStepIndex]?.label}
            </div>
            <div className="text-xs text-ghb-gray thai-text">
              {steps[currentStepIndex]?.description}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        <div className="max-w-md mx-auto">
          {currentStep === "customer_type" && renderCustomerTypeStep()}
          {currentStep === "personal_info" && renderPersonalInfoStep()}
          {currentStep === "employment" && renderEmploymentStep()}
          {currentStep === "financial" && renderFinancialStep()}
          {currentStep === "loan_details" && renderLoanDetailsStep()}
          {currentStep === "alternative_data" && renderAlternativeDataStep()}
          {currentStep === "evaluation" && renderEvaluationStep()}
          {currentStep === "results" && renderResultsStep()}
        </div>
      </div>

      {/* Navigation */}
      {currentStep !== "results" && currentStep !== "evaluation" && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4">
          <div className="flex space-x-3 max-w-md mx-auto">
            {currentStepIndex > 0 && (
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="h-12 px-6 thai-text"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                ย้อนกลับ
              </Button>
            )}

            {currentStep === "alternative_data" ? (
              <Button
                onClick={handleEvaluation}
                disabled={!canProceed() || isProcessing}
                className="flex-1 h-12 bg-gradient-primary text-white font-semibold thai-text"
              >
                {isProcessing ? "กำลังประเมิน..." : "ประเมินผล"}
                <Calculator className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1 h-12 bg-gradient-primary text-white font-semibold thai-text"
              >
                ต่อไป
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanWizard;
