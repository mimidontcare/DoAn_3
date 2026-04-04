const db = require("../config/db");

const Diemdanh = {
  getAll: (callback) => {
    db.query("SELECT * FROM diemdanh", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM diemdanh WHERE maDiemDanh=?", [id], callback);
  },

  create: (data, callback) => {
    db.query("INSERT INTO diemdanh (maLichHoc, maSinhVien, NgayDiemDanh, trangThai) VALUES (?, ?, ?, ?)",
      [data.maLichHoc, data.maSinhVien, data.NgayDiemDanh, data.trangThai],
      callback
    );
  },

  update: (id, data, callback) => {
    db.query("UPDATE diemdanh SET maLichHoc=?, maSinhVien=?, NgayDiemDanh=?, trangThai=? WHERE maDiemDanh=?", [data.maLichHoc, data.maSinhVien, data.NgayDiemDanh, data.trangThai, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM diemdanh WHERE maDiemDanh=?", [id], callback);
  },

  search: (keyword, callback) => {
    db.query("SELECT * FROM diemdanh WHERE maLichHoc LIKE ?", [`%${keyword}%`], callback);
  }
};

module.exports = Diemdanh;
