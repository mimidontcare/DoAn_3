"use client";

import {
  School,
  BookOpen,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ListFilter,
  MoreVertical,
  Pencil,
  Eye,
  Trash2,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import AddLopHCModal from "@/app/items_phu/item_cua_lop/AddLopHCModal";
import AddLopHPModal from "@/app/items_phu/item_cua_lop/AddLopHPModal";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"lopHC" | "lopHP">("lopHC");

  const [showHCModal, setShowHCModal] = useState(false);
  const [showHPModal, setShowHPModal] = useState(false);

  // Filters cho lớp học phần
  const [selectHK, setSelectHK] = useState("Học kỳ 1");
  const [selectYear, setSelectYear] = useState("2025-2026");
  const [selectKhoa, setSelectKhoa] = useState("Công nghệ thông tin");

  const [openHK, setOpenHK] = useState(false);
  const [openYear, setOpenYear] = useState(false);
  const [openKhoa, setOpenKhoa] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenHK(false);
        setOpenYear(false);
        setOpenKhoa(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hkOptions = ["Học kỳ 1", "Học kỳ 2"];
  const yearOptions = Array.from({ length: 10 }, (_, i) => {
    const y = new Date().getFullYear() + 1 - i;
    return `${y - 1}-${y}`;
  });

  const khoaOptions = [
    "Công nghệ thông tin",
    "Kinh tế",
    "May mặc",
    "Điện tử",
    "Cơ khí",
    "Kế toán",
    "Ngôn ngữ Anh",
  ];

  const courses = [
    {
      id: "C01003",
      name: "Cấu trúc dữ liệu & Giải thuật",
      group: "L01",
      teacher: "Phan Thanh Tùng",
      teacherCode: "PT",
      day: "Thứ 2",
      time: "1-3",
      room: "H1-302",
      status: "ĐANG HỌC",
    },
    {
      id: "C02007",
      name: "Hệ điều hành",
      group: "L02",
      teacher: "Nguyễn Hoàng Tú",
      teacherCode: "NH",
      day: "Thứ 4",
      time: "7-9",
      room: "H6-405",
      status: "ĐANG HỌC",
    },
    {
      id: "MT1003",
      name: "Giải tích 1",
      group: "L15",
      teacher: "Lê Văn Sâm",
      teacherCode: "LV",
      day: "Thứ 6",
      time: "4-6",
      room: "B1-102",
      status: "ĐÃ KẾT THÚC",
    },
  ];

  return (
    <>
      {/* Modals render ngoài cùng để tránh bị overflow-hidden che */}
      {showHCModal && (
        <AddLopHCModal
          className="fixed inset-0 z-[200] flex items-center justify-center"
          onSuccess={() => setShowHCModal(false)}
          onCancel={() => setShowHCModal(false)}
        />
      )}

      {showHPModal && (
        <AddLopHPModal
          className="fixed inset-0 z-[200] flex items-center justify-center"
          onSuccess={() => setShowHPModal(false)}
          onCancel={() => setShowHPModal(false)}
        />
      )}

      <div className="relative p-6 w-full h-full bg-gradient-to-br from-indigo-50 via-white to-blue-50 border border-indigo-100 rounded-2xl flex flex-col overflow-hidden shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-col sm:flex-row gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600 tracking-tight flex items-center gap-3">
              {activeTab === "lopHC" ? (
                <School size={36} className="text-blue-600" />
              ) : (
                <BookOpen size={36} className="text-blue-600" />
              )}
              {activeTab === "lopHC" ? "Lớp Hành Chính" : "Lớp Học Phần"}
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              {activeTab === "lopHC"
                ? "Quản lý danh sách lớp hành chính theo khóa và khoa"
                : "Theo dõi lịch học, giảng viên và trạng thái các học phần"}
            </p>
          </div>

          <button
            onClick={() => {
              if (activeTab === "lopHC") setShowHCModal(true);
              else setShowHPModal(true);
            }}
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 active:scale-[0.97]"
          >
            <span className="text-xl leading-none font-bold">+</span>
            {activeTab === "lopHC" ? "Thêm Lớp HC" : "Thêm Lớp HP"}
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-slate-100 bg-white/70 backdrop-blur-xl shadow-xl">
          <div className="flex border-b border-slate-200 bg-slate-50/80">
            <button
              onClick={() => setActiveTab("lopHC")}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-colors md:px-8 ${
                activeTab === "lopHC"
                  ? "border-b-2 border-blue-600 text-blue-700 bg-blue-50/50"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              <School size={20} />
              Lớp Hành Chính
            </button>

            <button
              onClick={() => setActiveTab("lopHP")}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-colors md:px-8 ${
                activeTab === "lopHP"
                  ? "border-b-2 border-blue-600 text-blue-700 bg-blue-50/50"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              <BookOpen size={20} />
              Lớp Học Phần
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* ===== TAB LỚP HÀNH CHÍNH ===== */}
            {activeTab === "lopHC" && (
              <div className="space-y-6">
                <div className="relative w-full md:w-1/2 lg:w-1/3">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Tìm mã lớp, tên lớp, cố vấn học tập..."
                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 placeholder:text-slate-400 shadow-sm"
                  />
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm">
                  <table className="min-w-full divide-y divide-slate-100">
                    <thead className="bg-slate-50/80 backdrop-blur-md">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Mã lớp
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Tên lớp
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Khóa
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Khoa
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Cố vấn
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Sĩ số
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Thao tác
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100/80 bg-white">
                      {/* Dữ liệu mẫu — thay bằng data thật */}
                      <tr className="hover:bg-blue-50/40 transition-colors duration-200 group">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-800">
                          LH-001
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          K65-CNTT-01
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">K65</td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          Công nghệ thông tin
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          TS. Nguyễn Văn An
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">45</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button
                              onClick={() => setShowHCModal(true)}
                              className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-600 hover:text-amber-700 transition-all shadow-sm"
                              title="Chỉnh sửa"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() => alert("Chi tiết: LH-001")}
                              className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-all shadow-sm"
                              title="Xem chi tiết"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm("Bạn có chắc muốn xóa lớp này?")) alert("Xóa: LH-001");
                              }}
                              className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 transition-all shadow-sm"
                              title="Xóa lớp"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ===== TAB LỚP HỌC PHẦN ===== */}
            {activeTab === "lopHP" && (
              <div className="space-y-6">
                {/* Filters */}
                <div ref={dropdownRef} className="flex flex-wrap gap-4">
                  {/* Học kỳ */}
                  <div className="w-44 min-w-[11rem]">
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                      HỌC KỲ
                    </label>
                    <div
                      className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm hover:border-slate-300 shadow-sm"
                      onClick={() => {
                        setOpenHK(!openHK);
                        setOpenYear(false);
                        setOpenKhoa(false);
                      }}
                    >
                      <span>{selectHK}</span>
                      <ChevronDown size={16} className="text-slate-400" />
                    </div>
                    {openHK && (
                      <div className="absolute z-20 mt-1 w-44 rounded-xl border border-slate-200 bg-white shadow-lg">
                        {hkOptions.map((opt) => (
                          <div
                            key={opt}
                            className="cursor-pointer px-4 py-2.5 text-sm hover:bg-blue-50 rounded-xl"
                            onClick={() => {
                              setSelectHK(opt);
                              setOpenHK(false);
                            }}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Năm học */}
                  <div className="w-44 min-w-[11rem]">
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                      NĂM HỌC
                    </label>
                    <div
                      className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm hover:border-slate-300 shadow-sm"
                      onClick={() => {
                        setOpenYear(!openYear);
                        setOpenHK(false);
                        setOpenKhoa(false);
                      }}
                    >
                      <span>{selectYear}</span>
                      <ChevronDown size={16} className="text-slate-400" />
                    </div>
                    {openYear && (
                      <div className="absolute z-20 mt-1 w-44 overflow-auto rounded-xl border border-slate-200 bg-white shadow-lg max-h-64">
                        {yearOptions.map((opt) => (
                          <div
                            key={opt}
                            className="cursor-pointer px-4 py-2.5 text-sm hover:bg-blue-50"
                            onClick={() => {
                              setSelectYear(opt);
                              setOpenYear(false);
                            }}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Khoa */}
                  <div className="w-56 min-w-[14rem]">
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                      KHOA CHUYÊN MÔN
                    </label>
                    <div
                      className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm hover:border-slate-300 shadow-sm"
                      onClick={() => {
                        setOpenKhoa(!openKhoa);
                        setOpenHK(false);
                        setOpenYear(false);
                      }}
                    >
                      <span>{selectKhoa}</span>
                      <ChevronDown size={16} className="text-slate-400" />
                    </div>
                    {openKhoa && (
                      <div className="absolute z-20 mt-1 w-56 overflow-auto rounded-xl border border-slate-200 bg-white shadow-lg max-h-64">
                        {khoaOptions.map((opt) => (
                          <div
                            key={opt}
                            className="cursor-pointer px-4 py-2.5 text-sm hover:bg-blue-50"
                            onClick={() => {
                              setSelectKhoa(opt);
                              setOpenKhoa(false);
                            }}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button className="mt-6 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                    <ListFilter size={20} />
                  </button>
                </div>

                {/* Table lớp học phần */}
                <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm bg-white/70 backdrop-blur-xl">
                  <table className="min-w-full divide-y divide-slate-100">
                    <thead className="bg-slate-50/80 backdrop-blur-md">
                      <tr>
                        <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          MÃ HP
                        </th>
                        <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          TÊN HỌC PHẦN
                        </th>
                        <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          NHÓM
                        </th>
                        <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          GIẢNG VIÊN
                        </th>
                        <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          LỊCH HỌC
                        </th>
                        <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          PHÒNG
                        </th>
                        <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          TRẠNG THÁI
                        </th>
                        <th className="w-12 px-6 py-4"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100/80 bg-white">
                      {courses.map((course) => (
                        <tr
                          key={course.id}
                          className="hover:bg-blue-50/40 transition-colors duration-200 group"
                        >
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-blue-600">
                            {course.id}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-slate-800">
                            {course.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                            {course.group}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                                {course.teacherCode}
                              </div>
                              <span className="text-sm text-slate-800">
                                {course.teacher}
                              </span>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm border border-slate-200">
                              {course.day} • {course.time}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-700">
                            {course.room}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <span
                              className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold border ${
                                course.status === "ĐANG HỌC"
                                  ? "bg-emerald-100/80 text-emerald-700 border-emerald-200"
                                  : "bg-slate-100/80 text-slate-700 border-slate-200"
                              }`}
                            >
                              {course.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <button
                                onClick={() => setShowHPModal(true)}
                                className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-600 hover:text-amber-700 transition-all shadow-sm"
                                title="Chỉnh sửa"
                              >
                                <Pencil size={16} />
                              </button>
                              <button
                                onClick={() => alert(`Chi tiết: ${course.id}`)}
                                className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-all shadow-sm"
                                title="Xem chi tiết"
                              >
                                <Eye size={16} />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Xóa lớp ${course.id}?`)) alert(`Đã xóa: ${course.id}`);
                                }}
                                className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 transition-all shadow-sm"
                                title="Xóa"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-600 sm:flex-row">
                  <div>
                    Hiển thị 1–{courses.length} của {courses.length} học phần
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="rounded-xl border border-slate-200 p-2 hover:bg-slate-100 transition-colors">
                      <ChevronLeft size={16} />
                    </button>
                    <button className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white">
                      1
                    </button>
                    <button className="rounded-xl border border-slate-200 p-2 hover:bg-slate-100 transition-colors">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
