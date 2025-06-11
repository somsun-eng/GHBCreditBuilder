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
import { Checkbox } from "@/components/ui/checkbox";
import { Navbar } from "@/components/Navbar";
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
  Eye,
  Download,
  Camera,
  FolderOpen,
  Users,
  CreditCard,
  Home,
  Building,
  FileImage,
  Shield,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DocumentFile {
  name: string;
  size: number;
  type: string;
  uploaded: boolean;
  uploadDate?: Date;
  url?: string;
}

interface DocumentCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  required: boolean;
  documents: DocumentType[];
}

interface DocumentType {
  id: string;
  name: string;
  description: string;
  required: boolean;
  files: DocumentFile[];
  maxFiles: number;
  acceptedTypes: string[];
}

const DocumentUpload = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [uploadProgress, setUploadProgress] = useState(0);

  // Mock document state
  const [documentCategories, setDocumentCategories] = useState<
    DocumentCategory[]
  >([
    {
      id: "personal",
      title: "เอกสารส่วนบุคคล",
      description: "เอกสารแสดงตัวตนและสถานะส่วนบุคคล",
      icon: Users,
      color: "bg-blue-500",
      required: true,
      documents: [
        {
          id: "id_card",
          name: "บัตรประจำตัวประชาชน",
          description: "สำเนาบัตรประชาชนหน้า-หลัง ชัดเจน",
          required: true,
          files: [
            {
              name: "บัตรประชาชน_หน้า.jpg",
              size: 2.1,
              type: "image/jpeg",
              uploaded: true,
              uploadDate: new Date(),
              url: "#",
            },
          ],
          maxFiles: 2,
          acceptedTypes: ["image/jpeg", "image/png", "application/pdf"],
        },
        {
          id: "house_registration",
          name: "ทะเบียนบ้าน",
          description: "สำเนาทะเบียนบ้านที่มีชื่อผู้กู้",
          required: true,
          files: [],
          maxFiles: 1,
          acceptedTypes: ["image/jpeg", "image/png", "application/pdf"],
        },
        {
          id: "marriage_cert",
          name: "ทะเบียนสมรส / ใบหย่า / ใบมรณะบัตร",
          description: "กรณีมีคู่สมรส หรือเป็นหม้าย/หย่าร้าง",
          required: false,
          files: [],
          maxFiles: 1,
          acceptedTypes: ["image/jpeg", "image/png", "application/pdf"],
        },
        {
          id: "name_change",
          name: "ใบเปลี่ยนชื่อ-สกุล",
          description: "กรณีเคยเปลี่ยนชื่อ-นามสกุล",
          required: false,
          files: [],
          maxFiles: 1,
          acceptedTypes: ["image/jpeg", "image/png", "application/pdf"],
        },
        {
          id: "spouse_id",
          name: "บัตรประชาชนคู่สมรส",
          description: "สำเนาบัตรประชาชนคู่สมรสหน้า-หลัง",
          required: false,
          files: [],
          maxFiles: 2,
          acceptedTypes: ["image/jpeg", "image/png", "application/pdf"],
        },
      ],
    },
    {
      id: "financial",
      title: "เอกสารทางการเงิน",
      description: "สำหรับผู้ประกอบอาชีพอิสระ",
      icon: CreditCard,
      color: "bg-green-500",
      required: true,
      documents: [
        {
          id: "bank_statement",
          name: "บัญชีเงินฝากย้อนหลัง 12 เดือน",
          description: "สำเนาบัญชีเงินฝาก พร้อมเอกสารฉบับจริง",
          required: true,
          files: [],
          maxFiles: 5,
          acceptedTypes: ["image/jpeg", "image/png", "application/pdf"],
        },
        {
          id: "business_registration",
          name: "ทะเบียนการค้า / ทะเบียนบริษัท",
          description: "ทะเบียนการค้า บริษัท หรือห้างหุ้นส่วน",
          required: true,
          files: [],
          maxFiles: 2,
          acceptedTypes: ["image/jpeg", "image/png", "application/pdf"],
        },
        {
          id: "tax_document",
          name: "หลักฐานการเสียภาษีเงินได้",
          description: "หลักฐานการยื่นภาษีเงินได้ปีล่าสุด",
          required: true,
          files: [],
          maxFiles: 3,
          acceptedTypes: ["image/jpeg", "image/png", "application/pdf"],
        },
        {
          id: "business_photos",
          name: "รูปถ่ายกิจการ",
          description: "รูปถ่ายหน้าร้าน สถานที่ประกอบธุรกิจ",
          required: true,
          files: [],
          maxFiles: 5,
          acceptedTypes: ["image/jpeg", "image/png"],
        },
        {
          id: "professional_license",
          name: "ใบประกอบวิชาชีพ",
          description: "กรณีเปลี่ยนนวิชาชีพที่ต้องมีใบประกอบวิชาชีพ",
          required: false,
          files: [],
          maxFiles: 2,
          acceptedTypes: ["image/jpeg", "image/png", "application/pdf"],
        },
      ],
    },
    {
      id: "collateral",
      title: "เอกสารหลักประกัน",
      description: "เอกสารเกี่ยวกับที่ดินและอาคาร",
      icon: Home,
      color: "bg-purple-500",
      required: true,
      documents: [
        {
          id: "sale_contract",
          name: "สัญญาจะซื้อจะขาย / สัญญาวางมัดจำ",
          description:
            "สัญญาเช่าซื้อการเคหะและหนังสือรับรองยอดคงเหลือ (กรณีซื้อ)",
          required: true,
          files: [],
          maxFiles: 3,
          acceptedTypes: ["image/jpeg", "image/png", "application/pdf"],
        },
        {
          id: "refinance_docs",
          name: "สัญญากู้เงินและสัญญาจำนองเดิม",
          description: "กรณีไถ่ถอนจำนอง - สัญญากับสถาบันการเงินเดิม",
          required: false,
          files: [],
          maxFiles: 3,
          acceptedTypes: ["image/jpeg", "image/png", "application/pdf"],
        },
        {
          id: "ownership_proof",
          name: "หลักฐานการเป็นเจ้าของอาคาร",
          description: "เอกสารแสดงกรรมสิทธิ์อาคาร",
          required: true,
          files: [],
          maxFiles: 2,
          acceptedTypes: ["image/jpeg", "image/png", "application/pdf"],
        },
        {
          id: "land_sale_contract",
          name: "สัญญาขายที่ดินฉบับกรมที่ดิน",
          description: "สำเนาหนังสือสัญญาขายที่ดินฉบับกรมที่ดิน",
          required: true,
          files: [],
          maxFiles: 2,
          acceptedTypes: ["image/jpeg", "image/png", "application/pdf"],
        },
        {
          id: "land_title",
          name: "โฉนดที่ดิน / น.ส.3ก. / กรรมสิทธิ์ห้องชุด",
          description:
            "โฉนดที่ดิน น.ส.3ก. หรือ หนังสือแสดงกรรมสิทธิ์ห้องชุด (อช.2) ทุกหน้า",
          required: true,
          files: [],
          maxFiles: 5,
          acceptedTypes: ["image/jpeg", "image/png", "application/pdf"],
        },
        {
          id: "building_permit",
          name: "ใบอนุญาตปลูกสร้าง / ต่อเติม",
          description: "ใบอนุญาตจากหน่วยงานราชการ",
          required: true,
          files: [],
          maxFiles: 2,
          acceptedTypes: ["image/jpeg", "image/png", "application/pdf"],
        },
        {
          id: "building_plan",
          name: "แบบแปลน",
          description: "แบบแปลนการก่อสร้าง",
          required: true,
          files: [],
          maxFiles: 3,
          acceptedTypes: ["image/jpeg", "image/png", "application/pdf"],
        },
        {
          id: "construction_estimate",
          name: "ใบประมาณการปลูกสร้าง / สัญญาว่าจ้างก่อสร้าง",
          description: "ประมาณการค่าใช้จ่ายในการก่อสร้าง",
          required: true,
          files: [],
          maxFiles: 3,
          acceptedTypes: ["image/jpeg", "image/png", "application/pdf"],
        },
        {
          id: "other_docs",
          name: "เอกสารอื่นๆ",
          description: "เอกสารเพิ่มเติมตามที่ธนาคารร้องขอ",
          required: false,
          files: [],
          maxFiles: 5,
          acceptedTypes: ["image/jpeg", "image/png", "application/pdf"],
        },
      ],
    },
  ]);

  const handleFileUpload = (
    categoryId: string,
    documentId: string,
    files: FileList | null,
  ) => {
    if (!files) return;

    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Update document state
    setTimeout(() => {
      setDocumentCategories((prev) =>
        prev.map((cat) =>
          cat.id === categoryId
            ? {
                ...cat,
                documents: cat.documents.map((doc) =>
                  doc.id === documentId
                    ? {
                        ...doc,
                        files: [
                          ...doc.files,
                          ...Array.from(files).map((file) => ({
                            name: file.name,
                            size: file.size / 1024 / 1024, // Convert to MB
                            type: file.type,
                            uploaded: true,
                            uploadDate: new Date(),
                            url: URL.createObjectURL(file),
                          })),
                        ],
                      }
                    : doc,
                ),
              }
            : cat,
        ),
      );
      setUploadProgress(0);
    }, 2000);
  };

  const removeFile = (
    categoryId: string,
    documentId: string,
    fileName: string,
  ) => {
    setDocumentCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              documents: cat.documents.map((doc) =>
                doc.id === documentId
                  ? {
                      ...doc,
                      files: doc.files.filter((file) => file.name !== fileName),
                    }
                  : doc,
              ),
            }
          : cat,
      ),
    );
  };

  const getCompletionStats = () => {
    const allDocs = documentCategories.flatMap((cat) => cat.documents);
    const requiredDocs = allDocs.filter((doc) => doc.required);
    const completedRequired = requiredDocs.filter(
      (doc) => doc.files.length > 0,
    );
    const totalFiles = allDocs.reduce((sum, doc) => sum + doc.files.length, 0);

    return {
      requiredCompleted: completedRequired.length,
      totalRequired: requiredDocs.length,
      totalFiles,
      completionPercentage: Math.round(
        (completedRequired.length / requiredDocs.length) * 100,
      ),
    };
  };

  const stats = getCompletionStats();

  const DocumentUploadCard = ({
    categoryId,
    document,
  }: {
    categoryId: string;
    document: DocumentType;
  }) => (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-base text-ghb-dark thai-text flex items-center">
              <FileText className="w-4 h-4 mr-2 text-ghb-primary" />
              {document.name}
              {document.required && (
                <Badge variant="destructive" className="ml-2 text-xs">
                  จำเป็น
                </Badge>
              )}
            </CardTitle>
            <CardDescription className="text-sm thai-text mt-1">
              {document.description}
            </CardDescription>
          </div>
          {document.files.length > 0 && (
            <CheckCircle2 className="w-5 h-5 text-green-500 ml-2" />
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* File Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-ghb-primary transition-colors">
          <input
            type="file"
            multiple={document.maxFiles > 1}
            accept={document.acceptedTypes.join(",")}
            onChange={(e) =>
              handleFileUpload(categoryId, document.id, e.target.files)
            }
            className="hidden"
            id={`upload-${document.id}`}
          />
          <label
            htmlFor={`upload-${document.id}`}
            className="cursor-pointer flex flex-col items-center space-y-2"
          >
            <div className="w-12 h-12 bg-ghb-primary/10 rounded-lg flex items-center justify-center">
              <Upload className="w-6 h-6 text-ghb-primary" />
            </div>
            <div>
              <p className="font-medium text-ghb-dark thai-text">อัปโหลดไฟล์</p>
              <p className="text-xs text-ghb-gray thai-text">
                {document.acceptedTypes.includes("image/jpeg") && "รูปภาพ "}
                {document.acceptedTypes.includes("application/pdf") && "PDF "}
                สูงสุด {document.maxFiles} ไฟล์
              </p>
            </div>
          </label>
        </div>

        {/* Upload Progress */}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-ghb-gray thai-text">กำลังอัปโหลด...</span>
              <span className="text-ghb-primary">{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}

        {/* Uploaded Files */}
        {document.files.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-ghb-dark thai-text">
              ไฟล์ที่อัปโหลดแล้ว ({document.files.length})
            </h4>
            {document.files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    {file.type.startsWith("image/") ? (
                      <FileImage className="w-4 h-4 text-green-600" />
                    ) : (
                      <FileText className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ghb-dark">
                      {file.name}
                    </p>
                    <p className="text-xs text-ghb-gray">
                      {file.size.toFixed(1)} MB •{" "}
                      {file.uploadDate?.toLocaleDateString("th-TH")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      removeFile(categoryId, document.id, file.name)
                    }
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* File Guidelines */}
        <div className="text-xs text-ghb-gray thai-text space-y-1">
          <p>• ไฟล์ต้องชัดเจน อ่านได้ทุกตัวอักษร</p>
          <p>• ขนาดไฟล์ไม่เกิน 10 MB ต่อไฟล์</p>
          <p>• รองรับไฟล์ JPG, PNG, PDF</p>
        </div>
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
            <FolderOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-ghb-dark thai-text mb-2">
            อัปโหลดเอกสาร
          </h1>
          <p className="text-ghb-gray thai-text">
            เตรียมเอกสารสำหรับการขอสินเชื่อที่อยู่อาศัย
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-ghb-primary to-ghb-secondary text-white mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold mb-2 thai-text">
                  ความคืบหน้าการส่งเอกสาร
                </h3>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    <span>
                      {stats.requiredCompleted}/{stats.totalRequired}{" "}
                      เอกสารจำเป็น
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-1" />
                    <span>{stats.totalFiles} ไฟล์ทั้งหมด</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">
                  {stats.completionPercentage}%
                </div>
                <div className="text-sm opacity-90 thai-text">เสร็จสิ้น</div>
              </div>
            </div>
            <Progress
              value={stats.completionPercentage}
              className="h-3 bg-white/20"
            />
          </CardContent>
        </Card>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="personal" className="thai-text">
              เอกสารส่วนตัว
            </TabsTrigger>
            <TabsTrigger value="financial" className="thai-text">
              เอกสารการเงิน
            </TabsTrigger>
            <TabsTrigger value="collateral" className="thai-text">
              หลักประกัน
            </TabsTrigger>
          </TabsList>

          {documentCategories.map((category) => (
            <TabsContent
              key={category.id}
              value={category.id}
              className="space-y-6"
            >
              {/* Category Header */}
              <Card className="border-0 shadow-md border-l-4 border-l-ghb-primary">
                <CardHeader>
                  <CardTitle className="text-ghb-dark thai-text flex items-center">
                    <category.icon className="w-5 h-5 mr-2 text-ghb-primary" />
                    {category.title}
                    {category.required && (
                      <Badge variant="destructive" className="ml-2">
                        จำเป็น
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="thai-text">
                    {category.description}
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Documents */}
              <div className="space-y-4">
                {category.documents.map((document) => (
                  <DocumentUploadCard
                    key={document.id}
                    categoryId={category.id}
                    document={document}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Important Notice */}
        <Card className="mt-6 border-0 shadow-md bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800 thai-text mb-2">
                  ข้อสำคัญ
                </h3>
                <div className="text-sm text-yellow-700 thai-text space-y-1">
                  <p>
                    •
                    ธนาคารขอสงวนสิทธิ์ในการขอเอกสารเพิ่มเติมเพื่อประกอบการพิจารณา
                  </p>
                  <p>
                    • เอกสารทั้งหมดต้องเป็นฉบับที่ชัดเจน อ่านได้
                    และยังไม่หมดอายุ
                  </p>
                  <p>
                    • หากเอกสารไม่ครบถ้วน อาจส่งผลต่อการพิจารณาอนุมัติสินเชื่อ
                  </p>
                  <p>
                    •
                    สามารถขอยื่นกู้บ้านแบบออนไลน์ได้เมื่ออัปโหลดเอกสารครบถ้วนแล้ว
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-6">
          <Button variant="outline" className="flex-1 h-12 thai-text">
            บันทึกร่าง
          </Button>
          <Button
            className="flex-1 h-12 bg-gradient-primary text-white thai-text"
            disabled={stats.completionPercentage < 100}
          >
            ส่งเอกสารทั้งหมด
          </Button>
        </div>

        {/* Help Section */}
        <Card className="mt-6 border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-ghb-dark thai-text flex items-center">
              <Camera className="w-5 h-5 mr-2" />
              เทคนิคการถ่ายภาพเอกสาร
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold text-ghb-dark thai-text">
                  ✅ ควรทำ
                </h4>
                <ul className="text-ghb-gray thai-text space-y-1">
                  <li>• ถ่ายในที่แสงสว่างเพียงพอ</li>
                  <li>• จัดเอกสารให้เรียบร้อย</li>
                  <li>• ถ่ายให้เห็นเอกสารทั้งหน้า</li>
                  <li>• ตรวจสอบความชัดเจน</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-ghb-dark thai-text">
                  ❌ ไม่ควรทำ
                </h4>
                <ul className="text-ghb-gray thai-text space-y-1">
                  <li>• ถ่ายในที่แสงน้อย</li>
                  <li>• เอกสารพับงอหรือยับ</li>
                  <li>• ถ่ายเฉียงหรือไม่ตรง</li>
                  <li>• ภาพเบลอหรือไม่ชัด</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentUpload;
