import { ApiFerch } from "./Api";
export const getAll = () => {
  return ApiFerch("khoa");
};
//thêm khoa
export const addKhoa = (data) => {
  return ApiFerch("khoa", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
