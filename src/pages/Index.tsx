import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  TrendingUp,
  Award,
  Smartphone,
  CheckCircle,
  Star,
  Users,
  ArrowRight,
  Calculator,
  FileText,
  Clock,
  User,
  Briefcase,
  Building,
  Target,
  BarChart3,
  Lightbulb,
} from "lucide-react";
import LoanWizard from "@/components/LoanWizard";

const Index = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<
    "welcome" | "register" | "otp" | "loan_wizard"
  >("welcome");
  const [nationalId, setNationalId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const handleGetStarted = () => {
    setStep("register");
  };

  const handleRegister = () => {
    if (nationalId.length === 13 && phoneNumber.length === 10) {
      setStep("otp");
    }
  };

  const handleOtpVerify = () => {
    if (otp.length === 6) {
      setStep("loan_wizard");
    }
  };

  const handleLoanWizardComplete = () => {
    navigate("/dashboard");
  };

  const features = [
    {
      icon: Target,
      title: "ประเมินตามกระบวนการธนาคารจริง",
      description: "ใช้หลักเกณฑ์ DSR และการประเมินเหมือนธนาคาร ธอส.",
    },
    {
      icon: Users,
      title: "รองรับลูกค้า 3 ประเภท",
      description: "พนักงานประจำ, ฟรีแลนซ์, และลูกค้าสวัสดิการ",
    },
    {
      icon: BarChart3,
      title: "ข้อมูลทางเลือกเพิ่มคะแนน",
      description: "ใช้ประวัติการชำระบิล การออม เพิ่มโอกาสอนุมัติ",
    },
  ];

  const stats = [
    { number: "50,000+", label: "ผู้ใช้ที่เชื่อใจ" },
    { number: "95%", label: "ความแม่นยำในการประเมิน" },
    { number: "4.8", label: "คะแนนรีวิว", icon: Star },
  ];

  const processSteps = [
    {
      icon: User,
      title: "เลือกประเภทลูกค้า",
      description: "พนักงานประจำ / ฟรีแลนซ์ / สวัสดิการ",
      color: "bg-blue-500",
    },
    {
      icon: FileText,
      title: "กรอกข้อมูลการเงิน",
      description: "รายได้ รายจ่าย ภาระหนี้",
      color: "bg-green-500",
    },
    {
      icon: Calculator,
      title: "ประเมินตาม DSR",
      description: "คำนวณอัตราส่วนหนี้ต่อรายได้",
      color: "bg-purple-500",
    },
    {
      icon: CheckCircle,
      title: "ผลการประเมิน",
      description: "โอกาสอนุมัติ + คำแนะนำ",
      color: "bg-orange-500",
    },
  ];

  if (step === "loan_wizard") {
    return <LoanWizard onComplete={handleLoanWizardComplete} />;
  }

  if (step === "welcome") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[rgb(240,240,240)] via-white to-orange-50">
        {/* Hero Section */}
        <div className="pt-12 pb-8 px-4">
          <div className="text-center max-w-md mx-auto">
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{
                backgroundImage:
                  "url(https://cdn.builder.io/api/v1/image/assets%2F91b9f3dbf77d41fbbfce132c0e2bb455%2Ff402feef87b4479bb8f616b1c2cc1936)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />

            <h1 className="text-3xl font-bold text-[rgb(51,51,51)] mb-3 thai-text">
              GHB CreditBuilder
            </h1>

            <p className="text-lg text-[rgb(85,85,85)] mb-2 thai-text">
              จำลองการขอสินเชื่อแบบจริง
            </p>

            <p className="text-sm text-[rgb(119,119,119)] mb-8 thai-text leading-relaxed">
              ประเมินโอกาสการอนุมัติตามกระบวนการของธนาคาร ธอส.
              <br />
              รองรับทั้งพนักงานประจำ ฟรีแลนซ์ และลูกค้าสวัสดิการ
            </p>

            {/* Stats */}
            <div className="flex justify-center space-x-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <span className="text-xl font-bold text-[rgb(254,80,0)]">
                      {stat.number}
                    </span>
                    {stat.icon && (
                      <stat.icon className="w-4 h-4 text-yellow-500 ml-1" />
                    )}
                  </div>
                  <p className="text-xs text-[rgb(85,85,85)] thai-text">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="px-4 mb-8">
          <div className="max-w-md mx-auto">
            <h2 className="text-lg font-bold text-ghb-dark thai-text text-center mb-4">
              กระบวนการประเมิน
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Card
                    key={index}
                    className="border-0 shadow-sm bg-white/80 backdrop-blur"
                  >
                    <CardContent className="p-4 text-center">
                      <div
                        className={`w-10 h-10 ${step.color} rounded-xl flex items-center justify-center mx-auto mb-3`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-ghb-dark thai-text text-sm mb-1">
                        {step.title}
                      </h3>
                      <p className="text-xs text-ghb-gray thai-text leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="px-4 mb-8">
          <div className="max-w-md mx-auto space-y-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-sm bg-white/80 backdrop-blur"
              >
                <CardContent className="flex items-center p-4">
                  <div className="w-12 h-12 bg-ghb-primary/10 rounded-xl flex items-center justify-center mr-4">
                    <feature.icon className="w-6 h-6 text-ghb-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-ghb-dark thai-text mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-ghb-gray thai-text leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Customer Types Preview */}
        <div className="px-4 mb-8">
          <div className="max-w-md mx-auto">
            <Card className="border-l-4 border-l-ghb-primary bg-gradient-to-r from-ghb-primary/5 to-white">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="w-5 h-5 text-ghb-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-ghb-dark thai-text">
                      รองรับลูกค้า 3 ประเภท
                    </h3>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center">
                        <Briefcase className="w-3 h-3 text-blue-500 mr-2" />
                        <span className="text-sm text-ghb-gray thai-text">
                          พนักงานประจำ (DSR 1:3)
                        </span>
                      </div>
                      <div className="flex items-center">
                        <User className="w-3 h-3 text-purple-500 mr-2" />
                        <span className="text-sm text-ghb-gray thai-text">
                          ฟรีแลนซ์ (รายได้ย้อนหลัง)
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Building className="w-3 h-3 text-green-500 mr-2" />
                        <span className="text-sm text-ghb-gray thai-text">
                          สวัสดิการ (80% ของเงินเดือน)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="px-4 pb-8">
          <div className="max-w-md mx-auto">
            <Button
              onClick={handleGetStarted}
              className="w-full h-14 !bg-[#fc4f00] text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 thai-text"
            >
              เริ่มจำลองการขอสินเชื่อ
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <p className="text-center text-xs text-ghb-gray mt-4 thai-text">
              ประเมินฟรี • ไม่บันทึกข้อมูลส่วนตัว • ผลลัพธ์ทันที
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="px-4 pb-8">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-4 p-4 bg-white/50 rounded-xl">
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-ghb-success mr-2" />
                <span className="text-xs text-ghb-gray thai-text">
                  ตามมาตรฐานธนาคาร
                </span>
              </div>
              <div className="flex items-center">
                <Calculator className="w-4 h-4 text-ghb-accent mr-2" />
                <span className="text-xs text-ghb-gray thai-text">
                  คำนวณแม่นยำ
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-ghb-success mr-2" />
                <span className="text-xs text-ghb-gray thai-text">
                  ผลลัพธ์ทันที
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === "register") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[rgb(240,240,240)] via-white to-orange-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-xl font-bold text-ghb-dark thai-text">
              เริ่มต้นการประเมิน
            </CardTitle>
            <CardDescription className="thai-text">
              กรอกข้อมูลเพื่อเริ่มจำลองการขอสินเชื่อ
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-ghb-dark thai-text">
                หมายเลขบัตรประชาชน
              </label>
              <Input
                type="text"
                placeholder="1234567890123"
                value={nationalId}
                onChange={(e) =>
                  setNationalId(e.target.value.replace(/\D/g, "").slice(0, 13))
                }
                className="h-12 text-lg"
                maxLength={13}
              />
              <p className="text-xs text-ghb-gray thai-text">
                ใช้เพื่อจำลองการตรวจสอบเค���ดิต (ไม่บันทึกข้อมูลจริง)
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-ghb-dark thai-text">
                หมายเลขโทรศัพท์
              </label>
              <Input
                type="tel"
                placeholder="0812345678"
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                className="h-12 text-lg"
                maxLength={10}
              />
              <p className="text-xs text-ghb-gray thai-text">
                สำหรับติดต่อและการยืนยัน
              </p>
            </div>

            <Button
              onClick={handleRegister}
              disabled={nationalId.length !== 13 || phoneNumber.length !== 10}
              className="w-full h-12 !bg-[#fc4f00] text-white font-semibold rounded-xl thai-text"
            >
              ขอรหัส OTP
            </Button>

            <div className="flex items-center justify-center space-x-4 pt-4 border-t">
              <Badge variant="outline" className="text-xs thai-text">
                <Shield className="w-3 h-3 mr-1" />
                ข้อมูลปลอดภัย
              </Badge>
              <Badge variant="outline" className="text-xs thai-text">
                <CheckCircle className="w-3 h-3 mr-1" />
                ไม่มีค่าธรรมเนียม
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === "otp") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[rgb(240,240,240)] via-white to-orange-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-xl font-bold text-ghb-dark thai-text">
              ยืนยันหมายเลขโทรศัพท์
            </CardTitle>
            <CardDescription className="thai-text">
              กรอกรหัส 6 หลักที่ส่งไปยัง
              <br />
              <span className="font-semibold text-ghb-primary">
                {phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp}
                className="gap-2"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="w-12 h-12 text-lg" />
                  <InputOTPSlot index={1} className="w-12 h-12 text-lg" />
                  <InputOTPSlot index={2} className="w-12 h-12 text-lg" />
                  <InputOTPSlot index={3} className="w-12 h-12 text-lg" />
                  <InputOTPSlot index={4} className="w-12 h-12 text-lg" />
                  <InputOTPSlot index={5} className="w-12 h-12 text-lg" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              onClick={handleOtpVerify}
              disabled={otp.length !== 6}
              className="w-full h-12 !bg-[#fc4f00] text-white font-semibold rounded-xl thai-text"
            >
              เริ่มจำลองการขอสินเชื่อ
            </Button>

            <div className="text-center">
              <Button variant="ghost" className="text-sm thai-text">
                ส่งรหัสใหม่ (รอ 60 วินาที)
              </Button>
            </div>

            <div className="text-center pt-4 border-t">
              <p className="text-xs text-ghb-gray thai-text">
                ระบบจำลองเท่านั้น ไม่ได้เชื่อมต่อกับธนาคารจริง
                <br />
                ข้อมูลจะไม่ถูกบันทึกหรือนำไปใช้จริง
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

export default Index;
