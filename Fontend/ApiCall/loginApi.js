export default async function login({ email, password }) {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    if (data.user && data.user.loai !== undefined) {
      localStorage.setItem("role", String(data.user.loai).toLowerCase());
    }
  }

  return data;
}
