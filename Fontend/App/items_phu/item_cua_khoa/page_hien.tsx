"use client";

import React, { useState, useEffect } from "react";
import { Building2, Phone, Mail, User, Save, X } from "lucide-react";
import { addKhoa } from "@/ApiCall/KhoaApi";

type KhoaFormData = {
  maKhoa: string;
  tenKhoa: string;
  sdt?: string;
  email?: string;
  TruongKhoa?: string;
};

type Props = {
  className?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  setDisplayform?: React.Dispatch<React.SetStateAction<boolean>>;
  khoa?: KhoaFormData;
  suaorThem?: boolean; // true = sửa , false = thêm
};

export default function Item_hien({
  className,
  onSuccess,
  onCancel,
  setDisplayform,
  khoa,
  suaorThem = false,
}: Props) {
  const emptyForm: KhoaFormData = {
    maKhoa: "",
    tenKhoa: "",
    sdt: "",
    email: "",
    TruongKhoa: "",
  };

  const [formData, setFormData] = useState<KhoaFormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<KhoaFormData>>({});

  /*
  ====================================================
  Khi mở form:
  nếu sửa -> load dữ liệu khoa
  nếu thêm -> reset form
  ====================================================
  */

  useEffect(() => {
    if (suaorThem && khoa) {
      setFormData(khoa);
    } else {
      setFormData(emptyForm);
    }
  }, [khoa, suaorThem]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof KhoaFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<KhoaFormData> = {};

    if (!formData.maKhoa.trim())
      newErrors.maKhoa = "Mã khoa không được để trống";
    else if (formData.maKhoa.length > 10)
      newErrors.maKhoa = "Mã khoa tối đa 10 ký tự";

    if (!formData.tenKhoa.trim())
      newErrors.tenKhoa = "Tên khoa không được để trống";
    else if (formData.tenKhoa.length > 100)
      newErrors.tenKhoa = "Tên khoa tối đa 100 ký tự";

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (
      formData.sdt &&
      !/^\+?\d{9,15}$/.test(formData.sdt.replace(/\s/g, ""))
    ) {
      newErrors.sdt = "Số điện thoại không hợp lệ (9-15 số)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      console.log("DATA GỬI:", formData);
      const res = await addKhoa(formData); // 🔥 phải await

      console.log("API trả về:", res);

      if (!res.success) {
        alert(res.message);
        return;
      }

      alert("Thêm thành công");

      setFormData(emptyForm);
      setErrors({});
      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối server");
    }
  };
  const handleCancel = () => {
    setFormData(emptyForm);
    setErrors({});
    setDisplayform?.(false);
    onCancel?.();
  };

  return (
    <div className={`${className} z-[100] bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200`}>
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}

        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between relative">
          <div className="flex items-center gap-3 text-slate-800">
            <Building2 className="text-blue-600" size={24} />
            <h2 className="text-2xl font-bold">
              {suaorThem ? "Chỉnh sửa khoa" : "Thêm khoa mới"}
            </h2>
          </div>

          <button
            type="button"
            onClick={handleCancel}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="p-8 space-y-6 flex-1 overflow-y-auto">
          {/* Mã khoa */}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              Mã khoa <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <input
                type="text"
                name="maKhoa"
                value={formData.maKhoa}
                onChange={handleChange}
                maxLength={10}
                placeholder="VD: CNTT"
                className={`w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                  errors.maKhoa
                    ? "border-red-400 focus:ring-red-200"
                    : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"
                }`}
              />

              <Building2
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>

            {errors.maKhoa && (
              <p className="mt-1.5 text-sm text-red-600">{errors.maKhoa}</p>
            )}
          </div>

          {/* Tên khoa */}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              Tên khoa <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              name="tenKhoa"
              value={formData.tenKhoa}
              onChange={handleChange}
              maxLength={100}
              placeholder="VD: Khoa Công nghệ Thông tin"
              className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.tenKhoa
                  ? "border-red-400 focus:ring-red-200"
                  : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"
              }`}
            />

            {errors.tenKhoa && (
              <p className="mt-1.5 text-sm text-red-600">{errors.tenKhoa}</p>
            )}
          </div>

          {/* SĐT */}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              Số điện thoại
            </label>

            <div className="relative">
              <input
                type="tel"
                name="sdt"
                value={formData.sdt}
                onChange={handleChange}
                placeholder="0987654321"
                className={`w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                  errors.sdt
                    ? "border-red-400 focus:ring-red-200"
                    : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"
                }`}
              />

              <Phone
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>

            {errors.sdt && (
              <p className="mt-1.5 text-sm text-red-600">{errors.sdt}</p>
            )}
          </div>

          {/* Email */}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="khoa@edu.vn"
                className={`w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                  errors.email
                    ? "border-red-400 focus:ring-red-200"
                    : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"
                }`}
              />

              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>

            {errors.email && (
              <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Trưởng khoa */}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              Trưởng khoa
            </label>

            <div className="relative">
              <input
                type="text"
                name="TruongKhoa"
                value={formData.TruongKhoa}
                onChange={handleChange}
                placeholder="Họ và tên"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />

              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          {/* Buttons */}

          <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Huỷ Bỏ
            </button>

            <button
              type="submit"
              className="px-6 py-3 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95 flex items-center gap-2"
            >
              {suaorThem ? "Cập nhật" : "Thêm khoa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
