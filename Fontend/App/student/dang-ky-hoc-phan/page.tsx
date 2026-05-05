"use client";

import { useState, useEffect } from "react";
import { BookOpenCheck, Search, Filter, AlertCircle, CheckCircle2 } from "lucide-react";
import { getAllLopHP } from "@/ApiCall/LopHPApi";

export default function DangKyHocPhan() {
  const [openClasses, setOpenClasses] = useState<any[]>([]);
  const [registeredClasses, setRegisteredClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllLopHP();
        if (Array.isArray(data)) {
          // Chỉ lấy các lớp đang mở (VD: soLuongSinhVien > 0 hoặc trạng thái mở)
          setOpenClasses(data);
        }
      } catch (err) {
        console.warn("Lỗi fetch lớp học phần:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRegister = (lop: any) => {
    // Logic 1: Kiểm tra chỉ tiêu
    if (lop.soLuongSinhVien <= 0) {
      alert("Lớp học phần này đã hết chỉ tiêu!");
      return;
    }

    // Logic 2: Kiểm tra trùng lịch (Mock)
    const isConflict = registeredClasses.some(
      (r) => r.MaMonHoc === lop.MaMonHoc // Giả sử không cho đăng ký trùng môn
    );
    if (isConflict) {
      alert("Bạn đã đăng ký môn học này rồi hoặc bị trùng lịch học!");
      return;
    }

    // Logic 3: Tiên quyết (Mock)
    // if (!passedPrerequisites(lop.MaMonHoc)) { ... }

    if (confirm(`Xác nhận đăng ký lớp ${lop.tenLop}?`)) {
      setRegisteredClasses([...registeredClasses, lop]);
      alert("Đăng ký thành công!");
    }
  };

  return (
    <div className="p-6 md:p-8 w-full h-full flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
          <BookOpenCheck className="text-blue-600" size={36} />
          Đăng Ký Học Phần
        </h1>
        <p className="text-slate-500 font-medium">
          Xem danh sách lớp mở và đăng ký môn học cho học kỳ mới
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Danh sách lớp mở */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h2 className="font-bold text-slate-700">Các lớp đang mở</h2>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm môn học..."
                className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none w-64 transition-all"
              />
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4">
            {loading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {openClasses.map((lop, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl p-4 hover:border-blue-300 transition-colors group">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors">
                          {lop.tenLop}
                        </h3>
                        <p className="text-sm text-slate-500 font-medium">{lop.MaLopHocPhan} • Mã môn: {lop.MaMonHoc}</p>
                      </div>
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100">
                        {lop.soLuongSinhVien} chỉ tiêu
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                      <div className="text-sm text-slate-600 space-y-1">
                        <p><span className="font-semibold text-slate-700">Giảng viên:</span> Nguyễn Văn A</p>
                        <p><span className="font-semibold text-slate-700">Lịch học:</span> Tiết 1-3, Thứ 2</p>
                      </div>
                      <button
                        onClick={() => handleRegister(lop)}
                        disabled={registeredClasses.some(r => r.MaLopHocPhan === lop.MaLopHocPhan)}
                        className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
                          registeredClasses.some(r => r.MaLopHocPhan === lop.MaLopHocPhan)
                            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-blue-500/30 active:scale-[0.98]"
                        }`}
                      >
                        {registeredClasses.some(r => r.MaLopHocPhan === lop.MaLopHocPhan) ? "Đã chọn" : "Đăng ký"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Lớp đã chọn */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-white">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <CheckCircle2 className="text-emerald-500" />
              Đã đăng ký ({registeredClasses.length})
            </h2>
          </div>
          <div className="flex-1 overflow-auto p-4 space-y-3">
            {registeredClasses.length === 0 ? (
              <div className="text-center py-10 text-slate-400 flex flex-col items-center">
                <AlertCircle className="w-10 h-10 mb-2 opacity-50" />
                <p>Chưa có môn học nào</p>
              </div>
            ) : (
              registeredClasses.map((lop, idx) => (
                <div key={idx} className="bg-white p-3 rounded-xl border border-emerald-100 shadow-sm relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1">{lop.tenLop}</h4>
                  <p className="text-xs text-slate-500">{lop.MaLopHocPhan}</p>
                </div>
              ))
            )}
          </div>
          <div className="p-4 bg-white border-t border-slate-200">
            <button className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold shadow-lg hover:shadow-emerald-500/30 transition-all">
              Lưu đăng ký
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
