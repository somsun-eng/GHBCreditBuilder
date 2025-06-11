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
  Target,
  PiggyBank,
  BookOpen,
  CreditCard,
  Star,
  Trophy,
  Clock,
  CheckCircle2,
  Play,
  Calendar,
  Zap,
  Award,
  TrendingUp,
  Shield,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Missions = () => {
  const [activeTab, setActiveTab] = useState("daily");

  const dailyMissions = [
    {
      id: "1",
      title: "บันทึกรายจ่ายวันนี้",
      description: "เพิ่มรายการใช้จ่ายอย่างน้อย 1 รายการ",
      icon: PiggyBank,
      difficulty: "easy",
      points: 10,
      progress: 80,
      timeLeft: "6 ชั่วโมง",
      status: "active",
      category: "spending",
    },
    {
      id: "2",
      title: "ตรวจสอบยอดเงินในบัญชี",
      description: "เชื่อมต่อและดูยอดเงินในบัญชีธนาคาร",
      icon: CreditCard,
      difficulty: "easy",
      points: 15,
      progress: 100,
      timeLeft: "เสร็จแล้ว",
      status: "completed",
      category: "banking",
    },
    {
      id: "3",
      title: "เรียนรู้เรื่องดอกเบี้ย",
      description: "อ่านบทเรียน 'ดอกเบี้ยคืออะไร'",
      icon: BookOpen,
      difficulty: "medium",
      points: 25,
      progress: 0,
      timeLeft: "12 ชั่วโมง",
      status: "available",
      category: "education",
    },
  ];

  const weeklyMissions = [
    {
      id: "4",
      title: "ออมเงิน 7 วันต่อเนื่อง",
      description: "บันทึกการออมเงินทุกวันเป็นเวลา 1 สัปดาห์",
      icon: Target,
      difficulty: "medium",
      points: 100,
      progress: 71, // 5/7 days
      timeLeft: "2 วัน",
      status: "active",
      category: "savings",
    },
    {
      id: "5",
      title: "จ่ายบิลครบทุกรายการ",
      description: "ชำระค่าน้ำ ค่าไฟ และค่าโทรศัพท์ตรงเวลา",
      icon: CheckCircle2,
      difficulty: "easy",
      points: 75,
      progress: 33, // 1/3 bills
      timeLeft: "3 วัน",
      status: "active",
      category: "payment",
    },
    {
      id: "6",
      title: "เรียนจบคอร์ส 'เครดิตเบื้องต้น'",
      description: "ทำแบบทดสอบผ่านอย่างน้อย 80%",
      icon: Award,
      difficulty: "hard",
      points: 200,
      progress: 45,
      timeLeft: "4 วัน",
      status: "active",
      category: "education",
    },
  ];

  const specialMissions = [
    {
      id: "7",
      title: "นักสร้างเครดิตมือใหม่",
      description: "ทำภารกิจครบ 10 ภารกิจ (สะสม)",
      icon: Trophy,
      difficulty: "hard",
      points: 500,
      progress: 80, // 8/10 missions
      timeLeft: "ไม่จำกัด",
      status: "active",
      category: "achievement",
    },
    {
      id: "8",
      title: "เชิญเพื่อนร่วมสร้าง���ครดิต",
      description: "เชิญเพื่อน 3 คนมาใช้แอป",
      icon: Users,
      difficulty: "medium",
      points: 300,
      progress: 33, // 1/3 friends
      timeLeft: "30 วัน",
      status: "active",
      category: "social",
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-700 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "hard":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "active":
        return <Play className="w-5 h-5 text-blue-500" />;
      case "available":
        return <Clock className="w-5 h-5 text-gray-400" />;
      default:
        return <Target className="w-5 h-5 text-gray-400" />;
    }
  };

  const MissionCard = ({
    mission,
    isSpecial = false,
  }: {
    mission: any;
    isSpecial?: boolean;
  }) => {
    const Icon = mission.icon;

    return (
      <Card
        className={cn(
          "border-0 shadow-md transition-all duration-200 hover:shadow-lg",
          mission.status === "completed" && "bg-green-50 border-green-200",
          isSpecial &&
            "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200",
        )}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start space-x-3">
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  mission.status === "completed"
                    ? "bg-green-100"
                    : "bg-ghb-primary/10",
                )}
              >
                <Icon
                  className={cn(
                    "w-6 h-6",
                    mission.status === "completed"
                      ? "text-green-600"
                      : "text-ghb-primary",
                  )}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-ghb-dark thai-text leading-tight">
                  {mission.title}
                </h3>
                <p className="text-sm text-ghb-gray thai-text mt-1 leading-relaxed">
                  {mission.description}
                </p>
              </div>
            </div>
            {getStatusIcon(mission.status)}
          </div>

          <div className="flex items-center space-x-2 mb-3">
            <Badge className={getDifficultyColor(mission.difficulty)}>
              {mission.difficulty === "easy" && "ง่าย"}
              {mission.difficulty === "medium" && "ปานกลาง"}
              {mission.difficulty === "hard" && "ยาก"}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-ghb-primary/10 text-ghb-primary border-0"
            >
              +{mission.points} คะแนน
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Clock className="w-3 h-3 mr-1" />
              {mission.timeLeft}
            </Badge>
          </div>

          {mission.status !== "completed" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ghb-gray thai-text">ความคืบหน้า</span>
                <span className="font-medium text-ghb-dark">
                  {mission.progress}%
                </span>
              </div>
              <Progress value={mission.progress} className="h-2" />
            </div>
          )}

          {mission.status === "completed" && (
            <div className="flex items-center justify-center p-2 bg-green-100 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-green-700 font-medium thai-text">
                เสร็จสิ้นแล้ว
              </span>
            </div>
          )}

          {mission.status === "available" && (
            <Button className="w-full mt-3 bg-ghb-primary hover:bg-ghb-primary/90 thai-text">
              เริ่มภารกิจ
            </Button>
          )}

          {mission.status === "active" && mission.progress < 100 && (
            <Button variant="outline" className="w-full mt-3 thai-text">
              ดำเนินการต่อ
            </Button>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ghb-light/30 via-white to-ghb-accent/5 pb-24">
      <Navbar />

      <div className="pt-20 px-4">
        {/* Header */}
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-ghb-dark thai-text mb-2">
            ภารกิจสร้างเครดิต
          </h1>
          <p className="text-ghb-gray thai-text">
            ทำภารกิจเพื่อรับคะแนนและสร้างเครดิตที่ดี
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="border-0 shadow-md text-center">
            <CardContent className="p-4">
              <Zap className="w-6 h-6 text-ghb-warning mx-auto mb-2" />
              <div className="text-lg font-bold text-ghb-dark">2,340</div>
              <p className="text-xs text-ghb-gray thai-text">คะแนนวันนี้</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md text-center">
            <CardContent className="p-4">
              <Trophy className="w-6 h-6 text-ghb-primary mx-auto mb-2" />
              <div className="text-lg font-bold text-ghb-dark">15</div>
              <p className="text-xs text-ghb-gray thai-text">ภารกิจเสร็จ</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md text-center">
            <CardContent className="p-4">
              <Star className="w-6 h-6 text-ghb-success mx-auto mb-2" />
              <div className="text-lg font-bold text-ghb-dark">7</div>
              <p className="text-xs text-ghb-gray thai-text">วันต่อเนื่อง</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="daily" className="thai-text">
              รายวัน
            </TabsTrigger>
            <TabsTrigger value="weekly" className="thai-text">
              รายสัปดาห์
            </TabsTrigger>
            <TabsTrigger value="special" className="thai-text">
              พิเศษ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ghb-dark thai-text">
                ภารกิจรายวัน
              </h2>
              <Badge className="bg-ghb-accent/10 text-ghb-accent border-0">
                <Calendar className="w-3 h-3 mr-1" />
                วันนี้
              </Badge>
            </div>
            <div className="space-y-4">
              {dailyMissions.map((mission) => (
                <MissionCard key={mission.id} mission={mission} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ghb-dark thai-text">
                ภารกิจรายสัปดาห์
              </h2>
              <Badge className="bg-ghb-primary/10 text-ghb-primary border-0">
                <TrendingUp className="w-3 h-3 mr-1" />
                สัปดาห์นี้
              </Badge>
            </div>
            <div className="space-y-4">
              {weeklyMissions.map((mission) => (
                <MissionCard key={mission.id} mission={mission} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="special" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ghb-dark thai-text">
                ภารกิจพิเศษ
              </h2>
              <Badge className="bg-purple-100 text-purple-700 border-0">
                <Shield className="w-3 h-3 mr-1" />
                สะสม
              </Badge>
            </div>
            <div className="space-y-4">
              {specialMissions.map((mission) => (
                <MissionCard key={mission.id} mission={mission} isSpecial />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Mission Categories Info */}
        <Card className="mt-6 border-0 shadow-md bg-gradient-to-r from-ghb-light to-white">
          <CardHeader>
            <CardTitle className="text-ghb-dark thai-text flex items-center">
              <Award className="w-5 h-5 mr-2" />
              หมวดหมู่ภารกิจ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <PiggyBank className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-ghb-dark thai-text">การออม</p>
                  <p className="text-xs text-ghb-gray thai-text">
                    สร้างนิสัยออมเงิน
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-ghb-dark thai-text">
                    การเรียนรู้
                  </p>
                  <p className="text-xs text-ghb-gray thai-text">
                    เพิ่มความรู้ทางการเงิน
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-ghb-dark thai-text">การชำระ</p>
                  <p className="text-xs text-ghb-gray thai-text">
                    จ่ายบิลตรงเวลา
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-ghb-dark thai-text">
                    ความสำเร็จ
                  </p>
                  <p className="text-xs text-ghb-gray thai-text">
                    ปลดล็อกรางวัลพิเศษ
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Missions;
