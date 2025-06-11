import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/Navbar";
import {
  User,
  Briefcase,
  Building,
  DollarSign,
  CreditCard,
  FileText,
  CheckCircle2,
  AlertCircle,
  Edit,
  Download,
  Share2,
  TrendingUp,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Star,
  Target,
  PiggyBank,
  Smartphone,
  Zap,
  BarChart3,
  Info,
  ArrowRight,
  Settings,
  LogOut,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CustomerProfile, LoanEvaluation } from "@/lib/bankingTypes";
import { getCustomerTypeLabel } from "@/lib/bankingCalculations";

const Profile = () => {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState<CustomerProfile | null>(
    null,
  );
  const [lastEvaluation, setLastEvaluation] = useState<LoanEvaluation | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<
    "overview" | "financial" | "credit" | "documents"
  >("overview");

  // Mock data - ในการใช้งานจริงจะดึงจาก localStorage หรือ API
  useEffect(() => {
    // ตัวอย่างข้อมูลลูกค้าที่บันทึกไว้
    const mockCustomerData: CustomerProfile = {
      id: "1234567890123",
      customerType: "freelance",
      nationalId: "1234567890123",
      phoneNumber: "0812345678",
      firstName: "สมชาย",
      lastName: "ใจดี",
      employmentDetails: {
        type: "freelance",
        monthlyIncome: 35000,
        incomeDocuments: ["ภ.พ.30", "Bank Statement"],
        yearsOfWork: 3,
      },
      financialInfo: {
        monthlyExpenses: 18000,
        existingDebts: 5000,
        savingsAccount: true,
        bankStatement: true,
        currentDSR: 0.28,
      },
      creditInfo: {
        crbScore: 650,
        hasDefaultHistory: false,
        hasLoanHistory: true,
        paymentHistory: "good",
      },
      alternativeData: {
        utilityPayments: true,
        phonePayments: true,
        savingsHistory: true,
        eCommerceActivity: true,
        socialMediaPresence: false,
      },
    };

    const mockEvaluation: LoanEvaluation = {
      dsr: 0.28,
      affordability: {
        maxLoanAmount: 420000,
        recommendedAmount: 350000,
        monthlyPaymentCapacity: 12000,
      },
      riskAssessment: {
        level: "medium",
        factors: ["รายได้ไม่คงที่", "���ระวัติเครดิตสั้น"],
        mitigatingFactors: ["ชำระบิลตรงเวลา", "มีการออมเงิน", "DSR ต่ำ"],
      },
      creditScoring: {
        traditionalScore: 650,
        alternativeScore: 47,
        finalScore: 664,
        explanation: [
          "คะแนนเครดิตดั้งเดิม: 650",
          "คะแนนจากข้อมูลทางเลือก: 47",
          "คะแนนรวม: 664",
        ],
      },
      approvalProbability: 73,
      recommendedTerms: {
        interestRate: 8.5,
        termMonths: 60,
        monthlyPayment: 9850,
        totalPayment: 591000,
      },
    };

    setCustomerData(mockCustomerData);
    setLastEvaluation(mockEvaluation);
  }, []);

  if (!customerData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ghb-light/30 via-white to-ghb-accent/5">
        <Navbar />
        <div className="pt-20 px-4 flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="w-16 h-16 bg-ghb-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-ghb-primary" />
            </div>
            <h2 className="text-xl font-bold text-ghb-dark thai-text mb-2">
              ยังไม่มีข้อมูลโปรไฟล์
            </h2>
            <p className="text-ghb-gray thai-text mb-6">
              กรุณาทำการประเมินสินเชื่อก่อนเพื่อสร้างโปรไฟล์
            </p>
            <Button
              onClick={() => navigate("/loan-simulator")}
              className="bg-gradient-primary text-white thai-text"
            >
              เริ่มประเมินสินเชื่อ
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const getCustomerTypeIcon = (type: CustomerProfile["customerType"]) => {
    switch (type) {
      case "regular_employee":
        return Briefcase;
      case "freelance":
        return User;
      case "welfare_customer":
        return Building;
      default:
        return User;
    }
  };

  const getCustomerTypeColor = (type: CustomerProfile["customerType"]) => {
    switch (type) {
      case "regular_employee":
        return "bg-blue-500";
      case "freelance":
        return "bg-purple-500";
      case "welfare_customer":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCreditScoreColor = (score: number) => {
    if (score >= 750) return "text-green-600";
    if (score >= 650) return "text-blue-600";
    if (score >= 550) return "text-yellow-600";
    return "text-red-600";
  };

  const getCreditScoreLabel = (score: number) => {
    if (score >= 750) return "ดีเยี่ยม";
    if (score >= 650) return "ดี";
    if (score >= 550) return "ปานกลาง";
    return "ต้องปรับปรุง";
  };

  const alternativeDataItems = [
    {
      key: "utilityPayments" as keyof CustomerProfile["alternativeData"],
      label: "การชำระค่าสาธารณูปโภค",
      icon: Zap,
      points: 15,
    },
    {
      key: "phonePayments" as keyof CustomerProfile["alternativeData"],
      label: "การชำระค่าโทรศัพท์",
      icon: Smartphone,
      points: 12,
    },
    {
      key: "savingsHistory" as keyof CustomerProfile["alternativeData"],
      label: "ประวัติการออมเงิน",
      icon: PiggyBank,
      points: 20,
    },
    {
      key: "eCommerceActivity" as keyof CustomerProfile["alternativeData"],
      label: "กิจกรรม E-Commerce",
      icon: CreditCard,
      points: 8,
    },
  ];

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-white to-ghb-light/30">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div
              className={`w-16 h-16 ${getCustomerTypeColor(customerData.customerType)} rounded-2xl flex items-center justify-center`}
            >
              {React.createElement(
                getCustomerTypeIcon(customerData.customerType),
                {
                  className: "w-8 h-8 text-white",
                },
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-ghb-dark thai-text">
                {customerData.firstName} {customerData.lastName}
              </h1>
              <p className="text-ghb-gray thai-text">
                {getCustomerTypeLabel(customerData.customerType)}
              </p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-ghb-gray mr-1" />
                  <span className="text-sm text-ghb-gray">
                    {customerData.phoneNumber.replace(
                      /(\d{3})(\d{3})(\d{4})/,
                      "$1-$2-$3",
                    )}
                  </span>
                </div>
                <Badge variant="outline" className="text-xs">
                  ID: {customerData.nationalId.slice(-4)}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-ghb-dark">
              ฿{customerData.employmentDetails.monthlyIncome.toLocaleString()}
            </div>
            <div className="text-xs text-ghb-gray thai-text">รายได้/เดือน</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <BarChart3 className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-ghb-dark">
              {(customerData.financialInfo.currentDSR * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-ghb-gray thai-text">DSR</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Star
              className={`w-8 h-8 mx-auto mb-2 ${getCreditScoreColor(customerData.creditInfo.crbScore || 0)}`}
            />
            <div
              className={`text-lg font-bold ${getCreditScoreColor(customerData.creditInfo.crbScore || 0)}`}
            >
              {customerData.creditInfo.crbScore || "N/A"}
            </div>
            <div className="text-xs text-ghb-gray thai-text">คะแนนเครดิต</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-ghb-dark">
              {lastEvaluation?.approvalProbability || 0}%
            </div>
            <div className="text-xs text-ghb-gray thai-text">โอกาสอนุมัติ</div>
          </CardContent>
        </Card>
      </div>

      {/* Last Assessment */}
      {lastEvaluation && (
        <Card>
          <CardHeader>
            <CardTitle className="text-ghb-dark thai-text">
              การประเมินล่าสุด
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <DollarSign className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-sm text-ghb-gray thai-text">
                    จำนวนที่แนะนำ
                  </span>
                </div>
                <div className="text-lg font-bold text-ghb-dark">
                  ฿
                  {lastEvaluation.affordability.recommendedAmount.toLocaleString()}
                </div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm text-ghb-gray thai-text">
                    อัตราดอกเบี้ย
                  </span>
                </div>
                <div className="text-lg font-bold text-ghb-dark">
                  {lastEvaluation.recommendedTerms?.interestRate}%
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1 thai-text"
                onClick={() => navigate("/loan-simulator")}
              >
                ประเมินใหม่
              </Button>
              <Button
                className="flex-1 bg-gradient-primary text-white thai-text"
                onClick={() => navigate("/document-upload")}
              >
                ยื่นเอกสาร
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ghb-dark thai-text">
            การดำเนินการด่วน
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center thai-text"
              onClick={() => navigate("/missions")}
            >
              <Target className="w-6 h-6 mb-1" />
              <span className="text-sm">ภารกิจ</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center thai-text"
              onClick={() => navigate("/education")}
            >
              <FileText className="w-6 h-6 mb-1" />
              <span className="text-sm">เรียนรู้</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center thai-text"
              onClick={() => navigate("/credit-sandbox")}
            >
              <BarChart3 className="w-6 h-6 mb-1" />
              <span className="text-sm">เครดิต</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center thai-text"
              onClick={() => navigate("/chat")}
            >
              <Phone className="w-6 h-6 mb-1" />
              <span className="text-sm">ช่วยเหลือ</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFinancialTab = () => (
    <div className="space-y-6">
      {/* Income & Expenses */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ghb-dark thai-text">
            สถานะทางการเงิน
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-sm text-ghb-gray thai-text">
                  รายได้ต่อเดือน
                </span>
              </div>
              <div className="text-xl font-bold text-green-600">
                ฿{customerData.employmentDetails.monthlyIncome.toLocaleString()}
              </div>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center mb-2">
                <DollarSign className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-sm text-ghb-gray thai-text">
                  รายจ่ายต่อเดือน
                </span>
              </div>
              <div className="text-xl font-bold text-red-600">
                ฿{customerData.financialInfo.monthlyExpenses.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-ghb-gray thai-text">
                ภาระหนี้ต่อเดือน
              </span>
              <span className="text-lg font-bold text-ghb-dark">
                ฿{customerData.financialInfo.existingDebts.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-ghb-gray thai-text">
                เงินเหลือต่อเดือน
              </span>
              <span className="text-lg font-bold text-ghb-primary">
                ฿
                {(
                  customerData.employmentDetails.monthlyIncome -
                  customerData.financialInfo.monthlyExpenses -
                  customerData.financialInfo.existingDebts
                ).toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* DSR Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ghb-dark thai-text">
            วิเคราะห์อัตราส่วนหนี้ (DSR)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-ghb-gray thai-text">DSR ปัจจุบัน</span>
              <span className="text-2xl font-bold text-ghb-primary">
                {(customerData.financialInfo.currentDSR * 100).toFixed(1)}%
              </span>
            </div>
            <Progress
              value={customerData.financialInfo.currentDSR * 100}
              className="h-3"
            />
            <div className="flex justify-between text-xs text-ghb-gray">
              <span>0%</span>
              <span className="text-red-500">40% (เกณฑ์สูงสุด)</span>
              <span>100%</span>
            </div>

            <div
              className={cn(
                "p-3 rounded-lg",
                customerData.financialInfo.currentDSR <= 0.4
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200",
              )}
            >
              <div className="flex items-center">
                {customerData.financialInfo.currentDSR <= 0.4 ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                )}
                <span
                  className={cn(
                    "text-sm thai-text",
                    customerData.financialInfo.currentDSR <= 0.4
                      ? "text-green-700"
                      : "text-red-700",
                  )}
                >
                  {customerData.financialInfo.currentDSR <= 0.4
                    ? "DSR อยู่ในเกณฑ์ดี เหมาะสำหรับการขอสินเชื่อ"
                    : "DSR สูงเกินเกณฑ์ ควรลดภาระหนี้ก่อนขอสินเชื่อ"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loan Capacity */}
      {lastEvaluation && (
        <Card>
          <CardHeader>
            <CardTitle className="text-ghb-dark thai-text">
              ความสามารถในการกู้
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-ghb-gray thai-text mb-1">
                    วงเงินสูงสุด
                  </div>
                  <div className="text-lg font-bold text-blue-600">
                    ฿
                    {lastEvaluation.affordability.maxLoanAmount.toLocaleString()}
                  </div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-sm text-ghb-gray thai-text mb-1">
                    วงเงินที่แนะนำ
                  </div>
                  <div className="text-lg font-bold text-green-600">
                    ฿
                    {lastEvaluation.affordability.recommendedAmount.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ghb-gray thai-text">
                    ความสามารถผ่อนต่อเดือน
                  </span>
                  <span className="text-lg font-bold text-purple-600">
                    ฿
                    {lastEvaluation.affordability.monthlyPaymentCapacity.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderCreditTab = () => (
    <div className="space-y-6">
      {/* Credit Score */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ghb-dark thai-text">คะแนนเครดิต</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div
              className={`text-4xl font-bold mb-2 ${getCreditScoreColor(customerData.creditInfo.crbScore || 0)}`}
            >
              {customerData.creditInfo.crbScore || "ไม่มีข้อมูล"}
            </div>
            <Badge
              className={cn(
                "text-sm",
                customerData.creditInfo.crbScore &&
                  customerData.creditInfo.crbScore >= 650
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700",
              )}
            >
              {getCreditScoreLabel(customerData.creditInfo.crbScore || 0)}
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-ghb-gray thai-text">
                ประวัติการผิดนัดชำระ
              </span>
              <div className="flex items-center">
                {customerData.creditInfo.hasDefaultHistory ? (
                  <>
                    <AlertCircle className="w-4 h-4 text-red-500 mr-1" />
                    <span className="text-sm text-red-600 thai-text">มี</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600 thai-text">
                      ไม่มี
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-ghb-gray thai-text">
                ประวัติสินเชื่อ
              </span>
              <div className="flex items-center">
                {customerData.creditInfo.hasLoanHistory ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-blue-500 mr-1" />
                    <span className="text-sm text-blue-600 thai-text">มี</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-600 thai-text">
                      ไม่มี
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-ghb-gray thai-text">
                คุณภาพการชำระ
              </span>
              <Badge variant="outline" className="text-xs">
                {customerData.creditInfo.paymentHistory === "excellent"
                  ? "ดีเยี่ยม"
                  : customerData.creditInfo.paymentHistory === "good"
                    ? "ดี"
                    : customerData.creditInfo.paymentHistory === "fair"
                      ? "ปานกลาง"
                      : customerData.creditInfo.paymentHistory === "poor"
                        ? "ต้องปรับปรุง"
                        : "ไม่ทราบ"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alternative Data */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ghb-dark thai-text">
            ข้อมูลทางเลือก
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alternativeDataItems.map((item) => {
              const Icon = item.icon;
              const isActive = customerData.alternativeData[item.key];

              return (
                <div
                  key={item.key}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg",
                    isActive
                      ? "bg-green-50 border border-green-200"
                      : "bg-gray-50",
                  )}
                >
                  <div className="flex items-center">
                    <Icon
                      className={cn(
                        "w-5 h-5 mr-3",
                        isActive ? "text-green-500" : "text-gray-400",
                      )}
                    />
                    <span className="text-sm text-ghb-dark thai-text">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center">
                    {isActive ? (
                      <>
                        <Badge className="bg-green-100 text-green-700 border-green-200 mr-2">
                          +{item.points} คะแนน
                        </Badge>
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      </>
                    ) : (
                      <AlertCircle className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <Separator className="my-4" />

          <div className="text-center">
            <div className="text-2xl font-bold text-ghb-primary mb-1">
              +
              {alternativeDataItems
                .filter((item) => customerData.alternativeData[item.key])
                .reduce((sum, item) => sum + item.points, 0)}{" "}
              คะแนน
            </div>
            <p className="text-sm text-ghb-gray thai-text">จากข้อมูลทางเลือก</p>
          </div>
        </CardContent>
      </Card>

      {/* Credit Improvement Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ghb-dark thai-text">
            วิธีปรับปรุงคะแนนเครดิต
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 thai-text">
                  ชำระบิลตรงเวลา
                </h4>
                <p className="text-sm text-blue-700 thai-text">
                  ชำระค่าสาธารณูปโภคและบิลต่างๆ ทุกเดือน
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <PiggyBank className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-900 thai-text">
                  สร้างนิสัยการออม
                </h4>
                <p className="text-sm text-green-700 thai-text">
                  ออมเงินสม่ำเสมออย่างน้อย 10% ของรายได้
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
              <CreditCard className="w-5 h-5 text-purple-500 mt-0.5" />
              <div>
                <h4 className="font-semibold text-purple-900 thai-text">
                  ใช้บัตรเครดิตอย่างระมัดระวัง
                </h4>
                <p className="text-sm text-purple-700 thai-text">
                  ใช้ไม่เกิน 30% ของวงเงิน และชำระเต็มจำนวนทุกเดือน
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDocumentsTab = () => (
    <div className="space-y-6">
      {/* Document Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ghb-dark thai-text">สถานะเอกสาร</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-sm text-ghb-dark thai-text">
                  บัตรประชาชน
                </span>
              </div>
              <Badge className="bg-green-100 text-green-700">ยืนยันแล้ว</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-sm text-ghb-dark thai-text">ภ.พ.30</span>
              </div>
              <Badge className="bg-green-100 text-green-700">อัปโหลดแล้ว</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-yellow-500 mr-3" />
                <span className="text-sm text-ghb-dark thai-text">
                  Bank Statement
                </span>
              </div>
              <Badge className="bg-yellow-100 text-yellow-700">
                รอการตรวจสอบ
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-sm text-ghb-dark thai-text">
                  ใบเสร็จค่าสาธารณูปโภค
                </span>
              </div>
              <Badge variant="outline">ยังไม่ได้อัปโหลด</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ghb-dark thai-text">
            อัปโหลดเอกสารเพิ่มเติม
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full h-16 border-dashed border-2 thai-text"
              onClick={() => navigate("/document-upload")}
            >
              <FileText className="w-6 h-6 mr-2" />
              เลือกไฟล์เอกสาร
            </Button>

            <div className="text-center">
              <p className="text-sm text-ghb-gray thai-text">
                รองรับไฟล์ PDF, JPG, PNG ขนาดไม่เกิน 5MB
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ghb-dark thai-text">
            คำแนะนำการเตรียมเอกสาร
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-semibold text-ghb-dark thai-text">
                  เอกสารควรชัดเจน
                </h4>
                <p className="text-sm text-ghb-gray thai-text">
                  ถ่ายภาพหรือสแกนให้เห็นข้อมูลทุกส่วน ไม่เบลอ
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-semibold text-ghb-dark thai-text">
                  เอกสารต้องยังไม่หมดอายุ
                </h4>
                <p className="text-sm text-ghb-gray thai-text">
                  ตรวจสอบวันหมดอายุของบัตรประชาชนและเอกสารอื่นๆ
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-purple-500 mt-0.5" />
              <div>
                <h4 className="font-semibold text-ghb-dark thai-text">
                  ข้อมูลปลอดภัย
                </h4>
                <p className="text-sm text-ghb-gray thai-text">
                  เอกสารจะถูกเข้ารหัสและจัดเก็บอย่างปลอดภัย
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const tabs = [
    { key: "overview" as const, label: "ภาพรวม", icon: User },
    { key: "financial" as const, label: "การเงิน", icon: DollarSign },
    { key: "credit" as const, label: "เครดิต", icon: Star },
    { key: "documents" as const, label: "เอกสาร", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-ghb-light/30 via-white to-ghb-accent/5 pb-24">
      <Navbar />

      {/* Header */}
      <div className="pt-20 px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-ghb-dark thai-text">
                โปรไฟล์ลูกค้า
              </h1>
              <p className="text-ghb-gray thai-text">
                ข้อมูลและประวัติการประเมินของคุณ
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-1" />
                แก้ไข
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-1" />
                แชร์
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-white p-1 rounded-xl shadow-sm overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 min-w-fit thai-text",
                    activeTab === tab.key
                      ? "bg-ghb-primary text-white shadow-md"
                      : "text-ghb-gray hover:bg-gray-50",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="max-w-2xl mx-auto">
            {activeTab === "overview" && renderOverviewTab()}
            {activeTab === "financial" && renderFinancialTab()}
            {activeTab === "credit" && renderCreditTab()}
            {activeTab === "documents" && renderDocumentsTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
