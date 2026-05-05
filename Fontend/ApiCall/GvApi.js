import { ApiFerch } from "./Api";

export const getDashboardStats = () => ApiFerch("gv/dashboard-stats");
export const getLichDay = () => ApiFerch("gv/lich-day");
export const getDauDiem = () => ApiFerch("gv/dau-diem");
export const getBangDiem = (maLopHP) => ApiFerch(`gv/bang-diem/${maLopHP}`);
export const luuBangDiem = (data) => ApiFerch("gv/luu-diem", { method: "POST", body: JSON.stringify(data) });
