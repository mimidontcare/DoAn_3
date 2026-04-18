"use client";

import { useEffect, useState } from "react";
import {
  Search, Plus, BarChart3,
  Pencil, Trash2, X, Info, User, BookOpen, Hash
} from "lucide-react";
import { getAllBangdiem, addBangdiem, updateBangdiem, deleteBangdiem } from "@/ApiCall/BangdiemApi";

type Bangdiem = {
  MaBD: string;
  MaDD?: string;
  maLopHP?: string;
  MaMonHoc?: string;
  MaSinhVien: string;
  Diem: number | string;
};

export default function GradesPage() {
  const [data, setData] = useState<Bangdiem[]>([]);
  const [searchTxt, setSearchTxt] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState<Partial<Bangdiem>>({});

  const fetchData = async () => {
    try {
      const res = await getAllBangdiem();
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
    d.MaSinhVien?.toLowerCase().includes(searchTxt.toLowerCase()) || 
    d.MaBD?.toLowerCase().includes(searchTxt.toLowerCase()) ||
    d.MaMonHoc?.toLowerCase().includes(searchTxt.toLowerCase())
  );

  const openAdd = () => {
    setFormData({}); 
    setIsEdit(false); 
    setShowModal(true);
  };
  
  const openEdit = (item: Bangdiem) => {
    setFormData({ ...item });
    setIsEdit(true); 
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xoá điểm này không?")) return;
    try { 
      await deleteBangdiem(id); 
      fetchData(); 
    } catch (err) { 
      alert("Lỗi khi xoá"); 
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.MaSinhVien || formData.Diem === undefined || formData.Diem === "") {
      alert("Vui lòng nhập Mã Sinh Viên và Điểm số!");
      return;
    }
    
    try {
      if (isEdit && formData.MaBD) {
        await updateBangdiem(formData.MaBD, formData);
      } else {
        await addBangdiem(formData);
      }
      setShowModal(false); 
      fetchData();
    } catch (err) { 
      alert("Lỗi lưu trữ!"); 
    }
  };

  const getDiemColor = (diemStr: number | string | undefined) => {
    if (diemStr === undefined || diemStr === null || diemStr === "") return "text-slate-500 bg-slate-100 border-slate-200";
    const d = Number(diemStr);
    if (isNaN(d)) return "text-slate-500 bg-slate-100 border-slate-200";
    
    if (d >= 8) return "text-emerald-700 bg-emerald-100/80 border-emerald-200";
    if (d >= 5) return "text-blue-700 bg-blue-100/80 border-blue-200";
    if (d >= 4) return "text-amber-700 bg-amber-100/80 border-amber-200";
    return "text-rose-700 bg-rose-100/80 border-rose-200";
  };

  return (
    <div className="relative p-6 w-full h-full bg-gradient-to-br from-indigo-50 via-white to-blue-50 border border-indigo-100 rounded-2xl flex flex-col overflow-hidden shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600 tracking-tight flex items-center gap-3">
            <BarChart3 size={36} className="text-blue-600" />
            Quản Lý Bảng Điểm
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Lưu trữ và theo dõi kết quả học tập của sinh viên</p>
        </div>
        <button
          onClick={openAdd}
          className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg transition-all duration-300"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          Nhập Điểm Mới
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
            placeholder="Tìm theo Mã SV, Mã MH..."
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
                <th className="px-6 py-5 font-semibold">Mã Bảng Điểm</th>
                <th className="px-6 py-5 font-semibold">Mã Sinh Viên</th>
                <th className="px-6 py-5 font-semibold text-center">Môn Học</th>
                <th className="px-6 py-5 font-semibold text-center">Lớp Học Phần</th>
                <th className="px-6 py-5 font-semibold text-center">Đầu Điểm (MaDD)</th>
                <th className="px-6 py-5 font-semibold text-center">Điểm Số</th>
                <th className="px-6 py-5 font-semibold text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {displayedData.map((item) => (
                <tr key={item.MaBD} className="hover:bg-blue-50/40 group transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-700">{item.MaBD || "-"}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-bold text-slate-900 border border-slate-200 bg-slate-50 px-3 py-1.5 rounded-lg max-w-max">
                      <User size={16} className="text-blue-500" />
                      {item.MaSinhVien}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-slate-600 font-medium">
                    {item.MaMonHoc || "-"}
                  </td>
                  <td className="px-6 py-4 text-center text-slate-600">
                    {item.maLopHP || "-"}
                  </td>
                  <td className="px-6 py-4 text-center text-slate-500 text-xs">
                    <span className="flex items-center justify-center gap-1">
                      <Hash size={12}/> {item.MaDD || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-bold border shadow-sm ${getDiemColor(item.Diem)}`}>
                      {item.Diem}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEdit(item)} className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100"><Pencil size={16}/></button>
                      <button onClick={() => handleDelete(item.MaBD)} className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"><Trash2 size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
              {displayedData.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <Info size={48} className="mb-4 opacity-50" />
                      <p className="text-lg">Không tìm thấy dữ liệu điểm nào.</p>
                      <p className="text-sm mt-1">Vui lòng kiểm tra lại từ khoá hoặc nhập điểm mới.</p>
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
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <BarChart3 className="text-blue-600" /> {isEdit ? "Cập Nhật Bảng Điểm" : "Nhập Bảng Điểm"}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleSave} className="p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                
                {/* Mã Bảng Điểm */}
                <div className="space-y-1 col-span-2 md:col-span-1">
                  <label className="text-sm font-semibold text-slate-700">Mã Bảng Điểm <span className="text-red-500">*</span></label>
                  <input 
                    required={!isEdit} 
                    disabled={isEdit} 
                    value={formData.MaBD || ""} 
                    onChange={(e) => setFormData({...formData, MaBD: e.target.value})} 
                    placeholder="VD: BD001"
                    className={`w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${isEdit ? "bg-slate-100" : "bg-slate-50"}`} 
                  />
                </div>

                {/* Mã Sinh Viên */}
                <div className="space-y-1 col-span-2 md:col-span-1">
                  <label className="text-sm font-semibold text-slate-700">Mã Sinh Viên <span className="text-red-500">*</span></label>
                  <input required value={formData.MaSinhVien || ""} onChange={(e) => setFormData({...formData, MaSinhVien: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="VD: SV001" />
                </div>
                
                {/* Mã Đầu Điểm */}
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Mã Đầu Điểm (MaDD)</label>
                  <input value={formData.MaDD || ""} onChange={(e) => setFormData({...formData, MaDD: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="VD: DD01 (Giữa kỳ...)" />
                </div>
                
                {/* Mã Lớp HP */}
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Mã Lớp Học Phần</label>
                  <input value={formData.maLopHP || ""} onChange={(e) => setFormData({...formData, maLopHP: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="VD: SE101.M11" />
                </div>
                
                {/* Mã Môn Học */}
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Mã Môn Học</label>
                  <input value={formData.MaMonHoc || ""} onChange={(e) => setFormData({...formData, MaMonHoc: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="VD: IT001" />
                </div>
                
                {/* Điểm Số */}
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Điểm Số (0-10) <span className="text-red-500">*</span></label>
                  <input type="number" step="0.1" min="0" max="10" required value={formData.Diem !== undefined ? formData.Diem : ""} onChange={(e) => setFormData({...formData, Diem: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-bold text-blue-600" placeholder="VD: 8.5" />
                </div>
                
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">Huỷ Bỏ</button>
                <button type="submit" className="px-6 py-3 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95">
                  {isEdit ? "Cập Nhật Điểm" : "Lưu Bảng Điểm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
