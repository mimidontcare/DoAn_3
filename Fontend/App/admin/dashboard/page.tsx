import Link from "next/link";
import {
  Users,
  BookOpen,
  Calendar,
  CheckCircle,
  UserPlus,
  FileText,
  Edit,
} from "lucide-react";

export default function Page() {
  return (
    <div className="relative p-6 w-full h-full bg-gradient-to-br from-indigo-50 via-white to-blue-50 border border-indigo-100 rounded-2xl flex flex-col overflow-hidden shadow-sm">
      {/* HEADER */}
      <div className="mb-6 flex-shrink-0">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600 tracking-tight">
          Tổng quan hệ thống
        </h1>
        <p className="text-slate-500 mt-2 font-medium">
          Chào mừng quay trở lại. Theo dõi hoạt động đào tạo và hiệu suất của
          trường đại học.
        </p>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-auto">
        {/* CARD STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8 w-full">
          {/* CARD */}
          <div className="bg-white/70 backdrop-blur-xl p-5 border border-slate-100 rounded-2xl shadow flex justify-between items-center w-full hover:shadow-lg transition-all duration-300">
            <div>
              <p className="text-slate-500 text-sm font-medium">Tổng sinh viên</p>
              <h2 className="text-2xl font-bold text-slate-800">12,450</h2>
              <p className="text-emerald-600 text-sm font-medium mt-1">+2.5% so với kỳ trước</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 flex items-center justify-center border border-white shadow-sm">
              <Users className="text-blue-600 flex-shrink-0" size={24} />
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl p-5 border border-slate-100 rounded-2xl shadow flex justify-between items-center w-full hover:shadow-lg transition-all duration-300">
            <div>
              <p className="text-slate-500 text-sm font-medium">Số lượng khoa</p>
              <h2 className="text-2xl font-bold text-slate-800">85</h2>
              <p className="text-slate-400 text-sm font-medium mt-1">Không thay đổi</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-100 to-purple-100 flex items-center justify-center border border-white shadow-sm">
              <BookOpen className="text-indigo-600 flex-shrink-0" size={24} />
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl p-5 border border-slate-100 rounded-2xl shadow flex justify-between items-center w-full hover:shadow-lg transition-all duration-300">
            <div>
              <p className="text-slate-500 text-sm font-medium">Lớp học hôm nay</p>
              <h2 className="text-2xl font-bold text-slate-800">42</h2>
              <p className="text-emerald-600 text-sm font-medium mt-1">+12% so với hôm qua</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 flex items-center justify-center border border-white shadow-sm">
              <Calendar className="text-blue-600 flex-shrink-0" size={24} />
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl p-5 border border-slate-100 rounded-2xl shadow flex justify-between items-center w-full hover:shadow-lg transition-all duration-300">
            <div>
              <p className="text-slate-500 text-sm font-medium">Tỉ lệ điểm danh</p>
              <h2 className="text-2xl font-bold text-slate-800">94.2%</h2>
              <p className="text-rose-500 text-sm font-medium mt-1">-1.2%</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-100 to-teal-100 flex items-center justify-center border border-white shadow-sm">
              <CheckCircle className="text-emerald-600 flex-shrink-0" size={24} />
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full">
          {/* QUICK ACTION */}
          <div className="xl:col-span-2 bg-white/50 backdrop-blur-md p-6 border border-slate-100 rounded-2xl shadow-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-slate-800">
              Thao tác nhanh
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/admin/students"
                className="flex items-center gap-4 p-4 shadow-sm border border-slate-100 bg-white rounded-xl hover:bg-slate-50 transition-colors w-full group"
              >
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UserPlus className="text-blue-500 flex-shrink-0" size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Thêm sinh viên mới</p>
                  <p className="text-sm text-slate-500 font-medium pt-0.5">
                    Đăng ký hồ sơ sinh viên mới
                  </p>
                </div>
              </Link>

              <Link
                href="/admin/classes"
                className="flex items-center gap-4 p-4 shadow-sm border border-slate-100 bg-white rounded-xl hover:bg-slate-50 transition-colors w-full group"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="text-indigo-500 flex-shrink-0" size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Tạo học phần mới</p>
                  <p className="text-sm text-slate-500 font-medium pt-0.5">
                    Thiết lập chương trình học
                  </p>
                </div>
              </Link>

              <Link
                href="/admin/attendance"
                className="flex items-center gap-4 p-4 shadow-sm border border-slate-100 bg-white rounded-xl hover:bg-slate-50 transition-colors w-full group"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="text-emerald-500 flex-shrink-0" size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Xuất báo cáo</p>
                  <p className="text-sm text-slate-500 font-medium pt-0.5">
                    Tạo báo cáo dạng PDF/Excel
                  </p>
                </div>
              </Link>

              <Link
                href="/admin/schedule"
                className="flex items-center gap-4 p-4 shadow-sm border border-slate-100 bg-white rounded-xl hover:bg-slate-50 transition-colors w-full group"
              >
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Edit className="text-amber-500 flex-shrink-0" size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Chỉnh sửa lịch</p>
                  <p className="text-sm text-slate-500 font-medium pt-0.5">
                    Thay đổi thời gian lớp học
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* TRAINING PROGRESS */}
          <div className="bg-white/70 backdrop-blur-xl p-6 border border-slate-100 rounded-2xl shadow w-full">
            <h2 className="text-xl font-bold mb-4 text-slate-800">Tiến độ đào tạo</h2>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-1.5 font-medium text-slate-700">
                  <span>Khoa kỹ thuật</span>
                  <span className="text-blue-600 font-bold">75%</span>
                </div>
                <div className="bg-slate-100 h-2.5 rounded-full w-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full w-[75%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1.5 font-medium text-slate-700">
                  <span>Khoa nghệ thuật</span>
                  <span className="text-indigo-600 font-bold">60%</span>
                </div>
                <div className="bg-slate-100 h-2.5 rounded-full w-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full w-[60%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1.5 font-medium text-slate-700">
                  <span>Khoa kinh tế</span>
                  <span className="text-emerald-600 font-bold">82%</span>
                </div>
                <div className="bg-slate-100 h-2.5 rounded-full w-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full w-[82%]" />
                </div>
              </div>

              <button className="mt-5 w-full font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl py-2.5 hover:bg-slate-100 transition-colors">
                Xem phân tích chi tiết
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
