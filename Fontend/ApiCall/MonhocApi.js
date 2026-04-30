import { ApiFerch } from "./Api";

export const getAllMonhoc = () => {
  return ApiFerch("monhoc");
};

export const getMonhocById = (id) => {
  return ApiFerch(`monhoc/${id}`);
};

// thêm môn học
export const addMonhoc = (data) => {
  return ApiFerch("monhoc", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// sửa môn học
export const updateMonhoc = (id, data) => {
  return ApiFerch(`monhoc/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

// xóa môn học
export const deleteMonhoc = (id) => {
  return ApiFerch(`monhoc/${id}`, {
    method: "DELETE",
  });
};
