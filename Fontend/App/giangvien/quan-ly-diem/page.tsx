"use client";

import { useState, useEffect, useRef } from "react";
import {
  BarChart3, Search, ChevronDown, Settings2, Save, Download,
  FileSpreadsheet, FileText, Loader2, CheckCircle2
} from "lucide-react";
import { getLopGiangDay, getSinhVienByLop } from "@/ApiCall/GvDiemdanhApi";
import { getDauDiem, getBangDiem, luuBangDiem } from "@/ApiCall/GvApi";

interface LopHP {
  maLopHP: string; tenLop: string; MaMonHoc: string; tenMonHoc: string | null;
}
interface SinhVien {
  maSV: string; Hoten: string; MaLopHC: string;
}
interface DauDiem {
  MaDD: string; TenDD: string; HeSoDiem: number; loaiDiem: string;
}
interface DiemEntry {
  MaBD: string; MaSinhVien: string; MaDD: string; Diem: number;
}

export default function QuanLyDiemGiangVien() {
  const [lopList, setLopList] = useState<LopHP[]>([]);
  const [selectedLop, setSelectedLop] = useState<LopHP | null>(null);
  const [openLop, setOpenLop] = useState(false);
  const [students, setStudents] = useState<SinhVien[]>([]);
  const [dauDiemList, setDauDiemList] = useState<DauDiem[]>([]);
  const [diemData, setDiemData] = useState<DiemEntry[]>([]);
  const [editState, setEditState] = useState<Record<string, Record<string, number>>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setOpenLop(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const [lops, dauDiem] = await Promise.all([getLopGiangDay(), getDauDiem()]);
        if (Array.isArray(lops) && lops.length > 0) {
          setLopList(lops);
          setSelectedLop(lops[0]);
        }
        if (Array.isArray(dauDiem)) setDauDiemList(dauDiem);
      } catch (err: any) {
        console.error("Init error:", err.message);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (selectedLop) fetchClassData(selectedLop.maLopHP);
  }, [selectedLop]);

  const fetchClassData = async (maLopHP: string) => {
    try {
      const [svs, diem] = await Promise.all([getSinhVienByLop(maLopHP), getBangDiem(maLopHP)]);
      if (Array.isArray(svs)) setStudents(svs);
      if (Array.isArray(diem)) setDiemData(diem);
    } catch (err: any) {
      console.error("Fetch class data error:", err.message);
    }
  };

  const getDiem = (maSV: string, maDD: string): number | null => {
    if (isEditing && editState[maSV]?.[maDD] !== undefined) return editState[maSV][maDD];
    const entry = diemData.find(d => d.MaSinhVien === maSV && d.MaDD === maDD);
    return entry ? entry.Diem : null;
  };

  const handleEditClick = () => {
    const state: Record<string, Record<string, number>> = {};
    students.forEach(sv => {
      state[sv.maSV] = {};
      dauDiemList.forEach(dd => {
        const d = getDiem(sv.maSV, dd.MaDD);
        state[sv.maSV][dd.MaDD] = d ?? 0;
      });
    });
    setEditState(state);
    setIsEditing(true);
    setSuccessMsg("");
  };

  const handlePointChange = (maSV: string, maDD: string, value: string) => {
    let num = parseFloat(value);
    if (isNaN(num)) num = 0;
    if (num < 0) num = 0;
    if (num > 10) num = 10;
    setEditState(prev => ({ ...prev, [maSV]: { ...prev[maSV], [maDD]: num } }));
  };

  const handleSave = async () => {
    if (!selectedLop) return;
    setSaving(true);
    try {
      const danhSach: { maSV: string; MaDD: string; diem: number }[] = [];
      Object.entries(editState).forEach(([maSV, dds]) => {
        Object.entries(dds).forEach(([MaDD, diem]) => {
          danhSach.push({ maSV, MaDD, diem });
        });
      });
      await luuBangDiem({ maLopHP: selectedLop.maLopHP, MaMonHoc: selectedLop.MaMonHoc, danhSach });
      setIsEditing(false);
      setSuccessMsg("✅ Lưu bảng điểm thành công!");
      await fetchClassData(selectedLop.maLopHP);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err: any) {
      alert("Lỗi lưu điểm: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const calcTotal = (maSV: string): number => {
    let total = 0;
    dauDiemList.forEach(dd => {
      const d = isEditing ? (editState[maSV]?.[dd.MaDD] ?? 0) : (getDiem(maSV, dd.MaDD) ?? 0);
      total += d * dd.HeSoDiem;
    });
    return Math.round(total * 100) / 100;
  };

  const getGPA = (total: number) => {
    if (total >= 9.0) return { gpa: 4.0, letter: "A+", color: "text-emerald-600 bg-emerald-50 border-emerald-200" };
    if (total >= 8.5) return { gpa: 3.8, letter: "A", color: "text-emerald-500 bg-emerald-50 border-emerald-100" };
    if (total >= 8.0) return { gpa: 3.5, letter: "B+", color: "text-blue-600 bg-blue-50 border-blue-200" };
    if (total >= 7.0) return { gpa: 3.0, letter: "B", color: "text-blue-500 bg-blue-50 border-blue-100" };
    if (total >= 6.5) return { gpa: 2.5, letter: "C+", color: "text-amber-600 bg-amber-50 border-amber-200" };
    if (total >= 5.5) return { gpa: 2.0, letter: "C", color: "text-amber-500 bg-amber-50 border-amber-100" };
    if (total >= 5.0) return { gpa: 1.5, letter: "D+", color: "text-orange-600 bg-orange-50 border-orange-200" };
    if (total >= 4.0) return { gpa: 1.0, letter: "D", color: "text-orange-500 bg-orange-50 border-orange-100" };
    return { gpa: 0.0, letter: "F", color: "text-rose-600 bg-rose-50 border-rose-200" };
  };

  const filtered = students.filter(sv =>
    sv.maSV.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sv.Hoten.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex items-center gap-3 text-blue-600 font-semibold animate-pulse">
          <Loader2 size={24} className="animate-spin" /> Đang tải...
        </div>
      </div>
    );
  }

  return (
    <div className="relative p-6 w-full h-full bg-gradient-to-br from-indigo-50 via-white to-slate-50 border border-slate-100 rounded-2xl flex flex-col overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-col sm:flex-row gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
            <BarChart3 size={36} className="text-blue-600" />
            Quản Lý Điểm Học Phần
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Nhập điểm từ đầu điểm trong CSDL, tự động quy đổi GPA
          </p>
        </div>
        <div className="flex gap-3 items-center">
          {successMsg && (
            <span className="text-emerald-600 font-semibold text-sm animate-pulse bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200">
              {successMsg}
            </span>
          )}
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold shadow-sm hover:bg-slate-50 transition-colors">
              <Download size={18} /> Xuất Bảng Điểm
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
              <div className="p-1">
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 rounded-lg">
                  <FileSpreadsheet size={16} /> Excel (.xlsx)
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50 rounded-lg">
                  <FileText size={16} /> PDF (.pdf)
                </button>
              </div>
            </div>
          </div>
          {!isEditing ? (
            <button onClick={handleEditClick} disabled={students.length === 0}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-blue-500/30 transition-all active:scale-[0.98] disabled:opacity-50">
              <Settings2 size={18} /> Nhập / Sửa Điểm
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 text-slate-600 rounded-xl font-semibold shadow-sm hover:bg-slate-50 transition-all">
                Hủy
              </button>
              <button onClick={handleSave} disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-[0.98] disabled:opacity-70">
                {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                {saving ? "Đang lưu..." : "Lưu Bảng Điểm"}
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
            <div className="w-72 relative" ref={dropdownRef}>
              <label className="text-xs font-semibold text-slate-500 mb-1.5 block">CHỌN LỚP HỌC PHẦN</label>
              <div className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm hover:border-slate-300 shadow-sm"
                onClick={() => setOpenLop(!openLop)}>
                <span className="truncate mr-2 font-bold text-blue-700">
                  {selectedLop ? (selectedLop.tenMonHoc || selectedLop.tenLop) + " - " + selectedLop.maLopHP : "Chưa có lớp"}
                </span>
                <ChevronDown size={16} className="text-slate-400 shrink-0" />
              </div>
              {openLop && lopList.length > 0 && (
                <div className="absolute z-20 mt-1 w-full rounded-xl border border-slate-200 bg-white shadow-xl py-1 max-h-60 overflow-auto">
                  {lopList.map(lop => (
                    <div key={lop.maLopHP}
                      className={`cursor-pointer px-4 py-2.5 text-sm hover:bg-blue-50 font-medium ${selectedLop?.maLopHP === lop.maLopHP ? "bg-blue-50 text-blue-600" : "text-slate-700"}`}
                      onClick={() => { setSelectedLop(lop); setOpenLop(false); setIsEditing(false); }}>
                      <div>{lop.tenMonHoc || lop.tenLop}</div>
                      <div className="text-xs text-slate-400">{lop.maLopHP} • {lop.MaMonHoc}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="relative w-full md:w-64">
              <label className="text-xs font-semibold text-slate-500 mb-1.5 block">TÌM KIẾM SINH VIÊN</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Mã SV, Tên SV..." value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm" />
              </div>
            </div>
            {dauDiemList.length > 0 && (
              <div className="ml-auto flex gap-3 text-xs font-semibold bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm">
                <span className="text-slate-500">Hệ số:</span>
                {dauDiemList.map(dd => (
                  <span key={dd.MaDD} className="text-blue-600">{dd.TenDD}: {Math.round(dd.HeSoDiem * 100)}%</span>
                ))}
              </div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-auto flex-1 rounded-2xl border border-slate-200 shadow-inner bg-white">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50 sticky top-0 z-10">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">STT</th>
                  <th className="px-5 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Mã SV</th>
                  <th className="px-5 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Họ và Tên</th>
                  {dauDiemList.map(dd => (
                    <th key={dd.MaDD} className="px-5 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">
                      {dd.TenDD} ({Math.round(dd.HeSoDiem * 100)}%)
                    </th>
                  ))}
                  <th className="px-5 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Tổng Kết</th>
                  <th className="px-5 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Điểm Chữ</th>
                  <th className="px-5 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Hệ 4</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6 + dauDiemList.length} className="px-6 py-12 text-center text-slate-400">
                      {students.length === 0 ? "Chưa có sinh viên trong lớp này." : "Không tìm thấy sinh viên."}
                    </td>
                  </tr>
                ) : (
                  filtered.map((sv, idx) => {
                    const total = calcTotal(sv.maSV);
                    const gpa = getGPA(total);
                    return (
                      <tr key={sv.maSV} className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-4 text-sm font-medium text-slate-500">{idx + 1}</td>
                        <td className="px-5 py-4 text-sm font-bold text-blue-600">{sv.maSV}</td>
                        <td className="px-5 py-4 text-sm font-bold text-slate-800">{sv.Hoten}</td>
                        {dauDiemList.map(dd => {
                          const val = getDiem(sv.maSV, dd.MaDD);
                          return (
                            <td key={dd.MaDD} className="px-5 py-4 text-center">
                              {isEditing ? (
                                <input type="number" step="0.1" min="0" max="10"
                                  value={editState[sv.maSV]?.[dd.MaDD] ?? 0}
                                  onChange={e => handlePointChange(sv.maSV, dd.MaDD, e.target.value)}
                                  className="w-20 px-2 py-1.5 border-2 border-blue-200 rounded-lg text-center font-bold text-blue-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                              ) : (
                                <span className={`font-medium ${val !== null ? "text-slate-700" : "text-slate-300"}`}>
                                  {val !== null ? val : "—"}
                                </span>
                              )}
                            </td>
                          );
                        })}
                        <td className="px-5 py-4 text-center">
                          <span className="font-bold text-lg text-indigo-700">{total.toFixed(2)}</span>
                        </td>
                        <td className="px-5 py-4 text-center">
                          <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-lg font-bold border ${gpa.color}`}>
                            {gpa.letter}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-center">
                          <span className="font-bold text-slate-600">{gpa.gpa.toFixed(1)}</span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
