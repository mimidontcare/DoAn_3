"use client";

import { Mail, Lock, School, Phone, MapPin, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-black px-8 pt-10 pb-8 flex flex-col items-center">
          <div className="p-4 bg-white/10 rounded-full mb-5 backdrop-blur-sm">
            <School className="h-14 w-14 text-white" strokeWidth={1.8} />
          </div>

          <h1 className="text-3xl font-bold text-white tracking-tight">
            Tạo tài khoản
          </h1>

          <p className="mt-2 text-gray-300 text-sm">
            Bắt đầu hành trình học tập cùng chúng tôi
          </p>
        </div>

        {/* Form */}
        <div className="p-8 pt-10">
          <form className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>

              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  type="email"
                  placeholder="example@school.edu.vn"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl
                  text-gray-800 placeholder:text-gray-400
                  focus:border-gray-400 focus:bg-white
                  focus:ring-2 focus:ring-gray-200 outline-none transition-all"
                />
              </div>
            </div>

            {/* Số điện thoại */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Số điện thoại
              </label>

              <div className="relative">
                <Phone
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  type="tel"
                  placeholder="0123 456 789"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl
                  text-gray-800 placeholder:text-gray-400
                  focus:border-gray-400 focus:bg-white
                  focus:ring-2 focus:ring-gray-200 outline-none transition-all"
                />
              </div>
            </div>

            {/* Địa chỉ */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Địa chỉ
              </label>

              <div className="relative">
                <MapPin
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  type="text"
                  placeholder="Hà Nội, Việt Nam"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl
                  text-gray-800 placeholder:text-gray-400
                  focus:border-gray-400 focus:bg-white
                  focus:ring-2 focus:ring-gray-200 outline-none transition-all"
                />
              </div>
            </div>

            {/* Mật khẩu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Mật khẩu
              </label>

              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  type="password"
                  placeholder="Tối thiểu 8 ký tự"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl
                  text-gray-800 placeholder:text-gray-400
                  focus:border-gray-400 focus:bg-white
                  focus:ring-2 focus:ring-gray-200 outline-none transition-all"
                />
              </div>
            </div>

            {/* Xác nhận mật khẩu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Xác nhận mật khẩu
              </label>

              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl
                  text-gray-800 placeholder:text-gray-400
                  focus:border-gray-400 focus:bg-white
                  focus:ring-2 focus:ring-gray-200 outline-none transition-all"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              {/* Submit */}
              <button
                type="submit"
                className="flex-1 py-3.5 bg-gradient-to-r from-gray-900 to-black text-white font-medium rounded-xl
                hover:from-gray-800 hover:to-gray-950
                transition shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                Tạo tài khoản
              </button>

              {/* Exit */}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="flex items-center justify-center gap-2 px-5 py-3.5 border border-gray-300
                text-gray-700 rounded-xl hover:bg-gray-100 transition"
              >
                <X size={18} />
                Thoát
              </button>
            </div>
          </form>

          {/* Login link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Đã có tài khoản?{" "}
              <button
                onClick={() => router.push("/login")}
                className="text-gray-900 font-medium hover:underline"
              >
                Đăng nhập ngay
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
