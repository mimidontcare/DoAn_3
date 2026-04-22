import { ApiFerch } from "./Api";

export const getAllLopHC = () => {
  return ApiFerch("lophanhchinh");
};

export const addLopHC = (data) => {
  return ApiFerch("lophanhchinh", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateLopHC = (id, data) => {
  return ApiFerch(`lophanhchinh/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteLopHC = (id) => {
  return ApiFerch(`lophanhchinh/${id}`, {
    method: "DELETE",
  });
};
