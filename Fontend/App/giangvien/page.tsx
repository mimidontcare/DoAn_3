"use client";

import React from "react";

export default function GiangVienDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Bảng điều khiển Giảng viên
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Placeholder cards */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-32">
          <div className="text-gray-500 font-medium">Lớp đang dạy</div>
          <div className="text-3xl font-bold text-blue-600">4</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-32">
          <div className="text-gray-500 font-medium">Lịch dạy hôm nay</div>
          <div className="text-3xl font-bold text-orange-500">2</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-32">
          <div className="text-gray-500 font-medium">Tổng sinh viên</div>
          <div className="text-3xl font-bold text-green-500">128</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-32">
          <div className="text-gray-500 font-medium">Tỷ lệ đi học trung bình</div>
          <div className="text-3xl font-bold text-purple-600">92%</div>
        </div>
      </div>
    </div>
  );
}
