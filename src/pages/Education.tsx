import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import {
  BookOpen,
  GraduationCap,
  Home,
  TrendingUp,
  Calculator,
  Star,
  Clock,
  CheckCircle2,
  Play,
  Lock,
  Award,
  Users,
  Target,
  PiggyBank,
  CreditCard,
  Shield,
  Lightbulb,
  Video,
  FileText,
  HelpCircle,
  Trophy,
  DollarSign,
  AlertTriangle,
  Camera,
  Smartphone,
  Info,
  User,
  Briefcase,
  ArrowRight,
  Download,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Education = () => {
  const [selectedCategory, setSelectedCategory] = useState("basics");
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("documents");

  const categories = [
    {
      id: "basics",
      title: "พื้นฐานการเงิน",
      icon: BookOpen,
      color: "bg-blue-500",
      description: "เรียนรู้หลักการเงินเบื้องต้น",
    },
    {
      id: "housing",
      title: "สินเชื่อบ้าน",
      icon: Home,
      color: "bg-green-500",
      description: "ทุกอย่างเกี่ยวกับการกู้ซื้อบ้าน",
    },
    {
      id: "investment",
      title: "การลงทุน",
      icon: TrendingUp,
      color: "bg-purple-500",
      description: "เริ่มต้นลงทุนอย่างมั่นใจ",
    },
    {
      id: "planning",
      title: "วางแผนการเงิน",
      icon: Calculator,
      color: "bg-orange-500",
      description: "วางแผนเงินให้มีเสถียรภาพ",
    },
    {
      id: "freelancer",
      title: "คู่มือฟรีแลนซ์",
      icon: Briefcase,
      color: "bg-pink-500",
      description: "คู่มือสินเชื่อสำหรับฟรีแลนซ์",
    },
  ];

  const lessons = {
    basics: [
      {
        id: "1",
        title: "เครดิตคืออะไร?",
        description: "ทำความเข้าใจคะแนนเครดิตและความสำคัญ",
        duration: 10,
        type: "article",
        difficulty: "beginner",
        completed: true,
        points: 25,
        icon: Shield,
      },
      {
        id: "2",
        title: "การจัดการหนี้อย่างชาญฉลาด",
        description: "เทคนิคการชำระหนี้และหลีกเลี่ยงหนี้เสีย",
        duration: 15,
        type: "video",
        difficulty: "beginner",
        completed: true,
        points: 30,
        icon: CreditCard,
      },
      {
        id: "3",
        title: "การออมเงินที่มีประสิทธิภาพ",
        description: "วิธีการออมเงินและสร้างกองทุนฉุกเฉิน",
        duration: 12,
        type: "article",
        difficulty: "beginner",
        completed: false,
        points: 25,
        icon: PiggyBank,
      },
      {
        id: "4",
        title: "ดอกเบี้ยและการคำนวณ",
        description: "เข้าใจดอกเบี้ยแบบต่างๆ และวิธีคำนวณ",
        duration: 20,
        type: "interactive",
        difficulty: "intermediate",
        completed: false,
        points: 40,
        icon: Calculator,
      },
    ],
    housing: [
      {
        id: "5",
        title: "เตรียมความพร้อมก่อนซื้อบ้าน",
        description: "สิ่งที่ต้องเตรียมก่อนตัดสินใจซื้อบ้าน",
        duration: 18,
        type: "article",
        difficulty: "intermediate",
        completed: false,
        points: 35,
        icon: Home,
      },
      {
        id: "6",
        title: "ประเภทสินเชื่อบ้าน",
        description: "เปรียบเทียบสินเชื่อบ้านแต่ละประเภท",
        duration: 25,
        type: "video",
        difficulty: "intermediate",
        completed: false,
        points: 45,
        icon: FileText,
      },
      {
        id: "7",
        title: "การประเมินมูลค่าบ้าน",
        description: "เข้าใจการประเมินราคาและปัจจัยที่มีผล",
        duration: 15,
        type: "article",
        difficulty: "advanced",
        completed: false,
        points: 50,
        icon: TrendingUp,
      },
    ],
    investment: [
      {
        id: "8",
        title: "การลงทุนเบื้องต้น",
        description: "หลักการลงทุนและการกระจายความเสี่ยง",
        duration: 22,
        type: "video",
        difficulty: "beginner",
        completed: false,
        points: 40,
        icon: TrendingUp,
      },
      {
        id: "9",
        title: "กองทุนรวมสำหรับมือใหม่",
        description: "เลือกกองทุนรวมที่เหมาะกับตัวคุณ",
        duration: 16,
        type: "interactive",
        difficulty: "intermediate",
        completed: false,
        points: 45,
        icon: Star,
      },
    ],
    planning: [
      {
        id: "10",
        title: "งบประมาณส่วนบุคคล",
        description: "สร้างงบประมาณและติดตามรายรับ-จ่าย",
        duration: 14,
        type: "interactive",
        difficulty: "beginner",
        completed: false,
        points: 30,
        icon: Calculator,
      },
      {
        id: "11",
        title: "การวางแผนเกษียณ",
        description: "เตรียมความพร้อมทางการเงินสำหรับวัยเกษียณ",
        duration: 28,
        type: "article",
        difficulty: "advanced",
        completed: false,
        points: 60,
        icon: Target,
      },
    ],
  };

  // Freelancer Guide Data
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
      description: "เอกสารส่วนตัวและหลักฐานที่อยู่",
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

  const userProgress = {
    totalLessons: Object.values(lessons).flat().length,
    completedLessons: Object.values(lessons)
      .flat()
      .filter((l) => l.completed).length,
    totalPoints: 55,
    currentStreak: 3,
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-700";
      case "intermediate":
        return "bg-yellow-100 text-yellow-700";
      case "advanced":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return Video;
      case "interactive":
        return HelpCircle;
      case "article":
        return FileText;
      default:
        return FileText;
    }
  };

  const LessonCard = ({ lesson }: { lesson: any }) => {
    const Icon = lesson.icon;
    const TypeIcon = getTypeIcon(lesson.type);

    return (
      <Card
        className={cn(
          "border-0 shadow-md transition-all duration-200 hover:shadow-lg cursor-pointer",
          lesson.completed && "bg-green-50 border-green-200",
          !lesson.completed &&
            selectedLesson === lesson.id &&
            "ring-2 ring-ghb-primary",
        )}
        onClick={() => setSelectedLesson(lesson.id)}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start space-x-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  lesson.completed ? "bg-green-100" : "bg-ghb-primary/10",
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5",
                    lesson.completed ? "text-green-600" : "text-ghb-primary",
                  )}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-ghb-dark thai-text leading-tight">
                  {lesson.title}
                </h3>
                <p className="text-sm text-ghb-gray thai-text mt-1 leading-relaxed">
                  {lesson.description}
                </p>
              </div>
            </div>
            {lesson.completed ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <Play className="w-5 h-5 text-ghb-primary" />
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TypeIcon className="w-4 h-4 text-ghb-gray" />
              <span className="text-xs text-ghb-gray">
                {lesson.duration} นาที
              </span>
              <Badge className={getDifficultyColor(lesson.difficulty)}>
                {lesson.difficulty === "beginner" && "เริ่มต้น"}
                {lesson.difficulty === "intermediate" && "กลาง"}
                {lesson.difficulty === "advanced" && "สูง"}
              </Badge>
            </div>
            <Badge
              variant="secondary"
              className="bg-ghb-primary/10 text-ghb-primary border-0"
            >
              +{lesson.points} คะแนน
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Freelancer Guide Component
  const FreelancerGuideContent = () => (
    <div className="space-y-6">
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
                              <div key={tipIndex} className="flex items-start">
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
                    <span className="font-bold text-ghb-primary">฿43,667</span>
                  </div>
                </div>
                <p className="text-sm text-ghb-gray thai-text mt-3">
                  ธนาคารจะใช้รายได้เฉลี่ย ฿43,667 ในการคำนวณความสามารถผ่อนชำระ
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
                    <div className="font-bold text-ghb-primary">6+ เดือน</div>
                    <div className="text-ghb-gray thai-text">
                      รายได้สม่ำเสมอ
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <div className="font-bold text-ghb-primary">30%+</div>
                    <div className="text-ghb-gray thai-text">อัตราการออม</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <div className="font-bold text-ghb-primary">0</div>
                    <div className="text-ghb-gray thai-text">ครั้งที่ติดลบ</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <div className="font-bold text-ghb-primary">3+ ช่องทาง</div>
                    <div className="text-ghb-gray thai-text">แหล่งรายได้</div>
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
  );

  if (selectedLesson) {
    const lesson = Object.values(lessons)
      .flat()
      .find((l) => l.id === selectedLesson);
    if (lesson) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-ghb-light/30 via-white to-ghb-accent/5 pb-24">
          <Navbar />

          <div className="pt-20 px-4">
            <div className="max-w-2xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedLesson(null)}
                  className="thai-text"
                >
                  ← กลับ
                </Button>
                <Badge variant="outline" className="thai-text">
                  <Clock className="w-3 h-3 mr-1" />
                  {lesson.duration} นาที
                </Badge>
              </div>

              {/* Lesson Content */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-ghb-primary/10 rounded-xl flex items-center justify-center">
                      <lesson.icon className="w-6 h-6 text-ghb-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-ghb-dark thai-text">
                        {lesson.title}
                      </CardTitle>
                      <CardDescription className="thai-text">
                        {lesson.description}
                      </CardDescription>
                    </div>
                  </div>
                  <Progress value={65} className="h-2" />
                  <p className="text-sm text-ghb-gray thai-text">
                    ความคืบหน้า 65%
                  </p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Mock lesson content */}
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-semibold text-ghb-dark thai-text">
                      {lesson.title}
                    </h3>
                    <p className="text-ghb-gray thai-text leading-relaxed">
                      เครดิต หรือ Credit
                      คือความน่าเชื่อถือทางการเงินของบุคคลหรือนิติบุคคล
                      ในการชำระหนี้ตามกำหนดเวลา
                      โดยสถาบันการเงินจะประเมินจากประวัติการใช้เงิน
                      และการชำระหนี้ในอดีต
                    </p>

                    <h4 className="text-base font-semibold text-ghb-dark thai-text mt-6">
                      ทำไมเครดิตถึงสำคัญ?
                    </h4>
                    <ul className="list-disc list-inside text-ghb-gray thai-text space-y-2">
                      <li>ช่วยในการขอสินเชื่อจากธนาคาร</li>
                      <li>ได้อัตราดอกเบี้ยที่ดีกว่า</li>
                      <li>เพิ่มความน่าเชื่อถือในการทำธุรกรรมทางการเงิน</li>
                      <li>สามารถเข้าถึงบริการทางการเงินได้มากขึ้น</li>
                    </ul>

                    <div className="bg-ghb-light/50 p-4 rounded-lg mt-6">
                      <h4 className="text-base font-semibold text-ghb-dark thai-text flex items-center">
                        <Lightbulb className="w-4 h-4 mr-2" />
                        เคล็ดลับการสร้างเครดิตที่ดี
                      </h4>
                      <ol className="list-decimal list-inside text-ghb-gray thai-text mt-3 space-y-1">
                        <li>ชำระหนี้ตรงเวลาทุกครั้ง</li>
                        <li>ไม่ใช้เครดิตเกินกำลัง</li>
                        <li>มีบัญชีธนาคารและใช้งานสม่ำเสมอ</li>
                        <li>จ่ายค่าสาธารณูปโภคตรงเวลา</li>
                      </ol>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-6 border-t">
                    <Button variant="outline" className="flex-1 thai-text">
                      บันทึกหน้านี้
                    </Button>
                    <Button className="flex-1 bg-gradient-primary text-white thai-text">
                      เสร็จสิ้นบทเรียน
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      );
    }
  }

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
            เพิ่มความรู้ทางการเงินเพื่อสร้างอนาคตที่มั่นคง
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-ghb-primary to-ghb-secondary text-white mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2 thai-text">
                  ความคืบหน้าของคุณ
                </h3>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    <span>
                      {userProgress.completedLessons}/
                      {userProgress.totalLessons} บทเรียน
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    <span>{userProgress.totalPoints} คะแนน</span>
                  </div>
                  <div className="flex items-center">
                    <Target className="w-4 h-4 mr-1" />
                    <span>{userProgress.currentStreak} วันต่อเนื่อง</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {Math.round(
                    (userProgress.completedLessons /
                      userProgress.totalLessons) *
                      100,
                  )}
                  %
                </div>
                <div className="text-sm opacity-90">เสร็จสิ้นแล้ว</div>
              </div>
            </div>
            <Progress
              value={
                (userProgress.completedLessons / userProgress.totalLessons) *
                100
              }
              className="mt-4 h-2 bg-white/20"
            />
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "p-4 rounded-xl border-2 transition-all duration-200 text-left",
                  isActive
                    ? "border-ghb-primary bg-ghb-primary/5"
                    : "border-gray-200 hover:border-ghb-primary/50 bg-white",
                )}
              >
                <div
                  className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-3`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-ghb-dark thai-text mb-1">
                  {category.title}
                </h3>
                <p className="text-xs text-ghb-gray thai-text leading-relaxed">
                  {category.description}
                </p>
                <div className="mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {category.id === "freelancer"
                      ? "4 หัวข้อ"
                      : `${lessons[category.id as keyof typeof lessons]?.length || 0} บทเรียน`}
                  </Badge>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content */}
        {selectedCategory === "freelancer" ? (
          <FreelancerGuideContent />
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ghb-dark thai-text">
                {categories.find((c) => c.id === selectedCategory)?.title}
              </h2>
              <Badge variant="outline" className="thai-text">
                {lessons[selectedCategory as keyof typeof lessons]?.filter(
                  (l) => l.completed,
                ).length || 0}{" "}
                เสร็จแล้ว
              </Badge>
            </div>

            <div className="space-y-3">
              {lessons[selectedCategory as keyof typeof lessons]?.map(
                (lesson) => <LessonCard key={lesson.id} lesson={lesson} />,
              ) || (
                <p className="text-ghb-gray thai-text">ไม่มีบทเรียนในหมวดนี้</p>
              )}
            </div>
          </div>
        )}

        {/* Achievement Section */}
        <Card className="mt-6 border-0 shadow-md bg-gradient-to-r from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="text-ghb-dark thai-text flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-purple-600" />
              รางวัลการเรียนรู้
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="w-10 h-10 bg-bronze rounded-full flex items-center justify-center mx-auto mb-2 bg-yellow-100">
                  <Award className="w-5 h-5 text-yellow-600" />
                </div>
                <p className="text-xs font-medium text-ghb-dark thai-text">
                  นักเรียนใหม่
                </p>
                <p className="text-xs text-ghb-gray thai-text">
                  เรียน 3 บทเรียน
                </p>
              </div>

              <div className="text-center p-3 bg-white rounded-lg opacity-50">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-xs font-medium text-ghb-dark thai-text">
                  นักเรียนเก่ง
                </p>
                <p className="text-xs text-ghb-gray thai-text">
                  เรียน 10 บทเรียน
                </p>
              </div>

              <div className="text-center p-3 bg-white rounded-lg opacity-50">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-xs font-medium text-ghb-dark thai-text">
                  ผู้เชี่ยวชาญ
                </p>
                <p className="text-xs text-ghb-gray thai-text">
                  เรียนครบทุกหมวด
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Education;
