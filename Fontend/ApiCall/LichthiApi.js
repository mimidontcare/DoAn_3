import { ApiFerch } from "./Api";

export const getAllLichthi = () => {
  return ApiFerch("lichthi");
};

export const getLichthiById = (id) => {
  return ApiFerch(`lichthi/${id}`);
};

export const addLichthi = (data) => {
  return ApiFerch("lichthi", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateLichthi = (id, data) => {
  return ApiFerch(`lichthi/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteLichthi = (id) => {
  return ApiFerch(`lichthi/${id}`, {
    method: "DELETE",
  });
};
