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
import { Switch } from "@/components/ui/switch";
import { Navbar } from "@/components/Navbar";
import {
  Shield,
  TrendingUp,
  Zap,
  Smartphone,
  ShoppingCart,
  Truck,
  Users,
  PiggyBank,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Plus,
  Settings,
  Eye,
  Link as LinkIcon,
  Unlink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CreditSandbox = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock alternative data sources
  const [dataSources, setDataSources] = useState({
    utilities: {
      electricity: { connected: true, score: 85, months: 12 },
      water: { connected: true, score: 90, months: 12 },
      internet: { connected: true, score: 88, months: 8 },
      mobile: { connected: true, score: 92, months: 15 },
    },
    income: {
      shopee: { connected: true, score: 78, months: 6 },
      lazada: { connected: false, score: 0, months: 0 },
      grab: { connected: true, score: 82, months: 4 },
      foodpanda: { connected: false, score: 0, months: 0 },
      agriculture: { connected: true, score: 75, months: 24 },
    },
    financial: {
      dailySaving: { connected: true, score: 95, streak: 45 },
      groupSaving: { connected: true, score: 88, groups: 2 },
      financialPlanning: { connected: true, score: 72, activities: 8 },
      bankingApp: { connected: true, score: 85, frequency: "daily" },
    },
  });

  const ghbCreditScore = 725;
  const traditionalScore = 620;
  const scoreIncrease = ghbCreditScore - traditionalScore;

  const alternativeDataContribution = [
    {
      category: "การขำระค่าสาธารณูปโภค",
      points: 35,
      description: "ชำระตรงเวลา 12 เดือนต่อเนื่อง",
      icon: Zap,
      color: "bg-blue-500",
    },
    {
      category: "รายได้จาก E-commerce",
      points: 28,
      description: "รายได้สม่ำเสมอจาก 2 แพลตฟอร์ม",
      icon: ShoppingCart,
      color: "bg-green-500",
    },
    {
      category: "กิจกรรมการออมเงิน",
      points: 42,
      description: "ออมรายวัน + กลุ่มออม + วางแผนการเงิน",
      icon: PiggyBank,
      color: "bg-purple-500",
    },
  ];

  const toggleDataSource = (category: string, source: string) => {
    setDataSources((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [source]: {
          ...prev[category as keyof typeof prev][source],
          connected: !prev[category as keyof typeof prev][source].connected,
        },
      },
    }));
  };

  const DataSourceCard = ({
    title,
    description,
    connected,
    score,
    detail,
    onToggle,
    icon: Icon,
  }: {
    title: string;
    description: string;
    connected: boolean;
    score: number;
    detail: string;
    onToggle: () => void;
    icon: React.ElementType;
  }) => (
    <Card
      className={cn(
        "border-0 shadow-md transition-all duration-200",
        connected ? "bg-green-50 border-green-200" : "bg-gray-50",
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                connected ? "bg-green-100" : "bg-gray-100",
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5",
                  connected ? "text-green-600" : "text-gray-400",
                )}
              />
            </div>
            <div>
              <h3
                className={cn(
                  "font-semibold thai-text",
                  connected ? "text-green-800" : "text-gray-600",
                )}
              >
                {title}
              </h3>
              <p className="text-sm text-gray-600 thai-text">{description}</p>
            </div>
          </div>
          <Switch checked={connected} onCheckedChange={onToggle} />
        </div>

        {connected && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 thai-text">คะแนนการประเมิน</span>
              <span className="font-semibold text-green-600">{score}/100</span>
            </div>
            <Progress value={score} className="h-2" />
            <p className="text-xs text-gray-500 thai-text">{detail}</p>
          </div>
        )}

        {!connected && (
          <Button
            onClick={onToggle}
            className="w-full mt-2 bg-ghb-primary hover:bg-ghb-primary/90 thai-text"
          >
            <LinkIcon className="w-4 h-4 mr-2" />
            เชื่อมต่อข้อมูล
          </Button>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-ghb-light/30 via-white to-ghb-accent/5 pb-24">
      <Navbar />

      <div className="pt-20 px-4">
        {/* Header */}
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-ghb-dark thai-text mb-2">
            บัญชีเครดิตทดลอง
          </h1>
          <p className="text-ghb-gray thai-text">
            สร้าง GHB Credit Score ด้วยข้อมูลทางเลือก
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="overview" className="thai-text">
              ภาพรวม
            </TabsTrigger>
            <TabsTrigger value="data-sources" className="thai-text">
              ข้อมูลทางเลือก
            </TabsTrigger>
            <TabsTrigger value="history" className="thai-text">
              ประวัติ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* GHB Credit Score Overview */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-ghb-primary to-ghb-secondary text-white">
              <CardHeader className="!bg-[rgba(126,211,33,1)]">
                <CardTitle className="text-white thai-text text-xl">
                  GHB Credit Score ของคุณ
                </CardTitle>
                <CardDescription className="text-white/80 thai-text">
                  คำนวณจากข้อมูลทางเลือก 15 แหล่ง
                </CardDescription>
              </CardHeader>
              <CardContent className="!bg-[rgba(126,211,33,1)]">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-4xl font-bold text-white mb-2">
                      {ghbCreditScore}
                    </div>
                    <Badge className="bg-white/20 text-white border-0 mb-4">
                      เครดิตดีมาก
                    </Badge>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/80">
                          เครดิตแบบดั้งเดิม:
                        </span>
                        <span>{traditionalScore}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80 thai-text">
                          เพิ่มขึ้นจากข้อมูลทางเลือก:
                        </span>
                        <span className="text-green-200">
                          +{scoreIncrease} คะแนน
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-white mx-auto mb-2" />
                      <div className="text-lg font-semibold text-white">
                        +{scoreIncrease}
                      </div>
                      <div className="text-sm text-white/80 thai-text">
                        คะแนนเพิ่มขึ้น
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Score Breakdown */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-ghb-dark thai-text">
                แหล่งที่มาคะแนนเพิ่มเติม
              </h3>
              {alternativeDataContribution.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="border-0 shadow-md">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center`}
                          >
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-ghb-dark thai-text">
                              {item.category}
                            </h4>
                            <p className="text-sm text-ghb-gray thai-text">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">
                            +{item.points}
                          </div>
                          <div className="text-xs text-ghb-gray thai-text">
                            คะแนน
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Next Steps */}
            <Card className="border-0 shadow-md border-l-4 border-l-ghb-accent">
              <CardHeader>
                <CardTitle className="text-ghb-dark thai-text">
                  ขั้นตอนถัดไป
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-ghb-light/30 rounded-lg">
                    <Plus className="w-5 h-5 text-ghb-primary" />
                    <div>
                      <p className="font-medium text-ghb-dark thai-text">
                        เชื่อมต่อข้อมูลเพิ่มเติม
                      </p>
                      <p className="text-sm text-ghb-gray thai-text">
                        เพิ่มคะแนนได้อีกสูงสุด 50 คะแนน
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium text-ghb-dark thai-text">
                        สมัครสินเชื่อจำนวนเล็ก
                      </p>
                      <p className="text-sm text-ghb-gray thai-text">
                        คะแนนของคุณผ่านเกณฑ์แล้ว
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data-sources" className="space-y-6">
            {/* Utility Bills */}
            <div>
              <h3 className="text-lg font-semibold text-ghb-dark thai-text mb-4">
                การชำระค่าสาธารณูปโภค
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <DataSourceCard
                  title="ค่าไฟฟ้า"
                  description="การไฟฟ้านครหลวง (MEA)"
                  connected={dataSources.utilities.electricity.connected}
                  score={dataSources.utilities.electricity.score}
                  detail={`ชำระตรงเวลา ${dataSources.utilities.electricity.months} เดือน`}
                  onToggle={() => toggleDataSource("utilities", "electricity")}
                  icon={Zap}
                />
                <DataSourceCard
                  title="ค่าน้ำประปา"
                  description="การประปานครหลวง (MWA)"
                  connected={dataSources.utilities.water.connected}
                  score={dataSources.utilities.water.score}
                  detail={`ชำระตรงเวลา ${dataSources.utilities.water.months} เดือน`}
                  onToggle={() => toggleDataSource("utilities", "water")}
                  icon={Zap}
                />
                <DataSourceCard
                  title="ค่าอินเทอร์เน็ต"
                  description="True, AIS, 3BB และอื่นๆ"
                  connected={dataSources.utilities.internet.connected}
                  score={dataSources.utilities.internet.score}
                  detail={`ชำระตรงเวลา ${dataSources.utilities.internet.months} เดือน`}
                  onToggle={() => toggleDataSource("utilities", "internet")}
                  icon={Smartphone}
                />
                <DataSourceCard
                  title="ค่าโทรศัพท์มือถือ"
                  description="AIS, True, DTAC"
                  connected={dataSources.utilities.mobile.connected}
                  score={dataSources.utilities.mobile.score}
                  detail={`ชำระตรงเวลา ${dataSources.utilities.mobile.months} เดือน`}
                  onToggle={() => toggleDataSource("utilities", "mobile")}
                  icon={Smartphone}
                />
              </div>
            </div>

            {/* Income Sources */}
            <div>
              <h3 className="text-lg font-semibold text-ghb-dark thai-text mb-4">
                แหล่งรายได้ไม่เป็นทางการ
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <DataSourceCard
                  title="Shopee Seller"
                  description="รายได้จากการขายใน Shopee"
                  connected={dataSources.income.shopee.connected}
                  score={dataSources.income.shopee.score}
                  detail={`รายได้สม่ำเสมอ ${dataSources.income.shopee.months} เดือน`}
                  onToggle={() => toggleDataSource("income", "shopee")}
                  icon={ShoppingCart}
                />
                <DataSourceCard
                  title="Lazada Seller"
                  description="รายได้จากการขายใน Lazada"
                  connected={dataSources.income.lazada.connected}
                  score={dataSources.income.lazada.score}
                  detail="ยังไม่ได้เชื่อมต่อ"
                  onToggle={() => toggleDataSource("income", "lazada")}
                  icon={ShoppingCart}
                />
                <DataSourceCard
                  title="Grab Driver"
                  description="รายได้จาก Grab Food/Car"
                  connected={dataSources.income.grab.connected}
                  score={dataSources.income.grab.score}
                  detail={`ขับงานสม่ำเสมอ ${dataSources.income.grab.months} เดือน`}
                  onToggle={() => toggleDataSource("income", "grab")}
                  icon={Truck}
                />
                <DataSourceCard
                  title="งานเกษตรกรรม"
                  description="รายได้จากการเกษตร"
                  connected={dataSources.income.agriculture.connected}
                  score={dataSources.income.agriculture.score}
                  detail={`ประสบการณ์ ${dataSources.income.agriculture.months} เดือน`}
                  onToggle={() => toggleDataSource("income", "agriculture")}
                  icon={Truck}
                />
              </div>
            </div>

            {/* Financial Activities */}
            <div>
              <h3 className="text-lg font-semibold text-ghb-dark thai-text mb-4">
                กิจกรรมทางการเงิน
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <DataSourceCard
                  title="การออมรายวัน"
                  description="ออมเงินผ่านแอป GHB CreditBuilder"
                  connected={dataSources.financial.dailySaving.connected}
                  score={dataSources.financial.dailySaving.score}
                  detail={`ออมต่อเนื่อง ${dataSources.financial.dailySaving.streak} วัน`}
                  onToggle={() => toggleDataSource("financial", "dailySaving")}
                  icon={PiggyBank}
                />
                <DataSourceCard
                  title="การออมกลุ่ม"
                  description="เข้าร่วมกลุ่มออมเงิน"
                  connected={dataSources.financial.groupSaving.connected}
                  score={dataSources.financial.groupSaving.score}
                  detail={`เข้าร่วม ${dataSources.financial.groupSaving.groups} กลุ่ม`}
                  onToggle={() => toggleDataSource("financial", "groupSaving")}
                  icon={Users}
                />
                <DataSourceCard
                  title="การวางแผนการเงิน"
                  description="ใช้เครื่องมือวางแผนการเงิน"
                  connected={dataSources.financial.financialPlanning.connected}
                  score={dataSources.financial.financialPlanning.score}
                  detail={`ทำกิจกรรม ${dataSources.financial.financialPlanning.activities} ครั้ง`}
                  onToggle={() =>
                    toggleDataSource("financial", "financialPlanning")
                  }
                  icon={Calendar}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            {/* Score History */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-ghb-dark thai-text">
                  ประวัติคะแนนเครดิต
                </CardTitle>
                <CardDescription className="thai-text">
                  การเปลี่ยนแปลงคะแนนใน 6 เดือนที่ผ่านมา
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-ghb-dark thai-text">
                        มีนาคม 2024
                      </div>
                      <div className="text-sm text-ghb-gray thai-text">
                        เชื่อมต่อข้อมูล E-commerce
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600">
                        725
                      </div>
                      <div className="text-sm text-green-600">+28 คะแนน</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-ghb-dark thai-text">
                        กุมภาพันธ์ 2024
                      </div>
                      <div className="text-sm text-ghb-gray thai-text">
                        เริ่มออมรายวัน
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-blue-600">697</div>
                      <div className="text-sm text-blue-600">+42 คะแนน</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-ghb-dark thai-text">
                        มกราคม 2024
                      </div>
                      <div className="text-sm text-ghb-gray thai-text">
                        เชื่อมต่อข้อมูลค่าสาธารณูปโภค
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-yellow-600">
                        655
                      </div>
                      <div className="text-sm text-yellow-600">+35 คะแนน</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-ghb-dark thai-text">
                        ธันวาคม 2023
                      </div>
                      <div className="text-sm text-ghb-gray thai-text">
                        เครดิตแบบดั้งเดิม
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-600">620</div>
                      <div className="text-sm text-gray-600 thai-text">
                        ฐานเริ่มต้น
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Connection History */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-ghb-dark thai-text">
                  ประวัติการเชื่อมต่อข้อมูล
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-white border rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <div className="flex-1">
                      <p className="font-medium text-ghb-dark thai-text">
                        ค่าไฟฟ้า MEA
                      </p>
                      <p className="text-sm text-ghb-gray thai-text">
                        เชื่อมต่อเมื่อ 15 ม.ค. 2024
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-0">
                      เชื่อมต่อแล้ว
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-white border rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <div className="flex-1">
                      <p className="font-medium text-ghb-dark thai-text">
                        Shopee Seller
                      </p>
                      <p className="text-sm text-ghb-gray thai-text">
                        เชื่อมต่อเมื่อ 1 มี.ค. 2024
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-0">
                      เชื่อมต่อแล้ว
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-white border rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                    <div className="flex-1">
                      <p className="font-medium text-ghb-dark thai-text">
                        Lazada Seller
                      </p>
                      <p className="text-sm text-ghb-gray thai-text">
                        ยังไม่ได้เชื่อมต่อ
                      </p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-700 border-0">
                      รอดำเนินการ
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreditSandbox;
