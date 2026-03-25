import ThanhDieuHuong from "../components/ThanhDieuHuong";
import PhanDau from "../components/PhanDau";
import NoiDung from "../components/NoiDung";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <div className="border-2 border-black grid grid-cols-[260px_1fr] gap-0 grid-rows-[64px_1fr] bg-gray-200 h-full w-full">
    //   <ThanhDieuHuong className="row-span-2 bg-[#FFFFFF] w-64 flex flex-col h-full" />
    //   <PhanDau className="bg-[#F6F7F8] border-2 border-black text-black" />
    //   <NoiDung className="bg-[#F6F7F8] text-black ">{children}</NoiDung>
    // </div>
    <div className="h-full w-full   grid grid-cols-[260px_1fr]  grid-rows-[64px_1fr] bg-gray-200">
      <ThanhDieuHuong className="bg-[#FFFFFF]  flex flex-col h-full row-span-2 border-b-2 border-gray-300" />
      <PhanDau className=" text-black shadow-sm flex gap-5 bg-[#FFFFFF]" />
      <NoiDung className="bg-[#F6F7F8] text-black h-full overflow-y-auto">
        {children}
      </NoiDung>
    </div>
  );
}
