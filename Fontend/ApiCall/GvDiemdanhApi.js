import { ApiFerch } from "./Api";

// Lấy danh sách lớp học phần do giảng viên đang đăng nhập phụ trách
export const getLopGiangDay = () => {
  return ApiFerch("gv-diemdanh/lop-giang-day");
};

// Lấy danh sách sinh viên trong 1 lớp học phần
export const getSinhVienByLop = (maLopHP) => {
  return ApiFerch(`gv-diemdanh/sinh-vien/${maLopHP}`);
};

// Lấy lịch sử điểm danh của 1 lớp
export const getLichSuDiemDanh = (maLopHP) => {
  return ApiFerch(`gv-diemdanh/lich-su/${maLopHP}`);
};

// Tạo buổi điểm danh mới (batch)
export const taoBuoiDiemDanh = (data) => {
  return ApiFerch("gv-diemdanh/tao-buoi", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Thống kê tiết vắng của từng SV trong 1 lớp
export const thongKeVang = (maLopHP) => {
  return ApiFerch(`gv-diemdanh/thong-ke/${maLopHP}`);
};
