import ThanhDieuHuongSinhVien from "../components/ThanhDieuHuongSinhVien";
import PhanDau from "../components/PhanDau";
import NoiDung from "../components/NoiDung";
import ProtectedRoute from "../components/ProtectedRoute";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["sinhvien", "3"]}>
      <div className="h-full w-full grid grid-cols-[260px_1fr] grid-rows-[64px_1fr] bg-gray-50">
        <ThanhDieuHuongSinhVien className="bg-white flex flex-col h-full row-span-2 border-r border-gray-200 z-10" />
        <PhanDau className="bg-white border-b border-gray-200 shadow-sm flex gap-5 z-0" />
        <NoiDung className="bg-[#F8FAFC] text-black h-full overflow-y-auto relative">
          {children}
        </NoiDung>
      </div>
    </ProtectedRoute>
  );
}
