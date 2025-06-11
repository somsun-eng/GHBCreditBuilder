import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Layout } from "@/components/Layout";
import {
  TrendingUp,
  Target,
  Award,
  PiggyBank,
  CreditCard,
  Star,
  Shield,
  MessageCircle,
  CheckCircle,
  Plus,
} from "lucide-react";

const Dashboard = () => {
  // Mock data
  const creditScore = 650;
  const ghbCreditScore = 725;
  const currentStreak = 7;
  const ghbPoints = 850;
  const monthsInProgram = 8;
  const creditLadderProgress = 75;
  const nextMicroCredit = 15000;

  const quickActions = [
    {
      title: "ภารกิจใหม่",
      description: "มี 3 ภารกิจรอคุณอยู่",
      icon: Target,
      color: "bg-[rgb(254,80,0)]",
      link: "/missions",
    },
    {
      title: "เครดิตทดลอง",
      description: "จัดการข้อมูลทางเลือกของคุณ",
      icon: Shield,
      color: "bg-green-600",
      link: "/credit-sandbox",
    },
    {
      title: "จำลองสินเชื่อ",
      description: "ดูความเป็นไปได้ในการอนุมัติ",
      icon: CreditCard,
      color: "bg-blue-600",
      link: "/loan-simulator",
    },
    {
      title: "เรียนรู้",
      description: "บทเรียนใหม่เพิ่มแล้ว",
      icon: Award,
      color: "bg-purple-600",
      link: "/education",
    },
    {
      title: "อัปโหลดเอกสาร",
      description: "เตรียมเอกสารสำหรับสินเชื่อ",
      icon: Plus,
      color: "bg-orange-600",
      link: "/document-upload",
    },
    {
      title: "ผู้ช่วย AI",
      description: "ปรึกษาเรื่องเครดิตและสินเชื่อ",
      icon: MessageCircle,
      color: "bg-indigo-600",
      link: "/chat",
    },
  ];

  return (
    <Layout className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[rgb(240,240,240)] to-white py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="text-center lg:text-left mb-6 lg:mb-0">
                <h1 className="text-3xl lg:text-4xl font-bold text-[rgb(51,51,51)] thai-text mb-3">
                  สวัสดี คุณสมชาย! 👋
                </h1>
                <p className="text-[rgb(85,85,85)] thai-text text-lg">
                  วันนี้เป็นวันที่ดีในการสร้างเครดิต
                </p>
              </div>
              <div className="flex items-center space-x-6 text-[rgb(85,85,85)]">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[rgb(254,80,0)]">
                    {currentStreak}
                  </div>
                  <div className="text-sm thai-text">วันต่อเนื่อง</div>
                </div>
                <div className="w-px h-12 bg-[rgb(238,238,238)]"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[rgb(254,80,0)]">
                    {ghbPoints.toLocaleString()}
                  </div>
                  <div className="text-sm thai-text">GHB Points</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 space-y-12 mb-20">
        {/* Credit Score Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* GHB Credit Score Card */}
            <Card className="border border-[rgb(238,238,238)] shadow-lg overflow-hidden">
              <CardHeader className="bg-[rgb(254,80,0)] text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white thai-text text-xl mb-2">
                      GHB Credit Score
                    </CardTitle>
                    <p className="text-white/90 thai-text text-sm">
                      คำนวณจากข้อมูลทางเลือก +75 คะแนน
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <TrendingUp className="w-8 h-8 text-white mb-2" />
                    <Badge className="bg-white/20 text-white border-0 text-xs">
                      Alternative Data
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="bg-white p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-4xl font-bold text-[rgb(51,51,51)] mb-2">
                      {ghbCreditScore}
                    </div>
                    <div className="text-sm text-[rgb(85,85,85)] thai-text">
                      เครดิตแบบดั้งเดิม: {creditScore}
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-0 mt-2">
                      เครดิตดีมาก
                    </Badge>
                  </div>
                  <Star className="w-12 h-12 text-[rgb(254,80,0)]" />
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-[rgb(240,240,240)] rounded-lg p-3">
                    <div className="text-[rgb(85,85,85)] thai-text">
                      ชำระค่าสาธารณูปโภค
                    </div>
                    <div className="text-[rgb(51,51,51)] font-semibold">
                      ✓ ตรงเวลา 12 เดือน
                    </div>
                  </div>
                  <div className="bg-[rgb(240,240,240)] rounded-lg p-3">
                    <div className="text-[rgb(85,85,85)] thai-text">
                      รายได้ E-commerce
                    </div>
                    <div className="text-[rgb(51,51,51)] font-semibold">
                      ✓ สม่ำเสมอ
                    </div>
                  </div>
                  <div className="bg-[rgb(240,240,240)] rounded-lg p-3">
                    <div className="text-[rgb(85,85,85)] thai-text">
                      การออมในแอป
                    </div>
                    <div className="text-[rgb(51,51,51)] font-semibold">
                      ✓ ทุกวัน {currentStreak} วัน
                    </div>
                  </div>
                  <div className="bg-[rgb(240,240,240)] rounded-lg p-3">
                    <div className="text-[rgb(85,85,85)] thai-text">
                      กิจกรรมการเงิน
                    </div>
                    <div className="text-[rgb(51,51,51)] font-semibold">
                      ✓ กลุ่มออม
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Credit Ladder Progress Card */}
            <Card className="border border-[rgb(238,238,238)] shadow-lg">
              <CardHeader className="border-b border-[rgb(238,238,238)] bg-[rgb(240,240,240)]">
                <CardTitle className="text-[rgb(51,51,51)] thai-text flex items-center">
                  <Target className="w-6 h-6 mr-3 text-[rgb(254,80,0)]" />
                  บันไดเครดิต GHB
                </CardTitle>
                <p className="thai-text text-[rgb(85,85,85)] text-sm">
                  สร้างวินัยการเงินเดือนที่ {monthsInProgram}/12 เดือน
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[rgb(85,85,85)] thai-text">
                      ความคืบหน้า
                    </span>
                    <span className="font-semibold text-[rgb(254,80,0)]">
                      {creditLadderProgress}%
                    </span>
                  </div>
                  <Progress value={creditLadderProgress} className="h-3" />
                </div>

                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="text-sm text-[rgb(51,51,51)] thai-text font-medium">
                    🎉 ขั้นต่อไป: ปลดล็อกสินเชื่อจำนวนเล็ก
                  </p>
                  <p className="text-xs text-[rgb(85,85,85)] thai-text mt-1">
                    วงเงินถึง ฿{nextMicroCredit.toLocaleString()} ดอกเบี้ยพิเศษ
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-[rgb(240,240,240)] py-12 -mx-4">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-[rgb(51,51,51)] thai-text mb-8 text-center">
              บริการของเรา
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link key={index} to={action.link}>
                    <Card className="border border-[rgb(238,238,238)] shadow-lg hover:shadow-xl transition-all duration-200 bg-white">
                      <CardContent className="p-6 text-center">
                        <div
                          className={`w-16 h-16 ${action.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-semibold text-[rgb(51,51,51)] thai-text text-lg mb-2">
                          {action.title}
                        </h3>
                        <p className="text-[rgb(85,85,85)] thai-text text-sm leading-relaxed">
                          {action.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Dashboard;
