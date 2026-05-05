"use client";

import { useState, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Loader2 } from "lucide-react";
import { getLichDay } from "@/ApiCall/GvApi";

export default function LichDayGiangVien() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [schedule, setSchedule] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLichDay();
        if (Array.isArray(data)) setSchedule(data);
      } catch (err: any) {
        console.warn("Lỗi fetchData Lịch dạy:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getDaysOfWeek = (date: Date) => {
    const days = [];
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    start.setDate(diff);
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      days.push(d);
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

  // Group events by date, then assign sequentially to periods
  const getEventForSlot = (date: Date, periodIndex: number) => {
    const dateStr = date.toISOString().split("T")[0];
    const eventsForDay = schedule.filter(s => {
      const sDate = s.NgayHoc ? new Date(s.NgayHoc).toISOString().split("T")[0] : "";
      return sDate === dateStr;
    });
    return eventsForDay[periodIndex] || null;
  };

  const gradients = [
    "from-blue-500 to-indigo-600",
    "from-emerald-500 to-teal-600",
    "from-violet-500 to-purple-600",
    "from-orange-400 to-rose-500",
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex items-center gap-3 text-blue-600 font-semibold animate-pulse">
          <Loader2 size={24} className="animate-spin" /> Đang tải lịch dạy...
        </div>
      </div>
    );
  }

  return (
    <div className="relative p-6 w-full h-full bg-gradient-to-br from-slate-50 via-white to-blue-50 border border-slate-100 rounded-2xl flex flex-col overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-col sm:flex-row gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
            <Calendar size={36} className="text-blue-600" />
            Lịch Dạy Cá Nhân
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Theo dõi thời khóa biểu và lịch lên lớp hàng tuần
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
            <button onClick={prevWeek} className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <ChevronLeft size={20} />
            </button>
            <span className="px-4 font-semibold text-slate-700 min-w-[140px] text-center">
              Tuần {daysOfWeek[0].getDate()}/{daysOfWeek[0].getMonth() + 1} - {daysOfWeek[6].getDate()}/{daysOfWeek[6].getMonth() + 1}
            </span>
            <button onClick={nextWeek} className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 overflow-auto rounded-2xl border border-slate-200 shadow-xl bg-white/80 backdrop-blur-xl flex flex-col">
        <div className="min-w-[800px] flex-1 flex flex-col">
          {/* Header Row */}
          <div className="grid grid-cols-8 border-b border-slate-200 bg-slate-50/90 sticky top-0 z-10">
            <div className="p-4 flex items-center justify-center border-r border-slate-200 text-sm font-bold text-slate-500 uppercase">
              Ca học
            </div>
            {daysOfWeek.map((date, idx) => {
              const isToday = new Date().toDateString() === date.toDateString();
              return (
                <div key={idx} className={`p-4 flex flex-col items-center justify-center border-r border-slate-200 ${isToday ? "bg-blue-50/50" : ""}`}>
                  <span className={`text-xs font-semibold uppercase ${isToday ? "text-blue-600" : "text-slate-500"}`}>
                    Thứ {idx === 6 ? "CN" : idx + 2}
                  </span>
                  <span className={`text-xl font-bold mt-1 ${isToday ? "text-blue-600 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center" : "text-slate-800"}`}>
                    {date.getDate()}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Time Slots */}
          <div className="flex-1 flex flex-col">
            {periods.map((period, pIdx) => (
              <div key={pIdx} className="grid grid-cols-8 border-b border-slate-100 flex-1 min-h-[120px]">
                <div className="p-4 border-r border-slate-200 flex flex-col items-center justify-center gap-2 bg-slate-50/30">
                  <span className="font-bold text-slate-700 text-sm">{period.name}</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1"><Clock size={12}/> {period.time}</span>
                </div>
                {daysOfWeek.map((date, dIdx) => {
                  const event = getEventForSlot(date, pIdx);
                  const grad = gradients[pIdx % gradients.length];
                  return (
                    <div key={dIdx} className="p-2 border-r border-slate-100 relative group transition-colors hover:bg-slate-50/50">
                      {event && (
                        <div className={`absolute inset-2 bg-gradient-to-br ${grad} rounded-xl p-3 shadow-lg text-white hover:scale-[1.02] transition-transform cursor-pointer overflow-hidden flex flex-col`}>
                          <div className="font-bold text-sm truncate mb-1" title={event.tenMonHoc || event.tenLop}>
                            {event.tenMonHoc || event.tenLop}
                          </div>
                          <div className="text-xs text-white/80 font-medium mb-2">
                            {event.maLopPhan}
                          </div>
                          <div className="mt-auto flex items-center justify-between text-xs font-medium text-white/90 bg-white/20 px-2 py-1.5 rounded-lg">
                            <span className="flex items-center gap-1 truncate"><MapPin size={12}/> {event.phongHoc || "N/A"}</span>
                            <span>{event.soTiet} tiết</span>
                          </div>
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
