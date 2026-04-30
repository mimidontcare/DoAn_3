"use client";

import { useEffect, useState } from "react";
import {
  Search, Plus, Calendar, Settings,
  Pencil, Trash2, X, Info, CalendarClock, School, LayoutGrid
} from "lucide-react";
import { getAllLichhoc, addLichhoc, updateLichhoc, deleteLichhoc } from "@/ApiCall/LichhocApi";
import { getAllLichthi, addLichthi, updateLichthi, deleteLichthi } from "@/ApiCall/LichthiApi";

// Types
type Lichhoc = {
  maLichHoc: string;
  maLopPhan: string;
  NgayHoc: string;
  phongHoc: string;
  soTiet: number;
};

type Lichthi = {
  maLichThi: string;
  MaLopPhan: string;
  NgayThi: string;
  gioThi: string;
  hinhThucThi: string;
  maPhong?: string;
  phongHoc: string;
};

export default function SchedulePage() {
  const [activeTab, setActiveTab] = useState<"hoc" | "thi">("hoc");
  const [searchTxt, setSearchTxt] = useState("");

  // Data states
  const [lichHocs, setLichHocs] = useState<Lichhoc[]>([]);
  const [lichThis, setLichThis] = useState<Lichthi[]>([]);

  // Modal states
  const [showHocModal, setShowHocModal] = useState(false);
  const [showThiModal, setShowThiModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // Form states
  const [formHoc, setFormHoc] = useState<Partial<Lichhoc>>({});
  const [formThi, setFormThi] = useState<Partial<Lichthi>>({});

  // Fetch functions
  const fetchLichHoc = async () => {
    try {
      const data = await getAllLichhoc();
      setLichHocs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setLichHocs([]);
    }
  };

  const fetchLichThi = async () => {
    try {
      const data = await getAllLichthi();
      setLichThis(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setLichThis([]);
    }
  };

  useEffect(() => {
    fetchLichHoc();
    fetchLichThi();
  }, []);

  // Filtered Data
  const displayedLichHocs = lichHocs.filter(lh =>
    lh.maLopPhan?.toLowerCase().includes(searchTxt.toLowerCase()) ||
    lh.phongHoc?.toLowerCase().includes(searchTxt.toLowerCase())
  );

  const displayedLichThis = lichThis.filter(lt =>
    lt.MaLopPhan?.toLowerCase().includes(searchTxt.toLowerCase()) ||
    lt.maLichThi?.toLowerCase().includes(searchTxt.toLowerCase())
  );

  // Lịch Học Actions
  const openAddHoc = () => {
    setFormHoc({}); setIsEdit(false); setShowHocModal(true);
  };
  const openEditHoc = (item: Lichhoc) => {
    setFormHoc({
      ...item,
      NgayHoc: item.NgayHoc ? new Date(item.NgayHoc).toISOString().split('T')[0] : ""
    });
    setIsEdit(true); setShowHocModal(true);
  };
  const handleDeleteHoc = async (id: string) => {
    if (!confirm("Bạn có muốn xoá lịch học này?")) return;
    try { await deleteLichhoc(id); fetchLichHoc(); } catch (err) { alert("Lỗi khi xoá"); }
  };
  const handleSaveHoc = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit && formHoc.maLichHoc) await updateLichhoc(formHoc.maLichHoc, formHoc);
      else await addLichhoc(formHoc);
      setShowHocModal(false); fetchLichHoc();
    } catch (err) { alert("Lỗi lưu trữ!"); }
  };

  // Lịch Thi Actions
  const openAddThi = () => {
    setFormThi({}); setIsEdit(false); setShowThiModal(true);
  };
  const openEditThi = (item: Lichthi) => {
    setFormThi({
      ...item,
      NgayThi: item.NgayThi ? new Date(item.NgayThi).toISOString().split('T')[0] : ""
    });
    setIsEdit(true); setShowThiModal(true);
  };
  const handleDeleteThi = async (id: string) => {
    if (!confirm("Bạn có muốn xoá lịch thi này?")) return;
    try { await deleteLichthi(id); fetchLichThi(); } catch (err) { alert("Lỗi khi xoá"); }
  };
  const handleSaveThi = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit && formThi.maLichThi) await updateLichthi(formThi.maLichThi, formThi);
      else await addLichthi(formThi);
      setShowThiModal(false); fetchLichThi();
    } catch (err) { alert("Lỗi lưu trữ!"); }
  };

  return (
    <div className="relative p-6 w-full h-full bg-gradient-to-br from-indigo-50 via-white to-blue-50 border border-indigo-100 rounded-2xl flex flex-col overflow-hidden shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-black tracking-tight flex items-center gap-3">
            <CalendarClock size={36} className="text-blue-600" />
            Lịch Học & Thi
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Quản lý và điều phối thời khoá biểu toàn trường</p>
        </div>
        <button
          onClick={activeTab === "hoc" ? openAddHoc : openAddThi}
          className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg transition-all duration-300"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          {activeTab === "hoc" ? "Thêm Lịch Học" : "Thêm Lịch Thi"}
        </button>
      </div>

      {/* Toolbar: Tabs & Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-6 z-10 w-full">
        <div className="flex bg-slate-100/80 p-1 rounded-xl shadow-sm border border-slate-200">
          <button
            onClick={() => setActiveTab("hoc")}
            className={`px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-all ${activeTab === "hoc" ? "bg-white text-blue-600 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-700"}`}
          >
            <Calendar size={18} /> Lịch Học
          </button>
          <button
            onClick={() => setActiveTab("thi")}
            className={`px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-all ${activeTab === "thi" ? "bg-white text-blue-600 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-700"}`}
          >
            <LayoutGrid size={18} /> Lịch Thi
          </button>
        </div>

        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            value={searchTxt}
            onChange={(e) => setSearchTxt(e.target.value)}
            type="text"
            placeholder="Tìm kiếm mã lớp, phòng học..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-sm"
          />
        </div>
      </div>

      {/* Main Table Area */}
      <div className="flex-1 bg-white/70 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-xl overflow-hidden flex flex-col">
        <div className="overflow-auto flex-1">
          {activeTab === "hoc" ? (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 sticky top-0 backdrop-blur-md border-b border-slate-200 z-10">
                <tr>
                  <th className="px-6 py-5 font-semibold">Mã Lịch Học</th>
                  <th className="px-6 py-5 font-semibold">Mã Lớp Phần</th>
                  <th className="px-6 py-5 font-semibold text-center">Phòng Học</th>
                  <th className="px-6 py-5 font-semibold text-center">Ngày Học</th>
                  <th className="px-6 py-5 font-semibold text-center">Số Tiết</th>
                  <th className="px-6 py-5 font-semibold text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {displayedLichHocs.map((item) => (
                  <tr key={item.maLichHoc} className="hover:bg-blue-50/40 group">
                    <td className="px-6 py-4 font-semibold text-slate-700">{item.maLichHoc || "-"}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{item.maLopPhan}</td>
                    <td className="px-6 py-4 text-center text-slate-600">
                      <span className="flex items-center justify-center gap-1"><School size={14} className="text-slate-400" /> {item.phongHoc}</span>
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600">{item.NgayHoc ? new Date(item.NgayHoc).toLocaleDateString("vi-VN") : ""}</td>
                    <td className="px-6 py-4 text-center text-blue-600 font-bold">{item.soTiet}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEditHoc(item)} className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100"><Pencil size={16} /></button>
                        <button onClick={() => handleDeleteHoc(item.maLichHoc)} className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 sticky top-0 backdrop-blur-md border-b border-slate-200 z-10">
                <tr>
                  <th className="px-6 py-5 font-semibold">Mã Lịch Thi</th>
                  <th className="px-6 py-5 font-semibold">Mã Lớp Phần</th>
                  <th className="px-6 py-5 font-semibold text-center">Phòng Thi</th>
                  <th className="px-6 py-5 font-semibold text-center">Ngày/Giờ Thi</th>
                  <th className="px-6 py-5 font-semibold text-center">Hình Thức</th>
                  <th className="px-6 py-5 font-semibold text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {displayedLichThis.map((item) => (
                  <tr key={item.maLichThi} className="hover:bg-blue-50/40 group">
                    <td className="px-6 py-4 font-semibold text-slate-700">{item.maLichThi}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{item.MaLopPhan}</td>
                    <td className="px-6 py-4 text-center text-slate-600">
                      <span className="flex items-center justify-center gap-1"><School size={14} className="text-slate-400" /> {item.phongHoc || item.maPhong}</span>
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600 whitespace-nowrap">
                      {item.NgayThi ? new Date(item.NgayThi).toLocaleDateString("vi-VN") : ""} <br />
                      <span className="text-xs font-semibold text-blue-500">{item.gioThi}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold border border-slate-200">
                        {item.hinhThucThi}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEditThi(item)} className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100"><Pencil size={16} /></button>
                        <button onClick={() => handleDeleteThi(item.maLichThi)} className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Lịch Học Modal */}
      {showHocModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl flex flex-col overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex justify-between">
              <h2 className="text-xl justify-between font-bold text-slate-800 flex items-center gap-2">
                <Calendar className="text-blue-600" /> {isEdit ? "Sửa Lịch Học" : "Thêm Lịch Học"}
              </h2>
              <button onClick={() => setShowHocModal(false)} className="p-2 rounded-full hover:bg-slate-200"><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveHoc} className="p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {isEdit && (
                  <div className="space-y-1 col-span-2">
                    <label className="text-sm font-semibold text-slate-700">Mã Lịch Học</label>
                    <input required disabled={isEdit} value={formHoc.maLichHoc || ""} onChange={(e) => setFormHoc({ ...formHoc, maLichHoc: e.target.value })} className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl outline-none" />
                  </div>
                )}
                {!isEdit && (
                  <div className="space-y-1 col-span-2">
                    <label className="text-sm font-semibold text-slate-700">Mã Lịch Học</label>
                    <input required value={formHoc.maLichHoc || ""} onChange={(e) => setFormHoc({ ...formHoc, maLichHoc: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                  </div>
                )}
                <div className="space-y-1 col-span-2">
                  <label className="text-sm font-semibold text-slate-700">Mã Lớp Học Phần <span className="text-red-500">*</span></label>
                  <input required value={formHoc.maLopPhan || ""} onChange={(e) => setFormHoc({ ...formHoc, maLopPhan: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Ngày Học</label>
                  <input type="date" value={formHoc.NgayHoc || ""} onChange={(e) => setFormHoc({ ...formHoc, NgayHoc: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Số Tiết</label>
                  <input type="number" value={formHoc.soTiet || ""} onChange={(e) => setFormHoc({ ...formHoc, soTiet: parseInt(e.target.value) })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div className="space-y-1 col-span-2">
                  <label className="text-sm font-semibold text-slate-700">Phòng Học</label>
                  <input required value={formHoc.phongHoc || ""} onChange={(e) => setFormHoc({ ...formHoc, phongHoc: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowHocModal(false)} className="px-6 py-3 font-semibold hover:bg-slate-100 rounded-xl text-slate-600">Huỷ</button>
                <button type="submit" className="px-6 py-3 font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700">Lưu Lịch Học</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lịch Thi Modal */}
      {showThiModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex justify-between">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <LayoutGrid className="text-blue-600" /> {isEdit ? "Sửa Lịch Thi" : "Thêm Lịch Thi"}
              </h2>
              <button onClick={() => setShowThiModal(false)} className="p-2 rounded-full hover:bg-slate-200"><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveThi} className="p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 col-span-2">
                  <label className="text-sm font-semibold text-slate-700">Mã Lịch Thi <span className="text-red-500">*</span></label>
                  <input required disabled={isEdit} value={formThi.maLichThi || ""} onChange={(e) => setFormThi({ ...formThi, maLichThi: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div className="space-y-1 col-span-2">
                  <label className="text-sm font-semibold text-slate-700">Mã Lớp Học Phần <span className="text-red-500">*</span></label>
                  <input required value={formThi.MaLopPhan || ""} onChange={(e) => setFormThi({ ...formThi, MaLopPhan: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div className="space-y-1 text-sm font-semibold">
                  <label className="text-slate-700">Ngày Thi</label>
                  <input type="date" value={formThi.NgayThi || ""} onChange={(e) => setFormThi({ ...formThi, NgayThi: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div className="space-y-1 text-sm font-semibold">
                  <label className="text-slate-700">Giờ Thi (VD: 07:30)</label>
                  <input type="time" value={formThi.gioThi || ""} onChange={(e) => setFormThi({ ...formThi, gioThi: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div className="space-y-1 text-sm font-semibold">
                  <label className="text-slate-700">Mã Phòng</label>
                  <input value={formThi.maPhong || ""} onChange={(e) => setFormThi({ ...formThi, maPhong: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div className="space-y-1 text-sm font-semibold">
                  <label className="text-slate-700">Tên Phòng Học</label>
                  <input value={formThi.phongHoc || ""} onChange={(e) => setFormThi({ ...formThi, phongHoc: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div className="space-y-1 col-span-2 text-sm font-semibold">
                  <label className="text-slate-700">Hình Thức Thi</label>
                  <select value={formThi.hinhThucThi || "Tự luận"} onChange={(e) => setFormThi({ ...formThi, hinhThucThi: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                    <option value="Trắc nghiệm">Trắc nghiệm</option>
                    <option value="Tự luận">Tự luận</option>
                    <option value="Vấn đáp">Vấn đáp</option>
                    <option value="Thực hành">Thực hành</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowThiModal(false)} className="px-6 py-3 font-semibold hover:bg-slate-100 rounded-xl text-slate-600">Huỷ</button>
                <button type="submit" className="px-6 py-3 font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700">Lưu Lịch Thi</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
