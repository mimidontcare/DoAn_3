"use client";

import { useEffect, useState } from "react";
import {
  Search, Plus, User, GraduationCap, Calendar,
  Pencil, Trash2, Library, BookOpen, Fingerprint, Activity, X, Info
} from "lucide-react";
import { getAllGiangvien, addGiangvien, updateGiangvien, deleteGiangvien } from "@/ApiCall/GiangvienApi";

type Giangvien = {
  maGiangVien: string;
  TenGiangVien: string;
  Khoa?: string;
  Mon?: string;
  NgaySinh?: string;
  TrinhDo?: string;
  MaNguoiDung?: string;
};

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Giangvien[]>([]);
  const [searchTxt, setSearchTxt] = useState("");

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Partial<Giangvien>>({});

  const fetchTeachers = async () => {
    try {
      const data = await getAllGiangvien();
      if (Array.isArray(data)) {
        setTeachers(data);
      } else {
        setTeachers([]);
      }
    } catch (err) {
      console.error(err);
      setTeachers([]);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const displayedTeachers = teachers.filter(t =>
    (t.TenGiangVien && t.TenGiangVien.toLowerCase().includes(searchTxt.toLowerCase())) ||
    (t.maGiangVien && t.maGiangVien.toLowerCase().includes(searchTxt.toLowerCase()))
  );

  const generateNewTeacherId = () => {
    if (teachers.length === 0) return "GV01";
    let maxNum = 0;
    let currentPrefix = "GV";
    let currentPadding = 2;

    teachers.forEach(t => {
      if (!t.maGiangVien) return;
      const match = t.maGiangVien.match(/^([a-zA-Z]*)(\d+)$/);
      if (match) {
        const numStr = match[2];
        const num = parseInt(numStr, 10);
        if (num > maxNum) {
          maxNum = num;
          currentPrefix = match[1];
          currentPadding = numStr.length;
        }
      }
    });

    if (maxNum === 0) return "GV01";
    return `${currentPrefix}${(maxNum + 1).toString().padStart(currentPadding, "0")}`;
  };

  const openAddModal = () => {
    const nextId = generateNewTeacherId();
    setFormData({ maGiangVien: nextId });
    setIsEdit(false);
    setShowModal(true);
  };

  const openEditModal = (teacher: Giangvien) => {
    const formattedDate = teacher.NgaySinh
      ? new Date(teacher.NgaySinh).toISOString().split('T')[0]
      : "";

    setFormData({ ...teacher, NgaySinh: formattedDate });
    setIsEdit(true);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa giảng viên này không?")) return;
    try {
      await deleteGiangvien(id);
      fetchTeachers();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi xoá");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.maGiangVien || !formData.TenGiangVien) {
      alert("Vui lòng điền đủ mã Giảng viên và Tên!");
      return;
    }

    try {
      if (isEdit) {
        await updateGiangvien(formData.maGiangVien, formData);
      } else {
        await addGiangvien(formData);
      }
      setShowModal(false);
      fetchTeachers();
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi lưu!");
    }
  };

  return (
    <div className="relative p-6 w-full h-full bg-gradient-to-br from-indigo-50 via-white to-blue-50 border border-indigo-100 rounded-2xl flex flex-col overflow-hidden shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black tracking-tight flex items-center gap-3">
            <GraduationCap size={36} className="text-blue-600" />
            Quản Lý Giảng Viên
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Theo dõi và cập nhật hồ sơ lưu trữ của toàn bộ {teachers.length} giảng viên</p>
        </div>
        <button
          onClick={openAddModal}
          className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 active:scale-[0.97]"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          Thêm Giảng Viên Mới
        </button>
      </div>

      <div className="flex gap-4 mb-6 z-10 w-full md:w-1/2 lg:w-1/3">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            value={searchTxt}
            onChange={(e) => setSearchTxt(e.target.value)}
            type="text"
            placeholder="Tìm kiếm theo Mã GV hoặc Họ tên..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 placeholder:text-slate-400 shadow-sm"
          />
        </div>
      </div>

      <div className="flex-1 bg-white/70 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-xl overflow-hidden flex flex-col">
        <div className="overflow-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 sticky top-0 backdrop-blur-md border-b border-slate-200 z-10">
              <tr>
                <th className="px-6 py-5 font-semibold tracking-wider">Giảng Viên</th>
                <th className="px-6 py-5 font-semibold tracking-wider text-center">Trình Độ</th>
                <th className="px-6 py-5 font-semibold tracking-wider text-center">Khoa</th>
                <th className="px-6 py-5 font-semibold tracking-wider text-center">Bộ Môn</th>
                <th className="px-6 py-5 font-semibold tracking-wider text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {displayedTeachers.map((teacher) => (
                <tr key={teacher.maGiangVien} className="hover:bg-blue-50/40 transition-colors duration-200 group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 flex items-center justify-center border border-white shadow-sm group-hover:scale-105 transition-transform">
                        <User size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-base">{teacher.TenGiangVien}</div>
                        <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                          <Fingerprint size={12} /> {teacher.maGiangVien}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-medium text-slate-700">{teacher.TrinhDo || "-"}</td>
                  <td className="px-6 py-4 text-center text-slate-600">{teacher.Khoa || "-"}</td>
                  <td className="px-6 py-4 text-center text-slate-600">{teacher.Mon || "-"}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => openEditModal(teacher)}
                        className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-600 hover:text-amber-700 transition-all shadow-sm"
                        title="Chỉnh sửa"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(teacher.maGiangVien)}
                        className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 transition-all shadow-sm"
                        title="Xoá hồ sơ"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {displayedTeachers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <Info size={48} className="mb-4 opacity-50" />
                      <p className="text-lg">Không tìm thấy dữ liệu giảng viên nào.</p>
                      <p className="text-sm mt-1">Vui lòng kiểm tra lại từ khoá hoặc thêm giảng viên mới.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                {isEdit ? <Pencil className="text-blue-600" /> : <Plus className="text-blue-600" />}
                {isEdit ? "Chỉnh Sửa Hồ Sơ" : "Thêm Giảng Viên Mới"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex-1 overflow-y-auto px-8 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Fingerprint size={16} className="text-blue-500" /> Mã Giảng Viên <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    disabled
                    readOnly
                    value={formData.maGiangVien || ""}
                    type="text"
                    className="w-full px-4 py-3 bg-slate-200 border border-slate-300 rounded-xl text-sm focus:outline-none font-bold text-slate-500 cursor-not-allowed opacity-80"
                    placeholder="Đang sinh mã tự động..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <User size={16} className="text-blue-500" /> Họ và Tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    value={formData.TenGiangVien || ""}
                    onChange={(e) => setFormData({ ...formData, TenGiangVien: e.target.value })}
                    type="text"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="VD: Nguyễn Văn A"
                  />
                </div>

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

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Library size={16} className="text-blue-500" /> Khoa
                  </label>
                  <input
                    value={formData.Khoa || ""}
                    onChange={(e) => setFormData({ ...formData, Khoa: e.target.value })}
                    type="text"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="VD: Công nghệ Thông tin"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <BookOpen size={16} className="text-blue-500" /> Bộ Môn
                  </label>
                  <input
                    value={formData.Mon || ""}
                    onChange={(e) => setFormData({ ...formData, Mon: e.target.value })}
                    type="text"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="VD: Kỹ thuật phần mềm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <GraduationCap size={16} className="text-blue-500" /> Trình Độ
                  </label>
                  <input
                    value={formData.TrinhDo || ""}
                    onChange={(e) => setFormData({ ...formData, TrinhDo: e.target.value })}
                    type="text"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="VD: Tiến sĩ"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <User size={16} className="text-blue-500" /> Tài khoản liên kết
                  </label>
                  <input
                    value={formData.MaNguoiDung || ""}
                    onChange={(e) => setFormData({ ...formData, MaNguoiDung: e.target.value })}
                    type="text"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="VD: UID-123"
                  />
                </div>

              </div>

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
                  {isEdit ? "Cập Nhật Hồ Sơ" : "Thêm Giảng Viên"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
