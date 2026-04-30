"use client";

import { useEffect, useState } from "react";
import {
  Search, Plus, Book, Calendar, Pencil, Trash2, X, Info, Hash, Activity
} from "lucide-react";
import { getAllMonhoc, addMonhoc, updateMonhoc, deleteMonhoc } from "@/ApiCall/MonhocApi";
import { getAllNganh } from "@/ApiCall/NganhApi";

type Monhoc = {
  maMonHoc: number | string;
  tenMonHoc: string;
  maNganh: string;
  soTiet: number;
  soTinChi: number;
  thuTuUtien: number;
};

type Nganh = {
  maNganh: string;
  tenNganh: string;
};

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Monhoc[]>([]);
  const [nganhs, setNganhs] = useState<Nganh[]>([]);
  const [searchTxt, setSearchTxt] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState<Partial<Monhoc>>({});

  const fetchSubjects = async () => {
    try {
      const data = await getAllMonhoc();
      if (Array.isArray(data)) {
        setSubjects(data);
      } else {
        setSubjects([]);
      }
    } catch (err) {
      console.error(err);
      setSubjects([]);
    }
  };

  const fetchNganhs = async () => {
    try {
      const data = await getAllNganh();
      if (Array.isArray(data)) {
        setNganhs(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSubjects();
    fetchNganhs();
  }, []);

  const displayedSubjects = subjects.filter((s) =>
    (s.tenMonHoc && s.tenMonHoc.toLowerCase().includes(searchTxt.toLowerCase())) ||
    (s.maMonHoc && String(s.maMonHoc).toLowerCase().includes(searchTxt.toLowerCase())) ||
    (s.maNganh && s.maNganh.toLowerCase().includes(searchTxt.toLowerCase()))
  );

  const openAddModal = () => {
    setFormData({
      soTiet: 30,
      soTinChi: 3,
      thuTuUtien: 1
    });
    setIsEdit(false);
    setShowModal(true);
  };

  const openEditModal = (subject: Monhoc) => {
    setFormData({ ...subject });
    setIsEdit(true);
    setShowModal(true);
  };

  const handleDelete = async (maMonHoc: number | string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa môn học này không?")) return;
    try {
      await deleteMonhoc(maMonHoc);
      fetchSubjects();
      alert("Xóa thành công!");
    } catch (err: any) {
      console.error(err);
      alert("Không thể xóa môn học này: " + err.message);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tenMonHoc || !formData.maNganh) {
      alert("Vui lòng điền đủ Tên môn và Mã ngành!");
      return;
    }

    try {
      if (isEdit && formData.maMonHoc) {
        await updateMonhoc(formData.maMonHoc, formData);
        alert("Cập nhật thành công!");
      } else {
        await addMonhoc(formData);
        alert("Thêm mới thành công!");
      }
      setShowModal(false);
      fetchSubjects();
    } catch (err: any) {
      console.error(err);
      alert("Có lỗi xảy ra: " + err.message);
    }
  };

  return (
    <div className="relative p-6 w-full h-full bg-gradient-to-br from-indigo-50 via-white to-blue-50 border border-indigo-100 rounded-2xl flex flex-col overflow-hidden shadow-sm">
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black tracking-tight flex items-center gap-3">
            <Book size={36} className="text-blue-600" />
            Quản Lý Môn Học
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Theo dõi và cập nhật chương trình đào tạo của {subjects.length} môn học</p>
        </div>
        <button
          onClick={openAddModal}
          className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 active:scale-[0.97]"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          Thêm Môn Mới
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
            placeholder="Tìm kiếm theo mã, tên môn hoặc mã ngành..."
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
                <th className="px-6 py-5 font-semibold tracking-wider">Mã Môn</th>
                <th className="px-6 py-5 font-semibold tracking-wider">Tên Môn Học</th>
                <th className="px-6 py-5 font-semibold tracking-wider text-center">Ngành</th>
                <th className="px-6 py-5 font-semibold tracking-wider text-center">Số Tín Chỉ</th>
                <th className="px-6 py-5 font-semibold tracking-wider text-center">Số Tiết</th>
                <th className="px-6 py-5 font-semibold tracking-wider text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {displayedSubjects.map((subject) => (
                <tr key={subject.maMonHoc} className="hover:bg-blue-50/40 transition-colors duration-200 group">
                  <td className="px-6 py-4 font-medium text-slate-700">{subject.maMonHoc}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                        <Book size={18} />
                      </div>
                      <span className="font-bold text-slate-900 text-base">{subject.tenMonHoc}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-medium text-slate-600">
                    <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-md text-xs border border-indigo-100">{subject.maNganh}</span>
                  </td>
                  <td className="px-6 py-4 text-center text-slate-700 font-bold">{subject.soTinChi}</td>
                  <td className="px-6 py-4 text-center text-slate-600">{subject.soTiet}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => openEditModal(subject)}
                        className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-600 hover:text-amber-700 transition-all shadow-sm"
                        title="Chỉnh sửa"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(subject.maMonHoc)}
                        className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 transition-all shadow-sm"
                        title="Xoá môn học"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {displayedSubjects.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <Info size={48} className="mb-4 opacity-50" />
                      <p className="text-lg">Không tìm thấy dữ liệu môn học nào.</p>
                      <p className="text-sm mt-1">Vui lòng kiểm tra lại từ khoá hoặc thêm môn mới.</p>
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
            {/* Header */}
            <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                {isEdit ? <Pencil className="text-blue-600" /> : <Plus className="text-blue-600" />}
                {isEdit ? "Chỉnh Sửa Môn Học" : "Thêm Môn Học Mới"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto px-8 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Tên môn học (Chiếm 2 cột) */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Book size={16} className="text-blue-500" /> Tên Môn Học <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    value={formData.tenMonHoc || ""}
                    onChange={(e) => setFormData({ ...formData, tenMonHoc: e.target.value })}
                    type="text"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="VD: Cấu trúc dữ liệu và thuật toán"
                  />
                </div>

                {/* Ngành học */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Activity size={16} className="text-blue-500" /> Mã Ngành Thuộc Về <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.maNganh || ""}
                    onChange={(e) => setFormData({ ...formData, maNganh: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  >
                    <option value="" disabled>-- Chọn Ngành Đào Tạo --</option>
                    {nganhs.map((n) => (
                      <option key={n.maNganh} value={n.maNganh}>{n.maNganh} - {n.tenNganh}</option>
                    ))}
                  </select>
                </div>

                {/* Số Tín Chỉ */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Hash size={16} className="text-blue-500" /> Số Tín Chỉ <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    value={formData.soTinChi || ""}
                    onChange={(e) => setFormData({ ...formData, soTinChi: Number(e.target.value) })}
                    type="number"
                    min={1}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="VD: 3"
                  />
                </div>

                {/* Số Tiết */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Calendar size={16} className="text-blue-500" /> Số Tiết <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    value={formData.soTiet || ""}
                    onChange={(e) => setFormData({ ...formData, soTiet: Number(e.target.value) })}
                    type="number"
                    min={1}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="VD: 45"
                  />
                </div>

                {/* Thứ tự ưu tiên */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Activity size={16} className="text-blue-500" /> Thứ tự ưu tiên (Học kỳ)
                  </label>
                  <input
                    value={formData.thuTuUtien || ""}
                    onChange={(e) => setFormData({ ...formData, thuTuUtien: Number(e.target.value) })}
                    type="number"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="VD: 1 (Học kỳ 1)"
                  />
                </div>

              </div>

              {/* Footer */}
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
                  {isEdit ? "Cập Nhật" : "Thêm Môn Mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
