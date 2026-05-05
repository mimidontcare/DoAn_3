"use client";

import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Users,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { getDashboardStats } from "@/ApiCall/GvApi";

interface Stats {
  lopDangDay: number;
  lichHomNay: number;
  tongSV: number;
  tyLeChuyenCan: number;
}

export default function GiangVienDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err: any) {
        console.error("Lỗi fetch dashboard:", err.message);
        setStats({ lopDangDay: 0, lichHomNay: 0, tongSV: 0, tyLeChuyenCan: 0 });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex items-center gap-3 text-blue-600 font-semibold animate-pulse">
          <Loader2 size={24} className="animate-spin" />
          Đang tải dữ liệu...
        </div>
      </div>
    );
  }

  const cards = [
    {
      label: "Lớp đang dạy",
      value: stats?.lopDangDay ?? 0,
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      label: "Lịch dạy hôm nay",
      value: stats?.lichHomNay ?? 0,
      icon: Calendar,
      color: "text-orange-500",
      bg: "bg-orange-50",
      border: "border-orange-100",
      gradient: "from-orange-400 to-amber-500",
    },
    {
      label: "Tổng sinh viên",
      value: stats?.tongSV ?? 0,
      icon: Users,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      gradient: "from-emerald-400 to-teal-500",
    },
    {
      label: "Tỷ lệ chuyên cần",
      value: `${stats?.tyLeChuyenCan ?? 0}%`,
      icon: TrendingUp,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
      gradient: "from-purple-500 to-violet-500",
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-slate-50 via-white to-blue-50 h-full rounded-2xl border border-slate-100 shadow-sm">
      <h1 className="text-3xl font-bold mb-2 text-slate-800 flex items-center gap-3">
        <LayoutDashboard size={36} className="text-blue-600" />
        Bảng Điều Khiển Giảng Viên
      </h1>
      <p className="text-slate-500 mb-8 font-medium">
        Tổng quan hoạt động giảng dạy của bạn
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg border ${card.border} flex flex-col justify-between h-40 group hover:shadow-xl transition-all duration-300`}
            >
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-[4rem] ${card.bg} opacity-60 group-hover:opacity-100 transition-opacity`} />
              <div className="flex items-center justify-between relative z-10">
                <span className="text-slate-500 font-semibold text-sm">{card.label}</span>
                <div className={`p-2.5 rounded-xl ${card.bg}`}>
                  <Icon size={22} className={card.color} />
                </div>
              </div>
              <div className={`text-4xl font-bold ${card.color} relative z-10`}>
                {card.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
