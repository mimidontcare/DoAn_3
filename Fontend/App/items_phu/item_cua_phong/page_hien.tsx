"use client";

import React, { useState, useEffect } from "react";
import { DoorOpen, Users, Activity, Save, X, Hash } from "lucide-react";
import { addPhongHoc, updatePhongHoc } from "@/ApiCall/PhonghocApi";

type PhongHocData = {
  maPhongHoc: string;
  TenPhong: string;
  sucChua: string | number;
  trangThai: string;
};

type Props = {
  className?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  editData?: PhongHocData | null;
};

export default function AddPhongHocModal({
  className,
  onSuccess,
  onCancel,
  editData,
}: Props) {
  const isEdit = !!editData;

  const emptyForm: PhongHocData = {
    maPhongHoc: "",
    TenPhong: "",
    sucChua: "",
    trangThai: "Sẵn sàng",
  };

  const [formData, setFormData] = useState<PhongHocData>(emptyForm);

  useEffect(() => {
    if (editData) {
      setFormData({
        ...editData,
        sucChua: editData.sucChua?.toString() ?? "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.maPhongHoc || !formData.TenPhong) {
      alert("Vui lòng nhập đầy đủ mã phòng và tên phòng");
      return;
    }

    const payload = {
      ...formData,
      sucChua: Number(formData.sucChua) || 0,
    };

    try {
      let res;
      if (isEdit && editData?.maPhongHoc) {
        res = await updatePhongHoc(editData.maPhongHoc, payload);
      } else {
        res = await addPhongHoc(payload);
      }

      if (res.success) {
        alert(isEdit ? "Cập nhật phòng học thành công" : "Thêm phòng học thành công");
        onSuccess?.();
      } else {
        alert(res.message || "Thao tác thất bại");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối server");
    }
  };

  return (
    <div className={`${className} z-[210] bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200`}>
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <DoorOpen className="text-blue-600" size={24} />
            {isEdit ? "Chỉnh sửa phòng học" : "Thêm phòng học mới"}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* Mã phòng */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              Mã phòng <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="maPhongHoc"
                value={formData.maPhongHoc}
                onChange={handleChange}
                disabled={isEdit}
                placeholder="VD: PH01, A101..."
                className={`w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${isEdit ? "opacity-60 cursor-not-allowed" : ""}`}
              />
              <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {/* Tên phòng */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              Tên phòng <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="TenPhong"
                value={formData.TenPhong}
                onChange={handleChange}
                placeholder="VD: Phòng máy tính 01"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <DoorOpen size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Sức chứa */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                Sức chứa
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="sucChua"
                  value={formData.sucChua}
                  onChange={handleChange}
                  placeholder="50"
                  min={0}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {/* Trạng thái */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                Trạng thái
              </label>
              <select
                name="trangThai"
                value={formData.trangThai}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              >
                <option value="Sẵn sàng">Sẵn sàng</option>
                <option value="Bận">Bận</option>
              </select>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
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
              {isEdit ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
