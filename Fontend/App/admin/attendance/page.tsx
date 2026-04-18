"use client";

import { useEffect, useState } from "react";
import {
  Search, Plus, ClipboardCheck,
  Pencil, Trash2, X, Info, User, Calendar
} from "lucide-react";
import { getAllDiemdanh, addDiemdanh, updateDiemdanh, deleteDiemdanh } from "@/ApiCall/DiemdanhApi";

type Diemdanh = {
  maDiemDanh: string;
  maLichHoc: string;
  maSinhVien: string;
  NgayDiemDanh: string;
  trangThai: string;
};

export default function AttendancePage() {
  const [data, setData] = useState<Diemdanh[]>([]);
  const [searchTxt, setSearchTxt] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState<Partial<Diemdanh>>({});

  const fetchData = async () => {
    try {
      const res = await getAllDiemdanh();
      setData(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error(err);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const displayedData = data.filter(d => 
    d.maSinhVien?.toLowerCase().includes(searchTxt.toLowerCase()) || 
    d.maLichHoc?.toLowerCase().includes(searchTxt.toLowerCase())
  );

  const openAdd = () => {
    setFormData({ trangThai: "Có mặt" }); 
    setIsEdit(false); 
    setShowModal(true);
  };
  
  const openEdit = (item: Diemdanh) => {
    setFormData({
      ...item,
      NgayDiemDanh: item.NgayDiemDanh ? new Date(item.NgayDiemDanh).toISOString().split('T')[0] : ""
    });
    setIsEdit(true); 
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có muốn xoá phiếu điểm danh này?")) return;
    try { 
      await deleteDiemdanh(id); 
      fetchData(); 
    } catch (err) { 
      alert("Lỗi khi xoá"); 
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.maSinhVien || !formData.maLichHoc) {
      alert("Vui lòng nhập Mã Sinh Viên và Mã Lịch Học!");
      return;
    }
    
    try {
      if (isEdit && formData.maDiemDanh) {
        await updateDiemdanh(formData.maDiemDanh, formData);
      } else {
        await addDiemdanh(formData);
      }
      setShowModal(false); 
      fetchData();
    } catch (err) { 
      alert("Lỗi lưu trữ!"); 
    }
  };

  const getStatusColor = (status: string) => {
    if (!status) return "bg-slate-100 text-slate-700";
    const s = status.toLowerCase();
    if (s.includes("có mặt")) return "bg-emerald-100/80 text-emerald-700 border-emerald-200";
    if (s.includes("vắng")) return "bg-rose-100/80 text-rose-700 border-rose-200";
    if (s.includes("trễ") || s.includes("phép")) return "bg-amber-100/80 text-amber-700 border-amber-200";
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  return (
    <div className="relative p-6 w-full h-full bg-gradient-to-br from-indigo-50 via-white to-blue-50 border border-indigo-100 rounded-2xl flex flex-col overflow-hidden shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600 tracking-tight flex items-center gap-3">
            <ClipboardCheck size={36} className="text-blue-600" />
            Quản Lý Điểm Danh
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Theo dõi chuyên cần và điểm danh của sinh viên</p>
        </div>
        <button
          onClick={openAdd}
          className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg transition-all duration-300"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          Thêm Điểm Danh
        </button>
      </div>

      {/* Toolbar: Search */}
      <div className="flex gap-4 mb-6 z-10 w-full md:w-1/2 lg:w-1/3">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            value={searchTxt}
            onChange={(e) => setSearchTxt(e.target.value)}
            type="text"
            placeholder="Tìm theo mã sinh viên, mã lịch học..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-sm transition-all"
          />
        </div>
      </div>

      {/* Main Table Area */}
      <div className="flex-1 bg-white/70 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-xl overflow-hidden flex flex-col">
        <div className="overflow-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 sticky top-0 backdrop-blur-md border-b border-slate-200 z-10">
              <tr>
                <th className="px-6 py-5 font-semibold">Mã Đ.Danh</th>
                <th className="px-6 py-5 font-semibold">Mã Sinh Viên</th>
                <th className="px-6 py-5 font-semibold text-center">Mã Lịch Học</th>
                <th className="px-6 py-5 font-semibold text-center">Ngày Điểm Danh</th>
                <th className="px-6 py-5 font-semibold text-center">Trạng Thái</th>
                <th className="px-6 py-5 font-semibold text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {displayedData.map((item) => (
                <tr key={item.maDiemDanh} className="hover:bg-blue-50/40 group transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-700">{item.maDiemDanh || "-"}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-bold text-slate-900 border border-slate-200 bg-slate-50 px-3 py-1.5 rounded-lg max-w-max">
                      <User size={16} className="text-blue-500" />
                      {item.maSinhVien}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-medium text-slate-700">{item.maLichHoc}</td>
                  <td className="px-6 py-4 text-center text-slate-600">
                    <span className="flex items-center justify-center gap-1.5">
                      <Calendar size={14} className="text-slate-400" />
                      {item.NgayDiemDanh ? new Date(item.NgayDiemDanh).toLocaleDateString("vi-VN") : "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-bold border shadow-sm ${getStatusColor(item.trangThai)}`}>
                      {item.trangThai || "Chưa rõ"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEdit(item)} className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100"><Pencil size={16}/></button>
                      <button onClick={() => handleDelete(item.maDiemDanh)} className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"><Trash2 size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
              {displayedData.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <Info size={48} className="mb-4 opacity-50" />
                      <p className="text-lg">Không tìm thấy dữ liệu điểm danh nào.</p>
                      <p className="text-sm mt-1">Vui lòng kiểm tra lại từ khoá hoặc thêm phiếu mới.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <ClipboardCheck className="text-blue-600" /> {isEdit ? "Cập Nhật Điểm Danh" : "Thêm Điểm Danh"}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleSave} className="p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                
                {/* ID Điểm Danh only show when Editing or disabled */}
                <div className="space-y-1 col-span-2">
                  <label className="text-sm font-semibold text-slate-700">Mã Điểm Danh</label>
                  <input 
                    required={isEdit} 
                    disabled={isEdit} 
                    value={formData.maDiemDanh || ""} 
                    onChange={(e) => setFormData({...formData, maDiemDanh: e.target.value})} 
                    placeholder={isEdit ? "" : "Tự động hoặc tự định nghĩa"}
                    className={`w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${isEdit ? "bg-slate-100" : "bg-slate-50"}`} 
                  />
                </div>

                {/* Mã Sinh Viên */}
                <div className="space-y-1 col-span-2">
                  <label className="text-sm font-semibold text-slate-700">Mã Sinh Viên <span className="text-red-500">*</span></label>
                  <input required value={formData.maSinhVien || ""} onChange={(e) => setFormData({...formData, maSinhVien: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="VD: SV001" />
                </div>
                
                {/* Mã Lịch Học */}
                <div className="space-y-1 col-span-2">
                  <label className="text-sm font-semibold text-slate-700">Mã Lịch Học <span className="text-red-500">*</span></label>
                  <input required value={formData.maLichHoc || ""} onChange={(e) => setFormData({...formData, maLichHoc: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="VD: LH001" />
                </div>
                
                {/* Ngày */}
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Ngày Điểm Danh</label>
                  <input type="date" value={formData.NgayDiemDanh || ""} onChange={(e) => setFormData({...formData, NgayDiemDanh: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                
                {/* Trạng thái */}
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Trạng Thái</label>
                  <select value={formData.trangThai || "Có mặt"} onChange={(e) => setFormData({...formData, trangThai: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                    <option value="Có mặt">Có mặt</option>
                    <option value="Vắng mặt">Vắng mặt</option>
                    <option value="Đi trễ">Đi trễ</option>
                    <option value="Có phép">Có phép</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">Huỷ Bỏ</button>
                <button type="submit" className="px-6 py-3 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95">
                  {isEdit ? "Cập Nhật" : "Lưu Điểm Danh"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
