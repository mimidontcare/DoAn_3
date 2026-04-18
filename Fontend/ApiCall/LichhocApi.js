import { ApiFerch } from "./Api";

export const getAllLichhoc = () => {
  return ApiFerch("lichhoc");
};

export const getLichhocById = (id) => {
  return ApiFerch(`lichhoc/${id}`);
};

export const addLichhoc = (data) => {
  return ApiFerch("lichhoc", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateLichhoc = (id, data) => {
  return ApiFerch(`lichhoc/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteLichhoc = (id) => {
  return ApiFerch(`lichhoc/${id}`, {
    method: "DELETE",
  });
};
