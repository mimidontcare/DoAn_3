"use client";

import { Mail, Lock, School } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import login from "@/ApiCall/loginApi";
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlelogin = async () => {
    try {
      if (email === "" || password === "") {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
      } else {
        const res = await login({ email, password });
        if (res) {
          alert("Đăng nhập thành công");
        } else {
          alert("Đăng nhập thất bại");
        }
      }

      // Giả sử đăng nhập thành công, bạn có thể muốn chuyển hướng
      // hoặc lưu trữ session/token.
      console.log("Đăng nhập thành công");
      router.push("/admin/dashboard"); // Chuyển hướng về trang chủ hoặc dashboard
    } catch (error) {
      alert("Đăng nhập thất bại :" + error);
      // Ở đây bạn có thể xử lý lỗi đăng nhập, ví dụ: hiển thị thông báo
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Header / Logo area */}
        <div className="bg-gradient-to-r from-gray-900 to-black px-10 pt-10 pb-8 flex flex-col items-center">
          <div className="p-4 bg-white/10 rounded-full mb-5 backdrop-blur-sm">
            <School className="h-14 w-14 text-white" strokeWidth={1.8} />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Đăng nhập
          </h1>
          <p className="mt-2 text-gray-300 text-sm">
            Chào mừng bạn quay trở lại
          </p>
        </div>

        {/* Form */}
        <div className="p-8 pt-10">
          {/* Email */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                id="email"
                type="email"
                placeholder="example@school.edu.vn"
                className="
                  w-full pl-11 pr-4 py-3.5
                  bg-gray-50 border border-gray-200
                  rounded-xl text-gray-800
                  focus:border-gray-400 focus:bg-white
                  focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50
                  outline-none transition-all duration-200
                  placeholder:text-gray-400
                "
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-7">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Mật khẩu
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="
                  w-full pl-11 pr-4 py-3.5
                  bg-gray-50 border border-gray-200
                  rounded-xl text-gray-800
                  focus:border-gray-400 focus:bg-white
                  focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50
                  outline-none transition-all duration-200
                  placeholder:text-gray-400
                "
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            className="
              w-full py-3.5 px-6
              bg-gradient-to-r from-gray-900 to-black
              text-white font-medium rounded-xl
              hover:from-gray-800 hover:to-gray-950
              focus:ring-2 focus:ring-offset-2 focus:ring-gray-800
              transition-all duration-300 shadow-md hover:shadow-lg
              active:scale-[0.98]
            "
            onClick={() => {
              handlelogin();
            }}
          >
            Đăng nhập
          </button>

          {/* Register link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Chưa có tài khoản?{" "}
              <button
                className="text-gray-900 font-medium hover:underline transition"
                onClick={() => {
                  router.push("/DangKY");
                }}
              >
                Đăng ký ngay
              </button>
            </p>
          </div>

          {/* Optional: Forgot password */}
          <div className="mt-4 text-center">
            <button className="text-sm text-gray-500 hover:text-gray-700 transition">
              Quên mật khẩu?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
