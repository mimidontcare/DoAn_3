const ApiUrl = "http://localhost:5000/api";
export const ApiFerch = async (endpoint, option = {}) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${ApiUrl}/${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    ...option,
  });
  
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || data.sqlMessage || "Có lỗi xảy ra từ máy chủ");
  }
  return data;
};
