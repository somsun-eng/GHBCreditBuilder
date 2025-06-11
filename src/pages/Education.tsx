import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Camera,
  Smartphone,
  Calculator,
  TrendingUp,
  Shield,
  Info,
  User,
  Briefcase,
  Star,
  ArrowRight,
  Download,
  Eye,
  GraduationCap,
} from "lucide-react";

const Education = () => {
  const [activeSection, setActiveSection] = useState("documents");

  const documentGuide = [
    {
      title: "Statement บัญชีธนาคาร",
      priority: "สำคัญที่สุด",
      period: "6-12 เดือนล่าสุด",
      icon: FileText,
      color: "bg-green-500",
      description: "แสดงเงินเข้า-ออกจริง เป็นหลักฐานที่ธนาคารเชื่อถือมากที่สุด",
      tips: [
        "พิมพ์แบบเต็มหน้า ไม่ตัดเฉพาะส่วน",
        "ควรมีการเข้าเงินสม่ำเสมอ",
        "ยอดคงเหลือไม่ควรติดลบบ่อย",
        "หากมีหลายบัญชี ให้นำมาทุกบัญชี",
      ],
    },
    {
      title: "ภ.พ.30 / แบบแสดงรายการภาษี",
      priority: "จำเป็น",
      period: "ปีล่าสุด",
      icon: Calculator,
      color: "bg-blue-500",
      description: "หลักฐานรายได้ที่ยื่นต่อกรมสรรพากร",
      tips: [
        "ถ้าไม่เคยยื่น ให้ไปยื่นก่อน",
        "ใช้ e-Filing สะดวกกว่า",
        "รายได้ในภ.พ.30 ควรสอดคล้องกับ Statement",
        "หากรายได้น้อย ธนาคารจะดู Statement เป็นหลัก",
      ],
    },
    {
      title: "หลักฐานการทำงาน",
      priority: "เสริม",
      period: "งานล่าสุด",
      icon: Briefcase,
      color: "bg-purple-500",
      description: "สัญญาจ้าง ใบเสนอราคา หรือหลักฐานจากแพลตฟอร์ม",
      tips: [
        "Screenshot รายได้จาก Upwork, Fiverr",
        "สัญญาจ้างงานกับลูกค้า",
        "ใบเสร็จ Invoice ที่ออกให้ลูกค้า",
        "รีวิวและเรตติ้งจากลูกค้า",
      ],
    },
    {
      title: "เอกสารประกอบ",
      priority: "เสริม",
      period: "ปัจจุบัน",
      icon: User,
      color: "bg-orange-500",
      description: "เอกสารส่วนตัวและหลักฐ���นที่อยู่",
      tips: [
        "สำเนาบัตรประชาชน",
        "สำเนาทะเบียนบ้าน",
        "ใบเสร็จค่าสาธารณูปโภค",
        "รูปถ่ายที่ทำงาน (Home Office)",
      ],
    },
  ];

  const incomeAnalysis = [
    {
      title: "รายได้สม่ำเสมอ",
      description: "มีเงินเข้าทุกเดือน แม้จำนวนไม่เท่ากัน",
      score: "โอกาสสูง",
      color: "text-green-600",
      tips: "ธนาคารชอบความสม่ำเสมอ มากกว่าจำนวนเงิน",
    },
    {
      title: "รายได้เติบโต",
      description: "รายได้มีแนวโน้มเพิ่มขึ้นเรื่อยๆ",
      score: "โอกาสสูง",
      color: "text-green-600",
      tips: "แสดงให้เห็นว่าธุรกิจของคุณเติบโต",
    },
    {
      title: "รายได้ผันผวน",
      description: "บางเดือนมาก บางเดือนน้อย หรือไม่มีเลย",
      score: "โอกาสกลาง",
      color: "text-yellow-600",
      tips: "ธนาคารจะดูค่าเฉลี่ย แต่อาจให้วงเงินน้อยกว่า",
    },
    {
      title: "รายได้ลดลง",
      description: "รายได้มีแนวโน้มลดลงในช่วง 3-6 เดือนล่าสุด",
      score: "โอกาสต่ำ",
      color: "text-red-600",
      tips: "ควรรอให้รายได้กลับมาเสถียรก่อน",
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: "เตรียมเอกสาร",
      description: "รวบรวมเอกสารตามรายการ",
      timeframe: "1-2 สัปดาห์",
      status: "active",
    },
    {
      step: 2,
      title: "ยื่นคำขอ",
      description: "ยื่นผ่านสาขาหรือออนไลน์",
      timeframe: "1 วัน",
      status: "pending",
    },
    {
      step: 3,
      title: "ตรวจสอบเอกสาร",
      description: "เจ้าหน้าที่ตรวจสอบความครบถ้วน",
      timeframe: "2-3 วัน",
      status: "pending",
    },
    {
      step: 4,
      title: "ประเมินรายได้",
      description: "วิเคราะห์รายได้ย้อนหลัง 6-12 เดือน",
      timeframe: "3-5 วัน",
      status: "pending",
    },
    {
      step: 5,
      title: "ตรวจสอบเครดิต",
      description: "เช็คประวัติเครดิตจาก CRB",
      timeframe: "1 วัน",
      status: "pending",
    },
    {
      step: 6,
      title: "อนุมัติ/ไม่อนุมัติ",
      description: "ได้รับผลการพิจารณา",
      timeframe: "1-2 วัน",
      status: "pending",
    },
  ];

  const commonMistakes = [
    {
      mistake: "Statement ไม่ครบ 6 เดือน",
      impact: "ธนาคารไม่สามารถประเมินรายได้ได้",
      solution: "รอให้ครบ 6 เดือน หรือใช้เอกสารเสริมอื่น",
    },
    {
      mistake: "รายได้ในภ.พ.30 ต่างจาก Statement มาก",
      impact: "ธนาคารสงสัยความถูกต้อง",
      solution: "อธิบายเหตุผลให้ชัดเจน เช่น มีรายได้เพิ่มในช่วงหลัง",
    },
    {
      mistake: "ไม่มีการออมเงิน",
      impact: "แสดงว่าไม่มีวินัยทางการเงิน",
      solution: "เริ่มออมเงินสม่ำเสมอ อย่างน้อย 3 เดือนก่อนยื่นกู้",
    },
    {
      mistake: "ยอดบัญชีติดลบบ่อย",
      impact: "แสดงการจัดการเงินไม่ดี",
      solution: "วางแผนการเงินให้มียอดคงเหลือเป็นบวกเสมอ",
    },
  ];

  const successTips = [
    {
      tip: "สร้างรายได้หลายช่องทาง",
      description: "ไม่พึ่งลูกค้าคนเดียว แต่มีลูกค้าหลายคน",
      icon: TrendingUp,
    },
    {
      tip: "เก็บหลักฐานการทำงาน",
      description: "ถ่ายภาพที่ทำงาน เก็บ Chat กับลูกค้า",
      icon: Camera,
    },
    {
      tip: "ใช้บัญชีธนาคารเป็นระบบ",
      description: "ใช้บัญชีเดียวรับเงิน มีการออมแยกต่างหาก",
      icon: DollarSign,
    },
    {
      tip: "สร้างประวัติเครดิต",
      description: "สมัครบัตรเครดิต ใช้และชำระตรงเวลา",
      icon: Star,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-ghb-light/30 via-white to-ghb-accent/5 pb-24">
      <Navbar />

      <div className="pt-20 px-4">
        {/* Header */}
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-ghb-dark thai-text mb-2">
            ศูนย์การเรียนรู้
          </h1>
          <p className="text-ghb-gray thai-text">
            คู่มือสินเชื่อสำหรับฟรีแลนซ์ และความรู้ทางการเงิน
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs
            value={activeSection}
            onValueChange={setActiveSection}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
              <TabsTrigger value="documents" className="thai-text">
                เอกสาร
              </TabsTrigger>
              <TabsTrigger value="income" className="thai-text">
                รายได้
              </TabsTrigger>
              <TabsTrigger value="process" className="thai-text">
                ขั้นตอน
              </TabsTrigger>
              <TabsTrigger value="tips" className="thai-text">
                เคล็ดลับ
              </TabsTrigger>
            </TabsList>

            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-ghb-dark thai-text">
                    เอกสารที่ต้องเตรียม
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {documentGuide.map((doc, index) => {
                      const Icon = doc.icon;
                      return (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start space-x-4">
                            <div
                              className={`w-12 h-12 ${doc.color} rounded-xl flex items-center justify-center`}
                            >
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="font-bold text-ghb-dark thai-text">
                                  {doc.title}
                                </h3>
                                <Badge
                                  className={`text-xs ${doc.priority === "สำคัญที่สุด" ? "bg-red-100 text-red-700" : doc.priority === "จำเป็น" ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-700"}`}
                                >
                                  {doc.priority}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {doc.period}
                                </Badge>
                              </div>
                              <p className="text-sm text-ghb-gray thai-text mb-3">
                                {doc.description}
                              </p>
                              <div className="space-y-1">
                                <h4 className="font-semibold text-ghb-dark thai-text text-sm">
                                  💡 เคล็ดลับ:
                                </h4>
                                {doc.tips.map((tip, tipIndex) => (
                                  <div
                                    key={tipIndex}
                                    className="flex items-start"
                                  >
                                    <div className="w-1 h-1 bg-ghb-primary rounded-full mt-2 mr-2" />
                                    <span className="text-sm text-ghb-gray thai-text">
                                      {tip}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-blue-900 thai-text">
                        หมายเหตุสำคัญ
                      </h3>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-blue-700 thai-text">
                          • เอกสารทั้งหมดต้องเป็นฉบับจริง
                          หรือสำเนาที่ผู้มีอำนาจรับรอง
                        </p>
                        <p className="text-sm text-blue-700 thai-text">
                          • ธนาคารอาจขอเอกสารเพิ่มเติมได้ตามความเหมาะสม
                        </p>
                        <p className="text-sm text-blue-700 thai-text">
                          • ยิ่งมีเอกสารครบถ้วน โอกาสอนุมัติยิ่งสูง
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="income" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-ghb-dark thai-text">
                    ธนาคารดูรายได้อย่างไร?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {incomeAnalysis.map((item, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-ghb-dark thai-text">
                            {item.title}
                          </h3>
                          <Badge
                            className={`text-xs ${item.color === "text-green-600" ? "bg-green-100 text-green-700" : item.color === "text-yellow-600" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}
                          >
                            {item.score}
                          </Badge>
                        </div>
                        <p className="text-sm text-ghb-gray thai-text mb-2">
                          {item.description}
                        </p>
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-sm text-ghb-dark thai-text">
                            💡 <strong>เคล็ดลับ:</strong> {item.tips}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-ghb-dark thai-text">
                    ตัวอย่างการคำนวณ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-ghb-dark thai-text mb-3">
                      กรณี: ฟรีแลนซ์ Graphic Designer
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-ghb-gray thai-text">
                          รายได้เดือน 1:
                        </span>
                        <span className="font-medium">฿45,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ghb-gray thai-text">
                          รายได้เดือน 2:
                        </span>
                        <span className="font-medium">฿38,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ghb-gray thai-text">
                          รายได้เดือน 3:
                        </span>
                        <span className="font-medium">฿52,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ghb-gray thai-text">
                          รายได้เดือน 4:
                        </span>
                        <span className="font-medium">฿41,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ghb-gray thai-text">
                          รายได้เดือน 5:
                        </span>
                        <span className="font-medium">฿47,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ghb-gray thai-text">
                          รายได้เดือน 6:
                        </span>
                        <span className="font-medium">฿39,000</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between">
                        <span className="font-semibold text-ghb-dark thai-text">
                          รายได้เฉลี่ย:
                        </span>
                        <span className="font-bold text-ghb-primary">
                          ฿43,667
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-ghb-gray thai-text mt-3">
                      ธนาคารจะใช้รายได้เฉลี่ย ฿43,667
                      ในการคำนวณความสามารถผ่อนชำระ
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="process" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-ghb-dark thai-text">
                    ขั้นตอนการขอสินเชื่อ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {processSteps.map((step, index) => (
                      <div
                        key={index}
                        className={`flex items-start space-x-4 p-4 rounded-lg ${step.status === "active" ? "bg-blue-50 border border-blue-200" : "bg-gray-50"}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${step.status === "active" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"} font-bold text-sm`}
                        >
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-ghb-dark thai-text">
                            {step.title}
                          </h3>
                          <p className="text-sm text-ghb-gray thai-text">
                            {step.description}
                          </p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {step.timeframe}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-ghb-dark thai-text">
                    ข้อผิดพลาดที่ควรหลีกเลี่ยง
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {commonMistakes.map((item, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-l-red-500 bg-red-50 p-4"
                      >
                        <h4 className="font-semibold text-red-900 thai-text mb-1">
                          ❌ {item.mistake}
                        </h4>
                        <p className="text-sm text-red-700 thai-text mb-2">
                          <strong>ผลกระทบ:</strong> {item.impact}
                        </p>
                        <p className="text-sm text-red-700 thai-text">
                          <strong>วิธีแก้:</strong> {item.solution}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tips" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-ghb-dark thai-text">
                    เคล็ดลับเพิ่มโอกาสอนุมัติ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {successTips.map((tip, index) => {
                      const Icon = tip.icon;
                      return (
                        <div
                          key={index}
                          className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border border-green-200"
                        >
                          <Icon className="w-6 h-6 text-green-500 mt-0.5" />
                          <div>
                            <h3 className="font-semibold text-green-900 thai-text">
                              {tip.tip}
                            </h3>
                            <p className="text-sm text-green-700 thai-text">
                              {tip.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-ghb-primary bg-gradient-to-r from-ghb-primary/5 to-white">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="font-bold text-ghb-dark thai-text mb-4">
                      🎯 เป้าหมายสำหรับฟรีแลนซ์
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="p-3 bg-white rounded-lg">
                        <div className="font-bold text-ghb-primary">
                          6+ เดือน
                        </div>
                        <div className="text-ghb-gray thai-text">
                          รายได้สม่ำเสมอ
                        </div>
                      </div>
                      <div className="p-3 bg-white rounded-lg">
                        <div className="font-bold text-ghb-primary">30%+</div>
                        <div className="text-ghb-gray thai-text">
                          อัตราการออม
                        </div>
                      </div>
                      <div className="p-3 bg-white rounded-lg">
                        <div className="font-bold text-ghb-primary">0</div>
                        <div className="text-ghb-gray thai-text">
                          ครั้งที่ติดลบ
                        </div>
                      </div>
                      <div className="p-3 bg-white rounded-lg">
                        <div className="font-bold text-ghb-primary">
                          3+ ช่องทาง
                        </div>
                        <div className="text-ghb-gray thai-text">
                          แหล่งรายได้
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1 h-12 thai-text"
                  onClick={() => window.history.back()}
                >
                  กลับหน้าหลัก
                </Button>
                <Button
                  className="flex-1 h-12 bg-gradient-primary text-white thai-text"
                  onClick={() => window.open("/", "_blank")}
                >
                  เริ่มประเมินโอกาส
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Education;
