"use client";

import MyButton from "@/app/items_phu/button";
import {
  School,
  BookOpen,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ListFilter,
  MoreVertical,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"lopHC" | "lopHP">("lopHC");

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
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-8 md:py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            {activeTab === "lopHC" ? "Lớp hành chính" : "Lớp học phần"}
          </h1>
          <p className="mt-1.5 text-sm text-gray-600">
            {activeTab === "lopHC"
              ? "Quản lý danh sách lớp hành chính theo khóa và khoa"
              : "Theo dõi lịch học, giảng viên và trạng thái các học phần"}
          </p>
        </div>

        <MyButton
          label={activeTab === "lopHC" ? "Thêm lớp HC" : "Thêm lớp HP"}
          // variant="primary" size="md"  → comment lại vì component chưa hỗ trợ
        />
      </div>

      {/* Tabs */}
      <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("lopHC")}
            className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-colors md:px-6 ${
              activeTab === "lopHC"
                ? "border-b-2 border-blue-600 text-blue-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <School size={18} />
            Lớp hành chính
          </button>

          <button
            onClick={() => setActiveTab("lopHP")}
            className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-colors md:px-6 ${
              activeTab === "lopHP"
                ? "border-b-2 border-blue-600 text-blue-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <BookOpen size={18} />
            Lớp học phần
          </button>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          {activeTab === "lopHC" && (
            <div className="space-y-6">
              <div className="relative max-w-lg">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm mã lớp, tên lớp, cố vấn học tập..."
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
                />
              </div>

              {/* Bạn có thể copy-paste bảng lớp HC cũ hoặc nâng cấp tương tự lớp HP */}
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                {/* Table lớp hành chính - giữ nguyên hoặc cải thiện sau */}
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600">
                        Mã lớp
                      </th>
                      <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600">
                        Tên lớp
                      </th>
                      <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600">
                        Khóa
                      </th>
                      <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600">
                        Khoa
                      </th>
                      <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600">
                        Cố vấn
                      </th>
                      <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600">
                        Sĩ số
                      </th>
                      <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {/* Dữ liệu mẫu - bạn thay bằng data thật */}
                    <tr className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-4 py-3.5 text-sm font-medium text-gray-900">
                        LH-001
                      </td>
                      <td className="px-4 py-3.5 text-sm text-gray-700">
                        K65-CNTT-01
                      </td>
                      <td className="px-4 py-3.5 text-sm text-gray-600">K65</td>
                      <td className="px-4 py-3.5 text-sm text-gray-600">
                        Công nghệ thông tin
                      </td>
                      <td className="px-4 py-3.5 text-sm text-gray-600">
                        TS. Nguyễn Văn An
                      </td>
                      <td className="px-4 py-3.5 text-sm text-gray-600">45</td>
                      <td className="px-4 py-3.5 text-sm">
                        <div className="flex gap-3">
                          <button className="text-blue-600 hover:underline">
                            Sửa
                          </button>
                          <button className="text-blue-600 hover:underline">
                            Chi tiết
                          </button>
                        </div>
                      </td>
                    </tr>
                    {/* thêm dòng khác nếu cần */}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "lopHP" && (
            <div className="space-y-6">
              {/* Filters */}
              <div ref={dropdownRef} className="flex flex-wrap gap-4">
                {/* Học kỳ */}
                <div className="w-44 min-w-[11rem]">
                  <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                    HỌC KỲ
                  </label>
                  <div
                    className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm hover:border-gray-400"
                    onClick={() => {
                      setOpenHK(!openHK);
                      setOpenYear(false);
                      setOpenKhoa(false);
                    }}
                  >
                    <span>{selectHK}</span>
                    <ChevronDown size={16} className="text-gray-500" />
                  </div>

                  {openHK && (
                    <div className="absolute z-20 mt-1 w-44 rounded-lg border border-gray-200 bg-white shadow-lg">
                      {hkOptions.map((opt) => (
                        <div
                          key={opt}
                          className="cursor-pointer px-4 py-2.5 text-sm hover:bg-blue-50"
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
                  <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                    NĂM HỌC
                  </label>
                  <div
                    className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm hover:border-gray-400"
                    onClick={() => {
                      setOpenYear(!openYear);
                      setOpenHK(false);
                      setOpenKhoa(false);
                    }}
                  >
                    <span>{selectYear}</span>
                    <ChevronDown size={16} className="text-gray-500" />
                  </div>

                  {openYear && (
                    <div className="absolute z-20 mt-1 w-44 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg max-h-64">
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
                  <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                    KHOA CHUYÊN MÔN
                  </label>
                  <div
                    className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm hover:border-gray-400"
                    onClick={() => {
                      setOpenKhoa(!openKhoa);
                      setOpenHK(false);
                      setOpenYear(false);
                    }}
                  >
                    <span>{selectKhoa}</span>
                    <ChevronDown size={16} className="text-gray-500" />
                  </div>

                  {openKhoa && (
                    <div className="absolute z-20 mt-1 w-56 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg max-h-64">
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

                <button className="mt-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100">
                  <ListFilter size={20} />
                </button>
              </div>

              {/* Table lớp học phần */}
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="min-w-full divide-y divide-gray-100">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="whitespace-nowrap px-5 py-3.5 text-left text-xs font-semibold text-gray-600">
                        MÃ HP
                      </th>
                      <th className="whitespace-nowrap px-5 py-3.5 text-left text-xs font-semibold text-gray-600">
                        TÊN HỌC PHẦN
                      </th>
                      <th className="whitespace-nowrap px-5 py-3.5 text-left text-xs font-semibold text-gray-600">
                        NHÓM
                      </th>
                      <th className="whitespace-nowrap px-5 py-3.5 text-left text-xs font-semibold text-gray-600">
                        GIẢNG VIÊN
                      </th>
                      <th className="whitespace-nowrap px-5 py-3.5 text-left text-xs font-semibold text-gray-600">
                        LỊCH HỌC
                      </th>
                      <th className="whitespace-nowrap px-5 py-3.5 text-left text-xs font-semibold text-gray-600">
                        PHÒNG
                      </th>
                      <th className="whitespace-nowrap px-5 py-3.5 text-left text-xs font-semibold text-gray-600">
                        TRẠNG THÁI
                      </th>
                      <th className="w-12 px-5 py-3.5"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {courses.map((course) => (
                      <tr key={course.id} className="hover:bg-blue-50/30">
                        <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-blue-600">
                          {course.id}
                        </td>
                        <td className="px-5 py-4 text-sm font-medium text-gray-900">
                          {course.name}
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                          {course.group}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                              {course.teacherCode}
                            </div>
                            <span className="text-sm text-gray-800">
                              {course.teacher}
                            </span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4">
                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                            {course.day} • {course.time}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-sm font-medium">
                          {course.room}
                        </td>
                        <td className="whitespace-nowrap px-5 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              course.status === "ĐANG HỌC"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {course.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-gray-400 hover:text-gray-700">
                          <MoreVertical size={18} className="cursor-pointer" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-600 sm:flex-row">
                <div>
                  Hiển thị 1–{courses.length} của {courses.length} học phần
                </div>
                <div className="flex items-center gap-1">
                  <button className="rounded-lg border border-gray-300 p-2 hover:bg-gray-100">
                    <ChevronLeft size={16} />
                  </button>
                  <button className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white">
                    1
                  </button>
                  <button className="rounded-lg border border-gray-300 p-2 hover:bg-gray-100">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
