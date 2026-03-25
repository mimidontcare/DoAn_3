"use client";
import {
  Search,
  Pencil,
  Trash2,
  Plus,
  Building2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import Item_hien from "@/app/items_phu/item_cua_khoa/page_hien";
import ItemHien_Nganh from "@/app/items_phu/item_cua_nganh/page_hien";
import { getAll } from "@/ApiCall/KhoaApi";
import { getAllNganh } from "@/ApiCall/NganhApi";
import { get } from "http";
type formKhoa = {
  maKhoa: string;
  tenKhoa: string;
  sdt?: string;
  email?: string;
  TruongKhoa?: string;
};
type formNganh = {
  maNganh: string;
  tenNganh: string;
  maKhoa: string;
  trinhDoDaoTao: string;
  soTinChi: number;
};

export default function Page() {
  const [khoas, setKhoas] = useState<formKhoa[]>([]);
  const [nganhs, setNganhs] = useState<formNganh[]>([]);

  const [displayForm, setDisplayForm] = useState(false);
  const [selectedKhoa, setSelectedKhoa] = useState<string | null>(null); // mã khoa đang xem
  const [selectedNganh, setSelectedNganh] = useState(false); // mã ngành đang xem
  const [sua, setSua] = useState(false);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await getAll();
        console.log(data);
        setKhoas(data);
        console.log(data);
        setSelectedKhoa(data[0].maKhoa);
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

  // Dữ liệu khoa (lấy từ bảng Khoa)

  const khoa = khoas.find((k) => k.maKhoa === selectedKhoa);

  // Lọc ngành theo khoa đang chọn (nếu không chọn thì hiện tất cả)
  const displayedNganhs = selectedKhoa
    ? nganhs.filter((n) => n.maKhoa === selectedKhoa)
    : nganhs;

  const selectedKhoaInfo = khoas.find((k) => k.maKhoa === selectedKhoa);
  const nganh = nganhs.find((n) => {
    return n.maKhoa === selectedKhoa;
  });
  return (
    <div className="relative p-6 w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl flex gap-6 overflow-hidden shadow-sm">
      {displayForm && (
        <Item_hien
          className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center"
          onSuccess={() => {
            setDisplayForm(false);
          }}
          onCancel={() => setDisplayForm(false)}
          setDisplayform={setDisplayForm}
          khoa={khoa}
          suaorThem={sua}
        />
      )}
      {selectedNganh && (
        <ItemHien_Nganh
          maKhoa={selectedKhoa}
          className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center"
          setDisplayform={setSelectedNganh}
          suaorThem={sua}
          nganh={nganh}
        />
      )}

      {/* LEFT PANEL - Quản lý khoa */}
      <div className="w-[40%] h-full bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col overflow-hidden">
        {/* HEADER */}
        <div className="p-5 border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10 h-[20%] ">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Quản lý khoa
            </h2>
            <span className="text-sm text-gray-500 font-medium">
              {khoas.length} khoa
            </span>
          </div>
          <div className="relative">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Tìm kiếm khoa..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* BODY - Danh sách khoa */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 h-[60%] ">
          {khoas.map((khoa) => (
            <div
              key={khoa.maKhoa}
              onClick={() => setSelectedKhoa(khoa.maKhoa)}
              className={`group bg-white border rounded-xl p-4 cursor-pointer transition-all duration-200
                ${
                  selectedKhoa === khoa.maKhoa
                    ? "border-blue-500 shadow-md bg-blue-50/40"
                    : "border-gray-100 hover:shadow-md hover:border-gray-200"
                }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Building2 size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                      {khoa.tenKhoa}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {khoa.maKhoa}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors"
                    title="Xem chi tiết ngành"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    className="p-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 transition-colors"
                    title="Chỉnh sửa"
                    onClick={() => {
                      setDisplayForm(true);
                      setSua(true);
                    }}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                    title="Xóa"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="p-5 border-t border-gray-100 bg-white h-[15%]">
          <button
            className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
            onClick={() => {
              setDisplayForm(true);
              setSua(false);
            }}
          >
            <Plus size={18} />
            Thêm khoa mới
          </button>
        </div>
      </div>

      {/* RIGHT PANEL - Quản lý ngành */}
      <div className="w-[60%] bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col overflow-hidden">
        {/* HEADER */}
        <div className="p-5 border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {selectedKhoa && selectedKhoaInfo
                  ? `Ngành thuộc ${selectedKhoaInfo.tenKhoa}`
                  : "Quản lý ngành"}
              </h2>
              {selectedKhoa && selectedKhoaInfo && (
                <div className="mt-2 text-sm text-gray-600 space-y-1">
                  <p className="flex items-center gap-2">
                    <Phone size={14} /> {selectedKhoaInfo.sdt || "Chưa có"}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail size={14} /> {selectedKhoaInfo.email || "Chưa có"}
                  </p>
                  <p className="flex items-center gap-2">
                    <User size={14} /> Trưởng khoa:{" "}
                    {selectedKhoaInfo.TruongKhoa || "Chưa có"}
                  </p>
                </div>
              )}
            </div>

            <button
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
              onClick={() => {
                if (!selectedKhoa) {
                  alert("Vui lòng chọn khoa trước khi thêm ngành");
                  return;
                }
                setSelectedNganh(true);
                setSua(false);
              }}
            >
              <Plus size={18} />
              Thêm ngành
            </button>
          </div>

          <div className="relative">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Tìm kiếm ngành theo tên hoặc mã..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="px-6 py-4 font-medium">Mã ngành</th>
                <th className="px-6 py-4 font-medium">Tên ngành</th>
                <th className="px-6 py-4 font-medium">Mã khoa</th>
                <th className="px-6 py-4 font-medium">Trình độ</th>
                <th className="px-6 py-4 font-medium text-center">Tín chỉ</th>
                <th className="px-6 py-4 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {displayedNganhs.map((major) => (
                <tr
                  key={major.maNganh}
                  className="hover:bg-blue-50/50 transition-colors duration-150 cursor-pointer"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {major.maNganh}
                  </td>
                  <td className="px-6 py-4">{major.tenNganh}</td>
                  <td className="px-6 py-4">{major.maKhoa}</td>
                  <td className="px-6 py-4">{major.trinhDoDaoTao}</td>
                  <td className="px-6 py-4 text-center">{major.soTinChi}</td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button
                      className="p-2.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 transition-colors"
                      title="Chỉnh sửa"
                      onClick={() => {
                        (setSua(true), setSelectedNganh(true));
                      }}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className="p-2.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                      title="Xóa"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {displayedNganhs.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    Chưa có ngành nào thuộc khoa này
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION (có thể cải tiến sau) */}
        <div className="p-5 border-t border-gray-100 bg-white flex items-center justify-between text-sm">
          <div className="text-gray-500">
            Hiển thị 1-{displayedNganhs.length} trong {displayedNganhs.length}{" "}
            ngành
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <ChevronLeft size={18} />
            </button>
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium">
              1
            </button>
            <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
