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
    <div className="w-full h-full flex flex-col p-6 bg-gray-50 overflow-hidden">
      {/* HEADER */}
      <div className="mb-6 flex-shrink-0">
        <h1 className="text-3xl font-bold text-gray-800">Tổng quan hệ thống</h1>
        <p className="text-gray-500">
          Chào mừng quay trở lại. Theo dõi hoạt động đào tạo và hiệu suất của
          trường đại học.
        </p>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-auto">
        {/* CARD STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8 w-full">
          {/* CARD */}
          <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center w-full">
            <div>
              <p className="text-gray-500 text-sm">Tổng sinh viên</p>
              <h2 className="text-2xl font-bold">12,450</h2>
              <p className="text-green-600 text-sm">+2.5% so với kỳ trước</p>
            </div>
            <Users className="text-blue-500 flex-shrink-0" size={32} />
          </div>

          <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center w-full">
            <div>
              <p className="text-gray-500 text-sm">Số lượng khoa</p>
              <h2 className="text-2xl font-bold">85</h2>
              <p className="text-gray-400 text-sm">Không thay đổi</p>
            </div>
            <BookOpen className="text-blue-500 flex-shrink-0" size={32} />
          </div>

          <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center w-full">
            <div>
              <p className="text-gray-500 text-sm">Lớp học hôm nay</p>
              <h2 className="text-2xl font-bold">42</h2>
              <p className="text-green-600 text-sm">+12% so với hôm qua</p>
            </div>
            <Calendar className="text-blue-500 flex-shrink-0" size={32} />
          </div>

          <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center w-full">
            <div>
              <p className="text-gray-500 text-sm">Tỉ lệ điểm danh</p>
              <h2 className="text-2xl font-bold">94.2%</h2>
              <p className="text-red-500 text-sm">-1.2%</p>
            </div>
            <CheckCircle className="text-blue-500 flex-shrink-0" size={32} />
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full">
          {/* QUICK ACTION */}
          <div className="xl:col-span-2 bg-gray-100 p-6 rounded-xl shadow w-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Thao tác nhanh
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/admin/students"
                className="flex items-center gap-4 p-4 shadow-md bg-white rounded-lg hover:bg-gray-50 w-full"
              >
                <UserPlus className="text-blue-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Thêm sinh viên mới</p>
                  <p className="text-sm text-gray-500">
                    Đăng ký hồ sơ sinh viên mới
                  </p>
                </div>
              </Link>

              <Link
                href="/admin/classes"
                className="flex items-center gap-4 p-4 shadow-md bg-white rounded-lg hover:bg-gray-50 w-full"
              >
                <BookOpen className="text-blue-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Tạo học phần mới</p>
                  <p className="text-sm text-gray-500">
                    Thiết lập chương trình học
                  </p>
                </div>
              </Link>

              <Link
                href="/admin/attendance"
                className="flex items-center gap-4 p-4 shadow-md bg-white rounded-lg hover:bg-gray-50 w-full"
              >
                <FileText className="text-blue-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Xuất báo cáo điểm danh</p>
                  <p className="text-sm text-gray-500">
                    Tạo báo cáo dạng PDF/Excel
                  </p>
                </div>
              </Link>

              <Link
                href="/admin/schedule"
                className="flex items-center gap-4 p-4 shadow-md bg-white rounded-lg hover:bg-gray-50 w-full"
              >
                <Edit className="text-blue-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Chỉnh sửa lịch</p>
                  <p className="text-sm text-gray-500">
                    Thay đổi thời gian lớp học
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* TRAINING PROGRESS */}
          <div className="bg-white p-6 rounded-xl shadow w-full">
            <h2 className="text-xl font-semibold mb-4">Tiến độ đào tạo</h2>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Khoa kỹ thuật</span>
                  <span>75%</span>
                </div>
                <div className="bg-gray-200 h-2 rounded-full w-full">
                  <div className="bg-blue-500 h-2 rounded-full w-[75%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Khoa nghệ thuật</span>
                  <span>60%</span>
                </div>
                <div className="bg-gray-200 h-2 rounded-full w-full">
                  <div className="bg-blue-500 h-2 rounded-full w-[60%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Khoa kinh tế</span>
                  <span>82%</span>
                </div>
                <div className="bg-gray-200 h-2 rounded-full w-full">
                  <div className="bg-green-500 h-2 rounded-full w-[82%]" />
                </div>
              </div>

              <button className="mt-4 w-full border rounded-lg py-2 hover:bg-gray-100">
                Xem phân tích chi tiết
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
