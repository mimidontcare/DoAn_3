"use client";

import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Search, BookOpen, PenTool } from "lucide-react";

export default function StudentSchedule() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [viewMode, setViewMode] = useState<"hoc" | "thi">("hoc");

  // Helper to get days of the week
  const getDaysOfWeek = (date: Date) => {
    const days = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(startOfWeek);
      nextDay.setDate(startOfWeek.getDate() + i);
      days.push(nextDay);
    }
    return days;
  };

  const nextWeek = () => {
    const next = new Date(currentWeek);
    next.setDate(next.getDate() + 7);
    setCurrentWeek(next);
  };

  const prevWeek = () => {
    const prev = new Date(currentWeek);
    prev.setDate(prev.getDate() - 7);
    setCurrentWeek(prev);
  };

  const daysOfWeek = getDaysOfWeek(currentWeek);
  const periods = [
    { name: "Tiết 1-3", time: "07:30 - 09:50" },
    { name: "Tiết 4-6", time: "10:00 - 12:20" },
    { name: "Tiết 7-9", time: "13:00 - 15:20" },
    { name: "Tiết 10-12", time: "15:30 - 17:50" },
  ];

  // Mock data for student
  const getEventForSlot = (dayIdx: number, pIdx: number) => {
    if (viewMode === "hoc") {
      if (dayIdx === 0 && pIdx === 0) return { title: "Lập trình Web", room: "A1.204", gv: "Nguyễn Văn A" };
      if (dayIdx === 2 && pIdx === 1) return { title: "Cơ sở dữ liệu", room: "B2.102", gv: "Trần Thị B" };
      if (dayIdx === 4 && pIdx === 2) return { title: "Toán rời rạc", room: "A2.301", gv: "Lê Văn C" };
    } else {
      if (dayIdx === 1 && pIdx === 0) return { title: "Thi Giữa Kỳ CSDL", room: "HT1", gv: "Giám thị 1" };
    }
    return null;
  };

  return (
    <div className="p-6 md:p-8 w-full h-full flex flex-col gap-6 animate-fade-in bg-white rounded-2xl shadow-sm border border-slate-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
            <Calendar className="text-blue-600" size={36} />
            Lịch Học & Lịch Thi
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Theo dõi thời khóa biểu cá nhân của bạn
          </p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setViewMode("hoc")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold transition-all ${
              viewMode === "hoc" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <BookOpen size={18} />
            Lịch Học
          </button>
          <button
            onClick={() => setViewMode("thi")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold transition-all ${
              viewMode === "thi" ? "bg-white text-rose-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <PenTool size={18} />
            Lịch Thi
          </button>
        </div>
      </div>

      {/* Calendar Controls */}
      <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100">
        <div className="flex items-center gap-4">
          <button onClick={prevWeek} className="p-2 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-slate-200 transition-all">
            <ChevronLeft size={20} className="text-slate-600" />
          </button>
          <span className="font-bold text-lg text-slate-800 min-w-[180px] text-center">
            Tuần {daysOfWeek[0].getDate()}/{daysOfWeek[0].getMonth() + 1} - {daysOfWeek[6].getDate()}/{daysOfWeek[6].getMonth() + 1}
          </span>
          <button onClick={nextWeek} className="p-2 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-slate-200 transition-all">
            <ChevronRight size={20} className="text-slate-600" />
          </button>
        </div>
        <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg font-semibold text-slate-700 hover:bg-slate-50">
          Hôm nay
        </button>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-auto border border-slate-200 rounded-xl rounded-b-xl flex flex-col">
        <div className="min-w-[900px] flex-1 flex flex-col">
          {/* Header */}
          <div className="grid grid-cols-8 border-b border-slate-200 bg-slate-100 sticky top-0 z-10">
            <div className="p-4 flex items-center justify-center border-r border-slate-200 font-bold text-slate-500">
              CA HỌC
            </div>
            {daysOfWeek.map((date, idx) => {
              const isToday = new Date().toDateString() === date.toDateString();
              return (
                <div key={idx} className={`p-4 flex flex-col items-center border-r border-slate-200 ${isToday ? "bg-blue-50" : ""}`}>
                  <span className={`text-sm font-bold ${isToday ? "text-blue-600" : "text-slate-500"}`}>
                    Thứ {idx === 6 ? "CN" : idx + 2}
                  </span>
                  <span className={`text-2xl font-black mt-1 ${isToday ? "text-blue-600" : "text-slate-800"}`}>
                    {date.getDate()}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Slots */}
          <div className="flex-1 flex flex-col">
            {periods.map((period, pIdx) => (
              <div key={pIdx} className="grid grid-cols-8 flex-1 border-b border-slate-100 min-h-[140px]">
                <div className="p-4 border-r border-slate-200 flex flex-col items-center justify-center bg-slate-50 gap-1">
                  <span className="font-bold text-slate-700">{period.name}</span>
                  <span className="text-xs font-semibold text-slate-400">{period.time}</span>
                </div>
                {daysOfWeek.map((_, dIdx) => {
                  const event = getEventForSlot(dIdx, pIdx);
                  return (
                    <div key={dIdx} className="border-r border-slate-100 p-2 hover:bg-slate-50 transition-colors relative">
                      {event && (
                        <div className={`absolute inset-2 rounded-xl p-3 shadow-md border overflow-hidden flex flex-col ${
                          viewMode === "hoc" 
                            ? "bg-blue-50 border-blue-200" 
                            : "bg-rose-50 border-rose-200"
                        }`}>
                          <h4 className={`font-bold text-sm mb-1 ${viewMode === "hoc" ? "text-blue-800" : "text-rose-800"}`}>
                            {event.title}
                          </h4>
                          <p className={`text-xs font-medium flex items-center gap-1 ${viewMode === "hoc" ? "text-blue-600" : "text-rose-600"}`}>
                            <MapPin size={12} /> {event.room}
                          </p>
                          <p className={`text-xs mt-auto ${viewMode === "hoc" ? "text-blue-500" : "text-rose-500"}`}>
                            GV: {event.gv}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
