"use client";

import {
  BookOpen,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ListFilter,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import AddLopHPModal from "@/app/items_phu/item_cua_lop/AddLopHPModal";
import { deleteLopHP } from "@/ApiCall/LopHPApi";
import { getLopGiangDay } from "@/ApiCall/GvDiemdanhApi";

export default function QuanLyLopGiangVien() {
  const [showHPModal, setShowHPModal] = useState(false);
  const [editHPData, setEditHPData] = useState<any | null>(null);

  const [lopHPs, setLopHPs] = useState<any[]>([]);

  const fetchLopHPs = async () => {
    try {
      const data = await getLopGiangDay();
      if (Array.isArray(data)) {
        setLopHPs(data);
      }
    } catch (err: any) {
      console.warn("Lỗi fetchLopHPs:", err.message);
    }
  };

  useEffect(() => {
    fetchLopHPs();
  }, []);

  const generateNewHPId = () => {
    if (lopHPs.length === 0) return "LHP01";
    let maxNum = 0;
    let currentPrefix = "LHP";
    let currentPadding = 2;

    lopHPs.forEach((lop) => {
      if (!lop.MaLopHocPhan) return;
      const match = lop.MaLopHocPhan.match(/^([a-zA-Z]*)(\d+)$/);
      if (match) {
        const numStr = match[2];
        const num = parseInt(numStr, 10);
        if (num > maxNum) {
          maxNum = num;
          currentPrefix = match[1];
          currentPadding = numStr.length;
        }
      }
    });

    if (maxNum === 0) return "LHP01";
    return `${currentPrefix}${(maxNum + 1)
      .toString()
      .padStart(currentPadding, "0")}`;
  };

  const [selectHK, setSelectHK] = useState("Học kỳ 1");
  const [selectYear, setSelectYear] = useState("2025-2026");

  const [openHK, setOpenHK] = useState(false);
  const [openYear, setOpenYear] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenHK(false);
        setOpenYear(false);
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

  return (
    <>
      {showHPModal && (
        <AddLopHPModal
          className="fixed inset-0 z-[200] flex items-center justify-center"
          editData={editHPData}
          newId={generateNewHPId()}
          onSuccess={() => {
            setShowHPModal(false);
            setEditHPData(null);
            fetchLopHPs();
          }}
          onCancel={() => {
            setShowHPModal(false);
            setEditHPData(null);
          }}
        />
      )}

      <div className="relative p-6 w-full h-full bg-gradient-to-br from-indigo-50 via-white to-blue-50 border border-indigo-100 rounded-2xl flex flex-col overflow-hidden shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-col sm:flex-row gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black tracking-tight flex items-center gap-3">
              <BookOpen size={36} className="text-blue-600" />
              Quản Lý Lớp Học Phần
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              Thiết lập và theo dõi các lớp học phần bạn đang phụ trách
            </p>
          </div>

          <button
            onClick={() => {
              setEditHPData(null);
              setShowHPModal(true);
            }}
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 active:scale-[0.97]"
          >
            <span className="text-xl leading-none font-bold">+</span>
            Mở Lớp Đăng Ký
          </button>
        </div>

        {/* Content */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-slate-100 bg-white/70 backdrop-blur-xl shadow-xl flex-1 flex flex-col min-h-0">
          <div className="p-6 flex-1 flex flex-col min-h-0 space-y-6">
            {/* Filters */}
            <div ref={dropdownRef} className="flex flex-wrap gap-4">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm lớp học phần..."
                  className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm"
                />
              </div>

              {/* Học kỳ */}
              <div className="w-44 min-w-[11rem]">
                <div
                  className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm hover:border-slate-300 shadow-sm"
                  onClick={() => {
                    setOpenHK(!openHK);
                    setOpenYear(false);
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
                <div
                  className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm hover:border-slate-300 shadow-sm"
                  onClick={() => {
                    setOpenYear(!openYear);
                    setOpenHK(false);
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

              <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                <ListFilter size={20} />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-auto flex-1 rounded-2xl border border-slate-100 shadow-sm bg-white/70 backdrop-blur-xl">
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
                      LỊCH HỌC
                    </th>
                    <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      PHÒNG
                    </th>
                    <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      SĨ SỐ HIỆN TẠI/TỐI ĐA
                    </th>
                    <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      TRẠNG THÁI
                    </th>
                    <th className="w-12 px-6 py-4 text-right">THAO TÁC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/80 bg-white">
                  {lopHPs.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-6 py-12 text-center text-slate-400"
                      >
                        Bạn chưa phụ trách lớp học phần nào.
                      </td>
                    </tr>
                  ) : (
                    lopHPs.map((course) => (
                      <tr
                        key={course.MaLopHocPhan}
                        className="hover:bg-blue-50/40 transition-colors duration-200 group"
                      >
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-blue-600">
                          {course.MaLopHocPhan}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-800">
                          {course.tenLop}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                          {course.maLopHP || "-"}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm border border-slate-200">
                            {course.ThoigianMo
                              ? new Date(course.ThoigianMo).toLocaleDateString(
                                "vi-VN"
                              )
                              : "N/A"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-700">
                          {course.MaMonHoc || "-"}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-700">
                          30 / {course.soLuongSinhVien || 0}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold border ${course.soLuongSinhVien > 0
                              ? "bg-emerald-100/80 text-emerald-700 border-emerald-200"
                              : "bg-slate-100/80 text-slate-700 border-slate-200"
                              }`}
                          >
                            {course.soLuongSinhVien > 0 ? "ĐANG MỞ" : "ĐÃ ĐÓNG"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button
                              onClick={() => {
                                setEditHPData(course);
                                setShowHPModal(true);
                              }}
                              className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-600 hover:text-amber-700 transition-all shadow-sm"
                              title="Chỉnh sửa"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() =>
                                alert(`Xem chi tiết: ${course.MaLopHocPhan}`)
                              }
                              className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-all shadow-sm"
                              title="Xem chi tiết"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={async () => {
                                if (
                                  !confirm(
                                    `Hủy lớp HP "${course.tenLop}"?`
                                  )
                                )
                                  return;
                                try {
                                  await deleteLopHP(course.MaLopHocPhan);
                                  fetchLopHPs();
                                } catch {
                                  alert("Lỗi khi hủy lớp");
                                }
                              }}
                              className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 transition-all shadow-sm"
                              title="Hủy lớp"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-600 sm:flex-row">
              <div>
                Hiển thị 1–{lopHPs.length} của {lopHPs.length} học phần
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
        </div>
      </div>
    </>
  );
}
