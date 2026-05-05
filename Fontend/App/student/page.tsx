"use client";

import { BookOpen, GraduationCap, Calendar, Clock, Trophy } from "lucide-react";

export default function StudentDashboard() {
  const stats = [
    {
      title: "Tín chỉ tích lũy",
      value: "85",
      total: "120",
      icon: BookOpen,
      color: "from-blue-500 to-indigo-600",
      bg: "bg-blue-50",
    },
    {
      title: "Điểm trung bình (GPA)",
      value: "3.2",
      total: "4.0",
      icon: GraduationCap,
      color: "from-emerald-500 to-teal-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Lớp đang học",
      value: "5",
      total: "Môn",
      icon: Calendar,
      color: "from-amber-500 to-orange-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          Xin chào, Sinh viên! 👋
        </h1>
        <p className="text-slate-500 font-medium">
          Chào mừng bạn quay trở lại. Chúc bạn một ngày học tập hiệu quả.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div
                className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all duration-300 pointer-events-none"
              >
                <Icon size={100} />
              </div>
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <p className="text-slate-500 font-medium text-sm mb-1">
                    {stat.title}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-bold text-slate-800">
                      {stat.value}
                    </h3>
                    <span className="text-slate-400 font-medium text-sm">
                      / {stat.total}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <Icon className="w-6 h-6 text-slate-700" />
                </div>
              </div>
              <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                  style={{
                    width: `${
                      (parseFloat(stat.value) / parseFloat(stat.total)) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lịch học hôm nay */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              Lịch học hôm nay
            </h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
              Xem tất cả
            </button>
          </div>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors"
              >
                <div className="flex flex-col items-center justify-center min-w-[60px] border-r border-slate-200 pr-4">
                  <span className="text-sm font-bold text-blue-600">Ca {i}</span>
                  <span className="text-xs text-slate-500 font-medium">07:30</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">Lập trình Web nâng cao</h4>
                  <p className="text-sm text-slate-600 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                    Phòng: A1.204
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Thông báo */}
        <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center justify-between mb-6 relative z-10">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              Bảng tin sinh viên
            </h2>
          </div>
          
          <div className="space-y-4 relative z-10">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/20 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold px-2 py-1 bg-rose-500/20 text-rose-200 rounded-md">Quan trọng</span>
                <span className="text-xs text-blue-200">2 giờ trước</span>
              </div>
              <h4 className="font-bold text-white mb-1">Mở đăng ký học phần Học kỳ 2</h4>
              <p className="text-sm text-blue-100 line-clamp-2">
                Hệ thống mở đăng ký môn học từ ngày 15/05. Sinh viên lưu ý hoàn thành nghĩa vụ học phí để được xếp lịch.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/20 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold px-2 py-1 bg-emerald-500/20 text-emerald-200 rounded-md">Điểm số</span>
                <span className="text-xs text-blue-200">1 ngày trước</span>
              </div>
              <h4 className="font-bold text-white mb-1">Đã có điểm thi Lập trình C++</h4>
              <p className="text-sm text-blue-100 line-clamp-2">
                Khoa CNTT thông báo đã cập nhật điểm thi cuối kỳ môn Lập trình C++. Vui lòng kiểm tra bảng điểm.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
