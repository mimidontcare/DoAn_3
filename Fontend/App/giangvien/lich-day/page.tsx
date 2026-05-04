"use client";

import { useState, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Search } from "lucide-react";
import { getAllLichhoc } from "@/ApiCall/LichhocApi";
import { getAllLopHP } from "@/ApiCall/LopHPApi";

export default function LichDayGiangVien() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [schedule, setSchedule] = useState<any[]>([]);

  // Fetch data
  const fetchData = async () => {
    try {
      const lichHocs = await getAllLichhoc();
      const lopHPs = await getAllLopHP();

      if (Array.isArray(lichHocs) && Array.isArray(lopHPs)) {
        // Map LopHP name into LichHoc
        const mapped = lichHocs.map(lh => {
          const lop = lopHPs.find(l => l.MaLopHocPhan === lh.maLopPhan);
          return {
            ...lh,
            tenLop: lop ? lop.tenLop : "Không xác định",
          };
        });
        setSchedule(mapped);
      }
    } catch (err: any) {
      console.warn("Lỗi fetchData Lịch dạy:", err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Helper to get days of the week
  const getDaysOfWeek = (date: Date) => {
    const days = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
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

  const getEventForSlot = (date: Date, periodIndex: number) => {
    const dateStr = date.toISOString().split("T")[0];
    // Giả lập phân bổ tiết dựa theo mã lịch học (vì trong DB chưa có cột ca/tiết cụ thể)
    return schedule.find(s => {
      const sDateStr = s.NgayHoc ? new Date(s.NgayHoc).toISOString().split("T")[0] : "";
      // Mock condition: random distribute or based on soTiet length.
      // In a real app, LichHoc should have startTime/endTime or Period field.
      // Here we just map some schedule items based on modulo for demo purposes.
      const mockPeriodIndex = s.soTiet % 4; // Mock
      return sDateStr === dateStr && mockPeriodIndex === periodIndex;
    });
  };

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
            <button
              onClick={prevWeek}
              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="px-4 font-semibold text-slate-700 min-w-[140px] text-center">
              Tuần {daysOfWeek[0].getDate()}/{daysOfWeek[0].getMonth() + 1} - {daysOfWeek[6].getDate()}/{daysOfWeek[6].getMonth() + 1}
            </span>
            <button
              onClick={nextWeek}
              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
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
                <div
                  key={idx}
                  className={`p-4 flex flex-col items-center justify-center border-r border-slate-200 ${
                    isToday ? "bg-blue-50/50" : ""
                  }`}
                >
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
                {/* Time column */}
                <div className="p-4 border-r border-slate-200 flex flex-col items-center justify-center gap-2 bg-slate-50/30">
                  <span className="font-bold text-slate-700 text-sm">{period.name}</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1"><Clock size={12}/> {period.time}</span>
                </div>

                {/* Days columns */}
                {daysOfWeek.map((date, dIdx) => {
                  const event = getEventForSlot(date, pIdx);
                  return (
                    <div key={dIdx} className="p-2 border-r border-slate-100 relative group transition-colors hover:bg-slate-50/50">
                      {event && (
                        <div className="absolute inset-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-3 shadow-lg text-white hover:scale-[1.02] transition-transform cursor-pointer overflow-hidden flex flex-col">
                          <div className="font-bold text-sm truncate mb-1" title={event.tenLop}>
                            {event.tenLop}
                          </div>
                          <div className="text-xs text-blue-100 font-medium mb-2">
                            {event.maLopPhan}
                          </div>
                          <div className="mt-auto flex items-center justify-between text-xs font-medium text-white/90 bg-white/20 px-2 py-1.5 rounded-lg">
                            <span className="flex items-center gap-1 truncate"><MapPin size={12}/> {event.phongHoc}</span>
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
