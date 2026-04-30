"use client";

import { useEffect, useState } from "react";
import {
  Search, Plus, User, GraduationCap, Calendar,
  Pencil, Trash2, Library, BookOpen, Fingerprint, Activity, X, Info
} from "lucide-react";
import { getAllSinhvien, addSinhvien, updateSinhvien, deleteSinhvien } from "@/ApiCall/SinhvienApi";

type Sinhvien = {
  maSV: string;
  Hoten: string;
  GioiTinh?: string;
  NgaySinh: string;
  NganhHoc: string;
  KhoaHoc: string;
  MaLopHC: string;
  MaNguoiDung: string;
  TrangThai: string;
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Sinhvien[]>([]);
  const [searchTxt, setSearchTxt] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Partial<Sinhvien>>({});

  const fetchStudents = async () => {
    try {
      const data = await getAllSinhvien();
      if (Array.isArray(data)) {
        setStudents(data);
      } else {
        setStudents([]);
      }
    } catch (err) {
      console.error(err);
      setStudents([]);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTxt]);

  const displayedStudents = students.filter(s =>
    (s.Hoten && s.Hoten.toLowerCase().includes(searchTxt.toLowerCase())) ||
    (s.maSV && s.maSV.toLowerCase().includes(searchTxt.toLowerCase()))
  );

  const totalPages = Math.ceil(displayedStudents.length / itemsPerPage);
  const paginatedStudents = displayedStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const generateNewStudentId = () => {
    if (students.length === 0) return "SV001";
    
    let maxNum = 0;
    let currentPrefix = "SV";
    let currentPadding = 3;

    students.forEach(s => {
      // Tìm mã có dạng Tiền tố chữ + Hậu tố số (VD: SV001, CNTT05)
      const match = s.maSV.match(/^([a-zA-Z]*)(\d+)$/);
      if (match) {
        const prefix = match[1];
        const numStr = match[2];
        const num = parseInt(numStr, 10);
        
        if (num > maxNum) {
          maxNum = num;
          currentPrefix = prefix;
          currentPadding = numStr.length;
        }
      }
    });

    if (maxNum === 0) return "SV001";

    const nextNum = maxNum + 1;
    return `${currentPrefix}${nextNum.toString().padStart(currentPadding, "0")}`;
  };

  const openAddModal = () => {
    const nextId = generateNewStudentId();
    setFormData({ maSV: nextId });
    setIsEdit(false);
    setShowModal(true);
  };

  const openEditModal = (student: Sinhvien) => {
    // Format date properly for input type="date"
    const formattedDate = student.NgaySinh
      ? new Date(student.NgaySinh).toISOString().split('T')[0]
      : "";

    setFormData({ ...student, NgaySinh: formattedDate });
    setIsEdit(true);
    setShowModal(true);
  };

  const handleDelete = async (maSV: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa sinh viên này không?")) return;
    try {
      await deleteSinhvien(maSV);
      fetchStudents();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi xoá");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.maSV || !formData.Hoten) {
      alert("Vui lòng điền đủ mã SV và Tên!");
      return;
    }

    try {
      if (isEdit) {
        await updateSinhvien(formData.maSV, formData);
      } else {
        await addSinhvien(formData);
      }
      setShowModal(false);
      fetchStudents();
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi lưu!");
    }
  };

  return (
    <div className="relative p-6 w-full h-full bg-gradient-to-br from-indigo-50 via-white to-blue-50 border border-indigo-100 rounded-2xl flex flex-col overflow-hidden shadow-sm">

      {/* HEADER SECTION */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black tracking-tight flex items-center gap-3">
            <GraduationCap size={36} className="text-blue-600" />
            Quản Lý Sinh Viên
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Theo dõi và cập nhật hồ sơ lưu trữ của toàn bộ {students.length} sinh viên</p>
        </div>
        <button
          onClick={openAddModal}
          className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 active:scale-[0.97]"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          Thêm Sinh Viên Mới
        </button>
      </div>

      {/* FILTER & SEARCH */}
      <div className="flex gap-4 mb-6 z-10 w-full md:w-1/2 lg:w-1/3">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            value={searchTxt}
            onChange={(e) => setSearchTxt(e.target.value)}
            type="text"
            placeholder="Tìm kiếm theo MSSV hoặc Họ tên..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 placeholder:text-slate-400 shadow-sm"
          />
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="flex-1 bg-white/70 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-xl overflow-hidden flex flex-col">
        <div className="overflow-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 sticky top-0 backdrop-blur-md border-b border-slate-200 z-10">
              <tr>
                <th className="px-6 py-5 font-semibold tracking-wider">Sinh Viên</th>
                <th className="px-6 py-5 font-semibold tracking-wider text-center">Mã Lớp</th>
                <th className="px-6 py-5 font-semibold tracking-wider text-center">Ngành Học</th>
                <th className="px-6 py-5 font-semibold tracking-wider text-center">Khoá</th>
                <th className="px-6 py-5 font-semibold tracking-wider text-center">Trạng Thái</th>
                <th className="px-6 py-5 font-semibold tracking-wider text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {paginatedStudents.map((student, index) => (
                <tr key={student.maSV} className="hover:bg-blue-50/40 transition-colors duration-200 group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 flex items-center justify-center border border-white shadow-sm group-hover:scale-105 transition-transform">
                        <User size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-base">{student.Hoten}</div>
                        <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                          <Fingerprint size={12} /> {student.maSV}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-medium text-slate-700">{student.MaLopHC}</td>
                  <td className="px-6 py-4 text-center text-slate-600">{student.NganhHoc}</td>
                  <td className="px-6 py-4 text-center text-slate-600">K{student.KhoaHoc}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${student.TrangThai === "Đang học" || student.TrangThai === "1" ? "bg-emerald-100/80 text-emerald-700 border border-emerald-200" :
                        student.TrangThai === "Bảo lưu" ? "bg-amber-100/80 text-amber-700 border border-amber-200" :
                          "bg-rose-100/80 text-rose-700 border border-rose-200"
                      }`}>
                      <Activity size={12} />
                      {student.TrangThai}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => openEditModal(student)}
                        className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-600 hover:text-amber-700 transition-all shadow-sm"
                        title="Chỉnh sửa"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(student.maSV)}
                        className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 transition-all shadow-sm"
                        title="Xoá hồ sơ"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {displayedStudents.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <Info size={48} className="mb-4 opacity-50" />
                      <p className="text-lg">Không tìm thấy dữ liệu sinh viên nào.</p>
                      <p className="text-sm mt-1">Vui lòng kiểm tra lại từ khoá hoặc thêm sinh viên mới.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50/50">
            <span className="text-sm text-slate-500">
              Hiển thị từ {(currentPage - 1) * itemsPerPage + 1} đến {Math.min(currentPage * itemsPerPage, displayedStudents.length)} trong tổng số {displayedStudents.length} sinh viên
            </span>
            <div className="flex gap-2">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                Trước
              </button>
              <span className="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 border border-blue-100 rounded-lg">
                Trang {currentPage} / {totalPages}
              </span>
              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL (Thêm/Sửa Sinh Viên) */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                {isEdit ? <Pencil className="text-blue-600" /> : <Plus className="text-blue-600" />}
                {isEdit ? "Chỉnh Sửa Hồ Sơ" : "Thêm Sinh Viên Mới"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body - Form */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto px-8 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* MSSV */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Fingerprint size={16} className="text-blue-500" /> Mã Sinh Viên <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    disabled
                    readOnly
                    value={formData.maSV || ""}
                    type="text"
                    className="w-full px-4 py-3 bg-slate-200 border border-slate-300 rounded-xl text-sm focus:outline-none font-bold text-slate-500 cursor-not-allowed opacity-80"
                    placeholder="Đang sinh mã tự động..."
                  />
                </div>

                {/* Họ tên */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <User size={16} className="text-blue-500" /> Họ và Tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    value={formData.Hoten || ""}
                    onChange={(e) => setFormData({ ...formData, Hoten: e.target.value })}
                    type="text"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="VD: Nguyễn Văn A"
                  />
                </div>

                {/* Ngày sinh */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Calendar size={16} className="text-blue-500" /> Ngày Sinh
                  </label>
                  <input
                    value={formData.NgaySinh || ""}
                    onChange={(e) => setFormData({ ...formData, NgaySinh: e.target.value })}
                    type="date"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                {/* Ngành học */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Library size={16} className="text-blue-500" /> Ngành Học
                  </label>
                  <input
                    value={formData.NganhHoc || ""}
                    onChange={(e) => setFormData({ ...formData, NganhHoc: e.target.value })}
                    type="text"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="VD: Khoa học Máy tính"
                  />
                </div>

                {/* Mã Lớp */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <BookOpen size={16} className="text-blue-500" /> Mã Lớp Hành Chính
                  </label>
                  <input
                    value={formData.MaLopHC || ""}
                    onChange={(e) => setFormData({ ...formData, MaLopHC: e.target.value })}
                    type="text"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="VD: K64-CNTT"
                  />
                </div>

                {/* Khoá học */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <GraduationCap size={16} className="text-blue-500" /> Khoá Học
                  </label>
                  <input
                    value={formData.KhoaHoc || ""}
                    onChange={(e) => setFormData({ ...formData, KhoaHoc: e.target.value })}
                    type="number"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="VD: 64"
                  />
                </div>

                {/* Trạng thái */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Activity size={16} className="text-blue-500" /> Trạng Thái
                  </label>
                  <select
                    value={formData.TrangThai || "Đang học"}
                    onChange={(e) => setFormData({ ...formData, TrangThai: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                  >
                    <option value="Đang học">Đang học</option>
                    <option value="Bảo lưu">Bảo lưu</option>
                    <option value="Đã tốt nghiệp">Đã tốt nghiệp</option>
                    <option value="Đình chỉ">Đình chỉ</option>
                  </select>
                </div>

                {/* Mã người dùng liên kết */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <User size={16} className="text-blue-500" /> Tài khoản liên kết (Mã NguoiDung)
                  </label>
                  <input
                    value={formData.MaNguoiDung || ""}
                    onChange={(e) => setFormData({ ...formData, MaNguoiDung: e.target.value })}
                    type="text"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="VD: UID-999"
                  />
                </div>

              </div>

              {/* Modal Footer */}
              <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Huỷ Bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95"
                >
                  {isEdit ? "Cập Nhật Hồ Sơ" : "Thêm Sinh Viên Mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
