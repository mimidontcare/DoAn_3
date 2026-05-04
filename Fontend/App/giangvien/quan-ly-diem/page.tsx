"use client";

import { useState } from "react";
import {
  BarChart3,
  Search,
  ChevronDown,
  Settings2,
  Save,
  Download,
  FileSpreadsheet,
  FileText
} from "lucide-react";

const mockStudents = [
  { maSV: "SV001", tenSV: "Nguyễn Văn A", diemQT: 8, diemGK: 7, diemCK: 8 },
  { maSV: "SV002", tenSV: "Trần Thị B", diemQT: 6, diemGK: 5, diemCK: 4 },
  { maSV: "SV003", tenSV: "Lê Hoàng C", diemQT: 9, diemGK: 9, diemCK: 10 },
  { maSV: "SV004", tenSV: "Phạm Văn D", diemQT: 7, diemGK: 8, diemCK: 7.5 },
  { maSV: "SV005", tenSV: "Hoàng Thị E", diemQT: 5, diemGK: 4, diemCK: 3 },
];

export default function QuanLyDiemGiangVien() {
  const [selectedLop, setSelectedLop] = useState("Cấu trúc dữ liệu & Giải thuật - L01");
  const [openLop, setOpenLop] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  // Config weights
  const [weights, setWeights] = useState({
    qt: 10,
    gk: 20,
    ck: 70
  });

  const [students, setStudents] = useState(mockStudents);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Record<string, { diemQT: number, diemGK: number, diemCK: number }>>({});

  const handleEditClick = () => {
    const initialData: Record<string, any> = {};
    students.forEach(sv => {
      initialData[sv.maSV] = { diemQT: sv.diemQT, diemGK: sv.diemGK, diemCK: sv.diemCK };
    });
    setEditData(initialData);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const updatedStudents = students.map(sv => ({
      ...sv,
      diemQT: editData[sv.maSV].diemQT,
      diemGK: editData[sv.maSV].diemGK,
      diemCK: editData[sv.maSV].diemCK,
    }));
    setStudents(updatedStudents);
    setIsEditing(false);
    alert("Đã lưu bảng điểm thành công!");
  };

  const handlePointChange = (maSV: string, field: "diemQT" | "diemGK" | "diemCK", value: string) => {
    let numVal = parseFloat(value);
    if (isNaN(numVal)) numVal = 0;
    if (numVal < 0) numVal = 0;
    if (numVal > 10) numVal = 10;
    
    setEditData(prev => ({
      ...prev,
      [maSV]: {
        ...prev[maSV],
        [field]: numVal
      }
    }));
  };

  const calculateTotal = (sv: any, data: any) => {
    const qt = data[sv.maSV]?.diemQT ?? sv.diemQT;
    const gk = data[sv.maSV]?.diemGK ?? sv.diemGK;
    const ck = data[sv.maSV]?.diemCK ?? sv.diemCK;

    return (qt * weights.qt / 100 + gk * weights.gk / 100 + ck * weights.ck / 100).toFixed(2);
  };

  const getGPAAndLetter = (total: number) => {
    if (total >= 9.0) return { gpa: 4.0, letter: "A+", color: "text-emerald-600 bg-emerald-50 border-emerald-200" };
    if (total >= 8.5) return { gpa: 3.8, letter: "A", color: "text-emerald-500 bg-emerald-50 border-emerald-100" };
    if (total >= 8.0) return { gpa: 3.5, letter: "B+", color: "text-blue-600 bg-blue-50 border-blue-200" };
    if (total >= 7.0) return { gpa: 3.0, letter: "B", color: "text-blue-500 bg-blue-50 border-blue-100" };
    if (total >= 6.5) return { gpa: 2.5, letter: "C+", color: "text-amber-600 bg-amber-50 border-amber-200" };
    if (total >= 5.5) return { gpa: 2.0, letter: "C", color: "text-amber-500 bg-amber-50 border-amber-100" };
    if (total >= 5.0) return { gpa: 1.5, letter: "D+", color: "text-orange-600 bg-orange-50 border-orange-200" };
    if (total >= 4.0) return { gpa: 1.0, letter: "D", color: "text-orange-500 bg-orange-50 border-orange-100" };
    return { gpa: 0.0, letter: "F", color: "text-rose-600 bg-rose-50 border-rose-200" };
  };

  const lopOptions = [
    "Cấu trúc dữ liệu & Giải thuật - L01",
    "Hệ điều hành - L02",
    "Mạng máy tính - L01"
  ];

  return (
    <div className="relative p-6 w-full h-full bg-gradient-to-br from-indigo-50 via-white to-slate-50 border border-slate-100 rounded-2xl flex flex-col overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-col sm:flex-row gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
            <BarChart3 size={36} className="text-blue-600" />
            Quản Lý Điểm Học Phần
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Nhập điểm, cấu hình trọng số và tự động quy đổi GPA
          </p>
        </div>

        <div className="flex gap-3">
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold shadow-sm hover:bg-slate-50 transition-colors">
              <Download size={18} />
              Xuất Bảng Điểm
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
              <div className="p-1">
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 rounded-lg">
                  <FileSpreadsheet size={16} /> Excel (.xlsx)
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50 rounded-lg">
                  <FileText size={16} /> PDF (.pdf)
                </button>
              </div>
            </div>
          </div>
          
          {!isEditing ? (
            <button
              onClick={handleEditClick}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-blue-500/30 transition-all active:scale-[0.98]"
            >
              <Settings2 size={18} />
              Nhập / Sửa Điểm
            </button>
          ) : (
            <button
              onClick={handleSaveClick}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-[0.98]"
            >
              <Save size={18} />
              Lưu Bảng Điểm
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-slate-100 bg-white/70 backdrop-blur-xl shadow-xl flex-1 flex flex-col min-h-0">
        <div className="p-6 flex-1 flex flex-col min-h-0 space-y-6">
          
          {/* Toolbar */}
          <div className="flex flex-wrap gap-4 items-end">
            <div className="w-72 relative">
              <label className="text-xs font-semibold text-slate-500 mb-1.5 block">CHỌN LỚP HỌC PHẦN</label>
              <div
                className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm hover:border-slate-300 shadow-sm"
                onClick={() => setOpenLop(!openLop)}
              >
                <span className="truncate mr-2 font-bold text-blue-700">{selectedLop}</span>
                <ChevronDown size={16} className="text-slate-400 shrink-0" />
              </div>
              {openLop && (
                <div className="absolute z-20 mt-1 w-full rounded-xl border border-slate-200 bg-white shadow-xl py-1">
                  {lopOptions.map((opt) => (
                    <div
                      key={opt}
                      className="cursor-pointer px-4 py-2.5 text-sm hover:bg-blue-50 text-slate-700 font-medium"
                      onClick={() => {
                        setSelectedLop(opt);
                        setOpenLop(false);
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative w-full md:w-64">
              <label className="text-xs font-semibold text-slate-500 mb-1.5 block">TÌM KIẾM SINH VIÊN</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Mã SV, Tên SV..."
                  className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                />
              </div>
            </div>

            <button 
              onClick={() => setShowConfig(!showConfig)}
              className={`ml-auto flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm border shadow-sm transition-colors ${
                showConfig ? "bg-blue-50 border-blue-200 text-blue-700" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Settings2 size={16} />
              Cấu hình trọng số
            </button>
          </div>

          {/* Config Panel */}
          {showConfig && (
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 flex gap-6 items-center shadow-inner animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="text-sm font-bold text-blue-800">Cấu hình cột điểm (%):</div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-blue-100 shadow-sm">
                  <span className="text-xs font-semibold text-slate-600">Quá trình</span>
                  <input 
                    type="number" 
                    value={weights.qt} 
                    onChange={e => setWeights({...weights, qt: Number(e.target.value)})}
                    className="w-12 outline-none font-bold text-blue-600 text-center bg-transparent"
                  />
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-blue-100 shadow-sm">
                  <span className="text-xs font-semibold text-slate-600">Giữa kỳ</span>
                  <input 
                    type="number" 
                    value={weights.gk} 
                    onChange={e => setWeights({...weights, gk: Number(e.target.value)})}
                    className="w-12 outline-none font-bold text-blue-600 text-center bg-transparent"
                  />
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-blue-100 shadow-sm">
                  <span className="text-xs font-semibold text-slate-600">Cuối kỳ</span>
                  <input 
                    type="number" 
                    value={weights.ck} 
                    onChange={e => setWeights({...weights, ck: Number(e.target.value)})}
                    className="w-12 outline-none font-bold text-blue-600 text-center bg-transparent"
                  />
                </div>
              </div>
              {weights.qt + weights.gk + weights.ck !== 100 && (
                <div className="text-rose-500 text-xs font-bold ml-2">Tổng trọng số phải bằng 100% (Hiện tại: {weights.qt + weights.gk + weights.ck}%)</div>
              )}
            </div>
          )}

          {/* Table */}
          <div className="overflow-auto flex-1 rounded-2xl border border-slate-200 shadow-inner bg-white">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Mã SV</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Họ và Tên</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Điểm Quá Trình ({weights.qt}%)</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Điểm Giữa Kỳ ({weights.gk}%)</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Điểm Cuối Kỳ ({weights.ck}%)</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Tổng Kết (Hệ 10)</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Điểm Chữ</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Hệ 4</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {students.map((sv) => {
                  const totalStr = isEditing 
                    ? calculateTotal(sv, editData)
                    : calculateTotal(sv, { [sv.maSV]: sv });
                  
                  const totalNum = parseFloat(totalStr);
                  const gpaInfo = getGPAAndLetter(totalNum);

                  return (
                    <tr key={sv.maSV} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">{sv.maSV}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-800">{sv.tenSV}</td>
                      
                      {/* Điểm quá trình */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {isEditing ? (
                          <input 
                            type="number" step="0.1" min="0" max="10"
                            value={editData[sv.maSV]?.diemQT ?? ""}
                            onChange={(e) => handlePointChange(sv.maSV, "diemQT", e.target.value)}
                            className="w-20 px-2 py-1.5 border-2 border-blue-200 rounded-lg text-center font-bold text-blue-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          />
                        ) : (
                          <span className="font-medium text-slate-700">{sv.diemQT}</span>
                        )}
                      </td>

                      {/* Điểm giữa kỳ */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {isEditing ? (
                          <input 
                            type="number" step="0.1" min="0" max="10"
                            value={editData[sv.maSV]?.diemGK ?? ""}
                            onChange={(e) => handlePointChange(sv.maSV, "diemGK", e.target.value)}
                            className="w-20 px-2 py-1.5 border-2 border-blue-200 rounded-lg text-center font-bold text-blue-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          />
                        ) : (
                          <span className="font-medium text-slate-700">{sv.diemGK}</span>
                        )}
                      </td>

                      {/* Điểm cuối kỳ */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {isEditing ? (
                          <input 
                            type="number" step="0.1" min="0" max="10"
                            value={editData[sv.maSV]?.diemCK ?? ""}
                            onChange={(e) => handlePointChange(sv.maSV, "diemCK", e.target.value)}
                            className="w-20 px-2 py-1.5 border-2 border-blue-200 rounded-lg text-center font-bold text-blue-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          />
                        ) : (
                          <span className="font-medium text-slate-700">{sv.diemCK}</span>
                        )}
                      </td>

                      {/* Tổng kết hệ 10 */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="font-bold text-lg text-indigo-700">{totalStr}</span>
                      </td>

                      {/* Điểm chữ */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-lg font-bold border ${gpaInfo.color}`}>
                          {gpaInfo.letter}
                        </span>
                      </td>

                      {/* Hệ 4 */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="font-bold text-slate-600">{gpaInfo.gpa.toFixed(1)}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
    </div>
  );
}
