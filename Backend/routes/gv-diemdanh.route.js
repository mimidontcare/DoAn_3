const express = require("express");
const router = express.Router();
const controller = require("../controllers/gv-diemdanh.controller");

// Lấy danh sách lớp học phần của giảng viên đang đăng nhập
router.get("/lop-giang-day", controller.getLopByGiangVien);

// Lấy danh sách sinh viên trong một lớp học phần (theo maLopHP)
router.get("/sinh-vien/:maLopHP", controller.getSinhVienByLop);

// Lấy lịch sử điểm danh của một lớp học phần
router.get("/lich-su/:maLopHP", controller.getLichSuDiemDanh);

// Tạo buổi điểm danh mới (batch insert cho nhiều SV)
router.post("/tao-buoi", controller.taoBuoiDiemDanh);

// Thống kê tổng số tiết vắng của từng SV trong 1 lớp
router.get("/thong-ke/:maLopHP", controller.thongKeVang);

module.exports = router;
