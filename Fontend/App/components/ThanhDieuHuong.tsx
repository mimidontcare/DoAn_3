"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_MENU } from "../items_phu/slide_bar";
import { GraduationCap } from "lucide-react";

type Props = {
  className?: string;
};

const ThanhDieuHuong = ({ className }: Props) => {
  const pathname = usePathname();

  return (
    <div className={className}>
      {/* Header */}
      <div className="h-[10%] w-full text-black flex items-center font-bold text-lg">
        <GraduationCap className="w-8 h-8 m-2 text-blue-600" />
        Trang admin
      </div>

      {/* Menu */}
      <div className="flex flex-col justify-between h-[90%] ">
        {SIDEBAR_MENU.map((group) => (
          <div key={group.group} className="overflow-y-auto">
            {group.items.map((item) => {
              const IconComponent = item.icon;
              const isActive = pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  href={item.path}
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

export default ThanhDieuHuong;
