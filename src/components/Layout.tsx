import React from "react";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className = "" }) => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Main Content Area with GHB Bank styling */}
      <main className={`${className}`}>{children}</main>

      {/* Footer - GHB Bank Style */}
      <footer className="bg-[rgb(240,240,240)] border-t border-[rgb(238,238,238)] mt-20">
        <div className="container mx-auto px-4 py-12">
          {/* Five Column Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
            {/* Column 1 - About */}
            <div className="space-y-4">
              <h3 className="font-semibold text-[rgb(51,51,51)] thai-text">
                เกี่ยวกับ GHB CreditBuilder
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-[rgb(85,85,85)] hover:text-[rgb(254,80,0)] thai-text text-sm"
                  >
                    ข้อมูลแอปพลิเคชัน
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[rgb(85,85,85)] hover:text-[rgb(254,80,0)] thai-text text-sm"
                  >
                    วิธีการใช้งาน
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[rgb(85,85,85)] hover:text-[rgb(254,80,0)] thai-text text-sm"
                  >
                    นโยบายความเป็นส่วนตัว
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[rgb(85,85,85)] hover:text-[rgb(254,80,0)] thai-text text-sm"
                  >
                    เงื่อนไขการใช้งาน
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2 - Credit Services */}
            <div className="space-y-4">
              <h3 className="font-semibold text-[rgb(51,51,51)] thai-text">
                บริการเครดิต
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/credit-sandbox"
                    className="text-[rgb(85,85,85)] hover:text-[rgb(254,80,0)] thai-text text-sm"
                  >
                    เครดิตทดลอง
                  </a>
                </li>
                <li>
                  <a
                    href="/loan-simulator"
                    className="text-[rgb(85,85,85)] hover:text-[rgb(254,80,0)] thai-text text-sm"
                  >
                    จำลองสินเชื่อ
                  </a>
                </li>
                <li>
                  <a
                    href="/missions"
                    className="text-[rgb(85,85,85)] hover:text-[rgb(254,80,0)] thai-text text-sm"
                  >
                    ภารกิจสร้างเครดิต
                  </a>
                </li>
                <li>
                  <a
                    href="/education"
                    className="text-[rgb(85,85,85)] hover:text-[rgb(254,80,0)] thai-text text-sm"
                  >
                    ศูนย์การเรียนรู้
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 - Tools */}
            <div className="space-y-4">
              <h3 className="font-semibold text-[rgb(51,51,51)] thai-text">
                เครื่องมือ
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/document-upload"
                    className="text-[rgb(85,85,85)] hover:text-[rgb(254,80,0)] thai-text text-sm"
                  >
                    อัปโหลดเอกสาร
                  </a>
                </li>
                <li>
                  <a
                    href="/chat"
                    className="text-[rgb(85,85,85)] hover:text-[rgb(254,80,0)] thai-text text-sm"
                  >
                    ผู้ช่วย AI
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[rgb(85,85,85)] hover:text-[rgb(254,80,0)] thai-text text-sm"
                  >
                    คำนวณสินเชื่อ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[rgb(85,85,85)] hover:text-[rgb(254,80,0)] thai-text text-sm"
                  >
                    ตรวจสอบเครดิต
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4 - Related Sites */}
            <div className="space-y-4">
              <h3 className="font-semibold text-[rgb(51,51,51)] thai-text">
                เว็บไซต์ที่เกี่ยวข้อง
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://www.ghbank.co.th"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[rgb(85,85,85)] hover:text-[rgb(254,80,0)] thai-text text-sm"
                  >
                    ธนาคาร ธอส.
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[rgb(85,85,85)] hover:text-[rgb(254,80,0)] thai-text text-sm"
                  >
                    GHB Reward & Privilege
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[rgb(85,85,85)] hover:text-[rgb(254,80,0)] thai-text text-sm"
                  >
                    บ้านมือสอง ธอส.
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[rgb(85,85,85)] hover:text-[rgb(254,80,0)] thai-text text-sm"
                  >
                    สลากออมทรัพย์ ธอส.
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 5 - Contact */}
            <div className="space-y-4">
              <h3 className="font-semibold text-[rgb(51,51,51)] thai-text">
                ติดต่อ
              </h3>
              <ul className="space-y-2">
                <li className="text-[rgb(85,85,85)] thai-text text-sm">
                  <strong>Call Center</strong>
                  <br />
                  0-2645-9000
                </li>
                <li className="text-[rgb(85,85,85)] thai-text text-sm">
                  ทุกวัน 24 ชั่วโมง
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[rgb(85,85,85)] hover:text-[rgb(254,80,0)] thai-text text-sm"
                  >
                    สาขา / จุดให้บริการ
                  </a>
                </li>
                <li>
                  <a
                    href="/chat"
                    className="text-[rgb(85,85,85)] hover:text-[rgb(254,80,0)] thai-text text-sm"
                  >
                    แชทสด
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-[rgb(238,238,238)] pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-[rgb(119,119,119)] text-sm thai-text mb-4 md:mb-0">
              © 2024 GHB CreditBuilder. สงวนลิขสิทธิ์ทั้งหมด.
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-[rgb(85,85,85)]">
                <span className="font-semibold text-[rgb(254,80,0)]">
                  0-2645-9000
                </span>
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center space-x-3">
                <a
                  href="#"
                  className="w-8 h-8 bg-[rgb(254,80,0)] rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
                >
                  <span className="text-xs font-bold">f</span>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-[rgb(254,80,0)] rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
                >
                  <span className="text-xs font-bold">T</span>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-[rgb(254,80,0)] rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
                >
                  <span className="text-xs font-bold">IG</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
