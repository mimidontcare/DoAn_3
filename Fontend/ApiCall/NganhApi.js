import { ApiFerch } from "./Api";

export const getAllNganh = () => {
  return ApiFerch("nganh");
};

export const getNganhById = (id) => {
  return ApiFerch(`nganh/${id}`);
};

export const addNganh = (data) => {
  return ApiFerch("nganh", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateNganh = (id, data) => {
  return ApiFerch(`nganh/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteNganh = (id) => {
  return ApiFerch(`nganh/${id}`, {
    method: "DELETE",
  });
};
