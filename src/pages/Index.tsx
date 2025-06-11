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
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"welcome" | "register" | "otp">("welcome");
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
      navigate("/dashboard");
    }
  };

  const features = [
    {
      icon: Shield,
      title: "ปลอดภัยและเชื่อถือได้",
      description: "ข้อมูลของคุณได้รับการปกป้องด้วยมาตรฐานสากล",
    },
    {
      icon: TrendingUp,
      title: "สร้างเครดิตได้จริง",
      description: "ระบบวิเคราะห์ที่ช่วยพัฒนาคะแนนเครดิตของคุณ",
    },
    {
      icon: Award,
      title: "รางวัลและความสำเร็จ",
      description: "ทำภารกิจและรับรางวัลเพื่อสร้างแรงจูงใจ",
    },
  ];

  const stats = [
    { number: "50,000+", label: "ผู้ใช้ที่เชื่อใจ" },
    { number: "95%", label: "อัตราความสำเร็จ" },
    { number: "4.8", label: "คะแนนรีวิว", icon: Star },
  ];

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
              สร้างเครดิตที่ดีไปกับเรา
            </p>

            <p className="text-sm text-[rgb(119,119,119)] mb-8 thai-text leading-relaxed">
              แอปสำหรับฟรีแลนซ์และผู้ที่ต้องการสร้างประวัติเครดิตที่ดี
              <br />
              แม้ไม่มีประวัติกับธนาคาร
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

        {/* CTA */}
        <div className="px-4 pb-8">
          <div className="max-w-md mx-auto">
            <Button
              onClick={handleGetStarted}
              className="w-full h-14 !bg-[#fc4f00] text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 thai-text"
            >
              เริ่มต้นใช้งาน
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <p className="text-center text-xs text-ghb-gray mt-4 thai-text">
              การสมัครใช้งานฟรี • ไม่มีค่าธรรมเนียมแอบแฝง
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
                  ปลอดภัย 100%
                </span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 text-ghb-accent mr-2" />
                <span className="text-xs text-ghb-gray thai-text">ใช้ง่าย</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-ghb-success mr-2" />
                <span className="text-xs text-ghb-gray thai-text">
                  ผลลัพธ์จริง
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
              สมัครสมาชิก
            </CardTitle>
            <CardDescription className="thai-text">
              กรอกข้อมูลเพื่อเริ่มต้นสร้างเครดิต
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
                ใช้สำหรับยืนยันตัวตนอย่างปลอดภัย
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
                จะส่งรหัส OTP เพื่อยืนยัน
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
              ยืนยันและเข้าใช้งาน
            </Button>

            <div className="text-center">
              <Button variant="ghost" className="text-sm thai-text">
                ส่งรหัสใหม่ (รอ 60 วินาที)
              </Button>
            </div>

            <div className="text-center pt-4 border-t">
              <p className="text-xs text-ghb-gray thai-text">
                หากไม่ได้รับรหัส กรุณาตรวจสอบหมายเลขโทรศัพท์
                <br />
                หรือติดต่อทีมสนับสนุน
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
