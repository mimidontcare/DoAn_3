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
