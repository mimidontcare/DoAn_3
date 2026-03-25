export default function Page() {
  const isActive = false; // Thay đổi giá trị này để kiểm tra active state
  return (
    <h1 className="text-xl font-bold">
      {isActive ? "Users Page" : "Inactive Users Page"}
    </h1>
  );
}
