const db = require("../config/db");

/**
 * Lấy danh sách lớp học phần mà giảng viên đang đăng nhập phụ trách.
 * JWT payload chứa maNguoiDung -> truy vấn giangvien -> lấy maGiangVien -> lophocphan
 */
exports.getLopByGiangVien = (req, res) => {
  const maNguoiDung = req.user.maNguoiDung;

  const sql = `
    SELECT lhp.maLopHP, lhp.tenLop, lhp.MaLopHocPhan, lhp.MaMonHoc, lhp.maGiangVien,
           lhp.soLuongSinhVien, lhp.ThoigianMo, lhp.thoigianDong,
           mh.tenMonHoc, mh.soTiet
    FROM giangvien gv
    JOIN lophocphan lhp ON gv.maGiangVien = lhp.maGiangVien
    LEFT JOIN monhoc mh ON lhp.MaMonHoc = mh.maMonHoc
    WHERE gv.MaNguoiDung = ?
    ORDER BY lhp.maLopHP
  `;

  db.query(sql, [maNguoiDung], (err, results) => {
    if (err) return res.status(500).json({ message: "Lỗi server", error: err });
    res.json(results);
  });
};

/**
 * Lấy danh sách sinh viên trong một lớp học phần.
 * Ưu tiên dùng bảng dangkyhocphan. Nếu bảng rỗng thì fallback lấy tất cả sinh viên.
 */
exports.getSinhVienByLop = (req, res) => {
  const { maLopHP } = req.params;

  // Thử lấy qua bảng đăng ký học phần
  const sqlDK = `
    SELECT sv.maSV, sv.Hoten, sv.MaLopHC, sv.GioiTinh
    FROM dangkyhocphan dk
    JOIN sinhvien sv ON dk.maSV = sv.maSV
    WHERE dk.maLopHP = ?
    ORDER BY sv.maSV
  `;

  db.query(sqlDK, [maLopHP], (err, results) => {
    if (err) return res.status(500).json({ message: "Lỗi server", error: err });

    if (results.length > 0) {
      return res.json(results);
    }

    // Fallback: nếu chưa có đăng ký, lấy tất cả sinh viên (giới hạn 50)
    const sqlAll = `
      SELECT sv.maSV, sv.Hoten, sv.MaLopHC, sv.GioiTinh
      FROM sinhvien sv
      ORDER BY sv.maSV
      LIMIT 50
    `;
    db.query(sqlAll, [], (err2, results2) => {
      if (err2) return res.status(500).json({ message: "Lỗi server", error: err2 });
      res.json(results2);
    });
  });
};

/**
 * Lấy lịch sử điểm danh của một lớp học phần.
 * Thông qua: lophocphan -> lichhoc -> diemdanh
 */
exports.getLichSuDiemDanh = (req, res) => {
  const { maLopHP } = req.params;

  const sql = `
    SELECT dd.maDiemDanh, dd.NgayDiemDanh, dd.maSinhVien, dd.maLichHoc, dd.trangThai,
           lh.soTiet
    FROM diemdanh dd
    JOIN lichhoc lh ON dd.maLichHoc = lh.maLichHoc
    WHERE lh.maLopPhan = ?
    ORDER BY dd.NgayDiemDanh DESC, dd.maSinhVien
  `;

  db.query(sql, [maLopHP], (err, results) => {
    if (err) return res.status(500).json({ message: "Lỗi server", error: err });
    res.json(results);
  });
};

/**
 * Tạo buổi điểm danh mới.
 * Body: { maLopHP, ngayDiemDanh, soTiet, phongHoc, danhSach: [{maSV, trangThai}] }
 * Bước 1: Tạo bản ghi lichhoc mới
 * Bước 2: Tạo bản ghi diemdanh cho từng sinh viên
 */
