import { ApiFerch } from "./Api";

export const getAllLopHP = () => {
  return ApiFerch("lophocphan");
};

export const addLopHP = (data) => {
  return ApiFerch("lophocphan", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateLopHP = (id, data) => {
  return ApiFerch(`lophocphan/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteLopHP = (id) => {
  return ApiFerch(`lophocphan/${id}`, {
    method: "DELETE",
  });
};
