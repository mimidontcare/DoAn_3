"use client";

import React from "react";
import "@/app/globals.css";
import { useRouter } from "next/navigation";

export default function Page({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Đại Học Quốc Gia</title>

      <header className="bg-gradient-to-r from-[#001f3f] to-[#003366] text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="logo text-2xl md:text-3xl font-bold tracking-tight">
            ĐẠI HỌC QUỐC GIA
          </div>
          <a
            href="#"
            onClick={() => {
              router.push("/login");
            }}
            className="auth-btn bg-[#00aaff] hover:bg-[#0088cc] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
          >
            Đăng nhập
          </a>
        </div>
      </header>

      <section
        className="hero min-h-[80vh] bg-cover bg-center relative flex items-center justify-center text-center text-white"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.65)), url('/image/background.webp')",
        }}
      >
        <div className="hero-content max-w-4xl px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-2xl leading-tight">
            Môi trường giáo dục đẳng cấp quốc tế
          </h1>
          <p className="text-xl md:text-2xl mb-10 drop-shadow-lg">
            Đào tạo nguồn nhân lực chất lượng cao, nghiên cứu khoa học và đổi
            mới sáng tạo
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="#"
              className="btn bg-[#00aaff] hover:bg-[#0088cc] text-white px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-2"
            >
              Tìm hiểu ngay
            </a>
            <a
              href="#"
              className="btn btn-light bg-white hover:bg-gray-100 text-[#003366] px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-2"
            >
              Tham quan ảo
            </a>
          </div>
        </div>
      </section>

      <section className="why py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-center text-[#001f3f] mb-16">
            TẠI SAO CHỌN CHÚNG TÔI
          </h2>
          <div className="features grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: "🌍",
                title: "Môi trường quốc tế",
                desc: "Kết nối sinh viên toàn cầu",
              },
              {
                icon: "🔬",
                title: "Nghiên cứu tiên phong",
                desc: "Phòng thí nghiệm hiện đại",
              },
              {
                icon: "🤝",
                title: "Cộng đồng năng động",
                desc: "Mạng lưới sinh viên mạnh",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="feature bg-gradient-to-br from-blue-50 to-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-4 text-center"
              >
                <div className="icon text-6xl mb-6 text-[#00aaff]">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-semibold text-[#001f3f] mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="programs py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-center text-[#001f3f] mb-16">
            NGÀNH HỌC NỔI BẬT
          </h2>
          <div className="program-grid grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="program-card bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-4">
              <img
                src="\image\lapTrinh.jpg"
                alt="Công nghệ thông tin"
                className="w-full h-56 object-cover"
              />
              <div className="program-info p-8 text-center">
                <h3 className="text-2xl font-bold text-[#001f3f] mb-3">
                  Công nghệ thông tin
                </h3>
                <p className="text-gray-600">
                  AI, Data Science, Cyber Security
                </p>
              </div>
            </div>

            <div className="program-card bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-4">
              <img
                src="\image\khoaHoc.webp"
                alt="Công nghệ sinh học"
                className="w-full h-56 object-cover"
              />
              <div className="program-info p-8 text-center">
                <h3 className="text-2xl font-bold text-[#001f3f] mb-3">
                  Công nghệ sinh học
                </h3>
                <p className="text-gray-600">Công nghệ gen, Sinh học phân tử</p>
              </div>
            </div>

            <div className="program-card bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-4">
              <img
                src="\image\nghiencuu.jpg"
                alt="Kinh tế & Quản trị"
                className="w-full h-56 object-cover"
              />
              <div className="program-info p-8 text-center">
                <h3 className="text-2xl font-bold text-[#001f3f] mb-3">
                  Kinh tế & Quản trị
                </h3>
                <p className="text-gray-600">
                  Kinh doanh số, Quản trị chiến lược
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="news py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-center text-[#001f3f] mb-16">
            TIN TỨC & SỰ KIỆN
          </h2>
          <div className="news-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="news-card bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-4">
              <img
                src="\image\images.jpg"
                alt="Tin tức"
                className="w-full h-64 object-cover"
              />
              <div className="news-content p-8">
                <div className="news-date text-gray-500 text-sm mb-3">
                  15/05/2024
                </div>
                <h3 className="news-title text-2xl font-bold text-[#001f3f] mb-4">
                  Đại học thăng hạng trong bảng xếp hạng thế giới
                </h3>
                <p className="text-gray-700">
                  Tăng bậc mạnh mẽ trong bảng xếp hạng quốc tế
                </p>
              </div>
            </div>
            {/* Bạn có thể thêm card tin tức khác tương tự */}
          </div>
        </div>
      </section>

      <footer className="bg-[#001f3f] text-white py-16">
        <div className="container mx-auto px-6">
          <div className="footer-grid grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h4 className="text-xl font-bold mb-6">ĐẠI HỌC QUỐC GIA</h4>
              <p className="opacity-80">
                Nơi đào tạo nhân tài và nghiên cứu khoa học hàng đầu
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-6">Liên kết nhanh</h4>
              <div className="flex flex-col gap-3 opacity-80">
                <a href="#" className="hover:text-[#00aaff] transition-colors">
                  Tuyển sinh
                </a>
                <a href="#" className="hover:text-[#00aaff] transition-colors">
                  Đào tạo
                </a>
                <a href="#" className="hover:text-[#00aaff] transition-colors">
                  Nghiên cứu
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-6">Liên hệ</h4>
              <p className="opacity-80">TP. Hồ Chí Minh</p>
              <p className="opacity-80">ĐT: 028 3698 1234</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-6">Đăng ký nhận tin</h4>
              <input
                type="email"
                placeholder="Email của bạn"
                className="w-full p-4 rounded-lg mb-4 text-black focus:outline-none focus:ring-2 focus:ring-[#00aaff]"
              />
              <button className="w-full bg-[#00aaff] hover:bg-[#0088cc] text-white py-4 rounded-lg font-bold transition-all duration-300">
                Đăng ký
              </button>
            </div>
          </div>
          <div className="copyright text-center mt-12 pt-8 border-t border-blue-800 opacity-70">
            © 2024 Đại học Quốc Gia. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
