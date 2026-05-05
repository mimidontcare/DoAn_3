"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpenCheck,
  CalendarDays,
  UserCheck,
  GraduationCap,
  School,
  LogOut,
  Settings,
} from "lucide-react";

const SIDEBAR_MENU_SINHVIEN = [
  {
    title: "TỔNG QUAN",
    items: [
      { name: "Bảng điều khiển", icon: LayoutDashboard, path: "/student" },
    ],
  },
  {
    title: "HỌC TẬP",
    items: [
      { name: "Đăng ký học phần", icon: BookOpenCheck, path: "/student/dang-ky-hoc-phan" },
      { name: "Lịch học & Thi", icon: CalendarDays, path: "/student/lich-hoc" },
    ],
  },
  {
    title: "KẾT QUẢ",
    items: [
      { name: "Điểm danh & Chuyên cần", icon: UserCheck, path: "/student/diem-danh" },
      { name: "Bảng điểm học tập", icon: GraduationCap, path: "/student/bang-diem" },
    ],
  },
  {
    title: "HỆ THỐNG",
    items: [
      { name: "Cài đặt", icon: Settings, path: "/settings" },
      { name: "Đăng xuất", icon: LogOut, path: "/login" },
    ],
  },
];

const ThanhDieuHuongSinhVien = ({ className = "" }: { className?: string }) => {
  const pathname = usePathname();

  return (
    <div className={`flex flex-col h-full bg-white shadow-xl border-r border-gray-100 ${className}`}>
      {/* Logo Area */}
      <div className="flex-shrink-0 h-[80px] flex items-center px-6 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-indigo-700">
        <Link href="/student" className="flex items-center gap-3 w-full group">
          <div className="p-2 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
            <School className="w-8 h-8 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-white tracking-tight">Portal</span>
            <span className="text-xs font-medium text-blue-100 uppercase tracking-wider">Sinh Viên</span>
          </div>
        </Link>
      </div>

      {/* Menu Area */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-thin scrollbar-thumb-gray-200">
        {SIDEBAR_MENU_SINHVIEN.map((group, groupIdx) => (
          <div key={groupIdx}>
            <h3 className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              {group.title}
            </h3>
            <div className="space-y-1">
              {group.items.map((item, itemIdx) => {
                const IconComponent = item.icon;
                const isActive = pathname === item.path || (item.path !== "/student" && pathname.startsWith(item.path));

                return (
                  <Link
                    key={itemIdx}
                    href={item.path}
                    onClick={(e) => {
                      if (item.name === "Đăng xuất") {
                        e.preventDefault();
                        localStorage.removeItem("token");
                        localStorage.removeItem("role");
                        window.location.href = "/login";
                      }
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                      ${isActive
                        ? "bg-[#E7F2FD] text-blue-600 font-semibold"
                        : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                      }`}
                  >
                    <IconComponent
                      className={`w-5 h-5 shrink-0 transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"
                        }`}
                    />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThanhDieuHuongSinhVien;
