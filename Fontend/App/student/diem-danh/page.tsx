"use client";

import { UserCheck, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

export default function StudentAttendance() {
  const subjects = [
    { name: "Lập trình Web nâng cao", total: 45, absent: 2, limit: 9 }, // 9/45 = 20%
    { name: "Toán rời rạc", total: 45, absent: 8, limit: 9 }, // Near limit
    { name: "Cơ sở dữ liệu", total: 60, absent: 15, limit: 12 }, // Exceeded limit!
    { name: "Mạng máy tính", total: 45, absent: 0, limit: 9 },
  ];

  return (
    <div className="p-6 md:p-8 w-full h-full flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
          <UserCheck className="text-blue-600" size={36} />
          Theo Dõi Chuyên Cần
        </h1>
        <p className="text-slate-500 font-medium">
          Kiểm tra số buổi vắng mặt và đảm bảo bạn đủ điều kiện dự thi (Nghỉ không quá 20%)
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {subjects.map((sub, idx) => {
          const percentAbsent = (sub.absent / sub.total) * 100;
          const isWarning = percentAbsent >= 15 && percentAbsent < 20;
          const isBanned = percentAbsent >= 20;

          return (
            <div key={idx} className={`bg-white rounded-2xl border-2 p-6 shadow-sm flex flex-col md:flex-row gap-6 items-center transition-all ${
              isBanned ? "border-rose-200" : isWarning ? "border-amber-200" : "border-slate-100"
            }`}>
              <div className="flex-1 w-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-800">{sub.name}</h3>
                  <div className="text-sm font-bold bg-slate-100 px-3 py-1 rounded-lg text-slate-600">
                    Tổng: {sub.total} tiết
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-2 relative">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      isBanned ? "bg-rose-500" : isWarning ? "bg-amber-400" : "bg-emerald-500"
                    }`}
                    style={{ width: `${Math.min(percentAbsent, 100)}%` }}
                  ></div>
                  {/* Limit Marker */}
                  <div className="absolute top-0 bottom-0 w-1 bg-red-600/50" style={{ left: '20%' }}></div>
                </div>

                <div className="flex justify-between items-center text-sm font-medium">
                  <span className={isBanned ? "text-rose-600 font-bold" : isWarning ? "text-amber-600 font-bold" : "text-emerald-600"}>
                    Đã vắng: {sub.absent} tiết ({percentAbsent.toFixed(1)}%)
                  </span>
                  <span className="text-slate-400">Giới hạn: {sub.limit} tiết (20%)</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="w-full md:w-64 flex-shrink-0">
                {isBanned ? (
                  <div className="bg-rose-50 text-rose-700 p-4 rounded-xl flex items-center gap-3 border border-rose-100">
                    <XCircle size={28} />
                    <div>
                      <h4 className="font-bold">Cấm Thi</h4>
                      <p className="text-xs font-medium opacity-80">Không đủ ĐK dự thi</p>
                    </div>
                  </div>
                ) : isWarning ? (
                  <div className="bg-amber-50 text-amber-700 p-4 rounded-xl flex items-center gap-3 border border-amber-100">
                    <AlertTriangle size={28} />
                    <div>
                      <h4 className="font-bold">Cảnh Báo</h4>
                      <p className="text-xs font-medium opacity-80">Sắp vượt quá giới hạn</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl flex items-center gap-3 border border-emerald-100">
                    <CheckCircle2 size={28} />
                    <div>
                      <h4 className="font-bold">An Toàn</h4>
                      <p className="text-xs font-medium opacity-80">Đủ điều kiện dự thi</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
