const db = require("../config/db");

// ===== DASHBOARD STATS =====
exports.getDashboardStats = (req, res) => {
  const maNguoiDung = req.user.maNguoiDung;

  db.query("SELECT maGiangVien FROM giangvien WHERE MaNguoiDung = ?", [maNguoiDung], (err, gvRows) => {
    if (err) return res.status(500).json({ message: "Lỗi server", error: err });
    if (gvRows.length === 0) return res.json({ lopDangDay: 0, lichHomNay: 0, tongSV: 0, tyLeChuyenCan: 100 });

    const maGV = gvRows[0].maGiangVien;
    const today = new Date().toISOString().split("T")[0];

    const sqlLop = "SELECT COUNT(*) as cnt FROM lophocphan WHERE maGiangVien = ?";
    const sqlToday = `SELECT COUNT(*) as cnt FROM lichhoc lh JOIN lophocphan lhp ON lh.maLopPhan = lhp.maLopHP WHERE lhp.maGiangVien = ? AND lh.NgayHoc = ?`;
    const sqlSV = "SELECT COALESCE(SUM(soLuongSinhVien),0) as total FROM lophocphan WHERE maGiangVien = ?";
    const sqlAtt = `SELECT COUNT(*) as totalR, SUM(CASE WHEN dd.trangThai='Có mặt' THEN 1 ELSE 0 END) as present
      FROM diemdanh dd JOIN lichhoc lh ON dd.maLichHoc=lh.maLichHoc JOIN lophocphan lhp ON lh.maLopPhan=lhp.maLopHP
      WHERE lhp.maGiangVien=?`;

    db.query(sqlLop, [maGV], (e1, r1) => {
      if (e1) return res.status(500).json({ error: e1 });
      db.query(sqlToday, [maGV, today], (e2, r2) => {
        if (e2) return res.status(500).json({ error: e2 });
        db.query(sqlSV, [maGV], (e3, r3) => {
          if (e3) return res.status(500).json({ error: e3 });
          db.query(sqlAtt, [maGV], (e4, r4) => {
            if (e4) return res.status(500).json({ error: e4 });
            const totalR = r4[0]?.totalR || 0;
            const present = r4[0]?.present || 0;
            const rate = totalR > 0 ? Math.round((present / totalR) * 100) : 100;
            res.json({
              lopDangDay: r1[0]?.cnt || 0,
              lichHomNay: r2[0]?.cnt || 0,
              tongSV: r3[0]?.total || 0,
              tyLeChuyenCan: rate,
            });
          });
        });
      });
    });
  });
};

// ===== LỊCH DẠY =====
exports.getLichDay = (req, res) => {
  const maNguoiDung = req.user.maNguoiDung;
  const sql = `
    SELECT lh.maLichHoc, lh.maLopPhan, lh.NgayHoc, lh.soTiet, lh.phongHoc,
           lhp.tenLop, lhp.MaMonHoc, mh.tenMonHoc
    FROM lichhoc lh
    JOIN lophocphan lhp ON lh.maLopPhan = lhp.maLopHP
    JOIN giangvien gv ON lhp.maGiangVien = gv.maGiangVien
    LEFT JOIN monhoc mh ON lhp.MaMonHoc = mh.maMonHoc
    WHERE gv.MaNguoiDung = ?
    ORDER BY lh.NgayHoc, lh.maLichHoc
  `;
  db.query(sql, [maNguoiDung], (err, results) => {
    if (err) return res.status(500).json({ message: "Lỗi server", error: err });
    res.json(results);
  });
};

// ===== ĐẦU ĐIỂM =====
exports.getDauDiem = (req, res) => {
  db.query("SELECT * FROM daudiem ORDER BY HeSoDiem", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// ===== BẢNG ĐIỂM THEO LỚP =====
exports.getBangDiem = (req, res) => {
  const { maLopHP } = req.params;
  const sql = `
    SELECT bd.MaBD, bd.MaSinhVien, bd.MaMonHoc, bd.maLopHP, bd.MaDD, bd.Diem,
           sv.Hoten, sv.MaLopHC, dd.TenDD, dd.HeSoDiem
    FROM bangdiem bd
    JOIN sinhvien sv ON bd.MaSinhVien = sv.maSV
    JOIN daudiem dd ON bd.MaDD = dd.MaDD
    WHERE bd.maLopHP = ?
    ORDER BY sv.maSV, dd.HeSoDiem
  `;
  db.query(sql, [maLopHP], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// ===== LƯU BẢNG ĐIỂM =====
exports.luuBangDiem = (req, res) => {
  const { maLopHP, MaMonHoc, danhSach } = req.body;
  if (!maLopHP || !danhSach || danhSach.length === 0) {
    return res.status(400).json({ message: "Thiếu thông tin" });
  }

  db.query("SELECT MaBD, MaSinhVien, MaDD FROM bangdiem WHERE maLopHP = ?", [maLopHP], (err, existing) => {
    if (err) return res.status(500).json({ error: err });

    db.query("SELECT MaBD FROM bangdiem ORDER BY MaBD DESC LIMIT 1", (err2, maxRows) => {
      if (err2) return res.status(500).json({ error: err2 });

      let nextNum = 1, prefix = "BD", padding = 3;
      if (maxRows.length > 0) {
        const m = maxRows[0].MaBD.match(/^([a-zA-Z]*)(\d+)$/);
        if (m) { prefix = m[1]; nextNum = parseInt(m[2], 10) + 1; padding = m[2].length; }
      }

      const updates = [];
      const inserts = [];

      danhSach.forEach(item => {
        const ex = existing.find(e => e.MaSinhVien === item.maSV && e.MaDD === item.MaDD);
        if (ex) {
          updates.push({ MaBD: ex.MaBD, Diem: item.diem });
        } else {
          const newId = prefix + nextNum.toString().padStart(padding, "0");
          nextNum++;
          inserts.push([newId, item.maSV, MaMonHoc, maLopHP, item.MaDD, item.diem]);
        }
      });

      const updatePs = updates.map(u => new Promise((resolve, reject) => {
        db.query("UPDATE bangdiem SET Diem=? WHERE MaBD=?", [u.Diem, u.MaBD], e => e ? reject(e) : resolve());
      }));

      let insertP = Promise.resolve();
      if (inserts.length > 0) {
        insertP = new Promise((resolve, reject) => {
          db.query("INSERT INTO bangdiem (MaBD, MaSinhVien, MaMonHoc, maLopHP, MaDD, Diem) VALUES ?", [inserts], e => e ? reject(e) : resolve());
        });
      }

      Promise.all([...updatePs, insertP])
        .then(() => res.json({ message: "Lưu bảng điểm thành công", updated: updates.length, inserted: inserts.length }))
        .catch(e => res.status(500).json({ message: "Lỗi lưu điểm", error: e }));
    });
  });
};
