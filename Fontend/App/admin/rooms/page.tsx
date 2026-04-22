"use client";

import React, { useState, useEffect } from "react";
import { 
  DoorOpen, 
  Search, 
  Pencil, 
  Trash2, 
  Plus, 
  Activity,
  Users,
  MoreVertical
} from "lucide-react";
import { getAllPhongHoc, deletePhongHoc } from "@/ApiCall/PhonghocApi";
import AddPhongHocModal from "@/app/items_phu/item_cua_phong/page_hien";

export default function RoomManagementPage() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<any | null>(null);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const data = await getAllPhongHoc();
      if (Array.isArray(data)) {
        setRooms(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa phòng "${name}"?`)) return;
    try {
      const res = await deletePhongHoc(id);
      if (res.success) {
        fetchRooms();
      } else {
        alert(res.message);
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi khi xóa phòng");
    }
  };

  const filteredRooms = rooms.filter(room => 
    room.TenPhong.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative p-6 w-full h-full bg-gradient-to-br from-slate-50 via-white to-blue-50 border border-slate-100 rounded-2xl flex flex-col overflow-hidden shadow-sm">
      {/* Modals */}
      {showModal && (
        <AddPhongHocModal
          className="fixed inset-0 z-[200] flex items-center justify-center"
          editData={editData}
          onSuccess={() => {
            setShowModal(false);
            setEditData(null);
            fetchRooms();
          }}
          onCancel={() => {
            setShowModal(false);
            setEditData(null);
          }}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-col sm:flex-row gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600 tracking-tight flex items-center gap-3">
            <DoorOpen size={36} className="text-blue-600" />
            Quản Lý Phòng Học
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Theo dõi sức chứa và trạng thái sẵn sàng của các phòng học
          </p>
        </div>

        <button
          onClick={() => {
            setEditData(null);
            setShowModal(true);
          }}
          className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 active:scale-[0.97]"
        >
          <Plus size={20} />
          Thêm Phòng Học
        </button>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <DoorOpen size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Tổng số phòng</p>
            <p className="text-2xl font-bold text-slate-800">{rooms.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Phòng sẵn sàng</p>
            <p className="text-2xl font-bold text-slate-800">
              {rooms.filter(r => r.trangThai === "Sẵn sàng").length}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Phòng đang bận</p>
            <p className="text-2xl font-bold text-slate-800">
              {rooms.filter(r => r.trangThai === "Bận").length}
            </p>
          </div>
        </div>
      </div>

      {/* Search & Table */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-50 flex items-center gap-4 bg-slate-50/30">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm tên phòng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50/80 backdrop-blur-md sticky top-0">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Mã Phòng</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Tên Phòng</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Sức Chứa</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Trạng Thái</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 animate-pulse">Đang tải dữ liệu...</td>
                </tr>
              ) : filteredRooms.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">Không tìm thấy phòng nào</td>
                </tr>
              ) : (
                filteredRooms.map((room) => (
                  <tr key={room.maPhongHoc} className="hover:bg-blue-50/40 transition-colors duration-200 group">
                    <td className="px-6 py-4 text-sm font-bold text-slate-800">
                      #{room.maPhongHoc}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700 font-medium">
                      {room.TenPhong}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Users size={14} className="text-slate-400" />
                        {room.sucChua} người
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        room.trangThai === "Sẵn sàng" 
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                        : "bg-amber-50 text-amber-600 border border-amber-100"
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${room.trangThai === "Sẵn sàng" ? "bg-emerald-500" : "bg-amber-500"} animate-pulse`} />
                        {room.trangThai}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={() => {
                            setEditData(room);
                            setShowModal(true);
                          }}
                          className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-600 hover:text-amber-700 transition-all shadow-sm"
                          title="Chỉnh sửa"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(room.maPhongHoc, room.TenPhong)}
                          className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 transition-all shadow-sm"
                          title="Xóa"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-50 bg-slate-50/30 text-xs text-slate-400 flex justify-between items-center">
          <span>Hiển thị {filteredRooms.length} trên tổng số {rooms.length} phòng học</span>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Sẵn sàng</span>
            <span className="flex items-center gap-1 ml-2"><div className="w-2 h-2 rounded-full bg-amber-500" /> Bận</span>
          </div>
        </div>
      </div>
    </div>
  );
}
