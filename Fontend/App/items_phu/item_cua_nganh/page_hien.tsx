"use client";

import { X, Save, GraduationCap, Import } from "lucide-react";
import { useState, useEffect } from "react";
import { getAll } from "@/ApiCall/KhoaApi";
import { getAllNganh } from "@/ApiCall/NganhApi";

type NganhForm = {
  maKhoa: string;
  maNganh: string;
  tenNganh: string;
  trinhDoDaoTao: string;
  soTinChi: number | "";
};
type formKhoa = {
  maKhoa: string;
  tenKhoa: string;
  sdt?: string;
  email?: string;
  TruongKhoa?: string;
};

type props = {
  className?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  setDisplayform?: React.Dispatch<React.SetStateAction<boolean>>;
  maKhoa?: string | null;
  suaorThem?: boolean;
  nganh?: NganhForm;
};

const ItemHien_Nganh = ({
  className,
  onSuccess,
  onCancel,
  setDisplayform,
  maKhoa,
  suaorThem,
  nganh,
}: props) => {
  const emptyForm: NganhForm = {
    maKhoa: maKhoa || "",
    maNganh: "",
    tenNganh: "",
    trinhDoDaoTao: "",
    soTinChi: "",
  };

  const [formData, setFormData] = useState<NganhForm>(emptyForm);

  // khi nhận mã khoa từ component cha
  useEffect(() => {
    if (maKhoa) {
      setFormData((prev) => ({
        ...prev,
        maKhoa: maKhoa,
      }));
    }
  }, [maKhoa]);

  // khi sửa ngành
  useEffect(() => {
    if (suaorThem && nganh) {
      setFormData(nganh);
    } else {
      setFormData(emptyForm);
    }
  }, [suaorThem, nganh]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "soTinChi" ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    console.log("Ngành:", formData);

    onSuccess?.();
    setDisplayform?.(false);
  };
  const [khoas, setKhoas] = useState<formKhoa[]>([]);
  const [nganhs, setNganhs] = useState<FormData[]>([]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await getAll();
        setKhoas(data);
        console.log(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, []);
  useEffect(() => {
    const fetchapi = async () => {
      try {
        const data = await getAllNganh();
        setNganhs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchapi();
  }, []);
  return (
    <div className={className}>
      <div className="bg-white w-[420px] rounded-2xl shadow-xl border border-gray-200 p-6 space-y-5">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="text-blue-600" size={22} />
            <h2 className="text-xl font-bold text-gray-800">
              {suaorThem ? "Sửa ngành" : "Thêm ngành"}
            </h2>
          </div>

          <button
            onClick={() => setDisplayform?.(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          {/* MÃ KHOA */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Mã khoa</label>

            <select
              name="maKhoa"
              value={formData.maKhoa}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Chọn khoa</option>
              {khoas.map((khoa) => {
                return (
                  <option key={khoa.maKhoa} value={khoa.maKhoa}>
                    {khoa.tenKhoa}
                  </option>
                );
              })}
            </select>
          </div>

          {/* MÃ NGÀNH */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Mã ngành
            </label>

            <input
              name="maNganh"
              value={formData.maNganh}
              onChange={handleChange}
              placeholder="VD: CNTT01"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* TÊN NGÀNH */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Tên ngành
            </label>

            <input
              name="tenNganh"
              value={formData.tenNganh}
              onChange={handleChange}
              placeholder="Công nghệ thông tin"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* TRÌNH ĐỘ */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Trình độ đào tạo
            </label>

            <input
              name="trinhDoDaoTao"
              value={formData.trinhDoDaoTao}
              onChange={handleChange}
              placeholder="Đại học"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* SỐ TÍN CHỈ */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Số tín chỉ
            </label>

            <input
              type="number"
              name="soTinChi"
              value={formData.soTinChi}
              onChange={handleChange}
              placeholder="140"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
        </div>

        {/* BUTTON */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            onClick={() => setDisplayform?.(false)}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition"
          >
            Hủy
          </button>

          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
          >
            <Save size={16} />
            {suaorThem ? "Cập nhật" : "Thêm khoa"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemHien_Nganh;
