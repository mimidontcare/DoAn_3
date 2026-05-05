"use client";

import { GraduationCap, Award, TrendingUp, Download } from "lucide-react";

export default function StudentGrades() {
  const grades = [
    { name: "Lập trình Web nâng cao", credits: 3, qt: 8.5, gk: 8.0, ck: 9.0 },
    { name: "Toán rời rạc", credits: 3, qt: 7.0, gk: 6.5, ck: 7.5 },
    { name: "Cơ sở dữ liệu", credits: 4, qt: 9.0, gk: 8.5, ck: 8.0 },
    { name: "Mạng máy tính", credits: 3, qt: 6.5, gk: 7.0, ck: 5.5 },
  ];

  const calculateTotal = (qt: number, gk: number, ck: number) => {
    return qt * 0.1 + gk * 0.3 + ck * 0.6;
  };

  const getLetterAndGPA = (total: number) => {
    if (total >= 8.5) return { letter: "A", gpa: 4.0, color: "text-emerald-600 bg-emerald-50 border-emerald-200" };
    if (total >= 8.0) return { letter: "B+", gpa: 3.5, color: "text-blue-600 bg-blue-50 border-blue-200" };
    if (total >= 7.0) return { letter: "B", gpa: 3.0, color: "text-indigo-600 bg-indigo-50 border-indigo-200" };
    if (total >= 6.5) return { letter: "C+", gpa: 2.5, color: "text-purple-600 bg-purple-50 border-purple-200" };
    if (total >= 5.5) return { letter: "C", gpa: 2.0, color: "text-amber-600 bg-amber-50 border-amber-200" };
    if (total >= 5.0) return { letter: "D+", gpa: 1.5, color: "text-orange-600 bg-orange-50 border-orange-200" };
    if (total >= 4.0) return { letter: "D", gpa: 1.0, color: "text-rose-600 bg-rose-50 border-rose-200" };
    return { letter: "F", gpa: 0.0, color: "text-red-700 bg-red-100 border-red-300" };
  };

  let totalCredits = 0;
  let totalPoints = 0;

  grades.forEach(g => {
    const t = calculateTotal(g.qt, g.gk, g.ck);
    const { gpa } = getLetterAndGPA(t);
    totalCredits += g.credits;
    totalPoints += gpa * g.credits;
  });

  const finalGPA = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";

  return (
    <div className="p-6 md:p-8 w-full h-full flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
            <GraduationCap className="text-blue-600" size={36} />
            Bảng Điểm Học Tập
          </h1>
          <p className="text-slate-500 font-medium">
            Theo dõi kết quả học tập và điểm trung bình tích lũy
          </p>
        </div>
        
        <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition-all">
          <Download size={18} /> Xuất PDF
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 opacity-20"><Award size={120} /></div>
          <p className="text-blue-100 font-medium mb-1 relative z-10">GPA Tích Lũy (Hệ 4)</p>
          <h2 className="text-5xl font-black relative z-10">{finalGPA}</h2>
          <p className="text-sm text-blue-200 mt-2 font-medium relative z-10">Học lực: Khá</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><TrendingUp size={24} /></div>
            <p className="text-slate-500 font-medium">Tín chỉ tích lũy</p>
          </div>
          <h2 className="text-4xl font-bold text-slate-800">{totalCredits} <span className="text-lg text-slate-400 font-medium">tín chỉ</span></h2>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mt-2">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-bold text-slate-800 text-lg">Chi tiết học kỳ 1 - 2025/2026</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-bold border-b border-slate-200">Môn Học</th>
                <th className="p-4 font-bold border-b border-slate-200 text-center">Tín Chỉ</th>
                <th className="p-4 font-bold border-b border-slate-200 text-center">Quá Trình (10%)</th>
                <th className="p-4 font-bold border-b border-slate-200 text-center">Giữa Kỳ (30%)</th>
                <th className="p-4 font-bold border-b border-slate-200 text-center">Cuối Kỳ (60%)</th>
                <th className="p-4 font-bold border-b border-slate-200 text-center">Hệ 10</th>
                <th className="p-4 font-bold border-b border-slate-200 text-center">Điểm Chữ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {grades.map((g, idx) => {
                const total = calculateTotal(g.qt, g.gk, g.ck);
                const { letter, color } = getLetterAndGPA(total);
                return (
                  <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-4 font-bold text-slate-800">{g.name}</td>
                    <td className="p-4 text-center font-medium text-slate-600">{g.credits}</td>
                    <td className="p-4 text-center text-slate-600">{g.qt.toFixed(1)}</td>
                    <td className="p-4 text-center text-slate-600">{g.gk.toFixed(1)}</td>
                    <td className="p-4 text-center text-slate-600">{g.ck.toFixed(1)}</td>
                    <td className="p-4 text-center font-bold text-slate-800">{total.toFixed(1)}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-lg font-bold border text-sm ${color}`}>
                        {letter}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
