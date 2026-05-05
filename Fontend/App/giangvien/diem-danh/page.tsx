"use client";

import { useState, useEffect, useRef } from "react";
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
  Users,
  Clock,
  Loader2,
} from "lucide-react";
import {
  getLopGiangDay,
  getSinhVienByLop,
  taoBuoiDiemDanh,
  thongKeVang,
} from "@/ApiCall/GvDiemdanhApi";

interface LopHP {
  maLopHP: string;
  tenLop: string;
  MaLopHocPhan: string;
  MaMonHoc: string;
  maGiangVien: string;
  soLuongSinhVien: number;
  tenMonHoc: string | null;
  soTiet: number | null;
}

interface SinhVien {
  maSV: string;
  Hoten: string;
  MaLopHC: string;
  GioiTinh: string;
}

interface ThongKeSV {
  maSinhVien: string;
  soTietVang: number;
  soTietMuon: number;
  soBuoiDiemDanh: number;
}

export default function DiemDanhGiangVien() {
  // Data state
  const [lopList, setLopList] = useState<LopHP[]>([]);
  const [selectedLop, setSelectedLop] = useState<LopHP | null>(null);
  const [students, setStudents] = useState<SinhVien[]>([]);
  const [thongKe, setThongKe] = useState<ThongKeSV[]>([]);
  const [tongSoTiet, setTongSoTiet] = useState(45);

  // UI state
  const [openLop, setOpenLop] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isTakingAttendance, setIsTakingAttendance] = useState(false);
  const [attendanceState, setAttendanceState] = useState<
    Record<string, "Có mặt" | "Vắng" | "Muộn">
  >({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenLop(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch class list on mount
  useEffect(() => {
    fetchLopList();
  }, []);

  // Fetch students & stats when class changes
  useEffect(() => {
    if (selectedLop) {
      fetchStudentsAndStats(selectedLop.maLopHP);
    }
  }, [selectedLop]);

  const fetchLopList = async () => {
    setLoading(true);
    try {
      const data = await getLopGiangDay();
      if (Array.isArray(data) && data.length > 0) {
        setLopList(data);
        setSelectedLop(data[0]);
      } else {
        setLopList([]);
        setSelectedLop(null);
      }
    } catch (err: any) {
      console.error("Lỗi fetchLopList:", err.message);
      setLopList([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentsAndStats = async (maLopHP: string) => {
    try {
      const [svData, tkData] = await Promise.all([
        getSinhVienByLop(maLopHP),
        thongKeVang(maLopHP),
      ]);

      if (Array.isArray(svData)) {
        setStudents(svData);
      }

      if (tkData && tkData.thongKe) {
        setThongKe(tkData.thongKe);
        setTongSoTiet(tkData.tongSoTiet || 45);
      }
    } catch (err: any) {
      console.error("Lỗi fetch:", err.message);
    }
  };

  // Get stats for a specific student
  const getStudentStats = (maSV: string) => {
    const stat = thongKe.find((t) => t.maSinhVien === maSV);
    return {
      soTietVang: stat?.soTietVang || 0,
      soTietMuon: stat?.soTietMuon || 0,
      soBuoiDiemDanh: stat?.soBuoiDiemDanh || 0,
    };
  };

  // Start attendance session
  const handleStartAttendance = () => {
    const initialState: Record<string, "Có mặt" | "Vắng" | "Muộn"> = {};
    students.forEach((sv) => {
      initialState[sv.maSV] = "Có mặt";
    });
    setAttendanceState(initialState);
    setIsTakingAttendance(true);
    setSuccessMsg("");
  };

  // Toggle attendance between 3 states
  const cycleAttendance = (maSV: string) => {
    setAttendanceState((prev) => {
      const current = prev[maSV];
      let next: "Có mặt" | "Vắng" | "Muộn" = "Có mặt";
      if (current === "Có mặt") next = "Vắng";
      else if (current === "Vắng") next = "Muộn";
      else next = "Có mặt";
      return { ...prev, [maSV]: next };
    });
  };

  // Save attendance to backend
  const handleSaveAttendance = async () => {
    if (!selectedLop) return;
    setSaving(true);
    try {
      const danhSach = Object.entries(attendanceState).map(
        ([maSV, trangThai]) => ({
          maSV,
          trangThai,
        })
      );

      const today = new Date().toISOString().split("T")[0];
      await taoBuoiDiemDanh({
        maLopHP: selectedLop.maLopHP,
        ngayDiemDanh: today,
        soTiet: 3,
        phongHoc: "",
        danhSach,
      });

      setIsTakingAttendance(false);
      setSuccessMsg("✅ Lưu điểm danh thành công!");

      // Refresh stats
      await fetchStudentsAndStats(selectedLop.maLopHP);

      // Clear success msg after 3 seconds
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err: any) {
      alert("Lỗi khi lưu điểm danh: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // Filter students by search
  const filteredStudents = students.filter(
    (sv) =>
      sv.maSV.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sv.Hoten.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Count attendance stats
  const countPresent = Object.values(attendanceState).filter(
    (v) => v === "Có mặt"
  ).length;
  const countAbsent = Object.values(attendanceState).filter(
    (v) => v === "Vắng"
  ).length;
  const countLate = Object.values(attendanceState).filter(
    (v) => v === "Muộn"
  ).length;

  // Status badge styling
  const getStatusStyle = (status: "Có mặt" | "Vắng" | "Muộn") => {
    switch (status) {
      case "Có mặt":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Vắng":
        return "bg-rose-100 text-rose-700 border-rose-200";
      case "Muộn":
        return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };

  const getStatusIcon = (status: "Có mặt" | "Vắng" | "Muộn") => {
    switch (status) {
      case "Có mặt":
        return <CheckCircle2 size={16} className="mr-1.5" />;
      case "Vắng":
        return <XCircle size={16} className="mr-1.5" />;
      case "Muộn":
        return <Clock size={16} className="mr-1.5" />;
    }
  };

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

        <div className="flex gap-3 items-center">
          {successMsg && (
            <span className="text-emerald-600 font-semibold text-sm animate-pulse bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200">
              {successMsg}
            </span>
          )}
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold shadow-sm hover:bg-slate-50 transition-colors">
            <Download size={18} />
            Xuất Báo Cáo
          </button>
          {!isTakingAttendance ? (
            <button
              onClick={handleStartAttendance}
              disabled={!selectedLop || students.length === 0}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-blue-500/30 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CalendarIcon size={18} />
              Tạo Buổi Điểm Danh
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setIsTakingAttendance(false)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 text-slate-600 rounded-xl font-semibold shadow-sm hover:bg-slate-50 transition-all"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveAttendance}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-[0.98] disabled:opacity-70"
              >
                {saving ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                {saving ? "Đang lưu..." : "Lưu Điểm Danh"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-slate-100 bg-white/70 backdrop-blur-xl shadow-xl flex-1 flex flex-col min-h-0">
        <div className="p-6 flex-1 flex flex-col min-h-0 space-y-6">
          {/* Toolbar */}
          <div className="flex flex-wrap gap-4 items-end">
            <div className="relative w-full md:w-1/3">
              <label className="text-xs font-semibold text-slate-500 mb-1.5 block">
                TÌM KIẾM SINH VIÊN
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Mã SV, Tên SV..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="w-72 relative" ref={dropdownRef}>
              <label className="text-xs font-semibold text-slate-500 mb-1.5 block">
                LỚP HỌC PHẦN
              </label>
              <div
                className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm hover:border-slate-300 shadow-sm"
                onClick={() => setOpenLop(!openLop)}
              >
                <span className="truncate mr-2 font-medium text-slate-700">
                  {selectedLop
                    ? `${selectedLop.tenMonHoc || selectedLop.tenLop} - ${selectedLop.maLopHP}`
                    : "Chưa có lớp"}
                </span>
                <ChevronDown size={16} className="text-slate-400 shrink-0" />
              </div>
              {openLop && lopList.length > 0 && (
                <div className="absolute z-20 mt-1 w-full rounded-xl border border-slate-200 bg-white shadow-xl py-1 max-h-60 overflow-auto">
                  {lopList.map((lop) => (
                    <div
                      key={lop.maLopHP}
                      className={`cursor-pointer px-4 py-2.5 text-sm hover:bg-blue-50 text-slate-700 font-medium ${
                        selectedLop?.maLopHP === lop.maLopHP
                          ? "bg-blue-50 text-blue-600"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedLop(lop);
                        setOpenLop(false);
                        setIsTakingAttendance(false);
                      }}
                    >
                      <div>{lop.tenMonHoc || lop.tenLop}</div>
                      <div className="text-xs text-slate-400">
                        {lop.maLopHP} • {lop.MaMonHoc}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="ml-auto flex gap-4 text-sm font-semibold bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Users size={18} className="text-blue-500" /> Sĩ số:{" "}
                {filteredStudents.length}
              </div>
              {isTakingAttendance && (
                <>
                  <div className="w-px bg-slate-300"></div>
                  <div className="flex items-center gap-2 text-slate-600">
                    Có mặt:{" "}
                    <span className="text-emerald-600">{countPresent}</span>
                  </div>
                  <div className="w-px bg-slate-300"></div>
                  <div className="flex items-center gap-2 text-slate-600">
                    Vắng: <span className="text-rose-600">{countAbsent}</span>
                  </div>
                  <div className="w-px bg-slate-300"></div>
                  <div className="flex items-center gap-2 text-slate-600">
                    Muộn: <span className="text-amber-600">{countLate}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-auto flex-1 rounded-2xl border border-slate-200 shadow-inner bg-white">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                    STT
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Mã SV
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Họ và Tên
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Lớp Hành Chính
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Tổng Số Tiết
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Số Tiết Vắng
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">
                    {isTakingAttendance ? "Điểm Danh" : "Cảnh Báo Điều Kiện"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-slate-400"
                    >
                      {students.length === 0
                        ? "Chưa có sinh viên trong lớp này."
                        : "Không tìm thấy sinh viên phù hợp."}
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((sv, idx) => {
                    const stats = getStudentStats(sv.maSV);
                    const percentAbsent =
                      tongSoTiet > 0
                        ? (stats.soTietVang / tongSoTiet) * 100
                        : 0;
                    const isBanned = percentAbsent > 20;

                    return (
                      <tr
                        key={sv.maSV}
                        className={`hover:bg-slate-50 transition-colors ${
                          isBanned ? "bg-rose-50/30" : ""
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-500">
                          {idx + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">
                          {sv.maSV}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-800">
                          {sv.Hoten}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          {sv.MaLopHC || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-700 text-center">
                          {tongSoTiet}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span
                            className={`inline-flex items-center justify-center min-w-[2rem] px-2 py-1 rounded-md text-sm font-bold ${
                              isBanned
                                ? "bg-rose-100 text-rose-700"
                                : stats.soTietVang > 0
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {stats.soTietVang}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {isTakingAttendance ? (
                            <div className="flex justify-center items-center">
                              <button
                                onClick={() => cycleAttendance(sv.maSV)}
                                className={`flex items-center justify-center w-36 px-4 py-2 rounded-xl text-sm font-bold transition-all border ${getStatusStyle(
                                  attendanceState[sv.maSV] || "Có mặt"
                                )}`}
                              >
                                {getStatusIcon(
                                  attendanceState[sv.maSV] || "Có mặt"
                                )}
                                {attendanceState[sv.maSV] || "Có mặt"}
                              </button>
                            </div>
                          ) : (
                            <div className="flex justify-center">
                              {isBanned ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 text-xs font-bold border border-rose-200 shadow-sm">
                                  <AlertTriangle size={14} /> KHÔNG ĐỦ ĐIỀU
                                  KIỆN
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
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Note section */}
          <div className="flex items-start gap-3 bg-blue-50/50 border border-blue-100 p-4 rounded-xl text-sm text-blue-800">
            <AlertTriangle className="text-blue-500 shrink-0" size={20} />
            <p>
              <strong>Lưu ý:</strong> Sinh viên nghỉ quá{" "}
              <strong>20%</strong> tổng số tiết (tương đương với{" "}
              {Math.ceil(tongSoTiet * 0.2)} tiết đối với môn học{" "}
              {tongSoTiet} tiết) sẽ tự động bị hệ thống đánh dấu{" "}
              <span className="font-bold text-rose-600">
                Không đủ điều kiện dự thi
              </span>
              .{" "}
              {isTakingAttendance && (
                <span className="text-blue-600">
                  Click vào nút trạng thái để chuyển đổi: <strong>Có mặt</strong> →{" "}
                  <strong>Vắng</strong> → <strong>Muộn</strong> → <strong>Có mặt</strong>.
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
