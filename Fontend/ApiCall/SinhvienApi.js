import { ApiFerch } from "./Api";

// Lấy danh sách toàn bộ sinh viên
export const getAllSinhvien = () => {
  return ApiFerch("sinhvien");
};

// Lấy sinh viên theo ID
export const getSinhvienById = (id) => {
  return ApiFerch(`sinhvien/${id}`);
};

// Thêm sinh viên mới
export const addSinhvien = (data) => {
  return ApiFerch("sinhvien", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Cập nhật sinh viên
export const updateSinhvien = (id, data) => {
  return ApiFerch(`sinhvien/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

// Xoá sinh viên
export const deleteSinhvien = (id) => {
  return ApiFerch(`sinhvien/${id}`, {
    method: "DELETE",
  });
};
