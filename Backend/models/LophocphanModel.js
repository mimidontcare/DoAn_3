const db = require("../config/db");

const Lophocphan = {
  getAll: (callback) => {
    db.query("SELECT * FROM lophocphan", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM lophocphan WHERE MaLopHocPhan=?", [id], callback);
  },

  create: (data, callback) => {
    db.query("INSERT INTO lophocphan (MaLopHocPhan, maLopHP, MaMonHoc, soLuongSinhVien, tenLop, thoigianDong, ThoigianMo, thuTuUuTien, maGiangVien) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [data.MaLopHocPhan, data.maLopHP, data.MaMonHoc, data.soLuongSinhVien, data.tenLop, data.thoigianDong, data.ThoigianMo, data.thuTuUuTien, data.maGiangVien],
      callback
    );
  },

  update: (id, data, callback) => {
    db.query("UPDATE lophocphan SET maLopHP=?, MaMonHoc=?, soLuongSinhVien=?, tenLop=?, thoigianDong=?, ThoigianMo=?, thuTuUuTien=?, maGiangVien=? WHERE MaLopHocPhan=?", [data.maLopHP, data.MaMonHoc, data.soLuongSinhVien, data.tenLop, data.thoigianDong, data.ThoigianMo, data.thuTuUuTien, data.maGiangVien, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM lophocphan WHERE MaLopHocPhan=?", [id], callback);
  },

  search: (keyword, callback) => {
    db.query("SELECT * FROM lophocphan WHERE MaLopHocPhan LIKE ?", [`%${keyword}%`], callback);
  }
};

module.exports = Lophocphan;
