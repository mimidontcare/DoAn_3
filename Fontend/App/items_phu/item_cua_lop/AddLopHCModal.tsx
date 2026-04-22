"use client";

import React, { useState, useEffect } from "react";
import { School, Save, X, GraduationCap, User } from "lucide-react";
import { addLopHC, updateLopHC } from "@/ApiCall/LopHCApi";

type LopHCData = {
  MaLopHC: string;
  TenLop: string;
  KhoaHoc: string;
  NganhHoc: string;
  CoVan: string;
  SISO: string | number;
};

type Props = {
  className?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  editData?: LopHCData | null; // nếu có → chế độ sửa
};

export default function AddLopHCModal({
  className,
  onSuccess,
  onCancel,
  editData,
}: Props) {
  const isEdit = !!editData;

  const emptyForm: LopHCData = {
    MaLopHC: "",
    TenLop: "",
    KhoaHoc: "",
    NganhHoc: "",
    CoVan: "",
    SISO: "",
  };

  const [formData, setFormData] = useState<LopHCData>(emptyForm);

  // Khi mở modal sửa → load dữ liệu vào form
  useEffect(() => {
    if (editData) {
      setFormData({
        ...editData,
        SISO: editData.SISO?.toString() ?? "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.MaLopHC || !formData.TenLop) {
      alert("Vui lòng điền mã lớp và tên lớp");
      return;
    }

    const payload = { ...formData, SISO: Number(formData.SISO) || 0 };

    try {
      if (isEdit) {
        const res = await updateLopHC(editData!.MaLopHC, payload);
        if (res.success) {
          alert("Cập nhật lớp hành chính thành công");
          onSuccess?.();
        } else {
          alert(res.message || "Cập nhật thất bại");
        }
      } else {
        const res = await addLopHC(payload);
        if (res.success) {
          alert("Thêm lớp hành chính thành công");
          onSuccess?.();
        } else {
          alert(res.message || "Thêm thất bại");
        }
      }
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
            <School className="text-blue-600" size={24} />
            {isEdit ? "Chỉnh sửa lớp hành chính" : "Thêm lớp hành chính"}
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

            {/* Mã lớp HC */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                Mã lớp HC <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="MaLopHC"
                value={formData.MaLopHC}
                onChange={handleChange}
                disabled={isEdit}
                placeholder="VD: CNTT1"
                className={`w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${isEdit ? "opacity-60 cursor-not-allowed" : ""}`}
              />
            </div>

            {/* Tên lớp */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                Tên lớp <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="TenLop"
                value={formData.TenLop}
                onChange={handleChange}
                placeholder="VD: K65-CNTT-01"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Khóa học */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <GraduationCap size={15} className="text-slate-500" />
                Khóa
              </label>
              <input
                type="text"
                name="KhoaHoc"
                value={formData.KhoaHoc}
                onChange={handleChange}
                placeholder="VD: K65"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Ngành học / Khoa */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                Khoa (Ngành học)
              </label>
              <input
                type="text"
                name="NganhHoc"
                value={formData.NganhHoc}
                onChange={handleChange}
                placeholder="VD: Công nghệ thông tin"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Cố vấn */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <User size={15} className="text-slate-500" />
                Cố vấn học tập
              </label>
              <input
                type="text"
                name="CoVan"
                value={formData.CoVan}
                onChange={handleChange}
                placeholder="VD: TS. Nguyễn Văn An"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Sĩ số */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                Sĩ số
              </label>
              <input
                type="number"
                name="SISO"
                value={formData.SISO}
                onChange={handleChange}
                placeholder="VD: 45"
                min={0}
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
              <Save size={16} />
              {isEdit ? "Cập nhật" : "Lưu Thành Mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
