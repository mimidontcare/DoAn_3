"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_MENU_GIANGVIEN } from "../items_phu/slide_bar";
import { GraduationCap } from "lucide-react";

type Props = {
  className?: string;
};

const ThanhDieuHuongGiangVien = ({ className }: Props) => {
  const pathname = usePathname();

  return (
    <div className={className}>
      {/* Header */}
      <div className="h-[10%] w-full text-black flex items-center font-bold text-lg">
        <GraduationCap className="w-8 h-8 m-2 text-blue-600" />
        Giảng viên
      </div>

      {/* Menu */}
      <div className="flex flex-col justify-between h-[90%] ">
        {SIDEBAR_MENU_GIANGVIEN.map((group) => (
          <div key={group.group} className="overflow-y-auto">
            {group.items.map((item) => {
              const IconComponent = item.icon;
              // Check exact match for "/giangvien", else startswith for others
              const isActive =
                item.path === "/giangvien"
                  ? pathname === item.path
                  : pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={(e) => {
                    if (item.name === "Đăng xuất") {
                      e.preventDefault();
                      localStorage.removeItem("token");
                      localStorage.removeItem("role");
                      window.location.href = "/login";
                    }
                  }}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition
                    ${
                      isActive
                        ? "bg-[#E7F2FD] text-blue-600 font-semibold"
                        : "text-black hover:bg-gray-100 hover:text-blue-500"
                    }`}
                >
                  <IconComponent className="w-5 h-5 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThanhDieuHuongGiangVien;
