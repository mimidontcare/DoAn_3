"use client";

import React, { useState } from "react";
import { BookOpen, Save, X } from "lucide-react";
import { addLopHP } from "@/ApiCall/LopHPApi";

type Props = {
  className?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export default function AddLopHPModal({
  className,
  onSuccess,
  onCancel,
}: Props) {
  const [formData, setFormData] = useState({
    MaLopHocPhan: "",
    maLopHP: "",
    MaMonHoc: "",
    soLuongSinhVien: "",
    tenLop: "",
    thoigianDong: "",
    ThoigianMo: "",
    thuTuUuTien: "",
    maGiangVien: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.MaLopHocPhan || !formData.tenLop) {
      alert("Vui lòng điền mã lớp học phần và tên lớp");
      return;
    }

    try {
      const payload = {
        ...formData,
        soLuongSinhVien: Number(formData.soLuongSinhVien) || 0,
        thuTuUuTien: Number(formData.thuTuUuTien) || 0,
      };
      
      const res = await addLopHP(payload);

      if (res.error || res.sqlMessage) {
        alert("Lỗi: " + (res.sqlMessage || res.error));
        return;
      }

      alert("Thêm lớp học phần thành công!");
      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối server");
    }
  };

  return (
    <div className={`${className} z-[100] bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200`}>
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <BookOpen className="text-blue-600" size={24} />
            Thêm lớp học phần
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                Mã lớp học phần <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="MaLopHocPhan"
                value={formData.MaLopHocPhan}
                onChange={handleChange}
                placeholder="VD: HP001"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                Tên lớp HP <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="tenLop"
                value={formData.tenLop}
                onChange={handleChange}
                placeholder="VD: Cấu trúc dữ liệu và giải thuật"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                Mã Lớp HP (Group)
              </label>
              <input
                type="text"
                name="maLopHP"
                value={formData.maLopHP}
                onChange={handleChange}
                placeholder="VD: L01"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                Mã môn học
              </label>
              <input
                type="text"
                name="MaMonHoc"
                value={formData.MaMonHoc}
                onChange={handleChange}
                placeholder="VD: C01003"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                Giảng viên phụ trách
              </label>
              <input
                type="text"
                name="maGiangVien"
                value={formData.maGiangVien}
                onChange={handleChange}
                placeholder="VD: GV001"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                Số lượng sinh viên
              </label>
              <input
                type="number"
                name="soLuongSinhVien"
                value={formData.soLuongSinhVien}
                onChange={handleChange}
                placeholder="VD: 50"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                Thời gian mở
              </label>
              <input
                type="date"
                name="ThoigianMo"
                value={formData.ThoigianMo}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                Thời gian đóng
              </label>
              <input
                type="date"
                name="thoigianDong"
                value={formData.thoigianDong}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            
            <div className="col-span-1 md:col-span-2 space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                Thứ tự ưu tiên
              </label>
              <input
                type="number"
                name="thuTuUuTien"
                value={formData.thuTuUuTien}
                onChange={handleChange}
                placeholder="VD: 1"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Huỷ Bỏ
            </button>
            <button
              type="submit"
              className="px-6 py-3 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95 flex items-center gap-2"
            >
              Lưu Thành Mới
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
