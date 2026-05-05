"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[]; // VD: ["giangvien"], ["admin"]
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Chỉ kiểm tra ở client-side
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || !role) {
      // Nếu chưa đăng nhập, điều hướng về trang đăng nhập
      router.push(`/login?redirect=${pathname}`);
      return;
    }

    // Kiểm tra xem role của user hiện tại có nằm trong danh sách allowedRoles không
    if (allowedRoles.includes(role.toLowerCase())) {
      setIsAuthorized(true);
    } else {
      // Truy cập trái phép -> Điều hướng về dashboard mặc định hoặc báo lỗi
      alert("Bạn không có quyền truy cập vào trang này!");
      if (role === "admin" || role === "1") {
        router.push("/admin/dashboard");
      } else if (role === "giangvien" || role === "2") {
        router.push("/giangvien");
      } else if (role === "sinhvien" || role === "3") {
        router.push("/student");
      } else {
        router.push("/htmltemplate");
      }
    }
    
    setIsLoading(false);
  }, [router, pathname, allowedRoles]);

  if (isLoading) {
    // Hiển thị skeleton hoặc spinner trong lúc đang kiểm tra quyền
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-100">
        <div className="text-blue-600 font-semibold animate-pulse">Đang kiểm tra quyền truy cập...</div>
      </div>
    );
  }

  return isAuthorized ? <>{children}</> : null;
}
