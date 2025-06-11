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
} from "lucide-react";
import { cn } from "@/lib/utils";

const Education = () => {
  const [selectedCategory, setSelectedCategory] = useState("basics");
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

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
                      เครดิตคืออะไร?
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
                    {lessons[category.id as keyof typeof lessons].length}{" "}
                    บทเรียน
                  </Badge>
                </div>
              </button>
            );
          })}
        </div>

        {/* Lessons */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-ghb-dark thai-text">
              {categories.find((c) => c.id === selectedCategory)?.title}
            </h2>
            <Badge variant="outline" className="thai-text">
              {
                lessons[selectedCategory as keyof typeof lessons].filter(
                  (l) => l.completed,
                ).length
              }{" "}
              เสร็จแล้ว
            </Badge>
          </div>

          <div className="space-y-3">
            {lessons[selectedCategory as keyof typeof lessons].map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </div>

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
