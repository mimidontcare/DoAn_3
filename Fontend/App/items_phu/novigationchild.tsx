import Link from "next/link";
import { Info, AlertTriangle, CheckCircle, Megaphone } from "lucide-react";

type Props = {
  className?: string;
};

function NovigationChild({ className }: Props) {
  return (
    <div className={className}>
      {/* Header */}
      <div className="rounded-tl-lg rounded-tr-lg h-15 flex justify-between bg-white shadow-ms border-b-2 border-gray-200">
        <span className="font-bold text-xl h-full flex items-center pl-3">
          Thông báo
        </span>

        <span className="text-blue-500 hover:underline h-full flex items-center pr-3 cursor-pointer text-sm">
          Đánh dấu đã đọc
        </span>
      </div>

      {/* Notification list */}
      <div className="h-[75%] overflow-y-auto bg-white">
        <div className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition border-b border-gray-200">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
              <Info className="w-5 h-5 text-blue-600" />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <p className="font-semibold text-gray-800">
              Yêu cầu đăng ký học phần
            </p>

            <p className="text-sm text-gray-500">
              Có 15 học sinh yêu cầu đăng ký học phần
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Link
        href="/notifications"
        className="border-t-2 border-gray-200 text-blue-500 hover:underline font-semibold text-sm flex justify-center items-center h-[12%] hover:bg-gray-50 transition"
      >
        Xem tất cả thông báo
      </Link>
    </div>
  );
}

export default NovigationChild;
