import { ApiFerch } from "./Api";

export const getAllBangdiem = () => {
  return ApiFerch("bangdiem");
};

export const getBangdiemById = (id) => {
  return ApiFerch(`bangdiem/${id}`);
};

export const addBangdiem = (data) => {
  return ApiFerch("bangdiem", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateBangdiem = (id, data) => {
  return ApiFerch(`bangdiem/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteBangdiem = (id) => {
  return ApiFerch(`bangdiem/${id}`, {
    method: "DELETE",
  });
};
