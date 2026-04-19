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
