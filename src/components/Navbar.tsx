import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Target,
  Calculator,
  BookOpen,
  MessageCircle,
  User,
  Bell,
  Shield,
  Menu,
  Search,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const navItems = [
  {
    path: "/dashboard",
    icon: Home,
    label: "หน้าหลัก",
    labelEn: "Home",
  },
  {
    path: "/missions",
    icon: Target,
    label: "ภารกิจ",
    labelEn: "Missions",
  },
  {
    path: "/credit-sandbox",
    icon: Shield,
    label: "เครดิตทดลอง",
    labelEn: "Credit",
  },
  {
    path: "/education",
    icon: BookOpen,
    label: "เรียนรู้",
    labelEn: "Learn",
  },
];

const mainNavItems = [
  { label: "ประเมินสินเชื่อ", path: "/loan-simulator" },
  { label: "คู่มือฟรีแลนซ์", path: "/freelancer-guide" },
  { label: "ภารกิจ", path: "/missions" },
  { label: "เครดิตทดลอง", path: "/credit-sandbox" },
];

interface NavbarProps {
  notifications?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ notifications = 0 }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Fixed Orange Header - GHB Bank Style */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[rgb(254,80,0)] text-white shadow-lg">
        <div className="container mx-auto px-4">
          {/* Top Row */}
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets%2F91b9f3dbf77d41fbbfce132c0e2bb455%2Ff402feef87b4479bb8f616b1c2cc1936"
                  alt="GHB CreditBuilder Logo"
                  className="w-full h-auto object-contain p-1"
                />
              </div>
              <div>
                <h1 className="font-bold text-xl thai-text">
                  GHB CreditBuilder
                </h1>
                <p className="text-xs opacity-90 thai-text">สร้างเครดิตที่ดี</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {mainNavItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="text-white hover:text-orange-200 transition-colors font-medium thai-text py-2 border-b-2 border-transparent hover:border-orange-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="sm"
                className="relative text-white hover:bg-white/10"
              >
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-yellow-400 text-orange-800"
                  >
                    {notifications > 9 ? "9+" : notifications}
                  </Badge>
                )}
              </Button>

              {/* User Profile */}
              <Link to="/profile">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10"
                >
                  <User className="w-5 h-5" />
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-white hover:bg-white/10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {/* Contact Info Bar */}
          <div className="hidden md:flex items-center justify-between py-2 border-t border-white/20 text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="thai-text">Call Center: 0-2645-9000</span>
              </div>
              <span className="thai-text">ทุกวัน 24 ชั่วโมง</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/chat" className="hover:text-orange-200 thai-text">
                ช่วยเหลือ
              </Link>
              <Link
                to="/document-upload"
                className="hover:text-orange-200 thai-text"
              >
                ยื่นเอกสาร
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white text-gray-800 border-t border-orange-200">
            <div className="container mx-auto px-4 py-4">
              <nav className="space-y-4">
                {mainNavItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className="block py-2 thai-text hover:text-orange-600 border-b border-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/chat"
                  className="block py-2 thai-text hover:text-orange-600 border-b border-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ช่วยเหลือ
                </Link>
                <Link
                  to="/document-upload"
                  className="block py-2 thai-text hover:text-orange-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ยื่นเอกสาร
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Bottom Navigation - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg lg:hidden">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 touch-target min-w-[60px]",
                  isActive
                    ? "text-[rgb(254,80,0)] bg-orange-50"
                    : "text-gray-600 hover:text-[rgb(254,80,0)] hover:bg-orange-50",
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 mb-1 transition-transform duration-200",
                    isActive && "scale-110",
                  )}
                />
                <span
                  className={cn(
                    "text-xs font-medium thai-text leading-tight",
                    isActive && "font-semibold",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Floating Chat Button - Hidden on Mobile (using bottom nav instead) */}
      <Link
        to="/chat"
        className="hidden lg:block fixed bottom-8 right-8 z-50 w-14 h-14 bg-[rgb(254,80,0)] rounded-full shadow-lg flex items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="45"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white flex flex-col justify-start items-start"
          style={{ margin: "2px auto auto" }}
        >
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
      </Link>

      {/* Spacer for fixed header */}
      <div className="h-20 lg:h-24"></div>
    </>
  );
};
