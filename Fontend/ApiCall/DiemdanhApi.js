import { ApiFerch } from "./Api";

export const getAllDiemdanh = () => {
  return ApiFerch("diemdanh");
};

export const getDiemdanhById = (id) => {
  return ApiFerch(`diemdanh/${id}`);
};

export const addDiemdanh = (data) => {
  return ApiFerch("diemdanh", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateDiemdanh = (id, data) => {
  return ApiFerch(`diemdanh/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteDiemdanh = (id) => {
  return ApiFerch(`diemdanh/${id}`, {
    method: "DELETE",
  });
};
