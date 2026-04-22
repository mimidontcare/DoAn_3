import { ApiFerch } from "./Api";

export const getAllPhongHoc = () => {
  return ApiFerch("phonghoc");
};

export const getPhongHocById = (id) => {
  return ApiFerch(`phonghoc/${id}`);
};

export const addPhongHoc = (data) => {
  return ApiFerch("phonghoc", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updatePhongHoc = (id, data) => {
  return ApiFerch(`phonghoc/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deletePhongHoc = (id) => {
  return ApiFerch(`phonghoc/${id}`, {
    method: "DELETE",
  });
};
