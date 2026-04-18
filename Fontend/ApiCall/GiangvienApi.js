import { ApiFerch } from "./Api";

// Lấy danh sách toàn bộ giảng viên
export const getAllGiangvien = () => {
  return ApiFerch("giangvien");
};

// Lấy giảng viên theo ID
export const getGiangvienById = (id) => {
  return ApiFerch(`giangvien/${id}`);
};

// Thêm giảng viên mới
export const addGiangvien = (data) => {
  return ApiFerch("giangvien", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Cập nhật giảng viên
export const updateGiangvien = (id, data) => {
  return ApiFerch(`giangvien/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

// Xoá giảng viên
export const deleteGiangvien = (id) => {
  return ApiFerch(`giangvien/${id}`, {
    method: "DELETE",
  });
};
