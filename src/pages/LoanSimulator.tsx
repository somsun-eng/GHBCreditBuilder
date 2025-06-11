import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Navbar } from "@/components/Navbar";
import {
  Calculator,
  Home,
  GraduationCap,
  Briefcase,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  Clock,
  Shield,
  Info,
  Smartphone,
  Zap,
  CreditCard,
  PiggyBank,
} from "lucide-react";
import { cn } from "@/lib/utils";

const LoanSimulator = () => {
  const [activeTab, setActiveTab] = useState("calculator");
  const [loanAmount, setLoanAmount] = useState([500000]);
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [hasResults, setHasResults] = useState(false);

  // Alternative data checkboxes
  const [alternativeData, setAlternativeData] = useState({
    savingsHistory: false,
    utilityPayments: false,
    phonePayments: false,
    onlineActivity: false,
    socialMedia: false,
    ecommerce: false,
  });

  // Mock simulation results
  const simulationResults = {
    approvalProbability: 78,
    suggestedAmount: 450000,
    interestRate: 8.5,
    monthlyPayment: 12750,
    termMonths: 48,
    totalPayment: 612000,
    creditScore: 650,
  };

  const loanPurposes = [
    {
      value: "housing",
      label: "ที่อยู่อาศัย",
      icon: Home,
      color: "bg-blue-500",
    },
    {
      value: "education",
      label: "การศึกษา",
      icon: GraduationCap,
      color: "bg-green-500",
    },
    {
      value: "business",
      label: "ธุรกิจ",
      icon: Briefcase,
      color: "bg-purple-500",
    },
    {
      value: "emergency",
      label: "เหตุฉุกเฉิน",
      icon: AlertTriangle,
      color: "bg-red-500",
    },
  ];

  const employmentTypes = [
    { value: "formal", label: "พนักงานบริษัท", description: "มีสลิปเงินเดือน" },
    {
      value: "informal",
      label: "งานไม่เป็นทางการ",
      description: "รายได้ไม่คงที่",
    },
    { value: "freelance", label: "ฟรีแลนซ์", description: "ทำงานอิสระ" },
  ];

  const alternativeDataOptions = [
    {
      key: "savingsHistory",
      label: "ประวัติการออมเงิน",
      description: "มีการออมเงินสม่ำเสมอ",
      icon: PiggyBank,
      points: "+15 คะแนน",
    },
    {
      key: "utilityPayments",
      label: "จ่ายค่าสาธารณูปโภค",
      description: "จ่ายค่าน้ำ-ไฟตรงเวลา",
      icon: Zap,
      points: "+12 คะแนน",
    },
    {
      key: "phonePayments",
      label: "จ่ายค่าโทรศัพท์",
      description: "จ่ายค่าโทรศัพท์ตรงเวลา",
      icon: Smartphone,
      points: "+10 คะแนน",
    },
    {
      key: "onlineActivity",
      label: "กิจกรรมออนไลน์",
      description: "ใช้บริการธนาคารออนไลน์",
      icon: CreditCard,
      points: "+8 คะแนน",
    },
  ];

  const handleCalculate = () => {
    if (
      loanAmount[0] &&
      monthlyIncome &&
      monthlyExpenses &&
      loanPurpose &&
      employmentType
    ) {
      setHasResults(true);
      setActiveTab("results");
    }
  };

  const getApprovalColor = (probability: number) => {
    if (probability >= 80) return "text-green-600";
    if (probability >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getApprovalLevel = (probability: number) => {
    if (probability >= 80) return "สูง";
    if (probability >= 60) return "ปานกลาง";
    return "ต่ำ";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ghb-light/30 via-white to-ghb-accent/5 pb-24">
      <Navbar />

      <div className="pt-20 px-4">
        {/* Header */}
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-ghb-dark thai-text mb-2">
            จำลองการขอสินเชื่อ
          </h1>
          <p className="text-ghb-gray thai-text">
            ประเมินโอกาสการอนุมัติและเงื่อนไขสินเชื่อ
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="calculator" className="thai-text">
              คำนวณ
            </TabsTrigger>
            <TabsTrigger value="alternative" className="thai-text">
              ข้อมูลเพิ่มเติม
            </TabsTrigger>
            <TabsTrigger
              value="results"
              className="thai-text"
              disabled={!hasResults}
            >
              ผลลัพธ์
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            {/* Loan Amount */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-ghb-dark thai-text">
                  จำนวนเงินกู้ที่ต้องการ
                </CardTitle>
                <CardDescription className="thai-text">
                  เลื่อนเพื่อปรับจำนวนเงิน
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-ghb-primary mb-2">
                    ฿{loanAmount[0].toLocaleString()}
                  </div>
                  <Badge variant="outline" className="text-sm">
                    {loanAmount[0] <= 100000 && "เงินกู้น้อย"}
                    {loanAmount[0] > 100000 &&
                      loanAmount[0] <= 500000 &&
                      "เงินกู้ปานกลาง"}
                    {loanAmount[0] > 500000 && "เงินกู้สูง"}
                  </Badge>
                </div>
                <Slider
                  value={loanAmount}
                  onValueChange={setLoanAmount}
                  max={1000000}
                  min={50000}
                  step={10000}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-ghb-gray">
                  <span>฿50,000</span>
                  <span>฿1,000,000</span>
                </div>
              </CardContent>
            </Card>

            {/* Loan Purpose */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-ghb-dark thai-text">
                  วัตถุประสงค์การกู้
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
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
                        <div
                          className={`w-10 h-10 ${purpose.color} rounded-lg flex items-center justify-center mb-3`}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-semibold text-ghb-dark thai-text">
                          {purpose.label}
                        </h3>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Income & Expenses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-ghb-dark thai-text text-lg">
                    รายได้ต่อเดือน
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-ghb-gray">
                      ฿
                    </span>
                    <Input
                      type="number"
                      placeholder="25,000"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(e.target.value)}
                      className="pl-8 h-12 text-lg"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-ghb-dark thai-text text-lg">
                    รายจ่ายต่อเดือน
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-ghb-gray">
                      ฿
                    </span>
                    <Input
                      type="number"
                      placeholder="15,000"
                      value={monthlyExpenses}
                      onChange={(e) => setMonthlyExpenses(e.target.value)}
                      className="pl-8 h-12 text-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Employment Type */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-ghb-dark thai-text">
                  ประเภทการทำงาน
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {employmentTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setEmploymentType(type.value)}
                      className={cn(
                        "w-full p-4 rounded-xl border-2 transition-all duration-200 text-left",
                        employmentType === type.value
                          ? "border-ghb-primary bg-ghb-primary/5"
                          : "border-gray-200 hover:border-ghb-primary/50",
                      )}
                    >
                      <h3 className="font-semibold text-ghb-dark thai-text">
                        {type.label}
                      </h3>
                      <p className="text-sm text-ghb-gray thai-text">
                        {type.description}
                      </p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleCalculate}
              className="w-full h-12 bg-gradient-primary text-white font-semibold rounded-xl thai-text"
              disabled={
                !loanAmount[0] ||
                !monthlyIncome ||
                !monthlyExpenses ||
                !loanPurpose ||
                !employmentType
              }
            >
              คำนวณโอกาสการอนุมัติ
            </Button>
          </TabsContent>

          <TabsContent value="alternative" className="space-y-6">
            <Card className="border-0 shadow-md bg-gradient-to-r from-ghb-light to-white">
              <CardHeader>
                <CardTitle className="text-ghb-dark thai-text flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  ข้อมูลทางเลือกเพื่อเพิ่มคะแนน
                </CardTitle>
                <CardDescription className="thai-text">
                  ข้อมูลเหล่านี้จะช่วยเพิ่มโอกาสการอนุมัติสินเชื่อของคุณ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alternativeDataOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <div
                        key={option.key}
                        className="flex items-center space-x-4 p-4 rounded-xl border bg-white"
                      >
                        <Checkbox
                          id={option.key}
                          checked={
                            alternativeData[
                              option.key as keyof typeof alternativeData
                            ]
                          }
                          onCheckedChange={(checked) =>
                            setAlternativeData((prev) => ({
                              ...prev,
                              [option.key]: checked,
                            }))
                          }
                        />
                        <div className="w-10 h-10 bg-ghb-primary/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-ghb-primary" />
                        </div>
                        <div className="flex-1">
                          <label
                            htmlFor={option.key}
                            className="font-semibold text-ghb-dark thai-text cursor-pointer"
                          >
                            {option.label}
                          </label>
                          <p className="text-sm text-ghb-gray thai-text">
                            {option.description}
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-700 border-0">
                          {option.points}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md border-l-4 border-l-blue-500 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900 thai-text">
                      ทำไมข้อมูลเหล่านี้สำคัญ?
                    </h3>
                    <p className="text-sm text-blue-700 thai-text mt-1 leading-relaxed">
                      แม้ไม่มีประวัติเครดิตกับธนาคาร
                      แต่พฤติกรรมการเงินในชีวิตประจำวัน
                      สามารถแสดงให้เห็นถึงความรับผิดชอบและความสามารถในการชำระหนี้ได้
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            {hasResults && (
              <>
                {/* Approval Probability */}
                <Card className="border-0 shadow-lg bg-gradient-to-r from-white to-ghb-light/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-ghb-dark thai-text mb-2">
                          โอกาสการอนุมัติ
                        </h3>
                        <div
                          className={cn(
                            "text-3xl font-bold mb-2",
                            getApprovalColor(
                              simulationResults.approvalProbability,
                            ),
                          )}
                        >
                          {simulationResults.approvalProbability}%
                        </div>
                        <Badge
                          className={cn(
                            "text-sm",
                            simulationResults.approvalProbability >= 80
                              ? "bg-green-100 text-green-700"
                              : simulationResults.approvalProbability >= 60
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700",
                          )}
                        >
                          โอกาส
                          {getApprovalLevel(
                            simulationResults.approvalProbability,
                          )}
                        </Badge>
                      </div>
                      <ProgressRing
                        progress={simulationResults.approvalProbability}
                        size={100}
                        strokeWidth={8}
                        color={
                          simulationResults.approvalProbability >= 80
                            ? "#10B981"
                            : simulationResults.approvalProbability >= 60
                              ? "#F59E0B"
                              : "#EF4444"
                        }
                      >
                        <CheckCircle2 className="w-6 h-6 text-ghb-success" />
                      </ProgressRing>
                    </div>
                  </CardContent>
                </Card>

                {/* Loan Terms */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-ghb-dark thai-text">
                      เงื่อนไขสินเชื่อที่แนะนำ
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-ghb-light/50 rounded-xl">
                        <div className="flex items-center mb-2">
                          <DollarSign className="w-5 h-5 text-ghb-primary mr-2" />
                          <span className="text-sm text-ghb-gray thai-text">
                            จำนวนที่แนะนำ
                          </span>
                        </div>
                        <div className="text-xl font-bold text-ghb-dark">
                          ฿{simulationResults.suggestedAmount.toLocaleString()}
                        </div>
                      </div>

                      <div className="p-4 bg-ghb-accent/10 rounded-xl">
                        <div className="flex items-center mb-2">
                          <TrendingUp className="w-5 h-5 text-ghb-accent mr-2" />
                          <span className="text-sm text-ghb-gray thai-text">
                            อัตราดอกเบี้ย
                          </span>
                        </div>
                        <div className="text-xl font-bold text-ghb-dark">
                          {simulationResults.interestRate}%
                        </div>
                      </div>

                      <div className="p-4 bg-green-50 rounded-xl">
                        <div className="flex items-center mb-2">
                          <Calendar className="w-5 h-5 text-green-600 mr-2" />
                          <span className="text-sm text-ghb-gray thai-text">
                            ผ่อนต่อเดือน
                          </span>
                        </div>
                        <div className="text-xl font-bold text-ghb-dark">
                          ฿{simulationResults.monthlyPayment.toLocaleString()}
                        </div>
                      </div>

                      <div className="p-4 bg-purple-50 rounded-xl">
                        <div className="flex items-center mb-2">
                          <Clock className="w-5 h-5 text-purple-600 mr-2" />
                          <span className="text-sm text-ghb-gray thai-text">
                            ระยะเวลา
                          </span>
                        </div>
                        <div className="text-xl font-bold text-ghb-dark">
                          {simulationResults.termMonths} เดือน
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="border-0 shadow-md border-l-4 border-l-ghb-primary">
                  <CardHeader>
                    <CardTitle className="text-ghb-dark thai-text">
                      คำแนะนำเพื่อเพิ่มโอกาส
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-ghb-dark thai-text">
                            สร้างประวัติการออมเงิน
                          </p>
                          <p className="text-sm text-ghb-gray thai-text">
                            ออมเงินสม่ำเสมออย่างน้อย 3 เดือน
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-ghb-dark thai-text">
                            จ่ายบิลตรงเวลา
                          </p>
                          <p className="text-sm text-ghb-gray thai-text">
                            ชำระค่าสาธารณูปโภคและค่าโทรศัพท์ทุกเดือน
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-ghb-dark thai-text">
                            เพิ่มรายได้หรือลดรายจ่าย
                          </p>
                          <p className="text-sm text-ghb-gray thai-text">
                            ปรับปรุงอัตราส่วนหนี้ต่อรายได้ให้ดีขึ้น
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    className="flex-1 h-12 thai-text"
                    onClick={() => setActiveTab("calculator")}
                  >
                    คำนวณใหม่
                  </Button>
                  <Button
                    className="flex-1 h-12 bg-gradient-primary text-white thai-text"
                    onClick={() => (window.location.href = "/document-upload")}
                  >
                    เตรียมเอกสาร
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoanSimulator;
