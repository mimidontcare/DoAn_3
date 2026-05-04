import ThanhDieuHuongGiangVien from "../components/ThanhDieuHuongGiangVien";
import PhanDau from "../components/PhanDau";
import NoiDung from "../components/NoiDung";

export default function GiangVienLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full grid grid-cols-[260px_1fr] grid-rows-[64px_1fr] bg-gray-200">
      <ThanhDieuHuongGiangVien className="bg-[#FFFFFF] flex flex-col h-full row-span-2 border-b-2 border-gray-300" />
      <PhanDau className="text-black shadow-sm flex gap-5 bg-[#FFFFFF]" />
      <NoiDung className="bg-[#F6F7F8] text-black h-full overflow-y-auto">
        {children}
      </NoiDung>
    </div>
  );
}
