import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
  Star,
  Wallet,
  Camera,
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
  | "freelance_type"
  | "income_proof"
  | "financial"
  | "loan_details"
  | "alternative_data"
  | "evaluation"
  | "results";

const LoanWizard: React.FC<LoanWizardProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<WizardStep>("freelance_type");
  const [customJobTitle, setCustomJobTitle] = useState("");
  const [profile, setProfile] = useState<Partial<CustomerProfile>>({
    customerType: "freelance", // Default to freelance
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
      key: "freelance_type",
      label: "ประเภทงาน",
      description: "ประเภทฟรีแลนซ์ของคุณ",
    },
    {
      key: "income_proof",
      label: "หลักฐานรายได้",
      description: "รายได้และเอกสาร",
    },
    { key: "financial", label: "การเงิน", description: "รายจ่ายและภาระหนี้" },
    {
      key: "loan_details",
      label: "สินเชื่อ",
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

  const freelanceTypes = [
    {
      type: "creative" as const,
      icon: User,
      title: "งานสร้างสรรค์",
      description: "กราฟิก, เขียน, ถ่ายภาพ, วิดีโอ",
      examples: [
        "Graphic Designer",
        "Content Writer",
        "Photographer",
        "Video Editor",
      ],
      color: "bg-purple-500",
    },
    {
      type: "tech" as const,
      icon: Users,
      title: "เทคโนโลยี",
      description: "เขียนโปรแกรม, เว็บไซต์, แอป",
      examples: ["Web Developer", "Mobile App Developer", "UI/UX Designer"],
      color: "bg-blue-500",
    },
    {
      type: "business" as const,
      icon: Briefcase,
      title: "ธุรกิจ/การตลาด",
      description: "ปรึกษา, การตลาด, ขาย",
      examples: ["Digital Marketing", "Business Consultant", "Sales"],
      color: "bg-green-500",
    },
    {
      type: "other" as const,
      icon: Building,
      title: "อื่นๆ",
      description: "แปลภาษา, สอน, ค้าขาย",
      examples: ["Translator", "Online Tutor", "E-commerce"],
      color: "bg-orange-500",
    },
  ];

  const incomeProofOptions = [
    {
      type: "bank_statement",
      title: "Statement บัญชีธนาคาร",
      description: "6-12 เดือนล่าสุด (แนะนำมากที่สุด)",
      required: true,
      icon: FileText,
    },
    {
      type: "tax_document",
      title: "ภ.พ.30 หรือ แบบแสดงรายการภาษี",
      description: "หลักฐานจากกรมสรรพากร",
      required: true,
      icon: Calculator,
    },
    {
      type: "work_contract",
      title: "สัญญาจ้างงาน/ใบเสนอราคา",
      description: "จากลูกค้าหรือแพลตฟอร์มงาน",
      required: false,
      icon: Briefcase,
    },
    {
      type: "platform_evidence",
      title: "หลักฐานจากแพลตฟอร์มงาน",
      description: "Upwork, Fiverr, Fastwork, Facebook Page",
      required: false,
      icon: Smartphone,
    },
  ];

  const loanPurposes = [
    {
      value: "business",
      label: "ลงทุนธุรกิจ",
      icon: Briefcase,
      description: "ซื้ออุปกรณ์ทำงาน ขยายธุรกิจ",
    },
    {
      value: "education",
      label: "พัฒนาทักษะ",
      icon: GraduationCap,
      description: "คอร์สเรียน อบรม เครื่องมือใหม่",
    },
    {
      value: "housing",
      label: "ที่อยู่อาศัย",
      icon: Home,
      description: "ซื้อบ้าน คอนโด เพื่อทำงาน",
    },
    {
      value: "emergency",
      label: "เหตุฉุกเฉิน",
      icon: AlertTriangle,
      description: "ค่ารักษาพยาบาล เหตุจำเป็น",
    },
  ];

  const alternativeDataOptions = [
    {
      key: "utilityPayments" as keyof CustomerProfile["alternativeData"],
      label: "ชำระค่าน้ำ-ไฟตรงเวลา",
      description: "แสดงความรับผิดชอบในการชำระ",
      icon: Zap,
      points: 15,
    },
    {
      key: "phonePayments" as keyof CustomerProfile["alternativeData"],
      label: "ชำระค่าโทรศัพท์ตรงเวลา",
      description: "ค่ามือถือ อินเทอร์เน็ต",
      icon: Smartphone,
      points: 12,
    },
    {
      key: "savingsHistory" as keyof CustomerProfile["alternativeData"],
      label: "มีการออมเงินสม่ำเสมอ",
      description: "แสดงวินัยทางการเงิน",
      icon: PiggyBank,
      points: 20,
    },
    {
      key: "eCommerceActivity" as keyof CustomerProfile["alternativeData"],
      label: "ใช้บริการธนาคารออนไลน์",
      description: "Mobile Banking, E-Payment",
      icon: CreditCard,
      points: 8,
    },
  ];

  const handleNext = () => {
    // บันทึกอาชีพที่กรอกเองเมื่อเลือก "อื่นๆ"
    if (
      currentStep === "freelance_type" &&
      profile.freelanceType === "other" &&
      customJobTitle.trim()
    ) {
      setProfile((prev) => ({
        ...prev,
        customJobTitle: customJobTitle.trim(),
      }));
    }

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
    if (!profile.employmentDetails || !profile.financialInfo) {
      return;
    }

    setIsProcessing(true);
    setCurrentStep("evaluation");

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const completeProfile: CustomerProfile = {
      id: Date.now().toString(),
      customerType: "freelance",
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
      case "freelance_type":
        return (
          profile.freelanceType &&
          (profile.freelanceType !== "other" ||
            customJobTitle.trim().length > 0)
        );
      case "income_proof":
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

  const renderFreelanceTypeStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-ghb-dark thai-text mb-2">
          คุณทำงานฟรีแลนซ์ประเภทไหน?
        </h2>
        <p className="text-ghb-gray thai-text">
          เลือกประเภทที่ใกล้เคียงกับงานของคุณมากที่สุด
        </p>
      </div>

      <div className="space-y-4">
        {freelanceTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.type}
              onClick={() =>
                setProfile((prev) => ({ ...prev, freelanceType: type.type }))
              }
              className={cn(
                "w-full p-4 rounded-xl border-2 transition-all duration-200 text-left",
                profile.freelanceType === type.type
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
                  <p className="text-sm text-ghb-gray thai-text mb-2">
                    {type.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {type.examples.slice(0, 2).map((example, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {example}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Custom Job Title Input when "Other" is selected */}
      {profile.freelanceType === "other" && (
        <Card className="border-2 border-ghb-primary/20 bg-ghb-primary/5">
          <CardContent className="p-4">
            <div className="space-y-3">
              <Label
                htmlFor="customJobTitle"
                className="text-ghb-dark thai-text font-medium"
              >
                โปรดระบุอาชีพของคุณ
              </Label>
              <Input
                id="customJobTitle"
                type="text"
                placeholder="เช่น นักแปล, ครูสอนพิเศษ, ขายของออนไลน์"
                value={customJobTitle}
                onChange={(e) => setCustomJobTitle(e.target.value)}
                className="h-12 text-lg"
                maxLength={50}
              />
              <p className="text-xs text-ghb-gray thai-text">
                ข้อมูลนี้จะช่วยให้เราประเมินความเสี่ยงได้แม่นยำขึ้น
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-l-4 border-l-blue-500 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 thai-text">
                ทำไมต้องระบุประเภทงาน?
              </h3>
              <p className="text-sm text-blue-700 thai-text mt-1 leading-relaxed">
                ช่วยให้เราประเมินความเสี่ยงและเสถียรภาพของรายได้ได้แม่นยำขึ้น
                แต่ละประเภทงานมีลักษณะการรับเงินที่แตกต่างกัน
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderIncomeProofStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-ghb-dark thai-text mb-2">
          รายได้และหลักฐาน
        </h2>
        <p className="text-ghb-gray thai-text">รายได้เฉลี่ยและเอกสารที่มี</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="monthlyIncome" className="text-ghb-dark thai-text">
            รายได้เฉลี่ยต่อเดือน (บาท)
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-ghb-gray">฿</span>
            <Input
              id="monthlyIncome"
              type="number"
              placeholder="30000"
              value={profile.employmentDetails?.monthlyIncome || ""}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  employmentDetails: {
                    ...prev.employmentDetails,
                    type: "freelance",
                    monthlyIncome: parseInt(e.target.value) || 0,
                    incomeDocuments: [],
                    yearsOfWork: prev.employmentDetails?.yearsOfWork || 1,
                  },
                }))
              }
              className="pl-8 h-12 text-lg"
            />
          </div>
          <p className="text-sm text-ghb-gray thai-text mt-1">
            คิดจากรายได้ 6 เดือนล่าสุด
          </p>
        </div>

        <div>
          <Label htmlFor="yearsOfWork" className="text-ghb-dark thai-text">
            ทำงานฟรีแลนซ์มากี่ปี?
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

      <Card>
        <CardHeader>
          <CardTitle className="text-ghb-dark thai-text">
            หลักฐานที่คุณมี
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {incomeProofOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.type}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <Icon className="w-5 h-5 text-ghb-primary mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-ghb-dark thai-text text-sm">
                      {option.title}
                    </h4>
                    <p className="text-xs text-ghb-gray thai-text">
                      {option.description}
                    </p>
                  </div>
                  {option.required && (
                    <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">
                      จำเป็น
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-orange-500 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <FileText className="w-5 h-5 text-orange-500 mt-0.5" />
            <div>
              <h3 className="font-semibold text-orange-900 thai-text">
                💡 เคล็ดลับสำหรับฟรีแลนซ์
              </h3>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-orange-700 thai-text">
                  • Statement บัญชี = หลักฐานที่ดีที่สุด แสดงเงินเข้าจริง
                </p>
                <p className="text-sm text-orange-700 thai-text">
                  • ถ้ารายได้ไม่สม่ำเสมอ ให้ดูค่าเฉลี่ย 6-12 เดือน
                </p>
                <p className="text-sm text-orange-700 thai-text">
                  • เก็บหลักฐานงานจากลูกค้า/แพลตฟอร์มเสริม
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFinancialStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-ghb-dark thai-text mb-2">
          ค่าใช้จ่ายและหนี้สิน
        </h2>
        <p className="text-ghb-gray thai-text">
          รายจ่ายประจำและภาระหนี้ปัจจุบัน
        </p>
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
          <p className="text-sm text-ghb-gray thai-text mt-1">
            ค่าครองชีพ ค่าเช่า ค่าอาหาร ค่าใช้จ่ายประจ��
          </p>
        </div>

        <div>
          <Label htmlFor="existingDebts" className="text-ghb-dark thai-text">
            หนี้ที่ต้องผ่อนต่อเดือน (บาท)
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
            บัตรเครดิต สินเชื่อรถ สินเชื่อส่วนบุคคล (ถ้ามี)
          </p>
        </div>
      </div>

      {profile.employmentDetails?.monthlyIncome &&
        profile.financialInfo?.monthlyExpenses !== undefined && (
          <Card className="bg-ghb-light/50">
            <CardHeader>
              <CardTitle className="text-ghb-dark thai-text text-lg">
                สรุปสถานะการเงิน
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-lg font-bold text-green-600">
                    ฿{profile.employmentDetails.monthlyIncome.toLocaleString()}
                  </div>
                  <div className="text-sm text-ghb-gray thai-text">
                    รายได้เฉลี่ย
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
                    รายจ่ายรวม
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
          เงินกู้ที่ต้องการ
        </h2>
        <p className="text-ghb-gray thai-text">
          จำนวนและวัตถุประสงค์การใช้เงิน
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
              max="500000"
              step="10000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-ghb-gray mt-2">
              <span>฿50,000</span>
              <span>฿500,000</span>
            </div>
          </div>
          <p className="text-sm text-ghb-gray thai-text text-center mt-2">
            วงเงินสำหรับฟรีแลนซ์มักอยู่ที่ 200,000-500,000 บาท
          </p>
        </div>

        <div>
          <Label className="text-ghb-dark thai-text">
            จะเอาเงินไปใช้ทำอะไร?
          </Label>
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
                      (((loanAmount * 0.09) / 12) *
                        Math.pow(1 + 0.09 / 12, 60)) /
                        (Math.pow(1 + 0.09 / 12, 60) - 1),
                    ).toLocaleString()}
                  </div>
                  <div className="text-sm text-purple-700 thai-text">
                    (ระยะเวลา 5 ปี อัตราดอกเบี้ย 9% ต่อปี สำหรับฟรีแลนซ์)
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
          เพิ่มคะแนนความน่าเชื่���ถือ
        </h2>
        <p className="text-ghb-gray thai-text">
          ข้อมูลเหล่านี้จะช่วยเพิ่มโอกาสการอนุมัติ
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
              ช่วยชดเชยการไม่มีประวัติเครดิต
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-blue-500 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 thai-text">
                ทำไมข้อมูลนี้สำคัญสำหรับฟรีแลนซ์?
              </h3>
              <p className="text-sm text-blue-700 thai-text mt-1 leading-relaxed">
                เนื่องจากฟรีแลนซ์มักไม่มีประวัติเครดิตจากบัตรเครดิตหรือสินเชื่อ
                ธนาคารจึงใช้ข้อมูลพฤติกรรมการเงินในชีวิตประจำวันเป็นตัวชี้วัดความน่าเชื่อถือแทน
              </p>
            </div>
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
          กำลังประเมินข้อมูลฟรีแลนซ์
        </h2>
        <p className="text-ghb-gray thai-text mb-6">
          ระบบกำลังวิเคราะห์ตามเกณฑ์เฉพาะอาชีพอิสระ
        </p>
      </div>

      <div className="space-y-4">
        {[
          {
            step: "วิเคราะห์รายได้ย้อนหลัง",
            time: "2 นาที",
            status: "completed",
          },
          {
            step: "ตรวจสอบข้อมูลทางเลือก",
            time: "1 นาที",
            status: "completed",
          },
          {
            step: "ประเมินความเสี่ยงสำหรับฟรีแลนซ์",
            time: "2 นาที",
            status: "processing",
          },
          { step: "คำนวณวงเงินที่เหมาะสม", time: "1 นาที", status: "pending" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-white rounded-lg border"
          >
            <div className="flex items-center space-x-3">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  item.status === "completed"
                    ? "bg-green-500"
                    : item.status === "processing"
                      ? "bg-blue-500"
                      : "bg-gray-300",
                )}
              >
                {item.status === "completed" ? (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                ) : item.status === "processing" ? (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                ) : (
                  <Clock className="w-4 h-4 text-gray-500" />
                )}
              </div>
              <div className="text-left">
                <div className="font-medium text-ghb-dark thai-text text-sm">
                  {item.step}
                </div>
                <div className="text-xs text-ghb-gray thai-text">
                  {item.time}
                </div>
              </div>
            </div>
            <Badge
              variant={
                item.status === "completed"
                  ? "default"
                  : item.status === "processing"
                    ? "secondary"
                    : "outline"
              }
              className="text-xs"
            >
              {item.status === "completed"
                ? "เสร็จสิ้น"
                : item.status === "processing"
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
              <div className="text-sm text-ghb-gray thai-text mb-2">
                ผลการประเมินสำหรับฟรีแลนซ์
              </div>
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
                  ? "มีโอกาสผ่านอนุมัติ"
                  : recommendation.type === "conditional_approval"
                    ? "��นุมัติแบบมีเงื่อนไข"
                    : "ควรปรับปรุงข้อมูลก่อน"}
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
                    วงเงินที่แนะนำ
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

        {/* Freelancer-specific Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="text-ghb-dark thai-text">
              การวิเคราะห์เฉพาะฟรีแลนซ์
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-ghb-dark thai-text mb-2">
                การประเมินรายได้
              </h4>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold">
                  ฿{profile.employmentDetails?.monthlyIncome?.toLocaleString()}{" "}
                  / เดือน
                </div>
                <p className="text-sm text-ghb-gray thai-text">
                  ธนาคารใช้รายได้เฉลี่ยนี้ในการคำนวณ
                  โดยพิจารณาความผันผวนของอาชีพอิสระ
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-ghb-dark thai-text mb-2">
                คะแนนจากข้อมูลทางเลือก
              </h4>
              <div className="text-lg font-bold text-ghb-primary">
                +
                {alternativeDataOptions
                  .filter((option) => profile.alternativeData?.[option.key])
                  .reduce((sum, option) => sum + option.points, 0)}{" "}
                คะแนน
              </div>
              <p className="text-sm text-ghb-gray thai-text">
                ช่วยชดเชยการไม่มีประวัติเครดิตแบบดั้งเดิม
              </p>
            </div>

            {evaluation.riskAssessment.mitigatingFactors.length > 0 && (
              <div>
                <h4 className="font-semibold text-green-700 thai-text mb-2">
                  จุดแข็งของคุณ
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
                <h4 className="font-semibold text-orange-700 thai-text mb-2">
                  จุดที่ควรปรับปรุง
                </h4>
                <div className="space-y-1">
                  {evaluation.riskAssessment.factors.map((factor, index) => (
                    <div key={index} className="flex items-center">
                      <AlertCircle className="w-4 h-4 text-orange-500 mr-2" />
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
            <CardTitle className="text-ghb-dark thai-text">
              คำแนะนำสำหรับฟรีแลนซ์
            </CardTitle>
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
            onClick={() => setCurrentStep("freelance_type")}
          >
            ประเมินใหม่
          </Button>
          <Button
            className="flex-1 h-12 text-white thai-text"
            style={{ backgroundColor: "#ef582a" }}
            onClick={() => navigate("/freelancer-guide")}
          >
            {recommendation.type === "approval" ||
            recommendation.type === "conditional_approval"
              ? "เรียนรู้ขั้นตอนต่อไป"
              : "เรียนรู้การปรับปรุง"}
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
              ประเมินสินเชื่อฟรีแลนซ์
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
          {currentStep === "freelance_type" && renderFreelanceTypeStep()}

          {currentStep === "income_proof" && renderIncomeProofStep()}
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
                className="flex-1 h-12 thai-text"
              >
                ย้อนกลับ
              </Button>
            )}

            {currentStep === "alternative_data" ? (
              <Button
                onClick={handleEvaluation}
                disabled={!canProceed() || isProcessing}
                className="flex-1 h-12 text-white font-semibold thai-text"
                style={{ backgroundColor: "#ef582a" }}
              >
                {isProcessing ? "กำลังประเมิน..." : "ประเมินโอกาสกู้เงิน"}
                <Calculator className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1 h-12 text-white font-semibold thai-text"
                style={{ backgroundColor: "#ef582a" }}
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
