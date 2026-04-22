import { ApiFerch } from "./Api";

export const getAll = () => {
  return ApiFerch("khoa");
};

export const getKhoaById = (id) => {
  return ApiFerch(`khoa/${id}`);
};

// thêm khoa
export const addKhoa = (data) => {
  return ApiFerch("khoa", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// sửa khoa
export const updateKhoa = (id, data) => {
  return ApiFerch(`khoa/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

// xóa khoa
export const deleteKhoa = (id) => {
  return ApiFerch(`khoa/${id}`, {
    method: "DELETE",
  });
};
