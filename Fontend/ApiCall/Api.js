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
  return await res.json();
};
// NOTE : CẦN làm login nữa mới xong được hoàn thành thêm sửa xóa
