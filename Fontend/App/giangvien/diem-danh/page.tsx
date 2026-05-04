"use client";

import { useState, useEffect } from "react";
import {
  ClipboardCheck,
  Search,
  ChevronDown,
  Calendar as CalendarIcon,
  Save,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Download,
  Users
} from "lucide-react";

// Mock data for demo since we might not have a full Attendance API ready
const mockStudents = [
  { maSV: "SV001", tenSV: "Nguyễn Văn A", lopHC: "D19CQCN01-N", tongSoTiet: 45, soTietVang: 0 },
  { maSV: "SV002", tenSV: "Trần Thị B", lopHC: "D19CQCN01-N", tongSoTiet: 45, soTietVang: 3 },
  { maSV: "SV003", tenSV: "Lê Hoàng C", lopHC: "D19CQCN02-N", tongSoTiet: 45, soTietVang: 12 }, // > 20% (9 tiết)
  { maSV: "SV004", tenSV: "Phạm Văn D", lopHC: "D19CQCN01-N", tongSoTiet: 45, soTietVang: 6 },
  { maSV: "SV005", tenSV: "Hoàng Thị E", lopHC: "D19CQCN02-N", tongSoTiet: 45, soTietVang: 0 },
];

export default function DiemDanhGiangVien() {
  const [selectedLop, setSelectedLop] = useState("Cấu trúc dữ liệu & Giải thuật - L01");
  const [openLop, setOpenLop] = useState(false);
  const [students, setStudents] = useState(mockStudents);
  const [attendanceState, setAttendanceState] = useState<Record<string, boolean>>({});
  const [isTakingAttendance, setIsTakingAttendance] = useState(false);

  // Initialize all to Present (true) when starting
  const handleStartAttendance = () => {
    const initialState: Record<string, boolean> = {};
    students.forEach(sv => {
      initialState[sv.maSV] = true; // true = present, false = absent
    });
    setAttendanceState(initialState);
    setIsTakingAttendance(true);
  };

  const toggleAttendance = (maSV: string) => {
    setAttendanceState(prev => ({
      ...prev,
      [maSV]: !prev[maSV]
    }));
  };

  const handleSaveAttendance = () => {
    // In a real app, send `attendanceState` to API
    const updatedStudents = students.map(sv => {
      const isPresent = attendanceState[sv.maSV];
      if (!isPresent) {
        return { ...sv, soTietVang: sv.soTietVang + 3 }; // Assuming 3 periods per session
      }
      return sv;
    });

    setStudents(updatedStudents);
    setIsTakingAttendance(false);
    alert("Lưu điểm danh thành công!");
  };

  const lopOptions = [
    "Cấu trúc dữ liệu & Giải thuật - L01",
    "Hệ điều hành - L02",
    "Mạng máy tính - L01"
  ];

  return (
    <div className="relative p-6 w-full h-full bg-gradient-to-br from-slate-50 via-white to-blue-50 border border-slate-100 rounded-2xl flex flex-col overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-col sm:flex-row gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
            <ClipboardCheck size={36} className="text-blue-600" />
            Điểm Danh Sinh Viên
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Quản lý chuyên cần và tự động cảnh báo điều kiện dự thi
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold shadow-sm hover:bg-slate-50 transition-colors">
            <Download size={18} />
            Xuất Báo Cáo
          </button>
          {!isTakingAttendance ? (
            <button
              onClick={handleStartAttendance}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-blue-500/30 transition-all active:scale-[0.98]"
            >
              <CalendarIcon size={18} />
              Tạo Buổi Điểm Danh
            </button>
          ) : (
            <button
              onClick={handleSaveAttendance}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-[0.98]"
            >
              <Save size={18} />
              Lưu Điểm Danh
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-slate-100 bg-white/70 backdrop-blur-xl shadow-xl flex-1 flex flex-col min-h-0">
        <div className="p-6 flex-1 flex flex-col min-h-0 space-y-6">
          
          {/* Toolbar */}
          <div className="flex flex-wrap gap-4 items-end">
            <div className="relative w-full md:w-1/3">
              <label className="text-xs font-semibold text-slate-500 mb-1.5 block">TÌM KIẾM SINH VIÊN</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Mã SV, Tên SV..."
                  className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="w-64 relative">
              <label className="text-xs font-semibold text-slate-500 mb-1.5 block">LỚP HỌC PHẦN</label>
              <div
                className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm hover:border-slate-300 shadow-sm"
                onClick={() => setOpenLop(!openLop)}
              >
                <span className="truncate mr-2 font-medium text-slate-700">{selectedLop}</span>
                <ChevronDown size={16} className="text-slate-400 shrink-0" />
              </div>
              {openLop && (
                <div className="absolute z-20 mt-1 w-full rounded-xl border border-slate-200 bg-white shadow-xl py-1">
                  {lopOptions.map((opt) => (
                    <div
                      key={opt}
                      className="cursor-pointer px-4 py-2.5 text-sm hover:bg-blue-50 text-slate-700 font-medium"
                      onClick={() => {
                        setSelectedLop(opt);
                        setOpenLop(false);
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="ml-auto flex gap-4 text-sm font-semibold bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Users size={18} className="text-blue-500"/> Sĩ số: 50
              </div>
              <div className="w-px bg-slate-300"></div>
              <div className="flex items-center gap-2 text-slate-600">
                Có mặt: <span className="text-emerald-600">45</span>
              </div>
              <div className="w-px bg-slate-300"></div>
              <div className="flex items-center gap-2 text-slate-600">
                Vắng: <span className="text-rose-600">5</span>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-auto flex-1 rounded-2xl border border-slate-200 shadow-inner bg-white">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">STT</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Mã SV</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Họ và Tên</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Lớp Hành Chính</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Tổng Số Tiết</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Số Tiết Vắng</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">
                    {isTakingAttendance ? "Điểm Danh" : "Cảnh Báo Điều Kiện"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {students.map((sv, idx) => {
                  const percentAbsent = (sv.soTietVang / sv.tongSoTiet) * 100;
                  const isBanned = percentAbsent > 20;

                  return (
                    <tr key={sv.maSV} className={`hover:bg-slate-50 transition-colors ${isBanned ? "bg-rose-50/30" : ""}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-500">{idx + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">{sv.maSV}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-800">{sv.tenSV}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{sv.lopHC}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-700 text-center">{sv.tongSoTiet}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center justify-center min-w-[2rem] px-2 py-1 rounded-md text-sm font-bold ${
                          isBanned ? "bg-rose-100 text-rose-700" : (sv.soTietVang > 0 ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600")
                        }`}>
                          {sv.soTietVang}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {isTakingAttendance ? (
                          <div className="flex justify-center items-center">
                            <button
                              onClick={() => toggleAttendance(sv.maSV)}
                              className={`flex items-center justify-center w-32 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                                attendanceState[sv.maSV]
                                  ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                                  : "bg-rose-100 text-rose-700 border border-rose-200"
                              }`}
                            >
                              {attendanceState[sv.maSV] ? (
                                <><CheckCircle2 size={18} className="mr-2"/> Hiện diện</>
                              ) : (
                                <><XCircle size={18} className="mr-2"/> Vắng mặt</>
                              )}
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            {isBanned ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 text-xs font-bold border border-rose-200 shadow-sm">
                                <AlertTriangle size={14} /> KHÔNG ĐỦ ĐIỀU KIỆN
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-200 shadow-sm">
                                <CheckCircle2 size={14} /> ĐỦ ĐIỀU KIỆN
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* Note section */}
          <div className="flex items-start gap-3 bg-blue-50/50 border border-blue-100 p-4 rounded-xl text-sm text-blue-800">
            <AlertTriangle className="text-blue-500 shrink-0" size={20} />
            <p>
              <strong>Lưu ý:</strong> Sinh viên nghỉ quá <strong>20%</strong> tổng số tiết (tương đương với {Math.ceil(45 * 0.2)} tiết đối với môn học 45 tiết) sẽ tự động bị hệ thống đánh dấu <span className="font-bold text-rose-600">Không đủ điều kiện dự thi</span>.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
