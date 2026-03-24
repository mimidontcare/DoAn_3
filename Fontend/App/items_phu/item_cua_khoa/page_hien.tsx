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
    <div className={className}>
      <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        {/* Header */}

        <div className="px-6 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <Building2 size={24} />
            <h2 className="text-xl font-semibold">
              {suaorThem ? "Chỉnh sửa khoa" : "Thêm khoa mới"}
            </h2>
          </div>

          <button
            type="button"
            onClick={handleCancel}
            className="absolute top-3 right-4 p-1.5 rounded-full hover:bg-white/20 transition-colors text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Mã khoa */}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
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
                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                  errors.maKhoa
                    ? "border-red-400 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-100"
                }`}
              />

              <Building2
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            {errors.maKhoa && (
              <p className="mt-1.5 text-sm text-red-600">{errors.maKhoa}</p>
            )}
          </div>

          {/* Tên khoa */}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Tên khoa <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              name="tenKhoa"
              value={formData.tenKhoa}
              onChange={handleChange}
              maxLength={100}
              placeholder="VD: Khoa Công nghệ Thông tin"
              className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                errors.tenKhoa
                  ? "border-red-400 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-100"
              }`}
            />

            {errors.tenKhoa && (
              <p className="mt-1.5 text-sm text-red-600">{errors.tenKhoa}</p>
            )}
          </div>

          {/* SĐT */}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Số điện thoại
            </label>

            <div className="relative">
              <input
                type="tel"
                name="sdt"
                value={formData.sdt}
                onChange={handleChange}
                placeholder="0987654321"
                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                  errors.sdt
                    ? "border-red-400 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-100"
                }`}
              />

              <Phone
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            {errors.sdt && (
              <p className="mt-1.5 text-sm text-red-600">{errors.sdt}</p>
            )}
          </div>

          {/* Email */}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="khoa@edu.vn"
                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-400 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-100"
                }`}
              />

              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            {errors.email && (
              <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Trưởng khoa */}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Trưởng khoa
            </label>

            <div className="relative">
              <input
                type="text"
                name="TruongKhoa"
                value={formData.TruongKhoa}
                onChange={handleChange}
                placeholder="Họ và tên"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
              />

              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Thoát
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg flex items-center gap-2"
            >
              <Save size={18} />
              {suaorThem ? "Cập nhật" : "Thêm khoa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
