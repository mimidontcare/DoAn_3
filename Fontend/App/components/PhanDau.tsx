"use client";
import { Search, Bell, ShieldQuestionMark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import NovigationChild from "../items_phu/novigationchild";

const PhanDau = ({ className }: { className?: string }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className={className}>
      <div className="text-black w-[75%] flex items-center relative">
        <span className="font-bold text-[22px] flex w-47 h-[100%] items-center justify-center ml-10">
          <Link href="/admin/dashboard">Quản lý hệ thống</Link>
        </span>

        <div className="flex w-[64%] h-full items-center relative justify-center">
          <div className="w-10 h-10 text-gray-400 absolute left-4 rounded-tl-lg rounded-bl-lg flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>

          <input
            type="text"
            className="bg-[#E2E8F0] h-[70%] w-[95%] rounded-lg pl-12 outline-none shadow"
            placeholder="Tìm kiếm"
          />
        </div>

        <div className="flex w-25 h-full items-center justify-between relative">
          <span
            className="relative hover:border-2 border-gray-400 rounded-lg p-1 cursor-pointer"
            onClick={() => setIsActive(!isActive)}
          >
            <Bell className="w-8 h-8 text-black" />
            <span className="bg-red-500 w-2 h-2 absolute top-1 right-1 rounded-full"></span>
          </span>

          <span className="hover:border-2 border-gray-400 rounded-lg p-1 cursor-pointer">
            <ShieldQuestionMark className="w-8 h-8" />
          </span>
          {isActive && (
            <NovigationChild className="w-100 h-120 border-2 border-white absolute top-17 left-0 bg-white rounded-lg overflow-hidden shadow-lg z-[9000]" />
          )}
        </div>

        <span className="w-[2px] h-[70%] bg-gray-400 absolute right-0"></span>
      </div>

      <div className="w-[20%] h-full flex items-center justify-center gap-1 mr-5">
        <div className="w-[75%] h-full flex flex-col justify-center items-end p-2">
          <span className="font-bold text-sm">Nguyễn Văn A</span>
          <span className="text-sm text-gray-500">Quản trị viên</span>
        </div>

        <div className="w-[19%] h-[80%] rounded-full overflow-hidden hover:cursor-pointer">
          <img
            src="/image.png"
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default PhanDau;