exports.taoBuoiDiemDanh = (req, res) => {
  const { maLopHP, ngayDiemDanh, soTiet, phongHoc, danhSach } = req.body;

  if (!maLopHP || !ngayDiemDanh || !danhSach || danhSach.length === 0) {
    return res.status(400).json({ message: "Thiếu thông tin điểm danh" });
  }

  // Bước 1: Tạo mã lịch học mới (auto-increment kiểu LH00x)
  db.query("SELECT maLichHoc FROM lichhoc ORDER BY maLichHoc DESC LIMIT 1", (err, rows) => {
    if (err) return res.status(500).json({ message: "Lỗi server", error: err });

    let newLHId = "LH001";
    if (rows.length > 0) {
      const lastId = rows[0].maLichHoc;
      const match = lastId.match(/^([a-zA-Z]*)(\d+)$/);
      if (match) {
        const prefix = match[1];
        const num = parseInt(match[2], 10) + 1;
        newLHId = prefix + num.toString().padStart(match[2].length, "0");
      }
    }

    // Tạo bản ghi lichhoc
    const sqlLH = "INSERT INTO lichhoc (maLichHoc, maLopPhan, NgayHoc, soTiet, phongHoc) VALUES (?, ?, ?, ?, ?)";
    db.query(sqlLH, [newLHId, maLopHP, ngayDiemDanh, soTiet || 3, phongHoc || ""], (err2) => {
      if (err2) return res.status(500).json({ message: "Lỗi tạo lịch học", error: err2 });

      // Bước 2: Tạo mã điểm danh mới cho từng sinh viên
      db.query("SELECT maDiemDanh FROM diemdanh ORDER BY maDiemDanh DESC LIMIT 1", (err3, ddRows) => {
        if (err3) return res.status(500).json({ message: "Lỗi server", error: err3 });

        let startNum = 1;
        let ddPrefix = "DD";
        let ddPadding = 3;
        if (ddRows.length > 0) {
          const lastDD = ddRows[0].maDiemDanh;
          const match2 = lastDD.match(/^([a-zA-Z]*)(\d+)$/);
          if (match2) {
            ddPrefix = match2[1];
            startNum = parseInt(match2[2], 10) + 1;
            ddPadding = match2[2].length;
          }
        }

        // Chuẩn bị batch insert cho diemdanh
        const values = danhSach.map((sv, idx) => {
          const maDD = ddPrefix + (startNum + idx).toString().padStart(ddPadding, "0");
          return [maDD, ngayDiemDanh, sv.maSV, newLHId, sv.trangThai];
        });

        const sqlDD = "INSERT INTO diemdanh (maDiemDanh, NgayDiemDanh, maSinhVien, maLichHoc, trangThai) VALUES ?";
        db.query(sqlDD, [values], (err4) => {
          if (err4) return res.status(500).json({ message: "Lỗi lưu điểm danh", error: err4 });

          res.json({
            message: "Điểm danh thành công",
            maLichHoc: newLHId,
            soSinhVien: danhSach.length
          });
        });
      });
    });
  });
};

/**
 * Thống kê số tiết vắng/muộn của từng sinh viên trong 1 lớp học phần.
 */
exports.thongKeVang = (req, res) => {
  const { maLopHP } = req.params;

  // Lấy tổng số tiết của môn học
  const sqlTongTiet = `
    SELECT COALESCE(mh.soTiet, 45) as tongSoTiet
    FROM lophocphan lhp
    LEFT JOIN monhoc mh ON lhp.MaMonHoc = mh.maMonHoc
    WHERE lhp.maLopHP = ?
    LIMIT 1
  `;

  db.query(sqlTongTiet, [maLopHP], (err, tietRows) => {
    if (err) return res.status(500).json({ message: "Lỗi server", error: err });
    const tongSoTiet = tietRows.length > 0 ? tietRows[0].tongSoTiet : 45;

    // Thống kê số tiết vắng cho từng sinh viên
    const sql = `
      SELECT dd.maSinhVien,
             SUM(CASE WHEN dd.trangThai = 'Vắng' THEN lh.soTiet ELSE 0 END) as soTietVang,
             SUM(CASE WHEN dd.trangThai = 'Muộn' THEN lh.soTiet ELSE 0 END) as soTietMuon,
             COUNT(DISTINCT dd.maLichHoc) as soBuoiDiemDanh
      FROM diemdanh dd
      JOIN lichhoc lh ON dd.maLichHoc = lh.maLichHoc
      WHERE lh.maLopPhan = ?
      GROUP BY dd.maSinhVien
    `;

    db.query(sql, [maLopHP], (err2, results) => {
      if (err2) return res.status(500).json({ message: "Lỗi server", error: err2 });
      res.json({ tongSoTiet, thongKe: results });
    });
  });
};
