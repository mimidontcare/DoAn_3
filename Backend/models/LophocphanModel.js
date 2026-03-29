const db = require("../config/db");

const Lophocphan = {
  getAll: (callback) => {
    db.query("SELECT * FROM lophocphan", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM lophocphan WHERE maGiangVien=?", [id], callback);
  },

  create: (data, callback) => {
    db.query("INSERT INTO lophocphan (MaLopHocPhan, maLopHP, MaMonHoc, soLuongSinhVien, tenLop, thoigianDong, ThoigianMo, thuTuUuTien) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [data.MaLopHocPhan, data.maLopHP, data.MaMonHoc, data.soLuongSinhVien, data.tenLop, data.thoigianDong, data.ThoigianMo, data.thuTuUuTien],
      callback
    );
  },

  update: (id, data, callback) => {
    db.query("UPDATE lophocphan SET MaLopHocPhan=?, maLopHP=?, MaMonHoc=?, soLuongSinhVien=?, tenLop=?, thoigianDong=?, ThoigianMo=?, thuTuUuTien=? WHERE maGiangVien=?", [data.MaLopHocPhan, data.maLopHP, data.MaMonHoc, data.soLuongSinhVien, data.tenLop, data.thoigianDong, data.ThoigianMo, data.thuTuUuTien, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM lophocphan WHERE maGiangVien=?", [id], callback);
  },

  search: (keyword, callback) => {
    db.query("SELECT * FROM lophocphan WHERE MaLopHocPhan LIKE ?", [`%${keyword}%`], callback);
  }
};

module.exports = Lophocphan;
