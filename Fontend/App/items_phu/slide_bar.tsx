import {
  LayoutDashboard,
  Building2,
  School,
  Users,
  UserCheck,
  Calendar,
  ClipboardCheck,
  BarChart3,
  Settings,
  LogOut,
  DoorOpen,
  Book,
} from "lucide-react";

export const SIDEBAR_MENU = [
  {
    group: "Chức năng",
    items: [
      {
        name: "Bảng điều khiển",
        path: "/admin/dashboard",
        icon: LayoutDashboard,
      },
      { name: "Khoa & Ngành", path: "/admin/departments", icon: Building2 },
      { name: "Môn học", path: "/admin/subjects", icon: Book },
      { name: "Lớp học", path: "/admin/classes", icon: School },
      { name: "Phòng học", path: "/admin/rooms", icon: DoorOpen },
      { name: "Sinh viên", path: "/admin/students", icon: Users },
      { name: "Giảng viên", path: "/admin/teachers", icon: UserCheck },
      { name: "Lịch học & Thi", path: "/admin/schedule", icon: Calendar },
      { name: "Điểm danh", path: "/admin/attendance", icon: ClipboardCheck },
      { name: "Bảng điểm", path: "/admin/grades", icon: BarChart3 },
    ],
  },
  {
    group: "Hệ thống",
    items: [
      { name: "Cài đặt", path: "/settings", icon: Settings },
      { name: "Đăng xuất", path: "/htmltemplate", icon: LogOut },
    ],
  },
] as const;

export const SIDEBAR_MENU_GIANGVIEN = [
  {
    group: "Chức năng",
    items: [
      {
        name: "Bảng điều khiển",
        path: "/giangvien",
        icon: LayoutDashboard,
      },
      { name: "Quản lý lớp", path: "/giangvien/quan-ly-lop", icon: School },
      { name: "Lịch dạy", path: "/giangvien/lich-day", icon: Calendar },
      { name: "Điểm danh", path: "/giangvien/diem-danh", icon: ClipboardCheck },
      { name: "Quản lý điểm", path: "/giangvien/quan-ly-diem", icon: BarChart3 },
    ],
  },
  {
    group: "Hệ thống",
    items: [
      { name: "Cài đặt", path: "/settings", icon: Settings },
      { name: "Đăng xuất", path: "/htmltemplate", icon: LogOut },
    ],
  },
] as const;
